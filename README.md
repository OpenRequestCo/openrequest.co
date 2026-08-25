# openrequest.co

Marketing website for [OpenRequest](https://openrequest.co).

## Stack

- [Astro](https://astro.build) — static output (`output: 'static'`)
- [Tailwind CSS](https://tailwindcss.com) v4 via `@tailwindcss/vite`
- Content Collections ready under `src/content/` (CMS-swappable loaders later)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static assets land in `dist/`. Deploy that folder to Vercel, Netlify, Cloudflare Pages, or any static host.

## Structure

```
src/
  components/
    Header.astro / Footer.astro
    Chapter.astro              Story chapter container
    ui/Button.astro            Primary / secondary / ghost
    product/                   HTML/CSS product moments
  layouts/BaseLayout.astro
  pages/                       Routes
  content/
    copy/story.ts              First-pass story copy (OR-19)
    pages/                     Content collections (CMS-ready)
  styles/global.css            Design tokens + type scale
  consts.ts                    Site metadata + nav
public/images/                 Brand assets
```

## Visual foundation

Soft canvas (`#f5f6f8`), surface white, accent `#1460ff` (logo/product blue), Inter, generous chapter rhythm. Prefer HTML/CSS product moments over screenshots.
