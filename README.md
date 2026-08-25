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
  components/   Header, Footer
  layouts/      BaseLayout shell
  pages/        Routes (index = story shell, pricing placeholder)
  content/      Content collections (Markdown today; CMS later)
  styles/       Global Tailwind + brand tokens
  consts.ts     Site metadata + nav
public/         Favicons, logos, static images
```
