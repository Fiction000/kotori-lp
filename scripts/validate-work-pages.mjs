import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { workPages, workPagePath } from '../src/data/work-pages.ts';

const editorialManifest = JSON.parse(await readFile(
  new URL('../src/data/editorial-manifest.json', import.meta.url),
));
const editorialByID = new Map(editorialManifest.picks.map((pick) => [pick.id, pick]));
const statuses = new Set(['draft', 'reviewed', 'ready']);
const bookIDs = new Set();
const slugs = new Set();
const weeklyIDs = new Set();
const routes = new Set();
const seoTitles = new Set();
const seoDescriptions = new Set();

for (const work of workPages) {
  assert(statuses.has(work.status), `${work.slug}.status is invalid`);
  assert.match(work.bookID, /^\d{6}$/, `${work.slug}.bookID must have six digits`);
  assert.match(work.authorAozoraID, /^\d{6}$/, `${work.slug}.authorAozoraID must have six digits`);
  assert.match(work.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${work.slug}.slug is invalid`);
  assert(!bookIDs.has(work.bookID), `Duplicate work bookID: ${work.bookID}`);
  assert(!slugs.has(work.slug), `Duplicate work slug: ${work.slug}`);
  assert(!weeklyIDs.has(work.weeklyID), `Duplicate work weeklyID: ${work.weeklyID}`);
  bookIDs.add(work.bookID);
  slugs.add(work.slug);
  weeklyIDs.add(work.weeklyID);

  const route = workPagePath(work);
  assert(!routes.has(route), `Duplicate work route: ${route}`);
  routes.add(route);

  const editorial = editorialByID.get(work.weeklyID);
  assert(editorial, `${work.slug} has no matching weekly pick`);
  assert.equal(editorial.bookID, work.bookID, `${work.slug} disagrees with the weekly pick bookID`);
  assert.equal(editorial.locales.ja.title, work.title, `${work.slug} disagrees with the weekly title`);
  assert(
    [work.author, ...work.authorAliases].includes(editorial.locales.ja.author),
    `${work.slug} disagrees with the weekly author`,
  );

  const numericBookID = String(Number(work.bookID));
  const authorPath = `/cards/${work.authorAozoraID}/`;
  assert.equal(
    work.sources.cardURL,
    `https://www.aozora.gr.jp${authorPath}card${numericBookID}.html`,
    `${work.slug}.sources.cardURL does not match its identity`,
  );
  assert(
    work.sources.textURL.startsWith(`https://www.aozora.gr.jp${authorPath}files/${numericBookID}_`),
    `${work.slug}.sources.textURL does not match its identity`,
  );

  assert(work.title.trim(), `${work.slug}.title is empty`);
  assert(work.author.trim(), `${work.slug}.author is empty`);
  assert(work.lead.trim(), `${work.slug}.lead is empty`);
  assert(work.relatedIntro.trim(), `${work.slug}.relatedIntro is empty`);
  assert(work.synopsis.length >= 2, `${work.slug} needs at least two synopsis paragraphs`);
  assert(work.readingPoints.length >= 3, `${work.slug} needs at least three reading points`);
  assert(work.faq.length >= 2, `${work.slug} needs at least two FAQs`);
  assert(work.metadata.some((item) => item.label === '作者' && item.value === work.author), `${work.slug} is missing author metadata`);
  assert(work.metadata.some((item) => item.label === '青空文庫 作品ID' && item.value === work.bookID), `${work.slug} is missing bookID metadata`);
  assert.equal(new Set(work.aliases).size, work.aliases.length, `${work.slug}.aliases contains duplicates`);
  assert.equal(new Set(work.authorAliases).size, work.authorAliases.length, `${work.slug}.authorAliases contains duplicates`);
  assert(work.relatedWorks.every((related) => /^\d{6}$/.test(related.bookID)), `${work.slug} has an invalid related bookID`);
  assert(work.relatedWorks.every((related) => related.bookID !== work.bookID), `${work.slug} relates to itself`);

  assert(!seoTitles.has(work.seo.title), `Duplicate work SEO title: ${work.seo.title}`);
  assert(!seoDescriptions.has(work.seo.description), `Duplicate work SEO description: ${work.seo.description}`);
  seoTitles.add(work.seo.title);
  seoDescriptions.add(work.seo.description);
  assert(!work.seo.title.includes('全文'), `${work.slug} must not target 全文`);
  assert(!work.seo.description.includes('全文'), `${work.slug} must not target 全文`);

  if (work.status === 'ready') {
    assert.equal(editorial.status, 'ready', `${work.slug} is ready but its weekly pick is not`);
    await access(new URL(`../public${work.image}`, import.meta.url));
  }
}

assert(workPages.some((work) => work.status === 'ready'), 'No work pages are ready');
console.log(`Validated ${workPages.length} work page records (${workPages.filter((work) => work.status === 'ready').length} ready).`);
