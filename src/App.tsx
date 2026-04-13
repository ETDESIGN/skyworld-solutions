import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { translations } from './i18n/translations';
import { ThemeContext } from './utils/themeContext';
import { useTheme } from './utils/useTheme';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import CookieBanner from './components/CookieBanner';

function App() {
  const theme = useTheme();
  const [language, setLanguage] = useState<'en' | 'fr'>(() => {
    const saved = localStorage.getItem('sws_language');
    return (saved === 'en' || saved === 'fr') ? saved : 'en';
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('sws_language', language);
  }, [language]);

  const currentTranslations = translations[language];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen bg-white dark:bg-slate-50">
        <Helmet>
          <title>{currentTranslations.seo.title}</title>
          <meta name="description" content={currentTranslations.seo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://skyworld-solutions.com/" />
          <meta property="og:title" content={currentTranslations.seo.title} />
          <meta property="og:description" content={currentTranslations.seo.description} />
          <meta property="og:image" content="https://skyworld-solutions.com/IMAGES/001.jpg" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://skyworld-solutions.com/" />
          <meta property="twitter:title" content={currentTranslations.seo.title} />
          <meta property="twitter:description" content={currentTranslations.seo.description} />
          <meta property="twitter:image" content="https://skyworld-solutions.com/IMAGES/001.jpg" />
          <link rel="canonical" href="https://skyworld-solutions.com/" />
        </Helmet>
        <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        <Navbar
          language={language}
          setLanguage={setLanguage}
          translations={currentTranslations}
        />
        <main id="main-content">
          <Hero translations={currentTranslations} />
          <Services translations={currentTranslations} />
          <Projects translations={currentTranslations} />
          <About translations={currentTranslations} />
          <Contact translations={currentTranslations} />
          <FAQ translations={currentTranslations} />
        </main>
        <Footer translations={currentTranslations} />
        <CookieBanner translations={currentTranslations} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
