// File: src/App.js
/* global __firebase_config, __initial_auth_token */
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MusicPage from './pages/MusicPage';
import MerchPage from './pages/MerchPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import Modal from './components/Modal';
import MessageBox from './components/MessageBox';
import { themes } from './utills/themes';

// Firebase config
const deployedFirebaseConfig = (typeof process !== 'undefined' && process.env.REACT_APP_FIREBASE_CONFIG) ? JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG) : {};
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : deployedFirebaseConfig;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let app, db, auth;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  app = null; db = null; auth = null;
}

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/about', label: 'About' },
  { to: '/music', label: 'Music' },
  { to: '/merch', label: 'Merch' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/pcshivanofficial', icon: 'fab fa-instagram', label: 'Instagram', color: '#e1306c' },
  { href: 'https://open.spotify.com/artist/pcshivanofficial', icon: 'fab fa-spotify', label: 'Spotify', color: '#1DB954' },
  { href: 'https://x.com/pcshivan', icon: 'fab fa-twitter', label: 'X (Twitter)', color: '#1d9bf0' },
  { href: 'https://www.facebook.com/pcshivan', icon: 'fab fa-facebook-f', label: 'Facebook', color: '#1877f2' },
  { href: 'https://www.linkedin.com/in/pcshivan', icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: '#0a66c2' },
];

// ─── Header Component ──────────────────────────────────────────────────────────
const Header = ({ currentThemeId, setCurrentThemeId }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(3,7,18,0.92)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(139,92,246,0.15)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
          padding: scrolled ? '14px 0' : '22px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="font-cinzel font-black tracking-widest"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
                background: 'linear-gradient(135deg, #ffffff, #c4b5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.4))',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(168,85,247,0.7))'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(168,85,247,0.4))'; }}
            >
              PC SHIVAN
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <span
                    className="nav-link px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                    style={{
                      color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.65)',
                      background: isActive ? 'rgba(139,92,246,0.15)' : 'transparent',
                      letterSpacing: '0.04em',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {link.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Book CTA (desktop only) */}
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 font-bold text-sm text-white"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                padding: '9px 20px', borderRadius: '9999px',
                boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,58,237,0.65)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <i className="fas fa-calendar-alt text-xs"></i> Book Now
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white/70 hover:text-white p-2 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div
            className="md:hidden animate-fade-in"
            style={{
              background: 'rgba(3,7,18,0.97)',
              borderTop: '1px solid rgba(139,92,246,0.2)',
              padding: '16px 24px 24px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                {({ isActive }) => (
                  <div
                    className="py-3 px-4 rounded-xl mb-1 font-semibold text-base transition-all duration-200"
                    style={{
                      color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.7)',
                      background: isActive ? 'rgba(139,92,246,0.15)' : 'transparent',
                      borderLeft: isActive ? '3px solid #8b5cf6' : '3px solid transparent',
                    }}
                  >
                    {link.label}
                  </div>
                )}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="block mt-4 text-center font-bold text-white py-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-calendar-alt mr-2"></i>Book / Collaborate
            </Link>

            {/* Mobile socials */}
            <div className="flex justify-center gap-4 mt-5">
              {SOCIAL_LINKS.slice(0, 4).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = s.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

// ─── Footer Component ──────────────────────────────────────────────────────────
const Footer = () => (
  <footer
    style={{
      background: 'linear-gradient(to top, #030712, #0a0520)',
      borderTop: '1px solid rgba(139,92,246,0.15)',
      padding: '60px 24px 32px',
    }}
  >
    <div className="max-w-6xl mx-auto">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

        {/* Brand */}
        <div>
          <h3
            className="font-cinzel font-black text-2xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            PC SHIVAN
          </h3>
          <p className="text-white/45 text-sm leading-relaxed font-inter mb-4">
            Visionary music composer blending cinematic orchestration with cutting-edge electronic soundscapes.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${s.color}22`;
                  e.currentTarget.style.borderColor = `${s.color}50`;
                  e.currentTarget.style.color = s.color;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white/80 text-sm uppercase tracking-widest mb-4">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-white/45 text-sm transition-colors duration-200 font-inter"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#c4b5fd'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white/80 text-sm uppercase tracking-widest mb-4">Get In Touch</h4>
          <div className="space-y-3">
            <a
              href="mailto:contact@pcshivan.com"
              className="flex items-center gap-3 text-sm font-inter transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c4b5fd'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <i className="fas fa-envelope text-purple-500/60 w-4"></i>
              contact@pcshivan.com
            </a>
            <a
              href="https://open.spotify.com/artist/pcshivanofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-inter transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#1DB954'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <i className="fab fa-spotify text-green-500/60 w-4"></i>
              Listen on Spotify
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-3 text-sm font-inter transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c4b5fd'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <i className="fas fa-handshake text-purple-500/60 w-4"></i>
              Book / Collaborate
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 text-sm font-inter transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c4b5fd'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <i className="fas fa-file-download text-purple-500/60 w-4"></i>
              Press Kit
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', marginBottom: '24px' }} />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs font-inter">
          &copy; {new Date().getFullYear()} PC Shivan. All rights reserved.
        </p>
        <div className="flex gap-5">
          {['Privacy Policy', 'Terms of Use', 'Licensing'].map((item) => (
            <span
              key={item}
              className="text-white/30 text-xs font-inter cursor-pointer transition-colors duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-white/20 text-xs font-inter">
          Crafted with passion & technology
        </p>
      </div>
    </div>
  </footer>
);

// ─── Main App ──────────────────────────────────────────────────────────────────
const App = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormType, setContactFormType] = useState('general');
  const [userId, setUserId] = useState(null);
  const [messageBox, setMessageBox] = useState(null);
  const navigate = useNavigate();

  const [currentThemeId, setCurrentThemeId] = useState(() => localStorage.getItem('theme') || 'dark-purple');
  const themeClasses = themes[currentThemeId];

  useEffect(() => {
    const initFirebase = async () => {
      if (!auth || !db) return;
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
        onAuthStateChanged(auth, (user) => setUserId(user ? user.uid : null));
      } catch (error) {
        console.error('Firebase auth error:', error);
      }
    };
    initFirebase();
  }, []);

  useEffect(() => { localStorage.setItem('theme', currentThemeId); }, [currentThemeId]);

  const openContactModal = (type) => { setContactFormType(type); setShowContactModal(true); };
  const closeContactModal = () => { setShowContactModal(false); setContactFormType('general'); };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { name, email, subject, message } = form;
    const mailtoLink = `mailto:contact@pcshivan.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`)}`;
    window.location.href = mailtoLink;
    setMessageBox({ type: 'success', message: 'Your email client has been opened. Send the message to reach PC Shivan!' });
    closeContactModal();
  };

  const getContactSubject = (type) => {
    switch (type) {
      case 'producer-director': return 'Collaboration Inquiry – Producers & Directors';
      case 'corporate': return 'Corporate & Licensing Inquiry';
      default: return 'General Inquiry';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: 'white', fontFamily: "'Inter', sans-serif" }}>
      <Header currentThemeId={currentThemeId} setCurrentThemeId={setCurrentThemeId} />

      <main style={{ paddingTop: 0 }}>
        <Routes>
          <Route path="/" element={<HomePage scrollToSection={() => navigate('/music')} themeClasses={themeClasses} />} />
          <Route path="/about" element={<AboutPage themeClasses={themeClasses} />} />
          <Route path="/music" element={<MusicPage themeClasses={themeClasses} />} />
          <Route path="/merch" element={<MerchPage themeClasses={themeClasses} />} />
          <Route path="/contact" element={<ContactPage openContactModal={openContactModal} themeClasses={themeClasses} />} />
          <Route path="/testimonials" element={<TestimonialsPage userId={userId} db={db} themeClasses={themeClasses} />} />
          <Route path="*" element={
            <div
              className="flex flex-col items-center justify-center text-center"
              style={{ minHeight: '100vh', background: '#030712', padding: '40px' }}
            >
              <i className="fas fa-music text-purple-400/30 text-6xl mb-6"></i>
              <h2 className="font-cinzel text-4xl font-bold text-white mb-3">404</h2>
              <p className="text-white/50 mb-8">This page doesn't exist in our sonic universe.</p>
              <Link to="/" className="cta-primary">
                <i className="fas fa-home"></i> Back to Home
              </Link>
            </div>
          } />
        </Routes>
      </main>

      <Footer />

      {/* Contact Modal */}
      <Modal isOpen={showContactModal} onClose={closeContactModal} themeClasses={themeClasses}>
        <h3
          className="font-cinzel text-2xl font-bold text-center mb-6"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          {getContactSubject(contactFormType)}
        </h3>
        <form onSubmit={handleContactSubmit}>
          {[
            { id: 'name', label: 'Your Name', type: 'text' },
            { id: 'email', label: 'Your Email', type: 'email' },
          ].map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={`contact-${field.id}`} className="block text-white/65 text-sm font-semibold mb-2">{field.label}</label>
              <input
                type={field.type}
                id={`contact-${field.id}`}
                name={field.id}
                required
                className="w-full p-3 rounded-xl text-white text-sm focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          ))}
          <div className="mb-4">
            <label htmlFor="contact-subject" className="block text-white/65 text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              value={getContactSubject(contactFormType)}
              readOnly
              className="w-full p-3 rounded-xl text-white/50 text-sm cursor-not-allowed"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contact-message" className="block text-white/65 text-sm font-semibold mb-2">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              required
              placeholder="Tell me about your project or inquiry..."
              className="w-full p-3 rounded-xl text-white text-sm resize-y focus:outline-none"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold py-4 px-6 rounded-xl text-white text-base transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(124,58,237,0.7)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.45)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <i className="fas fa-paper-plane mr-2"></i>Send Message
          </button>
        </form>
      </Modal>

      <MessageBox
        message={messageBox?.message}
        type={messageBox?.type}
        onClose={() => setMessageBox(null)}
        themeClasses={themeClasses}
      />

      {/* Theme toggle */}
      <div className="theme-slider-container">
        <span className="theme-slider-label">Theme</span>
        <div
          className={`theme-toggle-button ${currentThemeId === 'dark-purple' ? 'active' : ''}`}
          onClick={() => setCurrentThemeId(currentThemeId === 'dark-purple' ? 'dark-blue' : 'dark-purple')}
          title="Toggle color theme"
        >
          <div className="theme-toggle-circle" />
        </div>
      </div>
    </div>
  );
};

export default App;
