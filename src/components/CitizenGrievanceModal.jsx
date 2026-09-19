import React, { useState } from 'react';
import { MPLADS_WORKS } from '../data/mockData';
import {
  X,
  Send,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function CitizenGrievanceModal({ onClose, onSubmitSuccess }) {
  const [selectedWorkId, setSelectedWorkId] = useState(MPLADS_WORKS[0].id);
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Ghost Asset / Work Not Found on Ground');
  const [description, setDescription] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submittedDocket, setSubmittedDocket] = useState(null);

  const selectedWork = MPLADS_WORKS.find(w => w.id === selectedWorkId) || MPLADS_WORKS[0];

  const categories = [
    'Ghost Asset / Work Not Found on Ground',
    'Substandard Material & Structural Flaws',
    'Asset Duplication / False Plaque Erection',
    'Prohibited Commercial Rent & Misuse',
    'Abandoned / Incomplete Work After Fund Disbursal'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please describe the anomaly observed on the ground.');
      return;
    }

    const docketNo = `CPGRAMS-MPLADS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance = {
      docketId: docketNo,
      workId: selectedWork.id,
      citizenName: citizenName || 'Anonymous Vigilance Whistleblower',
      district: selectedWork.district,
      state: selectedWork.state,
      category: category,
      description: description,
      submittedDate: new Date().toLocaleString('en-IN') + ' IST',
      status: 'Registered in Central DM Queue',
      priority: 'High',
      evidenceFile: photoUploaded ? 'citizen_field_evidence_upload.jpg' : 'No photo attached',
      location: `${selectedWork.district}, ${selectedWork.state}`
    };

    setSubmittedDocket(docketNo);
    if (onSubmitSuccess) {
      onSubmitSuccess(newGrievance);
    }
  };

  return (
    <div className="modal-overlay citizen-modal-overlay" onClick={onClose}>
      <div className="modal-container citizen-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header" style={{ backgroundColor: '#0B3D67' }}>
          <div className="modal-title-group">
            <h2 style={{ color: '#FFFFFF' }}>Jan-Drishti (जन-दृष्टि) Whistleblower & Citizen Vigilance Desk</h2>
            <div className="modal-sub" style={{ color: '#E2E8F0' }}>
              Integrated with MoSPI & CPGRAMS — Public Transparency Redressal System
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{ color: '#FFFFFF' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '24px' }}>
          {submittedDocket ? (
            <div className="grievance-success-box">
              <CheckCircle2 size={48} color="#00B050" />
              <h3>Citizen Whistleblower Complaint Registered Successfully!</h3>
              <p className="docket-display">
                Official Tracking Docket: <strong>{submittedDocket}</strong>
              </p>
              <p className="docket-sub">
                Your report has been cryptographically logged and automatically routed to the <strong>District Magistrate & Collector ({selectedWork.district})</strong> and the <strong>MoSPI Central Vigilance Directorate</strong>.
              </p>
              <div className="docket-timeline-preview">
                <div className="timeline-step done">1. Logged via CPGRAMS Gateway</div>
                <div className="timeline-step active">2. Dispatched to DM Inspection Cell</div>
                <div className="timeline-step">3. 72-Hr Ground Verification Required</div>
              </div>
              <button
                type="button"
                className="gov-btn gov-btn-primary"
                onClick={onClose}
                style={{ marginTop: 20 }}
              >
                Done / Return to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="citizen-form">
              <div className="form-info-strip">
                <ShieldCheck size={18} color="#0B3D67" />
                <span>
                  <strong>Whistleblower Protection:</strong> Citizen reports are confidential under the Whistle Blowers Protection Act 2014. Ground coordinates will be cross-referenced with satellite imagery.
                </span>
              </div>

              {/* Select Target Work */}
              <div className="form-group">
                <label htmlFor="select-work-target">
                  Select MPLADS Work to Report / Audit <span style={{ color: '#D32F2F' }}>*</span>
                </label>
                <select
                  id="select-work-target"
                  className="gov-select"
                  value={selectedWorkId}
                  onChange={(e) => setSelectedWorkId(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {MPLADS_WORKS.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.id} — {w.title.substring(0, 50)}... ({w.district}, {w.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Work preview card */}
              <div className="work-preview-card">
                <div className="preview-header">
                  <strong>{selectedWork.title}</strong>
                  <span className={`risk-badge ${selectedWork.riskLevel}`}>
                    {selectedWork.riskScore}/100 Risk
                  </span>
                </div>
                <div className="preview-meta">
                  <span>MP: {selectedWork.mpName}</span>
                  <span>District: {selectedWork.district}, {selectedWork.state}</span>
                  <span>Vendor: {selectedWork.contractor}</span>
                  <span>Outlay: ₹{selectedWork.sanctionedAmountLakhs}L</span>
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="grievance-category">
                  Grievance / Anomaly Category <span style={{ color: '#D32F2F' }}>*</span>
                </label>
                <select
                  id="grievance-category"
                  className="gov-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Ground Truth Description */}
              <div className="form-group">
                <label htmlFor="grievance-description">
                  Ground Truth Observations & Concrete Details <span style={{ color: '#D32F2F' }}>*</span>
                </label>
                <textarea
                  id="grievance-description"
                  className="gov-textarea"
                  rows={4}
                  placeholder="Describe the physical condition of the site, absence of machinery, substandard cement mix, commercial exploitation, or missing signage..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Citizen Details */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="citizen-name">Your Full Name (Optional)</label>
                  <input
                    id="citizen-name"
                    type="text"
                    className="gov-input"
                    placeholder="Enter your name or leave for anonymous"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="citizen-mobile">Mobile Number (For SMS Tracking)</label>
                  <input
                    id="citizen-mobile"
                    type="tel"
                    className="gov-input"
                    placeholder="+91 98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Photo Attachment Simulation */}
              <div className="form-group">
                <label>Attach Geotagged Photographic Proof (Optional)</label>
                <div
                  className={`photo-upload-zone ${photoUploaded ? 'uploaded' : ''}`}
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                >
                  <UploadCloud size={24} color="#0B3D67" />
                  <div>
                    {photoUploaded ? (
                      <span style={{ color: '#00B050', fontWeight: 600 }}>
                        ✓ Photo attached: ground_evidence_site_photo.jpg (GPS: {selectedWork.coordinates[0]}, {selectedWork.coordinates[1]})
                      </span>
                    ) : (
                      <span>Click to simulate attaching geotagged field photograph from phone</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  className="gov-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gov-btn gov-btn-primary"
                  style={{ backgroundColor: '#0B3D67', minWidth: '160px' }}
                >
                  <Send size={15} /> Submit to Collectorate
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
