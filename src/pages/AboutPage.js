import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const ACHIEVEMENTS = [
  { icon: 'fa-film', title: 'Film & TV', desc: 'Scored original music for feature films, TV series, and award-winning short films across multiple genres.' },
  { icon: 'fa-compact-disc', title: 'Cross-Genre', desc: 'Mastery across Electronic, Cinematic, Orchestral, Hip Hop, Ambient, and World music — seamlessly fused.' },
  { icon: 'fa-microphone-alt', title: 'Studio Craft', desc: 'State-of-the-art production combining traditional instrumentation with cutting-edge digital synthesis.' },
  { icon: 'fa-handshake', title: 'Global Collabs', desc: 'Collaborated with international artists, directors, brands, and advertising agencies worldwide.' },
];

const PRESS_QUOTES = [
  { quote: 'A composer who redefines the boundaries of modern music — both technically brilliant and emotionally profound.', source: 'Music Industry Weekly' },
  { quote: 'PC Shivan\'s compositions are the kind that stay with you long after the last note fades.', source: 'SoundScape Review' },
];

const AboutPage = ({ themeClasses }) => (
  <SectionWrapper id="about" title="About PC Shivan" themeClasses={themeClasses}>

    {/* Bio + Photo */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20">

      {/* Portrait */}
      <div className="lg:col-span-2 flex justify-center animate-fade-in-left">
        <div className="relative">
          {/* Glowing ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #a855f7, #ec4899, #a855f7, #7c3aed)',
              padding: '4px',
              borderRadius: '9999px',
              animation: 'rotate-slow 8s linear infinite',
              filter: 'blur(2px)',
            }}
          />
          <img
            src="./images/pcshivan-portrait.jpg"
            alt="PC Shivan – Music Composer"
            className="relative rounded-full object-cover shadow-2xl"
            style={{
              width: '280px', height: '280px',
              border: '4px solid rgba(139,92,246,0.6)',
              filter: 'saturate(1.1) contrast(1.05)',
            }}
          />
          {/* Status badge */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              padding: '6px 20px', borderRadius: '9999px',
              fontSize: '0.78rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'white', boxShadow: '0 4px 20px rgba(124,58,237,0.6)',
            }}
          >
            <i className="fas fa-check-circle mr-2"></i>Official Artist
          </div>
        </div>
      </div>

      {/* Bio Text */}
      <div className="lg:col-span-3 animate-fade-in-right">
        {/* Award badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="award-badge"><i className="fas fa-trophy text-xs"></i> Award-Winning</span>
          <span className="award-badge"><i className="fas fa-globe text-xs"></i> International</span>
          <span className="award-badge"><i className="fas fa-star text-xs"></i> 50M+ Streams</span>
        </div>

        <h3
          className="font-cinzel font-black text-3xl md:text-4xl mb-6"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #c4b5fd)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          The Sonic Visionary
        </h3>

        <p className="text-white/75 text-lg leading-relaxed mb-5 font-inter">
          <span className="text-purple-300 font-semibold">PC Shivan</span> is a globally recognized music composer
          celebrated for seamlessly fusing traditional melodic depth with avant-garde electronic soundscapes.
          His compositions have moved audiences across 40+ countries — from intimate concert halls to
          blockbuster film premieres.
        </p>
        <p className="text-white/65 text-base leading-relaxed mb-5 font-inter">
          With an expansive repertoire spanning cinematic orchestration, pulse-driven electronic production,
          ambient world music, and high-energy hip hop fusion, Shivan's artistry is defined by its
          emotional authenticity and technical precision. Every track is a meticulously crafted journey.
        </p>
        <p className="text-white/65 text-base leading-relaxed mb-8 font-inter">
          Whether scoring a feature film, crafting a brand anthem, or releasing original albums, PC Shivan
          brings the same relentless pursuit of sonic excellence — compositions where creativity knows
          no bounds and every note tells a story.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:contact@pcshivan.com"
            className="cta-primary"
            style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          >
            <i className="fas fa-envelope"></i> Book / Collaborate
          </a>
          <a
            href="./press-kit.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
            style={{ padding: '10px 24px', fontSize: '0.9rem' }}
          >
            <i className="fas fa-download"></i> Press Kit
          </a>
        </div>
      </div>
    </div>

    {/* Achievement cards */}
    <div className="mb-20">
      <div className="text-center mb-10">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Expertise</p>
        <h3
          className="font-cinzel text-3xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          Crafted with Mastery
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={a.title}
            className="glass-card rounded-2xl p-6 text-center animate-fade-in-item"
            style={{ animationDelay: `${i * 0.12}s`, transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))' }}
            >
              <i className={`fas ${a.icon} text-purple-400 text-xl`}></i>
            </div>
            <h4 className="font-cinzel font-bold text-white text-lg mb-2">{a.title}</h4>
            <p className="text-white/55 text-sm leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Press quotes */}
    <div
      className="rounded-3xl p-8 md:p-12 mb-8"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(79,70,229,0.07))',
        border: '1px solid rgba(139,92,246,0.2)',
      }}
    >
      <div className="text-center mb-8">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">As Heard In</p>
      </div>

      {/* Press logos row */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {['Pitchfork', 'Billboard', 'NME', 'Rolling Stone', 'Variety', 'The Wire'].map((pub) => (
          <div key={pub} className="press-logo">{pub}</div>
        ))}
      </div>

      {/* Press quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRESS_QUOTES.map((pq, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6 relative"
          >
            <i
              className="fas fa-quote-left text-purple-400/40 absolute top-4 left-5"
              style={{ fontSize: '2.5rem' }}
            ></i>
            <p className="text-white/75 text-base italic leading-relaxed mt-8 mb-4 font-inter">
              "{pq.quote}"
            </p>
            <p className="text-purple-300 font-semibold text-sm">— {pq.source}</p>
          </div>
        ))}
      </div>
    </div>

  </SectionWrapper>
);

export default AboutPage;
