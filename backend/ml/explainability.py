import json

def generate_explainability_payload(work, outlier_data, duplicate_data, concentration_data, composite_res):
    """
    Generates a structured, human-readable explainability JSON object for audit reviews.
    """
    explanations = []
    signals = []

    # 1. Cost & Time Signal
    if outlier_data:
        delta_pct = outlier_data.get("cost_delta_pct", 0.0)
        median_cost = outlier_data.get("category_median_cost", 0.0)
        z_score = outlier_data.get("cost_z_score", 0.0)
        zero_day = outlier_data.get("is_zero_day_execution", False)

        if delta_pct > 50.0:
            explanations.append(
                f"Sanctioned amount (₹{work.sanctioned_amount:,.2f}) is +{delta_pct:.1f}% above the category median "
                f"for '{work.category}' (₹{median_cost:,.2f}, Z-score: {z_score:.2f})."
            )
            signals.append({
                "factor": "Cost Variance",
                "contribution_pct": composite_res["outlier_subscore"],
                "status": "High Risk",
                "details": f"+{delta_pct:.1f}% above sector median (₹{median_cost:,.2f})"
            })

        if zero_day:
            explanations.append(
                f"Impossible Execution Speed: Work marked completed on exact sanction date ({work.sanction_date})."
            )
            signals.append({
                "factor": "Execution Velocity",
                "contribution_pct": 15.0,
                "status": "Critical Anomaly",
                "details": "0 days duration between sanction and completion"
            })

    # 2. Duplicate Work Signal
    if duplicate_data:
        matched_id = duplicate_data["matched_work_id"]
        matched_name = duplicate_data["matched_work_name"]
        text_sim = duplicate_data["text_similarity"]
        dist_m = duplicate_data["distance_meters"]

        explanations.append(
            f"Likely Geospatial Duplicate: {text_sim}% description similarity with Work #{matched_id} "
            f"('{matched_name}') located only {dist_m:.1f} meters away."
        )
        signals.append({
            "factor": "Duplicate Work",
            "contribution_pct": composite_res["duplicate_subscore"],
            "status": "Critical Flag",
            "details": f"{text_sim}% similarity with Work #{matched_id} ({dist_m:.1f}m distance)"
        })

    # 3. Contractor Concentration Signal
    if concentration_data:
        share_pct = concentration_data.get("max_district_share_pct", 0.0)
        district_name = concentration_data.get("dominant_district", "")
        hhi = concentration_data.get("district_hhi", 0.0)

        if share_pct > 40.0:
            explanations.append(
                f"Vendor Concentration Risk: Contractor '{work.contractor_name}' holds {share_pct:.1f}% "
                f"of total MPLADS funds in {district_name} District (District HHI: {hhi:.0f})."
            )
            signals.append({
                "factor": "Vendor Concentration",
                "contribution_pct": composite_res["concentration_subscore"],
                "status": "Warning",
                "details": f"{share_pct:.1f}% market share in {district_name} (HHI {hhi:.0f})"
            })

    if not explanations:
        explanations.append("Work metrics reflect standard execution patterns with no anomalous triggers.")
        signals.append({
            "factor": "Standard Execution",
            "contribution_pct": 0.0,
            "status": "Normal",
            "details": "Metrics aligned with sector baseline"
        })

    summary_headline = f"{composite_res['severity']} Risk ({composite_res['risk_score']}/100) — {composite_res['primary_trigger']}"

    payload = {
        "work_id": work.work_id,
        "work_name": work.work_name,
        "category": work.category,
        "mp_name": work.mp_name,
        "district": work.nodal_district,
        "sanctioned_amount": work.sanctioned_amount,
        "contractor_name": work.contractor_name,
        "risk_score": composite_res["risk_score"],
        "severity": composite_res["severity"],
        "summary_headline": summary_headline,
        "explanations": explanations,
        "signals": signals,
        "raw_metrics": {
            "outlier_data": outlier_data,
            "duplicate_data": duplicate_data,
            "concentration_data": concentration_data
        }
    }

    return json.dumps(payload)
