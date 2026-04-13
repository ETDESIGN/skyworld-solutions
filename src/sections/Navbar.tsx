import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import { handleImgError } from '../utils/handleImgError';
import { useThemeContext } from '../utils/themeContext';

interface NavbarProps {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  translations: {
    nav: {
      home: string;
      services: string;
      projects: string;
      faq: string;
      about: string;
      contact: string;
    };
  };
}

export default function Navbar({ language, setLanguage, translations }: NavbarProps) {
  const { toggleTheme, resolvedTheme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isOverHero = !isScrolled;

  useEffect(() => {
    let ticking = false;
    const sections = ['home', 'services', 'projects', 'about', 'faq', 'contact'];
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          const scrollPosition = window.scrollY + 100;
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    scrollToSection(e, sectionId);
    closeMobileMenu();
  };

  const navLinks = [
    { key: 'home', label: translations.nav.home },
    { key: 'services', label: translations.nav.services },
    { key: 'projects', label: translations.nav.projects },
    { key: 'about', label: translations.nav.about },
    { key: 'faq', label: translations.nav.faq },
    { key: 'contact', label: translations.nav.contact },
  ];

  const englishFlag = (
    <svg viewBox="0 0 60 30" className="w-full h-full">
      <clipPath id="td"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#td)"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );

  const frenchFlag = (
    <svg viewBox="0 0 60 30" className="w-full h-full">
      <rect width="20" height="30" fill="#002395"/>
      <rect x="20" width="20" height="30" fill="#fff"/>
      <rect x="40" width="20" height="30" fill="#ED2939"/>
    </svg>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/20'
            : 'bg-transparent'
          }`}
      >
        <div className="w-full pl-2 pr-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-36 sm:h-40 lg:h-40">
            <motion.a
              href="#home"
              onClick={(e) => onNavClick(e, 'home')}
              className="flex-shrink-0 -ml-1 lg:ml-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <img
                  src="https://skyworld-solutions.com/IMAGES/SKYWORLD_SOLUTIONS.png"
                  alt="Skyworld Solutions"
                  className="relative h-32 sm:h-36 lg:h-36 w-auto object-contain"
                  style={{ filter: (isOverHero || resolvedTheme === 'dark') ? 'brightness(0) invert(1)' : 'none' }}
                  onError={handleImgError}
                />
              </div>
            </motion.a>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
              <div className="flex items-center space-x-10">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.key}
                    href={`#${link.key}`}
                    onClick={(e) => onNavClick(e, link.key)}
                    className="relative text-sm font-medium tracking-widest uppercase transition-colors duration-300 group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  >
                    <span className={isOverHero
                        ? (activeSection === link.key ? 'text-white' : 'text-white/70 hover:text-white')
                        : (activeSection === link.key ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white')
                      }>
                      {link.label}
                    </span>
                    <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isOverHero ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-500'} ${activeSection === link.key ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-300 ${isOverHero
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              <motion.button
                onClick={() => setLanguage('en')}
                className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${language === 'en' ? `ring-2 ring-cyan-600 dark:ring-cyan-400 ring-offset-2 ${isOverHero ? 'ring-offset-transparent' : 'ring-offset-white dark:ring-offset-slate-900'}` : `${isOverHero ? 'opacity-80 hover:opacity-100' : 'opacity-60 hover:opacity-100'}`}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="English"
              >
                {englishFlag}
              </motion.button>
              <motion.button
                onClick={() => setLanguage('fr')}
                className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${language === 'fr' ? `ring-2 ring-cyan-600 dark:ring-cyan-400 ring-offset-2 ${isOverHero ? 'ring-offset-transparent' : 'ring-offset-white dark:ring-offset-slate-900'}` : `${isOverHero ? 'opacity-80 hover:opacity-100' : 'opacity-60 hover:opacity-100'}`}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Français"
              >
                {frenchFlag}
              </motion.button>
            </div>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isOverHero ? 'text-white' : 'text-slate-900 dark:text-white'}`}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200 dark:border-slate-700/50 z-50 lg:hidden"
            >
              <div className="pt-20 px-6">
                <div className="flex items-center justify-center mb-8">
                  <img
                    src="https://skyworld-solutions.com/IMAGES/SKYWORLD_SOLUTIONS.png"
                    alt="Skyworld Solutions"
                      className="h-20 w-auto object-contain"
                    style={{ filter: resolvedTheme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
                    onError={handleImgError}
                  />
                </div>

                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.key}
                      href={`#${link.key}`}
                      onClick={(e) => onNavClick(e, link.key)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === link.key
                          ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10'
                          : 'text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center justify-between px-4 mb-3">
                    <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">Language</p>
                    <button
                      onClick={toggleTheme}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                      aria-label="Toggle theme"
                    >
                      {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${language === 'en'
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      <div className="w-5 h-3 rounded overflow-hidden">{englishFlag}</div>
                      <span className="text-sm">English</span>
                    </button>
                    <button
                      onClick={() => setLanguage('fr')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${language === 'fr'
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      <div className="w-5 h-3 rounded overflow-hidden">{frenchFlag}</div>
                      <span className="text-sm">Français</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
