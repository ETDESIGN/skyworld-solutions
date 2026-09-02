# Skyworld Solutions — Marketing Website

Bilingual (EN/FR) single-page marketing site for **Skyworld Solutions (SWS)**, a precision
engineering & manufacturing company based in Hong Kong and Mainland China, serving clients in
France, Europe, Asia and Australia since 2010.

**Live:** https://app-beta-orcin-26.vercel.app · **Repo:** `ETDESIGN/skyworld-solutions` (branch `master`)

## Stack

- **React 19 + TypeScript + Vite 7** — SPA with client-side routing (`/` EN, `/fr` FR, legal pages)
- **Tailwind CSS 3 + Framer Motion** — styling and animations (no UI kit: only used primitives kept)
- **react-hook-form + zod** — validated, spam-protected contact form (Web3Forms)
- **Static pre-rendering** — every route is built to real HTML at build time (SEO + social unfurls)

## Project structure

```
app/
├── public/
│   ├── images/            # photos + logo + WebP variants + OG card (self-hosted)
│   ├── favicon-*.png      # favicon set generated from the SWS logo
│   ├── 404.html robots.txt sitemap.xml site.webmanifest
├── scripts/
│   ├── generate-assets.mjs  # WebP, favicons, OG card (sharp) — npm run assets
│   └── prerender.mjs        # static HTML per route — npm run prerender
├── src/
│   ├── i18n/translations.ts # ALL site copy, EN + FR, + legal pages content
│   ├── sections/            # Navbar, Hero, Services, Projects, About, FAQ, Contact, Footer
│   ├── components/          # Seo, BlurImage, CtaBand, StickyMobileBar, ErrorBoundary
│   ├── pages/               # LegalPage, NotFound
│   ├── utils/               # site.ts (URLs), contactSchema, theme, scroll
│   ├── App.tsx              # routes
│   └── entry-prerender.tsx  # SSR entry for the prerender script
└── vercel.json              # SPA rewrites + cache/security headers
```

## Commands

| Command           | What it does                                                   |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Dev server                                                     |
| `npm run build`   | Type-check + Vite build + **static prerender** of all 8 routes |
| `npm run lint`    | ESLint (type-checked)                                          |
| `npm run test`    | Vitest (translations parity, form schema, site config)         |
| `npm run format`  | Prettier write / `format_check` in CI                          |
| `npm run assets`  | Regenerate WebP/favicons/OG card (needs `sharp`)               |
| `npm run preview` | Serve the built `dist/` locally                                |

## Editing content

All copy lives in **`src/i18n/translations.ts`** — both languages, including legal pages.
EN/FR key parity and the six real project photos are enforced by tests.

Media: photos live in `public/images/` (`.jpg` originals + generated `.webp` siblings).
To swap a photo, replace the `.jpg`, run `npm run assets`, done — component references never change.

## Contact form

Uses Web3Forms. The access key is read from `VITE_WEB3FORMS_ACCESS_KEY` (see `.env.example`).
Without the key the form shows an honest error with the direct email — **it never fakes success.**
Set the key in Vercel (Settings → Environment Variables) to activate email delivery.

## Deployment

`git push origin master` → Vercel auto-builds (`npm run build`, output `dist/`) and serves with
the rewrites/headers from `vercel.json`. See [DEPLOY.md](./DEPLOY.md) for the full guide.
