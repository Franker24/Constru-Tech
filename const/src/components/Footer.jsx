import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight 
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer style={footerStyle}>
      <div style={container}>
        
        <div style={topRow}>
          {/* Columna 1: Branding */}
          <div style={brandCol}>
            <h3 style={brandTitle}>CONSTRU<span style={{color: 'var(--accent)'}}>TECH</span></h3>
            <p style={brandDesc}>
              {t('footer.description')}
            </p>
            <div style={socialList}>
              <SocialIcon icon={<Instagram size={20} />} link="https://instagram.com" />
              <SocialIcon icon={<Linkedin size={20} />} link="https://linkedin.com" />
              <SocialIcon icon={<Facebook size={20} />} link="https://facebook.com" />
            </div>
          </div>

          {/* Columna 2: Info de Contacto */}
          <div style={contactCol}>
            <h4 style={colTitle}>{t('footer.contactTitle')}</h4>
            <div style={infoItem}>
              <MapPin size={16} style={{color: 'var(--accent)'}} />
              <span style={infoText}>{t('footer.address')}</span>
            </div>
            <div style={infoItem}>
              <Phone size={16} style={{color: 'var(--accent)'}} />
              <span style={infoText}>+54 11 4567 8900</span>
            </div>
            <div style={infoItem}>
              <Mail size={16} style={{color: 'var(--accent)'}} />
              <span style={infoText}>proyectos@construtech.com</span>
            </div>
          </div>

          {/* Columna 3: Newsletter */}
          <div style={newsletterCol}>
            <h4 style={colTitle}>Newsletter</h4>
            <p style={newsletterDesc}>{t('footer.newsletterDesc')}</p>
            <div style={inputBox}>
              <input type="email" placeholder="Email" style={inputStyle} />
              <ArrowUpRight size={18} style={{color: 'var(--accent)', cursor: 'pointer'}} />
            </div>
          </div>
        </div>

        <div style={dividerWrapper}>
          <hr style={divider} />
          <div style={{...dividerAccent, backgroundColor: 'var(--accent)'}} />
        </div>

        {/* Barra de cierre */}
        <div style={bottomRow}>
          <p style={copyText}>
            © 2026 <span style={boldWhite}>CONSTRUTECH S.A.</span> — {t('footer.certified')}.
          </p>
          <p style={devText}>
            DEVELOPED BY <span style={{...devLink, color: 'var(--accent)'}}>CONSTRUCTORA WEB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, link }) => {
  const [isHover, setIsHover] = useState(false);

  const iconActiveStyle = {
    ...socialIconStyle,
    color: isHover ? 'var(--accent)' : '#8e9297',
    borderColor: isHover ? 'var(--accent)' : '#222',
    transform: isHover ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: isHover ? '0 10px 15px rgba(197, 160, 89, 0.2)' : 'none',
    backgroundColor: isHover ? 'rgba(197, 160, 89, 0.05)' : 'transparent',
  };

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noreferrer" 
      style={iconActiveStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icon}
    </a>
  );
};

// --- ESTILOS ---
// El footer se mantiene oscuro independientemente del modo para dar "peso" visual
const footerStyle = {
  backgroundColor: '#0F1115',
  padding: '100px 0 40px 0',
  width: '100%',
  fontFamily: '"Inter", sans-serif',
  position: 'relative',
  borderTop: '1px solid rgba(197, 160, 89, 0.1)' 
};

const container = { maxWidth: '1300px', margin: '0 auto', padding: '0 5%' };
const topRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '50px', marginBottom: '60px' };
const brandCol = { flex: '1.2', minWidth: '300px' };
const brandTitle = { fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: '0 0 25px 0', letterSpacing: '1px' };
const brandDesc = { color: '#9ba0a6', fontSize: '0.95rem', lineHeight: '1.8', maxWidth: '400px', marginBottom: '25px' };
const contactCol = { flex: '1', minWidth: '250px' };
const colTitle = { fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#5e6268', marginBottom: '30px', fontWeight: '800' };
const infoItem = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' };
const infoText = { color: '#9ba0a6', fontSize: '0.9rem' };
const newsletterCol = { flex: '0.8', minWidth: '200px' };
const newsletterDesc = { color: '#5e6268', fontSize: '0.85rem', marginBottom: '15px' };
const inputBox = { display: 'flex', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '8px' };
const inputStyle = { backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.9rem', width: '100%' };
const socialList = { display: 'flex', gap: '15px' };
const socialIconStyle = { width: '45px', height: '45px', borderRadius: '50%', border: '1px solid', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer', textDecoration: 'none' };
const dividerWrapper = { position: 'relative', marginBottom: '40px' };
const divider = { border: 'none', height: '1px', backgroundColor: 'rgba(255,255,255,0.03)', margin: 0 };
const dividerAccent = { position: 'absolute', top: 0, left: 0, width: '50px', height: '2px' };
const bottomRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' };
const copyText = { fontSize: '0.75rem', color: '#5e6268', margin: 0, letterSpacing: '0.5px' };
const devText = { fontSize: '0.7rem', color: '#444', margin: 0, fontWeight: '700', letterSpacing: '1px' };
const devLink = { cursor: 'pointer' };
const boldWhite = { color: '#ddd', fontWeight: '700' };

export default Footer;