import { describe, expect, it } from 'vitest';
import { translations, type Translation } from '../i18n/translations';

/** Recursively collect object keys (arrays are compared by length only). */
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) {
    return obj.flatMap((v) => keyPaths(v, prefix));
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      keyPaths(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

describe('translations', () => {
  it('EN and FR have identical key structure', () => {
    const enKeys = keyPaths(translations.en).sort();
    const frKeys = keyPaths(translations.fr).sort();
    expect(frKeys).toEqual(enKeys);
  });

  it('no string value is empty in either language', () => {
    for (const lang of ['en', 'fr'] as const) {
      const walk = (obj: unknown, path = '') => {
        if (Array.isArray(obj)) {
          obj.forEach((v, i) => walk(v, `${path}[${i}]`));
        } else if (obj !== null && typeof obj === 'object') {
          Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => walk(v, `${path}.${k}`));
        } else if (typeof obj === 'string') {
          expect(obj.trim().length, `${lang}:${path}`).toBeGreaterThan(0);
        }
      };
      walk(translations[lang]);
    }
  });

  it('projects showcase exactly the six real photos', () => {
    for (const lang of ['en', 'fr'] as const) {
      expect(translations[lang].projects.items).toHaveLength(6);
    }
  });

  it('stats are consistent with "Since 2010"', () => {
    for (const lang of ['en', 'fr'] as const) {
      const t: Translation = translations[lang];
      const years = parseInt(t.about.stats.years, 10);
      const siteAge = new Date().getFullYear() - 2010;
      expect(years).toBeLessThanOrEqual(siteAge);
      expect(years).toBeGreaterThanOrEqual(siteAge - 1);
    }
  });

  it('legal sections exist in both languages', () => {
    for (const lang of ['en', 'fr'] as const) {
      expect(translations[lang].legal.privacy.length).toBeGreaterThanOrEqual(5);
      expect(translations[lang].legal.terms.length).toBeGreaterThanOrEqual(4);
      expect(translations[lang].legal.legal.length).toBeGreaterThanOrEqual(4);
    }
  });
});
