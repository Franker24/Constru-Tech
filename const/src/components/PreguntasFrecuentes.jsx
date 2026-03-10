import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PreguntasFrecuentes = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  // Mapeo dinámico de las FAQs desde i18n
  const faqs = [
    { q: t('faq.items.0.q'), a: t('faq.items.0.a') },
    { q: t('faq.items.1.q'), a: t('faq.items.1.a') },
    { q: t('faq.items.2.q'), a: t('faq.items.2.a') },
    { q: t('faq.items.3.q'), a: t('faq.items.3.a') }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={sectionStyle}>
      <div style={darkOverlay} />
      <div style={grainOverlay} />
      
      <div style={container}>
        {/* Header Animado */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={headerStyle}
        >
          <h2 style={{...titleStyle, color: '#ffffff'}}>
            {t('faq.title')} <span style={{...italicStyle, color: 'var(--accent)'}}>{t('faq.subtitle')}</span>
          </h2>
        </motion.div>

        <div style={accordionWrapper}>
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                ...faqItem, 
                backgroundColor: openIndex === index ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderColor: openIndex === index ? 'var(--accent)' : 'rgba(255,255,255,0.15)'
              }}
            >
              <button 
                onClick={() => toggleFAQ(index)} 
                style={questionBtn}
              >
                <span style={{
                  ...questionText,
                  color: openIndex === index ? 'var(--accent)' : '#ffffff'
                }}>
                   {faq.q}
                </span>
                
                <motion.span 
                  animate={{ rotate: openIndex === index ? 45 : 0, color: openIndex === index ? 'var(--accent)' : '#ffffff' }}
                  style={iconStyle}
                >
                  +
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{...answerText, color: '#cccccc'}}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ESTILOS (Mantenemos tus estilos originales) ---

const sectionStyle = {
  position: 'relative',
  padding: '120px 8%',
  backgroundImage: 'url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  fontFamily: '"Inter", sans-serif',
  overflow: 'hidden',
};

const darkOverlay = {
  position: 'absolute',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.88)',
  zIndex: 1
};

const grainOverlay = {
  position: 'absolute',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
  opacity: 0.15,
  pointerEvents: 'none',
  zIndex: 2
};

const container = { maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 3 };
const headerStyle = { marginBottom: '60px', textAlign: 'center' };
const titleStyle = { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', margin: '15px 0', letterSpacing: '-2px' };
const italicStyle = { fontStyle: 'italic', fontWeight: '300' };

const accordionWrapper = {
  borderTop: '1px solid rgba(255,255,255,0.1)',
};

const faqItem = {
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  padding: '0 30px',
  transition: 'border-color 0.4s ease, background-color 0.4s ease'
};

const questionBtn = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '30px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  outline: 'none',
};

const questionText = {
  fontSize: '1.2rem',
  fontWeight: '600',
  transition: 'color 0.4s ease',
  lineHeight: '1.3',
  paddingRight: '20px'
};

const iconStyle = {
  fontSize: '2rem',
  fontWeight: '300',
  marginLeft: '20px',
  display: 'inline-block'
};

const answerText = {
  fontSize: '1.05rem',
  lineHeight: '1.8',
  maxWidth: '800px',
  paddingBottom: '30px',
  margin: 0
};

export default PreguntasFrecuentes;