import { describe, expect, it } from 'vitest';
import { pathFor, CONTACT_EMAIL, WHATSAPP_URL, SITE_URL } from '../utils/site';

describe('site config', () => {
  it('routes match the prerendered file structure', () => {
    expect(pathFor.home('en')).toBe('/');
    expect(pathFor.home('fr')).toBe('/fr');
    expect(pathFor.privacy('fr')).toBe('/fr/privacy');
    expect(pathFor.legal('en')).toBe('/legal');
  });

  it('WhatsApp link is a valid wa.me number (digits only)', () => {
    const num = WHATSAPP_URL.replace('https://wa.me/', '');
    expect(num).toMatch(/^\d{8,15}$/);
  });

  it('contact email and site url are consistent', () => {
    expect(CONTACT_EMAIL).toContain('skyworld-solutions');
    expect(SITE_URL).toMatch(/^https:\/\//);
  });
});
