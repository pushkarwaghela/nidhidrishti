import os
import random
import csv
from datetime import datetime, timedelta

def generate_mplads_data(output_path=None):
    if output_path is None:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.dirname(script_dir)
        project_root = os.path.dirname(backend_dir)
        csv_path = os.path.join(project_root, "data", "mplads_works.csv")
    else:
        csv_path = output_path

    os.makedirs(os.path.dirname(os.path.abspath(csv_path)), exist_ok=True)

    categories = {
        "Roads & Drainage": {"min_cost": 500000, "max_cost": 2500000, "avg_days": 120},
        "Drinking Water & RO Plants": {"min_cost": 150000, "max_cost": 800000, "avg_days": 60},
        "Education & Smart Classrooms": {"min_cost": 300000, "max_cost": 1500000, "avg_days": 90},
        "Public Facilities & Community Halls": {"min_cost": 1000000, "max_cost": 4500000, "avg_days": 180},
        "Sanitation & Public Toilets": {"min_cost": 200000, "max_cost": 1000000, "avg_days": 75},
        "Healthcare Equipment & Ambulances": {"min_cost": 800000, "max_cost": 3500000, "avg_days": 45}
    }

    mps_and_districts = [
        {"mp": "Manoj Tiwari", "house": "Lok Sabha", "constituency": "North East Delhi", "district": "North East Delhi", "state": "Delhi", "lat": 28.7041, "lon": 77.2725},
        {"mp": "Dr. Harsh Vardhan", "house": "Lok Sabha", "constituency": "Chandni Chowk", "district": "North West Delhi", "state": "Delhi", "lat": 28.6562, "lon": 77.2300},
        {"mp": "Gautam Gambhir", "house": "Lok Sabha", "constituency": "East Delhi", "district": "East Delhi", "state": "Delhi", "lat": 28.6280, "lon": 77.2950},
        {"mp": "Narendra Modi", "house": "Lok Sabha", "constituency": "Varanasi", "district": "Varanasi", "state": "Uttar Pradesh", "lat": 25.3176, "lon": 82.9739},
        {"mp": "Tejasvi Surya", "house": "Lok Sabha", "constituency": "Bangalore South", "district": "Bengaluru Urban", "state": "Karnataka", "lat": 12.9716, "lon": 77.5946},
        {"mp": "Arvind Sawant", "house": "Lok Sabha", "constituency": "Mumbai South", "district": "Mumbai City", "state": "Maharashtra", "lat": 18.9388, "lon": 72.8353},
        {"mp": "Priyanka Chaturvedi", "house": "Rajya Sabha", "constituency": "Maharashtra", "district": "Mumbai Suburban", "state": "Maharashtra", "lat": 19.0760, "lon": 72.8777},
        {"mp": "Dr. Subramanian Swamy", "house": "Rajya Sabha", "constituency": "Nominated", "district": "New Delhi", "state": "Delhi", "lat": 28.6139, "lon": 77.2090}
    ]

    contractors = [
        "Apex Infra Infrastructure Projects",
        "National Civil Construction Co.",
        "Urban Green Projects Ltd",
        "Sunrise Tech & Water Works",
        "Vanguard Engineering Corp",
        "Metro Civic Developers",
        "Jan Seva Builders",
        "Imperial Buildcon Pvt Ltd",
        "Bharat Rural Development Enterprises",
        "Apex Infra Construction Corp" # similar alias
    ]

    rows = []
    work_id_counter = 1000

    # 1. Generate ~200 normal realistic works
    random.seed(42)
    start_date = datetime(2023, 1, 1)

    for i in range(180):
        work_id_counter += 1
        work_id = f"MPLADS-2023-WRK-{work_id_counter}"
        mp_info = random.choice(mps_and_districts)
        cat_name = random.choice(list(categories.keys()))
        cat_info = categories[cat_name]

        # Normal cost
        sanctioned = round(random.uniform(cat_info["min_cost"], cat_info["max_cost"]), -3)
        expenditure = round(sanctioned * random.uniform(0.85, 1.0), -3)

        # Dates
        s_date = start_date + timedelta(days=random.randint(0, 300))
        duration = random.randint(cat_info["avg_days"] - 30, cat_info["avg_days"] + 60)
        c_date = s_date + timedelta(days=duration)

        contractor = random.choice(contractors)
        lat = round(mp_info["lat"] + random.uniform(-0.04, 0.04), 4)
        lon = round(mp_info["lon"] + random.uniform(-0.04, 0.04), 4)

        status = random.choice(["Completed", "Completed", "Completed", "In Progress"])

        work_name = f"{cat_name.split('&')[0].strip()} project at Ward {random.randint(1, 45)}, {mp_info['district']}"

        rows.append({
            "work_id": work_id,
            "work_name": work_name,
            "category": cat_name,
            "mp_name": mp_info["mp"],
            "house": mp_info["house"],
            "constituency": mp_info["constituency"],
            "nodal_district": mp_info["district"],
            "state": mp_info["state"],
            "sanctioned_amount": sanctioned,
            "actual_expenditure": expenditure,
            "contractor_name": contractor,
            "latitude": lat,
            "longitude": lon,
            "sanction_date": s_date.strftime("%Y-%m-%d"),
            "completion_date": c_date.strftime("%Y-%m-%d"),
            "status": status,
            "is_augmented_case": "False"
        })

    # 2. Inject Controlled Edge-Case Anomaly Scenarios for Validation & Demo

    # Anomaly 1: Extreme Cost Inflation Outlier (Public Toilet for ₹95 Lakhs vs category max ₹10 Lakhs)
    work_id_counter += 1
    rows.append({
        "work_id": f"MPLADS-2023-WRK-{work_id_counter}",
        "work_name": "Installation of Modular Public Toilet Block at Connaught Place",
        "category": "Sanitation & Public Toilets",
        "mp_name": "Dr. Subramanian Swamy",
        "house": "Rajya Sabha",
        "constituency": "Nominated",
        "nodal_district": "New Delhi",
        "state": "Delhi",
        "sanctioned_amount": 9500000.0,
        "actual_expenditure": 9480000.0,
        "contractor_name": "Apex Infra Infrastructure Projects",
        "latitude": 28.6315,
        "longitude": 77.2167,
        "sanction_date": "2023-03-10",
        "completion_date": "2023-09-15",
        "status": "Completed",
        "is_augmented_case": "True"
    })

    # Anomaly 2 & 3: Near-Duplicate Works (Same work title & within 150 meters under different sanction codes)
    work_id_counter += 1
    rows.append({
        "work_id": f"MPLADS-2023-WRK-{work_id_counter}",
        "work_name": "Construction of Paver Block Road at Assi Ghat Lane 4",
        "category": "Roads & Drainage",
        "mp_name": "Narendra Modi",
        "house": "Lok Sabha",
        "constituency": "Varanasi",
        "nodal_district": "Varanasi",
        "state": "Uttar Pradesh",
        "sanctioned_amount": 1800000.0,
        "actual_expenditure": 1800000.0,
        "contractor_name": "Jan Seva Builders",
        "latitude": 25.2882,
        "longitude": 82.9991,
        "sanction_date": "2023-02-14",
        "completion_date": "2023-06-30",
        "status": "Completed",
        "is_augmented_case": "True"
    })

    work_id_counter += 1
    rows.append({
        "work_id": f"MPLADS-2023-WRK-{work_id_counter}",
        "work_name": "Paver Block Road Construction Work at Assi Ghat Lane 4", # 90% text similarity
        "category": "Roads & Drainage",
        "mp_name": "Narendra Modi",
        "house": "Lok Sabha",
        "constituency": "Varanasi",
        "nodal_district": "Varanasi",
        "state": "Uttar Pradesh",
        "sanctioned_amount": 1750000.0,
        "actual_expenditure": 1750000.0,
        "contractor_name": "Jan Seva Builders",
        "latitude": 25.2890, # ~110m distance
        "longitude": 82.9995,
        "sanction_date": "2023-05-20",
        "completion_date": "2023-10-10",
        "status": "Completed",
        "is_augmented_case": "True"
    })

    # Anomaly 4: Contractor Concentration / Monopoly Cluster (Apex Infra receiving 12 works in North West Delhi)
    for k in range(8):
        work_id_counter += 1
        rows.append({
            "work_id": f"MPLADS-2023-WRK-{work_id_counter}",
            "work_name": f"Smart Classroom & RO Filter Installation Phase {k+1} at Rohini Sector {k+2}",
            "category": "Education & Smart Classrooms",
            "mp_name": "Dr. Harsh Vardhan",
            "house": "Lok Sabha",
            "constituency": "Chandni Chowk",
            "nodal_district": "North West Delhi",
            "state": "Delhi",
            "sanctioned_amount": 1400000.0,
            "actual_expenditure": 1390000.0,
            "contractor_name": "Apex Infra Infrastructure Projects", # Same vendor monopolizing
            "latitude": 28.7150 + (k * 0.003),
            "longitude": 77.1210 + (k * 0.003),
            "sanction_date": "2023-04-01",
            "completion_date": "2023-08-15",
            "status": "Completed",
            "is_augmented_case": "True"
        })

    # Anomaly 5: Impossible Execution Velocity (0-day completion: Sanctioned & Completed same day)
    work_id_counter += 1
    rows.append({
        "work_id": f"MPLADS-2023-WRK-{work_id_counter}",
        "work_name": "Installation of High-Mast LED Lighting Towers at Jayanagar 4th Block",
        "category": "Public Facilities & Community Halls",
        "mp_name": "Tejasvi Surya",
        "house": "Lok Sabha",
        "constituency": "Bangalore South",
        "nodal_district": "Bengaluru Urban",
        "state": "Karnataka",
        "sanctioned_amount": 3200000.0,
        "actual_expenditure": 3200000.0,
        "contractor_name": "Vanguard Engineering Corp",
        "latitude": 12.9250,
        "longitude": 77.5938,
        "sanction_date": "2023-07-15",
        "completion_date": "2023-07-15", # 0 days!
        "status": "Completed",
        "is_augmented_case": "True"
    })

    # Write CSV
    fieldnames = [
        "work_id", "work_name", "category", "mp_name", "house", "constituency",
        "nodal_district", "state", "sanctioned_amount", "actual_expenditure",
        "contractor_name", "latitude", "longitude", "sanction_date",
        "completion_date", "status", "is_augmented_case"
    ]

    with open(csv_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Successfully generated {len(rows)} seed MPLADS work records in {csv_path}")

if __name__ == "__main__":
    generate_mplads_data()
