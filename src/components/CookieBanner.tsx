import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

interface CookieBannerProps {
    translations: {
        cookies: {
            title: string;
            acceptAll: string;
            essentialOnly: string;
        };
    };
}

export default function CookieBanner({ translations }: CookieBannerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasConsent, setHasConsent] = useState<boolean | null>(() => {
        const saved = localStorage.getItem('cookie_consent');
        return saved === null ? null : saved === 'true';
    });

    useEffect(() => {
        if (hasConsent === null) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [hasConsent]);

    const handleAccept = (essentialOnly: boolean) => {
        localStorage.setItem('cookie_consent', essentialOnly ? 'false' : 'true');
        localStorage.setItem('cookie_essential_only', essentialOnly ? 'true' : 'false');
        setHasConsent(!essentialOnly);
        setIsVisible(false);
    };

    if (hasConsent === null && !isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <Cookie className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                                        {translations.cookies.title}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                                    <button
                                        onClick={() => handleAccept(true)}
                                        className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:hover:border-slate-500 transition-all duration-300"
                                    >
                                        {translations.cookies.essentialOnly}
                                    </button>
                                    <button
                                        onClick={() => handleAccept(false)}
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                                    >
                                        {translations.cookies.acceptAll}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
