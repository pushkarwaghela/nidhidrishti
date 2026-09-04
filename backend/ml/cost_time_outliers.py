import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_cost_and_time_outliers(works_list):
    """
    Evaluates works against sectoral category baselines using Isolation Forest & Robust Z-Scores.
    Returns a dictionary of work_id -> outlier metrics.
    """
    if not works_list:
        return {}

    df = pd.DataFrame([
        {
            "work_id": w.work_id,
            "category": w.category,
            "sanctioned_amount": w.sanctioned_amount,
            "actual_expenditure": w.actual_expenditure,
            "execution_days": w.execution_days,
            "status": w.status
        }
        for w in works_list
    ])

    results = {}

    for cat_name, group in df.groupby("category"):
        if len(group) < 3:
            # Fallback for very small groups: statistical median
            median_cost = group["sanctioned_amount"].median()
            for _, row in group.iterrows():
                cost_ratio = row["sanctioned_amount"] / max(1.0, median_cost)
                is_cost_outlier = cost_ratio > 2.5
                results[row["work_id"]] = {
                    "iforest_score": 0.8 if is_cost_outlier else 0.1,
                    "category_median_cost": float(median_cost),
                    "cost_delta_pct": float((row["sanctioned_amount"] - median_cost) / max(1.0, median_cost) * 100.0),
                    "cost_z_score": float((row["sanctioned_amount"] - median_cost) / max(1.0, group["sanctioned_amount"].std() or 1.0)),
                    "is_zero_day_execution": row["execution_days"] == 0 and row["status"] == "Completed",
                    "execution_days": row["execution_days"]
                }
            continue

        # Fit Isolation Forest on [sanctioned_amount, execution_days]
        X = group[["sanctioned_amount", "execution_days"]].copy()
        
        # Log-transform financial amounts for stable scaling
        X["sanctioned_log"] = np.log1p(X["sanctioned_amount"])
        
        clf = IsolationForest(contamination=0.10, random_state=42)
        clf.fit(X[["sanctioned_log", "execution_days"]])
        
        # Decision function gives lower values for anomalies (negative)
        raw_scores = clf.decision_function(X[["sanctioned_log", "execution_days"]])
        # Convert raw decision score to [0, 1] anomaly probability (higher = more anomalous)
        anomaly_scores = 1.0 - ((raw_scores - raw_scores.min()) / max(1e-6, raw_scores.max() - raw_scores.min()))

        median_cost = group["sanctioned_amount"].median()
        std_cost = group["sanctioned_amount"].std() or 1.0

        for idx, (_, row) in enumerate(group.iterrows()):
            score = float(anomaly_scores[idx])
            cost_val = row["sanctioned_amount"]
            delta_pct = ((cost_val - median_cost) / max(1.0, median_cost)) * 100.0
            z_score = (cost_val - median_cost) / std_cost

            # Velocity check: 0-day completion
            zero_day = row["execution_days"] == 0 and row["status"] == "Completed"

            results[row["work_id"]] = {
                "iforest_score": score,
                "category_median_cost": float(median_cost),
                "cost_delta_pct": float(delta_pct),
                "cost_z_score": float(z_score),
                "is_zero_day_execution": zero_day,
                "execution_days": row["execution_days"]
            }

    return results
