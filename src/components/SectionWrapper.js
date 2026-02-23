import React from 'react';

const SectionWrapper = ({ id, title, children, themeClasses }) => (
  <section
    id={id}
    className="relative py-24 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col justify-center items-center overflow-hidden"
    style={{
      background: 'linear-gradient(160deg, #030712 0%, #0d0520 35%, #050d1a 65%, #030712 100%)',
    }}
  >
    {/* Ambient glow orbs */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        top: '-200px', right: '-200px',
        filter: 'blur(80px)',
      }}
    />
    <div
      className="absolute pointer-events-none"
      style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
        bottom: '-100px', left: '-100px',
        filter: 'blur(80px)',
      }}
    />

    {/* Subtle dot grid pattern */}
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    {/* Section title */}
    <div className="relative z-10 text-center mb-12 animate-fade-in-up-slow">
      <p
        className="text-xs font-black uppercase tracking-widest mb-3"
        style={{ color: 'rgba(168,85,247,0.7)' }}
      >
        PC Shivan
      </p>
      <h2
        className="font-cinzel font-black leading-tight"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0d7ff 40%, #a855f7 80%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.3))',
        }}
      >
        {title}
      </h2>
      {/* Accent line */}
      <div className="section-divider mt-4" />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl w-full">
      {children}
    </div>
  </section>
);

export default SectionWrapper;
