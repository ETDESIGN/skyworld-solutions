import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { translations, type Language } from '../i18n/translations';

interface NotFoundProps {
  language: Language;
  homePath: string;
}

export default function NotFound({ language, homePath }: NotFoundProps) {
  const t = translations[language];
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl sm:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-6">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white mb-4">
        {language === 'fr' ? 'Page introuvable' : 'Page not found'}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md">
        {language === 'fr'
          ? "La page que vous cherchez n'existe pas ou a été déplacée."
          : 'The page you are looking for does not exist or has been moved.'}
      </p>
      <Link
        to={homePath}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-widest uppercase text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'fr' ? "Retour à l'accueil" : 'Back to home'}
      </Link>
      <p className="mt-12 text-xs uppercase tracking-widest text-slate-400">{t.footer.tagline}</p>
    </div>
  );
}
