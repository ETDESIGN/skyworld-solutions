import { motion } from 'framer-motion';
import { Settings, Box, Wrench, Globe } from 'lucide-react';

interface ServicesProps {
  translations: {
    services: {
      title: string;
      subtitle: string;
      cards: {
        process: { title: string; desc: string };
        prototyping: { title: string; desc: string };
        fabrication: { title: string; desc: string };
        logistics: { title: string; desc: string };
      };
    };
  };
}

export default function Services({ translations }: ServicesProps) {
  const services = [
    {
      key: 'process',
      icon: Settings,
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      key: 'prototyping',
      icon: Box,
      gradient: 'from-cyan-400 to-teal-400',
    },
    {
      key: 'fabrication',
      icon: Wrench,
      gradient: 'from-teal-400 to-emerald-400',
    },
    {
      key: 'logistics',
      icon: Globe,
      gradient: 'from-emerald-400 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
            Savoir-Faire
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
            {translations.services.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {translations.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const cardData = translations.services.cards[service.key as keyof typeof translations.services.cards];
            return (
              <motion.div
                key={service.key}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-slate-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                  <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {cardData.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {cardData.desc}
                </p>

                {/* Corner Accent */}
                <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
