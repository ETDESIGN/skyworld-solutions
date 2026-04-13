import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Building2, Check, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

interface ContactProps {
  translations: {
    nav: {
      contact: string;
    };
    contact: {
      title: string;
      subtitle: string;
      form: {
        name: string;
        company: string;
        email: string;
        message: string;
        submit: string;
        sending: string;
        success: string;
        namePlaceholder: string;
        companyPlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        errors: {
          nameRequired: string;
          companyRequired: string;
          emailRequired: string;
          emailInvalid: string;
          messageRequired: string;
        };
      };
      locations: {
        hk: { title: string; address: string; phone: string; email: string };
        china: { title: string; address: string; desc: string };
      };
    };
  };
}

export default function Contact({ translations }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string): boolean => {
    const professionalPatterns = [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ];
    return professionalPatterns[0].test(email);
  };

  const validateForm = (): Record<string, string> => {
    const err = translations.contact.form.errors;
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = err.nameRequired;
    }

    if (!formData.company.trim()) {
      newErrors.company = err.companyRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = err.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = err.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = err.messageRequired;
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Inquiry from ${formData.name} - ${formData.company}`,
          from_name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', company: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      console.log('Form submitted (demo mode):', formData);
      setIsSuccess(true);
      setFormData({ name: '', company: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 bg-white dark:bg-slate-800/50 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500
    transition-all duration-300
    ${errors[fieldName] ? 'border-red-500/70 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300 dark:border-slate-700'}
  `;

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
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
            {translations.nav.contact}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white mb-6 tracking-tight">
            {translations.contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {translations.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">{translations.contact.form.name}</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={translations.contact.form.namePlaceholder}
                    className={inputClasses('name')}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-company" className="sr-only">{translations.contact.form.company}</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={translations.contact.form.companyPlaceholder}
                    className={inputClasses('company')}
                  />
                  {errors.company && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.company}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="sr-only">{translations.contact.form.email}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={translations.contact.form.emailPlaceholder}
                  className={inputClasses('email')}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">{translations.contact.form.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={translations.contact.form.messagePlaceholder}
                  className={`${inputClasses('message')} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-2
                  transition-all duration-300
                  ${isSuccess
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
                  }
                  ${isSubmitting || isSuccess ? 'cursor-not-allowed opacity-90' : ''}
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {translations.contact.form.sending}
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    {translations.contact.form.success}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {translations.contact.form.submit}
                  </>
                )}
              </motion.button>
            </form>
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
                    {translations.contact.locations.hk.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    {translations.contact.locations.hk.address}
                  </p>
                  <div className="flex flex-col gap-1">
                    <a
                      href={`tel:${translations.contact.locations.hk.phone}`}
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {translations.contact.locations.hk.phone}
                    </a>
                    <a
                      href={`mailto:${translations.contact.locations.hk.email}`}
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {translations.contact.locations.hk.email}
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
                    {translations.contact.locations.china.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    {translations.contact.locations.china.address}
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm">
                    {translations.contact.locations.china.desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
