import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuditDetailsModal from './components/AuditDetailsModal';
import RiskOverview from './pages/RiskOverview';
import GeospatialHeatmap from './pages/GeospatialHeatmap';
import AnomalyAuditQueue from './pages/AnomalyAuditQueue';
import DataQualityAuditTrail from './pages/DataQualityAuditTrail';
import ConstituencyAnalytics from './pages/ConstituencyAnalytics';
import GuidelinesSOP from './pages/GuidelinesSOP';
import { ROLES, MPLADS_WORKS } from './data/mockData';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState(ROLES[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWorkForModal, setSelectedWorkForModal] = useState(null);
  const [fontSize, setFontSize] = useState('normal');
  const [toasts, setToasts] = useState([]);
  const [worksData, setWorksData] = useState(MPLADS_WORKS);

  // Manage accessibility font size class on body
  useEffect(() => {
    document.body.classList.remove('font-small', 'font-large');
    if (fontSize === 'small') document.body.classList.add('font-small');
    if (fontSize === 'large') document.body.classList.add('font-large');
  }, [fontSize]);

  // Toast notification trigger
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Trigger executive actions from modal
  const handleTriggerAction = (workId, actionType, note) => {
    let newStatus = 'Pending Action';
    let toastType = 'success';

    if (actionType === 'Freeze Outlay') {
      newStatus = 'Disbursement Frozen by Order';
      toastType = 'critical';
      addToast(`OFFICIAL ORDER: Work #${workId} outlay disbursement frozen immediately. Reason: ${note}`, 'critical');
    } else if (actionType === 'Order Physical Inspection') {
      newStatus = 'Physical Inspection Dispatched';
      addToast(`INSPECTION ORDER: SDM & Executive Engineer deputed for site verification of Work #${workId}.`, 'success');
    } else if (actionType === 'Clear Flag') {
      newStatus = 'Supervisory Audit Cleared';
      addToast(`AUDIT CLEARED: Work #${workId} discrepancy explanation accepted and verified.`, 'success');
    }

    setWorksData(prev =>
      prev.map(w => (w.id === workId ? { ...w, status: newStatus } : w))
    );
  };

  const criticalCount = worksData.filter(w => w.riskLevel === 'critical').length;

  return (
    <div className="app-container">
      {/* Official Government Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(newRole) => {
          setCurrentRole(newRole);
          addToast(`Switched active official persona to: ${newRole.title}`, 'info');
        }}
        onFontSizeChange={setFontSize}
        currentFontSize={fontSize}
      />

      {/* Main Body */}
      <div className="app-body">
        {/* Persistent Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          criticalCount={criticalCount}
        />

        {/* Dynamic Main Content Workspace */}
        <main className="gov-main-content">
          {activeTab === 'dashboard' && (
            <RiskOverview
              currentRole={currentRole}
              onNavigateToTab={setActiveTab}
              onSelectWorkForModal={setSelectedWorkForModal}
            />
          )}

          {activeTab === 'heatmap' && (
            <GeospatialHeatmap
              onSelectWorkForModal={setSelectedWorkForModal}
            />
          )}

          {activeTab === 'audit-queue' && (
            <AnomalyAuditQueue
              onSelectWorkForModal={setSelectedWorkForModal}
            />
          )}

          {activeTab === 'data-quality' && (
            <DataQualityAuditTrail />
          )}

          {activeTab === 'analytics' && (
            <ConstituencyAnalytics
              currentRole={currentRole}
              onSelectWorkForModal={setSelectedWorkForModal}
            />
          )}

          {activeTab === 'guidelines' && (
            <GuidelinesSOP />
          )}
        </main>
      </div>

      {/* Forensic Inspection Modal */}
      {selectedWorkForModal && (
        <AuditDetailsModal
          work={selectedWorkForModal}
          onClose={() => setSelectedWorkForModal(null)}
          onTriggerAction={handleTriggerAction}
        />
      )}

      {/* Official Notification Toasts */}
      <div className="toast-container" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className={`gov-toast ${toast.type}`}>
            {toast.type === 'critical' ? (
              <AlertTriangle size={18} color="#FF5252" style={{ flexShrink: 0 }} />
            ) : (
              <CheckCircle2 size={18} color="#00B050" style={{ flexShrink: 0 }} />
            )}
            <div>{toast.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
