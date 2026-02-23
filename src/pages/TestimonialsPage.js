import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import MessageBox from '../components/MessageBox';
import { collection, addDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';

/* global __app_id */

const CARD_ACCENTS = [
  { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', quote: 'rgba(168,85,247,0.35)' },
  { bg: 'rgba(79,70,229,0.12)',  border: 'rgba(79,70,229,0.3)',  quote: 'rgba(79,70,229,0.35)'  },
  { bg: 'rgba(236,72,153,0.10)', border: 'rgba(236,72,153,0.25)', quote: 'rgba(236,72,153,0.35)' },
  { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)',  quote: 'rgba(34,211,238,0.35)' },
  { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)',  quote: 'rgba(245,158,11,0.35)' },
];

const StarRating = ({ count = 5 }) => (
  <div className="flex gap-1 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <i key={i} className="fas fa-star" style={{ color: '#f59e0b', fontSize: '0.75rem' }}></i>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, index }) => {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  return (
    <div
      className="rounded-2xl p-6 relative animate-fade-in-item"
      style={{
        background: accent.bg,
        border: `1px solid ${accent.border}`,
        animationDelay: `${index * 0.12}s`,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${accent.border}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Quote icon */}
      <i
        className="fas fa-quote-left absolute top-4 right-5"
        style={{ fontSize: '2.2rem', color: accent.quote }}
      ></i>

      {/* Stars */}
      <StarRating />

      {/* Message */}
      <p className="text-white/75 text-base italic leading-relaxed mb-5 font-inter pr-8">
        "{testimonial.message}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar initials */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accent.border}80, ${accent.border}40)`,
            border: `1px solid ${accent.border}`,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div>
          <p className="text-white/85 font-semibold text-sm">{testimonial.name}</p>
          <p className="text-white/35 text-xs">
            {testimonial.timestamp
              ? new Date(testimonial.timestamp.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
              : 'Fan'}
          </p>
        </div>
        {/* Verified badge */}
        <i className="fas fa-check-circle ml-auto text-sm" style={{ color: '#4ade80', opacity: 0.7 }}></i>
      </div>
    </div>
  );
};

const TestimonialsPage = ({ userId, db, themeClasses }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(null);

  const currentAppId = typeof __app_id !== 'undefined'
    ? __app_id
    : (process.env.REACT_APP_APP_ID || 'default-app-id-deployed');

  useEffect(() => {
    if (!db) return;
    const ref = collection(db, `artifacts/${currentAppId}/public/data/testimonials`);
    const unsubscribe = onSnapshot(query(ref), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTestimonials(data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
    }, (err) => {
      console.error('Error fetching testimonials:', err);
    });
    return () => unsubscribe();
  }, [db, currentAppId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setShowSubmissionMessage({ type: 'error', message: 'Please fill in both your name and message.' });
      return;
    }
    if (!db) {
      setShowSubmissionMessage({ type: 'error', message: 'Database not available. Cannot submit testimonial.' });
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, `artifacts/${currentAppId}/public/data/testimonials`), {
        name: name.trim(),
        message: message.trim(),
        userId,
        timestamp: serverTimestamp(),
      });
      setName('');
      setMessage('');
      setShowSubmissionMessage({ type: 'success', message: 'Thank you! Your testimonial has been submitted.' });
    } catch (err) {
      console.error('Error adding testimonial:', err);
      setShowSubmissionMessage({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="testimonials" title="Fan Love" themeClasses={themeClasses}>

      {/* Header */}
      <div className="text-center mb-14 animate-fade-in-up-slow">
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4 font-inter leading-relaxed">
          The most meaningful reward is the impact my music has on people. Here's what
          fans and collaborators are saying.
        </p>
        {testimonials.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <StarRating count={5} />
            <span className="text-white/50 text-sm font-semibold">
              {testimonials.length} {testimonials.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
        )}
      </div>

      {/* Submit form */}
      <div
        className="max-w-2xl mx-auto mb-16 rounded-2xl p-7 md:p-9 animate-fade-in-up-slow"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))',
          border: '1px solid rgba(139,92,246,0.25)',
        }}
      >
        <h3 className="font-cinzel font-bold text-2xl text-white mb-1 text-center">
          Share Your Experience
        </h3>
        <p className="text-white/45 text-sm text-center mb-7 font-inter">
          Enjoyed PC Shivan's music? Let the world know.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white/60 text-sm font-semibold mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full p-4 rounded-xl text-white text-sm font-inter focus:outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div className="mb-7">
            <label className="block text-white/60 text-sm font-semibold mb-2">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Share your experience with PC Shivan's music..."
              required
              className="w-full p-4 rounded-xl text-white text-sm font-inter resize-y focus:outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-bold py-4 px-6 rounded-xl text-white text-base transition-all duration-300"
            style={{
              background: submitting
                ? 'rgba(139,92,246,0.4)'
                : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              boxShadow: submitting ? 'none' : '0 4px 24px rgba(124,58,237,0.45)',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.boxShadow = '0 8px 40px rgba(124,58,237,0.65)'; }}
            onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.45)'; }}
          >
            {submitting ? (
              <><i className="fas fa-spinner fa-spin mr-2"></i>Submitting...</>
            ) : (
              <><i className="fas fa-paper-plane mr-2"></i>Submit Testimonial</>
            )}
          </button>
        </form>
      </div>

      <MessageBox
        message={showSubmissionMessage?.message}
        type={showSubmissionMessage?.type}
        onClose={() => setShowSubmissionMessage(null)}
        themeClasses={themeClasses}
      />

      {/* Testimonials grid */}
      {testimonials.length === 0 ? (
        <div className="text-center py-16">
          <i className="fas fa-comments text-purple-400/30 text-5xl mb-4 block"></i>
          <p className="text-white/40 text-lg font-inter">
            No testimonials yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      )}

    </SectionWrapper>
  );
};

export default TestimonialsPage;
