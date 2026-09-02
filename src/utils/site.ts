/** Central place for site URLs and shared paths. Switch SITE_URL when the
 *  production domain is attached to this Vercel project. */
export const SITE_URL = 'https://app-beta-orcin-26.vercel.app';

export const SITE_URL_NO_SLASH = SITE_URL.replace(/\/$/, '');

export const pathFor = {
  home: (lang: 'en' | 'fr') => (lang === 'en' ? '/' : '/fr'),
  privacy: (lang: 'en' | 'fr') => (lang === 'en' ? '/privacy' : '/fr/privacy'),
  terms: (lang: 'en' | 'fr') => (lang === 'en' ? '/terms' : '/fr/terms'),
  legal: (lang: 'en' | 'fr') => (lang === 'en' ? '/legal' : '/fr/legal'),
};

export const CONTACT_EMAIL = 'services-prestations@skyworld-solutions.com';
export const WHATSAPP_URL = 'https://wa.me/85234283032';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/skyworld-solutions/';
