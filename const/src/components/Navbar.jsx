import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentLang = i18n.language?.split('-')[0].toUpperCase() || 'ES';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDark]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [location]);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  // Variantes para animar los links en cascada
  const containerVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, filter: "blur(0px)" },
    closed: { opacity: 0, y: 30, filter: "blur(10px)" }
  };

  return (
    <div style={outerWrapper}>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          ...navBase,
          width: isScrolled ? '92%' : '96%',
          backgroundColor: isOpen ? 'transparent' : 'var(--nav-bg)', 
          boxShadow: isScrolled && !isOpen ? '0 10px 30px rgba(0,0,0,0.12)' : 'none',
          marginTop: isScrolled ? '12px' : '20px',
          borderRadius: '22px',
          border: isOpen ? '1px solid transparent' : '1px solid var(--border-color)',
        }}
      >
        <div style={navContent}>
          <Link to="/" style={{ textDecoration: 'none', zIndex: 10002 }}>
            <div style={{ ...logoStyle, color: 'var(--text-main)' }}>
              CONSTRU<span style={{ fontWeight: '300', color: 'var(--accent)' }}>TECH</span>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <ul style={menuStyle} className="desktop-menu">
            <li style={liItem}><Link to="/" style={navLink}>{t('nav.home')}</Link></li>
            <li 
              onMouseEnter={() => setIsServicesOpen(true)} 
              onMouseLeave={() => setIsServicesOpen(false)} 
              style={{ ...liItem, position: 'relative' }}
            >
              <Link to="/servicios" style={navLink}>{t('nav.services')} ▼</Link>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={megaMenuWrapper}>
                    <div style={{...megaMenuContent, backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)'}}>
                      <div style={gridStyle}>
                         <ServiceInfoCard title={t('services.viviendas.title')} desc={t('services.viviendas.desc')} icon="🏘️" />
                         <ServiceInfoCard title={t('services.obras.title')} desc={t('services.obras.desc')} icon="🏬" />
                         <ServiceInfoCard title={t('services.gestion.title')} desc={t('services.gestion.desc')} icon="📋" />
                         <ServiceInfoCard title={t('services.mantenimiento.title')} desc={t('services.mantenimiento.desc')} icon="🛠️" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li style={liItem}><Link to="/proyectos" style={navLink}>{t('nav.projects')}</Link></li>
            <li style={liItem}><Link to="/contacto" style={navLink}>{t('nav.contact')}</Link></li>
          </ul>

          <div style={actionsContainer} className="desktop-actions">
            <div style={langMinimalWrapper}>
              <span onClick={() => changeLanguage('es')} style={langItem}>ES</span>
              <span style={{color: 'var(--border-color)'}}>|</span>
              <span onClick={() => changeLanguage('en')} style={langItem}>EN</span>
            </div>
            <div className="toggle-switch">
              <label className="switch-label" style={{ backgroundColor: 'var(--text-main)' }}>
                <input type="checkbox" className="checkbox" checked={isDark} onChange={() => setIsDark(!isDark)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* HAMBURGER / X ICON (MOBILE) */}
          <div 
            className={`hamburger-btn ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            style={{ zIndex: 10002 }}
          >
            <div className="bar top"></div>
            <div className="bar middle"></div>
            <div className="bar bottom"></div>
          </div>
        </div>
      </motion.nav>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={fullscreenOverlay}
          >
            <motion.div 
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={mobileMenuLinksContainer}
            >
              {[
                { name: t('nav.home'), path: '/' },
                { name: t('nav.services'), path: '/servicios' },
                { name: t('nav.projects'), path: '/proyectos' },
                { name: t('nav.contact'), path: '/contacto' }
              ].map((link, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Link to={link.path} style={mobileLargeLink} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} style={mobileExtraTools}>
                <div className="toggle-switch">
                  <label className="switch-label" style={{ backgroundColor: 'var(--text-main)' }}>
                    <input type="checkbox" className="checkbox" checked={isDark} onChange={() => setIsDark(!isDark)} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div style={langMinimalWrapper}>
                  <span onClick={() => changeLanguage('es')} style={mobileLangItem}>ES</span>
                  <span style={{color: 'rgba(255,255,255,0.2)'}}>|</span>
                  <span onClick={() => changeLanguage('en')} style={mobileLangItem}>EN</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-menu, .desktop-actions { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 7px;
          cursor: pointer;
          width: 28px;
        }
        .bar {
          width: 100%;
          height: 2px;
          background-color: var(--text-main);
          transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
          border-radius: 2px;
        }
        
        .hamburger-btn.open .top { transform: translateY(9px) rotate(45deg); background-color: var(--accent); }
        .hamburger-btn.open .middle { opacity: 0; transform: translateX(-10px); }
        .hamburger-btn.open .bottom { transform: translateY(-9px) rotate(-45deg); background-color: var(--accent); }

        .toggle-switch { position: relative; width: 44px; height: 22px; }
        .switch-label { position: absolute; width: 100%; height: 100%; border-radius: 20px; cursor: pointer; transition: 0.3s; }
        .checkbox { display: none; }
        .slider { position: absolute; width: 100%; height: 100%; border-radius: 20px; transition: 0.3s; }
        .checkbox:checked ~ .slider { background-color: var(--accent); }
        .slider::before {
          content: ""; position: absolute; top: 3.5px; left: 4px; width: 15px; height: 15px;
          border-radius: 50%; background-color: var(--bg-primary); transition: 0.3s;
        }
        .checkbox:checked ~ .slider::before { transform: translateX(21px); }
      `}</style>
    </div>
  );
};

const ServiceInfoCard = ({ title, desc, icon }) => (
  <div style={{ display: 'flex', gap: '12px', padding: '12px', alignItems: 'center', borderRadius: '14px' }}>
    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
    <div>
      <h4 style={{ margin: '0', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-main)' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  </div>
);

// --- ESTILOS ---
const outerWrapper = { position: 'fixed', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 9999 };
const navBase = { height: '65px', display: 'flex', alignItems: 'center', transition: 'all 0.5s ease', backdropFilter: 'blur(15px)', zIndex: 10001 };
const navContent = { width: '100%', padding: '0 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' };
const menuStyle = { display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0 };
const liItem = { display: 'flex', alignItems: 'center' };
const navLink = { textDecoration: 'none', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' };
const logoStyle = { fontSize: '1.1rem', fontWeight: '900', letterSpacing: '1.5px' };
const actionsContainer = { display: 'flex', alignItems: 'center', gap: '25px' };
const langMinimalWrapper = { display: 'flex', alignItems: 'center', gap: '10px' };
const langItem = { fontSize: '0.7rem', cursor: 'pointer', fontWeight: '800' };
const megaMenuWrapper = { position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '10px' };
const megaMenuContent = { width: '500px', padding: '20px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' };

// --- ESTILOS MOBILE FULLSCREEN ---
const fullscreenOverlay = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  backgroundColor: 'var(--bg-primary)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
  backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(var(--accent-rgb), 0.05) 0%, transparent 50%)'
};
const mobileMenuLinksContainer = { display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' };
const mobileLargeLink = {
  textDecoration: 'none', fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)',
  textTransform: 'uppercase', lineHeight: '1.2', letterSpacing: '1px'
};
const mobileExtraTools = { marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' };
const mobileLangItem = { fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', cursor: 'pointer' };

export default Navbar;