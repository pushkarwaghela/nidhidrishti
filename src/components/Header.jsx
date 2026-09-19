import React, { useState, useEffect } from 'react';
import { ROLES, I18N_STRINGS } from '../data/mockData';
import {
  UserCheck,
  ShieldAlert,
  Clock,
  Globe2,
  Eye,
  SlidersHorizontal,
  ExternalLink,
  Volume2
} from 'lucide-react';

export default function Header({
  currentRole,
  onRoleChange,
  onFontSizeChange,
  currentFontSize,
  lang = 'en',
  onLangChange,
  isHighContrast = false,
  onToggleContrast
}) {
  const [currentTime, setCurrentTime] = useState('');
  const t = I18N_STRINGS[lang] || I18N_STRINGS.en;

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
      setCurrentTime(now.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN', options) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <>
      {/* Top Tricolor Accent Stripe */}
      <div className="top-tricolor-bar" role="presentation">
        <div className="tricolor-saffron" />
        <div className="tricolor-white" />
        <div className="tricolor-green" />
      </div>

      {/* Official GIGW Gov Top Utility Bar */}
      <div className="gov-top-utility-bar">
        <div className="utility-inner">
          <div className="utility-left">
            <a href="#main-content" className="skip-link">Skip to Main Content</a>
            <span className="utility-divider">|</span>
            <a
              href="https://www.india.gov.in"
              target="_blank"
              rel="noreferrer"
              className="gov-ext-link"
              title="National Portal of India"
            >
              india.gov.in <ExternalLink size={10} />
            </a>
            <span className="utility-divider">|</span>
            <a
              href="https://www.mospi.gov.in"
              target="_blank"
              rel="noreferrer"
              className="gov-ext-link"
              title="Ministry of Statistics & Programme Implementation"
            >
              MoSPI Portal <ExternalLink size={10} />
            </a>
            <span className="utility-divider">|</span>
            <span className="screen-reader-text" title="Screen Reader Access Enabled">
              <Volume2 size={12} style={{ verticalAlign: 'middle', marginRight: 3 }} /> Screen Reader Access
            </span>
          </div>

          <div className="utility-right">
            {/* Accessibility Font Size Resizer */}
            <div className="gov-font-resizers" aria-label="Text Size Controls">
              <span className="resizer-label">Text Size:</span>
              <button
                type="button"
                className={`font-btn ${currentFontSize === 'small' ? 'active' : ''}`}
                onClick={() => onFontSizeChange('small')}
                title="Decrease font size"
              >
                A-
              </button>
              <button
                type="button"
                className={`font-btn ${currentFontSize === 'normal' ? 'active' : ''}`}
                onClick={() => onFontSizeChange('normal')}
                title="Standard font size"
              >
                A
              </button>
              <button
                type="button"
                className={`font-btn ${currentFontSize === 'large' ? 'active' : ''}`}
                onClick={() => onFontSizeChange('large')}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <span className="utility-divider">|</span>

            {/* High Contrast Mode Toggle */}
            <button
              type="button"
              className={`utility-action-btn ${isHighContrast ? 'active' : ''}`}
              onClick={onToggleContrast}
              title="Toggle High Contrast Accessibility Mode"
            >
              <Eye size={12} />
              <span>{isHighContrast ? 'Standard Mode' : 'High Contrast'}</span>
            </button>

            <span className="utility-divider">|</span>

            {/* Bilingual Language Switcher */}
            <div className="lang-switcher-group" aria-label="Language Selector">
              <Globe2 size={12} />
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => onLangChange('en')}
                title="Switch interface to English"
              >
                English
              </button>
              <span style={{ color: '#8898AA' }}>/</span>
              <button
                type="button"
                className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
                onClick={() => onLangChange('hi')}
                title="इंटरफेस को हिन्दी में बदलें"
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Government Header */}
      <header className="gov-header">
        <div className="gov-header-inner">
          {/* Identity Group: Emblem + Titles */}
          <div className="gov-identity-group">
            <div className="national-emblem-container" title="State Emblem of India | सत्यमेव जयते">
              {/* Authentic Ashoka Lion Capital SVG Representation */}
              <svg className="national-emblem-svg" viewBox="0 0 100 130" fill="currentColor">
                <path d="M50 8 C40 8 36 18 36 28 C36 34 38 40 42 45 C35 48 30 55 30 64 C30 76 40 82 50 82 C60 82 70 76 70 64 C70 55 65 48 58 45 C62 40 64 34 64 28 C64 18 60 8 50 8 Z M50 18 C54 18 56 22 56 28 C56 34 54 38 50 38 C46 38 44 34 44 28 C44 22 46 18 50 18 Z" />
                <path d="M26 42 C20 45 16 52 16 60 C16 70 24 76 32 78 C30 72 32 66 36 62 C32 54 30 46 26 42 Z" />
                <path d="M74 42 C80 45 84 52 84 60 C84 70 76 76 68 78 C70 72 68 66 64 62 C68 54 70 46 74 42 Z" />
                <rect x="22" y="86" width="56" height="8" rx="2" fill="currentColor" />
                <circle cx="50" cy="90" r="3" fill="#FFFFFF" />
                <path d="M26 98 L74 98 L70 106 L30 106 Z" fill="currentColor" />
                <text x="50" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="'Noto Sans Devanagari', sans-serif" letterSpacing="0.8">
                  सत्यमेव जयते
                </text>
              </svg>
            </div>

            <div className="gov-title-wrapper">
              <div className="gov-super-text">
                {lang === 'hi' ? 'भारत सरकार | GOVERNMENT OF INDIA' : 'भारत सरकार | GOVERNMENT OF INDIA'}
              </div>
              <div className="gov-ministry-text">
                {lang === 'hi'
                  ? 'सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय | Ministry of Statistics and Programme Implementation'
                  : 'सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय | Ministry of Statistics and Programme Implementation'}
              </div>
              <div className="gov-portal-title">
                <span className="gov-portal-name">NidhiDrishti</span>
                <span className="gov-portal-hindi">निधिदृष्टि</span>
                <span className="gov-portal-badge">{t.badgeText}</span>
              </div>
            </div>
          </div>

          {/* Right Header Badges & Role Controls */}
          <div className="gov-header-controls">
            {/* Viksit Bharat 2047 & Digital India Badge */}
            <div className="national-initiative-badge" title="Viksit Bharat 2047 & Digital India Initiative">
              <div className="initiative-icon">🇮🇳</div>
              <div className="initiative-meta">
                <span className="initiative-title">विकसित भारत @ 2047</span>
                <span className="initiative-sub">Digital Vigilance</span>
              </div>
            </div>

            {/* Live IST Timestamp & Sync status */}
            <div className="gov-meta-timestamp" title="Live Indian Standard Time">
              <div className="date-val">{currentTime || 'Live IST Clock'}</div>
              <div className="status-indicator">
                <span className="dot-live" />
                <span>{t.liveSync}</span>
              </div>
            </div>

            {/* Role Switcher (5 Personas including Citizen) */}
            <div className="gov-role-selector-card" title="Switch stakeholder persona for demonstration">
              <UserCheck size={18} color="#0B3D67" />
              <div className="role-selector-label">
                <span className="role-selector-caption">{t.roleLabel}</span>
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
                      {lang === 'hi' && role.titleHi ? role.titleHi : role.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Government Vigilance Alert Ribbon */}
      <div className="gov-ticker-ribbon" role="region" aria-label="Official Directives Bulletin">
        <div className="ticker-badge">OFFICIAL BULLETIN</div>
        <div className="ticker-text-wrapper">
          <div className="ticker-scroll-text">
            {t.tickerAlert}
          </div>
        </div>
      </div>
    </>
  );
}
