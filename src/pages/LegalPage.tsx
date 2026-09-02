import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { pathFor } from '../utils/site';
import { translations, type Language } from '../i18n/translations';

export type LegalKind = 'privacy' | 'terms' | 'legal';

interface LegalPageProps {
  kind: LegalKind;
  language: Language;
}

export default function LegalPage({ kind, language }: LegalPageProps) {
  const t = translations[language];
  const title =
    kind === 'privacy' ? t.legal.privacyTitle : kind === 'terms' ? t.legal.termsTitle : t.legal.legalTitle;
  const sections = kind === 'privacy' ? t.legal.privacy : kind === 'terms' ? t.legal.terms : t.legal.legal;

  return (
    <>
      <Seo language={language} t={t} pagePath={`/${kind}`} />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="w-full px-6 lg:px-12 xl:px-20 py-6 flex items-center justify-between">
            <Link
              to={pathFor.home(language)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.legal.backHome}
            </Link>
            <Link
              to={language === 'en' ? pathFor[kind]('fr') : pathFor[kind]('en')}
              className="text-sm font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400"
            >
              {language === 'en' ? 'Français' : 'English'}
            </Link>
          </div>
        </header>

        <main className="w-full px-6 lg:px-12 xl:px-20 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-12">{t.legal.privacyUpdated}</p>
            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{s.h}</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.p}</p>
                </section>
              ))}
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
          <div className="w-full px-6 lg:px-12 xl:px-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm">
            <Link
              to={pathFor.privacy(language)}
              className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {t.footer.privacy}
            </Link>
            <Link
              to={pathFor.terms(language)}
              className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {t.footer.terms}
            </Link>
            <Link
              to={pathFor.legal(language)}
              className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {t.footer.legal}
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
