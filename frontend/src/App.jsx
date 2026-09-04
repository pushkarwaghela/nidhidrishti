import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import RiskMap from './components/RiskMap';
import AlertQueue from './components/AlertQueue';
import ContractorGraph from './components/ContractorGraph';
import DataQualityView from './components/DataQualityView';
import ExplainabilityModal from './components/ExplainabilityModal';
import { LayoutDashboard, MapPin, ShieldAlert, Network, FileCheck, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewData, setOverviewData] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [liveStatus, setLiveStatus] = useState('Engine Ready');

  const fetchDashboardData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/overview').then(res => res.json()),
      fetch('/api/works?limit=250').then(res => res.json())
    ])
      .then(([overviewRes, worksRes]) => {
        setOverviewData(overviewRes);
        setWorks(worksRes.works || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading dashboard data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();

    // WebSocket connection
    try {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${wsProtocol}//${window.location.host}/ws/alerts`);
      ws.onopen = () => setLiveStatus('Stream Connected');
      ws.onmessage = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.event === 'PIPELINE_REEXECUTION_COMPLETE') {
          setLiveStatus(`Updated (${msg.flagged_anomalies} anomalies flagged)`);
          fetchDashboardData();
        }
      };
      ws.onclose = () => setLiveStatus('Stream Offline');
    } catch (e) {
      setLiveStatus('Stream Local');
    }
  }, []);

  const handleRunPipeline = () => {
    setIsPipelineRunning(true);
    fetch('/api/pipeline/run', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setIsPipelineRunning(false);
        fetchDashboardData();
      })
      .catch(err => {
        console.error("Pipeline trigger failed:", err);
        setIsPipelineRunning(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
      {/* Header Navbar */}
      <Navbar
        onRunPipeline={handleRunPipeline}
        isPipelineRunning={isPipelineRunning}
        liveStatus={liveStatus}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Risk Overview Dashboard
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'map'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Geospatial Heatmap ({works.filter(w => w.latitude).length})
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'alerts'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Alert Queue & Audit ({works.filter(w => w.severity === 'Critical' || w.severity === 'Warning').length})
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'network'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Network className="w-4 h-4" />
            Contractor Concentration Graph
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'quality'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            Data Quality Audit Trail
          </button>
        </div>

        {/* Tab Views */}
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            Connecting to NidhiDrishti FastAPI Backend...
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <Overview data={overviewData} />}
            {activeTab === 'map' && <RiskMap works={works} onSelectWork={(id) => setSelectedWorkId(id)} />}
            {activeTab === 'alerts' && <AlertQueue works={works} onSelectWork={(id) => setSelectedWorkId(id)} />}
            {activeTab === 'network' && <ContractorGraph />}
            {activeTab === 'quality' && <DataQualityView />}
          </>
        )}
      </main>

      {/* Explainability Breakdown Modal */}
      {selectedWorkId && (
        <ExplainabilityModal
          workId={selectedWorkId}
          onClose={() => setSelectedWorkId(null)}
        />
      )}
    </div>
  );
}
