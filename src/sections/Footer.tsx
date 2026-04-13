import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import { handleImgError } from '../utils/handleImgError';
import { useThemeContext } from '../utils/themeContext';

interface FooterProps {
  translations: {
    nav: {
      home: string;
      services: string;
      about: string;
      contact: string;
    };
    footer: {
      rights: string;
      privacy: string;
      tagline: string;
    };
  };
}

export default function Footer({ translations }: FooterProps) {
  const year = new Date().getFullYear();
  const { resolvedTheme } = useThemeContext();

  return (
    <footer className="relative bg-slate-100 dark:bg-black border-t border-slate-200 dark:border-slate-800/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="w-full px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <img
              src="https://skyworld-solutions.com/IMAGES/SKYWORLD_SOLUTIONS.png"
              alt="Skyworld Solutions"
              className="h-40 w-auto mx-auto md:mx-0 mb-4"
              style={{ filter: resolvedTheme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
              onError={handleImgError}
            />
            <p className="text-slate-400 dark:text-slate-500 text-sm">{translations.footer.tagline}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-6">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider">
                {translations.nav.home}
              </a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider">
                {translations.nav.services}
              </a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider">
                {translations.nav.about}
              </a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider">
                {translations.nav.contact}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <div className="flex items-center justify-center md:justify-end gap-4">
              <a
                href="mailto:services-prestations@skyworld-solutions.com"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+85234283032"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/skyworld-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              © {year} Skyworld Solutions. {translations.footer.rights}
            </p>
            <a
              href="mailto:services-prestations@skyworld-solutions.com"
              className="text-slate-400 dark:text-slate-500 hover:text-cyan-400 transition-colors text-sm"
            >
              {translations.footer.privacy}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
