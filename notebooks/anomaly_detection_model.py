import os
import sys
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

def evaluate_anomaly_model():
    print("=" * 60)
    print(" NidhiDrishti ML Engine — Anomaly Model Evaluation Script")
    print("=" * 60)

    # Locate dataset
    curr_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(curr_dir)
    csv_path = os.path.join(project_root, "data", "mplads_works.csv")

    if not os.path.exists(csv_path):
        print(f"Error: Seed dataset not found at {csv_path}")
        return

    df = pd.read_csv(csv_path)
    print(f"Loaded dataset: {len(df)} total work records across {df['category'].nunique()} categories.")
    print(f"Augmented Anomaly Case Benchmark Count: {df['is_augmented_case'].sum()}")

    # Feature Engineering
    df["sanctioned_log"] = np.log1p(df["sanctioned_amount"])
    df["execution_days"] = (pd.to_datetime(df["completion_date"]) - pd.to_datetime(df["sanction_date"])).dt.days
    df["execution_days"] = df["execution_days"].clip(lower=0)

    # Sectoral Isolation Forest Evaluation
    predictions = []
    anomaly_scores_list = []

    for cat_name, group in df.groupby("category"):
        X = group[["sanctioned_log", "execution_days"]]
        
        # Fit Isolation Forest
        clf = IsolationForest(contamination=0.12, random_state=42)
        clf.fit(X)
        
        # Predict (-1 for outlier, 1 for inlier)
        preds = clf.predict(X)
        scores = -clf.decision_function(X) # Higher score = more anomalous

        for idx, (original_idx, row) in enumerate(group.iterrows()):
            predictions.append((original_idx, 1 if preds[idx] == -1 else 0, scores[idx]))

    # Re-align with original dataframe order
    predictions.sort(key=lambda x: x[0])
    df["model_predicted_anomaly"] = [p[1] for p in predictions]
    df["raw_anomaly_score"] = [p[2] for p in predictions]

    # Evaluate against ground truth benchmark augmentation tags
    y_true = df["is_augmented_case"].astype(int)
    y_pred = df["model_predicted_anomaly"]

    print("\n--- Classification Performance Metrics ---")
    print(classification_report(y_true, y_pred, target_names=["Normal Work", "Flagged Anomaly"]))

    cm = confusion_matrix(y_true, y_pred)
    print("Confusion Matrix:")
    print(f"  True Negatives (Normal): {cm[0][0]}")
    print(f"  False Positives: {cm[0][1]}")
    print(f"  False Negatives: {cm[1][0]}")
    print(f"  True Positives (Detected Anomalies): {cm[1][1]}")

    try:
        auc = roc_auc_score(y_true, df["raw_anomaly_score"])
        print(f"\nModel ROC-AUC Score: {auc:.4f}")
    except Exception as e:
        print(f"\nROC-AUC calculation skipped: {e}")

    print("\nTop 5 Most Anomalous Works Identified by Model:")
    top5 = df.sort_values(by="raw_anomaly_score", ascending=False).head(5)
    for _, r in top5.iterrows():
        print(f" - [{r['work_id']}] {r['work_name']} (Sanctioned: ₹{r['sanctioned_amount']:,.2f}, Category: {r['category']})")

    print("\nEvaluation completed cleanly.")

if __name__ == "__main__":
    evaluate_anomaly_model()
