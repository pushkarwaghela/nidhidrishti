import React, { useState, useEffect } from 'react';
import { ROLES } from '../data/mockData';
import { UserCheck, ShieldAlert, Clock, Sliders } from 'lucide-react';

export default function Header({ currentRole, onRoleChange, onFontSizeChange, currentFontSize }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(now.toLocaleString('en-IN', options) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Tricolor Accent Bar */}
      <div className="top-tricolor-bar">
        <div className="tricolor-saffron" />
        <div className="tricolor-white" />
        <div className="tricolor-green" />
      </div>

      <header className="gov-header">
        <div className="gov-header-inner">
          {/* Identity Group */}
          <div className="gov-identity-group">
            <div className="national-emblem-container" title="State Emblem of India">
              {/* Authentic Ashoka Lion Capital SVG Representation */}
              <svg className="national-emblem-svg" viewBox="0 0 100 130" fill="currentColor">
                <path d="M50 8 C40 8 36 18 36 28 C36 34 38 40 42 45 C35 48 30 55 30 64 C30 76 40 82 50 82 C60 82 70 76 70 64 C70 55 65 48 58 45 C62 40 64 34 64 28 C64 18 60 8 50 8 Z M50 18 C54 18 56 22 56 28 C56 34 54 38 50 38 C46 38 44 34 44 28 C44 22 46 18 50 18 Z" />
                <path d="M26 42 C20 45 16 52 16 60 C16 70 24 76 32 78 C30 72 32 66 36 62 C32 54 30 46 26 42 Z" />
                <path d="M74 42 C80 45 84 52 84 60 C84 70 76 76 68 78 C70 72 68 66 64 62 C68 54 70 46 74 42 Z" />
                {/* Ashoka Chakra Base */}
                <rect x="22" y="86" width="56" height="8" rx="2" fill="currentColor" />
                <circle cx="50" cy="90" r="3" fill="#FFFFFF" />
                <path d="M26 98 L74 98 L70 106 L30 106 Z" fill="currentColor" />
                {/* Satyameva Jayate bilingual motto */}
                <text x="50" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="'Noto Sans Devanagari', sans-serif" letterSpacing="0.8">
                  सत्यमेव जयते
                </text>
              </svg>
            </div>

            <div className="gov-title-wrapper">
              <div className="gov-super-text">भारत सरकार | GOVERNMENT OF INDIA</div>
              <div className="gov-ministry-text">सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय | Ministry of Statistics and Programme Implementation</div>
              <div className="gov-portal-title">
                <span className="gov-portal-name">NidhiDrishti</span>
                <span className="gov-portal-hindi">निधिदृष्टि</span>
                <span className="gov-portal-badge">MPLADS AI VIGILANCE</span>
              </div>
            </div>
          </div>

          {/* Controls & Role Switcher */}
          <div className="gov-header-controls">
            {/* Live IST Timestamp */}
            <div className="gov-meta-timestamp" title="Live Indian Standard Time">
              <div className="date-val">{currentTime || '17 Sep 2026, 00:20 IST'}</div>
              <div className="status-indicator">
                <span className="dot-live" />
                <span>e-Sakshi Live Sync</span>
              </div>
            </div>

            {/* Accessibility Controls */}
            <div className="gov-accessibility-controls" title="Text Resizing Accessibility">
              <button
                type="button"
                className={`font-btn ${currentFontSize === 'small' ? 'active' : ''}`}
                onClick={() => onFontSizeChange('small')}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                className={`font-btn ${currentFontSize === 'normal' ? 'active' : ''}`}
                onClick={() => onFontSizeChange('normal')}
                title="Standard Font Size"
              >
                A
              </button>
              <button
                type="button"
                className={`font-btn ${currentFontSize === 'large' ? 'active' : ''}`}
                onClick={() => onFontSizeChange('large')}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Role Switcher */}
            <div className="gov-role-selector-card" title="Switch stakeholder persona for demonstration">
              <UserCheck size={18} color="#0B3D67" />
              <div className="role-selector-label">
                <span className="role-selector-caption">Active Official Persona</span>
                <select
                  id="role-selector-dropdown"
                  className="role-select-input"
                  value={currentRole.id}
                  onChange={(e) => {
                    const selected = ROLES.find(r => r.id === e.target.value);
                    if (selected) onRoleChange(selected);
                  }}
                >
                  {ROLES.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
