import { SITE_URL_NO_SLASH, pathFor } from '../utils/site';
import type { Language, Translation } from '../i18n/translations';

interface SeoProps {
  language: Language;
  t: Translation;
  /** Path without language prefix, e.g. '/', '/privacy' */
  pagePath: string;
  image?: string;
}

function canonicalFor(language: Language, pagePath: string): string {
  const prefix = language === 'en' ? '' : '/fr';
  const path = `${prefix}${pagePath}`;
  return SITE_URL_NO_SLASH + (path === '/' ? '/' : path.replace(/\/$/, ''));
}

/** Head metadata as native React 19 hoistable elements (<title>, <meta>, <link>). */
export default function Seo({ language, t, pagePath, image = '/images/og-card.jpg' }: SeoProps) {
  const canonical = canonicalFor(language, pagePath);
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL_NO_SLASH}${image}`;
  const title = t.seo.title;
  const description = t.seo.description;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={SITE_URL_NO_SLASH + pathFor.home('en')} />
      <link rel="alternate" hrefLang="fr" href={SITE_URL_NO_SLASH + pathFor.home('fr')} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL_NO_SLASH + pathFor.home('en')} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
