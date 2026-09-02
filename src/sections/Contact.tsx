import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Building2, Check, Loader2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { makeSchema, type FormValues } from '../utils/contactSchema';
import type { Translation } from '../i18n/translations';
import { CONTACT_EMAIL, WHATSAPP_URL } from '../utils/site';

interface ContactProps {
  translations: Translation;
}

export default function Contact({ translations: t }: ContactProps) {
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const schema = makeSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      consent: false as unknown as true,
      botcheck: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSendError(null);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    // Honest failure when the deployment has no key configured yet.
    if (!accessKey) {
      setSendError(`${t.contact.form.errors.sendError} ${CONTACT_EMAIL}`);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Inquiry from ${values.name} — ${values.company}`,
          from_name: values.name,
          name: values.name,
          company: values.company,
          email: values.email,
          phone: values.phone || '—',
          message: values.message,
          botcheck: values.botcheck,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { success?: boolean };
      if (!response.ok || !result.success) {
        throw new Error('Form submission failed');
      }

      setIsSuccess(true);
      reset();
      // Keep the confirmation visible; it sets reply expectations.
      setTimeout(() => setIsSuccess(false), 30000);
    } catch {
      setSendError(`${t.contact.form.errors.sendError} ${CONTACT_EMAIL}`);
    }
  };

  const inputClasses = (fieldName: keyof FormValues) => `
    w-full px-4 py-3 bg-white dark:bg-slate-800/50 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500
    transition-all duration-300
    ${errors[fieldName] ? 'border-red-500/70 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300 dark:border-slate-700'}
  `;

  const phoneNumber = t.contact.locations.hk.phone.replace(/[\s()]/g, '');
  const mapsEmbedSrc =
    'https://maps.google.com/maps?q=Kwan%20Chart%20Tower%2C%206%20Tonnochy%20Road%2C%20Wanchai%2C%20Hong%20Kong&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden scroll-mt-40"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-400/10 dark:border-cyan-400/20 rounded-full">
            {t.nav.contact}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white mb-6 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSuccess ? (
              <div
                className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-200 dark:border-emerald-400/20 text-center"
                role="status"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {t.contact.form.successTitle}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{t.contact.form.successBody}</p>
              </div>
            ) : (
              <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="space-y-6">
                {/* Honeypot — hidden from humans */}
                <input
                  type="checkbox"
                  {...register('botcheck')}
                  className="hidden"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      {t.contact.form.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t.contact.form.namePlaceholder}
                      aria-invalid={!!errors.name}
                      className={inputClasses('name')}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="sr-only">
                      {t.contact.form.company}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder={t.contact.form.companyPlaceholder}
                      aria-invalid={!!errors.company}
                      className={inputClasses('company')}
                      {...register('company')}
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      {t.contact.form.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t.contact.form.emailPlaceholder}
                      aria-invalid={!!errors.email}
                      className={inputClasses('email')}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">
                      {t.contact.form.phone}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder={t.contact.form.phonePlaceholder}
                      aria-invalid={!!errors.phone}
                      className={inputClasses('phone')}
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder={t.contact.form.messagePlaceholder}
                    aria-invalid={!!errors.message}
                    className={`${inputClasses('message')} resize-none`}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* GDPR consent */}
                <div>
                  <label
                    htmlFor="contact-consent"
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    <input
                      id="contact-consent"
                      type="checkbox"
                      aria-invalid={!!errors.consent}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500/50"
                      {...register('consent')}
                    />
                    <span>{t.contact.form.consent}</span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400" role="alert">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {sendError && (
                  <p className="text-sm text-red-500 dark:text-red-400" role="alert">
                    {sendError}
                  </p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-2
                    bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                    transition-all duration-300
                    ${isSubmitting ? 'cursor-not-allowed opacity-90' : ''}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.form.submit}
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-slate-400 dark:text-slate-500 text-center">{t.contact.cadNote}</p>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Hong Kong Office */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {t.contact.locations.hk.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    {t.contact.locations.hk.address}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <a
                      href={`tel:${phoneNumber}`}
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {t.contact.locations.hk.phone}
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t.contact.locations.hk.whatsapp}
                    </a>
                    <a
                      href={`mailto:${t.contact.locations.hk.email}`}
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {t.contact.locations.hk.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* China Office */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {t.contact.locations.china.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    {t.contact.locations.china.address}
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm">
                    {t.contact.locations.china.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Map — Hong Kong office */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50">
              <iframe
                title={t.contact.locations.mapTitle}
                src={mapsEmbedSrc}
                className="w-full h-64 grayscale-[30%] contrast-[1.05] dark:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
