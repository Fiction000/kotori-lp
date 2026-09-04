import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { readyWorkPages, workPagePath } from '../src/data/work-pages.ts';
import { authorHubPath, readyAuthorHubs, readyCollections } from '../src/data/work-catalog.ts';

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
assert(renderRoutes.has('^/works/?$'), 'The filtered works directory must render dynamically');
// This build check proves that /works/ is a Vercel function route, not the headers
// generated for a query-string response. Verify canonical and robots metadata for
// filtered URLs with HTTP QA against a preview or deployed environment.

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

const worksURL = new URL('/works/', site).toString();
assert(sitemap.includes(`<loc>${worksURL}</loc>`), '/works/ must be included explicitly in the sitemap');
assert(!sitemap.includes('/works/?'), 'Filtered /works/ URLs must not enter the sitemap');

await access(new URL('../.vercel/output/static/authors/index.html', import.meta.url));
for (const author of readyAuthorHubs()) {
  const authorURL = new URL(authorHubPath(author), site).toString();
  assert(sitemap.includes(`<loc>${authorURL}</loc>`), `${author.slug} is missing from the sitemap`);
  const authorPage = await readFile(
    new URL(`../.vercel/output/static${authorHubPath(author)}index.html`, import.meta.url),
    'utf8',
  );
  assert(authorPage.includes('"@type":"Person"'), `${author.slug} is missing Person schema`);
  assert(authorPage.includes('"@type":"CollectionPage"'), `${author.slug} is missing CollectionPage schema`);
  assert(authorPage.includes('"@type":"BreadcrumbList"'), `${author.slug} is missing BreadcrumbList schema`);
}

for (const collection of readyCollections()) {
  const collectionPath = `/collections/${collection.slug}/`;
  const collectionURL = new URL(collectionPath, site).toString();
  assert(sitemap.includes(`<loc>${collectionURL}</loc>`), `${collection.slug} is missing from the sitemap`);
  const collectionPage = await readFile(
    new URL(`../.vercel/output/static${collectionPath}index.html`, import.meta.url),
    'utf8',
  );
  assert(collectionPage.includes(`rel="canonical" href="${collectionURL}"`), `${collection.slug} has the wrong canonical URL`);
  for (const schemaType of ['CollectionPage', 'BreadcrumbList']) {
    assert(collectionPage.includes(`"@type":"${schemaType}"`), `${collection.slug} is missing ${schemaType} schema`);
  }
}
assert(!sitemap.includes('meiji-kaidan'), 'Draft meiji-kaidan must not enter the sitemap');
await assertMissing(
  new URL('../.vercel/output/static/collections/meiji-kaidan/index.html', import.meta.url),
  'Draft meiji-kaidan must not render as a static page',
);

console.log(`Validated deployment output for ${readyWorkPages().length} canonical work pages. Filtered /works/ metadata still needs preview/deployment HTTP QA.`);
