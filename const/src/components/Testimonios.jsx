import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Testimonios = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Mapeamos los testimonios desde i18n
  const reviews = [
    {
      name: t('testimonials.items.0.name'),
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      text: t('testimonials.items.0.text'),
      project: t('testimonials.items.0.project')
    },
    {
      name: t('testimonials.items.1.name'),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
      text: t('testimonials.items.1.text'),
      project: t('testimonials.items.1.project')
    },
    {
      name: t('testimonials.items.2.name'),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      text: t('testimonials.items.2.text'),
      project: t('testimonials.items.2.project')
    },
    {
      name: t('testimonials.items.3.name'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      text: t('testimonials.items.3.text'),
      project: t('testimonials.items.3.project')
    }
  ];

  return (
    <section id="testimonios" style={{...sectionStyle, backgroundColor: 'var(--bg-secondary)'}}>
      <div style={grainOverlay} />
      
      <div style={container}>
        <div style={headerStyle}>
          <h2 style={{...titleStyle, color: 'var(--text-main)'}}>
            {t('testimonials.title')} <span style={{...italicStyle, color: 'var(--accent)'}}>{t('testimonials.subtitle')}</span>
          </h2>
        </div>

        <div style={gridStyle}>
          {reviews.map((rev, index) => (
            <article 
              key={index} 
              style={{
                ...testimonialCard,
                backgroundColor: 'var(--card-bg)',
                transform: hoveredIndex === index ? 'translateY(-12px)' : 'translateY(0)',
                boxShadow: hoveredIndex === index ? '0 30px 60px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.02)',
                borderColor: hoveredIndex === index ? 'var(--accent)' : 'var(--border-color)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{
                ...quoteIcon,
                color: hoveredIndex === index ? 'var(--accent-muted)' : 'var(--border-color)'
              }}>“</div>
              
              <div style={{
                ...starsRow,
                color: hoveredIndex === index ? 'var(--accent)' : 'var(--accent-muted)'
              }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{
                    ...starStyle,
                    textShadow: hoveredIndex === index ? '0 0 10px var(--accent-alpha)' : 'none'
                  }}>★</span>
                ))}
              </div>

              <p style={{...commentStyle, color: 'var(--text-muted)'}}>{rev.text}</p>
              
              <div style={footerCard}>
                <div style={{
                  ...lineStyle,
                  width: hoveredIndex === index ? '100%' : '40px',
                  backgroundColor: hoveredIndex === index ? 'var(--accent)' : 'var(--border-color)'
                }} />
                <div style={authorWrapper}>
                  <div style={infoWrapper}>
                    <h4 style={{
                      ...nameStyle,
                      color: hoveredIndex === index ? 'var(--accent)' : 'var(--text-main)'
                    }}>{rev.name}</h4>
                    <span style={{...projectStyle, color: 'var(--text-muted)'}}>{rev.project}</span>
                  </div>
                  
                  <div style={{
                    ...avatarSubtleWrapper,
                    borderColor: 'var(--card-bg)',
                    backgroundColor: 'var(--card-bg)',
                    transform: hoveredIndex === index ? 'translateY(-15px) rotate(3deg) scale(1.1)' : 'translateY(0) rotate(0) scale(1)',
                    boxShadow: hoveredIndex === index ? '0 15px 30px rgba(0,0,0,0.3)' : '0 8px 20px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src={rev.avatar} 
                      alt={rev.name} 
                      style={avatarImg} 
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ESTILOS ADAPTADOS ---
const sectionStyle = { position: 'relative', padding: '120px 8%', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.5s ease' };
const grainOverlay = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")', opacity: 0.1, pointerEvents: 'none', zIndex: 1 };
const container = { position: 'relative', zIndex: 2 };
const headerStyle = { marginBottom: '80px', textAlign: 'center' };
const titleStyle = { fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' };
const italicStyle = { fontStyle: 'italic', fontWeight: '300' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px 30px' };
const testimonialCard = { padding: '40px 40px 20px 40px', borderRadius: '24px', border: '1px solid', position: 'relative', display: 'flex', flexDirection: 'column', transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)', cursor: 'default' };
const quoteIcon = { position: 'absolute', top: '20px', left: '20px', fontSize: '4rem', fontFamily: 'serif', transition: 'all 0.4s ease' };
const starsRow = { marginBottom: '20px', fontSize: '0.8rem', transition: 'all 0.4s ease' };
const starStyle = { marginRight: '2px', transition: 'all 0.4s ease' };
const commentStyle = { fontSize: '1.05rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '30px', zIndex: 1 };
const footerCard = { marginTop: 'auto' };
const lineStyle = { height: '2px', transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)', marginBottom: '20px' };
const authorWrapper = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' };
const infoWrapper = { display: 'flex', flexDirection: 'column', paddingBottom: '15px' };
const avatarSubtleWrapper = { width: '100px', height: '100px', borderRadius: '20px', overflow: 'hidden', marginBottom: '-25px', border: '4px solid', zIndex: 5, transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)' };
const avatarImg = { width: '100%', height: '100%', objectFit: 'cover' };
const nameStyle = { fontSize: '1rem', fontWeight: '800', margin: '0', textTransform: 'uppercase', transition: 'all 0.4s ease' };
const projectStyle = { fontSize: '0.75rem', fontWeight: '600', marginTop: '3px' };

export default Testimonios;