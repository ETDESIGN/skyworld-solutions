import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Leaf, Award } from 'lucide-react';

interface AboutProps {
  translations: {
    about: {
      title: string;
      headline: string;
      description: string;
      standards: string;
      packaging: string;
      since: string;
      standardsTitle: string;
      ecoTitle: string;
      stats: {
        years: string;
        clients: string;
        countries: string;
      };
    };
  };
}

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1565193566307-fa97b862b7e0?w=600&h=400&fit=crop&q=80';
};

export default function About({ translations }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(203 213 225) 1px, transparent 1px), linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50">
              <motion.div style={{ y }}>
                <img
                  src="https://skyworld-solutions.com/IMAGES/010.jpg"
                  alt="Precision Manufacturing"
                  className="w-full h-[420px] lg:h-[520px] object-cover"
                  loading="lazy"
                  onError={handleImgError}
                />
              </motion.div>
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold">{translations.about.stats.years}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{translations.about.since}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-400/10 dark:border-cyan-400/20 rounded-full">
              {translations.about.title}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              {translations.about.headline}
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {translations.about.description}
            </p>

            {/* Quality Points */}
            <div className="space-y-4 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium mb-1">{translations.about.standardsTitle}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{translations.about.standards}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium mb-1">{translations.about.ecoTitle}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{translations.about.packaging}</p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-light text-cyan-600 dark:text-cyan-400 mb-1">14+</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm uppercase tracking-wider">{translations.about.stats.years}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-light text-cyan-600 dark:text-cyan-400 mb-1">200+</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm uppercase tracking-wider">{translations.about.stats.clients}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-light text-cyan-600 dark:text-cyan-400 mb-1">30+</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm uppercase tracking-wider">{translations.about.stats.countries}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
