import React, { useState } from 'react';
import { MPLADS_WORKS } from '../data/mockData';
import {
  Search,
  Filter,
  Download,
  Printer,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function AnomalyAuditQueue({ onSelectWorkForModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Extract sectors
  const sectorsList = ['ALL', ...new Set(MPLADS_WORKS.map(w => w.sector))];

  // Filtering
  const filteredWorks = MPLADS_WORKS.filter((work) => {
    const matchesSector = sectorFilter === 'ALL' || work.sector === sectorFilter;
    const matchesRisk = riskFilter === 'ALL' || work.riskLevel === riskFilter;
    const matchesStatus = statusFilter === 'ALL' || work.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q === '' ||
      work.id.toLowerCase().includes(q) ||
      work.title.toLowerCase().includes(q) ||
      work.mpName.toLowerCase().includes(q) ||
      work.district.toLowerCase().includes(q) ||
      work.contractor.toLowerCase().includes(q) ||
      work.triggerReason.toLowerCase().includes(q);

    return matchesSector && matchesRisk && matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage) || 1;
  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV Export utility
  const exportToCSV = () => {
    const headers = ['Work ID', 'Title', 'Sector', 'MP Name', 'District', 'State', 'Sanctioned (Lakhs)', 'Disbursed %', 'Physical %', 'Contractor', 'GSTIN', 'Risk Score', 'Risk Level', 'Trigger Reason', 'Status'];
    const rows = filteredWorks.map(w => [
      `"${w.id}"`,
      `"${w.title.replace(/"/g, '""')}"`,
      `"${w.sector}"`,
      `"${w.mpName}"`,
      `"${w.district}"`,
      `"${w.state}"`,
      w.sanctionedAmountLakhs,
      w.disbursedPercent,
      w.physicalProgressPercent,
      `"${w.contractor}"`,
      `"${w.contractorGstin}"`,
      w.riskScore,
      `"${w.riskLevel}"`,
      `"${w.triggerReason.replace(/"/g, '""')}"`,
      `"${w.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NidhiDrishti_Vigilance_Audit_Queue_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="audit-queue-page">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>AI Anomaly & Risk Audit Queue</h1>
          <p className="page-description">
            Vigilance verification roster prioritizing high-risk anomalies, contractor cartels, and fund-progress disparities.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="gov-btn"
            onClick={exportToCSV}
            title="Download full filtered queue as CSV"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            type="button"
            className="gov-btn"
            onClick={handlePrint}
            title="Print Official Record"
          >
            <Printer size={14} /> Print Dossier Sheet
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-table-wrapper">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={15} color="#6C7A89" />
            <input
              type="text"
              placeholder="Search by Work ID, MP, District, Contractor, or Reason..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="table-filter-group">
            <select
              className="gov-select"
              value={sectorFilter}
              onChange={(e) => {
                setSectorFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {sectorsList.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All Priority Sectors' : s}
                </option>
              ))}
            </select>

            <select
              className="gov-select"
              value={riskFilter}
              onChange={(e) => {
                setRiskFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="ALL">All Risk Levels</option>
              <option value="critical">Critical (Score 80-100)</option>
              <option value="warning">High Warning (Score 60-79)</option>
              <option value="moderate">Moderate (Score 40-59)</option>
              <option value="standard">Standard (Score 0-39)</option>
            </select>

            {(searchQuery !== '' || sectorFilter !== 'ALL' || riskFilter !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                type="button"
                className="gov-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSectorFilter('ALL');
                  setRiskFilter('ALL');
                  setStatusFilter('ALL');
                  setCurrentPage(1);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <table className="gov-table">
          <thead>
            <tr>
              <th>Work ID</th>
              <th>Sector</th>
              <th>MP & Constituency / District</th>
              <th>Sanctioned Outlay</th>
              <th>Contractor & GSTIN</th>
              <th>AI Risk Score</th>
              <th>Primary Vigilance Trigger Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedWorks.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#6C7A89' }}>
                  No records match the active filter criteria.
                </td>
              </tr>
            ) : (
              paginatedWorks.map((work) => (
                <tr key={work.id}>
                  <td>
                    <span className="work-id-pill">{work.id}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{work.sector}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{work.mpName}</div>
                    <div style={{ fontSize: '11px', color: '#6C7A89' }}>
                      {work.constituency} ({work.district}, {work.state})
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0B3D67' }}>
                      ₹{work.sanctionedAmountLakhs.toFixed(2)} Lakhs
                    </div>
                    <div style={{ fontSize: '11px', color: '#6C7A89' }}>
                      Disbursed: {work.disbursedPercent}% | Physical: {work.physicalProgressPercent}%
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{work.contractor}</div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6C7A89' }}>
                      {work.contractorGstin}
                    </div>
                  </td>
                  <td>
                    <span className={`risk-badge ${work.riskLevel}`}>
                      <span className="badge-dot" />
                      {work.riskScore}/100 - {work.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="trigger-reason-text" style={{ maxWidth: '340px' }}>
                      {work.triggerReason}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="gov-btn gov-btn-primary"
                      style={{ fontSize: '12px', padding: '5px 10px' }}
                      onClick={() => onSelectWorkForModal(work)}
                    >
                      <Eye size={14} />
                      Audit Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table Pagination Footer */}
        <div className="table-pagination-footer">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredWorks.length)} of {filteredWorks.length} entries
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="gov-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <span style={{ alignSelf: 'center', padding: '0 8px', fontWeight: 600 }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              className="gov-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
