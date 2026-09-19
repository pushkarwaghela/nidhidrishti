import React from 'react';
import { X, Printer, Download, ShieldAlert, CheckCircle2, FileText, QrCode } from 'lucide-react';

export default function OfficialOrderModal({ work, actionType, note, official, onClose }) {
  if (!work) return null;

  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const orderNumber = `MoSPI/VIG/MPLADS/2026/ORD-${work.id.replace('MPLADS-', '')}`;
  const digitalSignHash = `SHA256: 4e9a${Math.random().toString(16).substring(2, 8)}8f2b${Math.random().toString(16).substring(2, 8)}01c`;

  const isFreeze = actionType === 'Freeze Outlay' || actionType.includes('Freeze');
  const isInspection = actionType === 'Order Physical Inspection' || actionType.includes('Inspection');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay official-order-overlay" onClick={onClose}>
      <div className="official-order-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className="order-dialog-bar">
          <div className="order-dialog-title">
            <FileText size={18} color="#0B3D67" />
            <span>Official Government Order Document (शासनादेश विधिक पत्र)</span>
          </div>
          <div className="order-dialog-actions">
            <button
              type="button"
              className="gov-btn gov-btn-primary"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              <Printer size={15} /> Print Official G.O.
            </button>
            <button
              type="button"
              className="gov-btn"
              onClick={onClose}
              aria-label="Close document"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Official Government Letterhead */}
        <div className="official-order-sheet" id="printable-gov-order">
          {/* Letterhead Header */}
          <div className="letterhead-header">
            {/* National Emblem SVG */}
            <svg className="letterhead-emblem-svg" viewBox="0 0 100 130" fill="#0B3D67">
              <path d="M50 8 C40 8 36 18 36 28 C36 34 38 40 42 45 C35 48 30 55 30 64 C30 76 40 82 50 82 C60 82 70 76 70 64 C70 55 65 48 58 45 C62 40 64 34 64 28 C64 18 60 8 50 8 Z M50 18 C54 18 56 22 56 28 C56 34 54 38 50 38 C46 38 44 34 44 28 C44 22 46 18 50 18 Z" />
              <path d="M26 42 C20 45 16 52 16 60 C16 70 24 76 32 78 C30 72 32 66 36 62 C32 54 30 46 26 42 Z" />
              <path d="M74 42 C80 45 84 52 84 60 C84 70 76 76 68 78 C70 72 68 66 64 62 C68 54 70 46 74 42 Z" />
              <rect x="22" y="86" width="56" height="8" rx="2" fill="#0B3D67" />
              <circle cx="50" cy="90" r="3" fill="#FFFFFF" />
              <path d="M26 98 L74 98 L70 106 L30 106 Z" fill="#0B3D67" />
              <text x="50" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="'Noto Sans Devanagari', sans-serif">
                सत्यमेव जयते
              </text>
            </svg>

            <div className="letterhead-hierarchy">
              <div className="gov-tier-1">भारत सरकार | GOVERNMENT OF INDIA</div>
              <div className="gov-tier-2">सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय</div>
              <div className="gov-tier-3">Ministry of Statistics and Programme Implementation</div>
              <div className="gov-tier-4">संसद सदस्य स्थानीय क्षेत्र विकास योजना (MPLADS) प्रभाग</div>
              <div className="gov-address">खूर्शीद लाल भवन, जनपथ, नई दिल्ली - 110001 / New Delhi - 110001</div>
            </div>
          </div>

          <div className="order-meta-strip">
            <div className="order-file-no">
              <strong>पत्रांक / File Reference No:</strong> {orderNumber}
            </div>
            <div className="order-issue-date">
              <strong>दिनांक / Dated:</strong> {orderDate}
            </div>
          </div>

          <div className="order-subject-block">
            <div className="subject-label">विषय / SUBJECT:</div>
            <div className="subject-content">
              {isFreeze
                ? `STATUTORY ORDER FOR IMMEDIATE FREEZING OF MPLADS FUNDS DISBURSEMENT IN RESPECT OF WORK ID: ${work.id} UNDER RULE 130 OF GENERAL FINANCIAL RULES (GFR 2017) AND CLAUSE 7.1 OF REVISED MPLADS GUIDELINES 2023.`
                : isInspection
                ? `EXECUTIVE ORDER DEPUTING JOINT TECHNICAL VIGILANCE TEAM FOR TIME-BOUND PHYSICAL SITE VERIFICATION OF WORK ID: ${work.id} IN ACCORDANCE WITH MOSPI DIRECTIVE CLAUSE 7.2.`
                : `ADMINISTRATIVE DISPOSITION & SUPERVISORY AUDIT CLEARANCE ORDER FOR WORK ID: ${work.id}.`}
            </div>
          </div>

          {/* Body Text */}
          <div className="order-legal-body">
            <p>
              <strong>WHEREAS</strong>, the Members of Parliament Local Area Development Scheme (MPLADS) funds are public monies governed strictly by the General Financial Rules (GFR 2017) and the Revised Guidelines issued by the Ministry of Statistics and Programme Implementation (MoSPI); and
            </p>

            <p>
              <strong>WHEREAS</strong>, during the automated algorithmic surveillance and forensic audit executed by the <em>NidhiDrishti Central AI Risk-Monitoring Engine</em>, the developmental work titled <strong>"{work.title}"</strong> (Work ID: <code>{work.id}</code>), sanctioned in <strong>{work.constituency} Constituency ({work.district}, {work.state})</strong> for a sanctioned outlay of <strong>₹{work.sanctionedAmountLakhs.toFixed(2)} Lakhs</strong>, has exhibited high-risk financial anomalies (Computed AI Risk Score: <strong>{work.riskScore}/100</strong>); and
            </p>

            <div className="order-grounds-table">
              <div className="grounds-title">RECORDED GROUNDS & FORENSIC FINDINGS:</div>
              <table className="grounds-data-table">
                <tbody>
                  <tr>
                    <td className="g-key">Implementing Agency:</td>
                    <td className="g-val">{work.implementingAgency}</td>
                    <td className="g-key">Assigned Nodal Officer:</td>
                    <td className="g-val">{work.nodalOfficer}</td>
                  </tr>
                  <tr>
                    <td className="g-key">Contractor / Vendor:</td>
                    <td className="g-val">{work.contractor}</td>
                    <td className="g-key">Contractor GSTIN:</td>
                    <td className="g-val" style={{ fontFamily: 'monospace' }}>{work.contractorGstin}</td>
                  </tr>
                  <tr>
                    <td className="g-key">Disbursal vs Progress:</td>
                    <td className="g-val" style={{ color: '#D32F2F', fontWeight: 700 }}>
                      {work.disbursedPercent}% Disbursed vs {work.physicalProgressPercent}% Certified Progress (+{work.disparityIndex}% Disparity)
                    </td>
                    <td className="g-key">Primary Trigger:</td>
                    <td className="g-val" style={{ color: '#C62828' }}>{work.triggerReason}</td>
                  </tr>
                  <tr>
                    <td className="g-key">Competent Authority Note:</td>
                    <td className="g-val" colSpan="3">
                      <em>"{note || 'Action ordered by competent authority pursuant to vigilance finding.'}"</em>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              {isFreeze ? (
                <span>
                  <strong>NOW THEREFORE</strong>, in exercise of powers vested under Clause 7.1 of the Revised MPLADS Guidelines 2023 and GFR Rule 130, the competent authority hereby directs:
                  <ol className="order-directives-list">
                    <li>The District Authority / District Magistrate ({work.district}) and the Senior Treasury Officer are directed to <strong>IMMEDIATELY FREEZE AND HALT all financial releases and tranche disbursements</strong> to vendor <code>{work.contractor}</code>.</li>
                    <li>No further Utilization Certificate (UC) shall be accepted in the e-Sakshi portal without prior biometric and photographic re-verification.</li>
                    <li>The Executive Engineer is directed to submit a comprehensive compliance affidavit within seven (7) working days from the date of this order.</li>
                  </ol>
                </span>
              ) : isInspection ? (
                <span>
                  <strong>NOW THEREFORE</strong>, the competent authority hereby constitutes an Executive Vigilance Team consisting of the Sub-Divisional Magistrate (SDM), Executive Engineer (PWD/DRDA), and District Planning Officer to execute an on-site physical measurement audit within 72 hours, recording core sample testing and timestamped drone photography.
                </span>
              ) : (
                <span>
                  <strong>NOW THEREFORE</strong>, upon examination of the compliance representation, statutory vouchers, and physical site verification certificate, the recorded vigilance discrepancy has been reconciled and the work is hereby marked cleared in the central registry.
                </span>
              )}
            </p>
          </div>

          {/* Signature & Digital Verification Block */}
          <div className="order-sign-footer">
            <div className="qr-verify-box">
              {/* SVG QR Code Simulation */}
              <svg viewBox="0 0 100 100" width="80" height="80" style={{ border: '1px solid #D1D9E2', padding: 4 }}>
                <rect x="0" y="0" width="100" height="100" fill="#FFFFFF" />
                <rect x="10" y="10" width="25" height="25" fill="#0B3D67" />
                <rect x="65" y="10" width="25" height="25" fill="#0B3D67" />
                <rect x="10" y="65" width="25" height="25" fill="#0B3D67" />
                <rect x="16" y="16" width="13" height="13" fill="#FFFFFF" />
                <rect x="71" y="16" width="13" height="13" fill="#FFFFFF" />
                <rect x="16" y="71" width="13" height="13" fill="#FFFFFF" />
                <rect x="42" y="15" width="15" height="15" fill="#0B3D67" />
                <rect x="42" y="42" width="16" height="16" fill="#0B3D67" />
                <rect x="65" y="45" width="20" height="10" fill="#0B3D67" />
                <rect x="42" y="70" width="20" height="18" fill="#0B3D67" />
                <rect x="75" y="75" width="15" height="15" fill="#0B3D67" />
              </svg>
              <div className="qr-caption">
                Scan to verify on <strong>esakshi.mospi.gov.in</strong>
              </div>
            </div>

            <div className="digital-sign-stamp">
              <div className="stamp-badge">e-Sign Verified (Information Technology Act 2000)</div>
              <div className="sign-name">{official?.officer || 'Dr. Rajiv Kumar Sharma, IAS'}</div>
              <div className="sign-desig">{official?.designation || 'Additional Secretary & CVO, MoSPI'}</div>
              <div className="sign-auth">Government of India / District Authority</div>
              <div className="sign-hash">{digitalSignHash}</div>
              <div className="sign-time">Signed: {orderDate} via NIC e-Sign Gateway</div>
            </div>
          </div>

          {/* Copy forwarded to: */}
          <div className="order-dispatch-list">
            <strong>प्रतिलिपि सूचनार्थ एवं आवश्यक कार्यवाही हेतु प्रेषित / Copy forwarded for information & necessary action to:</strong>
            <ol>
              <li>Principal Secretary to Hon'ble Minister, Ministry of Statistics & Programme Implementation.</li>
              <li>District Magistrate / District Authority, {work.district}, {work.state}.</li>
              <li>Hon’ble Member of Parliament, {work.constituency} Parliamentary Constituency.</li>
              <li>State Nodal Officer, Planning Department, Government of {work.state}.</li>
              <li>Public Financial Management System (PFMS) Technical Directorate for ledger locking.</li>
              <li>Guard File / Central Vigilance Repository.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
