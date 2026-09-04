import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle2, ShieldCheck, Database, Filter } from 'lucide-react';

export default function DataQualityView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data-quality')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data quality log:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        Fetching Ingestion Quality Audit Logs...
      </div>
    );
  }

  const { total_issues_logged, breakdown, logs } = data || { total_issues_logged: 0, breakdown: [], logs: [] };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Ingestion Audits</span>
          <h3 className="text-2xl font-bold text-emerald-400 font-['Outfit'] mt-2">{total_issues_logged} Audit Actions</h3>
          <p className="text-xs text-slate-400 mt-1">Automatic fixes applied during ingestion</p>
        </div>

        {breakdown.map((b, i) => (
          <div key={i} className="glass-card p-5 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">{b.issue_type}</span>
            <h3 className="text-2xl font-bold text-white font-['Outfit'] mt-2">{b.count} Records</h3>
            <p className="text-xs text-slate-400 mt-1">Standardized & Resolved</p>
          </div>
        ))}
      </div>

      {/* Log Table */}
      <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Ingestion Data Quality Audit Trail
        </h3>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Work ID</th>
                <th className="px-4 py-3">Issue Category</th>
                <th className="px-4 py-3">Field</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-cyan-400 font-semibold">{log.work_id || 'N/A'}</td>
                  <td className="px-4 py-3 font-semibold text-slate-200">{log.issue_type}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{log.field_name}</td>
                  <td className="px-4 py-3 text-slate-300">{log.description}</td>
                  <td className="px-4 py-3 text-emerald-400 font-medium">{log.action_taken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
