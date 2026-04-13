import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1565193566307-fa97b862b7e0?w=1920&h=1080&fit=crop&q=80';

interface HeroProps {
  translations: {
    hero: {
      headline: string;
      subheadline: string;
      ctaPrimary: string;
      ctaSecondary: string;
      badge: string;
      trust: {
        axis: string;
        cnc: string;
        standards: string;
        logistics: string;
      };
    };
  };
}

export default function Hero({ translations }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://skyworld-solutions.com/IMAGES/001.jpg"
          alt="Precision Manufacturing"
          className="w-full h-[120%] object-cover"
          fetchPriority="high"
          onError={(e) => { if (e.currentTarget.src !== HERO_FALLBACK) e.currentTarget.src = HERO_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/20 dark:from-slate-900/80 dark:via-transparent dark:to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-12 xl:px-20 pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mr-3 animate-pulse" />
                {translations.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-8"
            >
              <span className="block">{translations.hero.headline}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-slate-300/90 font-light max-w-3xl mx-auto leading-relaxed mb-12"
            >
              {translations.hero.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <motion.a
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white overflow-hidden rounded-lg transition-all duration-500"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 transition-all duration-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
                <span className="relative flex items-center">
                  {translations.hero.ctaPrimary}
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white overflow-hidden rounded-lg transition-all duration-500 border-2 border-white/40 hover:border-white/80"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                <span className="relative flex items-center">
                  <Mail className="mr-3 w-5 h-5" />
                  {translations.hero.ctaSecondary}
                </span>
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
                {Object.values(translations.hero.trust).map((label, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-900 dark:to-transparent z-10" />
    </section>
  );
}
