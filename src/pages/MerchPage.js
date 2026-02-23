import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';

const MERCH_ITEMS = [
  {
    id: 'm1',
    name: 'PC Shivan Signature Tee',
    price: '$29.99',
    badge: 'Bestseller',
    badgeColor: '#22d3ee',
    imageUrl: './images/merch/t-shirt-design.png',
    buyLink: '#',
    desc: 'Premium quality cotton tee featuring the iconic PC Shivan signature graphic.',
    stock: 'In Stock',
  },
  {
    id: 'm2',
    name: 'Limited Edition Hoodie',
    price: '$59.99',
    badge: 'Limited',
    badgeColor: '#f59e0b',
    imageUrl: './images/merch/signature-hoodie-front.jpg',
    buyLink: '#',
    desc: 'Heavyweight, ultra-soft hoodie with embroidered logo. Only 200 made.',
    stock: 'Only 47 left',
  },
  {
    id: 'm3',
    name: 'Collector\'s Vinyl',
    price: '$39.99',
    badge: 'Exclusive',
    badgeColor: '#a855f7',
    imageUrl: './images/merch/limited-edition-vinyl.jpg',
    buyLink: '#',
    desc: 'Hand-numbered limited edition vinyl pressing of the debut album. Collector\'s item.',
    stock: 'Only 23 left',
  },
];

const MerchCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(139,92,246,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        {imgError ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a0533, #0d1a3a)' }}
          >
            <i className="fas fa-tshirt text-purple-400/30" style={{ fontSize: '4rem' }}></i>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            style={{ transition: 'transform 0.5s ease' }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        )}
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
        />
        {/* Badge */}
        <span
          className="absolute top-4 left-4 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: `${item.badgeColor}22`,
            border: `1px solid ${item.badgeColor}55`,
            color: item.badgeColor,
          }}
        >
          {item.badge}
        </span>
        {/* Stock */}
        <span
          className="absolute bottom-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            color: item.stock === 'In Stock' ? '#4ade80' : '#f59e0b',
          }}
        >
          <i className={`fas ${item.stock === 'In Stock' ? 'fa-check-circle' : 'fa-fire'} mr-1`}></i>
          {item.stock}
        </span>
      </div>

      {/* Info */}
      <div className="p-6 text-center">
        <h3 className="font-cinzel font-bold text-xl text-white mb-2">{item.name}</h3>
        <p className="text-white/50 text-sm mb-4 font-inter">{item.desc}</p>
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-cinzel font-black text-2xl"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            {item.price}
          </span>
          <span className="text-white/35 text-xs font-semibold line-through">
            {/* Original price hint */}
          </span>
        </div>
        <a
          href={item.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center font-bold py-3 px-6 rounded-xl text-white text-sm transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            border: '1px solid rgba(139,92,246,0.4)',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.6)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <i className="fas fa-shopping-bag mr-2"></i>Shop Now
        </a>
      </div>
    </div>
  );
};

const MerchPage = ({ themeClasses }) => (
  <SectionWrapper id="merch" title="Official Merch" themeClasses={themeClasses}>

    {/* Header */}
    <div className="text-center mb-14 animate-fade-in-up-slow">
      <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4 font-inter leading-relaxed">
        Wear the music. Own a piece of the PC Shivan universe with exclusive, limited-edition
        merchandise designed for true fans.
      </p>
      <span className="award-badge">
        <i className="fas fa-fire text-xs"></i> Limited Items — Order Before They Sell Out
      </span>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
      {MERCH_ITEMS.map((item, i) => (
        <div key={item.id} className="animate-fade-in-item" style={{ animationDelay: `${i * 0.15}s` }}>
          <MerchCard item={item} />
        </div>
      ))}
    </div>

    {/* Custom orders banner */}
    <div
      className="rounded-3xl p-8 md:p-10 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))',
        border: '1px solid rgba(139,92,246,0.2)',
      }}
    >
      <i className="fas fa-paint-brush text-purple-400 text-2xl mb-4 block"></i>
      <h3 className="font-cinzel font-bold text-xl text-white mb-2">Custom / Wholesale Orders</h3>
      <p className="text-white/55 text-sm mb-5 max-w-lg mx-auto font-inter">
        Need custom quantities or exclusive designs for events? Get in touch for bespoke merchandise packages.
      </p>
      <a
        href="mailto:contact@pcshivan.com?subject=Merch%20Inquiry"
        className="cta-secondary"
        style={{ padding: '10px 24px', fontSize: '0.9rem' }}
      >
        <i className="fas fa-envelope"></i> Contact for Custom Orders
      </a>
    </div>

  </SectionWrapper>
);

export default MerchPage;
