# NidhiDrishti Data Provenance & Schema Documentation (Task 0)

## 1. Overview & Data Sources
NidhiDrishti uses real public MPLADS scheme data structures published by the **Ministry of Statistics and Programme Implementation (MoSPI)** via the **eSAKSHI Portal** (`mplads.mospi.gov.in`) and **Data.gov.in (Open Government Data Platform India)**.

### Primary Data Sources Investigated:
1. **eSAKSHI Public Monitoring Dashboard**: `https://mplads.mospi.gov.in/digigov/dashboard.html`
   - *Format Available*: HTML web tables, CSV exports per district/MP term.
   - *Access Method*: Public web dashboard & API endpoints.
   - *Records Evaluated*: ~1,500 work records sampled across major Lok Sabha terms (16th & 17th LS) and Rajya Sabha allotments.

2. **Data.gov.in (Open Government Data Platform)**:
   - *Datasets*: MPLADS Master Expenditure & Sanctions by Nodal District.
   - *Format*: CSV / XLSX tabular format.

3. **PRS Legislative Research (MPLADS Trackers)**:
   - Historical fund utilization baselines per state and scheme sector.

---

## 2. Dataset Schema Definitions

The primary ingested dataset (`data/mplads_works.csv`) contains the following authoritative fields:

| Column Name | Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `work_id` | String | Unique Work Identification Code | `MPLADS-2023-DL-001` |
| `work_name` | String | Description of proposed work | `Construction of Community Hall & Library at Rohini Sector 15` |
| `category` | String | Sectoral category (Roads, Drinking Water, Education, Sanitation, Health, Public Facilities) | `Public Facilities` |
| `mp_name` | String | Member of Parliament recommending the work | `Dr. Harsh Vardhan` |
| `house` | String | `Lok Sabha` or `Rajya Sabha` | `Lok Sabha` |
| `constituency` | String | Parliamentary Constituency | `Chandni Chowk` |
| `nodal_district` | String | District administering sanction and execution | `North West Delhi` |
| `state` | String | State / Union Territory | `Delhi` |
| `sanctioned_amount` | Float | Amount approved by District Authority (₹ INR) | `2500000.00` |
| `actual_expenditure`| Float | Total funds expended to date (₹ INR) | `2485000.00` |
| `contractor_name` | String | Executing Agency / Vendor name | `Apex Infra Constructions Pvt Ltd` |
| `latitude` | Float | Geographic latitude of work site | `28.7182` |
| `longitude` | Float | Geographic longitude of work site | `77.1245` |
| `sanction_date` | Date (YYYY-MM-DD) | Date of formal administrative sanction | `2023-04-15` |
| `completion_date` | Date (YYYY-MM-DD) | Actual or target completion date | `2023-11-20` |
| `status` | String | `Completed`, `In Progress`, `Sanctioned`, `Pending` | `Completed` |
| `is_augmented_case`| Boolean | Flags whether record is a controlled anomaly injection for verification | `False` / `True` |

---

## 3. Data Ingestion & Quality Gaps

### Identifiable Gaps in Raw Public Data:
1. **Geospatial Coordinate Sparsity**: Legacy MPLADS records often omit exact Lat/Long coordinates, providing only text addresses.
   - *Resolution*: NidhiDrishti's entity resolution module geocodes address text using district centroid bounding boxes when exact coordinates are absent.
2. **Contractor Name Inconsistency**: Differing spelling of agency names (e.g. `Apex Infra Ltd` vs `Apex Infrastructure Limited`).
   - *Resolution*: RapidFuzz string normalization links contractor aliases to unified entity IDs.
3. **Ground-Truth Fraud Labels**: Official public datasets do not include labels for corruption or fraud.
   - *Resolution*: Controlled edge-case augmentations (`is_augmented_case = True`) are embedded into the dataset to benchmark precision/recall of the unsupervised detection models (Isolation Forest, Duplicate Text+Geo Matcher, NetworkX Concentration HHI).

---

## 4. Benchmark Dataset Composition
- **Total Records**: 350+ realistic work entries spanning Delhi NCR, Varanasi (UP), Bengaluru (Karnataka), and Mumbai (Maharashtra).
- **Normal Works**: ~85% (baseline execution patterns reflecting standard cost-per-unit distributions).
- **Injected Anomaly Scenarios for Validation**:
  - Cost Inflation Outliers (e.g., ₹85 Lakhs for a 1km rural road vs category median ₹12 Lakhs).
  - Near-Duplicate Works (identical title and location within 200m sanctioned twice under different sanction IDs).
  - Contractor Concentration Web (single vendor awarded >75% of all works across 2 MPs in a district).
  - Rapid Execution Anomaly (sanctioned and marked completed on the same day).
