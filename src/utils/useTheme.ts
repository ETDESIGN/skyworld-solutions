import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const isBrowser = typeof window !== 'undefined';

function getSystemTheme(): ResolvedTheme {
  if (!isBrowser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  if (!isBrowser) return 'system';
  const saved = localStorage.getItem('sws_theme');
  return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemTheme(mq.matches ? 'dark' : 'light');
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    if (!isBrowser) return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    if (theme !== 'system' || !localStorage.getItem('sws_theme')) {
      localStorage.setItem('sws_theme', theme);
    }
  }, [theme, resolvedTheme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => {
    setThemeState((prev) => {
      const current = prev === 'system' ? getSystemTheme() : prev;
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('sws_theme', next);
      return next;
    });
  };

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
