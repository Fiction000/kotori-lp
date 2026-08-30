// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

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
    // Legacy daily URLs remain as redirects for existing links, but should not
    // compete with the canonical weekly pages in search results.
    filter: (page) => {
      const pathname = new URL(page).pathname;
      return !pathname.startsWith('/daily/') && !pathname.startsWith('/en/daily/');
    },
    // These pages are rendered at request time so the Monday JST selection is
    // always current; include them explicitly in the otherwise static sitemap.
    customPages: [
      'https://www.kotori-aozora.app/weekly/',
      'https://www.kotori-aozora.app/en/weekly/',
    ],
  })],
});
