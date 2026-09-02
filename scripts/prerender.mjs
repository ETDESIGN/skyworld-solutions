/**
 * Static pre-rendering: writes real HTML for every route into dist/, so
 * crawlers, social unfurls and first paint get full content without JS.
 *
 * Run: npm run prerender   (called automatically by `npm run build`)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-prerender.js');

const { renderPage } = await import(SSR_ENTRY);

const ROUTES = [
  { url: '/', file: 'index.html' },
  { url: '/fr', file: 'fr/index.html' },
  { url: '/privacy', file: 'privacy/index.html' },
  { url: '/terms', file: 'terms/index.html' },
  { url: '/legal', file: 'legal/index.html' },
  { url: '/fr/privacy', file: 'fr/privacy/index.html' },
  { url: '/fr/terms', file: 'fr/terms/index.html' },
  { url: '/fr/legal', file: 'fr/legal/index.html' },
];

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
if (!template.includes('<div id="root"></div>')) {
  console.error('dist/index.html is not a pristine vite build (missing empty #root).');
  console.error(
    'Run `npm run build` (which regenerates dist and then prerenders) instead of running prerender twice.',
  );
  process.exit(1);
}

for (const route of ROUTES) {
  const { html, head, lang } = renderPage(route.url);

  // The body copy already contains Seo-rendered tags (React 19 renders them
  // inline in static markup) — strip them; the injected <head> versions win.
  // Also normalize React's camelCase hrefLang for static output.
  const bodyHtml = html
    .replace(/<title>.*?<\/title>/g, '')
    .replace(/<meta [^>]*\/>/g, '')
    .replace(/<link [^>]*\/>/g, '')
    .replace(/hrefLang=/g, 'hreflang=');
  const headHtml = head.replace(/hrefLang=/g, 'hreflang=');

  let out = template;

  // Replace the root div with prerendered markup
  out = out.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  // Apply the html lang attribute statically
  out = out.replace('<html lang="en">', `<html lang="${lang}">`);

  // Strip the template's static title/description (replaced by per-route head)
  out = out.replace(/<title>.*?<\/title>\s*/, '');
  out = out.replace(/<meta name="description" content=".*?" \/>\s*/, '');

  // Inject the route's head tags before </head>
  out = out.replace('</head>', `    ${headHtml}\n  </head>`);

  const outFile = path.join(DIST, route.file);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, out);
  console.log(`prerendered ${route.url} -> dist/${route.file} (${(out.length / 1024).toFixed(0)}KB)`);
}

console.log('prerender complete');
