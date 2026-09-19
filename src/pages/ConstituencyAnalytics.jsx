import React, { useState } from 'react';
import {
  DISTRICT_ANALYTICS,
  CARTEL_HHI_DATA,
  SC_ST_COMPLIANCE_DATA,
  I18N_STRINGS
} from '../data/mockData';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Building,
  CheckCircle,
  HelpCircle,
  Users,
  ShieldAlert,
  Search
} from 'lucide-react';

export default function ConstituencyAnalytics({ currentRole, onSelectWorkForModal, lang = 'en' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('performance'); // 'performance' | 'cartel' | 'scst'

  const t = I18N_STRINGS[lang] || I18N_STRINGS.en;

  const filteredDistricts = DISTRICT_ANALYTICS.filter(d =>
    d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>{t.navAnalytics}</h1>
          <p className="page-description">
            Cross-district comparative performance, contractor cartel concentration (Herfindahl-Hirschman Index), and mandatory SC/ST statutory allocation compliance.
          </p>
        </div>

        <div className="role-banner-tag">
          <BarChart3 size={18} color="#0B3D67" />
          <div>
            <div className="role-title">National Disparity Ratio: 1.48</div>
            <div className="role-scope">Target: &lt; 1.20 by Q4 FY2026-27</div>
          </div>
        </div>
      </div>

      {/* Analytics Executive Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">
              <ShieldAlert size={16} color="#D32F2F" />
              Contractor Cartel Concentration (HHI)
            </div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '12.5px', color: '#4A5568' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>South 24 Parganas (HHI: 0.81)</strong> and <strong>Patna (HHI: 0.74)</strong> exhibit critical vendor monopolization where a single firm captured &gt;68% of all civil road tenders.
            </p>
            <div style={{ color: '#D32F2F', fontWeight: 600 }}>
              Action: Anti-collusion tender re-scrutiny recommended under CCI norms.
            </div>
          </div>
        </div>

        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">
              <TrendingUp size={16} color="#00B050" />
              Fund Absorption Velocity
            </div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '12.5px', color: '#4A5568' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Bengaluru Urban (91%)</strong> and <strong>Pune (84%)</strong> lead in timely utilization certificates (UCs) and citizen asset handover speed.
            </p>
            <div style={{ color: '#00B050', fontWeight: 600 }}>
              Status: Model implementation benchmarking standard.
            </div>
          </div>
        </div>

        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">
              <Users size={16} color="#F57C00" />
              SC/ST Mandatory Earmarking (Clause 2.4)
            </div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '12.5px', color: '#4A5568' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Sambalpur (28.6% ST)</strong> exceeds statutory mandate. <strong>Patna (-6.1% ST deficit)</strong> has lagged in tribal developmental asset sanctions.
            </p>
            <div style={{ color: '#F57C00', fontWeight: 600 }}>
              Action: Priority sanction notice dispatched to District Planning Committee.
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="analytics-tabs-bar" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          type="button"
          className={`gov-btn ${activeTab === 'performance' ? 'gov-btn-primary' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          District Performance Roster
        </button>
        <button
          type="button"
          className={`gov-btn ${activeTab === 'cartel' ? 'gov-btn-primary' : ''}`}
          onClick={() => setActiveTab('cartel')}
        >
          Contractor Cartel Monopolization (HHI)
        </button>
        <button
          type="button"
          className={`gov-btn ${activeTab === 'scst' ? 'gov-btn-primary' : ''}`}
          onClick={() => setActiveTab('scst')}
        >
          SC/ST Statutory Quotas (Clause 2.4)
        </button>
      </div>

      {/* TAB 1: Comparative District Vigilance Roster */}
      {activeTab === 'performance' && (
        <div className="gov-table-wrapper">
          <div className="table-toolbar">
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#0B3D67' }}>
              Comparative District Vigilance Roster
            </div>
            <input
              type="text"
              placeholder="Search district or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '6px 12px', border: '1px solid #D1D9E2', borderRadius: '4px', fontSize: '12px' }}
            />
          </div>

          <table className="gov-table">
            <thead>
              <tr>
                <th>District & State</th>
                <th>Total Sanctioned Works</th>
                <th>Flagged High-Risk Works</th>
                <th>Flagged Outlay (₹ Cr)</th>
                <th>Contractor Monopoly Index</th>
                <th>Spending Velocity</th>
                <th>Supervisory Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDistricts.map((d, i) => (
                <tr key={i}>
                  <td>
                    <strong style={{ color: '#0B3D67' }}>{d.district}</strong>
                    <div style={{ fontSize: '11px', color: '#6C7A89' }}>{d.state}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{d.totalWorks} Works</td>
                  <td>
                    <span style={{ color: d.flaggedCount > 15 ? '#C62828' : '#E65100', fontWeight: 700 }}>
                      {d.flaggedCount} Works
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#0B3D67' }}>₹{d.riskOutlayCr.toFixed(1)} Cr</td>
                  <td>
                    <span style={{
                      padding: '3px 7px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      backgroundColor: d.monopolyIndex.includes('Critical') || d.monopolyIndex.includes('High') ? '#FFF3E0' : '#E8F5E9',
                      color: d.monopolyIndex.includes('Critical') || d.monopolyIndex.includes('High') ? '#E65100' : '#1B5E20'
                    }}>
                      {d.monopolyIndex}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', width: '80px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: d.spendingVelocity,
                            height: '100%',
                            backgroundColor: parseInt(d.spendingVelocity) > 75 ? '#00B050' : '#FF9933'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 700 }}>{d.spendingVelocity}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: d.flaggedCount > 15 ? '#C62828' : '#1B5E20'
                    }}>
                      {d.flaggedCount > 15 ? '● Vigilance Audit Mandated' : '● In Compliance'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Contractor Cartel Monopolization (HHI) */}
      {activeTab === 'cartel' && (
        <div className="gov-table-wrapper">
          <div className="table-toolbar">
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#0B3D67' }}>
              Herfindahl-Hirschman Index (HHI) Contractor Cartel Radar
            </div>
            <div style={{ fontSize: '11.5px', color: '#6C7A89' }}>
              HHI &gt; 0.70 signifies critical monopoly risk requiring competition commission referral
            </div>
          </div>

          <table className="gov-table">
            <thead>
              <tr>
                <th>District & State</th>
                <th>HHI Score</th>
                <th>Cartel Risk Rating</th>
                <th>Dominant Contractor Firm</th>
                <th>Market Share (%)</th>
                <th>Total Empaneled Vendors</th>
                <th>Avg Bids / Tender</th>
                <th>Statutory Anti-Collusion Action</th>
              </tr>
            </thead>
            <tbody>
              {CARTEL_HHI_DATA.map((c, i) => (
                <tr key={i}>
                  <td>
                    <strong style={{ color: '#0B3D67' }}>{c.district}</strong>
                    <div style={{ fontSize: '11px', color: '#6C7A89' }}>{c.state}</div>
                  </td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '13px',
                      color: c.hhiScore > 0.7 ? '#D32F2F' : c.hhiScore > 0.5 ? '#F57C00' : '#2E7D32'
                    }}>
                      {c.hhiScore.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className={`risk-badge ${c.hhiScore > 0.7 ? 'critical' : c.hhiScore > 0.5 ? 'warning' : 'standard'}`}>
                      {c.cartelRisk}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.topContractor}</td>
                  <td>
                    <strong style={{ color: parseFloat(c.topContractorShare) > 60 ? '#D32F2F' : '#0B3D67' }}>
                      {c.topContractorShare}
                    </strong>
                  </td>
                  <td style={{ textAlign: 'center' }}>{c.totalContractors} Firms</td>
                  <td style={{ textAlign: 'center' }}>{c.avgBidsPerTender}</td>
                  <td style={{ fontSize: '11.5px', color: '#4A5568', maxWidth: '280px' }}>
                    {c.recommendation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: SC/ST Statutory Quotas (Clause 2.4) */}
      {activeTab === 'scst' && (
        <div className="gov-table-wrapper">
          <div className="table-toolbar">
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#0B3D67' }}>
              Statutory SC/ST Outlay Allocation Compliance (Clause 2.4 of MPLADS Guidelines)
            </div>
            <div style={{ fontSize: '11.5px', color: '#6C7A89' }}>
              Statutory Requirement: Min 15.0% for Scheduled Caste (SC) & 7.5% for Scheduled Tribe (ST) habitations
            </div>
          </div>

          <table className="gov-table">
            <thead>
              <tr>
                <th>District & State</th>
                <th>Total Sanctioned Outlay</th>
                <th>SC Target</th>
                <th>SC Actual Allocation</th>
                <th>SC Compliance</th>
                <th>ST Target</th>
                <th>ST Actual Allocation</th>
                <th>ST Compliance</th>
              </tr>
            </thead>
            <tbody>
              {SC_ST_COMPLIANCE_DATA.map((s, i) => (
                <tr key={i}>
                  <td>
                    <strong style={{ color: '#0B3D67' }}>{s.district}</strong>
                    <div style={{ fontSize: '11px', color: '#6C7A89' }}>{s.state}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>₹{s.totalOutlayCr} Cr</td>
                  <td>{s.scTarget}</td>
                  <td style={{ fontWeight: 600 }}>{s.scActual}</td>
                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: s.scStatus.includes('Deficit') ? '#FFEBEE' : '#E8F5E9',
                      color: s.scStatus.includes('Deficit') ? '#C62828' : '#1B5E20'
                    }}>
                      {s.scStatus}
                    </span>
                  </td>
                  <td>{s.stTarget}</td>
                  <td style={{ fontWeight: 600 }}>{s.stActual}</td>
                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: s.stStatus.includes('Deficit') ? '#FFEBEE' : '#E8F5E9',
                      color: s.stStatus.includes('Deficit') ? '#C62828' : '#1B5E20'
                    }}>
                      {s.stStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
