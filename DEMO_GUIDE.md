# NidhiDrishti — Live Judge Demo Walkthrough Script (2-3 Minutes)

This step-by-step guide is tailored for hackathon judges evaluating **SIH26102 (MoSPI MPLADS Anomaly Detection System)**. Follow this exact flow to demonstrate the live working prototype.

---

## Demo Step 1: Executive Dashboard & Financial Outlay (30 Seconds)
1. Open **`http://localhost:3000`** in Google Chrome.
2. Point to the **Total Sanctioned Outlay Card** (`₹48.50 Cr`) and the **Flagged Risk Outlay Card** (`₹1.85 Cr`).
3. **Key Script to Judges**:
   > *"Welcome judges. NidhiDrishti is an AI-powered monitoring platform built for MoSPI to audit MPLAD Scheme spending. Every metric on this dashboard is computed live by our backend algorithms against real public eSAKSHI data structures. Here you immediately see our total sanctioned outlay and the active flagged risk outlay across 200+ projects."*

---

## Demo Step 2: Geospatial Risk Map & Cluster Plotting (45 Seconds)
1. Click the **"Geospatial Heatmap"** tab in the navigation bar.
2. Zoom into the **Delhi NCR** or **Varanasi** map cluster.
3. Point out the **Red Pulsing Markers** (Critical Risk score &ge; 75).
4. Click on the Red Marker for **Assi Ghat Lane 4 Paver Road (Work #MPLADS-2023-WRK-1002)**.
5. **Key Script to Judges**:
   > *"Our Leaflet spatial engine maps every sanctioned work using exact Lat/Long coordinates. Red pulsing markers represent critical anomalies flagged by our composite risk engine. Let's inspect Work #MPLADS-2023-WRK-1002 in Varanasi."*

---

## Demo Step 3: Transparent Explainability & AI Audit Breakdown (60 Seconds)
1. In the popup card, click **"View AI Audit Breakdown"** (opens the Explainability Modal).
2. Point out:
   - **Summary Finding**: *"Critical Risk (88/100) — Geospatial Duplicate Work & Cost Outlier"*.
   - **Signal Contribution Weights**:
     - *Duplicate Work (+35.0 pts)*: **90% text similarity** with Work #MPLADS-2023-WRK-1001 located **110 meters away**.
     - *Cost Variance (+38.2 pts)*: Sanctioned amount is **+140% above sector median cost** (₹18 Lakhs vs ₹7.5 Lakhs median).
3. **Key Script to Judges**:
   > *"Notice how NidhiDrishti avoids black-box predictions. Judges, every alert comes with a transparent feature contribution breakdown. Here, our NLP string matcher and Haversine formula caught two separate sanction entries for the exact same road stretch sanctioned 3 months apart!"*

---

## Demo Step 4: Contractor Concentration Graph & Live Re-scoring (30 Seconds)
1. Click the **"Contractor Concentration Graph"** tab.
2. Show **Apex Infra Infrastructure Projects** flagged with **Monopoly Alert** (holding 75% market share in North West Delhi with a high HHI score of 5,625).
3. Click the **"Re-Run ML Engine"** button in the Navbar.
4. Point out the **WebSocket ticker** updating to *"Stream Connected (Anomalies Flagged)"*.
5. **Key Script to Judges**:
   > *"Using NetworkX graph analysis, we track vendor concentration across MPs and districts. Here, single-vendor monopolization triggers an automatic alert. Finally, our pipeline supports on-demand ML re-scoring with live WebSocket updates."*

---

## Defense Answers for Judge Q&A

- **Judge Question**: *"Are these anomaly scores hardcoded?"*
  - **Answer**: *"No. Every score is computed dynamically by scikit-learn Isolation Forests, RapidFuzz string distance, Haversine geospatial proximity, and NetworkX degree centrality when `ml/run_ml_pipeline.py` executes."*

- **Judge Question**: *"How do you handle false positives?"*
  - **Answer**: *"We provide human-in-the-loop explainability cards showing exact category median comparisons. District Nodal Officers can review the itemized feature contributions before taking administrative action."*
