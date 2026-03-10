import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const localResources = {
  es: {
    contact: {
      cap: "Contacto",
      title1: "Hablemos de tu",
      title2: "próximo proyecto",
      labelName: "¿Cómo te llamas?",
      placeholderName: "Tu nombre completo",
      errName: "El nombre debe tener al menos 3 caracteres",
      labelEmail: "Tu Email",
      errEmail: "Ingresa un email válido",
      labelSpec: "Especialidad",
      labelMessage: "Cuéntanos sobre la obra",
      placeholderMessage: "m2 estimados, zona y tiempos...",
      errMessage: "Cuéntanos un poco más (mín. 10 caracteres)",
      btnIdle: "Enviar Consulta →",
      btnValid: "Completa el formulario",
      btnSending: "Enviando...",
      btnSuccess: "¡Enviado! ✓",
      infoTitle: "Información Directa",
      specs: {
        vivienda: "Construcción de Vivienda",
        remodel: "Remodelación / Ampliación",
        obra: "Obra Comercial",
        ing: "Ingeniería / Cálculo"
      }
    }
  },
  en: {
    contact: {
      cap: "Contact",
      title1: "Let's talk about your",
      title2: "next project",
      labelName: "What's your name?",
      placeholderName: "Your full name",
      errName: "Name must be at least 3 characters",
      labelEmail: "Your Email",
      errEmail: "Enter a valid email",
      labelSpec: "Specialty",
      labelMessage: "Tell us about the project",
      placeholderMessage: "Estimated m2, area and timing...",
      errMessage: "Tell us a bit more (min. 10 chars)",
      btnIdle: "Send Inquiry →",
      btnValid: "Complete the form",
      btnSending: "Sending...",
      btnSuccess: "Sent! ✓",
      infoTitle: "Direct Information",
      specs: {
        vivienda: "House Construction",
        remodel: "Remodeling / Expansion",
        obra: "Commercial Work",
        ing: "Engineering / Calculation"
      }
    }
  }
};

const Contact = () => {
  const { i18n } = useTranslation();
  const tl = (key) => localResources[i18n.language]?.contact[key] || localResources['es'].contact[key];

  const [formData, setFormData] = useState({ nombre: '', email: '', proyecto: tl('specs').vivienda, mensaje: '' });
  const [touched, setTouched] = useState({ nombre: false, email: false, mensaje: false });
  const [status, setStatus] = useState('idle');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const errors = {
    nombre: formData.nombre.trim().length < 3,
    email: !emailRegex.test(formData.email),
    mensaje: formData.mensaje.trim().length < 10
  };

  const isFormValid = !errors.nombre && !errors.email && !errors.mensaje;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      setStatus('sending');
      await new Promise(r => setTimeout(r, 2000));
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ nombre: '', email: '', proyecto: tl('specs').vivienda, mensaje: '' });
        setTouched({ nombre: false, email: false, mensaje: false });
      }, 4000);
    }
  };

  return (
    <motion.section id="contacto" className="contact-section" style={{...sectionStyle, backgroundColor: 'var(--bg-primary)'}} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
      <div style={gridStyle} />
      <div style={grainOverlay} />
      
      <div className="contact-container" style={container}>
        <motion.div className="form-side" style={formSide} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <header style={headerStyle}>
            <span style={{...capStyle, color: 'var(--accent)'}}>{tl('cap')}</span>
            <h2 className="contact-title" style={{...titleStyle, color: 'var(--text-main)'}}>{tl('title1')} <br/><span style={{...italicStyle, color: 'var(--accent)'}}>{tl('title2')}</span></h2>
          </header>

          <form style={formStyle} onSubmit={handleSubmit}>
            <div style={inputGroup}>
              <label style={labelStyle}>{tl('labelName')}</label>
              <input 
                name="nombre" type="text" value={formData.nombre} 
                onChange={handleChange} onBlur={() => handleBlur('nombre')}
                placeholder={tl('placeholderName')}
                style={{...modernInput, color: 'var(--text-main)', borderBottomColor: touched.nombre && errors.nombre ? '#ff4d4d' : 'var(--border-color)'}} 
              />
              <ErrorMsg show={touched.nombre && errors.nombre} msg={tl('errName')} />
            </div>

            <div className="row-inputs" style={rowInputs}>
              <div className="input-field" style={{ ...inputGroup, flex: 1 }}>
                <label style={labelStyle}>{tl('labelEmail')}</label>
                <input 
                  name="email" type="email" value={formData.email} 
                  onChange={handleChange} onBlur={() => handleBlur('email')}
                  placeholder="correo@ejemplo.com"
                  style={{...modernInput, color: 'var(--text-main)', borderBottomColor: touched.email && errors.email ? '#ff4d4d' : 'var(--border-color)'}} 
                />
                <ErrorMsg show={touched.email && errors.email} msg={tl('errEmail')} />
              </div>

              <div className="input-field" style={{ ...inputGroup, flex: 1, position: 'relative' }} ref={selectRef}>
                <label style={labelStyle}>{tl('labelSpec')}</label>
                <div onClick={() => setIsSelectOpen(!isSelectOpen)} style={{...modernSelect, color: 'var(--text-main)', borderBottomColor: 'var(--border-color)'}}>
                  {formData.proyecto} <motion.span animate={{ rotate: isSelectOpen ? 180 : 0 }} style={{fontSize: '0.7rem', opacity: 0.5}}>▼</motion.span>
                </div>
                <AnimatePresence>
                  {isSelectOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0, y: -10 }} style={{...dropdownStyle, backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)'}}>
                      {[tl('specs').vivienda, tl('specs').remodel, tl('specs').obra, tl('specs').ing].map((p) => (
                        <motion.div key={p} onClick={() => { setFormData({...formData, proyecto: p}); setIsSelectOpen(false); }} style={{...optionStyle, color: 'var(--text-main)'}} whileHover={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', color: 'var(--accent)' }}>{p}</motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div style={{...inputGroup, marginTop: '10px'}}>
              <label style={labelStyle}>{tl('labelMessage')}</label>
              <textarea 
                name="mensaje" value={formData.mensaje} 
                onChange={handleChange} onBlur={() => handleBlur('mensaje')}
                placeholder={tl('placeholderMessage')}
                style={{...modernTextarea, color: 'var(--text-main)', borderBottomColor: touched.mensaje && errors.mensaje ? '#ff4d4d' : 'var(--border-color)'}} 
              />
              <ErrorMsg show={touched.mensaje && errors.mensaje} msg={tl('errMessage')} />
            </div>

            <button className="submit-button" type="submit" disabled={!isFormValid || status !== 'idle'} style={{ ...buttonStyle, backgroundColor: status === 'success' ? '#10b981' : (isFormValid ? 'var(--accent)' : '#444'), color: isFormValid ? '#000' : '#888' }}>
              <div style={buttonContentWrapper}>
                <AnimatePresence mode="wait">
                  {status === 'idle' && <motion.div key="idle" exit={{ opacity: 0 }} style={innerBtnContent}>{isFormValid ? tl('btnIdle') : tl('btnValid')}</motion.div>}
                  {status === 'sending' && <motion.div key="sending" style={innerBtnContent}><div className="spinner" /> {tl('btnSending')}</motion.div>}
                  {status === 'success' && <motion.div key="success" style={innerBtnContent}>{tl('btnSuccess')}</motion.div>}
                </AnimatePresence>
              </div>
            </button>
          </form>
        </motion.div>

        <motion.div className="info-side" style={infoSide} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          <div style={{ ...infoCard, backgroundColor: 'var(--text-main)', color: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
            <h3 style={{...infoTitle, color: 'var(--bg-primary)'}}>{tl('infoTitle').split(' ')[0]} <br/> {tl('infoTitle').split(' ')[1]}</h3>
            <div style={divider} />
            <InfoItem icon="📍" label="Ubicación" value="Puerto Madero, Buenos Aires" />
            <InfoItem icon="📞" label="Teléfono" value="+54 11 1234-5678" />
            <InfoItem icon="📧" label="Email" value="info@constru-tech.com" />
            <motion.div style={mapWrapper} whileHover={{ scale: 1.02 }}>
              <iframe title="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8475283874386!2d-58.3649!3d-34.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzM2LjAiUyA1OMKwMjEnNTMuNiJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar" style={mapIframeStyle} allowFullScreen="" loading="lazy" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{` 
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } 
        .spinner { border: 2px solid rgba(0,0,0,0.1); border-top: 2px solid #000; border-radius: 50%; width: 18px; height: 18px; animation: spin 0.8s linear infinite; margin-right: 10px; } 
        input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 0.5; }

        /* AJUSTES MOBILE */
        @media (max-width: 1024px) {
          .contact-section { padding: 80px 5% !important; }
          .contact-container { flex-direction: column !important; gap: 60px !important; }
          .form-side, .info-side { width: 100% !important; flex: none !important; }
          .info-side { position: relative !important; top: 0 !important; }
          .contact-title { font-size: 2.5rem !important; }
          .row-inputs { flex-direction: column !important; gap: 20px !important; }
          .submit-button { width: 100% !important; }
        }

        @media (max-width: 480px) {
          .contact-title { font-size: 2rem !important; }
          .submit-button { padding: 18px 0 !important; }
        }
      `}</style>
    </motion.section>
  );
};

const ErrorMsg = ({ show, msg }) => (
  <div style={{ height: '18px', overflow: 'hidden' }}>
    <AnimatePresence>
      {show && (
        <motion.span 
          initial={{ y: -10, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: -10, opacity: 0 }}
          style={{ fontSize: '0.65rem', color: '#ff4d4d', fontWeight: '600', marginTop: '4px', display: 'block' }}
        >
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <motion.div style={{ display: 'flex', gap: '20px', marginBottom: '18px' }} whileHover={{ x: 5 }}>
    <span style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'rgba(197, 160, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
    <div>
      <p style={{ fontSize: '0.6rem', color: 'var(--accent)', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
      <p style={{ fontSize: '0.9rem', color: 'var(--bg-primary)', opacity: 0.8, margin: '2px 0 0 0' }}>{value}</p>
    </div>
  </motion.div>
);

const sectionStyle = { position: 'relative', padding: '160px 8% 100px 8%', minHeight: '100vh', overflow: 'hidden', scrollMarginTop: '80px', transition: 'background-color 0.4s ease' };
const gridStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(to right, rgba(197, 160, 89, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 160, 89, 0.04) 1px, transparent 1px)`, backgroundSize: '50px 50px', zIndex: 1 };
const grainOverlay = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")', opacity: 0.1, pointerEvents: 'none', zIndex: 2 };
const container = { display: 'flex', gap: '80px', position: 'relative', zIndex: 3 };
const formSide = { flex: 1.2 };
const infoSide = { flex: 0.8, position: 'sticky', top: '120px' };
const headerStyle = { marginBottom: '40px' };
const capStyle = { fontSize: '0.8rem', fontWeight: '800', letterSpacing: '5px', textTransform: 'uppercase' };
const titleStyle = { fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1.1' };
const italicStyle = { fontStyle: 'italic', fontWeight: '300' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputGroup = { display: 'flex', flexDirection: 'column', position: 'relative' };
const rowInputs = { display: 'flex', gap: '30px' };
const labelStyle = { fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '5px' };
const modernInput = { width: '100%', padding: '15px 0', fontSize: '1.2rem', background: 'transparent', border: 'none', borderBottom: '1px solid', outline: 'none', transition: 'all 0.3s ease', fontFamily: 'inherit' };
const modernSelect = { ...modernInput, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const modernTextarea = { ...modernInput, minHeight: '80px', resize: 'none' };
const dropdownStyle = { position: 'absolute', top: '100%', left: 0, width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden', zIndex: 100, padding: '10px 0', border: '1px solid' };
const optionStyle = { padding: '15px 25px', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.3s ease' };
const buttonStyle = { position: 'relative', padding: '22px 0', borderRadius: '50px', border: 'none', fontSize: '1rem', fontWeight: '800', width: '310px', overflow: 'hidden', cursor: 'pointer', marginTop: '20px', transition: 'all 0.3s ease' };
const buttonContentWrapper = { position: 'relative', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const innerBtnContent = { display: 'flex', alignItems: 'center', position: 'absolute' };
const infoCard = { padding: '40px', borderRadius: '40px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' };
const infoTitle = { fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px' };
const divider = { width: '50px', height: '4px', backgroundColor: '#c5a059', marginBottom: '35px' };
const mapWrapper = { position: 'relative', width: '100%', height: '170px', borderRadius: '20px', overflow: 'hidden', marginTop: '25px', border: '1px solid rgba(197, 160, 89, 0.4)', zIndex: 5 };
const mapIframeStyle = { width: '100%', height: '100%', border: 0 };

export default Contact;