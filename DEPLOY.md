# 🚀 Skyworld Solutions — Deployment Guide

> **For KiloCode / Cursor AI:** Read this file before making changes and deploying.

## Project Overview

- **Tech Stack:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Sections:** Navbar, Hero, About, Services, Projects, FAQ, Contact, Footer
- **i18n:** `src/i18n/translations.ts`
- **Build Command:** `npm run build` (runs `tsc -b && vite build`)
- **Output Directory:** `dist/`

## Git & GitHub

- **Repository:** `ETDESIGN/skyworld-solutions` (PUBLIC)
- **Remote:** `origin → https://github.com/ETDESIGN/skyworld-solutions.git`
- **Default Branch:** `master`
- **Auth:** `gh` CLI authenticated with `ETDESIGN` GitHub account

### How to Commit & Push

```bash
# Stage all changes
git add -A

# Commit with a descriptive message
git commit -m "type: short description of what changed"

# Push to GitHub
git push origin master
```

**Commit message convention:**
- `feat:` — new feature or section
- `fix:` — bug fix
- `style:` — CSS/styling changes
- `refactor:` — code restructure
- `i18n:` — translation updates
- `chore:` — config, dependencies, tooling

## Vercel Deployment

- **Vercel Account:** `etdesigns-projects`
- **Project Name:** `app`
- **Live URL:** https://app-beta-orcin-26.vercel.app
- **Dashboard:** https://vercel.com/etdesigns-projects/app
- **GitHub Connected:** YES — auto-deploys on every `git push origin master`

### How Auto-Deploy Works

1. You push to `master` → GitHub receives the code
2. Vercel detects the push automatically (GitHub integration is connected)
3. Vercel runs `npm run build` and deploys the `dist/` output
4. Live site updates in ~30-60 seconds

**You do NOT need to manually deploy.** Just push to GitHub and Vercel handles the rest.

### Manual Deploy (only if needed)

If auto-deploy fails or you need to force a deploy:

```bash
# From the project root (where this file is)
vercel --prod
```

### Vercel Build Settings

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 18.x (default) |

## Workflow: Make Changes → Push → Live

```
1. Edit files in Cursor/KiloCode
2. Preview locally: npm run dev
3. When ready, commit and push:
   git add -A
   git commit -m "feat: add new animation to hero section"
   git push origin master
4. Wait ~30-60s, check https://app-beta-orcin-26.vercel.app
5. Done! ✅
```

## Project Structure

```
app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (shadcn/ui + custom)
│   │   └── CookieBanner.tsx
│   ├── i18n/
│   │   └── translations.ts   # All text/translations
│   ├── sections/        # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── utils/           # Helpers
│   │   ├── animationVariants.ts
│   │   ├── handleImgError.ts
│   │   ├── scrollToSection.ts
│   │   ├── themeContext.ts
│   │   └── useTheme.ts
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles + Tailwind
│   └── main.tsx         # Entry point
├── DEPLOY.md            # ← You are here
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Troubleshooting

### Build fails on Vercel but works locally
- Check Node.js version mismatch
- Run `npm run build` locally first to reproduce
- Check Vercel build logs: https://vercel.com/etdesigns-projects/app

### Push rejected (remote has new commits)
```bash
git pull origin master --rebase
git push origin master
```

### Vercel not auto-deploying
- Check the GitHub integration in Vercel dashboard
- Or just run: `vercel --prod`

---

*Last updated: 2026-04-13 — by OpenClaw agent*
