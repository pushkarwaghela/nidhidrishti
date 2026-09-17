import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  ShieldAlert,
  FileCheck2,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Server
} from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, criticalCount = 142 }) {
  const navItems = [
    { id: 'dashboard', label: 'Risk Overview Dashboard', icon: LayoutDashboard },
    { id: 'heatmap', label: 'Geospatial Risk Heatmap', icon: MapPin },
    { id: 'audit-queue', label: 'AI Anomaly & Risk Queue', icon: ShieldAlert, badge: criticalCount },
    { id: 'data-quality', label: 'Ingestion Data Quality Trail', icon: FileCheck2 },
    { id: 'analytics', label: 'Constituency & Analytics', icon: BarChart3 },
    { id: 'guidelines', label: 'MPLADS Guidelines & SOPs', icon: BookOpen }
  ];

  return (
    <aside className="gov-sidebar" aria-label="Official Navigation Sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section-title">Core Vigilance Modules</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-link-btn ${isActive ? 'active' : ''}`}
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
      </nav>

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
          NIC MoSPI Portal v4.1.8 | Certified Secure
        </div>
      </div>
    </aside>
  );
}
