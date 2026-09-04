import React, { useEffect, useState } from 'react';
import { X, ShieldAlert, AlertTriangle, CheckCircle2, IndianRupee, Layers, MapPin, Building2, ExternalLink } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function ExplainabilityModal({ workId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workId) return;
    setLoading(true);
    fetch(`${API_BASE}/api/anomalies/${workId}/explain`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch explainability payload:", err);
        setLoading(false);
      });
  }, [workId]);

  if (!workId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">{data?.work_id || workId}</span>
              {data && (
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full text-white ${data.severity === 'Critical' ? 'bg-rose-600' :
                    data.severity === 'Warning' ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                  {data.severity} Risk ({Math.round(data.risk_score)}/100)
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white font-['Outfit'] mt-1">
              {data?.work_name || 'AI Anomaly & Risk Audit Breakdown'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {loading ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-xs">Computing feature contributions & baseline comparisons...</p>
            </div>
          ) : !data ? (
            <div className="p-8 text-center text-slate-400">Failed to load audit payload.</div>
          ) : (
            <>
              {/* Summary Banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  Primary Finding Summary
                </h4>
                <p className="text-sm font-semibold text-slate-100">{data.summary_headline}</p>
                <div className="space-y-1.5 mt-2">
                  {data.explanations?.map((exp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signal Contribution Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Signal Contribution Weights
                </h4>

                <div className="space-y-3">
                  {data.signals?.map((sig, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-200">{sig.factor}</span>
                        <span className={`font-bold ${sig.status.includes('Critical') ? 'text-rose-400' :
                            sig.status.includes('High') || sig.status.includes('Warning') ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                          +{sig.contribution_pct?.toFixed(1)} pts ({sig.status})
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${sig.status.includes('Critical') ? 'bg-rose-500' :
                              sig.status.includes('High') || sig.status.includes('Warning') ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          style={{ width: `${Math.min(100, (sig.contribution_pct / 40) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-slate-400">{sig.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Administrative Details Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <span className="text-slate-400 font-medium">Recommending MP</span>
                  <div className="font-semibold text-slate-100">{data.mp_name}</div>
                  <span className="text-[11px] text-slate-400">{data.district} District</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <span className="text-slate-400 font-medium">Sanctioned Outlay</span>
                  <div className="font-bold text-white">₹{data.sanctioned_amount?.toLocaleString('en-IN')}</div>
                  <span className="text-[11px] text-slate-400">Sector: {data.category}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition-colors"
          >
            Close Audit Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}
