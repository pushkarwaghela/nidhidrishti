def compute_composite_risk_score(outlier_data, duplicate_data, concentration_data):
    """
    Computes a transparent composite risk score between 0 and 100.
    Weighted Formula:
      - Cost / Time Outlier Score: 40%
      - Duplicate Work Score: 35%
      - Contractor Concentration Score: 25%
      - Velocity Anomaly Bonus: +15 pts (if 0-day completion)
    """
    outlier_score = outlier_data.get("iforest_score", 0.0) if outlier_data else 0.0
    dup_score = duplicate_data.get("duplicate_score", 0.0) if duplicate_data else 0.0
    conc_score = concentration_data.get("concentration_score", 0.0) if concentration_data else 0.0

    raw_risk = (outlier_score * 40.0) + (dup_score * 35.0) + (conc_score * 25.0)

    # Velocity anomaly bonus flag
    if outlier_data and outlier_data.get("is_zero_day_execution"):
        raw_risk += 15.0

    final_score = min(100.0, max(0.0, raw_risk))
    
    if final_score >= 75.0:
        severity = "Critical"
    elif final_score >= 45.0:
        severity = "Warning"
    elif final_score >= 25.0:
        severity = "Moderate"
    else:
        severity = "Low"

    # Primary Trigger determination
    triggers = []
    if outlier_data and (outlier_data.get("cost_delta_pct", 0) > 100 or outlier_data.get("is_zero_day_execution")):
        triggers.append("Cost/Time Outlier")
    if duplicate_data:
        triggers.append("Geospatial Duplicate Work")
    if concentration_data and concentration_data.get("is_monopoly_risk"):
        triggers.append("Contractor Concentration")

    primary_trigger = " & ".join(triggers) if triggers else "Baseline Risk"

    return {
        "risk_score": float(round(final_score, 1)),
        "severity": severity,
        "primary_trigger": primary_trigger,
        "outlier_subscore": float(round(outlier_score * 40.0, 1)),
        "duplicate_subscore": float(round(dup_score * 35.0, 1)),
        "concentration_subscore": float(round(conc_score * 25.0, 1))
    }
