import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
    translations: {
        nav: {
            faq: string;
        };
        faq: {
            title: string;
            questions: {
                tolerance: { q: string; a: string };
                logistics: { q: string; a: string };
                leadtime: { q: string; a: string };
                materials: { q: string; a: string };
                moq: { q: string; a: string };
                quality: { q: string; a: string };
                pricing: { q: string; a: string };
                nda: { q: string; a: string };
            };
        };
    };
}

export default function FAQ({ translations }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { key: 'tolerance' },
        { key: 'logistics' },
        { key: 'leadtime' },
        { key: 'materials' },
        { key: 'moq' },
        { key: 'quality' },
        { key: 'pricing' },
        { key: 'nda' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    return (
        <section id="faq" className="relative py-24 lg:py-32 bg-white dark:bg-slate-900">
            <div className="w-full px-6 lg:px-12 xl:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-400/10 dark:border-cyan-400/20 rounded-full">
                        {translations.nav.faq}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white mb-6 tracking-tight">
                        {translations.faq.title}
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12"
                >
                    {faqs.map((faq, index) => {
                        const faqData = translations.faq.questions[faq.key as keyof typeof translations.faq.questions];
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={faq.key}
                                variants={itemVariants}
                                className="border-b border-slate-200 dark:border-slate-700/50 last:border-b-0"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full py-6 flex items-center justify-between text-left group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-lg font-medium text-slate-800 group-hover:text-cyan-600 dark:text-slate-200 dark:group-hover:text-cyan-400 transition-colors duration-300 pr-4">
                                        {faqData.q}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 group-hover:text-cyan-600 dark:text-slate-500 dark:group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {faqData.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
