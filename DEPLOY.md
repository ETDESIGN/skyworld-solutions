# 🚀 Skyworld Solutions — Deployment Guide

> **For agents / AI editors:** read this file before making changes and deploying.
> Last verified: September 2026.

## Pipeline

```
edit → commit (conventional commits) → git push origin master
     → Vercel auto-build: npm ci → npm run build (tsc -b && vite build && prerender)
     → dist/ deployed to https://app-beta-orcin-26.vercel.app (~1-2 min)
```

- **Repo:** https://github.com/ETDESIGN/skyworld-solutions (branch `master`)
- **Vercel project:** `app` — team `etdesigns-projects` (`.vercel/project.json`)
- **Dashboard:** https://vercel.com/etdesigns-projects/app
- **Node:** >= 20 (pinned via `engines` in package.json)

## What `npm run build` produces

1. `tsc -b` — strict type-check
2. `vite build` — hashed JS/CSS in `dist/assets/`, static files from `public/`
3. `postbuild → prerender` — writes real HTML for 8 routes:
   `/`, `/fr`, `/privacy`, `/terms`, `/legal`, `/fr/privacy`, `/fr/terms`, `/fr/legal`

`vercel.json` provides SPA rewrites (unknown paths → `index.html`, client shows the 404 view),
immutable caching for `/assets/`, long caching for `/images/`, and basic security headers.

## Environment variables

| Variable                    | Required           | Purpose                                                                                                                           |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_WEB3FORMS_ACCESS_KEY` | for email delivery | Web3Forms access key. Without it the form shows an honest error + direct email. Set in Vercel → Settings → Environment Variables. |

## Commit convention

`feat:` `fix:` `perf:` `style:` `refactor:` `i18n:` `chore:` — enforced by convention; CI runs
lint + format check + tests + build on every push/PR.

## Pre-deploy checklist

- [ ] `npm run lint && npm run format_check && npm run test && npm run build` all pass locally
- [ ] Contact form tested (or key present in Vercel env)
- [ ] `grep -r "skyworld-solutions.com/IMAGES" src/` returns nothing (all assets self-hosted)

## Verification after deploy

- Open the live URL — check EN, `/fr`, one legal page, mobile viewport
- DevTools Network tab: confirm no requests to the legacy `skyworld-solutions.com`
- Submit the contact form end-to-end (needs the Web3Forms key)

## Known owner TODOs (see also UPGRADE_PLAN.md)

1. Create the Web3Forms key (free) and add it to Vercel env.
2. Point `skyworld-solutions.com` DNS at this Vercel project, then update `SITE_URL` in
   `src/utils/site.ts`, `public/robots.txt` and `public/sitemap.xml`.
3. Review the drafted legal pages (registration numbers are marked `[To be completed…]`).
