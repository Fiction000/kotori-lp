# CLAUDE.md -- Kotori Landing Page

## What This Is
Marketing landing page for Kotori, a free iOS app for reading Japanese literature from Aozora Bunko. Site: https://www.kotori-aozora.app

## Stack
- Astro 5 (SSR via @astrojs/vercel adapter)
- Tailwind CSS 4 (via @tailwindcss/vite plugin, configured in src/styles/global.css @theme block)
- TypeScript
- Deployed on Vercel

## Commands
- `npm run dev` -- local dev server
- `npm run build` -- production build
- `npm run preview` -- preview production build locally

## Content Language
All marketing copy and blog posts are in Japanese. Default locale is `ja`. English is available under `/en/` routes. Never default to English when adding content.

## i18n
- All UI strings live in `src/i18n/ui.ts` (ja and en objects). Add keys to both locales.
- `src/i18n/utils.ts` exports `getLangFromUrl()`, `useTranslations()`, `getLocalePath()`.
- In components: `const lang = getLangFromUrl(Astro.url); const t = useTranslations(lang);`
- Japanese routes have no prefix (`/`, `/privacy`). English routes use `/en/` prefix.

## Site Structure
- `/` -- Landing page: Hero, Features, HowItWorks, Screenshots, ClosingCTA
- `/privacy` -- Privacy policy
- `/support` -- FAQ and contact info
- Same pages mirrored under `/en/`

## Project Layout
- `src/pages/` -- Page routes (ja at root, en under `en/`)
- `src/components/` -- Astro components (Header, Hero, Features, HowItWorks, Screenshots, ClosingCTA, Footer, AppStoreBadge)
- `src/layouts/Layout.astro` -- Base HTML layout (meta, OGP, structured data, fade-up observer)
- `src/styles/global.css` -- Tailwind imports, custom sepia color palette, font-face, animation classes
- `public/` -- Static assets (app icon, favicon, fonts, screenshots)

## Key Conventions
- Always use Astro components, never standalone HTML files.
- Custom sepia color palette (`sepia-50` through `sepia-900`) and brand colors (`kotori-green`, `kotori-warm`, `kotori-dark`) defined in global.css @theme.
- Custom font: GenEiKoburiMin (Japanese mincho), referenced as `font-koburi` or `font-serif-jp`.
- Scroll animations use `.fade-up` class + IntersectionObserver in Layout.astro. Staggered children use `.stagger-children` wrapper.
- Component-scoped styles via `<style>` blocks within .astro files.
