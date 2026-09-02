/**
 * SSR entry used by scripts/prerender.mjs to generate static HTML per route.
 * Not imported by the client bundle.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import Seo from './components/Seo';
import { translations, type Language, type Translation } from './i18n/translations';
import type { LegalKind } from './pages/LegalPage';

export interface RenderedPage {
  html: string;
  head: string;
  lang: Language;
}

interface RouteInfo {
  language: Language;
  t: Translation;
  pagePath: string;
  kind?: LegalKind;
}

const KINDS: LegalKind[] = ['privacy', 'terms', 'legal'];

function routeInfo(url: string): RouteInfo {
  const fr = url.startsWith('/fr');
  const language: Language = fr ? 'fr' : 'en';
  const rest = fr ? url.slice(3) || '/' : url;
  const maybeKind = KINDS.find((k) => rest === `/${k}`);
  if (maybeKind) {
    return { language, t: translations[language], pagePath: `/${maybeKind}`, kind: maybeKind };
  }
  return { language, t: translations[language], pagePath: '/' };
}

export function renderPage(url: string): RenderedPage {
  const info = routeInfo(url);
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={[url]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  // Head tags are hoistable elements: render the Seo component standalone to
  // obtain the <title>/<meta>/<link> string for the static <head>.
  const head = renderToStaticMarkup(<Seo language={info.language} t={info.t} pagePath={info.pagePath} />);
  return { html, head, lang: info.language };
}
