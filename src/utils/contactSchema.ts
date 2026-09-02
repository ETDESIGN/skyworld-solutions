import { z } from 'zod';
import type { Translation } from '../i18n/translations';

/** Build the contact form zod schema with localized error messages. */
export function makeSchema(t: Translation) {
  const err = t.contact.form.errors;
  return z.object({
    name: z.string().trim().min(1, err.nameRequired),
    company: z.string().trim().min(1, err.companyRequired),
    email: z.string().trim().min(1, err.emailRequired).email(err.emailInvalid),
    phone: z
      .string()
      .trim()
      .refine((v) => v === '' || /^\+?[0-9 ()./-]{6,20}$/.test(v), err.phoneInvalid),
    message: z.string().trim().min(1, err.messageRequired),
    consent: z.literal(true, { message: err.consentRequired }),
    // Honeypot: real users never fill this (bots do) — must stay empty.
    botcheck: z.string().max(0).optional(),
  });
}

export type FormValues = z.infer<ReturnType<typeof makeSchema>>;
