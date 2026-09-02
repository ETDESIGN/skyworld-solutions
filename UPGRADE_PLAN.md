# SWS Website — Upgrade Implementation Record

> **Status: IMPLEMENTED** — 2026-09-03. This file records what was delivered in the
> September 2026 upgrade and what remains for the owner. Commit history has the details.

## What was delivered

### Critical fixes

- **Contact form now works and never lies:** real Web3Forms key via `VITE_WEB3FORMS_ACCESS_KEY`
  (see `.env.example`); without it the form shows an honest localized error with the direct email.
  Honeypot (`botcheck`), GDPR consent checkbox, phone field, react-hook-form + zod validation,
  localized error/success messages, success state with 24-48h expectation ("we reply within…").
- **All assets self-hosted** (`public/images/`): logo, hero, 6 project photos, about photo + real
  WebP variants. Zero runtime requests to the legacy `skyworld-solutions.com` server. This removes
  the guaranteed-404 WebP negotiation and the single point of total asset failure.
- **Favicon set + OG card generated** from the SWS logo (`scripts/generate-assets.mjs`, run via
  `npm run assets`): favicon-32/48, apple-touch-icon, android-chrome-512, site.webmanifest, and a
  designed 1200×630 `og-card.jpg`.
- **Bug sweep:** sanitized `tel:` href, FAQ-in-DOM-before-Contact (nav order now matches page),
  fixed scrollspy threshold (FAQ/Contact now highlight), unique SVG flag clipPath ids, hero image
  `loading="eager"` (LCP), stats moved into translations and corrected (16+ years since 2010),
  mobile portfolio no longer hover-gated (descriptions always visible, grayscale only on
  hover-capable devices), no-flash theme + `<html lang>` pre-paint script, error stack hidden in
  production, removed global button:hover transform.

### Architecture

- **Client routing** (`react-router-dom`): `/` (EN), `/fr` (FR), `/privacy`, `/terms`, `/legal`
  (+ `/fr/…`), styled 404 — language toggle navigates between locales.
- **Static pre-rendering** of all 8 routes at build time (`scripts/prerender.mjs` + SSR entry):
  crawlers and social unfurls now get real HTML with per-route `<title>`, description, canonical,
  hreflang, OG/Twitter tags and JSON-LD (Organization + 2× LocalBusiness).
- **SEO plumbing:** `robots.txt`, `sitemap.xml` (with hreflang alternates), `vercel.json`
  (SPA rewrites, immutable asset caching, security headers), Node 20 pinned.
- **Dependency purge:** removed all 26 `@radix-ui/*` packages, ~50 unused shadcn/ui components,
  `next-themes`, `recharts`, `embla`, `cmdk`, `vaul`, `input-otp`, `react-day-picker`,
  `date-fns`, `react-resizable-panels`, `sonner`, `react-helmet-async` (incompatible with React 19
  head management — replaced with native hoisted `<title>/<meta>/<link>`). Bundle: single 432 KB
  chunk → 3 chunks totalling ~184 KB gzipped; CSS 111 KB → 47 KB.
- **Shared `Translation` type** from `translations.ts` (deleted ~150 lines of duplicated prop
  interfaces); moved contact schema to `src/utils/contactSchema.ts`.

### Marketing / conversion

- "Get a quote in 24-48h" is now the primary CTA (hero + navbar button + mobile sticky bar +
  closing CTA band after FAQ). CAD-file note under the form (matches the FAQ promise).
- WhatsApp link, Google Map of the HK office, sticky mobile call/quote bar.
- Cookie banner **removed entirely** — the site installs no tracking cookies, so consent is not
  required; the privacy policy documents the two functional localStorage keys instead.
- Project grid: 6 real in-house tooling photos with truthful, photo-matched titles
  (the 3 generic stock-photo cards and the unsupported "aerospace" claim are gone).
- FR copy fixes (MMT, emboutissage, natural phrasing), EN nav/section labels consistent,
  hero badge now a differentiator ("Since 2010 · Hong Kong & China").

### Quality / process

- Prettier + ESLint type-checked + husky pre-commit (lint-staged) + Vitest (15 tests: EN/FR key
  parity, form schema with localized errors, site routes) + GitHub Actions CI.
- Truthful `README.md` and `DEPLOY.md`; stale `info.md` removed.

## Owner TODOs (the only remaining items)

1. **Web3Forms key (required for email delivery)** — create free account at
   https://web3forms.com with `services-prestations@skyworld-solutions.com`, then set
   `VITE_WEB3FORMS_ACCESS_KEY` in Vercel → Settings → Environment Variables and redeploy.
2. **Custom domain** — point `skyworld-solutions.com` at this Vercel project, then update
   `SITE_URL` in `src/utils/site.ts`, `robots.txt` and `sitemap.xml`.
3. **Legal review** — the drafted Privacy/Terms/Mentions Légales contain clearly marked
   `[To be completed…]` placeholders (HK business registration number, publication director).
4. **Content that must not be invented** (add when available): ISO 9001 certificate number/badge,
   China factory address, testimonials, client logos, real machinery list.
