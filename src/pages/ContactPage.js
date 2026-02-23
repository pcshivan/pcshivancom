import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const CONTACT_OPTIONS = [
  {
    type: 'general',
    icon: 'fa-envelope',
    title: 'General Inquiry',
    subtitle: 'Fans, Media & Press',
    desc: 'Questions, press interviews, media features, fan mail, or anything on your mind. I personally read every message.',
    tags: ['Fan Mail', 'Press', 'Media', 'General'],
    cta: 'Send a Message',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
  },
  {
    type: 'producer-director',
    icon: 'fa-microphone-alt',
    title: 'Collaboration',
    subtitle: 'Producers & Directors',
    desc: 'Original scoring, music supervision, co-production, and creative partnerships for film, TV, ads, and digital content.',
    tags: ['Film Score', 'TV', 'Ads', 'Co-Production'],
    cta: 'Discuss Collaboration',
    accent: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
  },
  {
    type: 'corporate',
    icon: 'fa-building',
    title: 'Corporate & Licensing',
    subtitle: 'Brands & Businesses',
    desc: 'Music licensing for commercials, brand campaigns, product launches, corporate videos, and sync opportunities.',
    tags: ['Licensing', 'Brand Campaigns', 'Sync', 'Commercial'],
    cta: 'Get a Quote',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.3)',
  },
];

const CONTACT_INFO = [
  { icon: 'fa-envelope', label: 'Email', value: 'contact@pcshivan.com', href: 'mailto:contact@pcshivan.com' },
  { icon: 'fab fa-instagram', label: 'Instagram', value: '@pcshivanofficial', href: 'https://www.instagram.com/pcshivanofficial' },
  { icon: 'fab fa-spotify', label: 'Spotify', value: 'pcshivanofficial', href: 'https://open.spotify.com/artist/pcshivanofficial' },
];

const ContactPage = ({ openContactModal, themeClasses }) => (
  <SectionWrapper id="contact" title="Contact Me" themeClasses={themeClasses}>

    {/* Header */}
    <div className="text-center mb-14 animate-fade-in-up-slow">
      <p className="text-white/60 text-lg max-w-2xl mx-auto font-inter leading-relaxed">
        Whether you're a devoted fan, a visionary director, or a global brand — I'd love to
        hear from you. Select the most relevant category below.
      </p>
    </div>

    {/* Contact option cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {CONTACT_OPTIONS.map((opt, i) => (
        <div
          key={opt.type}
          className="rounded-2xl p-7 flex flex-col animate-fade-in-item cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${opt.accent}12, ${opt.accent}07)`,
            border: `1px solid ${opt.accent}30`,
            animationDelay: `${i * 0.12}s`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${opt.accent}70`;
            e.currentTarget.style.boxShadow = `0 12px 40px ${opt.glow}`;
            e.currentTarget.style.transform = 'translateY(-6px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${opt.accent}30`;
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={() => openContactModal(opt.type)}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: `${opt.accent}20`, border: `1px solid ${opt.accent}30` }}
          >
            <i className={`fas ${opt.icon} text-2xl`} style={{ color: opt.accent }}></i>
          </div>

          {/* Labels */}
          <p
            className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: opt.accent }}
          >
            {opt.subtitle}
          </p>
          <h3 className="font-cinzel font-bold text-xl text-white mb-3">{opt.title}</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1 font-inter">{opt.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {opt.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: `${opt.accent}15`,
                  border: `1px solid ${opt.accent}25`,
                  color: `${opt.accent}cc`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="w-full font-bold py-3 px-6 rounded-xl text-sm text-white transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${opt.accent}55, ${opt.accent}35)`,
              border: `1px solid ${opt.accent}50`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${opt.accent}80, ${opt.accent}55)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${opt.accent}55, ${opt.accent}35)`; }}
          >
            <i className="fas fa-arrow-right mr-2"></i>{opt.cta}
          </button>
        </div>
      ))}
    </div>

    {/* Quick contact info bar */}
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <p className="text-center text-white/40 text-xs font-bold uppercase tracking-widest mb-6">
        Or Reach Me Directly
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {CONTACT_INFO.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.12)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <i className={`${c.icon.startsWith('fab') ? c.icon : `fas ${c.icon}`} text-purple-400`}></i>
            <div>
              <p className="text-white/40 text-xs font-semibold">{c.label}</p>
              <p className="text-white/80 text-sm font-semibold">{c.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* Response time promise */}
    <div className="text-center mt-10">
      <p className="text-white/35 text-sm font-inter">
        <i className="fas fa-clock mr-2 text-purple-400/50"></i>
        Typical response time: <span className="text-purple-300/70 font-semibold">24–48 hours</span>
      </p>
    </div>

  </SectionWrapper>
);

export default ContactPage;
