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

## Hosting & 1-Click Deployment

### Deploying to Netlify
1. Connect this repository to **Netlify**.
2. Build command: `npm run build`
3. Publish directory: `dist`
*(A `public/_redirects` file is pre-configured for SPA routing).*

### Deploying to Vercel
1. Import this repository into **Vercel**.
2. Framework Preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
*(A `vercel.json` rewrite file is pre-configured).*
