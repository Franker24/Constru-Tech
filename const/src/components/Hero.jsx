import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    { img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600", title: t('hero.slides.0.title'), desc: t('hero.slides.0.desc') },
    { img: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600", title: t('hero.slides.1.title'), desc: t('hero.slides.1.desc') },
    { img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600", title: t('hero.slides.2.title'), desc: t('hero.slides.2.desc') },
    { img: "https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1600", title: t('hero.slides.3.title'), desc: t('hero.slides.3.desc') }
  ];

  const stats = [
    { val: "20+", lab: t('hero.stats.experience'), icon: "🏗️" },
    { val: "150+", lab: t('hero.stats.projects'), icon: "🏠" },
    { val: "25k", lab: t('hero.stats.m2'), icon: "📐" },
    { val: "50+", lab: t('hero.stats.specialists'), icon: "👷" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setIndex((state) => (state + 1) % slides.length);
    }, 5000); // Reducido de 6s a 5s para mayor dinamismo
    return () => clearInterval(timer);
  }, [slides.length]);

  const fadeInSection = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 30 },
    delay: 300
  });

  return (
    <motion.section 
      id="hero" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ fontFamily: '"Inter", sans-serif', backgroundColor: 'var(--bg-primary)', width: '100%', overflowX: 'hidden' }}
    >
      
      <div style={grandSliderContainer} className="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Reducido de 1.5s a 0.8s (más fluido)
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "easeOut" }} // El zoom dura lo mismo que el slide
              style={{ 
                ...slideImageStyle, 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${slides[index].img})` 
              }} 
            />
            
            <div style={slideContentOverlay} className="slide-overlay-mobile">
              <div style={{ maxWidth: '1000px', padding: '0 50px' }} className="slide-content-mobile">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }} // Texto aparece más rápido
                  style={slideTitleStyle}
                  className="slide-title-mobile"
                >
                  {slides[index].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={slideDescStyle}
                  className="slide-desc-mobile"
                >
                  {slides[index].desc}
                </motion.p>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Link to="/proyectos" className="hero-button" style={btnMainStyle}>
                    {t('hero.button')}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={dotsWrapper}>
          {slides.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setIndex(i)} 
              className="dot-nav"
              style={{ 
                ...dotBase, 
                backgroundColor: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.3)', 
                width: i === index ? '50px' : '10px',
              }} 
            />
          ))}
        </div>
      </div>

      <animated.div style={{ ...fadeInSection, padding: '120px 8%', backgroundColor: 'var(--bg-secondary)' }} className="bottom-section-mobile">
        <div style={layoutGrid} className="layout-grid-mobile">
          <div style={{ flex: '1 1 450px' }} className="trayectoria-container-mobile">
            <span style={{...trayectoriaTag, color: 'var(--accent)'}}>{t('hero.about.tag')}</span>
            <h2 style={{...trayectoriaTitle, color: 'var(--text-main)'}} className="trayectoria-title-mobile">
              {t('hero.about.title1')} <br/> 
              <span style={{ color: 'var(--accent)' }}>{t('hero.about.title2')}</span>
            </h2>
            <p style={{...trayectoriaDescription, color: 'var(--text-muted)', borderLeft: '5px solid var(--accent)'}} className="trayectoria-desc-mobile">
              {t('hero.about.desc')}
            </p>
          </div>

          <div style={statsGrid} className="stats-grid-mobile">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card-hover stat-card-mobile" style={{...statCardStyle, backgroundColor: 'var(--card-bg)', borderTop: '5px solid var(--accent)'}}>
                <span className="stat-icon-mobile" style={{ fontSize: '2.5rem' }}>{stat.icon}</span>
                <h3 style={{...statValStyle, color: 'var(--text-main)'}} className="stat-val-mobile">{stat.val}</h3>
                <p style={{...statLabelStyle, color: 'var(--text-muted)'}}>{stat.lab}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={featuresLayout} className="features-layout-mobile">
          <div className="feature-card-hover feature-card-mobile" style={{...featureCardBase, backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)'}}>
            <div className="icon-circle-hover" style={{...featureIconStyle, backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)'}}>🎯</div>
            <h4 style={{...featureTitle, color: 'var(--text-main)'}}>{t('hero.features.objective.title')}</h4>
            <p style={{...featureText, color: 'var(--text-muted)'}} dangerouslySetInnerHTML={{ __html: t('hero.features.objective.text') }} />
          </div>
          
          <div className="feature-card-hover feature-card-mobile" style={{...featureCardBase, backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)'}}>
            <div className="icon-circle-hover" style={{...featureIconStyle, backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)'}}>🛡️</div>
            <h4 style={{...featureTitle, color: 'var(--text-main)'}}>{t('hero.features.values.title')}</h4>
            <p style={{...featureText, color: 'var(--text-muted)'}} dangerouslySetInnerHTML={{ __html: t('hero.features.values.text') }} />
          </div>
        </div>
      </animated.div>

      <style>{`
        .hero-button { transition: all 0.4s ease; text-decoration: none; display: inline-block; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .hero-button:hover { transform: translateY(-5px); background-color: #a6864a !important; box-shadow: 0 15px 30px rgba(197, 160, 89, 0.4) !important; }
        .stat-card-hover { transition: all 0.5s ease; cursor: default; }
        .stat-card-hover:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important; border-top-color: var(--text-main) !important; }
        .feature-card-hover { transition: all 0.5s ease; }
        .feature-card-hover:hover { border-color: var(--accent) !important; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }
        .icon-circle-hover { transition: all 0.3s ease; }
        .feature-card-hover:hover .icon-circle-hover { background-color: var(--accent) !important; transform: rotate(10deg); color: #fff !important; }
        .dot-nav { transition: all 0.4s ease; cursor: pointer; border-radius: 10px; height: 10px; }

        @media (max-width: 1024px) {
          .hero-slider { height: 75vh !important; }
          .slide-content-mobile { padding: 0 20px !important; }
          .slide-title-mobile { font-size: 2.2rem !important; }
          .slide-desc-mobile { font-size: 1rem !important; margin-bottom: 30px !important; }
          
          .bottom-section-mobile { padding: 60px 5% !important; }
          .trayectoria-title-mobile { font-size: 2.2rem !important; }
          .trayectoria-desc-mobile { font-size: 1rem !important; padding-left: 15px !important; }
          
          .stats-grid-mobile { 
            grid-template-columns: 1fr 1fr !important; 
            gap: 12px !important;
            margin-top: 30px;
          }
          .stat-card-mobile { padding: 25px 10px !important; }
          .stat-val-mobile { font-size: 1.8rem !important; }
          .stat-icon-mobile { font-size: 1.8rem !important; }

          .features-layout-mobile { 
            grid-template-columns: 1fr !important; 
            margin-top: 40px !important;
            gap: 20px !important;
          }
          .feature-card-mobile { padding: 40px 25px !important; }
        }
      `}</style>
    </motion.section>
  );
};

// --- ESTILOS BASE (SE MANTIENEN IGUAL) ---
const grandSliderContainer = { position: 'relative', width: '100%', height: '100vh', backgroundColor: '#000', overflow: 'hidden' };
const slideImageStyle = { position: 'absolute', width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' };
const slideContentOverlay = { position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center', paddingBottom: '8vh' };
const slideTitleStyle = { fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '900', marginBottom: '25px', letterSpacing: '-2px', lineHeight: '1.1' };
const slideDescStyle = { fontSize: '1.3rem', fontWeight: '300', marginBottom: '50px', opacity: 0.9, lineHeight: '1.6', maxWidth: '750px', margin: '0 auto 50px' };
const btnMainStyle = { backgroundColor: 'var(--accent)', color: '#fff', padding: '22px 50px', borderRadius: '14px', fontWeight: '800', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' };
const dotsWrapper = { position: 'absolute', bottom: '5vh', width: '100%', display: 'flex', justifyContent: 'center', gap: '15px', zIndex: 20 };
const dotBase = { transition: 'all 0.3s ease' };
const layoutGrid = { display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' };
const trayectoriaTag = { fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' };
const trayectoriaTitle = { fontSize: '3.5rem', margin: '20px 0', lineHeight: '1.1', fontWeight: '800' };
const trayectoriaDescription = { fontSize: '1.2rem', lineHeight: '1.8', paddingLeft: '25px' };
const statsGrid = { flex: '1 1 450px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' };
const statCardStyle = { padding: '45px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' };
const statValStyle = { fontSize: '3rem', margin: '15px 0', fontWeight: '900' };
const statLabelStyle = { fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };
const featuresLayout = { marginTop: '100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' };
const featureCardBase = { padding: '60px 50px', borderRadius: '30px' };
const featureTitle = { fontSize: '1.8rem', marginBottom: '20px', fontWeight: '700' };
const featureText = { lineHeight: '1.8', fontSize: '1.1rem' };
const featureIconStyle = { width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '30px' };

export default Hero;