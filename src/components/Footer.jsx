import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, ExternalLink, Globe } from 'lucide-react';

export default function Footer({ lang = 'en' }) {
  const currentDate = '19 Sep 2026';

  return (
    <footer className="gov-footer" role="contentinfo">
      {/* Upper Footer Links */}
      <div className="gov-footer-top">
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>{lang === 'hi' ? 'मंत्रालय एवं नीति' : 'Ministry & Governance'}</h4>
            <ul>
              <li><a href="https://www.mospi.gov.in" target="_blank" rel="noreferrer">MoSPI Central Portal <ExternalLink size={10} /></a></li>
              <li><a href="https://mplads.gov.in" target="_blank" rel="noreferrer">e-Sakshi MPLADS MIS <ExternalLink size={10} /></a></li>
              <li><a href="https://pfms.nic.in" target="_blank" rel="noreferrer">PFMS Central Treasury <ExternalLink size={10} /></a></li>
              <li><a href="https://www.cvc.gov.in" target="_blank" rel="noreferrer">Central Vigilance Commission (CVC) <ExternalLink size={10} /></a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{lang === 'hi' ? 'वैधानिक नीतियां' : 'Statutory Policies'}</h4>
            <ul>
              <li><a href="#terms">Terms of Use & Disclaimer</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#copyright">Copyright Policy</a></li>
              <li><a href="#hyperlink">Hyperlinking Policy</a></li>
              <li><a href="#security">Cyber Security Policy (CERT-In)</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{lang === 'hi' ? 'सुलभता एवं सहायता' : 'Accessibility & Support'}</h4>
            <ul>
              <li><a href="#accessibility">Accessibility Statement (GIGW 3.0)</a></li>
              <li><a href="#screenreader">Screen Reader Manual</a></li>
              <li><a href="#sitemap">Portal Sitemap</a></li>
              <li><a href="#helpdesk">Central Vigilance Helpdesk (Toll Free)</a></li>
              <li><a href="#rti">Right to Information (RTI)</a></li>
            </ul>
          </div>

          <div className="footer-col certifications-col">
            <h4>{lang === 'hi' ? 'प्रमाणन एवं सुरक्षा' : 'Security & Compliance'}</h4>
            <div className="compliance-badges-grid">
              <div className="badge-cert" title="Standardisation Testing and Quality Certification Directorate">
                <span className="cert-code">STQC</span>
                <span className="cert-desc">Audited & Certified</span>
              </div>
              <div className="badge-cert" title="Web Content Accessibility Guidelines 2.1 AA">
                <span className="cert-code">W3C WAI-AA</span>
                <span className="cert-desc">WCAG 2.1 Compliant</span>
              </div>
              <div className="badge-cert" title="Internet Protocol Version 6 Ready">
                <span className="cert-code">IPv6</span>
                <span className="cert-desc">Ready Network</span>
              </div>
              <div className="badge-cert" title="MeghRaj Government of India Cloud">
                <span className="cert-code">MeghRaj</span>
                <span className="cert-desc">GI Cloud Hosted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer Attribution */}
      <div className="gov-footer-bottom">
        <div className="footer-bottom-inner">
          <div className="nic-attribution">
            <div className="nic-logo-text">
              <strong>NATIONAL INFORMATICS CENTRE</strong>
              <span>Government of India</span>
            </div>
            <div className="nic-disclaimer-text">
              {lang === 'hi'
                ? 'पोर्टल सामग्री का प्रबंधन एवं स्वामित्व सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI), भारत सरकार द्वारा किया जाता है। पोर्टल की रूपरेखा एवं विकास राष्ट्रीय सूचना विज्ञान केंद्र (NIC) द्वारा किया गया है।'
                : 'Portal Content Managed by Ministry of Statistics and Programme Implementation (MoSPI), Government of India. Designed, Developed and Hosted by National Informatics Centre (NIC).'}
            </div>
          </div>

          <div className="footer-meta-stats">
            <div className="meta-stat-item">
              <span className="meta-stat-label">Last Updated:</span>
              <span className="meta-stat-val">{currentDate}</span>
            </div>
            <div className="meta-stat-item">
              <span className="meta-stat-label">Portal Version:</span>
              <span className="meta-stat-val">v4.2.0 (SIH 2026 Production)</span>
            </div>
            <div className="meta-stat-item">
              <span className="meta-stat-label">Security Audit:</span>
              <span className="meta-stat-val" style={{ color: '#00B050' }}>Cleared by CERT-In</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
