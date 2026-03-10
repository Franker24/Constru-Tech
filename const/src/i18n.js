import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      // --- NAVBAR ---
      nav: {
        home: "Inicio",
        services: "Servicios",
        projects: "Proyectos",
        contact: "Contacto",
        services_list: {
          res: "Residencial",
          com: "Comercial",
          ing: "Ingeniería",
          ind: "Industrial",
          rem: "Reformas",
          dir: "Gestión",
          urb: "Urbanismo",
          sus: "Sustentable"
        }
      },

      // --- HERO & ABOUT ---
      hero: {
        button: "Explorar Proyectos",
        slides: [
          { 
            title: "Construimos tus ideas", 
            desc: "Transformamos proyectos en obras reales con calidad, compromiso y experiencia en cada detalle." 
          },
          { 
            title: "Obras que inspiran confianza", 
            desc: "Desarrollamos proyectos de construcción modernos, seguros y pensados para durar." 
          },
          { 
            title: "Profesionales en cada etapa", 
            desc: "Nuestro equipo acompaña tu proyecto desde la planificación hasta la entrega final." 
          },
          { 
            title: "Calidad que se construye", 
            desc: "Trabajamos con materiales de primera calidad y los más altos estándares de construcción." 
          }
        ],
        about: {
          tag: "Nuestra Trayectoria",
          title1: "Compromiso con la",
          title2: "Excelencia Estructural.",
          desc: "Somos una empresa constructora que no solo levanta muros, sino que proyecta el futuro de nuestros clientes. Utilizamos tecnología de punta y procesos certificados."
        },
        stats: {
          experience: "Años de Experiencia",
          projects: "Proyectos Finalizados",
          m2: "M2 Construidos",
          specialists: "Especialistas"
        },
        features: {
          objective: {
            title: "Nuestro Objetivo",
            text: "Liderar el mercado de la construcción a través de la <strong>innovación constante</strong> y la entrega de proyectos que superen las expectativas."
          },
          values: {
            title: "Valores Sólidos",
            text: "Basamos nuestro éxito en la <strong>transparencia operativa</strong> y el respeto absoluto por los plazos acordados. La confianza se construye."
          }
        }
      },

      // --- SERVICIOS RÁPIDOS (Los que pediste con iconos) ---
      services: {
        viviendas: {
          title: "Viviendas Residenciales",
          desc: "Diseño y construcción de hogares personalizados con estándares de alta gama y confort térmico."
        },
        obras: {
          title: "Obras Comerciales",
          desc: "Desarrollo de locales, oficinas y centros logísticos optimizados para el flujo de trabajo."
        },
        gestion: {
          title: "Gestión de Proyectos",
          desc: "Administración integral de obra, optimización de recursos y dirección técnica profesional."
        },
        mantenimiento: {
          title: "Mantenimiento Integral",
          desc: "Servicios preventivos y correctivos para asegurar la durabilidad y valor de su activo inmobiliario."
        }
      },

      // --- SECCIÓN SERVICIOS (ACORDEÓN DETALLADO) ---
      services_section: {
        tag: "Especialidades",
        title1: "Disciplinas",
        title2: "Integrales",
        items: {
          res: { 
            title: "Arquitectura Residencial", 
            tag: "Viviendas", 
            desc: "Diseñamos viviendas únicas que combinan estética, funcionalidad y confort.",
            areas: ["Diseño personalizado", "Sustentabilidad", "Interiorismo"]
          },
          com: { 
            title: "Desarrollos Comerciales", 
            tag: "Corporativo", 
            desc: "Espacios diseñados para potenciar la identidad de marca y experiencia del usuario.",
            areas: ["Corporativos", "Locales", "Hotelería"]
          },
          ing: { 
            title: "Ingeniería Estructural", 
            tag: "Técnica", 
            desc: "Soluciones seguras con cálculos técnicos avanzados y cumplimiento de normativas.",
            areas: ["Cálculo", "Hormigón", "Refuerzos"]
          },
          ind: { 
            title: "Construcción Industrial", 
            tag: "Logística", 
            desc: "Instalaciones adaptadas a procesos de producción eficientes y gran escala.",
            areas: ["Naves", "Plantas", "Infraestructura"]
          },
          rem: { 
            title: "Remodelaciones", 
            tag: "Reformas", 
            desc: "Transformamos espacios existentes adaptándolos a nuevas necesidades.",
            areas: ["Renovación", "Ampliaciones", "Modernización"]
          },
          dir: { 
            title: "Gestión de Obras", 
            tag: "Gestión", 
            desc: "Supervisión técnica rigurosa para garantizar calidad, costos y plazos.",
            areas: ["Supervisión", "Calidad", "Planificación"]
          },
          urb: { 
            title: "Urbanización", 
            tag: "Urbanismo", 
            desc: "Desarrollo de proyectos urbanísticos integrados al entorno comunitario.",
            areas: ["Barrios", "Vialidad", "Espacios Públicos"]
          },
          sus: { 
            title: "Sustentabilidad", 
            tag: "Eco", 
            desc: "Técnicas de eficiencia energética y materiales de bajo impacto ambiental.",
            areas: ["Bioclimática", "Renovables", "Eco-Materiales"]
          }
        }
      },

      // --- TESTIMONIOS ---
      testimonials: {
        title: "Casos de",
        subtitle: "Éxito",
        items: [
          { name: "María González", text: "Quedamos muy conformes con el trabajo realizado. Cumplieron con los tiempos.", project: "Residencia Olivos" },
          { name: "Carlos Fernández", text: "Profesionalismo y compromiso en todo el proceso de construcción.", project: "Local Comercial" },
          { name: "Laura Martínez", text: "El equipo fue muy responsable y atento a cada detalle. Excelente.", project: "Ampliación Moderna" },
          { name: "Javier López", text: "Transformaron nuestra idea en una realidad superando expectativas.", project: "Nave Industrial" }
        ]
      },

      // --- FAQ ---
      faq: {
        title: "Consultas",
        subtitle: "Técnicas",
        items: [
          { q: "¿Cuánto tiempo demora un presupuesto?", a: "Entregamos un presupuesto detallado en un plazo de 48 a 72 horas hábiles." },
          { q: "¿Ofrecen garantía?", a: "Sí, contamos con garantía estructural de 10 años por contrato." },
          { q: "¿Llave en mano?", a: "Ofrecemos modalidad llave en mano o ejecución con materiales del cliente." },
          { q: "¿Cumplen plazos?", a: "Establecemos cronogramas digitales para que sigas el avance semanal." }
        ]
      },
      projects_section: {
  title1: "Obras",
  title2: "Destacadas",
  desc: "Arquitectura de vanguardia diseñada para perdurar y transformar entornos.",
  load_more: "Descubrir más proyectos",
  back: "VOLVER AL PORTAFOLIO",
  filters: {
    all: "Todos",
    res: "Residencial",
    com: "Comercial",
    ind: "Industrial"
  },
  specs: {
    location: "UBICACIÓN",
    surface: "SUPERFICIE",
    year: "AÑO"
  }
},
common: {
  close: "CERRAR"
},

      // --- FOOTER ---
      footer: {
        description: "Líderes en ingeniería de precisión. Elevamos los estándares de la industria mediante transparencia tecnológica y solidez estructural.",
        contactTitle: "Sede Central",
        address: "Distrito de Diseño, Edificio Arq 10, CABA",
        newsletterDesc: "Suscríbete para recibir reportes de obra y novedades tecnológicas.",
        certified: "CALIDAD CERTIFICADA"
      }
    }
  },

  en: {
    translation: {
      nav: {
        home: "Home",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
        services_list: {
          res: "Residential",
          com: "Commercial",
          ing: "Engineering",
          ind: "Industrial",
          rem: "Renovations",
          dir: "Management",
          urb: "Urbanism",
          sus: "Sustainable"
        }
      },
      hero: {
        button: "Explore Projects",
        slides: [
          { title: "Building your ideas", desc: "We transform projects into real works with quality, commitment, and expertise." },
          { title: "Works that inspire trust", desc: "We develop modern, safe construction projects designed to last." },
          { title: "Experts at every stage", desc: "Our team accompanies your project from planning to final delivery." },
          { title: "Quality built-in", desc: "We work with top-quality materials and the highest construction standards." }
        ],
        about: {
          tag: "Our Track Record",
          title1: "Commitment to",
          title2: "Structural Excellence.",
          desc: "We are a construction company projecting our clients' future through cutting-edge tech and certified processes."
        },
        stats: {
          experience: "Years of Experience",
          projects: "Completed Projects",
          m2: "Built M2",
          specialists: "Specialists"
        },
        features: {
          objective: {
            title: "Our Objective",
            text: "To lead the construction market through <strong>constant innovation</strong> and exceeding expectations."
          },
          values: {
            title: "Solid Values",
            text: "We base our success on <strong>operational transparency</strong> and absolute respect for deadlines."
          }
        }
      },
      services: {
        viviendas: {
          title: "Residential Housing",
          desc: "Design and construction of custom homes with high-end standards and thermal comfort."
        },
        obras: {
          title: "Commercial Works",
          desc: "Development of stores, offices, and logistics centers optimized for workflow."
        },
        gestion: {
          title: "Project Management",
          desc: "Integral construction management, resource optimization, and professional direction."
        },
        mantenimiento: {
          title: "Integral Maintenance",
          desc: "Preventive and corrective services to ensure durability and real estate value."
        }
      },
      services_section: {
        tag: "Specialties",
        title1: "Integrated",
        title2: "Disciplines",
        items: {
          res: { 
            title: "Residential Architecture", 
            tag: "Housing", 
            desc: "We design unique homes combining aesthetics, functionality, and comfort.",
            areas: ["Custom Design", "Sustainability", "Interior Design"]
          },
          com: { 
            title: "Commercial Developments", 
            tag: "Corporate", 
            desc: "Spaces designed to enhance brand identity and user experience.",
            areas: ["Corporate", "Retail", "Hospitality"]
          },
          ing: { 
            title: "Structural Engineering", 
            tag: "Technical", 
            desc: "Safe solutions with advanced calculations and code compliance.",
            areas: ["Calculations", "Concrete", "Reinforcements"]
          },
          ind: { 
            title: "Industrial Construction", 
            tag: "Logistics", 
            desc: "Facilities adapted to efficient production and large-scale needs.",
            areas: ["Warehouses", "Plants", "Infrastructure"]
          },
          rem: { 
            title: "Remodeling", 
            tag: "Renovations", 
            desc: "Transforming existing spaces by adapting them to new functional needs.",
            areas: ["Renovation", "Extensions", "Modernization"]
          },
          dir: { 
            title: "Project Management", 
            tag: "Management", 
            desc: "Rigorous technical supervision to ensure quality, costs, and deadlines.",
            areas: ["Supervision", "Quality", "Planning"]
          },
          urb: { 
            title: "Urbanization", 
            tag: "Urban Planning", 
            desc: "Development of urban projects integrated into the community.",
            areas: ["Neighborhoods", "Roads", "Public Spaces"]
          },
          sus: { 
            title: "Sustainability", 
            tag: "Eco", 
            desc: "Energy efficiency techniques and low-impact materials.",
            areas: ["Bioclimatic", "Renewables", "Eco-Materials"]
          }
        }
      },
      testimonials: {
        title: "Success",
        subtitle: "Stories",
        items: [
          { name: "Maria Gonzalez", text: "We were very pleased with the work. They met all deadlines.", project: "Olivos Residence" },
          { name: "Carlos Fernandez", text: "Professionalism and commitment throughout the process.", project: "Commercial Store" },
          { name: "Laura Martinez", text: "The team was very responsible and detail-oriented. Excellent.", project: "Modern Extension" },
          { name: "Javier Lopez", text: "They transformed our idea into a solid reality exceeding expectations.", project: "Industrial Plant" }
        ]
      },
      faq: {
        title: "Technical",
        subtitle: "Queries",
        items: [
          { q: "How long for a quote?", a: "We deliver a detailed quote within 48 to 72 business hours." },
          { q: "Do you offer warranty?", a: "Yes, 10-year structural warranty certified by contract." },
          { q: "Turnkey projects?", a: "We offer turnkey modality or execution with client materials." },
          { q: "Deadlines?", a: "We use digital schedules for weekly tracking." }
        ]
      },
      projects_section: {
  title1: "Featured",
  title2: "Works",
  desc: "Cutting-edge architecture designed to endure and transform environments.",
  load_more: "Discover more projects",
  back: "BACK TO PORTFOLIO",
  filters: {
    all: "All",
    res: "Residential",
    com: "Commercial",
    ind: "Industrial"
  },
  specs: {
    location: "LOCATION",
    surface: "SURFACE",
    year: "YEAR"
  }
},
common: {
  close: "CLOSE"
},
      footer: {
        description: "Precision engineering leaders. Raising industry standards through technological transparency.",
        contactTitle: "Headquarters",
        address: "Design District, Arq 10 Building, CABA",
        newsletterDesc: "Subscribe to receive project reports and tech news.",
        certified: "CERTIFIED QUALITY"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  });

export default i18n;