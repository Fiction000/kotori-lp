import assert from 'node:assert/strict';
import {
  authorHubs, authorHubPath, canonicalEditionForWork, catalogEditionForWorkID, catalogEditions, catalogWorkForBookID, catalogWorks,
  collectionPath, curatedCollections, editorialGenres, matchesCollection, publicationEras, readyAuthorHubs, readyCatalogWorks,
  readyCollections, workPagesForCollection,
} from '../src/data/work-catalog.ts';
import { readyWorkPages, workPages, workPagePath } from '../src/data/work-pages.ts';

const knownGenres = new Set(editorialGenres);
const knownEras = new Set(publicationEras);
const workIDs = new Set();
const editionIDs = new Set();
const providerBookIDs = new Set();

function assertDatePart(date, label) {
  assert(Number.isInteger(date.year) && date.year >= 1600 && date.year <= 2100, `${label}.year is invalid`);
  assert(Number.isInteger(date.month) && date.month >= 1 && date.month <= 12, `${label}.month is invalid`);
  if (date.day !== undefined) assert(Number.isInteger(date.day) && date.day >= 1 && date.day <= 31, `${label}.day is invalid`);
}

function eraForDate(date) {
  if (date.year < 1912) return 'meiji';
  if (date.year === 1912) {
    if (date.month < 7) return 'meiji';
    if (date.month > 7) return 'taisho';
    if (date.day === undefined) return undefined;
    return date.day <= 29 ? 'meiji' : 'taisho';
  }
  if (date.year < 1926) return 'taisho';
  if (date.year === 1926) {
    if (date.month < 12) return 'taisho';
    if (date.day === undefined) return undefined;
    return date.day <= 24 ? 'taisho' : 'showa';
  }
  return 'showa';
}

function eraForYear(year) {
  if (year < 1912) return 'meiji';
  if (year === 1912 || year === 1926) return undefined;
  if (year < 1926) return 'taisho';
  return 'showa';
}

for (const edition of catalogEditions) {
  assert.match(edition.id, /^edition-aozora-\d{6}$/, `${edition.id} is not a stable edition ID`);
  assert.match(edition.workID, /^work-[a-z0-9-]+$/, `${edition.id}.workID is invalid`);
  assert.match(edition.providerBookID, /^\d{6}$/, `${edition.id}.providerBookID must be six digits`);
  assert.match(edition.providerAuthorID, /^\d{6}$/, `${edition.id}.providerAuthorID must be six digits`);
  assert(edition.cardURL.startsWith(`https://www.aozora.gr.jp/cards/${edition.providerAuthorID}/card${Number(edition.providerBookID)}.html`), `${edition.id}.cardURL does not match provider IDs`);
  assert(edition.textURL.startsWith(`https://www.aozora.gr.jp/cards/${edition.providerAuthorID}/files/${Number(edition.providerBookID)}_`), `${edition.id}.textURL does not match provider IDs`);
  assert(!editionIDs.has(edition.id), `Duplicate edition ID: ${edition.id}`);
  assert(!providerBookIDs.has(edition.providerBookID), `Duplicate provider book ID: ${edition.providerBookID}`);
  assert(edition.provenance.length > 0 && edition.provenance.every((entry) => entry.source && entry.note), `${edition.id} needs complete provenance`);
  editionIDs.add(edition.id);
  providerBookIDs.add(edition.providerBookID);
}

for (const work of catalogWorks) {
  assert.match(work.id, /^work-[a-z0-9-]+$/, `${work.id} is not a stable site work ID`);
  assert(!('aozoraEditionID' in work) && !('workPageBookID' in work), `${work.id} must not store provider edition IDs directly`);
  assert(!workIDs.has(work.id), `Duplicate work ID: ${work.id}`);
  const edition = canonicalEditionForWork(work);
  assert(edition, `${work.id} is missing its canonical edition`);
  assert.equal(edition.workID, work.id, `${work.id} canonical edition points to another work`);
  assert(work.provenance.length > 0 && work.provenance.every((entry) => entry.source && entry.note), `${work.id} needs complete provenance`);
  assert(work.editorialGenres.length > 0 && work.editorialGenres.every((genre) => knownGenres.has(genre)), `${work.id} has an unsupported genre`);
  assert.equal(new Set(work.editorialGenres).size, work.editorialGenres.length, `${work.id} repeats a genre`);
  if (work.readingTimeMinutes !== undefined) assert(work.readingTimeMinutes > 0, `${work.id}.readingTimeMinutes must be positive`);
  if (work.historicalContext.publicationEra) assert(knownEras.has(work.historicalContext.publicationEra), `${work.id} has an unsupported publication era`);

  if (work.originalPublication) {
    const publication = work.originalPublication;
    let derivedEra;
    if (publication.precision === 'year') {
      assert(Number.isInteger(publication.year), `${work.id}.originalPublication.year is invalid`);
      derivedEra = eraForYear(publication.year);
    } else if (publication.precision === 'range') {
      assertDatePart(publication.start, `${work.id}.originalPublication.start`);
      assertDatePart(publication.end, `${work.id}.originalPublication.end`);
      const startEra = eraForDate(publication.start);
      const endEra = eraForDate(publication.end);
      derivedEra = startEra && startEra === endEra ? startEra : undefined;
    } else {
      assertDatePart(publication, `${work.id}.originalPublication`);
      derivedEra = eraForDate(publication);
    }
    if (derivedEra) assert.equal(work.historicalContext.publicationEra, derivedEra, `${work.id} has the wrong derived publication era`);
    else assert.equal(work.historicalContext.publicationEra, undefined, `${work.id} must leave an unresolved era unset`);
  }
  workIDs.add(work.id);
}

for (const work of workPages) {
  const catalogWork = catalogWorkForBookID(work.bookID);
  assert(catalogWork, `${work.slug} has no catalog work`);
  const edition = canonicalEditionForWork(catalogWork);
  assert(edition, `${work.slug} has no canonical edition`);
  assert.equal(edition.providerBookID, work.bookID, `${work.slug} does not map through its canonical edition`);
  assert.equal(edition.providerAuthorID, work.authorAozoraID, `${work.slug} author ID does not match its canonical edition`);
  assert.equal(edition.cardURL, work.sources.cardURL, `${work.slug} card URL differs from its canonical edition`);
  assert.equal(edition.textURL, work.sources.textURL, `${work.slug} text URL differs from its canonical edition`);
}
assert.equal(catalogWorks.length, workPages.length, 'Catalog must cover every work-page record');

const authorsBySlug = new Set();
const authorRoutes = new Set();
const seoTitles = new Set();
const seoDescriptions = new Set();
for (const work of readyWorkPages()) {
  assert(!seoTitles.has(work.seo.title) && !seoDescriptions.has(work.seo.description), `Duplicate work SEO metadata: ${work.slug}`);
  seoTitles.add(work.seo.title); seoDescriptions.add(work.seo.description);
}
for (const author of authorHubs) {
  assert.match(author.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${author.name} has an invalid author slug`);
  assert.match(author.aozoraAuthorID, /^\d{6}$/, `${author.name} has an invalid Aozora author ID`);
  assert(!(author.status === 'ready' && author.indexation === 'not-published'), `${author.name} cannot be ready but not published`);
  assert(!(author.status === 'draft' && author.indexation === 'index'), `${author.name} cannot be draft but indexable`);
  assert(!authorsBySlug.has(author.slug) && !authorRoutes.has(authorHubPath(author)), `Duplicate author record: ${author.slug}`);
  assert(author.provenance.length > 0, `${author.name} needs provenance`);
  assert(!seoTitles.has(author.seo.title) && !seoDescriptions.has(author.seo.description), `Duplicate author SEO metadata: ${author.name}`);
  authorsBySlug.add(author.slug); authorRoutes.add(authorHubPath(author)); seoTitles.add(author.seo.title); seoDescriptions.add(author.seo.description);
}
for (const author of readyAuthorHubs()) assert(readyCatalogWorks().filter((work) => work.authorSlug === author.slug).length >= 3, `${author.name} needs at least three ready works`);

const collectionSlugs = new Set();
const collectionRoutes = new Set();
for (const collection of curatedCollections) {
  assert.match(collection.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${collection.name} has an invalid collection slug`);
  assert(!(collection.status === 'ready' && collection.indexation === 'not-published'), `${collection.name} cannot be ready but not published`);
  assert(!(collection.status === 'draft' && collection.indexation === 'index'), `${collection.name} cannot be draft but indexable`);
  assert(!collectionSlugs.has(collection.slug) && !collectionRoutes.has(collectionPath(collection)), `Duplicate collection record: ${collection.slug}`);
  assert(collection.provenance.length > 0, `${collection.name} needs provenance`);
  assert(!seoTitles.has(collection.seo.title) && !seoDescriptions.has(collection.seo.description), `Duplicate collection SEO metadata: ${collection.name}`);
  if (collection.selector.publicationEra) assert(knownEras.has(collection.selector.publicationEra), `${collection.slug} has an unsupported era selector`);
  if (collection.selector.genre) assert(knownGenres.has(collection.selector.genre), `${collection.slug} has an unsupported genre selector`);
  if (collection.selector.author) assert(catalogWorks.some((work) => work.authorSlug === collection.selector.author), `${collection.slug} has an unknown author selector`);
  if (collection.selector.maxMinutes) assert(collection.selector.maxMinutes > 0, `${collection.slug} has an invalid reading-time selector`);
  const memberIDs = new Set();
  for (const membership of collection.memberships) {
    assert(membership.reason.trim(), `${collection.slug} membership needs a reason`);
    assert(!memberIDs.has(membership.workID), `${collection.slug} repeats membership ${membership.workID}`);
    const member = catalogWorks.find((work) => work.id === membership.workID);
    assert(member, `${collection.slug} references an unknown work ${membership.workID}`);
    assert(matchesCollection(member, collection.selector), `${collection.slug} member ${membership.workID} does not match its selector`);
    memberIDs.add(membership.workID);
  }
  if (collection.status === 'ready' && collection.indexation === 'index') {
    const readyMembers = workPagesForCollection(collection);
    assert(memberIDs.size >= 5 && readyMembers.length === memberIDs.size, `${collection.name} needs at least five unique ready members`);
  }
  collectionSlugs.add(collection.slug); collectionRoutes.add(collectionPath(collection)); seoTitles.add(collection.seo.title); seoDescriptions.add(collection.seo.description);
}
assert(!readyCollections().some((collection) => collection.slug === 'meiji-kaidan'), 'Draft meiji-kaidan must not be renderable');
assert(curatedCollections.find((collection) => collection.slug === 'meiji-kaidan')?.indexation === 'not-published', 'meiji-kaidan must remain not-published');

const allRoutes = new Set(['/works/', '/authors/']);
for (const work of readyWorkPages()) { const route = workPagePath(work); assert(!allRoutes.has(route), `Duplicate page route: ${route}`); allRoutes.add(route); }
for (const route of authorRoutes) { assert(!allRoutes.has(route), `Duplicate page route: ${route}`); allRoutes.add(route); }
for (const collection of readyCollections()) { const route = collectionPath(collection); assert(!allRoutes.has(route), `Duplicate page route: ${route}`); allRoutes.add(route); }

console.log(`Validated ${catalogWorks.length} works, ${catalogEditions.length} editions, ${readyAuthorHubs().length} ready author hub(s), and ${readyCollections().length} ready collection(s).`);
