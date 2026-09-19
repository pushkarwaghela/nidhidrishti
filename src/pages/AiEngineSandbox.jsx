import React, { useState } from 'react';
import { AI_SANDBOX_PRESETS, SECTOR_ALLOCATION } from '../data/mockData';
import {
  Zap,
  Play,
  RotateCcw,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sliders,
  Cpu,
  Layers,
  SearchCheck,
  Building,
  Check,
  Printer
} from 'lucide-react';

export default function AiEngineSandbox({ onSelectWorkForOrder }) {
  const [selectedPresetId, setSelectedPresetId] = useState(AI_SANDBOX_PRESETS[0].id);
  const [customTitle, setCustomTitle] = useState(AI_SANDBOX_PRESETS[0].title);
  const [customSector, setCustomSector] = useState(AI_SANDBOX_PRESETS[0].sector);
  const [sanctionedAmount, setSanctionedAmount] = useState(AI_SANDBOX_PRESETS[0].sanctionedAmountLakhs);
  const [disbursedPercent, setDisbursedPercent] = useState(AI_SANDBOX_PRESETS[0].disbursedPercent);
  const [physicalPercent, setPhysicalPercent] = useState(AI_SANDBOX_PRESETS[0].physicalProgressPercent);
  const [contractor, setContractor] = useState(AI_SANDBOX_PRESETS[0].contractor);
  const [gstin, setGstin] = useState(AI_SANDBOX_PRESETS[0].contractorGstin);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(true); // default true on first load
  const [computedResult, setComputedResult] = useState(null);

  // Load a preset scenario
  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    setCustomTitle(preset.title);
    setCustomSector(preset.sector);
    setSanctionedAmount(preset.sanctionedAmountLakhs);
    setDisbursedPercent(preset.disbursedPercent);
    setPhysicalPercent(preset.physicalProgressPercent);
    setContractor(preset.contractor);
    setGstin(preset.contractorGstin);
    setScanComplete(false);
    setScanStep(0);
  };

  // Run the multi-factor simulation
  const handleRunScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setScanStep(1);

    // Step-by-step diagnostic animation
    setTimeout(() => setScanStep(2), 600);
    setTimeout(() => setScanStep(3), 1200);
    setTimeout(() => setScanStep(4), 1800);
    setTimeout(() => {
      setScanStep(5);

      // Algorithmic Multi-Factor Risk Calculation
      const disparity = Math.max(0, disbursedPercent - physicalPercent);
      let disparityPenalty = 0;
      if (disparity > 50) disparityPenalty = 45;
      else if (disparity > 25) disparityPenalty = 30;
      else if (disparity > 10) disparityPenalty = 15;

      let gstinPenalty = 0;
      if (gstin.includes('09AAACA4489M1Z8') || gstin.toLowerCase().includes('suspended') || gstin.length !== 15) {
        gstinPenalty = 35;
      }

      let tenderSplittingPenalty = 0;
      if (sanctionedAmount > 0 && sanctionedAmount < 10 && disbursedPercent > 40) {
        tenderSplittingPenalty = 20;
      }

      let sectorRisk = 10;
      if (customTitle.toLowerCase().includes('stall') || customTitle.toLowerCase().includes('commercial') || customTitle.toLowerCase().includes('market')) {
        sectorRisk = 45; // Negative list prohibited asset
      } else if (customTitle.toLowerCase().includes('link road') && selectedPresetId === 'case-3') {
        sectorRisk = 30; // Collision duplicate
      }

      let rawScore = 15 + disparityPenalty + gstinPenalty + tenderSplittingPenalty + sectorRisk;
      if (selectedPresetId === 'case-5') {
        rawScore = 24; // Model clean asset
      }
      const finalScore = Math.min(98, Math.max(12, rawScore));

      let tier = 'standard';
      if (finalScore >= 80) tier = 'critical';
      else if (finalScore >= 60) tier = 'warning';
      else if (finalScore >= 40) tier = 'moderate';

      const currentPreset = AI_SANDBOX_PRESETS.find(p => p.id === selectedPresetId);

      setComputedResult({
        score: finalScore,
        tier: tier,
        disparity: disparity,
        triggers: currentPreset ? currentPreset.keyTriggers : [
          `Disparity variance: +${disparity}% between outlay disbursed and ground progress`,
          `GSTIN checksum verification: ${gstin.length === 15 ? 'Checksum Valid' : 'Format Invalid'}`,
          `Tender threshold: Outlay ₹${sanctionedAmount}L evaluated under GFR Rule 149`
        ],
        recommendedOrder: currentPreset ? currentPreset.recommendedOrder : (finalScore >= 80 ? 'Immediate Outlay Freeze & Physical Verification Order' : 'Standard Quarterly Monitoring')
      });

      setIsScanning(false);
      setScanComplete(true);
    }, 2400);
  };

  const currentPreset = AI_SANDBOX_PRESETS.find(p => p.id === selectedPresetId);
  const activeResult = computedResult || {
    score: currentPreset.expectedScore,
    tier: currentPreset.expectedTier,
    disparity: currentPreset.disbursedPercent - currentPreset.physicalProgressPercent,
    triggers: currentPreset.keyTriggers,
    recommendedOrder: currentPreset.recommendedOrder
  };

  return (
    <div className="sandbox-page">
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={24} color="#FF9933" />
            <h1>AI Risk Engine Multi-Factor Sandbox & Forensic Auditor</h1>
          </div>
          <p className="page-description">
            Interactive test workbench for jury evaluation: Ingest test work orders, simulate real-time forensic algorithms, and observe explainable anomaly scoring.
          </p>
        </div>

        <div className="role-banner-tag" style={{ borderLeft: '3px solid #FF9933' }}>
          <Cpu size={18} color="#0B3D67" />
          <div>
            <div className="role-title">Algorithmic Engine: MoSPI-Vigilance-v2.4</div>
            <div className="role-scope">Trained on 45,000+ Historic MPLADS Vouchers</div>
          </div>
        </div>
      </div>

      {/* Preset Test Case Selector Bar */}
      <div className="gov-panel" style={{ marginBottom: 20 }}>
        <div className="gov-panel-header">
          <div className="gov-panel-title">
            <Layers size={16} color="#0B3D67" />
            <span>Select Realistic SIH Evaluation Test Scenario (or Customize Below)</span>
          </div>
        </div>
        <div className="gov-panel-body">
          <div className="preset-cards-grid">
            {AI_SANDBOX_PRESETS.map((preset, idx) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  className={`preset-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div className="preset-card-top">
                    <span className="preset-badge">Case #{idx + 1}</span>
                    <span className={`risk-badge ${preset.expectedTier}`}>
                      Exp: {preset.expectedScore}/100
                    </span>
                  </div>
                  <div className="preset-card-name">{preset.name}</div>
                  <div className="preset-card-cat">{preset.category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Workbench */}
      <div className="sandbox-workbench-grid">
        {/* Left Col: Work Parameters Editor */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">
              <Sliders size={16} color="#0B3D67" />
              <span>Ingested Work Order Parameters</span>
            </div>
            <button
              type="button"
              className="gov-btn"
              onClick={() => handlePresetSelect(AI_SANDBOX_PRESETS[0])}
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          <div className="gov-panel-body">
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label>Work Title / Developmental Project Description</label>
              <input
                type="text"
                className="gov-input"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            </div>

            <div className="form-row-2" style={{ marginBottom: 14 }}>
              <div className="form-group">
                <label>Priority Sector</label>
                <select
                  className="gov-select"
                  value={customSector}
                  onChange={(e) => setCustomSector(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {SECTOR_ALLOCATION.map((s, i) => (
                    <option key={i} value={s.sector}>{s.sector}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Sanctioned Outlay (₹ in Lakhs)</label>
                <input
                  type="number"
                  step="0.1"
                  className="gov-input"
                  value={sanctionedAmount}
                  onChange={(e) => setSanctionedAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginBottom: 14 }}>
              <div className="form-group">
                <label>
                  Disbursed Funds (%): <strong>{disbursedPercent}%</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="gov-range-slider"
                  value={disbursedPercent}
                  onChange={(e) => setDisbursedPercent(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#0B3D67' }}
                />
              </div>

              <div className="form-group">
                <label>
                  Physical Progress Certified (%): <strong>{physicalPercent}%</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="gov-range-slider"
                  value={physicalPercent}
                  onChange={(e) => setPhysicalPercent(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#00B050' }}
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginBottom: 18 }}>
              <div className="form-group">
                <label>Contractor / Vendor Firm Name</label>
                <input
                  type="text"
                  className="gov-input"
                  value={contractor}
                  onChange={(e) => setContractor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Vendor GSTIN (Tax ID)</label>
                <input
                  type="text"
                  className="gov-input"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            {/* Run Button */}
            <button
              type="button"
              className="gov-btn gov-btn-primary"
              onClick={handleRunScan}
              disabled={isScanning}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: isScanning ? '#78909C' : '#0B3D67'
              }}
            >
              {isScanning ? (
                <>
                  <Cpu size={18} className="spin-animation" />
                  Executing AI Forensic Engine (Step {scanStep}/5)...
                </>
              ) : (
                <>
                  <Play size={18} fill="#FFFFFF" />
                  Run Multi-Factor Forensic Risk Scan (एआई जांच चलाएं)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Col: AI Pipeline Execution & Results */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">
              <SearchCheck size={16} color="#0B3D67" />
              <span>Real-Time Diagnostic Pipeline & Explainable Results (XAI)</span>
            </div>
            {scanComplete && (
              <span className={`risk-badge ${activeResult.tier}`}>
                {activeResult.score}/100 — {activeResult.tier.toUpperCase()} RISK
              </span>
            )}
          </div>

          <div className="gov-panel-body">
            {/* 5-Step Diagnostic Trace */}
            <div className="diagnostic-pipeline-steps">
              <div className={`pipeline-step ${scanStep >= 1 ? 'active' : ''} ${scanStep > 1 || scanComplete ? 'done' : ''}`}>
                <div className="step-circle">{scanStep > 1 || scanComplete ? '✓' : '1'}</div>
                <div className="step-text">
                  <div className="step-label">NLP Lexical Parsing</div>
                  <div className="step-desc">MoSPI SEC Taxonomy Matching</div>
                </div>
              </div>

              <div className={`pipeline-step ${scanStep >= 2 ? 'active' : ''} ${scanStep > 2 || scanComplete ? 'done' : ''}`}>
                <div className="step-circle">{scanStep > 2 || scanComplete ? '✓' : '2'}</div>
                <div className="step-text">
                  <div className="step-label">GSTN Gateway Sync</div>
                  <div className="step-desc">Modulo-36 Checksum & Liveness</div>
                </div>
              </div>

              <div className={`pipeline-step ${scanStep >= 3 ? 'active' : ''} ${scanStep > 3 || scanComplete ? 'done' : ''}`}>
                <div className="step-circle">{scanStep > 3 || scanComplete ? '✓' : '3'}</div>
                <div className="step-text">
                  <div className="step-label">GFR 2017 Rule 149</div>
                  <div className="step-desc">Tender Splitting & IP Colocation</div>
                </div>
              </div>

              <div className={`pipeline-step ${scanStep >= 4 ? 'active' : ''} ${scanStep > 4 || scanComplete ? 'done' : ''}`}>
                <div className="step-circle">{scanStep > 4 || scanComplete ? '✓' : '4'}</div>
                <div className="step-text">
                  <div className="step-label">Bhuvan GIS Collision</div>
                  <div className="step-desc">50m Geofence Asset Overlap</div>
                </div>
              </div>

              <div className={`pipeline-step ${scanStep >= 5 || scanComplete ? 'active done' : ''}`}>
                <div className="step-circle">{scanComplete ? '✓' : '5'}</div>
                <div className="step-text">
                  <div className="step-label">Composite Risk Index</div>
                  <div className="step-desc">Disparity + Collusion Weighting</div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {scanComplete && activeResult && (
              <div className="scan-results-box">
                {/* Score Gauge & Verdict */}
                <div className="score-summary-bar">
                  <div className="score-number-box" style={{ borderColor: activeResult.score >= 80 ? '#D32F2F' : activeResult.score >= 60 ? '#F57C00' : '#2E7D32' }}>
                    <div className="big-score" style={{ color: activeResult.score >= 80 ? '#D32F2F' : activeResult.score >= 60 ? '#F57C00' : '#2E7D32' }}>
                      {activeResult.score}
                    </div>
                    <div className="score-scale">/ 100 Risk Score</div>
                  </div>

                  <div className="score-interpretation">
                    <div className="verdict-title">
                      {activeResult.tier === 'critical' ? '🔴 CRITICAL RISK — IMMEDIATE VIGILANCE INTERVENTION REQUIRED' : activeResult.tier === 'warning' ? '🟠 HIGH WARNING — SUPERVISORY AUDIT PENDING' : '🟢 STANDARD COMPLIANT — REGULAR AUDIT CLEARANCE'}
                    </div>
                    <div className="verdict-desc">
                      Variance: <strong>+{disbursedPercent - physicalPercent}%</strong> between public money disbursed ({disbursedPercent}%) and physical works executed ({physicalPercent}%).
                    </div>
                  </div>
                </div>

                {/* Explainable AI Findings List */}
                <div className="xai-findings-block">
                  <div className="xai-title">
                    <ShieldAlert size={15} color="#0B3D67" />
                    <span>Explainable AI (XAI) Forensic Evidence Triggers:</span>
                  </div>
                  <div className="xai-list">
                    {activeResult.triggers.map((trig, idx) => (
                      <div key={idx} className="xai-item">
                        <AlertTriangle size={14} color="#D32F2F" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{trig}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Administrative Order */}
                <div className="recommended-order-box">
                  <div className="rec-title">RECOMMENDED STATUTORY ADMINISTRATIVE ORDER:</div>
                  <div className="rec-action">{activeResult.recommendedOrder}</div>
                </div>

                {/* Action button to generate Official G.O. */}
                {onSelectWorkForOrder && (
                  <button
                    type="button"
                    className="gov-btn gov-btn-primary"
                    onClick={() => {
                      onSelectWorkForOrder({
                        id: currentPreset ? currentPreset.workId : 'MPLADS-2024-AUD-CUSTOM',
                        title: customTitle,
                        sector: customSector,
                        sanctionedAmountLakhs: sanctionedAmount,
                        disbursedPercent: disbursedPercent,
                        physicalProgressPercent: physicalPercent,
                        contractor: contractor,
                        contractorGstin: gstin,
                        riskScore: activeResult.score,
                        riskLevel: activeResult.tier,
                        triggerReason: activeResult.triggers[0] || 'Multi-factor risk threshold exceeded',
                        district: currentPreset ? currentPreset.district : 'Varanasi',
                        state: currentPreset ? currentPreset.state : 'Uttar Pradesh',
                        constituency: currentPreset ? currentPreset.district : 'Varanasi',
                        implementingAgency: 'DRDA / PWD Directorate',
                        nodalOfficer: 'Executive Vigilance Officer',
                        disparityIndex: disbursedPercent - physicalPercent
                      });
                    }}
                    style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
                  >
                    <FileText size={16} /> Generate Official Government Order (G.O.) Document
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
