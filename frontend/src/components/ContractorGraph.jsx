import React, { useEffect, useState } from 'react';
import { Network, AlertTriangle, Building2, ShieldAlert, IndianRupee } from 'lucide-react';

export default function ContractorGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contractors/graph')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load contractor graph data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        Calculating NetworkX Degree Centrality & Herfindahl-Hirschman Indices...
      </div>
    );
  }

  const { graph, contractors_summary } = data || { graph: { nodes: [], links: [] }, contractors_summary: [] };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400">
          <Network className="w-5 h-5" />
          <h3 className="text-base font-bold text-white font-['Outfit']">
            Contractor & Vendor Concentration Network (NetworkX Graph Engine)
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          Evaluates MP-District-Contractor allocation webs using Degree Centrality and Herfindahl-Hirschman Market Concentration Index (HHI). High HHI scores (&gt;2500) or single-vendor district market shares &gt;50% trigger monopolization alerts.
        </p>
      </div>

      {/* Summary Table */}
      <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />
          Executing Agency & Vendor Risk Profiles
        </h4>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Contractor Entity</th>
                <th className="px-4 py-3 text-center">Sanctioned Works</th>
                <th className="px-4 py-3 text-right">Total Outlay</th>
                <th className="px-4 py-3">Dominant District</th>
                <th className="px-4 py-3 text-center">District Market Share</th>
                <th className="px-4 py-3 text-center">District HHI</th>
                <th className="px-4 py-3 text-center">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {contractors_summary.map((c, i) => (
                <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-100 max-w-[200px] truncate">
                    {c.contractor_name}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-cyan-400">
                    {c.total_works} works
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-white">
                    ₹{c.total_sanctioned_amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {c.dominant_district || 'Multi-District'}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-slate-200">
                    {c.max_district_share_pct.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-slate-300">
                    {Math.round(c.hhi_score)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.is_monopoly_risk ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60 flex items-center justify-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-400" /> Monopoly Alert
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 inline-block">
                        Distributed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
