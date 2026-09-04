import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, ArrowUpDown, ChevronRight, AlertTriangle } from 'lucide-react';

export default function AlertQueue({ works, onSelectWork }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = Array.from(new Set((works || []).map(w => w.category)));

  const filteredWorks = (works || []).filter(work => {
    const matchesSearch = 
      work.work_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.work_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.mp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.contractor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.nodal_district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = selectedSeverity === 'All' || work.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'All' || work.category === selectedCategory;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            AI Anomaly & Risk Audit Queue
          </h3>
          <p className="text-xs text-slate-400">
            Priority-ranked MPLADS works flagged by Isolation Forest, Geospatial Duplication, and Contractor Concentration engines
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search work, MP, contractor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Severity Dropdown */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Severity Tiers</option>
            <option value="Critical">Critical (≥75)</option>
            <option value="Warning">Warning (45-74)</option>
            <option value="Moderate">Moderate (25-44)</option>
            <option value="Low">Low (&lt;25)</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Work ID & Name</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">MP & District</th>
              <th className="px-4 py-3 text-right">Sanctioned Amount</th>
              <th className="px-4 py-3">Contractor Entity</th>
              <th className="px-4 py-3 text-center">AI Risk Score</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
            {filteredWorks.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-slate-500">
                  No work records match the selected filter criteria.
                </td>
              </tr>
            ) : (
              filteredWorks.map((work) => (
                <tr key={work.work_id} className="hover:bg-slate-900/50 transition-colors">
                  {/* Work ID & Title */}
                  <td className="px-4 py-3 max-w-xs">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">{work.work_id}</span>
                    <h4 className="text-xs font-semibold text-slate-100 line-clamp-1">{work.work_name}</h4>
                    {work.primary_trigger !== 'None' && (
                      <span className="text-[10px] text-rose-400 font-medium inline-block mt-0.5">
                        Trigger: {work.primary_trigger}
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-slate-300 font-medium whitespace-nowrap">
                    {work.category}
                  </td>

                  {/* MP & District */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-200">{work.mp_name}</div>
                    <div className="text-[11px] text-slate-400">{work.nodal_district}, {work.state}</div>
                  </td>

                  {/* Sanctioned Amount */}
                  <td className="px-4 py-3 text-right font-bold text-white whitespace-nowrap">
                    ₹{work.sanctioned_amount.toLocaleString('en-IN')}
                  </td>

                  {/* Contractor */}
                  <td className="px-4 py-3 text-slate-300 font-medium whitespace-nowrap max-w-[160px] truncate">
                    {work.contractor_name}
                  </td>

                  {/* Risk Score */}
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                      work.severity === 'Critical' ? 'bg-rose-600 shadow-rose-900/50' :
                      work.severity === 'Warning' ? 'bg-amber-600 shadow-amber-900/50' :
                      work.severity === 'Moderate' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}>
                      {work.severity === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                      {Math.round(work.risk_score)} / 100
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onSelectWork(work.work_id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 font-medium rounded-lg text-xs transition-all flex items-center gap-1 ml-auto border border-slate-700 hover:border-cyan-500"
                    >
                      Audit Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
