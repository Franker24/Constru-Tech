import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Proyectos = () => {
  const { t, i18n } = useTranslation();
  const [filtro, setFiltro] = useState('Todos');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [proyectosVisibles, setProyectosVisibles] = useState(6);
  const [cargando, setCargando] = useState(false);

  const proyectos = useMemo(() => [
    { id: 1, categoria: t('projects_section.filters.res'), catValue: 'Residencial', titulo: 'Torre Panorama', img: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=800', ubicacion: 'Buenos Aires', superficie: '4500 m²', año: '2024', detalle: t('services_section.items.res.desc') },
    { id: 2, categoria: t('projects_section.filters.com'), catValue: 'Comercial', titulo: 'Centro Empresarial Altos', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800', ubicacion: 'Córdoba', superficie: '12000 m²', año: '2023', detalle: t('services_section.items.com.desc') },
    { id: 3, categoria: t('projects_section.filters.ind'), catValue: 'Industrial', titulo: 'Parque Industrial Norte', img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800', ubicacion: 'Santa Fe', superficie: '25000 m²', año: '2022', detalle: t('services_section.items.ind.desc') },
    { id: 4, categoria: t('projects_section.filters.res'), catValue: 'Residencial', titulo: 'Casa Horizonte', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800', ubicacion: 'Mendoza', superficie: '320 m²', año: '2023', detalle: t('services_section.items.res.desc') },
    { id: 5, categoria: t('projects_section.filters.com'), catValue: 'Comercial', titulo: 'Plaza Comercial Central', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800', ubicacion: 'Salta', superficie: '8500 m²', año: '2024', detalle: t('services_section.items.com.desc') },
    { id: 6, categoria: t('projects_section.filters.ind'), catValue: 'Industrial', titulo: 'Planta Industrial Delta', img: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=800', ubicacion: 'Neuquén', superficie: '15000 m²', año: '2023', detalle: t('services_section.items.ind.desc') },
    { id: 7, categoria: t('projects_section.filters.res'), catValue: 'Residencial', titulo: 'Residencias del Lago', img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800', ubicacion: 'Bariloche', superficie: '1800 m²', año: '2022', detalle: t('services_section.items.res.desc') },
    { id: 8, categoria: t('projects_section.filters.com'), catValue: 'Comercial', titulo: 'Torre Financiera Capital', img: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=800', ubicacion: 'Buenos Aires', superficie: '9200 m²', año: '2024', detalle: t('services_section.items.com.desc') }
  ], [t]);

  const categorias = [
    { label: t('projects_section.filters.all'), value: 'Todos' },
    { label: t('projects_section.filters.res'), value: 'Residencial' },
    { label: t('projects_section.filters.com'), value: 'Comercial' },
    { label: t('projects_section.filters.ind'), value: 'Industrial' }
  ];

  const filtrados = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.catValue === filtro);
  const proyectosAMostrar = filtrados.slice(0, proyectosVisibles);

  const manejarVerMas = () => {
    setCargando(true);
    setTimeout(() => {
      setProyectosVisibles(prev => prev + 3);
      setCargando(false);
    }, 800);
  };

  return (
    <section id="proyectos" className="proyectos-section" style={sectionStyle}>

      {/* HEADER */}
      <motion.div 
        key={i18n.language}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="proyectos-header"
        style={headerContainerStyle}
      >
        <h2 className="title-text" style={titleStyle}>
          {t('projects_section.title1')} <br/> 
          <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{t('projects_section.title2')}</span>
        </h2>
        <p style={descStyle}>
          {t('projects_section.desc')}
        </p>
      </motion.div>

      {/* FILTROS */}
      <div className="filtros-container" style={filtrosStyle}>
        {categorias.map(cat => (
          <button 
            key={cat.value}
            onClick={() => { setFiltro(cat.value); setProyectosVisibles(6); }}
            style={{
              ...filterBtnBase,
              color: filtro === cat.value ? 'var(--text-main)' : 'var(--text-muted)',
            }}
          >
            {cat.label}
            {filtro === cat.value && (
              <motion.div layoutId="underline_pro" style={underlineStyle} />
            )}
          </button>
        ))}
      </div>

      {/* GRILLA */}
      <motion.div layout className="proyectos-grid" style={gridStyle}>
        <AnimatePresence mode='popLayout'>
          {proyectosAMostrar.map((proy) => (
            <motion.div 
              layout key={proy.id} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              whileHover={window.innerWidth > 1024 ? { y: -10 } : {}}
              onClick={() => setProyectoSeleccionado(proy)}
              className="proyecto-card"
              style={cardStyle}
            >
              <div style={{ backgroundImage: `url(${proy.img})`, ...imgBoxStyle }} className="img-box" />
              <div style={infoOverlayStyle}>
                <span style={catLabelStyle}>{proy.categoria}</span>
                <h3 className="card-title-text" style={cardTitleStyle}>{proy.titulo}</h3>
                <div style={accentLineStyle}></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* BOTÓN VER MÁS */}
      {filtrados.length > proyectosVisibles && !cargando && (
        <motion.div layout style={{ textAlign: 'center', marginTop: '60px' }}>
          <button onClick={manejarVerMas} className="btn-load-more" 
            style={{ ...btnLoadMoreStyle, color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>
            {t('projects_section.load_more')}
          </button>
        </motion.div>
      )}

      {/* MODAL RESPONSIVE */}
      <AnimatePresence>
        {proyectoSeleccionado && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setProyectoSeleccionado(null)}
            style={overlayStyle}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="modal-content"
              style={{ ...modalStyle, backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
            >
              <button onClick={() => setProyectoSeleccionado(null)} style={{ ...closeBtnStyle, color: 'var(--text-main)' }}>
                ✕
              </button>
              
              <div className="modal-grid" style={modalGridStyle}>
                <img src={proyectoSeleccionado.img} className="modal-img" style={modalImgStyle} alt="" />
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={modalCatStyle}>{proyectoSeleccionado.categoria}</span>
                  <h3 className="modal-title-text" style={modalTitleStyle}>{proyectoSeleccionado.titulo}</h3>
                  
                  <div className="specs-grid" style={{ ...specsGridStyle, borderColor: 'var(--border-color)' }}>
                    <div style={specItem}><small>{t('projects_section.specs.location')}</small><br/><strong>{proyectoSeleccionado.ubicacion}</strong></div>
                    <div style={specItem}><small>{t('projects_section.specs.surface')}</small><br/><strong>{proyectoSeleccionado.superficie}</strong></div>
                    <div style={specItem}><small>{t('projects_section.specs.year')}</small><br/><strong>{proyectoSeleccionado.año}</strong></div>
                  </div>

                  <p className="modal-desc" style={modalDescStyle}>{proyectoSeleccionado.detalle}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .img-box { transition: 1.2s cubic-bezier(0.2, 1, 0.3, 1); }
        .proyecto-card:hover .img-box { transform: scale(1.1); opacity: 0.4; }
        .btn-load-more:hover { background: var(--text-main) !important; color: var(--bg-primary) !important; }
        
        @media (max-width: 1024px) {
          .proyectos-section { padding: 80px 5% !important; }
          .title-text { font-size: 2.8rem !important; }
          .proyectos-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
          }
          .proyecto-card { height: 350px !important; }
          .card-title-text { font-size: 1.5rem !important; }
          
          .modal-content { 
            padding: 30px 20px !important; 
            width: 95% !important;
            border-radius: 15px !important;
          }
          .modal-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important; 
          }
          .modal-img { height: 250px !important; }
          .modal-title-text { font-size: 2rem !important; }
          .specs-grid { 
            grid-template-columns: 1fr !important; 
            gap: 15px !important; 
            text-align: left !important;
          }
        }

        /* Hide scrollbar for filters */
        .filtros-container::-webkit-scrollbar { display: none; }
        .filtros-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

// --- ESTILOS DINÁMICOS Y CONSTANTES ---
const sectionStyle = { padding: '120px 8%', backgroundColor: 'var(--bg-primary)', transition: 'all 0.4s ease', fontFamily: '"Inter", sans-serif', minHeight: '100vh', position: 'relative' };
const headerContainerStyle = { marginBottom: '60px', borderLeft: '8px solid var(--accent)', paddingLeft: '30px' };
const titleStyle = { fontSize: '4rem', color: 'var(--text-main)', fontWeight: '900', letterSpacing: '-3px', lineHeight: '0.9', margin: 0 };
const descStyle = { marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px' };
const filtrosStyle = { display: 'flex', gap: '40px', marginBottom: '60px', borderBottom: '1px solid var(--border-color)', overflowX: 'auto', whiteSpace: 'nowrap' };
const filterBtnBase = { background: 'none', border: 'none', cursor: 'pointer', paddingBottom: '15px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', position: 'relative' };
const underlineStyle = { position: 'absolute', bottom: -1, left: 0, right: 0, height: '4px', background: 'var(--accent)' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' };
const cardStyle = { height: '450px', position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', background: '#000' };
const imgBoxStyle = { width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.7 };
const infoOverlayStyle = { position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '30px', background: 'linear-gradient(transparent, rgba(0,0,0,0.95))' };
const catLabelStyle = { color: 'var(--accent)', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' };
const cardTitleStyle = { color: '#fff', fontSize: '1.8rem', margin: '5px 0', fontWeight: '300' };
const accentLineStyle = { width: '40px', height: '2px', background: 'var(--accent)', marginTop: '15px' };
const btnLoadMoreStyle = { background: 'none', padding: '18px 45px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s', borderRadius: '50px', border: '1px solid' };
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' };
const modalStyle = { width: '100%', maxWidth: '1100px', padding: '50px', borderRadius: '25px', maxHeight: '95vh', overflowY: 'auto', position: 'relative' };
const closeBtnStyle = { position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: '1.5rem', fontWeight: '300', cursor: 'pointer', zIndex: 10 };
const modalGridStyle = { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' };
const modalImgStyle = { width: '100%', height: '500px', objectFit: 'cover', borderRadius: '12px' };
const modalCatStyle = { color: 'var(--accent)', fontWeight: '900', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase' };
const modalTitleStyle = { fontSize: '3rem', fontWeight: '900', margin: '10px 0', lineHeight: 1 };
const specsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px', borderTop: '1px solid', borderBottom: '1px solid', padding: '20px 0' };
const specItem = { fontSize: '0.9rem' };
const modalDescStyle = { color: 'var(--text-muted)', lineHeight: '1.7', marginTop: '25px', fontSize: '1rem' };

export default Proyectos;