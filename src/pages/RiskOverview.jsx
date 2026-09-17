import React from 'react';
import {
  SUMMARY_METRICS,
  RISK_SEVERITY_BREAKDOWN,
  SECTOR_ALLOCATION,
  MPLADS_WORKS
} from '../data/mockData';
import MetricCard from '../components/MetricCard';
import {
  IndianRupee,
  ShieldAlert,
  AlertOctagon,
  FileCheck2,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function RiskOverview({
  currentRole,
  onNavigateToTab,
  onSelectWorkForModal
}) {
  // Most urgent flagged work for alert strip
  const urgentWork = MPLADS_WORKS.find(w => w.riskScore >= 94) || MPLADS_WORKS[0];

  return (
    <div className="risk-overview-page">
      {/* Top Role-Sensitive Context Banner */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>MPLADS AI Surveillance & Risk Overview</h1>
          <p className="page-description">
            Continuous real-time audit of parliamentary development expenditures, anomaly detection, and fund integrity metrics.
          </p>
        </div>

        <div className="role-banner-tag" title="Demonstrating active role-based data view">
          <div>
            <div className="role-title">{currentRole.title}</div>
            <div className="role-scope">{currentRole.scope} — {currentRole.officer}</div>
          </div>
        </div>
      </div>

      {/* Urgent Vigilance Alert Strip */}
      {urgentWork && (
        <div className="vigilance-alert-strip critical">
          <div className="alert-message-content">
            <div className="alert-icon-box">
              <AlertOctagon size={24} />
            </div>
            <div>
              <div className="alert-headline">
                CRITICAL VIGILANCE ALERT — Work #{urgentWork.id} ({urgentWork.district}, {urgentWork.state})
              </div>
              <div className="alert-subtext">
                {urgentWork.triggerReason} (Contractor: {urgentWork.contractor})
              </div>
            </div>
          </div>

          <button
            type="button"
            className="alert-btn-action"
            onClick={() => onSelectWorkForModal(urgentWork)}
          >
            Inspect Forensic Dossier
          </button>
        </div>
      )}

      {/* 4 Primary KPI Summary Cards */}
      <section className="kpi-cards-grid" aria-label="Executive Outlay Summary">
        <MetricCard
          title="Total Sanctioned Outlay"
          value={SUMMARY_METRICS.totalSanctionedOutlay.value}
          caption={SUMMARY_METRICS.totalSanctionedOutlay.caption}
          icon={IndianRupee}
          variant="default"
        />

        <MetricCard
          title="Flagged Risk Outlay"
          value={SUMMARY_METRICS.flaggedRiskOutlay.value}
          caption={SUMMARY_METRICS.flaggedRiskOutlay.caption}
          icon={AlertOctagon}
          variant="critical"
        />

        <MetricCard
          title="Critical Anomalies"
          value={SUMMARY_METRICS.criticalAnomalies.value}
          caption={SUMMARY_METRICS.criticalAnomalies.caption}
          icon={ShieldAlert}
          variant="warning"
        />

        <MetricCard
          title="Data Quality Resolved"
          value={SUMMARY_METRICS.dataQualityResolved.value}
          caption={SUMMARY_METRICS.dataQualityResolved.caption}
          icon={FileCheck2}
          variant="success"
        />
      </section>

      {/* Charts & Analytics Section */}
      <section className="analytics-two-col">
        {/* Risk Severity Breakdown Panel */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div>
              <div className="gov-panel-title">
                <ShieldAlert size={16} color="#0B3D67" />
                Risk Severity Breakdown
              </div>
              <div className="gov-panel-subtitle">Distribution of works across AI risk classification tiers</div>
            </div>
            <button
              type="button"
              className="gov-btn"
              onClick={() => onNavigateToTab('audit-queue')}
              title="Open full table"
            >
              View Queue <ChevronRight size={14} />
            </button>
          </div>

          <div className="gov-panel-body">
            <div className="donut-chart-container">
              {/* Accessible SVG Donut Chart */}
              <div className="donut-canvas-box">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  {/* Total works: 38 + 104 + 312 + 2450 = 2904 */}
                  {/* Standard (2450 / 2904 = 84.3%) -> 265 deg */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#2E7D32"
                    strokeWidth="16"
                    strokeDasharray="200.7 238.7"
                    strokeDashoffset="0"
                  />
                  {/* Moderate (312 / 2904 = 10.7%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#FBC02D"
                    strokeWidth="16"
                    strokeDasharray="25.5 238.7"
                    strokeDashoffset="-200.7"
                  />
                  {/* Warning (104 / 2904 = 3.6%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F57C00"
                    strokeWidth="16"
                    strokeDasharray="8.6 238.7"
                    strokeDashoffset="-226.2"
                  />
                  {/* Critical (38 / 2904 = 1.3%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#D32F2F"
                    strokeWidth="16"
                    strokeDasharray="3.9 238.7"
                    strokeDashoffset="-234.8"
                  />
                  {/* Center Text */}
                  <text x="50" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0B3D67">
                    2,904
                  </text>
                  <text x="50" y="58" textAnchor="middle" fontSize="5" fontWeight="600" fill="#6C7A89">
                    TOTAL AUDITED
                  </text>
                </svg>
              </div>

              {/* Legend Grid */}
              <div className="donut-legend-grid">
                <div className="donut-legend-item">
                  <span className="legend-color-dot" style={{ backgroundColor: '#D32F2F' }} />
                  <div className="legend-text-group">
                    <span className="legend-label">Critical (Score 80+)</span>
                    <span className="legend-value">38 works (₹124.5 Cr)</span>
                  </div>
                </div>

                <div className="donut-legend-item">
                  <span className="legend-color-dot" style={{ backgroundColor: '#F57C00' }} />
                  <div className="legend-text-group">
                    <span className="legend-label">High Warning (60-79)</span>
                    <span className="legend-value">104 works (₹287.8 Cr)</span>
                  </div>
                </div>

                <div className="donut-legend-item">
                  <span className="legend-color-dot" style={{ backgroundColor: '#FBC02D' }} />
                  <div className="legend-text-group">
                    <span className="legend-label">Moderate Risk (40-59)</span>
                    <span className="legend-value">312 works (₹418.2 Cr)</span>
                  </div>
                </div>

                <div className="donut-legend-item">
                  <span className="legend-color-dot" style={{ backgroundColor: '#2E7D32' }} />
                  <div className="legend-text-group">
                    <span className="legend-label">Standard / Cleared</span>
                    <span className="legend-value">2,450 works (₹4,019 Cr)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sectoral Allocation Breakdown Panel */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div>
              <div className="gov-panel-title">
                <TrendingUp size={16} color="#0B3D67" />
                Sectoral Work Allocation & Risk Concentration
              </div>
              <div className="gov-panel-subtitle">Sanctioned Outlay vs Flagged Amount by Priority Sector</div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#6C7A89' }}>
              Unit: ₹ in Crores
            </div>
          </div>

          <div className="gov-panel-body">
            <div className="sector-breakdown-list">
              {SECTOR_ALLOCATION.map((s, idx) => {
                const maxVal = 1240.0;
                const sanctionedPct = (s.sanctionedCr / maxVal) * 100;
                const riskPct = (s.flaggedCr / s.sanctionedCr) * 100;

                return (
                  <div key={idx} className="sector-row-item">
                    <div className="sector-row-header">
                      <span className="sector-name">{s.sector}</span>
                      <span className="sector-figures">
                        Sanctioned: <strong>₹{s.sanctionedCr.toFixed(1)} Cr</strong>
                        <span className="flagged-span">
                          (Flagged: ₹{s.flaggedCr.toFixed(1)} Cr • {riskPct.toFixed(1)}%)
                        </span>
                      </span>
                    </div>

                    <div className="sector-progress-track" title={`₹${s.sanctionedCr} Cr Sanctioned, ₹${s.flaggedCr} Cr Flagged`}>
                      <div
                        className="progress-sanctioned-fill"
                        style={{ width: `${sanctionedPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary of Flagged Works (Top 5) */}
      <section className="gov-panel">
        <div className="gov-panel-header">
          <div>
            <div className="gov-panel-title">
              <ShieldAlert size={16} color="#C62828" />
              High-Risk Works Pending Immediate Physical Audit
            </div>
            <div className="gov-panel-subtitle">Top priority anomalies requiring Executive Magistrate / Collector intervention</div>
          </div>

          <button
            type="button"
            className="gov-btn gov-btn-primary"
            onClick={() => onNavigateToTab('audit-queue')}
          >
            Open Full Audit Queue ({MPLADS_WORKS.length} Items)
          </button>
        </div>

        <div className="gov-table-wrapper" style={{ border: 'none' }}>
          <table className="gov-table">
            <thead>
              <tr>
                <th>Work ID</th>
                <th>Sector</th>
                <th>MP & District</th>
                <th>Sanctioned</th>
                <th>Contractor</th>
                <th>AI Risk Score</th>
                <th>Trigger Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MPLADS_WORKS.slice(0, 5).map((w) => (
                <tr key={w.id}>
                  <td>
                    <span className="work-id-pill">{w.id}</span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{w.sector}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{w.mpName}</div>
                    <div style={{ fontSize: '11px', color: '#6C7A89' }}>{w.district}, {w.state}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    ₹{w.sanctionedAmountLakhs.toFixed(2)} L
                  </td>
                  <td>{w.contractor}</td>
                  <td>
                    <span className={`risk-badge ${w.riskLevel}`}>
                      <span className="badge-dot" />
                      {w.riskScore}/100 - {w.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="trigger-reason-text" style={{ maxWidth: '320px' }}>
                      {w.triggerReason}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="gov-btn"
                      style={{ fontSize: '11.5px', padding: '4px 8px' }}
                      onClick={() => onSelectWorkForModal(w)}
                    >
                      Audit Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
