import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  translations: {
    nav: {
      home: string;
      services: string;
      quality: string;
      about: string;
      contact: string;
    };
  };
}

export default function Navbar({ language, setLanguage, translations }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', label: translations.nav.home },
    { key: 'services', label: translations.nav.services },
    { key: 'quality', label: translations.nav.quality },
    { key: 'about', label: translations.nav.about },
    { key: 'contact', label: translations.nav.contact },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-slate-900/20'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="https://skyworld-solutions.com/IMAGES/SKYWORLD_SOLUTIONS.png"
              alt="Skyworld Solutions"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
            <div className="flex items-center space-x-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={`#${link.key}`}
                  className="relative text-sm font-medium tracking-widest uppercase text-white/90 hover:text-white transition-colors duration-300 group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              onClick={() => setLanguage('en')}
              className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${
                language === 'en' ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="https://skyworld-solutions.com/IMAGES/drap_EN.png"
                alt="English"
                className="w-full h-full object-cover"
              />
            </motion.button>
            <motion.button
              onClick={() => setLanguage('fr')}
              className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${
                language === 'fr' ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="https://skyworld-solutions.com/IMAGES/drap_FR.png"
                alt="Français"
                className="w-full h-full object-cover"
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50"
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={`#${link.key}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-white/90 hover:text-cyan-400 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center space-x-4 pt-4 border-t border-slate-700/50">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                language === 'en' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/60'
              }`}
            >
              <img
                src="https://skyworld-solutions.com/IMAGES/drap_EN.png"
                alt="EN"
                className="w-6 h-4 object-cover rounded"
              />
              <span className="text-sm">English</span>
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                language === 'fr' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/60'
              }`}
            >
              <img
                src="https://skyworld-solutions.com/IMAGES/drap_FR.png"
                alt="FR"
                className="w-6 h-4 object-cover rounded"
              />
              <span className="text-sm">Français</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
