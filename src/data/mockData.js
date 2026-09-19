// ==========================================================================
// NidhiDrishti (निधिदृष्टि) - Realistic Indian MPLADS Surveillance Dataset
// Scheme: Members of Parliament Local Area Development Scheme (MPLADS)
// Ministry of Statistics and Programme Implementation (MoSPI), Govt of India
// ==========================================================================

export const ROLES = [
  {
    id: 'ministry',
    title: 'Ministry (MoSPI Central Vigilance)',
    titleHi: 'मंत्रालय (सांख्यिकी एवं कार्यक्रम कार्यान्वयन केंद्रीय सतर्कता)',
    scope: 'National Aggregate Overview',
    scopeHi: 'अखिल भारतीय समग्र निगरानी',
    officer: 'Dr. Rajiv Kumar Sharma, IAS',
    designation: 'Additional Secretary & CVO, MoSPI',
    badge: 'National Vigilance Admin',
    badgeHi: 'राष्ट्रीय सतर्कता प्रशासक',
    welcomeMessage: 'Welcome to Central Vigilance Directorate — Monitoring 543 Lok Sabha & 245 Rajya Sabha Outlays'
  },
  {
    id: 'sna',
    title: 'State Nodal Authority (SNA - Uttar Pradesh)',
    titleHi: 'राज्य नोडल प्राधिकरण (उत्तर प्रदेश योजना विभाग)',
    scope: 'State Planning & Inter-District Audit',
    scopeHi: 'राज्य योजना एवं अंतर-जिला लेखापरीक्षा',
    officer: 'Smt. Ananya Srivastava, IAS',
    designation: 'Principal Secretary (Planning), Govt of UP',
    badge: 'State Nodal Officer',
    badgeHi: 'राज्य नोडल अधिकारी',
    welcomeMessage: 'State Surveillance Console — 80 Parliamentary Constituencies (UP Chapter)'
  },
  {
    id: 'district',
    title: 'District Authority (DM / Collector - Varanasi)',
    titleHi: 'जिला प्राधिकरण (जिलाधिकारी / कलेक्टर - वाराणसी)',
    scope: 'District Execution & Site Inspections',
    scopeHi: 'जिला निष्पादन एवं स्थलीय निरीक्षण',
    officer: 'Shri S. Rajalingam, IAS',
    designation: 'District Magistrate & District Authority, Varanasi',
    badge: 'District Magistrate Office',
    badgeHi: 'जिलाधिकारी कार्यालय',
    welcomeMessage: 'Varanasi District Monitoring Console — 14 Blocks & 1,280 Panchayat Wards'
  },
  {
    id: 'mp',
    title: 'Member of Parliament (MP - Varanasi Constituency)',
    titleHi: 'संसद सदस्य (सांसद - वाराणसी संसदीय क्षेत्र)',
    scope: 'Constituency Development & Sanction Pipeline',
    scopeHi: 'संसदीय क्षेत्र विकास एवं संस्तुति ट्रैकिंग',
    officer: 'Shri Narendra Modi',
    designation: 'Member of Parliament, Lok Sabha (Varanasi, UP)',
    badge: 'Hon’ble MP Dashboard',
    badgeHi: 'माननीय सांसद डैशबोर्ड',
    welcomeMessage: 'Constituency Progress Portal — Track Sanctions, Citizen Feedback & Asset Handover'
  },
  {
    id: 'citizen',
    title: 'Citizen / Whistleblower (Jan-Bhagidari & CPGRAMS)',
    titleHi: 'नागरिक / सतर्कता सूचनाकर्ता (जन-भागीदारी)',
    scope: 'Public Transparency & Whistleblower Grievances',
    scopeHi: 'सार्वजनिक पारदर्शिता एवं नागरिक शिकायतें',
    officer: 'Citizen of India (जन साधारण)',
    designation: 'Public Transparency & Vigilance Whistleblower',
    badge: 'Jan-Drishti Portal',
    badgeHi: 'जन-दृष्टि पोर्टल',
    welcomeMessage: 'Jan-Bhagidari Transparency Portal — Track your MP’s spending, inspect asset photos & submit whistleblower reports directly to the District Collector.'
  }
];

export const SUMMARY_METRICS = {
  totalSanctionedOutlay: {
    value: '₹4,850.00 Cr',
    rawCrores: 4850.0,
    caption: 'Total cumulative outlay sanctioned under current session (788 Constituencies)',
    trend: '+4.2% YoY'
  },
  flaggedRiskOutlay: {
    value: '₹412.35 Cr',
    rawCrores: 412.35,
    caption: 'Sanctioned funds flagged by AI multi-factor risk engine requiring supervisory audit',
    percentage: '8.5% of total outlay'
  },
  criticalAnomalies: {
    value: '142 Works',
    count: 142,
    caption: 'High & Critical severity works triggering collusion, tender splitting, or ghost assets',
    urgentActionCount: 38
  },
  dataQualityResolved: {
    value: '1,280 Records',
    count: 1280,
    caption: 'Data ingestion discrepancies auto-reconciled (LGD codes, GPS coordinates, GSTIN)',
    successRate: '99.4% clean rate'
  }
};

export const RISK_SEVERITY_BREAKDOWN = {
  critical: { label: 'Critical Risk', count: 38, amountCr: 124.50, color: '#D32F2F', scoreRange: '80-100' },
  warning: { label: 'High Warning', count: 104, amountCr: 287.85, color: '#F57C00', scoreRange: '60-79' },
  moderate: { label: 'Moderate Risk', count: 312, amountCr: 418.20, color: '#FBC02D', scoreRange: '40-59' },
  standard: { label: 'Standard / Cleared', count: 2450, amountCr: 4019.45, color: '#2E7D32', scoreRange: '0-39' }
};

export const SECTOR_ALLOCATION = [
  { sector: 'Drinking Water & Sanitation', sanctionedCr: 1240.0, flaggedCr: 98.4, share: '25.6%', icon: 'Droplet' },
  { sector: 'Education & Digital Classrooms', sanctionedCr: 980.5, flaggedCr: 82.1, share: '20.2%', icon: 'GraduationCap' },
  { sector: 'Rural Roads & Culverts', sanctionedCr: 890.0, flaggedCr: 112.5, share: '18.4%', icon: 'Milestone' },
  { sector: 'Healthcare & Diagnostic Units', sanctionedCr: 720.0, flaggedCr: 64.2, share: '14.8%', icon: 'Stethoscope' },
  { sector: 'Community Assets & Halls', sanctionedCr: 490.0, flaggedCr: 34.0, share: '10.1%', icon: 'Home' },
  { sector: 'Renewable & Solar Streetlights', sanctionedCr: 310.5, flaggedCr: 12.8, share: '6.4%', icon: 'Sun' },
  { sector: 'Irrigation & Flood Drainage', sanctionedCr: 219.0, flaggedCr: 8.35, share: '4.5%', icon: 'Waves' }
];

export const MPLADS_WORKS = [
  {
    id: 'MPLADS-2024-UP-0889',
    title: 'Installation of 12 Solar High-Mast RO Drinking Water Plants in Sevapuri Block',
    sector: 'Drinking Water & Sanitation',
    mpName: 'Shri Narendra Modi',
    house: 'Lok Sabha',
    constituency: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    sanctionedAmountLakhs: 96.8,
    disbursedPercent: 85,
    physicalProgressPercent: 12,
    contractor: 'Apex Purvanchal Buildtech Ltd',
    contractorGstin: '09AAACA4489M1Z8',
    riskScore: 94,
    riskLevel: 'critical',
    triggerReason: 'Physical progress certified at 12% after 180 days while 85% fund disbursed; contractor GSTIN marked inactive on GST Portal',
    coordinates: [25.3176, 82.9739],
    sanctionDate: '2024-03-14',
    implementingAgency: 'DRDA Varanasi',
    nodalOfficer: 'Shri A. K. Rai (Executive Engineer)',
    disparityIndex: 73,
    status: 'Pending Supervisory Audit',
    forensics: [
      { rule: 'Fund Disbursal vs Ground Progress Asymmetry', severity: 'Critical', detail: '85% financial release against 12% civil foundation work (Variance: +73%).' },
      { rule: 'Vendor Tax Compliance Anomaly', severity: 'Critical', detail: 'GSTIN 09AAACA4489M1Z8 has been in "Suspended" status since October 2024.' },
      { rule: 'Geo-tagging Liveness Mismatch', severity: 'Warning', detail: 'Uploaded photos in e-Sakshi portal contain identical EXIF camera hashes from a 2022 project.' }
    ]
  },
  {
    id: 'MPLADS-2024-UP-0412',
    title: 'Construction of Sub-Centre Health Clinic & Diagnostic Wing at Cholapur',
    sector: 'Healthcare & Diagnostic Units',
    mpName: 'Shri Narendra Modi',
    house: 'Lok Sabha',
    constituency: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    sanctionedAmountLakhs: 84.5,
    disbursedPercent: 95,
    physicalProgressPercent: 92,
    contractor: 'Kashi Urban Infrastructure Pvt Ltd',
    contractorGstin: '09AAACK8129C1Z2',
    riskScore: 32,
    riskLevel: 'standard',
    triggerReason: 'Routine milestone verification passed; all UCs submitted within stipulated 90-day window',
    coordinates: [25.4312, 83.0514],
    sanctionDate: '2024-01-18',
    implementingAgency: 'PWD Varanasi (Provincial Div)',
    nodalOfficer: 'Er. Rajeshwar Singh',
    disparityIndex: 3,
    status: 'Verified & Cleared',
    forensics: [
      { rule: 'Milestone Timeline Adherence', severity: 'Standard', detail: 'Civil works completed 14 days ahead of scheduled contract deadline.' },
      { rule: 'Vendor Integrity Check', severity: 'Standard', detail: 'Valid active GSTIN and clear PFMS vendor bank mapping.' }
    ]
  },
  {
    id: 'MPLADS-2024-MH-1102',
    title: 'Solarization of 25 Zilla Parishad Rural Schools in Haveli Block',
    sector: 'Education & Digital Classrooms',
    mpName: 'Smt. Supriya Sule',
    house: 'Lok Sabha',
    constituency: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    sanctionedAmountLakhs: 48.2,
    disbursedPercent: 60,
    physicalProgressPercent: 20,
    contractor: 'Sahyadri Green Energies LLP',
    contractorGstin: '27AABCS9192L1Z5',
    riskScore: 88,
    riskLevel: 'critical',
    triggerReason: 'Split-tender threshold evasion: 5 contiguous work orders of ₹9.8L issued within 72 hours to bypass e-tender mandatory scrutiny',
    coordinates: [18.5204, 73.8567],
    sanctionDate: '2024-04-10',
    implementingAgency: 'Zilla Parishad Pune',
    nodalOfficer: 'Smt. Vandana Mane (BDO)',
    disparityIndex: 40,
    status: 'Under Freeze Consideration',
    forensics: [
      { rule: 'Artificial Tender Fragmentation (Clause 4.1)', severity: 'Critical', detail: 'Work broken into 5 orders under ₹10.00 Lakh threshold to avoid national GeM/e-procurement.' },
      { rule: 'Single IP Bid Submission', severity: 'High', detail: 'All 3 competitor bids submitted from the identical broadband IP address.' }
    ]
  },
  {
    id: 'MPLADS-2024-BR-0731',
    title: 'Reinforced Cement Concrete Link Road from NH-31 to Bakhtiyarpur Ghat',
    sector: 'Rural Roads & Culverts',
    mpName: 'Shri Ravi Shankar Prasad',
    house: 'Lok Sabha',
    constituency: 'Patna Sahib',
    district: 'Patna',
    state: 'Bihar',
    sanctionedAmountLakhs: 145.0,
    disbursedPercent: 90,
    physicalProgressPercent: 35,
    contractor: 'Magadh Nirman Infrastructure',
    contractorGstin: '10AABCM3312Q1Z9',
    riskScore: 91,
    riskLevel: 'critical',
    triggerReason: 'Duplicate geo-coordinates detected: 100% spatial overlap with state PMGSY-III road asset sanctioned in FY2023',
    coordinates: [25.5941, 85.1376],
    sanctionDate: '2024-02-28',
    implementingAgency: 'RWD Patna Works Div',
    nodalOfficer: 'Er. Manoj Kumar Choudhary',
    disparityIndex: 55,
    status: 'Flagged for Vigilance Inquiry',
    forensics: [
      { rule: 'Spatial Asset Duplication', severity: 'Critical', detail: 'Survey of India GIS coordinates match PMGSY Road Asset #BR-PAT-092 (Asset collision: 98.6%).' },
      { rule: 'Double Invoicing Risk', severity: 'Critical', detail: 'Contractor billed identical gravel volume vouchers to both state and central accounts.' }
    ]
  },
  {
    id: 'MPLADS-2024-RJ-0544',
    title: 'Installation of 80 Deep Borewell Handpumps in Dudu Tehsil',
    sector: 'Drinking Water & Sanitation',
    mpName: 'Shri Ramcharan Bohra',
    house: 'Lok Sabha',
    constituency: 'Jaipur',
    district: 'Jaipur',
    state: 'Rajasthan',
    sanctionedAmountLakhs: 62.0,
    disbursedPercent: 50,
    physicalProgressPercent: 45,
    contractor: 'Marwar Jal Projects Ltd',
    contractorGstin: '08AABCM7761P1Z4',
    riskScore: 72,
    riskLevel: 'warning',
    triggerReason: 'Repeated contractor awards: 8th consecutive water contract awarded to single entity across 6 months; Herfindahl monopoly index 0.82',
    coordinates: [26.9124, 75.7873],
    sanctionDate: '2024-05-02',
    implementingAgency: 'PHED Jaipur Rural',
    nodalOfficer: 'Shri Dinesh Gehlot (SE)',
    disparityIndex: 5,
    status: 'Under Review',
    forensics: [
      { rule: 'Contractor Concentration / Monopoly', severity: 'High', detail: 'Single entity controls 78% of all water sanctions in Jaipur Rural district.' }
    ]
  },
  {
    id: 'MPLADS-2024-KA-0922',
    title: 'Upgradation of Science Laboratories in 14 Govt Pre-University Colleges',
    sector: 'Education & Digital Classrooms',
    mpName: 'Shri Tejasvi Surya',
    house: 'Lok Sabha',
    constituency: 'Bangalore South',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    sanctionedAmountLakhs: 110.0,
    disbursedPercent: 75,
    physicalProgressPercent: 72,
    contractor: 'Karnataka Educational Supplies Co',
    contractorGstin: '29AABCK1098F1Z3',
    riskScore: 28,
    riskLevel: 'standard',
    triggerReason: 'Asset delivery verified via RFID tagging; geotagged lab inventory complete',
    coordinates: [12.9716, 77.5946],
    sanctionDate: '2024-01-05',
    implementingAgency: 'DPI Karnataka',
    nodalOfficer: 'Smt. Jayanthi Murthy',
    disparityIndex: 3,
    status: 'Verified & Cleared',
    forensics: [
      { rule: 'Inventory Verification', severity: 'Standard', detail: 'Complete QR code scanning verified by external block auditor.' }
    ]
  },
  {
    id: 'MPLADS-2024-AS-0318',
    title: 'Construction of Multi-Purpose Flood Shelter & Community Asset at Palashbari',
    sector: 'Community Assets & Halls',
    mpName: 'Smt. Queen Oja',
    house: 'Lok Sabha',
    constituency: 'Gauhati',
    district: 'Kamrup',
    state: 'Assam',
    sanctionedAmountLakhs: 125.0,
    disbursedPercent: 70,
    physicalProgressPercent: 30,
    contractor: 'Brahmaputra Structural Engineers',
    contractorGstin: '18AABCB6621R1Z1',
    riskScore: 78,
    riskLevel: 'warning',
    triggerReason: 'Unapproved structural plan deviation; 9-month delay in second tranche utilization certificate',
    coordinates: [26.1445, 91.7362],
    sanctionDate: '2023-11-20',
    implementingAgency: 'PWD Assam (Building Div)',
    nodalOfficer: 'Er. Hemanta Kalita',
    disparityIndex: 40,
    status: 'Pending Physical Verification',
    forensics: [
      { rule: 'Utilization Certificate (UC) Delay', severity: 'High', detail: 'Overdue by 270 days past standard 90-day MoSPI ceiling.' },
      { rule: 'Structural Scope Modification', severity: 'Moderate', detail: 'Floor area reduced by 22% without revised administrative sanction.' }
    ]
  },
  {
    id: 'MPLADS-2024-TN-0651',
    title: 'Modernization of Neonatal Care Units in Madurai Government Medical College',
    sector: 'Healthcare & Diagnostic Units',
    mpName: 'Shri Su. Venkatesan',
    house: 'Lok Sabha',
    constituency: 'Madurai',
    district: 'Madurai',
    state: 'Tamil Nadu',
    sanctionedAmountLakhs: 180.0,
    disbursedPercent: 88,
    physicalProgressPercent: 85,
    contractor: 'Pandian Meditech Devices Corp',
    contractorGstin: '33AABCP4412M1Z0',
    riskScore: 22,
    riskLevel: 'standard',
    triggerReason: 'Biomedical equipment calibrated, commissioned, and operational under state health registry',
    coordinates: [9.9252, 78.1198],
    sanctionDate: '2023-10-15',
    implementingAgency: 'TN Medical Services Corp (TNMSC)',
    nodalOfficer: 'Dr. M. Senthil Nathan',
    disparityIndex: 3,
    status: 'Verified & Cleared',
    forensics: [
      { rule: 'Equipment Commissioning Protocol', severity: 'Standard', detail: 'All incubators certified by National Accreditation Board for Testing and Calibration Laboratories (NABL).' }
    ]
  },
  {
    id: 'MPLADS-2024-GJ-0219',
    title: 'Construction of Cold Storage Sorting Shed & Packhouse for Milk Producers',
    sector: 'Community Assets & Halls',
    mpName: 'Dr. S. Jaishankar',
    house: 'Rajya Sabha',
    constituency: 'Gujarat (State Representative)',
    district: 'Anand',
    state: 'Gujarat',
    sanctionedAmountLakhs: 98.0,
    disbursedPercent: 80,
    physicalProgressPercent: 78,
    contractor: 'Charotar Agro Infra Pvt Ltd',
    contractorGstin: '24AABCC8811K1Z7',
    riskScore: 35,
    riskLevel: 'standard',
    triggerReason: 'Physical inspection completed by District Planning Committee with geo-tag evidence',
    coordinates: [22.5645, 72.9289],
    sanctionDate: '2024-02-10',
    implementingAgency: 'Anand District Panchayat',
    nodalOfficer: 'Shri B. R. Patel (DDO)',
    disparityIndex: 2,
    status: 'Verified & Cleared',
    forensics: [
      { rule: 'Asset Utility Certification', severity: 'Standard', detail: 'Certified compliant with MPLADS 2023 Community Dairy Guidelines.' }
    ]
  },
  {
    id: 'MPLADS-2024-UP-0994',
    title: 'Construction of Commercial Market Stalls near Cantt Railway Station',
    sector: 'Community Assets & Halls',
    mpName: 'Shri Narendra Modi',
    house: 'Lok Sabha',
    constituency: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    sanctionedAmountLakhs: 115.0,
    disbursedPercent: 40,
    physicalProgressPercent: 15,
    contractor: 'Kashi Real Estate & Projects',
    contractorGstin: '09AABCK5544N1Z6',
    riskScore: 96,
    riskLevel: 'critical',
    triggerReason: 'Prohibited asset category violation: Commercial shopping stalls violate Clause 5.2 (Prohibited List of MPLADS Guidelines 2023)',
    coordinates: [25.3289, 82.9868],
    sanctionDate: '2024-06-01',
    implementingAgency: 'Varanasi Municipal Corp (VNN)',
    nodalOfficer: 'Shri Akshat Verma (Municipal Commissioner)',
    disparityIndex: 25,
    status: 'Immediate Outlay Freeze Ordered',
    forensics: [
      { rule: 'Ineligible Item on Negative List', severity: 'Critical', detail: 'Commercial income-generating kiosks are strictly barred from MPLADS financing under MoSPI norms.' },
      { rule: 'Unauthorized Tender Initiation', severity: 'High', detail: 'Executive Engineer issued tender without prior formal District Collector sanction.' }
    ]
  },
  {
    id: 'MPLADS-2024-MH-0847',
    title: 'Desilting and Deepening of 6 Percolation Tanks in Baramati Drought Belt',
    sector: 'Irrigation & Flood Drainage',
    mpName: 'Smt. Supriya Sule',
    house: 'Lok Sabha',
    constituency: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    sanctionedAmountLakhs: 75.0,
    disbursedPercent: 65,
    physicalProgressPercent: 60,
    contractor: 'Vidarbha Water Solutions',
    contractorGstin: '27AABCV3322E1Z8',
    riskScore: 48,
    riskLevel: 'moderate',
    triggerReason: 'Drone volumetric earthwork verification differs by 18% from contractor measurement book',
    coordinates: [18.1517, 74.5771],
    sanctionDate: '2024-03-01',
    implementingAgency: 'Water Conservation Dept Pune',
    nodalOfficer: 'Er. Sachin Shinde',
    disparityIndex: 5,
    status: 'Pending Cross-Audit',
    forensics: [
      { rule: 'Volumetric Excavation Mismatch', severity: 'Moderate', detail: 'Satellite radar backscatter indicates slightly lower excavation volume than billed.' }
    ]
  },
  {
    id: 'MPLADS-2024-OR-0455',
    title: 'Installation of 500 Solar LED Street Lighting Systems in Sambalpur Tribal Villages',
    sector: 'Renewable & Solar Streetlights',
    mpName: 'Shri Dharmendra Pradhan',
    house: 'Lok Sabha',
    constituency: 'Sambalpur',
    district: 'Sambalpur',
    state: 'Odisha',
    sanctionedAmountLakhs: 85.0,
    disbursedPercent: 90,
    physicalProgressPercent: 88,
    contractor: 'Utkal Solar Grid Solutions',
    contractorGstin: '21AABCU7711B1Z2',
    riskScore: 24,
    riskLevel: 'standard',
    triggerReason: 'All 500 streetlights equipped with IoT GSM remote monitoring chips reporting daily battery health',
    coordinates: [21.4669, 83.9812],
    sanctionDate: '2023-12-12',
    implementingAgency: 'OREDA Sambalpur',
    nodalOfficer: 'Shri P. K. Mohapatra',
    disparityIndex: 2,
    status: 'Verified & Cleared',
    forensics: [
      { rule: 'IoT Smart Grid Telemetry', severity: 'Standard', detail: 'Automated 100% telemetry uptime confirmed by Central Monitoring Unit.' }
    ]
  },
  {
    id: 'MPLADS-2024-KL-0382',
    title: 'Construction of Coastal Fishermen Community Multipurpose Cyclone Center',
    sector: 'Community Assets & Halls',
    mpName: 'Shri Shashi Tharoor',
    house: 'Lok Sabha',
    constituency: 'Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    sanctionedAmountLakhs: 160.0,
    disbursedPercent: 82,
    physicalProgressPercent: 40,
    contractor: 'Malabar Coastal Construction Corp',
    contractorGstin: '32AABCM9901C1Z4',
    riskScore: 74,
    riskLevel: 'warning',
    triggerReason: 'Coastal Regulation Zone (CRZ) clearance document expired prior to contract agreement signing',
    coordinates: [8.5241, 76.9366],
    sanctionDate: '2023-09-08',
    implementingAgency: 'Harbour Engineering Dept',
    nodalOfficer: 'Er. K. Suresh Kumar',
    disparityIndex: 42,
    status: 'Statutory Clearance Review',
    forensics: [
      { rule: 'Statutory Compliance Defect', severity: 'High', detail: 'CRZ Category-I clearance not re-validated within mandatory 3-year statutory cycle.' }
    ]
  },
  {
    id: 'MPLADS-2024-WB-0589',
    title: 'Repair and Bituminous Resurfacing of Rural Arterial Road to Diamond Harbour',
    sector: 'Rural Roads & Culverts',
    mpName: 'Shri Abhishek Banerjee',
    house: 'Lok Sabha',
    constituency: 'Diamond Harbour',
    district: 'South 24 Parganas',
    state: 'West Bengal',
    sanctionedAmountLakhs: 130.0,
    disbursedPercent: 95,
    physicalProgressPercent: 28,
    contractor: 'Sundarbans Heavy Civil Works',
    contractorGstin: '19AABCS8823K1Z9',
    riskScore: 93,
    riskLevel: 'critical',
    triggerReason: 'Disbursement of final payment tranche without uploading certified lab road core density test report',
    coordinates: [22.1965, 88.2014],
    sanctionDate: '2024-01-22',
    implementingAgency: 'Zilla Parishad South 24 Parganas',
    nodalOfficer: 'Shri Subrata Das (District Engineer)',
    disparityIndex: 67,
    status: 'Pending Vigilance Charge Sheet',
    forensics: [
      { rule: 'Quality Control Mandatory Test Bypass', severity: 'Critical', detail: 'Compaction and bitumen binder test certificates omitted from PFMS expenditure voucher.' },
      { rule: 'Disparity Outlier', severity: 'Critical', detail: '95% disbursed against 28% field completion recorded in local public complaint repository.' }
    ]
  }
];

export const INGESTION_AUDIT_LOGS = [
  {
    id: 'AUD-2026-9941',
    timestamp: '16 Sep 2026, 23:45:12 IST',
    issueCategory: 'LGD Code Mismatch',
    sourceField: 'district_name / lgd_entity_code',
    rawVal: 'Kashi (Legacy District Ref)',
    resolvedVal: 'Varanasi [LGD Code: 187]',
    ruleApplied: 'LGD Fuzzy Lexical & Census 2011 Entity Resolver (Score: 99.4%)',
    status: 'Auto-Resolved',
    confidence: '99.4%',
    datasetOrigin: 'UP e-District Portal Sync Batch #819'
  },
  {
    id: 'AUD-2026-9940',
    timestamp: '16 Sep 2026, 22:31:05 IST',
    issueCategory: 'Inverted GPS Coordinates',
    sourceField: 'geo_coordinates [lat, lon]',
    rawVal: '82.9739, 25.3176',
    resolvedVal: '25.3176 N, 82.9739 E (Validated within Varanasi bounding polygon)',
    ruleApplied: 'Boustrophedon Coordinate Inversion & Geofence Boundary Check',
    status: 'Auto-Resolved',
    confidence: '100%',
    datasetOrigin: 'Mobile e-Sakshi Field Survey App v3.2'
  },
  {
    id: 'AUD-2026-9939',
    timestamp: '16 Sep 2026, 21:14:48 IST',
    issueCategory: 'Invalid GSTIN Checksum',
    sourceField: 'vendor_gstin',
    rawVal: '09AAACA4489M1Z8 (Inactive/Flagged)',
    resolvedVal: 'Cross-verified with GSTN API: Flagged "SUSPENDED" on 12-Oct-2024',
    ruleApplied: 'Direct GSTN Verification Gateway & Modulo-36 Checksum Validation',
    status: 'Vigilance Triggered',
    confidence: '100%',
    datasetOrigin: 'PFMS Treasury Voucher Feed #1104'
  },
  {
    id: 'AUD-2026-9938',
    timestamp: '16 Sep 2026, 19:50:22 IST',
    issueCategory: 'Date Sequence Inversion',
    sourceField: 'sanction_date vs exp_date',
    rawVal: 'Exp: 2024-01-10; Sanction: 2024-02-15',
    resolvedVal: 'Re-sequenced to Preliminary Survey Advance; Flagged for Retrospective Sanction Review',
    ruleApplied: 'General Financial Rules (GFR 2017) Rule 130 Chronology Validator',
    status: 'Auto-Resolved',
    confidence: '96.2%',
    datasetOrigin: 'State Nodal Authority Batch XML'
  },
  {
    id: 'AUD-2026-9937',
    timestamp: '16 Sep 2026, 17:18:30 IST',
    issueCategory: 'Duplicate PFMS Voucher ID',
    sourceField: 'pfms_voucher_ref_no',
    rawVal: 'VCHR-2024-00982-A (Duplicate in 2 Batches)',
    resolvedVal: 'Deduplicated via SHA-256 Payload Fingerprinting; Duplicate Transaction Rejected',
    ruleApplied: 'Idempotent Transaction Dedup Engine',
    status: 'Auto-Resolved',
    confidence: '100%',
    datasetOrigin: 'Central PFMS Mirror Stream'
  },
  {
    id: 'AUD-2026-9936',
    timestamp: '16 Sep 2026, 15:42:19 IST',
    issueCategory: 'Sanction Outlay Ceiling Exceeded',
    sourceField: 'sanction_amount_lakhs',
    rawVal: '₹10,50,00,000 (Exceeds Single Work ₹5 Cr Cap without Special MoSPI Waiver)',
    resolvedVal: 'Flagged for High-Value Sanction Committee Review (Clause 3.4)',
    ruleApplied: 'Statutory MPLADS Sanction Ceiling Validator',
    status: 'Manual Review Required',
    confidence: '98.5%',
    datasetOrigin: 'District Planning Cell Data Dump'
  },
  {
    id: 'AUD-2026-9935',
    timestamp: '16 Sep 2026, 14:10:04 IST',
    issueCategory: 'Sector Nomenclature Discrepancy',
    sourceField: 'work_sector_name',
    rawVal: 'Pey-jal / Tube Well Construction',
    resolvedVal: 'Standardized to: Drinking Water & Sanitation (Code SEC-01)',
    ruleApplied: 'Indic NLP Synonym Standardizer & MoSPI Schema Taxonomy v4',
    status: 'Auto-Resolved',
    confidence: '99.8%',
    datasetOrigin: 'State Panchayat MIS Interface'
  },
  {
    id: 'AUD-2026-9934',
    timestamp: '16 Sep 2026, 11:22:45 IST',
    issueCategory: 'Incomplete Bank Account IFSC',
    sourceField: 'contractor_bank_ifsc',
    rawVal: 'SBIN000049 (10 chars - missing digit)',
    resolvedVal: 'Resolved to SBIN0000494 (State Bank of India, Varanasi Main Branch)',
    ruleApplied: 'RBI National IFSC Directory Regex and Branch Locator Service',
    status: 'Auto-Resolved',
    confidence: '97.5%',
    datasetOrigin: 'PFMS Vendor Registration Form'
  }
];

export const DISTRICT_ANALYTICS = [
  { district: 'Varanasi', state: 'Uttar Pradesh', totalWorks: 128, flaggedCount: 14, riskOutlayCr: 32.4, monopolyIndex: '0.42 (Medium)', spendingVelocity: '78%' },
  { district: 'Patna', state: 'Bihar', totalWorks: 112, flaggedCount: 19, riskOutlayCr: 45.2, monopolyIndex: '0.74 (High)', spendingVelocity: '62%' },
  { district: 'Pune', state: 'Maharashtra', totalWorks: 154, flaggedCount: 11, riskOutlayCr: 28.6, monopolyIndex: '0.38 (Low)', spendingVelocity: '84%' },
  { district: 'South 24 Parganas', state: 'West Bengal', totalWorks: 96, flaggedCount: 18, riskOutlayCr: 42.1, monopolyIndex: '0.81 (Critical)', spendingVelocity: '51%' },
  { district: 'Jaipur', state: 'Rajasthan', totalWorks: 140, flaggedCount: 12, riskOutlayCr: 29.8, monopolyIndex: '0.68 (High)', spendingVelocity: '72%' },
  { district: 'Kamrup', state: 'Assam', totalWorks: 88, flaggedCount: 9, riskOutlayCr: 21.0, monopolyIndex: '0.52 (Medium)', spendingVelocity: '66%' },
  { district: 'Bengaluru Urban', state: 'Karnataka', totalWorks: 165, flaggedCount: 4, riskOutlayCr: 8.5, monopolyIndex: '0.24 (Healthy)', spendingVelocity: '91%' }
];

// ==========================================================================
// Bilingual Internationalization Dictionary (English & Rajbhasha Hindi)
// ==========================================================================
export const I18N_STRINGS = {
  en: {
    portalName: 'NidhiDrishti',
    portalHindi: 'निधिदृष्टि',
    portalSubtitle: 'Ministry of Statistics and Programme Implementation',
    portalSubHindi: 'सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय | Government of India',
    badgeText: 'MPLADS AI VIGILANCE',
    liveSync: 'e-Sakshi Live Sync',
    roleLabel: 'Active Official Persona',
    tickerAlert: '🚨 DIRECTIVE: Mandatory 10% annual physical verification by District Collectors before Q3 tranche release | e-Sakshi 2.0 API gateway operational | 142 works under active surveillance.',
    navDashboard: 'Risk Overview Dashboard',
    navHeatmap: 'Geospatial Risk Heatmap',
    navQueue: 'AI Anomaly & Risk Queue',
    navSandbox: '⚡ AI Risk Engine Sandbox',
    navQuality: 'Ingestion Data Quality Trail',
    navAnalytics: 'Constituency & Analytics',
    navGuidelines: 'MPLADS Guidelines & SOPs',
    navCitizenGrievance: 'Jan-Drishti Whistleblower',
    kpiSanctioned: 'Total Sanctioned Outlay',
    kpiFlagged: 'Flagged Risk Outlay',
    kpiCritical: 'Critical Anomalies',
    kpiClean: 'Data Quality Resolved',
    inspectDossier: 'Inspect Forensic Dossier',
    freezeOutlay: 'Freeze Outlay Disbursement',
    orderInspection: 'Order Physical Site Inspection',
    generateOrder: 'Generate Official Order (G.O.)',
    dismissFlag: 'Dismiss / Mark Cleared',
    reportGhostAsset: 'Report Ghost Asset / Grievance',
    aiScore: 'AI Risk Score',
    riskCritical: 'Critical Risk',
    riskWarning: 'High Warning',
    riskModerate: 'Moderate Risk',
    riskStandard: 'Standard / Cleared'
  },
  hi: {
    portalName: 'निधिदृष्टि',
    portalHindi: 'NidhiDrishti',
    portalSubtitle: 'सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय',
    portalSubHindi: 'भारत सरकार | Government of India',
    badgeText: 'सांसद निधि एआई निगरानी',
    liveSync: 'ई-साक्षी सजीव समन्वय',
    roleLabel: 'सक्रिय आधिकारिक पदभार',
    tickerAlert: '🚨 आधिकारिक निर्देश: तृतीय त्रैमासिक किश्त से पूर्व जिलाधिकारियों द्वारा 10% अनिवार्य भौतिक सत्यापन पूर्ण किया जाए | ई-साक्षी 2.0 गेटवे सक्रिय | 142 कार्य निगरानी अधीन।',
    navDashboard: 'जोखिम अवलोकन डैशबोर्ड',
    navHeatmap: 'भू-स्थानिक जोखिम मानचित्र',
    navQueue: 'एआई विसंगति एवं जोखिम सूची',
    navSandbox: '⚡ एआई जोखिम इंजन सैंडबॉक्स',
    navQuality: 'डेटा गुणवत्ता एवं ऑडिट ट्रेल',
    navAnalytics: 'संसदीय क्षेत्र एवं विश्लेषण',
    navGuidelines: 'सांसद निधि दिशानिर्देश एवं एसओपी',
    navCitizenGrievance: 'जन-दृष्टि सतर्कता शिकायत',
    kpiSanctioned: 'कुल स्वीकृत वित्तीय परिव्यय',
    kpiFlagged: 'चिह्नित जोखिम परिव्यय',
    kpiCritical: 'अति-संवेदनशील विसंगतियां',
    kpiClean: 'स्वचालित शुद्ध डेटा रिकॉर्ड',
    inspectDossier: 'फोरेंसिक डॉसियर देखें',
    freezeOutlay: 'वित्तीय संवितरण पर रोक लगाएं',
    orderInspection: 'स्थलीय भौतिक जांच आदेश दें',
    generateOrder: 'आधिकारिक शासनादेश जारी करें',
    dismissFlag: 'सत्यापित एवं स्वीकृत करें',
    reportGhostAsset: 'अस्तित्वहीन कार्य की शिकायत करें',
    aiScore: 'एआई जोखिम स्कोर',
    riskCritical: 'अति-संवेदनशील जोखिम',
    riskWarning: 'उच्च चेतावनी',
    riskModerate: 'मध्यम जोखिम',
    riskStandard: 'मानक / स्वीकृत'
  }
};

// ==========================================================================
// Interactive AI Risk Engine Sandbox Presets (SIH Jury Test Scenarios)
// ==========================================================================
export const AI_SANDBOX_PRESETS = [
  {
    id: 'case-1',
    name: 'Suspended GSTIN & Disbursal Disparity',
    nameHi: 'निलंबित जीएसटी एवं संवितरण विसंगति',
    category: 'Vendor Collusion & Inactive Tax',
    workId: 'MPLADS-2024-UP-0889',
    title: 'Installation of 12 Solar High-Mast RO Drinking Water Plants in Sevapuri Block',
    sector: 'Drinking Water & Sanitation',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    sanctionedAmountLakhs: 96.8,
    disbursedPercent: 85,
    physicalProgressPercent: 12,
    contractor: 'Apex Purvanchal Buildtech Ltd',
    contractorGstin: '09AAACA4489M1Z8',
    coordinates: [25.3176, 82.9739],
    expectedScore: 94,
    expectedTier: 'critical',
    keyTriggers: [
      'Financial disbursal at 85% with ground physical progress only 12% (+73% disparity variance)',
      'Contractor GSTIN 09AAACA4489M1Z8 marked "SUSPENDED" on GSTN Gateway since Oct 2024',
      'e-Sakshi field photos contain duplicated EXIF hash matching 2022 project'
    ],
    recommendedOrder: 'Immediate Outlay Freeze under GFR Rule 130 & Dispatch of Vigilance Flying Squad'
  },
  {
    id: 'case-2',
    name: 'Tender Splitting Below ₹10 Lakh Threshold',
    nameHi: 'ई-निविदा परिहार हेतु कार्य विखंडन (GFR 149)',
    category: 'Public Procurement Bypass (GFR 2017)',
    workId: 'MPLADS-2024-MH-1102',
    title: 'Solarization of 25 Zilla Parishad Rural Schools in Haveli Block',
    sector: 'Education & Digital Classrooms',
    district: 'Pune',
    state: 'Maharashtra',
    sanctionedAmountLakhs: 48.2,
    disbursedPercent: 60,
    physicalProgressPercent: 20,
    contractor: 'Sahyadri Green Energies LLP',
    contractorGstin: '27AABCS9192L1Z5',
    coordinates: [18.5204, 73.8567],
    expectedScore: 88,
    expectedTier: 'critical',
    keyTriggers: [
      'Artificial fragmentation: 5 contiguous work orders of ₹9.8L issued within 72 hours',
      'Circumvention of mandatory GeM national competitive bidding threshold (₹10.00 Lakhs)',
      'Identical broadband IP address detected on all 3 submitted quotation bids'
    ],
    recommendedOrder: 'Tender Cancellation & Show-Cause Notice to Executive Engineer'
  },
  {
    id: 'case-3',
    name: 'Geospatial Asset Collision & Double Invoicing',
    nameHi: 'भू-स्थानिक ओवरलैप एवं दोहरा भुगतान',
    category: 'Ghost Asset / Inter-Scheme Duplicate',
    workId: 'MPLADS-2024-BR-0731',
    title: 'Reinforced Cement Concrete Link Road from NH-31 to Bakhtiyarpur Ghat',
    sector: 'Rural Roads & Culverts',
    district: 'Patna',
    state: 'Bihar',
    sanctionedAmountLakhs: 145.0,
    disbursedPercent: 90,
    physicalProgressPercent: 35,
    contractor: 'Magadh Nirman Infrastructure',
    contractorGstin: '10AABCM3312Q1Z9',
    coordinates: [25.5941, 85.1376],
    expectedScore: 91,
    expectedTier: 'critical',
    keyTriggers: [
      'Survey of India GIS coordinates match PMGSY Road Asset #BR-PAT-092 (Asset collision: 98.6%)',
      'Dual claiming: Identical gravel volume vouchers submitted to both state and central accounts',
      'Ground progress 35% vs 90% fund release'
    ],
    recommendedOrder: 'FIR Registration under Prevention of Corruption Act & Asset De-listing'
  },
  {
    id: 'case-4',
    name: 'Negative List Violation (Prohibited Commercial Assets)',
    nameHi: 'प्रतिबंधित सूची उल्लंघन (वाणिज्यिक दुकान निर्माण)',
    category: 'Statutory Guidelines Violation (Clause 5.2)',
    workId: 'MPLADS-2024-UP-0994',
    title: 'Construction of Commercial Market Stalls near Cantt Railway Station',
    sector: 'Community Assets & Halls',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    sanctionedAmountLakhs: 115.0,
    disbursedPercent: 40,
    physicalProgressPercent: 15,
    contractor: 'Kashi Real Estate & Projects',
    contractorGstin: '09AABCK5544N1Z6',
    coordinates: [25.3289, 82.9868],
    expectedScore: 96,
    expectedTier: 'critical',
    keyTriggers: [
      'Commercial revenue-generating stalls strictly barred under Clause 5.2 (Prohibited List of MPLADS Guidelines 2023)',
      'Executive Engineer initiated tender without mandatory prior District Collector approval',
      'Land title dispute with North Eastern Railway authorities'
    ],
    recommendedOrder: 'Administrative Sanction Revocation & Total Fund Recovery Order'
  },
  {
    id: 'case-5',
    name: 'Model Compliant Infrastructure with Telemetry',
    nameHi: 'आदर्श अनुपालन अवसंरचना (स्मार्ट टेलीमेट्री)',
    category: '100% Compliant Benchmark',
    workId: 'MPLADS-2024-OR-0455',
    title: 'Installation of 500 Solar LED Street Lighting Systems in Sambalpur Tribal Villages',
    sector: 'Renewable & Solar Streetlights',
    district: 'Sambalpur',
    state: 'Odisha',
    sanctionedAmountLakhs: 85.0,
    disbursedPercent: 90,
    physicalProgressPercent: 88,
    contractor: 'Utkal Solar Grid Solutions',
    contractorGstin: '21AABCU7711B1Z2',
    coordinates: [21.4669, 83.9812],
    expectedScore: 24,
    expectedTier: 'standard',
    keyTriggers: [
      '100% telemetry uptime verified via GSM remote IoT monitoring chips',
      'All 3 stage geotagged photographs certified by District Planning Committee',
      'Vendor active on GSTN with nil tax arrears; 100% Utilization Certificate submitted'
    ],
    recommendedOrder: 'Final Tranche Release & Asset Handover Certificate Issuance'
  }
];

// ==========================================================================
// Citizen Whistleblower Grievance Records (Jan-Drishti / CPGRAMS Portal)
// ==========================================================================
export const CITIZEN_GRIEVANCES = [
  {
    docketId: 'CPGRAMS-MPLADS-2026-0889',
    workId: 'MPLADS-2024-UP-0889',
    citizenName: 'Rameshwar Nath Mishra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Ghost Asset / Incomplete Civil Work',
    description: 'The solar RO drinking water plant at Sevapuri was shown as 85% complete on the portal, but on site only four rusty iron pillars are standing with no water connection. Handpump was removed causing severe drinking water crisis.',
    submittedDate: '15 Sep 2026, 14:22 IST',
    status: 'Forwarded to District Magistrate',
    priority: 'Urgent',
    evidenceFile: 'sevapuri_site_photo_15sep2026.jpg',
    location: 'Sevapuri Gram Panchayat, Near Primary School'
  },
  {
    docketId: 'CPGRAMS-MPLADS-2026-0731',
    workId: 'MPLADS-2024-BR-0731',
    citizenName: 'Abhay Kumar Singh',
    district: 'Patna',
    state: 'Bihar',
    category: 'Asset Duplication / Double Invoicing',
    description: 'This concrete road from NH-31 to Bakhtiyarpur Ghat was already constructed under PMGSY last year. A new MPLADS plaque has been erected over the old PMGSY stone without pouring any new concrete.',
    submittedDate: '12 Sep 2026, 09:45 IST',
    status: 'Inquiry Ordered by Vigilance Officer',
    priority: 'Critical',
    evidenceFile: 'bakhtiyarpur_plaque_overlap.jpg',
    location: 'Bakhtiyarpur Ghat Road, NH-31 Junction'
  },
  {
    docketId: 'CPGRAMS-MPLADS-2026-0994',
    workId: 'MPLADS-2024-UP-0994',
    citizenName: 'Sunita Devi (Ward Member)',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Prohibited Commercial Monetization',
    description: 'Private shop owners are being charged ₹15,000 monthly rent for stalls built using public MPLADS development funds. This violates the non-commercial community asset rule.',
    submittedDate: '08 Sep 2026, 18:10 IST',
    status: 'Outlay Frozen by DM Order',
    priority: 'Critical',
    evidenceFile: 'cantt_commercial_receipt.jpg',
    location: 'Cantt Railway Station Approach Market'
  },
  {
    docketId: 'CPGRAMS-MPLADS-2026-0412',
    workId: 'MPLADS-2024-UP-0412',
    citizenName: 'Dr. Alok Pandey',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Public Appreciation / Feedback',
    description: 'Cholapur Sub-Centre Health Clinic has been completed on schedule with excellent diagnostic equipment. Doctors are attending patients daily. Commendable work.',
    submittedDate: '04 Sep 2026, 11:30 IST',
    status: 'Feedback Recorded in Public Portal',
    priority: 'Normal',
    evidenceFile: 'cholapur_clinic_operational.jpg',
    location: 'Cholapur Main Road, Varanasi'
  }
];

// ==========================================================================
// Contractor Cartel (HHI) & SC/ST Statutory Compliance Data
// ==========================================================================
export const CARTEL_HHI_DATA = [
  {
    district: 'South 24 Parganas',
    state: 'West Bengal',
    hhiScore: 0.81,
    cartelRisk: 'Critical Monopolization',
    topContractor: 'Sundarbans Heavy Civil Works',
    topContractorShare: '76.4%',
    totalContractors: 3,
    avgBidsPerTender: 1.2,
    flaggedCollusion: true,
    recommendation: 'Open nationwide e-procurement on GeM portal; refer to Competition Commission of India (CCI)'
  },
  {
    district: 'Patna',
    state: 'Bihar',
    hhiScore: 0.74,
    cartelRisk: 'High Concentration',
    topContractor: 'Magadh Nirman Infrastructure',
    topContractorShare: '68.2%',
    totalContractors: 5,
    avgBidsPerTender: 1.8,
    flaggedCollusion: true,
    recommendation: 'Enforce minimum 3 independent bidder verification rule before administrative sanction'
  },
  {
    district: 'Jaipur',
    state: 'Rajasthan',
    hhiScore: 0.68,
    cartelRisk: 'Moderate Concentration',
    topContractor: 'Marwar Jal Projects Ltd',
    topContractorShare: '59.5%',
    totalContractors: 7,
    avgBidsPerTender: 2.4,
    flaggedCollusion: false,
    recommendation: 'Rotate empanelment list for drinking water tube well packages'
  },
  {
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    hhiScore: 0.42,
    cartelRisk: 'Balanced Competition',
    topContractor: 'Kashi Urban Infrastructure Pvt Ltd',
    topContractorShare: '34.8%',
    totalContractors: 14,
    avgBidsPerTender: 3.8,
    flaggedCollusion: false,
    recommendation: 'Maintain active multi-vendor participation in civil works'
  },
  {
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    hhiScore: 0.24,
    cartelRisk: 'Healthy Open Market',
    topContractor: 'Karnataka Educational Supplies Co',
    topContractorShare: '18.2%',
    totalContractors: 26,
    avgBidsPerTender: 5.2,
    flaggedCollusion: false,
    recommendation: 'Model competitive benchmark for other urban parliamentary constituencies'
  }
];

export const SC_ST_COMPLIANCE_DATA = [
  {
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    scTarget: '15.0%',
    scActual: '16.4%',
    scStatus: 'Compliant',
    stTarget: '7.5%',
    stActual: '3.2%',
    stStatus: 'Lagging Deficit (-4.3%)',
    totalOutlayCr: 32.4
  },
  {
    district: 'Sambalpur',
    state: 'Odisha',
    scTarget: '15.0%',
    scActual: '18.2%',
    scStatus: 'Compliant',
    stTarget: '7.5%',
    stActual: '28.6%',
    stStatus: 'Compliant (Tribal Priority)',
    totalOutlayCr: 21.0
  },
  {
    district: 'Patna',
    state: 'Bihar',
    scTarget: '15.0%',
    scActual: '12.8%',
    scStatus: 'Deficit (-2.2%)',
    stTarget: '7.5%',
    stActual: '1.4%',
    stStatus: 'Critical Deficit (-6.1%)',
    totalOutlayCr: 45.2
  },
  {
    district: 'Pune',
    state: 'Maharashtra',
    scTarget: '15.0%',
    scActual: '15.8%',
    scStatus: 'Compliant',
    stTarget: '7.5%',
    stActual: '8.4%',
    stStatus: 'Compliant',
    totalOutlayCr: 28.6
  }
];

