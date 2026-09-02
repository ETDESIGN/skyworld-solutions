import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { translations } from './i18n/translations';
import { ThemeContext } from './utils/themeContext';
import { useTheme } from './utils/useTheme';
import Landing from './Landing';
import LegalPage, { type LegalKind } from './pages/LegalPage';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const KINDS: LegalKind[] = ['privacy', 'terms', 'legal'];

/** Route tree shared by the browser app and the prerender entry. */
export function AppRoutes() {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing language="en" t={translations.en} />} />
        <Route path="/fr" element={<Landing language="fr" t={translations.fr} />} />
        {KINDS.map((kind) => (
          <Route key={kind} path={`/${kind}`} element={<LegalPage kind={kind} language="en" />} />
        ))}
        {KINDS.map((kind) => (
          <Route key={`${kind}-fr`} path={`/fr/${kind}`} element={<LegalPage kind={kind} language="fr" />} />
        ))}
        <Route path="*" element={<NotFound language="en" homePath="/" />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
