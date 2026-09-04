import React from 'react';
import { AlertTriangle, IndianRupee, Layers, CheckCircle2, ShieldAlert, FileText, TrendingUp, Building2 } from 'lucide-react';

export default function Overview({ data }) {
  if (!data) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading MoSPI Analytics Engine Overview...
      </div>
    );
  }

  const { kpis, severity_distribution, categories, state_risk_distribution } = data;

  const formatINR = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Sanctioned Funds */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sanctioned</span>
            <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/40">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">{formatINR(kpis.total_sanctioned_amount)}</h3>
            <p className="text-xs text-slate-400 mt-1">Across {kpis.total_works} MPLADS Work Sanctions</p>
          </div>
        </div>

        {/* KPI 2: Flagged Risk Amount */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Flagged Risk Outlay</span>
            <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-rose-400 font-['Outfit']">{formatINR(kpis.flagged_sanctioned_amount)}</h3>
            <p className="text-xs text-rose-300/80 mt-1">{kpis.flagged_works_count} Anomalous Projects Under Audit</p>
          </div>
        </div>

        {/* KPI 3: Critical Anomaly Count */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Critical Anomalies</span>
            <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-amber-400 font-['Outfit']">{kpis.critical_anomalies_count} Works</h3>
            <p className="text-xs text-slate-400 mt-1">{kpis.warning_anomalies_count} Additional Warning Alerts</p>
          </div>
        </div>

        {/* KPI 4: Data Quality Audit Index */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Data Quality Audits</span>
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-emerald-400 font-['Outfit']">{kpis.data_quality_issues} Resolved</h3>
            <p className="text-xs text-slate-400 mt-1">Entity Resolutions & Field Audits</p>
          </div>
        </div>
      </div>

      {/* Grid: Severity Breakdown & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Severity Distribution Card */}
        <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Risk Severity Spectrum
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Critical Risk (≥ 75)
                </span>
                <span className="text-slate-300">{severity_distribution.Critical} works</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full" 
                  style={{ width: `${(severity_distribution.Critical / Math.max(1, kpis.total_works)) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning Tier (45 - 74)
                </span>
                <span className="text-slate-300">{severity_distribution.Warning} works</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${(severity_distribution.Warning / Math.max(1, kpis.total_works)) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Moderate (25 - 44)
                </span>
                <span className="text-slate-300">{severity_distribution.Moderate} works</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${(severity_distribution.Moderate / Math.max(1, kpis.total_works)) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Standard / Low (&lt; 25)
                </span>
                <span className="text-slate-300">{severity_distribution.Low} works</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${(severity_distribution.Low / Math.max(1, kpis.total_works)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sectoral Breakdown Card */}
        <div className="glass-panel p-6 rounded-xl border border-slate-800 lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Sectoral Work Allocations & Category Baselines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-slate-800 text-cyan-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{cat.category}</h4>
                    <p className="text-[11px] text-slate-400">{cat.count} Sanctioned Projects</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                  {cat.count} Works
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
