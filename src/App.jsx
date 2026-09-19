import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AuditDetailsModal from './components/AuditDetailsModal';
import OfficialOrderModal from './components/OfficialOrderModal';
import CitizenGrievanceModal from './components/CitizenGrievanceModal';
import RiskOverview from './pages/RiskOverview';
import GeospatialHeatmap from './pages/GeospatialHeatmap';
import AnomalyAuditQueue from './pages/AnomalyAuditQueue';
import AiEngineSandbox from './pages/AiEngineSandbox';
import DataQualityAuditTrail from './pages/DataQualityAuditTrail';
import ConstituencyAnalytics from './pages/ConstituencyAnalytics';
import GuidelinesSOP from './pages/GuidelinesSOP';
import { ROLES, MPLADS_WORKS } from './data/mockData';
import { CheckCircle2, AlertTriangle, Info, FileText } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState(ROLES[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWorkForModal, setSelectedWorkForModal] = useState(null);
  const [orderModalData, setOrderModalData] = useState(null);
  const [isCitizenModalOpen, setIsCitizenModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [lang, setLang] = useState('en');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [worksData, setWorksData] = useState(MPLADS_WORKS);

  // Manage accessibility font size & contrast class on body
  useEffect(() => {
    document.body.classList.remove('font-small', 'font-large', 'high-contrast');
    if (fontSize === 'small') document.body.classList.add('font-small');
    if (fontSize === 'large') document.body.classList.add('font-large');
    if (isHighContrast) document.body.classList.add('high-contrast');
  }, [fontSize, isHighContrast]);

  // Toast notification trigger
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
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

  // Open the Official Government Order generator
  const handleOpenOrderModal = (work, actionType = 'Freeze Outlay', note = '') => {
    setOrderModalData({
      work,
      actionType,
      note,
      official: currentRole
    });
  };

  // When citizen submits whistleblower grievance
  const handleGrievanceSubmitted = (grievance) => {
    addToast(`WHISTLEBLOWER COMPLAINT #${grievance.docketId}: Logged in Central Vigilance Queue for Work #${grievance.workId}.`, 'success');
  };

  const criticalCount = worksData.filter(w => w.riskLevel === 'critical').length;

  return (
    <div className={`app-container ${isHighContrast ? 'high-contrast-mode' : ''}`} id="main-content">
      {/* Official Government Header with GIGW Top Bar */}
      <Header
        currentRole={currentRole}
        onRoleChange={(newRole) => {
          setCurrentRole(newRole);
          addToast(`Switched active official persona to: ${lang === 'hi' && newRole.titleHi ? newRole.titleHi : newRole.title}`, 'info');
        }}
        onFontSizeChange={setFontSize}
        currentFontSize={fontSize}
        lang={lang}
        onLangChange={(newLang) => {
          setLang(newLang);
          addToast(newLang === 'hi' ? 'भाषा हिन्दी में बदली गई।' : 'Interface switched to English.', 'info');
        }}
        isHighContrast={isHighContrast}
        onToggleContrast={() => setIsHighContrast(!isHighContrast)}
      />

      {/* Main Body Layout */}
      <div className="app-body">
        {/* Persistent Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          criticalCount={criticalCount}
          lang={lang}
          currentRole={currentRole}
          onOpenCitizenModal={() => setIsCitizenModalOpen(true)}
        />

        {/* Dynamic Main Content Workspace */}
        <main className="gov-main-content">
          {activeTab === 'dashboard' && (
            <RiskOverview
              currentRole={currentRole}
              onNavigateToTab={setActiveTab}
              onSelectWorkForModal={setSelectedWorkForModal}
              onOpenCitizenModal={() => setIsCitizenModalOpen(true)}
              onOpenOrderModal={handleOpenOrderModal}
              lang={lang}
            />
          )}

          {activeTab === 'heatmap' && (
            <GeospatialHeatmap
              onSelectWorkForModal={setSelectedWorkForModal}
              lang={lang}
            />
          )}

          {activeTab === 'audit-queue' && (
            <AnomalyAuditQueue
              onSelectWorkForModal={setSelectedWorkForModal}
              onOpenOrderModal={handleOpenOrderModal}
              lang={lang}
            />
          )}

          {activeTab === 'sandbox' && (
            <AiEngineSandbox
              onSelectWorkForOrder={handleOpenOrderModal}
              lang={lang}
            />
          )}

          {activeTab === 'data-quality' && (
            <DataQualityAuditTrail
              lang={lang}
            />
          )}

          {activeTab === 'analytics' && (
            <ConstituencyAnalytics
              currentRole={currentRole}
              onSelectWorkForModal={setSelectedWorkForModal}
              lang={lang}
            />
          )}

          {activeTab === 'guidelines' && (
            <GuidelinesSOP
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Forensic Inspection Modal */}
      {selectedWorkForModal && (
        <AuditDetailsModal
          work={selectedWorkForModal}
          onClose={() => setSelectedWorkForModal(null)}
          onTriggerAction={handleTriggerAction}
          onOpenOrderModal={handleOpenOrderModal}
          lang={lang}
        />
      )}

      {/* Official Government Order (G.O.) Document Modal */}
      {orderModalData && (
        <OfficialOrderModal
          work={orderModalData.work}
          actionType={orderModalData.actionType}
          note={orderModalData.note}
          official={orderModalData.official}
          onClose={() => setOrderModalData(null)}
        />
      )}

      {/* Citizen Whistleblower Grievance Modal */}
      {isCitizenModalOpen && (
        <CitizenGrievanceModal
          onClose={() => setIsCitizenModalOpen(false)}
          onSubmitSuccess={handleGrievanceSubmitted}
        />
      )}

      {/* Official NIC & MeitY Compliance Footer */}
      <Footer lang={lang} />

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
