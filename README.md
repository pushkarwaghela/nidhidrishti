# NidhiDrishti — AI-Powered Anomaly & Fraud Engine for MPLADS (SIH26102)

**NidhiDrishti** is a prototype platform built for **MoSPI's Data Informatics & Innovation Division** (Smart India Hackathon Problem Statement SIH26102). It detects anomalies, duplicate works, cost overruns, and contractor monopolization risks in the implementation of the **Member of Parliament Local Area Development Scheme (MPLADS)**.

---

## Key Features

1. **Category-Segmented Outlier Detection**:
   - Trains an **Isolation Forest** & **Robust Z-Score** model per sectoral category (Roads, Drinking Water, Education, Sanitation, Health, Public Facilities).
   - Identifies extreme cost variances (+% above category median) and rapid 0-day execution anomalies.

2. **Geospatial & Semantic Duplicate Matcher**:
   - Combines **RapidFuzz** string token similarity on work descriptions with the **Haversine formula** for coordinate proximity.
   - Flags likely duplicate or near-duplicate sanctioned works (e.g. identical titles within 200m distance).

3. **Contractor Monopolization Network Analysis (NetworkX)**:
   - Maps MP &rarr; District &rarr; Contractor bipartite network graph.
   - Calculates **Degree Centrality** and the **Herfindahl-Hirschman Index (HHI)** per district to detect vendor market concentration and single-vendor dominance.

4. **Transparent Explainability Layer**:
   - Every flagged anomaly generates an itemized human-readable audit payload showing exact signal contribution percentages, baseline median comparisons, and feature deltas — **no black boxes or hardcoded scores**.

5. **Interactive MoSPI Executive Dashboard**:
   - **Risk Overview**: Financial Outlay KPIs, Severity Spectrum (Critical, Warning, Moderate, Low), and Sectoral distributions.
   - **Geospatial Heatmap**: Leaflet map plotting work locations with color-coded risk markers and interactive popup cards.
   - **Alert Queue**: Filterable priority table with one-click drilldown into the AI Audit Breakdown Modal.
   - **Contractor Network**: Vendor market share and monopoly alerts.
   - **Data Quality Audit Trail**: Ingestion normalization and entity resolution logs.

---

## Quickstart Guide

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

### 1. Setup & Run FastAPI Backend
```powershell
# Navigate to backend directory
cd backend

# Install dependencies
pip install fastapi uvicorn sqlalchemy scikit-learn pandas numpy networkx rapidfuzz pytest

# Run Ingestion & ML Scoring Pipeline
python ingest.py
python ml/run_ml_pipeline.py

# Start FastAPI Backend Server (runs on http://127.0.0.1:8000)
python main.py
```

### 2. Setup & Run React Frontend Dashboard
```powershell
# Open a second terminal window in project root
cd frontend

# Install dependencies
npm install

# Start Vite Development Server (runs on http://localhost:3000)
npm run dev
```

Visit **`http://localhost:3000`** in your browser to view the interactive dashboard.

---

## Data Provenance (Task 0)

All data structures match public schemas from MoSPI's **eSAKSHI Portal** (`mplads.mospi.gov.in`) and **Data.gov.in**.
- Real schema attributes include `work_id`, `work_name`, `category`, `mp_name`, `sanctioned_amount`, `actual_expenditure`, `contractor_name`, `latitude`, `longitude`, `sanction_date`, `completion_date`, `status`.
- Detailed dataset provenance, schema mappings, and controlled anomaly augmentation benchmark logs are documented in [`data/SOURCES.md`](file:///C:/Users/Lenovo/.gemini/antigravity/scratch/nidhidrishti/data/SOURCES.md).

---

## Running Model Evaluation & Automated Tests

To evaluate the ML model performance against benchmark anomaly cases:
```powershell
python notebooks/anomaly_detection_model.py
```

To run the backend API and ingestion test suite:
```powershell
python backend/test_backend.py
```

---

## Known Limitations & Honest Caveats

1. **Geospatial Coordinates**: Official legacy public MPLADS records often omit precise Lat/Long coordinates. When exact coordinates are missing in raw CSVs, NidhiDrishti applies district centroid bounding box estimations.
2. **Ground-Truth Fraud Labels**: Because official public datasets do not include confirmed corruption labels, validation relies on statistical baselines, Isolation Forest decision margins, and controlled benchmark augmentations.
3. **Contractor Spellings**: Minor variations in contractor names across different district sanctioning authorities require continuous entity resolution dictionary updates.
