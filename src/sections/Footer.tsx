import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone, MessageCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import BlurImage from '../components/BlurImage';
import { useThemeContext } from '../utils/themeContext';
import { CONTACT_EMAIL, LINKEDIN_URL, WHATSAPP_URL, pathFor } from '../utils/site';
import type { Language, Translation } from '../i18n/translations';

interface FooterProps {
  language: Language;
  translations: Translation;
}

export default function Footer({ language, translations: t }: FooterProps) {
  const year = new Date().getFullYear();
  const { resolvedTheme } = useThemeContext();
  const phoneNumber = t.contact.locations.hk.phone.replace(/[\s()]/g, '');

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
            <BlurImage
              src="/images/SKYWORLD_SOLUTIONS.png"
              transparent
              alt="Skyworld Solutions"
              className="h-28 w-auto mx-auto md:mx-0 mb-4"
              containerClassName="flex"
              style={{ filter: resolvedTheme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
            />
            <p className="text-slate-400 dark:text-slate-500 text-sm">{t.footer.tagline}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'services', label: t.nav.services },
                { id: 'projects', label: t.nav.projects },
                { id: 'about', label: t.nav.about },
                { id: 'faq', label: t.nav.faq },
                { id: 'contact', label: t.nav.contact },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              <Link
                to={pathFor.privacy(language)}
                className="text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {t.footer.privacy}
              </Link>
              <Link
                to={pathFor.terms(language)}
                className="text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {t.footer.terms}
              </Link>
              <Link
                to={pathFor.legal(language)}
                className="text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {t.footer.legal}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <div className="flex items-center justify-center md:justify-end gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`tel:${phoneNumber}`}
                aria-label={t.contact.locations.hk.phone}
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 flex items-center justify-center md:justify-end gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <Scale className="w-3.5 h-3.5" />
              {t.contact.locations.hk.address}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50"
        >
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm">
            © {year} Skyworld Solutions. {t.footer.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
