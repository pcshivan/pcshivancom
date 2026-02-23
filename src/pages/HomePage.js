import React from 'react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '50M+',  label: 'Streams Worldwide',  icon: 'fa-headphones' },
  { value: '200+',  label: 'Compositions',        icon: 'fa-music' },
  { value: '40+',   label: 'Countries Reached',   icon: 'fa-globe' },
  { value: '15+',   label: 'Industry Awards',     icon: 'fa-trophy' },
];

const PLATFORMS = [
  { name: 'Spotify',    icon: 'fab fa-spotify',    href: 'https://open.spotify.com/artist/pcshivanofficial', bg: 'rgba(29,185,84,0.15)',  border: 'rgba(29,185,84,0.45)',  color: '#1DB954',  hoverBg: 'rgba(29,185,84,0.28)'  },
  { name: 'Apple Music',icon: 'fab fa-apple',      href: '#',                                                 bg: 'rgba(252,70,107,0.12)', border: 'rgba(252,70,107,0.4)',  color: '#fc466b',  hoverBg: 'rgba(252,70,107,0.24)' },
  { name: 'YouTube',    icon: 'fab fa-youtube',    href: '#',                                                 bg: 'rgba(255,0,0,0.12)',    border: 'rgba(255,0,0,0.35)',    color: '#ff4444',  hoverBg: 'rgba(255,0,0,0.22)'    },
  { name: 'SoundCloud', icon: 'fab fa-soundcloud', href: '#',                                                 bg: 'rgba(255,90,0,0.12)',   border: 'rgba(255,90,0,0.35)',   color: '#ff5a00',  hoverBg: 'rgba(255,90,0,0.22)'   },
];

const HomePage = ({ scrollToSection }) => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #030712 0%, #0d0520 40%, #050d1a 70%, #030712 100%)' }}
  >
    {/* Hero background image */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('./images/hero-background.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(2px) saturate(1.3)', opacity: 0.35,
      }}
    />
    {/* Dark overlay */}
    <div
      className="absolute inset-0 animate-pulse-subtle"
      style={{ background: 'linear-gradient(135deg, rgba(3,7,18,0.88) 0%, rgba(76,29,149,0.5) 40%, rgba(17,24,39,0.82) 70%, rgba(3,7,18,0.92) 100%)' }}
    />

    {/* Ambient orbs */}
    <div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)', top: '-100px', left: '-150px', filter: 'blur(60px)' }} />
    <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', bottom: '-100px', right: '-100px', filter: 'blur(60px)' }} />

    {/* Award badges */}
    <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-8 px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <span className="award-badge"><i className="fas fa-star" style={{ fontSize: '0.65rem' }}></i> Award-Winning Composer</span>
      <span className="award-badge"><i className="fas fa-film" style={{ fontSize: '0.65rem' }}></i> Film &amp; TV Scorer</span>
      <span className="award-badge"><i className="fas fa-compact-disc" style={{ fontSize: '0.65rem' }}></i> Multi-Genre Artist</span>
    </div>

    {/* Hero text block */}
    <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-4 animate-fade-in-up">

      {/* Name */}
      <h1 className="font-cinzel font-black leading-none tracking-wider mb-4" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
        <span style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #e0d7ff 30%, #a855f7 60%, #ffffff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.4))', display: 'block',
        }}>
          PC SHIVAN
        </span>
      </h1>

      {/* Accent divider */}
      <div className="section-divider animate-fade-in" style={{ animationDelay: '0.4s' }} />

      {/* Tagline */}
      <p className="font-raleway text-xl md:text-2xl lg:text-3xl font-light mb-4 mt-6 animate-fade-in-up-slow"
        style={{ color: 'rgba(255,255,255,0.82)', animationDelay: '0.5s', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Music Composer &nbsp;·&nbsp; Artist &nbsp;·&nbsp; Visionary
      </p>

      {/* Sub-tagline */}
      <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 font-inter leading-relaxed animate-fade-in-up-slow"
        style={{ color: 'rgba(255,255,255,0.55)', animationDelay: '0.7s' }}>
        Crafting immersive sonic universes — where cinematic orchestration meets cutting-edge
        electronic innovation. Trusted by directors, brands and audiences across 40+ countries.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up-slow" style={{ animationDelay: '0.9s' }}>
        <button onClick={() => scrollToSection('/music')} className="cta-primary" style={{ fontSize: '1rem' }}>
          <i className="fas fa-play-circle"></i> Explore My Music
        </button>
        <Link to="/contact" className="cta-secondary" style={{ fontSize: '1rem' }}>
          <i className="fas fa-handshake"></i> Work With Me
        </Link>
      </div>

      {/* Streaming platform badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in-up-slow" style={{ animationDelay: '1.1s' }}>
        <p className="w-full text-center text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
          Available on
        </p>
        {PLATFORMS.map((p) => (
          <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
            className="streaming-badge"
            style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}
            onMouseEnter={(e) => { e.currentTarget.style.background = p.hoverBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = p.bg; }}
          >
            <i className={`${p.icon}`} style={{ fontSize: '1rem' }}></i>
            <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.875rem' }}>{p.name}</span>
          </a>
        ))}
      </div>
    </div>

    {/* Stats bar */}
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-10 animate-fade-in-up-slow" style={{ animationDelay: '1.3s' }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stat-card rounded-2xl p-5 text-center" style={{ animationDelay: `${1.3 + i * 0.1}s` }}>
            <i className={`fas ${stat.icon} text-purple-400 text-xl mb-2 block`}></i>
            <div className="font-cinzel font-black text-2xl md:text-3xl mb-1"
              style={{ background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {stat.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 animate-float" style={{ transform: 'translateX(-50%)', zIndex: 10 }}>
      <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.28)' }}>Scroll</span>
      <div className="w-px h-10 rounded-full" style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0.6), transparent)' }}></div>
    </div>
  </section>
);

export default HomePage;
