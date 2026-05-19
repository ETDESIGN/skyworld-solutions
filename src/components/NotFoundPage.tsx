import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { scrollToSection } from '@/utils/scrollToSection';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* 404 Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mb-8">
            <div className="text-[8rem] sm:text-[10rem] font-light text-slate-200 dark:text-slate-800 select-none leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-4"
        >
          Page not found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:hover:border-slate-500 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
