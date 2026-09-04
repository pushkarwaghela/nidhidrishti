import os
import csv
import json
import datetime
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import Work, Anomaly, Contractor, DataQualityLog

# Contractor entity resolution mapping dictionary
CONTRACTOR_ALIASES = {
    "apex infra construction corp": "Apex Infra Infrastructure Projects",
    "apex infra ltd": "Apex Infra Infrastructure Projects",
    "apex infra projects": "Apex Infra Infrastructure Projects"
}

def parse_date(date_str):
    try:
        return datetime.datetime.strptime(date_str.strip(), "%Y-%m-%d")
    except Exception:
        return datetime.datetime(2023, 1, 1)

def run_ingestion(csv_file_path=None):
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    if csv_file_path is None:
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        csv_file_path = os.path.join(os.path.dirname(backend_dir), "data", "mplads_works.csv")

    if not os.path.exists(csv_file_path):
        print(f"Dataset CSV not found at {csv_file_path}. Auto-generating seed dataset...")
        try:
            from scripts.generate_seed_data import generate_mplads_data
            generate_mplads_data(output_path=csv_file_path)
        except Exception as e:
            raise FileNotFoundError(f"Dataset CSV missing at {csv_file_path} and auto-generation failed: {e}")

    # Clear existing data on full ingest
    db.query(Anomaly).delete()
    db.query(Work).delete()
    db.query(Contractor).delete()
    db.query(DataQualityLog).delete()
    db.commit()

    quality_logs = []
    contractor_stats = {}
    works_to_insert = []

    with open(csv_file_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader):
            w_id = row.get("work_id", f"WRK-{idx}").strip()
            w_name = row.get("work_name", "").strip()
            category = row.get("category", "General").strip()
            mp_name = row.get("mp_name", "Unknown MP").strip()
            house = row.get("house", "Lok Sabha").strip()
            constituency = row.get("constituency", "Unknown").strip()
            district = row.get("nodal_district", "Unknown").strip()
            state = row.get("state", "India").strip()

            # Sanctioned & expenditure validation
            try:
                sanctioned = float(row.get("sanctioned_amount", 0.0))
            except ValueError:
                sanctioned = 100000.0
                quality_logs.append(DataQualityLog(
                    work_id=w_id, issue_type="MissingField", field_name="sanctioned_amount",
                    description="Sanctioned amount was non-numeric", action_taken="Defaulted to ₹1,00,000"
                ))

            try:
                expenditure = float(row.get("actual_expenditure", 0.0))
            except ValueError:
                expenditure = sanctioned

            # Entity resolution on contractor name
            raw_contractor = row.get("contractor_name", "Unassigned").strip()
            normalized_contractor = CONTRACTOR_ALIASES.get(raw_contractor.lower(), raw_contractor)

            if raw_contractor != normalized_contractor:
                quality_logs.append(DataQualityLog(
                    work_id=w_id, issue_type="EntityResolution", field_name="contractor_name",
                    description=f"Alias '{raw_contractor}' matched canonical entity '{normalized_contractor}'",
                    action_taken="Standardized contractor entity name"
                ))

            # Lat / Lon validation
            try:
                lat = float(row.get("latitude"))
                lon = float(row.get("longitude"))
            except (ValueError, TypeError):
                lat, lon = None, None
                quality_logs.append(DataQualityLog(
                    work_id=w_id, issue_type="MissingField", field_name="latitude/longitude",
                    description="Geospatial coordinates missing or invalid",
                    action_taken="Set coordinates to null; fallback address geocoding flag active"
                ))

            # Date calculation
            s_date_obj = parse_date(row.get("sanction_date", "2023-01-01"))
            c_date_obj = parse_date(row.get("completion_date", "2023-06-01"))
            execution_days = max(0, (c_date_obj - s_date_obj).days)

            if execution_days == 0 and row.get("status") == "Completed":
                quality_logs.append(DataQualityLog(
                    work_id=w_id, issue_type="OutOfBounds", field_name="execution_days",
                    description="Work marked completed on exact same day as sanction",
                    action_taken="Flagged for rapid velocity anomaly engine"
                ))

            status = row.get("status", "Sanctioned").strip()
            is_aug = row.get("is_augmented_case", "False").lower() in ("true", "1")

            work_obj = Work(
                work_id=w_id,
                work_name=w_name,
                category=category,
                mp_name=mp_name,
                house=house,
                constituency=constituency,
                nodal_district=district,
                state=state,
                sanctioned_amount=sanctioned,
                actual_expenditure=expenditure,
                contractor_name=normalized_contractor,
                latitude=lat,
                longitude=lon,
                sanction_date=s_date_obj.strftime("%Y-%m-%d"),
                completion_date=c_date_obj.strftime("%Y-%m-%d"),
                execution_days=execution_days,
                status=status,
                is_augmented_case=is_aug
            )
            works_to_insert.append(work_obj)

            # Update contractor aggregation stats
            if normalized_contractor not in contractor_stats:
                contractor_stats[normalized_contractor] = {
                    "works": 0, "sanctioned": 0.0, "districts": set(), "mps": set()
                }
            contractor_stats[normalized_contractor]["works"] += 1
            contractor_stats[normalized_contractor]["sanctioned"] += sanctioned
            contractor_stats[normalized_contractor]["districts"].add(district)
            contractor_stats[normalized_contractor]["mps"].add(mp_name)

    db.bulk_save_objects(works_to_insert)
    db.bulk_save_objects(quality_logs)
    db.commit()

    # Populate Contractor summary table
    contractor_objs = []
    for c_name, stats in contractor_stats.items():
        c_obj = Contractor(
            contractor_name=c_name,
            total_works=stats["works"],
            total_sanctioned_amount=stats["sanctioned"],
            districts_count=len(stats["districts"]),
            mp_count=len(stats["mps"]),
            hhi_score=0.0, # Computed by ML engine later
            is_high_risk=False
        )
        contractor_objs.append(c_obj)

    db.bulk_save_objects(contractor_objs)
    db.commit()

    inserted_works = db.query(Work).count()
    inserted_logs = db.query(DataQualityLog).count()
    db.close()

    print(f"Ingestion complete: Ingested {inserted_works} Works, {len(contractor_objs)} Contractors, {inserted_logs} Data Quality Audit Logs.")
    return {"works_count": inserted_works, "contractors_count": len(contractor_objs), "quality_logs_count": inserted_logs}

if __name__ == "__main__":
    run_ingestion()
