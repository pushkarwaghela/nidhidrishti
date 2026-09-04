import json
import os
import sys

# Ensure backend root is in import path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Work, Anomaly, Contractor
from ml.cost_time_outliers import detect_cost_and_time_outliers
from ml.duplicate_detector import detect_duplicate_works
from ml.contractor_network import analyze_contractor_network
from ml.composite_scorer import compute_composite_risk_score
from ml.explainability import generate_explainability_payload

def run_full_ml_pipeline():
    db = SessionLocal()
    try:
        works = db.query(Work).all()
        if not works:
            print("No works found in database to score.")
            return

        print(f"Executing ML Pipeline on {len(works)} work records...")

        # 1. Cost & Time Outliers
        outlier_results = detect_cost_and_time_outliers(works)

        # 2. Duplicate Detection
        duplicate_results = detect_duplicate_works(works)

        # 3. Contractor Network Concentration Analysis
        contractor_metrics, graph_json = analyze_contractor_network(works)

        # Clear existing anomalies
        db.query(Anomaly).delete()
        db.commit()

        anomalies_to_insert = []
        flagged_count = 0

        for w in works:
            outlier_info = outlier_results.get(w.work_id, {})
            dup_info = duplicate_results.get(w.work_id, {})
            conc_info = contractor_metrics.get(w.contractor_name, {})

            composite = compute_composite_risk_score(outlier_info, dup_info, conc_info)

            # Store all works or works with risk score >= 20
            explain_json = generate_explainability_payload(w, outlier_info, dup_info, conc_info, composite)

            anomaly_obj = Anomaly(
                work_id=w.work_id,
                risk_score=composite["risk_score"],
                severity=composite["severity"],
                primary_trigger=composite["primary_trigger"],
                explainability_json=explain_json
            )
            anomalies_to_insert.append(anomaly_obj)

            if composite["risk_score"] >= 45.0:
                flagged_count += 1

        db.bulk_save_objects(anomalies_to_insert)

        # Update contractor HHI risk flags in DB
        contractors = db.query(Contractor).all()
        for c in contractors:
            metrics = contractor_metrics.get(c.contractor_name, {})
            c.hhi_score = metrics.get("district_hhi", 0.0)
            c.is_high_risk = metrics.get("is_monopoly_risk", False)

        db.commit()
        print(f"ML Pipeline Completed: Scored {len(works)} works. Flagged {flagged_count} High/Critical Risk Anomalies.")
        return {"total_scored": len(works), "flagged_anomalies": flagged_count}
    finally:
        db.close()

if __name__ == "__main__":
    run_full_ml_pipeline()
