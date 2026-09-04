import React from 'react';
import { ShieldAlert, RefreshCw, Activity, Database, CheckCircle2 } from 'lucide-react';

export default function Navbar({ onRunPipeline, isPipelineRunning, liveStatus }) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white font-['Outfit']">
              NidhiDrishti <span className="text-cyan-400 font-light text-sm">v1.0</span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 rounded-full uppercase">
              SIH26102 Prototype
            </span>
          </div>
          <p className="text-xs text-slate-400">
            MoSPI Data Informatics & Innovation Division — AI MPLADS Anomaly Detection Engine
          </p>
        </div>
      </div>

      {/* Real-time Status & Actions */}
      <div className="flex items-center gap-4">
        {/* Live WebSocket Status Ticker */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">{liveStatus}</span>
        </div>

        {/* Trigger Pipeline Button */}
        <button
          onClick={onRunPipeline}
          disabled={isPipelineRunning}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-medium text-xs rounded-lg transition-all shadow-md shadow-cyan-900/30 border border-cyan-500/40"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPipelineRunning ? 'animate-spin' : ''}`} />
          {isPipelineRunning ? 'Re-scoring Pipeline...' : 'Re-Run ML Engine'}
        </button>
      </div>
    </header>
  );
}
