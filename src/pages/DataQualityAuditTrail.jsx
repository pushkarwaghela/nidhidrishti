import React, { useState } from 'react';
import { INGESTION_AUDIT_LOGS } from '../data/mockData';
import {
  FileCheck2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock,
  Database
} from 'lucide-react';

export default function DataQualityAuditTrail() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...new Set(INGESTION_AUDIT_LOGS.map(log => log.issueCategory))];

  const filteredLogs = INGESTION_AUDIT_LOGS.filter((log) => {
    const matchesCat = selectedCategory === 'ALL' || log.issueCategory === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q === '' ||
      log.id.toLowerCase().includes(q) ||
      log.issueCategory.toLowerCase().includes(q) ||
      log.sourceField.toLowerCase().includes(q) ||
      log.rawVal.toLowerCase().includes(q) ||
      log.resolvedVal.toLowerCase().includes(q) ||
      log.ruleApplied.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="data-quality-page">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>Ingestion Data Quality Audit Trail & Schema Transparency</h1>
          <p className="page-description">
            Complete audit trail of raw data ingestion defects automatically reconciled by AI lexical sanitizers, LGD resolvers, and tax gateway cross-validation.
          </p>
        </div>

        <div className="role-banner-tag" style={{ borderLeft: '3px solid #00B050' }}>
          <CheckCircle2 size={18} color="#00B050" />
          <div>
            <div className="role-title" style={{ color: '#1B5E20' }}>AI Cleansing Pipeline Active</div>
            <div className="role-scope">1,280/1,288 Records Cleansed (99.4% Automated Rectification)</div>
          </div>
        </div>
      </div>

      {/* Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #D1D9E2', padding: '12px 16px', borderRadius: '4px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6C7A89', fontWeight: 700 }}>Total Ingestion Events</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#0B3D67' }}>18,492 Records</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #D1D9E2', padding: '12px 16px', borderRadius: '4px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6C7A89', fontWeight: 700 }}>Auto-Resolved Errors</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#138808' }}>1,280 Corrected</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #D1D9E2', padding: '12px 16px', borderRadius: '4px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6C7A89', fontWeight: 700 }}>Vigilance Escalations</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#D32F2F' }}>8 Suspicious Payloads</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #D1D9E2', padding: '12px 16px', borderRadius: '4px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6C7A89', fontWeight: 700 }}>Mean Confidence</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#0B3D67' }}>99.2% Model Certainty</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="gov-table-wrapper">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={15} color="#6C7A89" />
            <input
              type="text"
              placeholder="Search raw values, fields, LGD mappings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="table-filter-group">
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#4A5568' }}>Defect Category:</span>
            <select
              className="gov-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Ingestion Anomaly Categories' : c}
                </option>
              ))}
            </select>

            {(searchQuery !== '' || selectedCategory !== 'ALL') && (
              <button
                type="button"
                className="gov-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Audit Log Table */}
        <table className="gov-table">
          <thead>
            <tr>
              <th>Log Ref & Timestamp</th>
              <th>Issue Category</th>
              <th>Target Field</th>
              <th>Raw Ingested Data</th>
              <th>Automated AI Cleansing Action & Result</th>
              <th>Confidence</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#6C7A89' }}>
                  No data quality logs match the selected filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                let statusBadgeStyle = {
                  backgroundColor: '#E8F5E9',
                  color: '#1B5E20',
                  border: '1px solid #A5D6A7'
                };
                if (log.status === 'Vigilance Triggered') {
                  statusBadgeStyle = {
                    backgroundColor: '#FFEBEE',
                    color: '#C62828',
                    border: '1px solid #EF9A9A'
                  };
                } else if (log.status === 'Manual Review Required') {
                  statusBadgeStyle = {
                    backgroundColor: '#FFF8E1',
                    color: '#F57F17',
                    border: '1px solid #FFE082'
                  };
                }

                return (
                  <tr key={log.id}>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0B3D67' }}>
                        {log.id}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6C7A89', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Clock size={11} /> {log.timestamp}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#4A5568', marginTop: 2 }}>
                        Src: {log.datasetOrigin}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#1C2430' }}>{log.issueCategory}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '11px', background: '#F0F4F8', padding: '2px 5px', borderRadius: '3px' }}>
                        {log.sourceField}
                      </code>
                    </td>
                    <td>
                      <div style={{ color: '#B71C1C', fontSize: '12px', fontWeight: 600, background: '#FFF5F5', padding: '4px 8px', borderRadius: '3px', borderLeft: '2px solid #D32F2F' }}>
                        {log.rawVal}
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#1B5E20', fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>
                        {log.resolvedVal}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6C7A89' }}>
                        Rule: {log.ruleApplied}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#0B3D67' }}>
                        {log.confidence}
                      </span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 700, ...statusBadgeStyle }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="table-pagination-footer">
          <div>
            Showing {filteredLogs.length} ingestion audit logs | Certified compliant with ISO 8000 Data Quality Standards
          </div>
          <div style={{ fontSize: '11.5px', color: '#0B3D67', fontWeight: 600 }}>
            Audit Hash: SHA256-4b92-91a0-cdfe
          </div>
        </div>
      </div>
    </div>
  );
}
