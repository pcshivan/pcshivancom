import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';

const MUSIC_TRACKS = [
  {
    id: '1',
    title: 'Echoes of Tomorrow',
    artist: 'PC Shivan',
    genre: 'Electronic · Cinematic',
    year: '2024',
    imageUrl: './images/music/echoes-of-tomorrow-cover.jpg',
    spotifyEmbed: 'https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6?utm_source=generator',
    spotifyLink: 'https://open.spotify.com/artist/pcshivanofficial',
    buyLink: '#',
    featured: true,
    desc: 'A sweeping cinematic journey through time — layered orchestral textures woven with pulsating electronic rhythms.',
    tags: ['Cinematic', 'Electronic', 'Atmospheric'],
  },
  {
    id: '2',
    title: 'Urban Pulse',
    artist: 'PC Shivan',
    genre: 'Hip Hop · Fusion',
    year: '2024',
    imageUrl: './images/music/urban-pulse-cover.png',
    spotifyEmbed: 'https://open.spotify.com/embed/track/4WqB9o4u1z0r9Y1D2B9Y1D?utm_source=generator',
    spotifyLink: 'https://open.spotify.com/artist/pcshivanofficial',
    buyLink: '#',
    featured: false,
    desc: 'Raw energy meets refined production — a genre-bending fusion of urban rhythms and sonic experimentation.',
    tags: ['Hip Hop', 'Fusion', 'Energetic'],
  },
  {
    id: '3',
    title: 'Serene Depths',
    artist: 'PC Shivan',
    genre: 'Ambient · Orchestral',
    year: '2023',
    imageUrl: './images/music/serene-depths-cover.jpg',
    spotifyEmbed: 'https://open.spotify.com/embed/track/2LhB9o4u1z0r9Y1D2B9Y1D?utm_source=generator',
    spotifyLink: 'https://open.spotify.com/artist/pcshivanofficial',
    buyLink: '#',
    featured: false,
    desc: 'Dive into a tranquil sonic landscape where orchestral strings dissolve into ambient waves of pure emotion.',
    tags: ['Ambient', 'Orchestral', 'Meditative'],
  },
];

const PLATFORMS = [
  { name: 'Spotify', icon: 'fab fa-spotify', href: 'https://open.spotify.com/artist/pcshivanofficial', color: '#1DB954' },
  { name: 'Apple Music', icon: 'fab fa-apple', href: '#', color: '#fc466b' },
  { name: 'YouTube', icon: 'fab fa-youtube', href: '#', color: '#ff4444' },
  { name: 'SoundCloud', icon: 'fab fa-soundcloud', href: '#', color: '#ff5a00' },
];

const TrackCard = ({ track, themeClasses, featured }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="music-card rounded-2xl overflow-hidden"
      style={{
        background: featured
          ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.12))'
          : 'rgba(255,255,255,0.04)',
        border: featured
          ? '1px solid rgba(139,92,246,0.45)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: featured ? '0 8px 40px rgba(124,58,237,0.25)' : 'none',
      }}
    >
      {/* Album art */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        {imgError ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1a0533, #0d1a3a)',
            }}
          >
            <i className="fas fa-music text-purple-400/40" style={{ fontSize: '4rem' }}></i>
          </div>
        ) : (
          <img
            src={track.imageUrl}
            alt={`${track.title} – PC Shivan`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ transition: 'transform 0.5s ease' }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
        />
        {/* Year badge */}
        <span
          className="absolute top-4 right-4 text-xs font-bold text-white/70 px-3 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {track.year}
        </span>
        {featured && (
          <span
            className="absolute top-4 left-4 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(251,191,36,0.2))',
              border: '1px solid rgba(245,158,11,0.5)',
              color: '#fbbf24',
            }}
          >
            <i className="fas fa-star mr-1 text-xs"></i>Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {track.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#c4b5fd',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="font-cinzel font-bold text-xl md:text-2xl text-white mb-1"
        >
          {track.title}
        </h3>
        <p className="text-purple-300/80 text-sm font-semibold mb-3">{track.genre}</p>
        <p className="text-white/50 text-sm leading-relaxed mb-5 font-inter">{track.desc}</p>

        {/* Spotify embed */}
        <div className="mb-5 rounded-xl overflow-hidden">
          <iframe
            style={{ borderRadius: '12px', display: 'block' }}
            src={track.spotifyEmbed}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Listen to ${track.title} by PC Shivan on Spotify`}
          ></iframe>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={track.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-spotify flex-1 text-center justify-center"
            style={{ padding: '10px 16px', fontSize: '0.88rem', borderRadius: '12px' }}
          >
            <i className="fab fa-spotify"></i> Listen
          </a>
          <a
            href={track.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center flex items-center justify-center gap-2 font-bold text-sm text-white/80 rounded-xl transition-all duration-300"
            style={{
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            <i className="fas fa-shopping-cart"></i> Buy
          </a>
        </div>
      </div>
    </div>
  );
};

const MusicPage = ({ themeClasses }) => (
  <SectionWrapper id="music" title="My Music" themeClasses={themeClasses}>

    {/* Header */}
    <div className="text-center mb-14 animate-fade-in-up-slow">
      <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 font-inter leading-relaxed">
        From cinematic film scores to genre-defying originals — every composition is a
        world unto itself. Explore, stream, and own your favorites.
      </p>

      {/* Platform links */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="streaming-badge"
            style={{
              background: `${p.color}18`,
              border: `1px solid ${p.color}55`,
              color: p.color,
              padding: '10px 20px',
            }}
          >
            <i className={`${p.icon} text-base`}></i>
            <span className="text-white/80 text-sm font-semibold">{p.name}</span>
          </a>
        ))}
      </div>
    </div>

    {/* Tracks grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
      {MUSIC_TRACKS.map((track, index) => (
        <div
          key={track.id}
          className="animate-fade-in-item"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <TrackCard track={track} themeClasses={themeClasses} featured={track.featured} />
        </div>
      ))}
    </div>

    {/* Licensing CTA banner */}
    <div
      className="rounded-3xl p-8 md:p-12 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))',
        border: '1px solid rgba(139,92,246,0.25)',
      }}
    >
      <i className="fas fa-film text-purple-400 text-3xl mb-4 block"></i>
      <h3 className="font-cinzel font-bold text-2xl md:text-3xl text-white mb-3">
        Need Music for Your Project?
      </h3>
      <p className="text-white/60 text-base mb-6 max-w-xl mx-auto font-inter">
        Film, TV, advertising, games, or brand content — PC Shivan creates bespoke
        compositions and offers flexible licensing solutions.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="mailto:contact@pcshivan.com?subject=Music%20Licensing%20Inquiry"
          className="cta-primary"
          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
        >
          <i className="fas fa-envelope"></i> Licensing Inquiry
        </a>
        <a
          href="https://open.spotify.com/artist/pcshivanofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-spotify"
          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
        >
          <i className="fab fa-spotify"></i> Full Discography
        </a>
      </div>
    </div>

  </SectionWrapper>
);

export default MusicPage;
