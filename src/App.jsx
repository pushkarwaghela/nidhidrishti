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
import { ROLES, MPLADS_WORKS, SUMMARY_METRICS, RISK_SEVERITY_BREAKDOWN, SECTOR_ALLOCATION } from './data/mockData';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  useEffect(() => {
    document.body.classList.remove('font-small', 'font-large', 'high-contrast');
    if (fontSize === 'small') document.body.classList.add('font-small');
    if (fontSize === 'large') document.body.classList.add('font-large');
    if (isHighContrast) document.body.classList.add('high-contrast');
  }, [fontSize, isHighContrast]);

  useEffect(() => {
    let ignore = false;

    const hydrateDashboard = (snapshot) => {
      if (!snapshot) return;

      if (snapshot.works && snapshot.works.length) {
        MPLADS_WORKS.splice(0, MPLADS_WORKS.length, ...snapshot.works);
      }

      if (snapshot.summary) {
        Object.assign(SUMMARY_METRICS.totalSanctionedOutlay, snapshot.summary.totalSanctionedOutlay || SUMMARY_METRICS.totalSanctionedOutlay);
        Object.assign(SUMMARY_METRICS.flaggedRiskOutlay, snapshot.summary.flaggedRiskOutlay || SUMMARY_METRICS.flaggedRiskOutlay);
        Object.assign(SUMMARY_METRICS.criticalAnomalies, snapshot.summary.criticalAnomalies || SUMMARY_METRICS.criticalAnomalies);
        Object.assign(SUMMARY_METRICS.dataQualityResolved, snapshot.summary.dataQualityResolved || SUMMARY_METRICS.dataQualityResolved);
      }

      if (snapshot.riskBreakdown) {
        Object.keys(RISK_SEVERITY_BREAKDOWN).forEach(key => {
          if (snapshot.riskBreakdown[key]) {
            Object.assign(RISK_SEVERITY_BREAKDOWN[key], snapshot.riskBreakdown[key]);
          }
        });
      }

      if (snapshot.sectorBreakdown) {
        SECTOR_ALLOCATION.splice(0, SECTOR_ALLOCATION.length, ...snapshot.sectorBreakdown);
      }

      setWorksData([...MPLADS_WORKS]);
    };

    const loadDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/dashboard`);
        if (!response.ok) {
          throw new Error('API unavailable');
        }
        const payload = await response.json();

        if (!ignore) {
          hydrateDashboard(payload);
          addToast('Live government surveillance data synced from backend.', 'success');
        }
      } catch (error) {
        if (!ignore) {
          addToast('Live backend unavailable. Using secure offline demo dataset.', 'info');
        }
      }
    };

    loadDashboardData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleTriggerAction = (workId, actionType, note) => {
    let newStatus = 'Pending Action';

    if (actionType === 'Freeze Outlay') {
      newStatus = 'Disbursement Frozen by Order';
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

  const handleOpenOrderModal = (work, actionType = 'Freeze Outlay', note = '') => {
    setOrderModalData({
      work,
      actionType,
      note,
      official: currentRole
    });
  };

  const handleGrievanceSubmitted = (grievance) => {
    addToast(`WHISTLEBLOWER COMPLAINT #${grievance.docketId}: Logged in Central Vigilance Queue for Work #${grievance.workId}.`, 'success');
  };

  const criticalCount = worksData.filter(w => w.riskLevel === 'critical').length;

  return (
    <div className={`app-container ${isHighContrast ? 'high-contrast-mode' : ''}`} id="main-content">
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

      <div className="app-body">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          criticalCount={criticalCount}
          lang={lang}
          currentRole={currentRole}
          onOpenCitizenModal={() => setIsCitizenModalOpen(true)}
        />

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

      {selectedWorkForModal && (
        <AuditDetailsModal
          work={selectedWorkForModal}
          onClose={() => setSelectedWorkForModal(null)}
          onTriggerAction={handleTriggerAction}
          onOpenOrderModal={handleOpenOrderModal}
          lang={lang}
        />
      )}

      {orderModalData && (
        <OfficialOrderModal
          work={orderModalData.work}
          actionType={orderModalData.actionType}
          note={orderModalData.note}
          official={orderModalData.official}
          onClose={() => setOrderModalData(null)}
        />
      )}

      {isCitizenModalOpen && (
        <CitizenGrievanceModal
          onClose={() => setIsCitizenModalOpen(false)}
          onSubmitSuccess={handleGrievanceSubmitted}
        />
      )}

      <Footer lang={lang} />

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
