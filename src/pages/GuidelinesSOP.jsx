import React from 'react';
import {
  BookOpen,
  FileText,
  AlertOctagon,
  ShieldCheck,
  CheckSquare,
  HelpCircle,
  ExternalLink,
  PhoneCall
} from 'lucide-react';

export default function GuidelinesSOP() {
  return (
    <div className="guidelines-page">
      {/* Header */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>Official MPLADS Guidelines & Standard Operating Procedures (SOP)</h1>
          <p className="page-description">
            Statutory framework governing MPLADS fund recommendations, prohibited negative list, mandatory physical audit ratios, and vigilance enforcement.
          </p>
        </div>

        <div className="role-banner-tag">
          <BookOpen size={18} color="#0B3D67" />
          <div>
            <div className="role-title">MoSPI Notification F.No. 4(1)/2023-MPLADS</div>
            <div className="role-scope">Effective 1st April 2023 | Central Sector Scheme</div>
          </div>
        </div>
      </div>

      {/* Guidelines Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Card 1: Core Entitlement & Rules */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <div className="gov-panel-title">
              <ShieldCheck size={16} color="#0B3D67" />
              Statutory Entitlement & Annual Allocation
            </div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '13px', lineHeight: '1.6', color: '#1C2430' }}>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Annual Entitlement:</strong> ₹5.00 Crore per Hon’ble MP per annum, released in two tranches of ₹2.50 Crore each directly to District Authority account.
              </li>
              <li>
                <strong>SC/ST Mandatory Outlay (Clause 2.4):</strong> At least 15% of annual fund must be earmarked for areas inhabited by Scheduled Caste (SC) population, and 7.5% for Scheduled Tribe (ST) areas.
              </li>
              <li>
                <strong>Durability Criterion (Clause 3.1):</strong> Funds can only be utilized for creating durable community assets of national/local priority (drinking water, health, education, connectivity).
              </li>
              <li>
                <strong>Web-Portal Compulsion (Clause 1.6):</strong> All sanctions, financial releases, and physical verification progress must be routed through web-enabled portal with 100% PFMS integration.
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Negative List (Prohibited Assets) */}
        <div className="gov-panel" style={{ borderTop: '3px solid #D32F2F' }}>
          <div className="gov-panel-header">
            <div className="gov-panel-title" style={{ color: '#C62828' }}>
              <AlertOctagon size={16} color="#D32F2F" />
              Prohibited Negative List (Clause 5.2) — Strictly Barred
            </div>
          </div>
          <div className="gov-panel-body" style={{ fontSize: '13px', lineHeight: '1.6', color: '#1C2430' }}>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Commercial Assets:</strong> Construction of commercial shops, market stalls, office buildings, or revenue-yielding premises for private/commercial gain is strictly prohibited.
              </li>
              <li>
                <strong>Religious Places:</strong> Works within premises of places of worship or owned by religious bodies/institutions are totally barred.
              </li>
              <li>
                <strong>Private & Individual Assets:</strong> Residential buildings, boundary walls of private property, or naming assets after living individuals.
              </li>
              <li>
                <strong>Splitting Works:</strong> Artificially fragmenting larger projects into sub-₹10 Lakh orders to bypass public e-procurement is treated as financial irregularity.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Verification Protocol Checklist */}
      <div className="gov-panel" style={{ marginBottom: '24px' }}>
        <div className="gov-panel-header">
          <div className="gov-panel-title">
            <CheckSquare size={16} color="#0B3D67" />
            Mandatory Physical Verification Protocol for District Authorities (Clause 7.1)
          </div>
          <div style={{ fontSize: '11.5px', color: '#6C7A89' }}>
            Annual Target: At least 10% of all ongoing works must be physically inspected
          </div>
        </div>

        <div className="gov-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', border: '1px solid #D1D9E2', borderRadius: '4px' }}>
              <div style={{ fontWeight: 700, color: '#0B3D67', marginBottom: '6px', fontSize: '13px' }}>
                1. Pre-Sanction Feasibility
              </div>
              <p style={{ fontSize: '12px', color: '#4A5568', lineHeight: '1.5' }}>
                Verify land ownership (must be clear govt/panchayat land) and ensure no overlap with existing CSS schemes (e.g. Jal Jeevan Mission, PMGSY).
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', border: '1px solid #D1D9E2', borderRadius: '4px' }}>
              <div style={{ fontWeight: 700, color: '#0B3D67', marginBottom: '6px', fontSize: '13px' }}>
                2. Geo-Tagged Photographic Audit
              </div>
              <p style={{ fontSize: '12px', color: '#4A5568', lineHeight: '1.5' }}>
                Mandatory geotagged photos at 3 stages: Pre-construction site, 50% milestone, and 100% completion before releasing final payment tranche.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', border: '1px solid #D1D9E2', borderRadius: '4px' }}>
              <div style={{ fontWeight: 700, color: '#0B3D67', marginBottom: '6px', fontSize: '13px' }}>
                3. Plaque & Public Display
              </div>
              <p style={{ fontSize: '12px', color: '#4A5568', lineHeight: '1.5' }}>
                Permanent inscription plaque stating: "Created under MPLADS by Hon’ble MP [Name], Year of Sanction, Outlay Amount, and Implementing Agency".
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vigilance Helpline Box */}
      <div style={{ background: '#E6EFF8', border: '1px solid #B8D3E9', padding: '16px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <PhoneCall size={22} color="#0B3D67" />
          <div>
            <div style={{ fontWeight: 700, color: '#0B3D67', fontSize: '13px' }}>
              MoSPI Central Vigilance Helpdesk & Fraud Prevention Cell
            </div>
            <div style={{ fontSize: '12px', color: '#4A5568' }}>
              Toll-free Vigilance Hotline: 1800-11-2026 (Mon-Sat, 09:30 to 18:00 IST) | Email: vigilance-mplads@mospi.gov.in
            </div>
          </div>
        </div>
        <button
          type="button"
          className="gov-btn gov-btn-primary"
          onClick={() => alert('Official MoSPI MPLADS Guidelines 2023 PDF downloaded.')}
        >
          Download Official PDF (MoSPI)
        </button>
      </div>
    </div>
  );
}
