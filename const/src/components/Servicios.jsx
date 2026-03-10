import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronDown } from 'lucide-react';

const Servicios = () => {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const serviceIds = ["res", "com", "ing", "ind", "rem", "dir", "urb", "sus"];
  
  const servicios = serviceIds.map((id) => ({
    id,
    title: t(`services_section.items.${id}.title`),
    tag: t(`services_section.items.${id}.tag`),
    desc: t(`services_section.items.${id}.desc`),
    areas: t(`services_section.items.${id}.areas`, { returnObjects: true }) || [],
    accent: getAccentColor(id),
    bg: getBackgroundImage(id)
  }));

  return (
    <section id="servicios" ref={containerRef} style={sectionStyle} className="servicios-container">
      {/* 1. LUZ DIFUSA DE FONDO */}
      <div className="spotlight" style={{
        ...spotlightOverlay,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 160, 89, 0.08), transparent 80%)`,
      }} />

      {/* 2. GRID TÉCNICO */}
      <div className="blueprint" style={{
        ...blueprintGrid,
        maskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 35%, rgba(0,0,0,0.1) 100%)`,
        WebkitMaskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 35%, rgba(0,0,0,0.1) 100%)`
      }} />

      <div style={contentContainer}>
        <div style={headerStyle}>
          <span style={capStyle}>{t('services_section.tag')}</span>
          <h2 style={titleStyle} className="main-title">
            {t('services_section.title1')} <span style={italicStyle}>{t('services_section.title2')}</span>
          </h2>
        </div>

        <div style={listContainer}>
          {servicios.map((s) => (
            <ServiceRow 
              key={s.id} 
              s={s} 
              isHovered={hoveredId === s.id}
              onMouseEnter={() => window.innerWidth > 1024 && setHoveredId(s.id)}
              onMouseLeave={() => window.innerWidth > 1024 && setHoveredId(null)}
              onClick={() => window.innerWidth <= 1024 && setHoveredId(hoveredId === s.id ? null : s.id)}
            />
          ))}
        </div>
      </div>

      {/* CSS PARA MOBILE SIN TOCAR EL ESTILO DE ESCRITORIO */}
      <style>{`
        @media (max-width: 1024px) {
          .servicios-container { padding: 60px 5% !important; }
          .main-title { font-size: 2.5rem !important; }
          .blueprint, .spotlight { opacity: 0.3; }
          
          .service-row-animated {
            height: auto !important;
            padding: 20px !important;
          }
          
          .main-content-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .service-title-text {
             min-width: unset !important;
             font-size: 1.4rem !important;
             transform: none !important;
          }

          .info-wrapper-mobile {
            padding-left: 0 !important;
            border-left: none !important;
            margin-left: 0 !important;
            margin-top: 10px;
          }
          
          .chevron-icon {
            position: absolute;
            right: 20px;
            top: 25px;
          }
        }
      `}</style>
    </section>
  );
};

const ServiceRow = ({ s, isHovered, onMouseEnter, onMouseLeave, onClick }) => {
  const rowSpring = useSpring({
    height: isHovered ? (window.innerWidth <= 1024 ? 'auto' : '320px') : '100px',
    backgroundColor: isHovered ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.02)',
    borderColor: isHovered ? s.accent : 'rgba(255, 255, 255, 0.08)',
    boxShadow: isHovered 
      ? `0 20px 50px rgba(0,0,0,0.5), 0 0 15px ${s.accent}22` 
      : `0 0 0px rgba(0,0,0,0)`,
    config: { tension: 250, friction: 25 }
  });

  return (
    <animated.div 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ ...rowStyle, ...rowSpring }}
      className="service-row-animated"
    >
      <div style={{ 
        ...bgImageStyle, 
        backgroundImage: `url(${s.bg})`,
        opacity: isHovered ? 0.25 : 0,
        transform: `scale(${isHovered ? 1.05 : 1.2})`
      }} />

      <div style={innerContainer}>
        <div style={mainContent} className="main-content-flex">
          <div style={{ 
            ...tagCapsule, 
            backgroundColor: isHovered ? s.accent : 'transparent',
            borderColor: isHovered ? s.accent : 'rgba(255,255,255,0.15)',
            color: isHovered ? '#000' : '#888'
          }}>
            {s.tag}
          </div>

          <h3 style={{ 
            ...serviceTitle, 
            color: isHovered ? '#fff' : 'rgba(255,255,255,0.5)',
            transform: window.innerWidth > 1024 ? `translateX(${isHovered ? '10px' : '0px'})` : 'none'
          }} className="service-title-text">
            {s.title}
          </h3>
          
          <div style={{ 
            opacity: isHovered ? 1 : 0, 
            visibility: isHovered ? 'visible' : 'hidden',
            maxHeight: isHovered ? '1000px' : '0px',
            transform: `translate3d(0, ${isHovered ? 0 : 20}px, 0)`,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            flex: 1
          }}>
            <div style={infoWrapper} className="info-wrapper-mobile">
              <p style={serviceDesc}>{s.desc}</p>
              <div style={areasGrid}>
                {Array.isArray(s.areas) && s.areas.map((area, i) => (
                  <span key={i} style={{ ...areaPill, borderColor: s.accent + '33' }}>
                    <span style={{ ...dot, backgroundColor: s.accent }} /> {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="chevron-icon">
            {isHovered ? 
              <ChevronDown color={s.accent} size={20} /> : 
              <ChevronRight color="rgba(255,255,255,0.2)" size={24} style={{ marginLeft: 'auto' }} />
            }
          </div>
        </div>
      </div>
    </animated.div>
  );
};

// --- HELPERS (IDÉNTICOS) ---
const getAccentColor = (id) => {
  const colors = { res: "#c5a059", com: "#4e7ab5", ing: "#e67e22", ind: "#c54b4b", rem: "#9b59b6", dir: "#f1c40f", urb: "#1abc9c", sus: "#27ae60" };
  return colors[id] || "#c5a059";
};
const getBackgroundImage = (id) => {
  const bgs = {
    res: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    com: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    ing: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200",
    ind: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200",
    rem: "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=1200",
    dir: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200",
    urb: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200",
    sus: "https://images.unsplash.com/photo-1473300181477-52560911531a?q=80&w=1200"
  };
  return bgs[id];
};

// --- ESTILOS ORIGINALES ---
const sectionStyle = { position: 'relative', padding: '120px 6%', backgroundColor: '#050505', overflow: 'hidden' };
const spotlightOverlay = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' };
const blueprintGrid = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '50px 50px', zIndex: 2, pointerEvents: 'none' };
const contentContainer = { position: 'relative', zIndex: 10 };
const headerStyle = { marginBottom: '60px' };
const capStyle = { fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '6px', color: '#c5a059' };
const titleStyle = { fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', margin: '10px 0', color: '#fff', letterSpacing: '-2px' };
const italicStyle = { fontStyle: 'italic', fontWeight: '200', color: '#c5a059' };
const listContainer = { display: 'flex', flexDirection: 'column', gap: '12px' };
const rowStyle = { position: 'relative', cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 40px', border: '1px solid', borderRadius: '16px', transition: 'border-color 0.3s ease' };
const bgImageStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0, transition: 'all 0.8s ease' };
const innerContainer = { zIndex: 2, width: '100%' };
const mainContent = { display: 'flex', alignItems: 'center', gap: '30px' };
const tagCapsule = { padding: '6px 18px', borderRadius: '50px', fontSize: '0.6rem', fontWeight: '900', textTransform: 'uppercase', border: '1px solid', minWidth: '110px', textAlign: 'center', transition: 'all 0.3s ease', letterSpacing: '1px' };
const serviceTitle = { fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', fontWeight: '800', margin: 0, minWidth: '350px', letterSpacing: '-0.5px', transition: 'all 0.4s ease' };
const infoWrapper = { paddingLeft: '40px', borderLeft: '1px solid rgba(197, 160, 89, 0.2)', marginLeft: '20px' };
const serviceDesc = { fontSize: '0.95rem', color: '#bbb', margin: '0 0 20px 0', maxWidth: '550px', lineHeight: '1.6' };
const areasGrid = { display: 'flex', flexWrap: 'wrap', gap: '8px' };
const areaPill = { padding: '4px 12px', borderRadius: '4px', border: '1px solid', fontSize: '0.7rem', color: '#eee', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)' };
const dot = { width: '4px', height: '4px', borderRadius: '50%' };

export default Servicios;