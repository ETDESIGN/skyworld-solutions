import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import type { Translation } from '../i18n/translations';

interface CtaBandProps {
  translations: Translation;
}

/** Full-width call-to-action band shown after the FAQ (before Contact). */
export default function CtaBand({ translations }: CtaBandProps) {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(148 163 184) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative z-10 w-full px-6 lg:px-12 xl:px-20 text-center"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 tracking-tight">
          {translations.ctaBand.title}
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {translations.ctaBand.subtitle}
        </p>
        <motion.a
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-semibold tracking-widest uppercase text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all duration-300"
        >
          <FileText className="w-5 h-5" />
          {translations.ctaBand.button}
        </motion.a>
      </motion.div>
    </section>
  );
}
