import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, CheckCircleIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { useForm, ValidationError } from '@formspree/react';

// LinkedIn profile images (use as <img src={...} />)
const TEAM = [
  {
    name: 'Ivan Goncharov',
    title: 'AM Materials expert',
    img: process.env.PUBLIC_URL + '/Ivan.jpg',
    linkedin: 'https://www.linkedin.com/in/ivan-goncharov-0685a0119/',
    bio: 'Materials scientist with over 10 years of experience in powder metallurgy, alloy development and additive manufacturing. Dual PhD in the design of high-performance materials for extreme environments, such as cemented carbides, high-temperature alloys, functional materials. CALPHAD simulation, Binder Jetting, Laser Bed Powder Bed Fusion, Plasma Spheroidizaion, Ultrasonic Atomization, Spark Plasma Sintering. 20+ Scientific publications. Led and worked on several multidisciplinary international projects from material design to process validation.'
  },
  {
    name: 'Benjamin Meier-Leeb',
    title: 'AM Process expert',
    img: process.env.PUBLIC_URL + '/Ben.jpg',
    linkedin: 'https://www.linkedin.com/in/benjamin-meier-leeb-a0406291/',
    bio: 'Mechanical engineer with 10+ years of experience in additive manufacturing process development, material and powder behavior characterization across research institutes and industry. PhD in Laser Powder Based Fusion with wide exposure on titanium alloys, special steels, aluminium alloys and functional materials. CAD, Laser and Electron Beam Powder Bed Fusion, Laser Directed Energy Deposition. 15+ scientific publications. Led and contributed to numerous European R&D projects in Austria and Italy.'
  },
  {
    name: 'Michele Zanetti',
    title: 'AM Machines expert',
    img: process.env.PUBLIC_URL + '/Michele photo.png',
    linkedin: 'https://www.linkedin.com/in/michele-zanetti-721586188/',
    bio: 'Application and Service Engineer with over 5 years of experience in industrial additive manufacturing. Laser Powder Bed Fusion, Stereolithography, Selective Laser Sintering, Fused Filament Fabrication. Vast hands-on experience with hardware from installation to maintenance and training enables to form expert unbiased opinions and technical in-field depth helps to guide customers with technology transfer.'
  },
];

const SERVICES = [
  {
    title: 'Alloy Development',
    desc: 'Custom alloys and material solutions for advanced AM applications.',
    img: process.env.PUBLIC_URL + '/powder icon.png',
  },
  {
    title: 'Part/Component Design for AM',
    desc: 'Optimized design for manufacturability and performance in AM.',
    img: process.env.PUBLIC_URL + '/design icon.png',
  },
  {
    title: 'Engineering Consulting',
    desc: 'Expert advice on AM processes, materials, and implementation.',
    img: process.env.PUBLIC_URL + '/consulting icon.png',
  },
  {
    title: 'Prototyping & Validation',
    desc: 'Rapid prototyping and thorough validation for industrial needs.',
    img: process.env.PUBLIC_URL + '/prototyping icon.png',
  },
  {
    title: 'Small Batch Production',
    desc: 'Efficient, high-quality production of small series components.',
    img: process.env.PUBLIC_URL + '/small batch icon.png',
  },
  {
    title: 'Documentation & Compliance',
    desc: 'Comprehensive documentation and regulatory support.',
    img: process.env.PUBLIC_URL + '/documentation icon.png',
  },
];

const PROJECTS = [
  {
    title: 'Additive Manufacturing of WC-12Co',
    useCase: true,
    bullets: [
      'Near-net-shape cemented carbide parts with more than <b>99% density</b>',
      'Hardness more than <b>1200 HV<sub>100</sub></b> and TRS higher than <b>2200 MPa</b>',
      'Unlocks flexible tooling and wear part designs, matching industrial standard performance.'
    ],
    img: process.env.PUBLIC_URL + '/Use case 1 WC-12Co.png',
    tech: 'Cemented Carbide, BJAM',
  },
  {
    title: 'WC-HEA Cemented Carbide',
    useCase: true,
    bullets: [
      'Development of CALPHAD designed sustainable cobalt-free high entropy alloy',
      'Enhanced hardness, higher than <b>1900 HV<sub>100</sub></b>.',
      'Next-gen cemented carbide with fine grained microstructure due to grain growth inhibition and lower cost by using recycled feedstock'
    ],
    img: process.env.PUBLIC_URL + '/Use case 2 WC-HEA.png',
    tech: 'CALPHAD, Ultrasonic atomization',
  },
  {
    title: 'Nb-based alloy for Extreme Temperature',
    useCase: true,
    bullets: [
      'Spherical powder of complex Nb-Si-Al-Ti-Cr-Zr-Fe-Hf-Mo alloy developed for additive manufacturing',
      'Engineered for aerospace and energy application. <b>760 MPa</b> @ 1200°С; <b>380 MPa</b> @ 1300°С',
      'Full-cycle workflow from alloy design to validation with L-PBF and SPS'
    ],
    img: process.env.PUBLIC_URL + '/Use case 3 Nb-Si.png',
    tech: 'Nb-Si, Plasma Spheroidization, L-PBF',
  },
  {
    title: 'Recycled Powder for Sustainable Additive Manufacturing',
    useCase: true,
    bullets: [
      'Recycling machining waste into AM-ready powders, <b>95%+ sphericity</b>',
      'Up to <b>80%</b> reduction in feedstock cost for high-alloy steel',
      'Verified by L-PBF and L-DED: High-strength, improved ductility after heat treatment'
    ],
    img: process.env.PUBLIC_URL + '/Use case 4 Recycling chips.png',
    tech: 'Recycling; L-PBF, L-DED',
  },
];

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
  { code: 'de', label: 'DE' },
];

const TRANSLATIONS = {
  en: {
    hero: {
      tagline: 'Additive Manufacturing Solutions for Industry',
      subline: 'Driven by honesty and expertise',
      cta: 'Start a Project',
    },
    services: 'Our Services',
    projects: 'Projects & Portfolio',
    about: 'About Us',
    contact: 'Contact Us',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    consent: 'I consent to having this website store my submitted information so they can respond to my inquiry.',
    submit: 'Submit',
    thankyou: 'Thank you for contacting us!',
    required: 'Required',
    invalidEmail: 'Invalid email address',
    consentRequired: 'Consent is required',
    cookies: 'This website uses cookies to ensure you get the best experience. ',
    accept: 'Accept',
    privacy: 'Privacy Policy',
    impressum: 'Impressum',
    comingSoon: 'Coming soon',
    team: [
      {
        name: 'Ivan Goncharov',
        title: 'AM Materials expert',
        bio: 'Materials scientist with over 10 years of experience in powder metallurgy, alloy development and additive manufacturing. Dual PhD in the design of high-performance materials for extreme environments, such as cemented carbides, high-temperature alloys, functional materials. CALPHAD simulation, Binder Jetting, Laser Bed Powder Bed Fusion, Plasma Spheroidizaion, Ultrasonic Atomization, Spark Plasma Sintering. 20+ Scientific publications. Led and worked on several multidisciplinary international projects from material design to process validation.'
      },
      {
        name: 'Benjamin Meier-Leeb',
        title: 'AM Process expert',
        bio: 'Mechanical engineer with 10+ years of experience in additive manufacturing process development, material and powder behavior characterization across research institutes and industry. PhD in Laser Powder Based Fusion with wide exposure on titanium alloys, special steels, aluminium alloys and functional materials. CAD, Laser and Electron Beam Powder Bed Fusion, Laser Directed Energy Deposition. 15+ scientific publications. Led and contributed to numerous European R&D projects in Austria and Italy.'
      },
      {
        name: 'Michele Zanetti',
        title: 'AM Machines expert',
        bio: 'Application and Service Engineer with over 5 years of experience in industrial additive manufacturing. Laser Powder Bed Fusion, Stereolithography, Selective Laser Sintering, Fused Filament Fabrication. Vast hands-on experience with hardware from installation to maintenance and training enables to form expert unbiased opinions and technical in-field depth helps to guide customers with technology transfer.'
      }
    ],
    servicesList: [
      {
        title: 'Alloy Development',
        desc: 'Custom alloys and material solutions for advanced AM applications.'
      },
      {
        title: 'Part/Component Design for AM',
        desc: 'Optimized design for manufacturability and performance in AM.'
      },
      {
        title: 'Engineering Consulting',
        desc: 'Expert advice on AM processes, materials, and implementation.'
      },
      {
        title: 'Prototyping & Validation',
        desc: 'Rapid prototyping and thorough validation for industrial needs.'
      },
      {
        title: 'Small Batch Production',
        desc: 'Efficient, high-quality production of small series components.'
      },
      {
        title: 'Documentation & Compliance',
        desc: 'Comprehensive documentation and regulatory support.'
      }
    ],
    projectsList: [
      {
        title: 'Additive Manufacturing of WC-12Co',
        useCase: true,
        bullets: [
          'Near-net-shape cemented carbide parts with more than <b>99% density</b>',
          'Hardness more than <b>1200 HV<sub>100</sub></b> and TRS higher than <b>2200 MPa</b>',
          'Unlocks flexible tooling and wear part designs, matching industrial standard performance.'
        ],
        tech: 'Cemented Carbide, BJAM'
      },
      {
        title: 'WC-HEA Cemented Carbide',
        useCase: true,
        bullets: [
          'Development of CALPHAD designed sustainable cobalt-free high entropy alloy',
          'Enhanced hardness, higher than <b>1900 HV<sub>100</sub></b>.',
          'Next-gen cemented carbide with fine grained microstructure due to grain growth inhibition and lower cost by using recycled feedstock'
        ],
        tech: 'CALPHAD, Ultrasonic atomization'
      },
      {
        title: 'Nb-based alloy for Extreme Temperature',
        useCase: true,
        bullets: [
          'Spherical powder of complex Nb-Si-Al-Ti-Cr-Zr-Fe-Hf-Mo alloy developed for additive manufacturing',
          'Engineered for aerospace and energy application. <b>760 MPa</b> @ 1200°С; <b>380 MPa</b> @ 1300°С',
          'Full-cycle workflow from alloy design to validation with L-PBF and SPS'
        ],
        tech: 'Nb-Si, Plasma Spheroidization, L-PBF'
      },
      {
        title: 'Recycled Powder for Sustainable Additive Manufacturing',
        useCase: true,
        bullets: [
          'Recycling machining waste into AM-ready powders, <b>95%+ sphericity</b>',
          'Up to <b>80%</b> reduction in feedstock cost for high-alloy steel',
          'Verified by L-PBF and L-DED: High-strength, improved ductility after heat treatment'
        ],
        tech: 'Recycling; L-PBF, L-DED'
      }
    ],
  },
  it: {
    hero: {
      tagline: 'Soluzioni di additive\u202Fmanufacturing per l\u2019industria',
      subline: 'Con integrità e competenza',
      cta: 'Avvia un progetto',
    },
    services: 'I nostri servizi',
    projects: 'Progetti & Portfolio',
    about: 'Chi siamo',
    contact: 'Contattaci',
    name: 'Nome',
    email: 'Email',
    message: 'Messagio',
    consent: 'Acconsento che questo sito web memorizzi le mie informazioni inviate per rispondere alla mia richiesta',
    submit: 'Invia',
    thankyou: 'Grazie per averci contattato!',
    required: 'Obbligatorio',
    invalidEmail: 'Indirizzo email non valido',
    consentRequired: 'Il consenso è obbligatorio',
    cookies: 'Questo sito utilizza i cookie per offrirti la migliore esperienza possibile. Utilizziamo cookie tecnici necessari e, previo consenso, cookie analitici e di marketing. Puoi accettare tutti i cookie, solo quelli necessari o personalizzare le tue preferenze.',
    accept: 'Accetta tutti',
    privacy: 'Privacy Policy',
    impressum: 'Impressum',
    comingSoon: 'In arrivo',
    onlyNecessary: 'Solo necessari',
    customize: 'Personalizza',
    savePreferences: 'Salva preferenze',
    team: [
      {
        name: 'Ivan Goncharov',
        title: 'Esperto in Materiali per Manifattura Additiva',
        bio: 'Scienziato dei materiali con oltre 10 anni di esperienza nella metallurgia delle polveri, nello sviluppo di leghe e nella manifattura additiva. Dottorato con doppio titolo nella progettazione di materiali ad alte prestazioni per ambienti estremi, tra cui carburi cementati, leghe per alte temperature e materiali funzionali. Esperto in simulazione CALPHAD, Binder Jetting, Laser Powder Bed Fusion, sferoidizzazione al plasma, atomizzazione ultrasonica e sinterizzazione al plasma (SPS). Autore di oltre 20 pubblicazioni scientifiche. Ha coordinato e partecipato a numerosi progetti internazionali multidisciplinari, dalla progettazione dei materiali fino alla validazione del processo.'
      },
      {
        name: 'Benjamin Meier-Leeb',
        title: 'Esperto di Processi di Manifattura Additiva',
        bio: 'Ingegnere meccanico con oltre 10 anni di esperienza nello sviluppo dei processi di manifattura additiva e nella caratterizzazione dei materiali e del comportamento delle polveri, sia in ambito accademico che industriale. Dottorato in Laser Powder Based Fusion, con ampia esperienza su leghe di titanio, acciai speciali, leghe di alluminio e materiali funzionali. Competenze in CAD, Laser e Electron Beam Powder Bed Fusion, Laser Directed Energy Deposition. Autore di oltre 15 pubblicazioni scientifiche. Ha coordinato e contribuito a numerosi progetti europei di ricerca e sviluppo in Austria e in Italia.'
      },
      {
        name: 'Michele Zanetti',
        title: 'Esperto di Macchine per la Manifattura Additiva',
        bio: 'Application and Service Engineer con oltre 5 anni di esperienza nella manifattura additiva industriale. Competenze in Laser Powder Bed Fusion, Stereolitografia, Selective Laser Sintering e Fused Filament Fabrication. Vasta esperienza pratica con l’hardware, dall’installazione alla manutenzione e alla formazione, che consente di offrire valutazioni tecniche imparziali e supportare i clienti nel trasferimento tecnologico grazie a una solida competenza operativa sul campo.'
      }
    ],
    servicesList: [
      {
        title: 'Sviluppo Leghe Metalliche',
        desc: 'Soluzioni su misura per la progettazione e l’ottimizzazione di leghe avanzate per applicazioni AM.'
      },
      {
        title: 'Design di componenti ottimizzati per AM',
        desc: 'Progettazione ottimizzata per la producibilità, la resistenza e la riduzione del peso nei processi additivi.'
      },
      {
        title: 'Consulenza Ingegneristica',
        desc: 'Supporto tecnico esperto su processi AM, materiali e implementazione industriale.'
      },
      {
        title: 'Prototipazione e Validazione',
        desc: 'Sviluppo rapido di prototipi e validazione tecnica secondo gli standard industriali.'
      },
      {
        title: 'Produzione in Piccole Serie',
        desc: 'Produzione efficiente e di alta qualità per piccoli lotti e componenti in serie.'
      },
      {
        title: 'Documentazione e Conformità',
        desc: 'Documentazione tecnica completa e supporto alla conformità normativa.'
      }
    ],
    projectsList: [
      {
        title: 'Produzione Additiva di WC-12Co',
        useCase: true,
        bullets: [
          'Parti in carburo cementato quasi a forma finita con densità superiore al <b>99%</b>.',
          'Durezza oltre <b>1200 HV<sub>100</sub></b> e TRS superiore a <b>2200 MPa</b>.',
          'Permette design flessibili per utensili e parti antiusura, con prestazioni equivalenti agli standard industriali.'
        ],
        tech: 'Cemented Carbide, BJAM'
      },
      {
        title: 'WC-HEA Cemented Carbide',
        useCase: true,
        bullets: [
          'Sviluppo di una lega ad alta entropia senza cobalto sostenibile, progettata con CALPHAD.',
          'Durezza superiore a <b>1900 HV<sub>100</sub></b>.',
          'Carburo cementato di nuova generazione, con microstruttura a grana fine grazie all’inibizione della crescita dei grani e a costi ridotti tramite l’uso di materie prime riciclate.'
        ],
        tech: 'CALPHAD, Ultrasonic atomization'
      },
      {
        title: 'Lega a base di Nb per temperature estreme',
        useCase: true,
        bullets: [
          'Polvere sferica sviluppata di lega complessa Nb-Si-Al-Ti-Cr-Zr-Fe-Hf-Mo per la manifattura additiva',
          'Progettata per applicazioni aerospaziali ed energetiche: <b>760 MPa</b> a 1200 °C, <b>380 MPa</b> a 1300 °C',
          'Workflow completo: dalla progettazione della lega alla validazione con L-PBF e SPS'
        ],
        tech: 'Nb-Si, Plasma Spheroidization, L-PBF'
      },
      {
        title: 'Polveri riciclate per una manifattura additiva sostenibile',
        useCase: true,
        bullets: [
          'Riciclo di scarti di lavorazione in polveri sferiche pronte per la manifattura additiva (sfericità > <b>95%</b>)',
          'Riduzione dei costi della materia prima fino all’<b>80%</b> per acciai altolegati',
          'Prestazioni verificate con L-PBF e L-DED: elevata resistenza e duttilità migliorata dopo trattamento termico'
        ],
        tech: 'Recycling; L-PBF, L-DED'
      }
    ],
  },
  de: {
    hero: {
      tagline: 'Additive Manufacturing Lösungen für die Industrie',
      subline: 'Angetrieben von Ehrlichkeit und Fachwissen',
      cta: 'Projekt starten',
    },
    services: 'Unsere Dienstleistungen',
    projects: 'Projekte & Portfolio',
    about: 'Über uns',
    contact: 'Kontaktieren Sie uns',
    name: 'Name',
    email: 'E-Mail',
    message: 'Nachricht',
    consent: 'Ich stimme zu, dass diese Website meine übermittelten Informationen speichert, um auf meine Anfrage zu antworten.',
    submit: 'Absenden',
    thankyou: 'Vielen Dank für Ihre Kontaktaufnahme!',
    required: 'Erforderlich',
    invalidEmail: 'Ungültige E-Mail-Adresse',
    consentRequired: 'Zustimmung erforderlich',
    cookies: 'Diese Website verwendet Cookies, um Ihnen die beste Erfahrung zu bieten.',
    accept: 'Akzeptieren',
    privacy: 'Datenschutzerklärung',
    impressum: 'Impressum',
    comingSoon: 'Demnächst verfügbar',
    team: [
      {
        name: 'Ivan Goncharov',
        title: 'AM Materials expert',
        bio: 'Materials scientist with over 10 years of experience in powder metallurgy, alloy development and additive manufacturing. Dual PhD in the design of high-performance materials for extreme environments, such as cemented carbides, high-temperature alloys, functional materials. CALPHAD simulation, Binder Jetting, Laser Bed Powder Bed Fusion, Plasma Spheroidizaion, Ultrasonic Atomization, Spark Plasma Sintering. 20+ Scientific publications. Led and worked on several multidisciplinary international projects from material design to process validation.'
      },
      {
        name: 'Benjamin Meier-Leeb',
        title: 'AM Process expert',
        bio: 'Mechanical engineer with 10+ years of experience in additive manufacturing process development, material and powder behavior characterization across research institutes and industry. PhD in Laser Powder Based Fusion with wide exposure on titanium alloys, special steels, aluminium alloys and functional materials. CAD, Laser and Electron Beam Powder Bed Fusion, Laser Directed Energy Deposition. 15+ scientific publications. Led and contributed to numerous European R&D projects in Austria and Italy.'
      },
      {
        name: 'Michele Zanetti',
        title: 'AM Machines expert',
        bio: 'Application and Service Engineer with over 5 years of experience in industrial additive manufacturing. Laser Powder Bed Fusion, Stereolithography, Selective Laser Sintering, Fused Filament Fabrication. Vast hands-on experience with hardware from installation to maintenance and training enables to form expert unbiased opinions and technical in-field depth helps to guide customers with technology transfer.'
      }
    ],
    servicesList: [
      {
        title: 'Legierungsentwicklung',
        desc: 'Maßgeschneiderte Legierungen und Materiallösungen für fortschrittliche AM-Anwendungen.'
      },
      {
        title: 'Bauteil-/Komponentendesign für AM',
        desc: 'Optimiertes Design für Herstellbarkeit und Leistung in der AM.'
      },
      {
        title: 'Ingenieurberatung',
        desc: 'Fachkundige Beratung zu AM-Prozessen, Materialien und Implementierung.'
      },
      {
        title: 'Prototyping & Validierung',
        desc: 'Schnelles Prototyping und gründliche Validierung für industrielle Anforderungen.'
      },
      {
        title: 'Kleinserienfertigung',
        desc: 'Effiziente, hochwertige Produktion von Kleinserienkomponenten.'
      },
      {
        title: 'Dokumentation & Compliance',
        desc: 'Umfassende Dokumentation und regulatorische Unterstützung.'
      }
    ],
    projectsList: [
      {
        title: 'Additive Fertigung von WC-12Co',
        useCase: true,
        bullets: [
          'Hartmetallteile in Near-Net-Shape mit mehr als <b>99% Dichte</b>',
          'Härte über <b>1200 HV<sub>100</sub></b> und TRS über <b>2200 MPa</b>',
          'Ermöglicht flexible Werkzeug- und Verschleißteildesigns, die den Industriestandards entsprechen.'
        ],
        tech: 'Hartmetall, BJAM'
      },
      {
        title: 'WC-HEA Hartmetall',
        useCase: true,
        bullets: [
          'Entwicklung einer nachhaltigen, kobaltfreien Hochentropielegierung nach CALPHAD-Design',
          'Erhöhte Härte, über <b>1900 HV<sub>100</sub></b>.',
          'Next-Gen-Hartmetall mit feinkörniger Mikrostruktur durch Kornwachstumshemmung und geringere Kosten durch recycelten Rohstoff.'
        ],
        tech: 'CALPHAD, Ultraschall-Atomisierung'
      },
      {
        title: 'Nb-basierte Legierung für extreme Temperaturen',
        useCase: true,
        bullets: [
          'Sphärisches Pulver aus komplexer Nb-Si-Al-Ti-Cr-Zr-Fe-Hf-Mo-Legierung für die additive Fertigung entwickelt',
          'Für Luft- und Raumfahrt sowie Energieanwendungen entwickelt. <b>760 MPa</b> @ 1200°С; <b>380 MPa</b> @ 1300°С',
          'Kompletter Workflow vom Legierungsdesign bis zur Validierung mit L-PBF und SPS'
        ],
        tech: 'Nb-Si, Plasmasphäroidisierung, L-PBF'
      },
      {
        title: 'Recyceltes Pulver für nachhaltige additive Fertigung',
        useCase: true,
        bullets: [
          'Recycling von Bearbeitungsabfällen zu AM-fähigen Pulvern, <b>über 95% Sphärizität</b>',
          'Bis zu <b>80%</b> Kosteneinsparung beim Rohmaterial für hochlegierten Stahl',
          'Verifiziert durch L-PBF und L-DED: hohe Festigkeit, verbesserte Duktilität nach Wärmebehandlung'
        ],
        tech: 'Recycling; L-PBF, L-DED'
      }
    ],
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
 
function App() {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiesNecessary, setCookiesNecessary] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  // Add Formspree hook
  const [state, handleSubmit] = useForm("mwpbyqnj");

  // Scroll to contact form
  const handleScrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  // Language switcher
  function handleLangSwitch(code) {
    setLang(code);
  }

  // Cookie consent handlers
  function handleAcceptAllCookies() {
    setCookiesAccepted(true);
    setCookiesNecessary(false);
    setShowCustomize(false);
    // Here you would enable all cookies (analytics, marketing, etc.)
  }
  function handleOnlyNecessaryCookies() {
    setCookiesAccepted(false);
    setCookiesNecessary(true);
    setShowCustomize(false);
    // Here you would only enable strictly necessary cookies
  }
  function handleCustomizeCookies() {
    setShowCustomize(true);
  }
  function handleCloseCustomize() {
    setShowCustomize(false);
  }

  // Set <html lang> dynamically for accessibility and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="font-sans bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      {/* Header / Hero Section */}
      <header className="w-full bg-gray-100 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={process.env.PUBLIC_URL + '/logo without font.png'} alt="Alfonso Additive Logo" className="h-8 w-auto" />
            <span className="text-3xl font-bold tracking-tight text-primary">Alfonso Additive</span>
          </div>
          <div className="flex items-center gap-2">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                className={classNames(
                  'px-2 py-1 rounded text-sm font-semibold transition',
                  lang === l.code ? 'bg-primary text-white' : 'hover:bg-gray-100 text-primary'
                )}
                onClick={() => handleLangSwitch(l.code)}
                aria-current={lang === l.code ? 'page' : undefined}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center text-center gap-6">
          <div className="flex w-full gap-0 md:gap-0">
            {TEAM.map((member, idx) => (
              <div key={member.name} className="flex-1 flex flex-col items-center">
                <img
                  src={TEAM[idx]?.img}
                  alt={`${member.name}, ${member.title}`}
                  className="w-24 h-24 rounded-full object-cover border border-primary shadow mb-2"
                  onError={e => (e.target.src = 'https://placehold.co/96x96?text=Photo')}
                />
                <span className="font-semibold text-xl md:text-2xl text-primary mt-2">{member.name}</span>
                <span className="text-primary text-base md:text-lg">{member.title}</span>
              </div>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mt-6">{t.hero.tagline}</h1>
          <p className="text-lg text-primary">{t.hero.subline}</p>
          <button
            className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary-dark transition"
            onClick={handleScrollToContact}
          >
            {t.hero.cta}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4">
        {/* Services Section */}
        <section className="py-16" id="services">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.services}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {(t.servicesList || SERVICES).map((s, i) => (
              <div key={s.title} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition">
                {SERVICES[i]?.img && <img src={SERVICES[i].img} alt={s.title} className="h-10 w-10 mb-4" />}
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16" id="projects">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.projects}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {(t.projectsList || PROJECTS).map((p, i) => (
              <div key={p.title} className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition min-h-[420px]">
                {/* Show use case with bullets and rich text if present */}
                {p.useCase ? (
                  <>
                    <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                    <ul className="text-gray-600 text-sm mb-4 list-disc list-inside text-left">
                      {p.bullets.map((b, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: b }} />
                      ))}
                    </ul>
                    {p.tech && (
                      <div className="w-full flex justify-center mb-2">
                        <span className="inline-block bg-gray-100 text-primary text-xs px-3 py-1 rounded-full">{p.tech}</span>
                      </div>
                    )}
                    {PROJECTS[i]?.img && (
                      <div className="w-full flex justify-center">
                        <img src={PROJECTS[i].img} alt={`Project: ${p.title}`} className="h-48 w-auto object-contain rounded mt-0 mb-1" style={{ marginTop: 0 }} />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {PROJECTS[i]?.img ? (
                      <div className="w-full flex justify-center">
                        <img src={PROJECTS[i].img} alt={`Project: ${p.title}`} className="h-32 w-auto object-contain mb-4 rounded" />
                      </div>
                    ) : (
                      <CubeTransparentIcon className="h-16 w-16 text-gray-200 mb-4" />
                    )}
                    <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{p.desc}</p>
                    <span className="inline-block bg-gray-100 text-primary text-xs px-3 py-1 rounded-full">{p.tech}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16" id="about">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.about}</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {(t.team || TEAM).map((member, idx) => (
              <div key={member.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100 hover:shadow-lg transition w-full md:w-1/3">
                <img
                  src={TEAM[idx]?.img}
                  alt={`${member.name}, ${member.title}`}
                  className="w-24 h-24 rounded-full object-cover border border-primary shadow mb-2"
                  onError={e => (e.target.src = 'https://placehold.co/96x96?text=Photo')}
                />
                <span className="font-semibold text-lg text-primary text-center w-full">{member.name}</span>
                <span className="text-primary text-sm mb-4 text-center w-full">{member.title}</span>
                {(member.name === 'Ivan Goncharov' || member.name === 'Benjamin Meier-Leeb' || member.name === 'Michele Zanetti') ? (
                  <div className="text-gray-600 text-sm mb-2 text-justify w-full flex flex-col justify-between" style={{ minHeight: '210px' }}>
                    {member.bio.split(/(?<=\.) /).filter(Boolean).map((sentence, i) => (
                      <div key={i} style={{ marginBottom: '1em', textIndent: '2em' }}>{sentence.trim()}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm mb-2 text-center">{member.bio}</p>
                )}
                {member.name === 'Michele Zanetti' ? null : (
                  <a href={TEAM[idx]?.linkedin || member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 text-primary hover:underline flex items-center gap-1">
                    <img src={process.env.PUBLIC_URL + '/linkedin logo.png'} alt="LinkedIn" className="h-5 w-5 object-contain" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {member.name === 'Michele Zanetti' && (
                  <a href={TEAM[idx]?.linkedin || member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto text-primary hover:underline flex items-center gap-1">
                    <img src={process.env.PUBLIC_URL + '/linkedin logo.png'} alt="LinkedIn" className="h-5 w-5 object-contain" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16" id="contact">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.contact}</h2>
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 border border-gray-100">
            {state.succeeded ? (
              <div className="flex flex-col items-center text-green-600">
                <CheckCircleIcon className="h-12 w-12 mb-2" />
                <div className="text-lg font-semibold mb-2">{t.thankyou}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-1">{t.name} *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-1">{t.email} *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="message" className="block font-semibold mb-1">{t.message} *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm select-none">
                    {t.consent}
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary-dark transition"
                  disabled={state.submitting}
                >
                  {t.submit}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 border-t border-gray-100 mt-8 relative">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center relative min-h-[120px]">
          {/* Left: Contact Links */}
          <div className="flex items-center gap-4 ml-0 md:ml-0">
            <a href="mailto:9670522@gmail.com" className="text-primary hover:no-underline flex items-center mr-4">
              <EnvelopeIcon className="h-5 w-5" />
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/ivan-goncharov-0685a0119/" target="_blank" rel="noopener noreferrer" className="text-primary hover:no-underline flex items-center mr-4">
              <img src={process.env.PUBLIC_URL + '/linkedin logo.png'} alt="LinkedIn" className="h-5 w-5 object-contain" />
              <span>LinkedIn</span>
            </a>
          </div>
          {/* Center: Contact Info */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex flex-col items-center w-full md:w-auto">
            <span>Alfonso Additive 2025</span>
            <span>Via Scalvini, 20158, Milano, Italia</span>
            <span>P.IVA: 14189730964</span>
            <span>Email: 9670522@gmail.com</span>
            <span>PEC: ivan.goncharov@pec.it</span>
          </div>
        </div>
        {/* Cookie Notice */}
        {!(cookiesAccepted || cookiesNecessary) && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow z-50 flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-2">
            <span className="text-gray-700 text-sm flex-1">
              {t.cookies}
              <a href="/cookie-policy" className="text-primary underline ml-1" target="_blank" rel="noopener noreferrer">Learn more</a>
            </span>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-primary text-white rounded font-semibold shadow hover:bg-primary-dark transition"
                onClick={handleAcceptAllCookies}
              >
                {t.accept}
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-primary rounded font-semibold shadow hover:bg-gray-300 transition"
                onClick={handleOnlyNecessaryCookies}
              >
                {t.onlyNecessary || 'Only Necessary'}
              </button>
              <button
                className="px-4 py-2 bg-white text-primary border border-primary rounded font-semibold shadow hover:bg-gray-100 transition"
                onClick={handleCustomizeCookies}
              >
                {t.customize || 'Customize'}
              </button>
            </div>
          </div>
        )}
        {/* Customize Cookies Modal (placeholder) */}
        {showCustomize && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-primary" onClick={handleCloseCustomize}>&times;</button>
              <h3 className="text-lg font-bold mb-4">Customize Cookie Preferences</h3>
              <p className="mb-4 text-sm text-gray-700">Select which types of cookies you want to allow. (This is a placeholder. Implement detailed controls as needed.)</p>
              <div className="flex flex-col gap-2 mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked disabled />
                  Strictly Necessary Cookies (always active)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" disabled />
                  Analytics Cookies
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" disabled />
                  Marketing Cookies
                </label>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded font-semibold shadow hover:bg-primary-dark transition w-full" onClick={handleCloseCustomize}>Save Preferences</button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
