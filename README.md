# NidhiDrishti (निधिदृष्टि)
### AI-Powered Risk-Monitoring & Fraud Surveillance Dashboard for India's MPLADS Scheme
**Ministry of Statistics and Programme Implementation (MoSPI) | Government of India**

---

## Overview
**NidhiDrishti** (निधिदृष्टि — "Insight into Funds") is an AI surveillance and risk-monitoring platform designed specifically for the **Members of Parliament Local Area Development Scheme (MPLADS)**. 

Built with the visual fidelity, authority, and ergonomics of real Indian e-governance platforms (like *data.gov.in*, *PM GatiShakti*, and *NIC portals*), NidhiDrishti enables non-technical government officials, District Collectors, State Nodal Officers, and Hon’ble Members of Parliament to detect financial disparities, vendor collusion, duplicate asset creation, and data ingestion defects in under 2 minutes with zero training.

---

## Visual & Design Philosophy
- **Authentic Gov of India Palette**: Primary Navy Blue (`#0B3D67`), clean white canvas, with Indian Saffron (`#FF9933`) and Green (`#00B050`) accent stripes echoing the national tricolor.
- **National Identity**: Official Ashoka Lion Capital Emblem with *"सत्यमेव जयते"*, bilingual typography (*भारत सरकार | Government of India*), and live IST timestamp with e-Sakshi sync status.
- **Accessible & High-Contrast**: Dynamic font scaling (`A-`, `A`, `A+`), persistent left sidebar, plain language risk ratings (*Low / Medium / High / Critical*), and zero confusing dark mode or flashy startup gradients.

---

## Core Modules

1. **Risk Overview Dashboard**:
   - 4 Executive KPI Cards: Total Sanctioned Outlay, Flagged Risk Outlay, Critical Anomalies, and Ingestion Records Resolved.
   - Risk Severity Breakdown Donut Chart (Critical, High Warning, Moderate, Standard).
   - Sectoral Work Allocation vs. Flagged Amount (Drinking Water, Healthcare, Education, Rural Roads, Sanitation, etc.).
   - Flash Vigilance Alert Strip for urgent intervention.

2. **Geospatial Risk Heatmap (Leaflet + OpenStreetMap)**:
   - Interactive GIS map plotting parliamentary works across India with risk-scored pins (Red/Orange/Yellow/Green).
   - Live filters by State/UT, Priority Sector, and Risk Severity Tier.
   - Rich popup dossier with Work ID, Sector, MP name, District, Sanctioned Amount, Contractor, and AI Forensic trigger.

3. **AI Anomaly & Risk Audit Queue**:
   - Tabular audit queue with instant search across Work IDs, contractors, and districts.
   - Plain-language forensic triggers (e.g. *Tender splitting sub-₹10L*, *Ghost contractor inactive GSTIN*, *Ground progress 12% vs 85% funds disbursed*, *Duplicate coordinates*).
   - Export to CSV and Print Official Dossier Sheet functionality.
   - In-depth **Audit Details Modal** with progress disparity meters and executive order actions (*Freeze Outlay*, *Order Physical Inspection*, *Mark Cleared*).

4. **Ingestion Data Quality Audit Trail**:
   - Full transparency log showing automated AI data sanitation before analysis.
   - Documents auto-resolutions for LGD code mismatches, inverted GPS coordinates, invalid GSTIN checksums, and date sequence inversions.

5. **Constituency & Sector Analytics**:
   - Comparative district vigilance roster with Contractor Monopoly Index (Herfindahl Index) and fund absorption velocity.

6. **MPLADS Guidelines & SOPs**:
   - Quick statutory reference to the Revised 2023 Guidelines, Clause 5.2 Negative List (Prohibited Assets), and the 10% annual physical verification protocol.

7. **Stakeholder Role-Switcher**:
   - Switch persona instantly between:
     - 🏛️ **Ministry (MoSPI Central)**
     - 🏢 **State Nodal Authority (SNA - UP)**
     - 📍 **District Authority (DM / Collector - Varanasi)**
     - 🗳️ **Member of Parliament (Hon'ble MP - Varanasi)**

---

## Quick Start & Local Setup

### 1. Frontend Web App (Zero-Config)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open `http://localhost:3000` in your browser.

To build the static production bundle:
```bash
npm run build
```
The optimized assets will be generated in the `dist/` directory.

---

### 2. Standalone FastAPI Backend (Optional)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API Documentation will be available at `http://localhost:8000/docs`.

---

## Free Production Deployment

The dashboard currently renders the sample dataset in `src/data/mockData.js`; it does
not make requests to the FastAPI service. Therefore, deploy the frontend only for a
working public demo. This is free on both Netlify and Vercel, and does not require
environment variables or a database.

### Option A: Netlify (recommended for this repository)

1. Push the repository to GitHub.
2. Sign in at [Netlify](https://app.netlify.com/) and choose **Add new site >
   Import an existing project**.
3. Select the repository and use these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** leave blank
4. Choose **Deploy site**.

The repository already contains `public/_redirects`, so refreshing a nested
React route will continue to work. Netlify automatically redeploys whenever the
selected branch changes.

### Option B: Vercel

1. Sign in at [Vercel](https://vercel.com/) and choose **Add New > Project**.
2. Import the GitHub repository.
3. Keep **Framework Preset: Vite** and use:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Choose **Deploy**.

The included `vercel.json` rewrites application routes to `index.html`, which
prevents 404s after a browser refresh.

### Optional: deploy the FastAPI backend for free

The backend is a separate optional service. It uses in-memory seeded data, so
changes made through the API are lost whenever the service restarts. To deploy it
as a public API on [Render](https://render.com/):

1. Create a **Web Service** from the same GitHub repository.
2. Set **Root Directory** to `backend`.
3. Set **Runtime** to `Python 3`.
4. Set **Build command** to `pip install -r requirements.txt`.
5. Set **Start command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
6. Choose the available **Free** instance and deploy.

The API documentation will be available at
`https://<your-service>.onrender.com/docs`. Free services may sleep when idle,
so the first request after inactivity can take several seconds. The current
frontend will still show its bundled sample data unless it is explicitly wired
to this API.

### Verify a deployment locally

Run the same production build before deploying:

```bash
npm ci
npm run build
npm run preview
```

Open the preview URL printed by Vite and test navigation, the map, filters, and
the audit modal. If the build fails with `'vite' is not recognized`, run
`npm ci` from the repository root first; dependencies are intentionally not
committed to Git.
