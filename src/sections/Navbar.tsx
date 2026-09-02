import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import BlurImage from '../components/BlurImage';
import { useThemeContext } from '../utils/themeContext';
import type { Language, Translation } from '../i18n/translations';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translation;
}

/** Unique-per-render id for the flag clip paths (was a duplicated DOM id). */
let flagClipId = 0;

export default function Navbar({ language, setLanguage, translations: t }: NavbarProps) {
  const { toggleTheme, resolvedTheme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const clipId = useRef(`flag-clip-${++flagClipId}`).current;

  const isOverHero = !isScrolled;

  // DOM order now matches nav order: home, services, projects, about, faq, contact.
  useEffect(() => {
    let ticking = false;
    const sections = ['home', 'services', 'projects', 'about', 'faq', 'contact'];
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          // Sections use scroll-mt-40 (160px); jump past the margin so the
          // section being viewed is the one highlighted.
          const scrollPosition = window.scrollY + 180;
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
    handleScroll();
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
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Focus trap + focus handoff for the mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusables = () => drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables()[0]?.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(focusables());
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    drawer.addEventListener('keydown', handleTab);
    return () => drawer.removeEventListener('keydown', handleTab);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    scrollToSection(e, sectionId);
    closeMobileMenu();
  };

  const navLinks = [
    { key: 'home', label: t.nav.home },
    { key: 'services', label: t.nav.services },
    { key: 'projects', label: t.nav.projects },
    { key: 'about', label: t.nav.about },
    { key: 'faq', label: t.nav.faq },
    { key: 'contact', label: t.nav.contact },
  ];

  const englishFlag = (
    <svg viewBox="0 0 60 30" className="w-full h-full" aria-hidden="true" focusable="false">
      <clipPath id={`${clipId}-en`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath={`url(#${clipId}-en)`} />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );

  const frenchFlag = (
    <svg viewBox="0 0 60 30" className="w-full h-full" aria-hidden="true" focusable="false">
      <rect width="20" height="30" fill="#002395" />
      <rect x="20" width="20" height="30" fill="#fff" />
      <rect x="40" width="20" height="30" fill="#ED2939" />
    </svg>
  );

  const quoteButton = () => (
    <motion.a
      href="#contact"
      onClick={(e) => scrollToSection(e, 'contact')}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-300"
    >
      <FileText className="w-4 h-4" />
      {t.nav.quote}
    </motion.a>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/20'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full pl-2 pr-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-28 sm:h-32 lg:h-32">
            <motion.a
              href="#home"
              onClick={(e) => onNavClick(e, 'home')}
              className="flex-shrink-0 -ml-1 lg:ml-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Skyworld Solutions"
            >
              <div className="relative">
                <BlurImage
                  src="/images/SKYWORLD_SOLUTIONS.png"
                  transparent
                  alt="Skyworld Solutions"
                  className="h-24 sm:h-28 lg:h-28 w-auto object-contain"
                  containerClassName="flex items-center"
                  loading="eager"
                  style={{
                    filter: isOverHero || resolvedTheme === 'dark' ? 'brightness(0) invert(1)' : 'none',
                  }}
                />
              </div>
            </motion.a>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.key}
                    href={`#${link.key}`}
                    onClick={(e) => onNavClick(e, link.key)}
                    className="relative text-sm font-medium tracking-widest uppercase transition-colors duration-300 group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                    aria-current={activeSection === link.key ? 'true' : undefined}
                  >
                    <span
                      className={
                        isOverHero
                          ? activeSection === link.key
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                          : activeSection === link.key
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white'
                      }
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isOverHero ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-500'} ${activeSection === link.key ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              {quoteButton()}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isOverHero
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
                aria-pressed={language === 'en'}
              >
                {englishFlag}
              </motion.button>
              <motion.button
                onClick={() => setLanguage('fr')}
                className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${language === 'fr' ? `ring-2 ring-cyan-600 dark:ring-cyan-400 ring-offset-2 ${isOverHero ? 'ring-offset-transparent' : 'ring-offset-white dark:ring-offset-slate-900'}` : `${isOverHero ? 'opacity-80 hover:opacity-100' : 'opacity-60 hover:opacity-100'}`}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Français"
                aria-pressed={language === 'fr'}
              >
                {frenchFlag}
              </motion.button>
            </div>

            <motion.button
              ref={hamburgerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isOverHero ? 'text-white' : 'text-slate-900 dark:text-white'}`}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
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
              aria-hidden="true"
            />

            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200 dark:border-slate-700/50 z-50 lg:hidden"
            >
              <div className="pt-20 px-6">
                <div className="flex items-center justify-center mb-8">
                  <BlurImage
                    src="/images/SKYWORLD_SOLUTIONS.png"
                    transparent
                    alt="Skyworld Solutions"
                    className="h-16 w-auto object-contain"
                    containerClassName="flex items-center justify-center"
                    style={{ filter: resolvedTheme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
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
                      className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                        activeSection === link.key
                          ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10'
                          : 'text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => onNavClick(e, 'contact')}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25"
                >
                  <FileText className="w-4 h-4" />
                  {t.nav.quote}
                </a>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center justify-between px-4 mb-3">
                    <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Language
                    </p>
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
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                        language === 'en'
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      aria-pressed={language === 'en'}
                    >
                      <div className="w-5 h-3 rounded overflow-hidden">{englishFlag}</div>
                      <span className="text-sm">English</span>
                    </button>
                    <button
                      onClick={() => setLanguage('fr')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                        language === 'fr'
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      aria-pressed={language === 'fr'}
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
