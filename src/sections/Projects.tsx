import { motion } from 'framer-motion';
import BlurImage from '../components/BlurImage';
import type { Translation } from '../i18n/translations';

interface ProjectsProps {
  translations: Translation;
}

/** Real SWS tooling photos (self-hosted). Fallbacks are distinct Unsplash
 *  machining photos used only if the local file fails. */
const PROJECT_IMAGES = [
  {
    category: 'stamping',
    src: '/images/002.jpg',
    fallback: 'https://images.unsplash.com/photo-1565193566307-fa97b862b7e0?w=600&h=400&fit=crop&q=80',
  },
  {
    category: 'cnc',
    src: '/images/003.jpg',
    fallback: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&h=400&fit=crop&q=80',
  },
  {
    category: 'stamping',
    src: '/images/004.jpg',
    fallback: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80',
  },
  {
    category: 'cnc',
    src: '/images/005.jpg',
    fallback: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80',
  },
  {
    category: 'inspection',
    src: '/images/006.jpg',
    fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
  },
  {
    category: 'inspection',
    src: '/images/007.jpg',
    fallback: 'https://images.unsplash.com/photo-1572981779307-38b816d45a85?w=600&h=400&fit=crop&q=80',
  },
] as const;

export default function Projects({ translations: t }: ProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-white dark:bg-slate-950 scroll-mt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgb(203 213 225) 1px, transparent 1px), linear-gradient(90deg, rgb(203 213 225) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
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
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20 rounded-full">
            {t.projects.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white mb-6 tracking-tight">
            {t.projects.title}
          </h2>
        </motion.div>

        {/* Projects Grid — all real in-house tooling, tap-friendly on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECT_IMAGES.map((project, index) => (
            <motion.div
              key={project.src}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              {/* Image Container — grayscale effect only on hover-capable devices */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <BlurImage
                  src={project.src}
                  alt={`${t.projects.items[index].title} — Skyworld Solutions`}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-all duration-700 ease-out [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  width={600}
                  height={400}
                  fallback={project.fallback}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/40 dark:via-slate-950/40 to-transparent opacity-80" />

                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content — always visible (no hover gating on touch devices) */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2.5 py-0.5 mb-2 text-xs font-medium tracking-wider uppercase text-amber-600 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20 rounded">
                  {t.projects.categories[project.category]}
                </span>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors duration-300">
                  {t.projects.items[index].title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t.projects.items[index].description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-slate-300 dark:border-white/20 opacity-0 group-hover:opacity-100 group-hover:border-amber-400/50 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
