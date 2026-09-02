import { useLocation, useNavigate } from 'react-router-dom';
import Seo from './components/Seo';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Projects from './sections/Projects';
import About from './sections/About';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CtaBand from './components/CtaBand';
import StickyMobileBar from './components/StickyMobileBar';
import { SITE_URL_NO_SLASH, CONTACT_EMAIL } from './utils/site';
import type { Language, Translation } from './i18n/translations';

interface LandingProps {
  language: Language;
  t: Translation;
  onLanguageChange: (lang: Language) => void;
}

export default function Landing({ language, t }: Omit<LandingProps, 'onLanguageChange'>) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Switching language navigates to the equivalent page in the other locale.
  const onLanguageChange = (lang: Language) => {
    if (lang === language) return;
    void navigate(lang === 'fr' ? '/fr' : pathname.replace(/^\/fr/, '') || '/');
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Skyworld Solutions',
    url: `${SITE_URL_NO_SLASH}/`,
    logo: `${SITE_URL_NO_SLASH}/images/SKYWORLD_SOLUTIONS.png`,
    email: CONTACT_EMAIL,
    telephone: '+852 3428 3032',
    foundingDate: '2010',
    description: t.seo.description,
    sameAs: ['https://www.linkedin.com/company/skyworld-solutions/'],
    location: [
      {
        '@type': 'LocalBusiness',
        name: 'Skyworld Solutions — Hong Kong',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '10/F., Kwan Chart Tower, 6 Tonnochy Road, Wanchai',
          addressLocality: 'Hong Kong',
          addressCountry: 'HK',
        },
        telephone: '+852 3428 3032',
        email: CONTACT_EMAIL,
      },
      {
        '@type': 'LocalBusiness',
        name: 'Skyworld Solutions — China Manufacturing Hub',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CN',
        },
      },
    ],
  };

  return (
    <>
      <Seo language={language} t={t} pagePath="/" />
      {/* JSON-LD is read by search engines anywhere in the document */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        <Navbar language={language} setLanguage={onLanguageChange} translations={t} />
        <main id="main-content">
          <Hero translations={t} />
          <Services translations={t} />
          <Projects translations={t} />
          <About translations={t} />
          <FAQ translations={t} />
          <CtaBand translations={t} />
          <Contact translations={t} />
        </main>
        <Footer language={language} translations={t} />
        <StickyMobileBar translations={t} />
      </div>
    </>
  );
}
