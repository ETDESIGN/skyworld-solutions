import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, FileText } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import type { Translation } from '../i18n/translations';

interface StickyMobileBarProps {
  translations: Translation;
}

/** Fixed bottom bar on mobile only: one-tap call + quote. Hidden while the
 *  contact section is on screen (the form is the CTA there). */
export default function StickyMobileBar({ translations }: StickyMobileBarProps) {
  const [visible, setVisible] = useState(false);
  const phone = translations.contact.locations.hk.phone.replace(/[\s()]/g, '');

  useEffect(() => {
    const contact = document.getElementById('contact');
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && window.scrollY > window.innerHeight * 0.8),
      { threshold: 0 },
    );
    if (contact) observer.observe(contact);
    const onScroll = () => {
      if (window.scrollY <= window.innerHeight * 0.8) setVisible(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="fixed bottom-4 left-4 right-4 z-40 lg:hidden"
        >
          <div className="flex gap-3 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 shadow-2xl shadow-slate-900/40 border border-white/10">
            <a
              href={`tel:${phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
              aria-label={translations.contact.locations.hk.phone}
            >
              <Phone className="w-4 h-4" />
              {translations.contact.locations.hk.phone}
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
            >
              <FileText className="w-4 h-4" />
              {translations.nav.quote}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
