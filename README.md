# NidhiDrishti (निधिदृष्टि)
### AI-Powered Public Fund Surveillance and Audit Intelligence Platform
**Ministry of Statistics and Programme Implementation (MoSPI) | Government of India**

NidhiDrishti is an AI-enabled governance dashboard designed for real public accountability challenges in schemes such as MPLADS, constituency development works, and district-level execution monitoring. The platform transforms fragmented government datasets into a single, explainable, official-grade risk intelligence console for officials, nodal agencies, MPs, and citizens.

This project is designed as a serious SIH 2026 submission: it blends government UX, public procurement integrity logic, field execution monitoring, and transparent grievance workflows into a system that feels institutional, operational, and adoption-ready.

---

## 1. Executive Summary
Public funds for development works often suffer from weak monitoring, delayed verification, vendor anomalies, wrong geospatial records, and limited transparency. In such a system, a project can appear “approved and funded” while quietly losing value on the ground.

NidhiDrishti addresses this by helping government officials detect:

- fund disbursal ahead of physical progress
- duplicate or ghost assets
- suspicious vendor and GSTIN behavior
- tender splitting below threshold limits
- inconsistent geotagged records and field evidence
- district-level concentration patterns and accountability gaps

The objective is not merely to visualize data. The objective is to reduce leakage, improve traceability, and enable timely intervention before public trust is harmed.

---

## 2. Problem Statement
India’s development monitoring machinery works across several fragmented layers:

- MP office sanction process
- district administration and implementing agencies
- finance disbursal systems
- GSTN/vendor verification systems
- field site evidence and geospatial validation
- public grievance and transparency channels

These systems do not always talk to each other. As a result, anomalies remain invisible until much later, when cost escalation, inefficiency, or corruption has already affected outcomes.

The challenge is especially important in schemes like MPLADS, where large allocations are made for constituency development, but the monitoring, verification, and accountability pipeline is often uneven.

---

## 3. Solution Overview
NidhiDrishti creates a unified government-facing dashboard that acts like a control room for development fund integrity.

It provides:

- AI-assisted governance risk scoring
- structured alerting for suspicious works
- deep anomaly visualization by sector and district
- easy access to evidence and compliance details
- clear official action workflows for freeze, inspection, and clearance
- citizen-facing grievance integration for public transparency

This gives officers a single system to detect risk early, understand the nature of the issue, and escalate appropriately with evidence.

---

## 4. Why This Is a Strong SIH Project
A strong SIH project is not just a visually attractive UI. It is a realistic, impactful problem-solving solution with clear public value.

NidhiDrishti stands out because it:

- addresses a real governance pain point
- uses realistic public-sector workflows and terminology
- focuses on explainable AI and auditability instead of black-box predictions
- creates a product-like experience for central, state, district, and public stakeholders
- demonstrates both decision support and citizen transparency

This makes it feel like a platform that could be adopted in a real government ecosystem rather than a generic demo app.

---

## 5. Product Architecture

### Frontend
- React + Vite dashboard interface
- government-style role switching
- accessibility-first design 
- analytics, heatmap, queue, and evidence modules

### Backend
- FastAPI REST service
- live dashboard snapshot endpoint
- work records and audit logs
- action-oriented APIs for freeze, review, and escalation flows

### Data Flow
The application is built to support a realistic live data pipeline:

1. Backend provides a structured dashboard snapshot.
2. Frontend fetches the current state from the API.
3. UI hydrates the dashboard logic and displays live operational data.
4. If the backend is unavailable, the app falls back to the secure demo dataset without breaking the interface.

This hybrid architecture improves realism and demonstrates a production-style data flow that judges expect from modern government-tech solutions.

---

## 6. Core Modules

### 6.1 Dashboard and Risk Overview
Executive control centre for:

- sanctioned outlay
- flagged risk outlay
- critical anomalies
- AI confidence and data quality metrics
- sector-level risk concentration

### 6.2 Geospatial Risk Map
Offers district and state-level insight using geospatial plotting and risk scoring. This helps detect duplicate assets, suspicious clusters, and pattern anomalies across geography.

### 6.3 Audit Queue
Contains works under review and flags them using practical governance triggers such as:

- physical-progress mismatch
- duplicate assets
- GSTIN non-compliance
- split-tender patterns
- suspicious vendor concentration

### 6.4 Data Quality Audit Trail
Shows how raw data is corrected before analysis, increasing trust in the system and making governance decisions explainable.

### 6.5 Constituency and Sector Analytics
Helps compare work concentration, risk intensity, and funding anomalies across districts and categories.

### 6.6 Guidelines and SOP Layer
Adds policy alignment by representing standard compliance and review procedures in a clear format.

### 6.7 Stakeholder Role Views
The platform is designed for multiple government roles, not just one user type:

- Ministry / Central Vigilance
- State Nodal Authority
- District Collector / DM
- Hon’ble MP / Constituency Office
- Citizen and grievance interfaces

---

## 7. Realistic Data Model
The project uses a realistic MPLADS-style dataset rather than generic placeholders.

Data points include:

- work ID and title
- district, state, constituency, and implementing agency
- sanctioned amount and actual disbursement trend
- physical progress vs financial release mismatch
- contractor and GSTIN information
- risk score and trigger reasoning
- geospatial coordinates and duplicate asset detection cues

This gives the project a grounded governance feel and makes the narrative more believable for judges and evaluators.

---

## 8. AI and Rule Logic
The system uses an explainable, governance-friendly intelligence layer based on:

- anomaly detection
- progress mismatch analysis
- geospatial overlap checks
- contractor integrity scoring
- tender-splitting pattern recognition
- data validation and audit trail logging

This approach is important because government departments need logic they can trust and defend, not unexplained automation.

---

## 9. API and Live Data Flow
The backend exposes a realistic API layer that feeds the dashboard with operational-style data.

### API endpoints
- /
- /api/v1/health
- /api/v1/summary
- /api/v1/dashboard
- /api/v1/works
- /api/v1/works/{work_id}
- /api/v1/risk-breakdown
- /api/v1/sectors
- /api/v1/audit-logs
- /api/v1/actions/freeze

This gives the app a more advanced backend structure and a stronger “live product” story for SIH evaluation.

---

## 10. Tech Stack
- React 18
- Vite
- Python 3.x
- FastAPI
- Pydantic models
- Chart.js and dashboard analytics
- Leaflet-style geospatial presentation
- Government-style design system and stakeholder UX

---

## 11. Local Setup

### Install frontend dependencies
```bash
npm install
```

### Start frontend
```bash
npm run dev
```
Open the app at:
```bash
http://localhost:3000
```

### Start backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
The API will be available at:
```bash
http://localhost:8000/docs
```

### Production build
```bash
npm run build
```

---

## 12. Deployment Options

### Vercel
- Framework: Vite
- Build command: npm run build
- Output directory: dist

### Netlify
- Build command: npm run build
- Publish directory: dist

### Government-ready hosting concept
This prototype can later be deployed in a secure environment with:

- role-based access control
- secure audit logging
- SSO / identity integration
- API gateway configuration
- private hosting for institutional use

---

## 13. Public Value and Impact
NidhiDrishti can help public institutions reduce fund leakage, improve oversight, and increase transparency in development execution.

It creates value by:

- reducing audit delays
- making large public works easier to monitor
- improving data quality before decisions are made
- giving citizens a clear way to raise concerns
- improving institutional accountability and trust

---

## 14. Demo Flow for Judges
A strong judge-facing demo flow is:

1. Open the dashboard and present it as a central vigilance console for public development funds.
2. Highlight a critical flagged work with financial progress far above field progress.
3. Show the forensic triggers and explain the logic behind the anomaly.
4. Demonstrate the geospatial risk map showing concentrated risk.
5. Open the audit queue and show how an officer can view the issue and decide on intervention.
6. Show how a citizen can raise a complaint or flag a suspicious asset.

This creates a story of a real public-sector system, not just a mock dashboard.

---

## 15. Submission Positioning
This project should be presented as:

- “AI-powered public fund surveillance and audit intelligence platform for MPLADS and similar development schemes.”
- “Government-grade risk monitoring and anomaly detection platform for public development accountability.”
- “Transparent, explainable, and operational governance tech solution for district and central oversight.”

---

## 16. Long-Term Vision
The long-term roadmap is to expand this into a broader public assets and accountability platform covering:

- MPLADS
- state infrastructure projects
- PMAY and rural development assets
- school, health, and sanitation schemes
- central and state public works reconciliation

---

## 17. License
This project is intended for academic, hackathon, and demonstration use and is designed as a governance-tech prototype for public accountability solutions.

---

## 18. Final Submission Note
NidhiDrishti is a realistic, credible, and institution-ready solution that combines public governance, digital accountability, and explainable AI. It is designed to feel like a serious government product and to stand out in a competitive SIH evaluation by solving a meaningful public-sector challenge with clarity, structure, and impact.

This is not simply a dashboard. It is a governance intelligence platform built for transparency, intervention, and trust.

---

## 19. Quick Start Summary
```bash
npm install
npm run dev

cd backend
pip install -r requirements.txt
python main.py
```

---

If you want, the next improvement can be a stronger demo script, final product video narration, or a more advanced real dataset integration with a richer analytics backend.
