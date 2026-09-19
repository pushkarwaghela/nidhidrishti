# NidhiDrishti - FastAPI Realistic Indian MPLADS Seed Dataset
# Scheme: Members of Parliament Local Area Development Scheme (MoSPI)

SEEDED_WORKS = [
    {
        "id": "MPLADS-2024-UP-0889",
        "title": "Installation of 12 Solar High-Mast RO Drinking Water Plants in Sevapuri Block",
        "sector": "Drinking Water & Sanitation",
        "mpName": "Shri Narendra Modi",
        "house": "Lok Sabha",
        "constituency": "Varanasi",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "sanctionedAmountLakhs": 96.8,
        "disbursedPercent": 85,
        "physicalProgressPercent": 12,
        "contractor": "Apex Purvanchal Buildtech Ltd",
        "contractorGstin": "09AAACA4489M1Z8",
        "riskScore": 94,
        "riskLevel": "critical",
        "triggerReason": "Physical progress certified at 12% after 180 days while 85% fund disbursed; contractor GSTIN marked inactive on GST Portal",
        "coordinates": [25.3176, 82.9739],
        "sanctionDate": "2024-03-14",
        "implementingAgency": "DRDA Varanasi",
        "nodalOfficer": "Shri A. K. Rai (Executive Engineer)",
        "disparityIndex": 73,
        "status": "Pending Supervisory Audit",
        "forensics": [
            {"rule": "Fund Disbursal vs Ground Progress Asymmetry", "severity": "Critical", "detail": "85% financial release against 12% civil foundation work (Variance: +73%)."},
            {"rule": "Vendor Tax Compliance Anomaly", "severity": "Critical", "detail": "GSTIN 09AAACA4489M1Z8 has been in 'Suspended' status since October 2024."},
            {"rule": "Geo-tagging Liveness Mismatch", "severity": "Warning", "detail": "Uploaded photos in e-Sakshi portal contain identical EXIF camera hashes from a 2022 project."}
        ]
    },
    {
        "id": "MPLADS-2024-UP-0412",
        "title": "Construction of Sub-Centre Health Clinic & Diagnostic Wing at Cholapur",
        "sector": "Healthcare & Diagnostic Units",
        "mpName": "Shri Narendra Modi",
        "house": "Lok Sabha",
        "constituency": "Varanasi",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "sanctionedAmountLakhs": 84.5,
        "disbursedPercent": 95,
        "physicalProgressPercent": 92,
        "contractor": "Kashi Urban Infrastructure Pvt Ltd",
        "contractorGstin": "09AAACK8129C1Z2",
        "riskScore": 32,
        "riskLevel": "standard",
        "triggerReason": "Routine milestone verification passed; all UCs submitted within stipulated 90-day window",
        "coordinates": [25.4312, 83.0514],
        "sanctionDate": "2024-01-18",
        "implementingAgency": "PWD Varanasi (Provincial Div)",
        "nodalOfficer": "Er. Rajeshwar Singh",
        "disparityIndex": 3,
        "status": "Verified & Cleared",
        "forensics": [
            {"rule": "Milestone Timeline Adherence", "severity": "Standard", "detail": "Civil works completed 14 days ahead of scheduled contract deadline."},
            {"rule": "Vendor Integrity Check", "severity": "Standard", "detail": "Valid active GSTIN and clear PFMS vendor bank mapping."}
        ]
    },
    {
        "id": "MPLADS-2024-MH-1102",
        "title": "Solarization of 25 Zilla Parishad Rural Schools in Haveli Block",
        "sector": "Education & Digital Classrooms",
        "mpName": "Smt. Supriya Sule",
        "house": "Lok Sabha",
        "constituency": "Baramati",
        "district": "Pune",
        "state": "Maharashtra",
        "sanctionedAmountLakhs": 48.2,
        "disbursedPercent": 60,
        "physicalProgressPercent": 20,
        "contractor": "Sahyadri Green Energies LLP",
        "contractorGstin": "27AABCS9192L1Z5",
        "riskScore": 88,
        "riskLevel": "critical",
        "triggerReason": "Split-tender threshold evasion: 5 contiguous work orders of ₹9.8L issued within 72 hours to bypass e-tender mandatory scrutiny",
        "coordinates": [18.5204, 73.8567],
        "sanctionDate": "2024-04-10",
        "implementingAgency": "Zilla Parishad Pune",
        "nodalOfficer": "Smt. Vandana Mane (BDO)",
        "disparityIndex": 40,
        "status": "Under Freeze Consideration",
        "forensics": [
            {"rule": "Artificial Tender Fragmentation (Clause 4.1)", "severity": "Critical", "detail": "Work broken into 5 orders under ₹10.00 Lakh threshold to avoid national GeM/e-procurement."},
            {"rule": "Single IP Bid Submission", "severity": "High", "detail": "All 3 competitor bids submitted from the identical broadband IP address."}
        ]
    },
    {
        "id": "MPLADS-2024-BR-0731",
        "title": "Reinforced Cement Concrete Link Road from NH-31 to Bakhtiyarpur Ghat",
        "sector": "Rural Roads & Culverts",
        "mpName": "Shri Ravi Shankar Prasad",
        "house": "Lok Sabha",
        "constituency": "Patna Sahib",
        "district": "Patna",
        "state": "Bihar",
        "sanctionedAmountLakhs": 145.0,
        "disbursedPercent": 90,
        "physicalProgressPercent": 35,
        "contractor": "Magadh Nirman Infrastructure",
        "contractorGstin": "10AABCM3312Q1Z9",
        "riskScore": 91,
        "riskLevel": "critical",
        "triggerReason": "Duplicate geo-coordinates detected: 100% spatial overlap with state PMGSY-III road asset sanctioned in FY2023",
        "coordinates": [25.5941, 85.1376],
        "sanctionDate": "2024-02-28",
        "implementingAgency": "RWD Patna Works Div",
        "nodalOfficer": "Er. Manoj Kumar Choudhary",
        "disparityIndex": 55,
        "status": "Flagged for Vigilance Inquiry",
        "forensics": [
            {"rule": "Spatial Asset Duplication", "severity": "Critical", "detail": "Survey of India GIS coordinates match PMGSY Road Asset #BR-PAT-092 (Asset collision: 98.6%)."},
            {"rule": "Double Invoicing Risk", "severity": "Critical", "detail": "Contractor billed identical gravel volume vouchers to both state and central accounts."}
        ]
    }
]

SEEDED_LOGS = [
    {
        "id": "AUD-2026-9941",
        "timestamp": "16 Sep 2026, 23:45:12 IST",
        "issueCategory": "LGD Code Mismatch",
        "sourceField": "district_name / lgd_entity_code",
        "rawVal": "Kashi (Legacy District Ref)",
        "resolvedVal": "Varanasi [LGD Code: 187]",
        "ruleApplied": "LGD Fuzzy Lexical & Census 2011 Entity Resolver (Score: 99.4%)",
        "status": "Auto-Resolved",
        "confidence": "99.4%",
        "datasetOrigin": "UP e-District Portal Sync Batch #819"
    },
    {
        "id": "AUD-2026-9940",
        "timestamp": "16 Sep 2026, 22:31:05 IST",
        "issueCategory": "Inverted GPS Coordinates",
        "sourceField": "geo_coordinates [lat, lon]",
        "rawVal": "82.9739, 25.3176",
        "resolvedVal": "25.3176 N, 82.9739 E (Validated within Varanasi bounding polygon)",
        "ruleApplied": "Boustrophedon Coordinate Inversion & Geofence Boundary Check",
        "status": "Auto-Resolved",
        "confidence": "100%",
        "datasetOrigin": "Mobile e-Sakshi Field Survey App v3.2"
    }
]

DASHBOARD_SUMMARY = {
    "totalSanctionedOutlay": {
        "value": "₹4,850.00 Cr",
        "rawCrores": 4850.0,
        "caption": "Current session MPLADS outlay sanctioned across 788 parliamentary constituencies and 28 states/UTs",
        "trend": "+4.2% YoY vs FY 2023-24"
    },
    "flaggedRiskOutlay": {
        "value": "₹412.35 Cr",
        "rawCrores": 412.35,
        "caption": "Fund exposure flagged by AI-assisted risk engine for supervisory review, field verification, and compliance scrutiny",
        "percentage": "8.5% of total sanctioned outlay"
    },
    "criticalAnomalies": {
        "value": "142 Works",
        "count": 142,
        "caption": "High and critical-risk projects involving tender splitting, inactive vendor records, duplicate geotags, or fund-progress asymmetry",
        "urgentActionCount": 38
    },
    "dataQualityResolved": {
        "value": "1,280 Records",
        "count": 1280,
        "caption": "Auto-corrected field data issues: LGD mismatches, GPS inversions, GSTIN reconciliation, and district-to-asset mapping defects",
        "successRate": "99.4% clean ingestion rate"
    }
}

RISK_SEVERITY_BREAKDOWN = {
    "critical": {"label": "Critical Risk", "count": 38, "amountCr": 124.50, "color": "#D32F2F", "scoreRange": "80-100"},
    "warning": {"label": "High Warning", "count": 104, "amountCr": 287.85, "color": "#F57C00", "scoreRange": "60-79"},
    "moderate": {"label": "Moderate Risk", "count": 312, "amountCr": 418.20, "color": "#FBC02D", "scoreRange": "40-59"},
    "standard": {"label": "Standard / Cleared", "count": 2450, "amountCr": 4019.45, "color": "#2E7D32", "scoreRange": "0-39"}
}

SECTOR_ALLOCATION = [
    {"sector": "Drinking Water & Sanitation", "sanctionedCr": 1240.0, "flaggedCr": 98.4, "share": "25.6%", "icon": "Droplet"},
    {"sector": "Education & Digital Classrooms", "sanctionedCr": 980.5, "flaggedCr": 82.1, "share": "20.2%", "icon": "GraduationCap"},
    {"sector": "Rural Roads & Culverts", "sanctionedCr": 890.0, "flaggedCr": 112.5, "share": "18.4%", "icon": "Milestone"},
    {"sector": "Healthcare & Diagnostic Units", "sanctionedCr": 720.0, "flaggedCr": 64.2, "share": "14.8%", "icon": "Stethoscope"},
    {"sector": "Community Assets & Halls", "sanctionedCr": 490.0, "flaggedCr": 34.0, "share": "10.1%", "icon": "Home"},
    {"sector": "Renewable & Solar Streetlights", "sanctionedCr": 310.5, "flaggedCr": 12.8, "share": "6.4%", "icon": "Sun"},
    {"sector": "Irrigation & Flood Drainage", "sanctionedCr": 219.0, "flaggedCr": 8.35, "share": "4.5%", "icon": "Waves"}
]
