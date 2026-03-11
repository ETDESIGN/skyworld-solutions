import { useState, useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Complete Translation Dictionary
const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Savoir-Faire',
      quality: 'Quality',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      headline: 'Precision Engineering & Manufacturing from Prototype to Production',
      subheadline: 'Innovative mechanical solutions, 5-axis prototyping, and rigorous quality control to European standards.',
      ctaPrimary: 'Explore Our Savoir-Faire',
      ctaSecondary: 'Contact Engineering Team',
    },
    services: {
      title: 'Our Expertise',
      subtitle: 'From concept to delivery, we provide comprehensive mechanical engineering and manufacturing solutions.',
      cards: {
        process: {
          title: 'Process & Study',
          desc: 'Engineering analysis and budget optimization. Our methods team develops efficient manufacturing processes tailored to your constraints.',
        },
        prototyping: {
          title: '5-Axis Prototyping',
          desc: 'Advanced CNC machining with 5-axis capabilities. Rapid prototyping for complex geometries with micron-level precision.',
        },
        fabrication: {
          title: 'Fabrication',
          desc: 'Cutting, stamping tools, and assembly to European standards. Complete production with strict quality supervision.',
        },
        logistics: {
          title: 'Global Logistics',
          desc: 'Fast, secure worldwide delivery. From our production floor to your facility with full tracking and documentation.',
        },
      },
    },
    about: {
      title: 'About Us',
      headline: 'Commitment to Quality Since 2010',
      description: 'Skyworld Solutions is an international company based in Hong Kong and China, serving clients across France, Europe, Asia, and Australia. We deliver innovative mechanical solutions with a focus on efficiency and precision.',
      standards: 'Our engineers and quality controllers strictly supervise all production lines to ensure compliance with European standards.',
      packaging: 'We prioritize environmentally friendly packaging solutions to minimize our ecological footprint.',
      stats: {
        years: 'Years Experience',
        clients: 'Global Clients',
        countries: 'Countries Served',
      },
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to start your project? Contact our engineering team for a consultation.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...',
      },
      locations: {
        hk: {
          title: 'SWS Hong Kong',
          address: '10/F., Kwan Chart Tower, 6 Tonnochy Road, Wanchai, Hong Kong',
          phone: '(+852) 3428 3032',
          email: 'services-prestations@skyworld-solutions.com',
        },
        china: {
          title: 'SWS China',
          address: 'Manufacturing & Production Hub, Mainland China',
          desc: 'State-of-the-art facilities for CNC machining, prototyping, and assembly operations.',
        },
      },
    },
    footer: {
      copyright: '© 2024 Skyworld Solutions. All rights reserved.',
      privacy: 'Privacy Policy',
      tagline: 'Precision Engineering · Global Reach',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Savoir-Faire',
      quality: 'Qualité',
      about: 'Qui Sommes-Nous',
      contact: 'Contact',
    },
    hero: {
      headline: 'Ingénierie de Précision & Fabrication du Prototype à la Production',
      subheadline: 'Solutions mécaniques innovantes, prototypage 5 axes et contrôle qualité rigoureux aux normes européennes.',
      ctaPrimary: 'Découvrir Notre Savoir-Faire',
      ctaSecondary: 'Contacter l\'Équipe d\'Ingénierie',
    },
    services: {
      title: 'Notre Expertise',
      subtitle: 'Du concept à la livraison, nous fournissons des solutions complètes d\'ingénierie et de fabrication mécanique.',
      cards: {
        process: {
          title: 'Processus & Étude',
          desc: 'Analyse d\'ingénierie et optimisation budgétaire. Notre bureau des méthodes développe des processus de fabrication efficaces adaptés à vos contraintes.',
        },
        prototyping: {
          title: 'Prototypage 5 Axes',
          desc: 'Usinage CNC avancé avec capacités 5 axes. Prototypage rapide pour géométries complexes avec une précision au micron.',
        },
        fabrication: {
          title: 'Fabrication',
          desc: 'Découpe, outils d\'emboutissage et assemblage aux normes européennes. Production complète avec supervision qualité stricte.',
        },
        logistics: {
          title: 'Logistique Mondiale',
          desc: 'Livraison mondiale rapide et sécurisée. De notre chaîne de production à votre site avec suivi et documentation complets.',
        },
      },
    },
    about: {
      title: 'À Propos',
      headline: 'Engagement Qualité Depuis 2010',
      description: 'Skyworld Solutions est une société internationale basée à Hong Kong et en Chine, desservant des clients en France, Europe, Asie et Australie. Nous délivrons des solutions mécaniques innovantes axées sur l\'efficacité et la précision.',
      standards: 'Nos ingénieurs et contrôleurs qualité supervisent strictement toutes les lignes de production pour garantir la conformité aux normes européennes.',
      packaging: 'Nous privilégions les solutions d\'emballage respectueuses de l\'environnement pour minimiser notre empreinte écologique.',
      stats: {
        years: 'Années d\'Expérience',
        clients: 'Clients Mondiaux',
        countries: 'Pays Desservis',
      },
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Prêt à démarrer votre projet ? Contactez notre équipe d\'ingénierie pour une consultation.',
      form: {
        name: 'Votre Nom',
        email: 'Votre Email',
        message: 'Votre Message',
        submit: 'Envoyer le Message',
        sending: 'Envoi en cours...',
      },
      locations: {
        hk: {
          title: 'SWS Hong Kong',
          address: '10/F., Kwan Chart Tower, 6 Tonnochy Road, Wanchai, Hong Kong',
          phone: '(+852) 3428 3032',
          email: 'services-prestations@skyworld-solutions.com',
        },
        china: {
          title: 'SWS Chine',
          address: 'Centre de Fabrication & Production, Chine Continentale',
          desc: 'Installations de pointe pour l\'usinage CNC, le prototypage et les opérations d\'assemblage.',
        },
      },
    },
    footer: {
      copyright: '© 2024 Skyworld Solutions. Tous droits réservés.',
      privacy: 'Politique de Confidentialité',
      tagline: 'Ingénierie de Précision · Rayonnement Mondial',
    },
  },
};

function App() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load for smooth entrance
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const currentTranslations = translations[language];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        translations={currentTranslations}
      />
      <main>
        <Hero translations={currentTranslations} />
        <Services translations={currentTranslations} />
        <About translations={currentTranslations} />
        <Contact translations={currentTranslations} />
      </main>
      <Footer translations={currentTranslations} />
    </div>
  );
}

export default App;
