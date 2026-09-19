import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  ShieldAlert,
  Zap,
  FileCheck2,
  BarChart3,
  BookOpen,
  MessageSquarePlus,
  CheckCircle2,
  Server
} from 'lucide-react';
import { I18N_STRINGS } from '../data/mockData';

export default function Sidebar({
  activeTab,
  onTabChange,
  criticalCount = 142,
  lang = 'en',
  currentRole,
  onOpenCitizenModal
}) {
  const t = I18N_STRINGS[lang] || I18N_STRINGS.en;

  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'heatmap', label: t.navHeatmap, icon: MapPin },
    { id: 'audit-queue', label: t.navQueue, icon: ShieldAlert, badge: criticalCount },
    { id: 'sandbox', label: t.navSandbox, icon: Zap, highlight: true },
    { id: 'data-quality', label: t.navQuality, icon: FileCheck2 },
    { id: 'analytics', label: t.navAnalytics, icon: BarChart3 },
    { id: 'guidelines', label: t.navGuidelines, icon: BookOpen }
  ];

  return (
    <aside className="gov-sidebar" aria-label="Official Navigation Sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section-title">
          {lang === 'hi' ? 'मुख्य सतर्कता प्रभाग' : 'Core Vigilance Modules'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-link-btn ${isActive ? 'active' : ''} ${item.highlight ? 'nav-highlight-btn' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-badge-alert" title={`${item.badge} anomalies flagged`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Public Citizen Grievance Action Button */}
        <div style={{ marginTop: 14, padding: '0 8px' }}>
          <button
            type="button"
            className="citizen-grievance-sidebar-btn"
            onClick={onOpenCitizenModal}
            title="Submit Public Whistleblower Complaint"
          >
            <MessageSquarePlus size={16} />
            <span>{lang === 'hi' ? 'जन-शिकायत दर्ज करें' : 'Report Ghost Asset'}</span>
          </button>
        </div>
      </nav>

      {/* Official System Health Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-status-box">
          <div className="status-row">
            <span className="status-label">AI Risk Engine:</span>
            <span className="status-val-ok">Active v2.4</span>
          </div>
          <div className="status-row">
            <span className="status-label">LGD Master Sync:</span>
            <span className="status-val-ok">100% OK</span>
          </div>
          <div className="status-row">
            <span className="status-label">PFMS Gateway:</span>
            <span className="status-val-ok">Connected</span>
          </div>
        </div>
        <div className="sidebar-version-text">
          NIC MoSPI Portal v4.2.0 | STQC Certified
        </div>
      </div>
    </aside>
  );
}
