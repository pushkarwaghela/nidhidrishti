import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  Building2,
  User,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Lock,
  Eye,
  CheckCircle2,
  Clock,
  Printer
} from 'lucide-react';
import { I18N_STRINGS } from '../data/mockData';

export default function AuditDetailsModal({
  work,
  onClose,
  onTriggerAction,
  onOpenOrderModal,
  lang = 'en'
}) {
  if (!work) return null;

  const [actionNote, setActionNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [pendingActionType, setPendingActionType] = useState(null);

  const t = I18N_STRINGS[lang] || I18N_STRINGS.en;

  const handleActionClick = (type) => {
    setPendingActionType(type);
    setShowNoteInput(true);
  };

  const confirmAction = () => {
    if (pendingActionType) {
      onTriggerAction(work.id, pendingActionType, actionNote || 'Action ordered by competent authority');
      setShowNoteInput(false);
      setActionNote('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>{lang === 'hi' ? 'सतर्कता फोरेंसिक डॉसियर' : 'Vigilance Forensic Dossier'} — Work #{work.id}</h2>
            <div className="modal-sub">
              {work.district}, {work.state} | {work.sector}
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Work Summary Strip */}
          <div className="modal-section-box">
            <div className="modal-section-title">
              {lang === 'hi' ? 'प्रशासनिक एवं संस्तुति विवरण' : 'Administrative & Sanction Metadata'}
            </div>
            <div className="dossier-grid">
              <div className="dossier-item">
                <span className="key">Work Title</span>
                <span className="val">{work.title}</span>
              </div>
              <div className="dossier-item">
                <span className="key">Hon’ble MP</span>
                <span className="val">{work.mpName} ({work.house})</span>
              </div>
              <div className="dossier-item">
                <span className="key">Sanction Date</span>
                <span className="val">{work.sanctionDate}</span>
              </div>
              <div className="dossier-item">
                <span className="key">Sanctioned Outlay</span>
                <span className="val" style={{ fontWeight: 700, color: '#0B3D67' }}>
                  ₹{work.sanctionedAmountLakhs.toFixed(2)} Lakhs
                </span>
              </div>
              <div className="dossier-item">
                <span className="key">Implementing Agency</span>
                <span className="val">{work.implementingAgency}</span>
              </div>
              <div className="dossier-item">
                <span className="key">Assigned Nodal Officer</span>
                <span className="val">{work.nodalOfficer}</span>
              </div>
              <div className="dossier-item">
                <span className="key">Contractor Firm</span>
                <span className="val">{work.contractor}</span>
              </div>
              <div className="dossier-item">
                <span className="key">Vendor GSTIN</span>
                <span className="val" style={{ fontFamily: 'monospace' }}>{work.contractorGstin}</span>
              </div>
              <div className="dossier-item">
                <span className="key">Current Status</span>
                <span className="val" style={{ color: '#C62828', fontWeight: 700 }}>{work.status}</span>
              </div>
            </div>
          </div>

          {/* Disparity Meter (Physical vs Financial) */}
          <div className="disparity-meter-box">
            <div className="disparity-labels">
              <span>Financial Outlay Disbursed vs Physical Progress Certified on Ground</span>
              <span style={{ color: work.disparityIndex > 30 ? '#C62828' : '#1B5E20', fontWeight: 700 }}>
                Disparity Variance: +{work.disparityIndex}%
              </span>
            </div>
            <div className="disparity-bars">
              <div className="disparity-bar-row">
                <span>Funds Disbursed:</span>
                <div className="disparity-track">
                  <div
                    className="disparity-fill-finance"
                    style={{ width: `${work.disbursedPercent}%` }}
                    title={`${work.disbursedPercent}% Disbursed`}
                  />
                </div>
                <strong>{work.disbursedPercent}%</strong>
              </div>
              <div className="disparity-bar-row">
                <span>Physical Progress:</span>
                <div className="disparity-track">
                  <div
                    className="disparity-fill-physical"
                    style={{ width: `${work.physicalProgressPercent}%` }}
                    title={`${work.physicalProgressPercent}% Physical`}
                  />
                </div>
                <strong>{work.physicalProgressPercent}%</strong>
              </div>
            </div>
          </div>

          {/* AI Forensic Finding Rules */}
          <div>
            <div className="modal-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldAlert size={16} color="#D32F2F" />
              <span>AI Multi-Factor Vigilance Triggers (Risk Score: {work.riskScore}/100)</span>
            </div>

            <div className="forensic-findings-list">
              <div className="forensic-finding-card">
                <AlertTriangle size={18} color="#D32F2F" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="forensic-finding-title">Primary Algorithmic Vigilance Trigger</div>
                  <div className="forensic-finding-desc">{work.triggerReason}</div>
                </div>
              </div>

              {work.forensics && work.forensics.map((f, idx) => (
                <div
                  key={idx}
                  className="forensic-finding-card"
                  style={{
                    borderColor: f.severity === 'Critical' ? '#FFCDD2' : '#FFE0B2',
                    borderLeftColor: f.severity === 'Critical' ? '#D32F2F' : '#F57C00'
                  }}
                >
                  <ShieldAlert
                    size={16}
                    color={f.severity === 'Critical' ? '#D32F2F' : '#F57C00'}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <div className="forensic-finding-title" style={{ color: f.severity === 'Critical' ? '#C62828' : '#E65100' }}>
                      [{f.severity.toUpperCase()}] {f.rule}
                    </div>
                    <div className="forensic-finding-desc">{f.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action note prompt if user clicked an action */}
          {showNoteInput && (
            <div style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082', padding: '14px', borderRadius: '4px', marginTop: '12px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#F57F17', marginBottom: '6px' }}>
                Enter Official Executive Order Note for: <strong>{pendingActionType}</strong>
              </div>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="Specify file reference number, statutory grounds (GFR Rule 130 / MPLADS 7.1), and assigned inspection officer..."
                style={{ width: '100%', height: '60px', padding: '8px', fontSize: '12px', border: '1px solid #D1D9E2', borderRadius: '4px' }}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="gov-btn gov-btn-primary"
                  onClick={confirmAction}
                >
                  Confirm & Sign Order
                </button>
                <button
                  type="button"
                  className="gov-btn"
                  onClick={() => setShowNoteInput(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Government Action Buttons */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {onOpenOrderModal && (
              <button
                type="button"
                className="gov-btn"
                style={{ borderColor: '#0B3D67', color: '#0B3D67', fontWeight: 600 }}
                onClick={() => onOpenOrderModal(work, 'Order Physical Inspection', actionNote)}
                title="Generate printable official Government of India Letterhead order"
              >
                <FileText size={15} />
                {t.generateOrder}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="gov-btn"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="gov-btn"
              style={{ color: '#1B5E20', borderColor: '#A5D6A7' }}
              onClick={() => handleActionClick('Clear Flag')}
            >
              <CheckCircle2 size={15} />
              {t.dismissFlag}
            </button>
            <button
              type="button"
              className="gov-btn"
              style={{ color: '#0B3D67' }}
              onClick={() => handleActionClick('Order Physical Inspection')}
            >
              <Eye size={15} />
              {t.orderInspection}
            </button>
            <button
              type="button"
              className="gov-btn gov-btn-primary"
              style={{ backgroundColor: '#D32F2F', borderColor: '#D32F2F' }}
              onClick={() => handleActionClick('Freeze Outlay')}
            >
              <Lock size={15} />
              {t.freezeOutlay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
