import { describe, expect, it } from 'vitest';
import { makeSchema } from '../utils/contactSchema';
import { translations } from '../i18n/translations';

const schema = makeSchema(translations.en);
const base = {
  name: 'Jane',
  company: 'Acme',
  email: 'jane@acme.com',
  phone: '',
  message: 'Hello',
  consent: true,
  botcheck: '',
};

describe('contact form schema', () => {
  it('accepts a valid submission', () => {
    const r = schema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    for (const field of ['name', 'company', 'email', 'message'] as const) {
      const r = schema.safeParse({ ...base, [field]: '' });
      expect(r.success, field).toBe(false);
    }
  });

  it('rejects invalid emails', () => {
    for (const bad of ['foo', 'foo@', 'foo@bar', 'foo @bar.com']) {
      expect(schema.safeParse({ ...base, email: bad }).success, bad).toBe(false);
    }
  });

  it('accepts valid optional phone and rejects garbage', () => {
    expect(schema.safeParse({ ...base, phone: '+852 3428 3032' }).success).toBe(true);
    expect(schema.safeParse({ ...base, phone: 'call me' }).success).toBe(false);
  });

  it('requires GDPR consent (not a truthy string)', () => {
    expect(schema.safeParse({ ...base, consent: false }).success).toBe(false);
    expect(schema.safeParse({ ...base, consent: undefined }).success).toBe(false);
  });

  it('honeypot must stay empty (bots fill it)', () => {
    expect(schema.safeParse({ ...base, botcheck: 'spammy' }).success).toBe(false);
  });

  it('error messages are localized (FR schema yields FR messages)', () => {
    const frSchema = makeSchema(translations.fr);
    const r = frSchema.safeParse({ ...base, name: '' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].message).toBe(translations.fr.contact.form.errors.nameRequired);
    }
  });
});
