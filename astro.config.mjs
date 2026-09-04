// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { readyWorkPages } from './src/data/work-pages.ts';

const migratedWeeklyPaths = new Set(
  readyWorkPages().flatMap((work) => [
    `/weekly/${work.weeklyID}/`,
    `/en/weekly/${work.weeklyID}/`,
  ]),
);

export default defineConfig({
  site: 'https://www.kotori-aozora.app',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({ experimentalStaticHeaders: true }),
  integrations: [sitemap({
    // Redirected editorial URLs should not compete with canonical work pages.
    filter: (page) => {
      const pathname = new URL(page).pathname;
      return !pathname.startsWith('/daily/')
        && !pathname.startsWith('/en/daily/')
        && !migratedWeeklyPaths.has(pathname);
    },
    // These pages are rendered at request time so the Monday JST selection is
    // always current; include them explicitly in the otherwise static sitemap.
    customPages: [
      'https://www.kotori-aozora.app/weekly/',
      'https://www.kotori-aozora.app/en/weekly/',
      'https://www.kotori-aozora.app/works/',
    ],
  })],
});
