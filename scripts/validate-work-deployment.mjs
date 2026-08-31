import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { readyWorkPages, workPagePath } from '../src/data/work-pages.ts';

const site = 'https://www.kotori-aozora.app';
const vercelConfig = JSON.parse(await readFile(
  new URL('../.vercel/output/config.json', import.meta.url),
));
const sitemap = await readFile(
  new URL('../dist/client/sitemap-0.xml', import.meta.url),
  'utf8',
);

const renderRoutes = new Set(
  vercelConfig.routes
    .filter((route) => route.dest === '_render')
    .map((route) => route.src),
);
assert(renderRoutes.has('^/weekly/([^/]+?)/?$'), 'Japanese weekly detail routes must render dynamically');
assert(renderRoutes.has('^/daily/([^/]+?)/?$'), 'Japanese daily detail routes must render dynamically');

async function assertMissing(url, message) {
  try {
    await access(url);
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }
  assert.fail(message);
}

for (const work of readyWorkPages()) {
  const canonicalURL = new URL(workPagePath(work), site).toString();
  assert(sitemap.includes(`<loc>${canonicalURL}</loc>`), `${work.slug} is missing from the sitemap`);

  for (const legacyPath of [
    `/weekly/${work.weeklyID}/`,
    `/daily/${work.weeklyID}/`,
    `/en/weekly/${work.weeklyID}/`,
  ]) {
    assert(!sitemap.includes(`<loc>${new URL(legacyPath, site)}</loc>`), `${legacyPath} must not be in the sitemap`);
  }

  await assertMissing(
    new URL(`../.vercel/output/static/weekly/${work.weeklyID}/index.html`, import.meta.url),
    `${work.weeklyID} has a static weekly redirect that Vercel would serve as HTTP 200`,
  );
  await assertMissing(
    new URL(`../.vercel/output/static/daily/${work.weeklyID}/index.html`, import.meta.url),
    `${work.weeklyID} has a static daily redirect that Vercel would serve as HTTP 200`,
  );

  const englishLegacy = await readFile(
    new URL(`../.vercel/output/static/en/weekly/${work.weeklyID}/index.html`, import.meta.url),
    'utf8',
  );
  assert(
    englishLegacy.includes('<meta name="robots" content="noindex,follow">'),
    `${work.weeklyID} English legacy page must be noindex,follow`,
  );

  const canonicalPage = await readFile(
    new URL(`../.vercel/output/static${workPagePath(work)}index.html`, import.meta.url),
    'utf8',
  );
  assert(canonicalPage.includes(`rel="canonical" href="${canonicalURL}"`), `${work.slug} has the wrong canonical URL`);
  for (const schemaType of ['Book', 'BreadcrumbList', 'FAQPage']) {
    assert(canonicalPage.includes(`"@type":"${schemaType}"`), `${work.slug} is missing ${schemaType} schema`);
  }
}

console.log(`Validated deployment output for ${readyWorkPages().length} canonical work pages.`);
