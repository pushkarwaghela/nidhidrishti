import React, { useState } from 'react';
import { DISTRICT_ANALYTICS, MPLADS_WORKS } from '../data/mockData';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Building,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function ConstituencyAnalytics({ currentRole, onSelectWorkForModal }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = DISTRICT_ANALYTICS.filter(d =>
    d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>Constituency & District Disparity Analytics</h1>
          <p className="page-description">
            Cross-district comparative performance, contractor cartel concentration (Herfindahl Index), and fund absorption velocity.
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

      {/* Analytics Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">Contractor Cartel Risk Alert</div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '12.5px', color: '#4A5568' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>South 24 Parganas</strong> and <strong>Patna</strong> exhibit critical contractor concentration (Herfindahl index &gt; 0.70), where top 2 vendors capture &gt;65% of all civil road tenders.
            </p>
            <div style={{ color: '#D32F2F', fontWeight: 600 }}>
              Action: Anti-collusion tender re-scrutiny recommended.
            </div>
          </div>
        </div>

        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">Fund Absorption Velocity</div>
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
            <div className="gov-panel-title">Under-Audited Blocks Notice</div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '12.5px', color: '#4A5568' }}>
            <p style={{ marginBottom: '8px' }}>
              18 remote tribal blocks in <strong>Assam</strong> and <strong>Odisha</strong> have pending physical inspections due to terrain constraints.
            </p>
            <div style={{ color: '#F57C00', fontWeight: 600 }}>
              Action: Drone ortho-mosaic verification dispatched.
            </div>
          </div>
        </div>
      </div>

      {/* District Comparative Roster */}
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
                      <div style={{ height: '100%', width: d.spendingVelocity, background: parseInt(d.spendingVelocity) > 75 ? '#00B050' : '#FF9933' }} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '11.5px' }}>{d.spendingVelocity}</span>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#0B3D67' }}>
                    Active Audit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
