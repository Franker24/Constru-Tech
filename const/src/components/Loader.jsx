import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tiempo de carga (3 segundos)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          style={loaderOverlay}
        >
          <div style={containerStack}>
            <div className="loader">
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={brandText}
            >
              CONSTRU<span style={{ fontWeight: '300', color: 'var(--accent, #888)' }}>TECH</span>
            </motion.div>
          </div>

          <style>{`
            :root {
              --square-size: 50px; 
              --offset: 55px;      
              --loader-size: 165px; 
            }

            .loader {
              position: relative;
              width: var(--loader-size);
              height: var(--loader-size);
              transform: rotate(45deg);
            }

            .loader-square {
              position: absolute;
              top: 0;
              left: 0;
              width: var(--square-size);
              height: var(--square-size);
              margin: 2px;
              background: linear-gradient(135deg, #444 0%, #111 100%);
              border: 1px solid rgba(255,255,255,0.1);
              box-shadow: 4px 4px 10px rgba(0,0,0,0.5);
              animation: square-animation 10s ease-in-out infinite both;
            }

            @keyframes square-animation {
              0%, 10.5% { left: 0; top: 0; }
              12.5%, 23% { left: var(--offset); top: 0; }
              25%, 35.5% { left: calc(var(--offset) * 2); top: 0; }
              37.5%, 48% { left: calc(var(--offset) * 2); top: var(--offset); }
              50%, 60.5% { left: var(--offset); top: var(--offset); }
              62.5%, 73% { left: var(--offset); top: calc(var(--offset) * 2); }
              75%, 85.5% { left: 0; top: calc(var(--offset) * 2); }
              87.5%, 98% { left: 0; top: var(--offset); }
              100% { left: 0; top: 0; }
            }

            .loader-square:nth-of-type(1) { animation-delay: -1.42s; }
            .loader-square:nth-of-type(2) { animation-delay: -2.85s; }
            .loader-square:nth-of-type(3) { animation-delay: -4.28s; }
            .loader-square:nth-of-type(4) { animation-delay: -5.71s; }
            .loader-square:nth-of-type(5) { animation-delay: -7.14s; }
            .loader-square:nth-of-type(6) { animation-delay: -8.57s; }
            .loader-square:nth-of-type(7) { animation-delay: -10s; }

            @media (max-width: 768px) {
              :root {
                --square-size: 38px;
                --offset: 42px;
                --loader-size: 130px;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- ESTILOS ---
const loaderOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#0a0a0a',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999999,
};

const containerStack = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '80px' // Espacio entre el loader y el nombre
};

const brandText = {
  color: 'white',
  fontSize: '1.8rem',
  fontWeight: '900',
  letterSpacing: '8px',
  textTransform: 'uppercase',
  textShadow: '0 0 20px rgba(255,255,255,0.1)'
};

export default Loader;