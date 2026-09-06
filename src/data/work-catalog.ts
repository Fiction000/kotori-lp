import { readyWorkPages, type WorkPage } from './work-pages.ts';

export type PublicationEra = 'meiji' | 'taisho' | 'showa';
export type EditorialGenre = 'romance' | 'human-drama' | 'history' | 'fantasy' | 'adventure' | 'youth' | 'mystery' | 'horror' | 'humor';
export type PageRecordStatus = 'draft' | 'ready';
export type PageIndexation = 'index' | 'not-published';
export type OriginalPublicationDate =
  | { precision: 'year'; year: number }
  | { precision: 'month'; year: number; month: number }
  | { precision: 'day'; year: number; month: number; day: number }
  | { precision: 'range'; start: { year: number; month: number; day?: number }; end: { year: number; month: number; day?: number } };
export type Provenance = { source: 'aozora-card' | 'site-editorial' | 'app-curation'; reference?: string; note?: string; };

export type CatalogEdition = {
  /** Provider-specific edition identity; it may change without changing the abstract work. */
  id: string; workID: string; providerBookID: string; providerAuthorID: string; cardURL: string; textURL: string; provenance: Provenance[];
};
export type CatalogWork = {
  /** Site-owned abstract-work identity, deliberately separate from any provider edition. */
  id: string; canonicalEditionID: string; authorSlug: string; originalPublication?: OriginalPublicationDate;
  historicalContext: { publicationEra?: PublicationEra; authorEra?: string; storySetting?: string; };
  editorialGenres: EditorialGenre[]; readingTimeMinutes?: number; provenance: Provenance[];
};
export type AuthorHub = { status: PageRecordStatus; indexation: PageIndexation; slug: string; name: string; aozoraAuthorID: string; seo: { title: string; description: string }; introduction: string; provenance: Provenance[]; };
export type CollectionSelector = { publicationEra?: PublicationEra; genre?: EditorialGenre; author?: string; maxMinutes?: number; };
export type CollectionMembership = { workID: string; reason: string; };
export type CuratedCollection = { status: PageRecordStatus; indexation: PageIndexation; slug: string; name: string; seo: { title: string; description: string }; introduction: string; selector: CollectionSelector; memberships: CollectionMembership[]; provenance: Provenance[]; };
export type DiscoveryFilters = CollectionSelector;

export const editorialGenres: readonly EditorialGenre[] = ['romance', 'human-drama', 'history', 'fantasy', 'adventure', 'youth', 'mystery', 'horror', 'humor'];
export const publicationEras: readonly PublicationEra[] = ['meiji', 'taisho', 'showa'];
export const publicationEraLabels: Record<PublicationEra, string> = { meiji: '明治', taisho: '大正', showa: '昭和' };
export const editorialGenreLabels: Record<EditorialGenre, string> = { romance: '恋愛', 'human-drama': '人間ドラマ', history: '歴史', fantasy: '幻想', adventure: '冒険', youth: '青春', mystery: '謎', horror: '怪異・恐怖', humor: 'ユーモア' };

export const catalogEditions: readonly CatalogEdition[] = [
  { id: 'edition-aozora-000773', workID: 'work-kokoro', providerBookID: '000773', providerAuthorID: '000148', cardURL: 'https://www.aozora.gr.jp/cards/000148/card773.html', textURL: 'https://www.aozora.gr.jp/cards/000148/files/773_14560.html', provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000148/card773.html', note: 'Provider edition and text location.' }] },
  { id: 'edition-aozora-043737', workID: 'work-ginga-tetsudo-no-yoru', providerBookID: '043737', providerAuthorID: '000081', cardURL: 'https://www.aozora.gr.jp/cards/000081/card43737.html', textURL: 'https://www.aozora.gr.jp/cards/000081/files/43737_19215.html', provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000081/card43737.html', note: 'Provider edition and text location.' }] },
  { id: 'edition-aozora-000799', workID: 'work-yumejuya', providerBookID: '000799', providerAuthorID: '000148', cardURL: 'https://www.aozora.gr.jp/cards/000148/card799.html', textURL: 'https://www.aozora.gr.jp/cards/000148/files/799_14972.html', provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000148/card799.html', note: 'Provider edition and text location.' }] },
  { id: 'edition-aozora-000128', workID: 'work-rashomon', providerBookID: '000128', providerAuthorID: '000879', cardURL: 'https://www.aozora.gr.jp/cards/000879/card128.html', textURL: 'https://www.aozora.gr.jp/cards/000879/files/128_15261.html', provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000879/card128.html', note: 'Provider edition and text location.' }] },
  { id: 'edition-aozora-000752', workID: 'work-botchan', providerBookID: '000752', providerAuthorID: '000148', cardURL: 'https://www.aozora.gr.jp/cards/000148/card752.html', textURL: 'https://www.aozora.gr.jp/cards/000148/files/752_14964.html', provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000148/card752.html', note: 'Provider edition and text location.' }] },
];

export const catalogWorks: readonly CatalogWork[] = [
  { id: 'work-kokoro', canonicalEditionID: 'edition-aozora-000773', authorSlug: 'natsume-soseki', originalPublication: { precision: 'range', start: { year: 1914, month: 4 }, end: { year: 1914, month: 8 } }, historicalContext: { publicationEra: 'taisho' }, editorialGenres: ['romance', 'human-drama', 'history'], readingTimeMinutes: 70, provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000148/card773.html', note: 'Original-publication information.' }, { source: 'app-curation', note: 'Genre and reading-time labels are Kotori curation signals, not source facts.' }] },
  { id: 'work-ginga-tetsudo-no-yoru', canonicalEditionID: 'edition-aozora-043737', authorSlug: 'miyazawa-kenji', historicalContext: {}, editorialGenres: ['fantasy', 'adventure', 'youth'], readingTimeMinutes: 45, provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000081/card43737.html', note: 'Publication era is intentionally unset.' }, { source: 'app-curation', note: 'Genre and reading-time labels are Kotori curation signals, not source facts.' }] },
  { id: 'work-yumejuya', canonicalEditionID: 'edition-aozora-000799', authorSlug: 'natsume-soseki', originalPublication: { precision: 'year', year: 1908 }, historicalContext: { publicationEra: 'meiji' }, editorialGenres: ['fantasy', 'mystery', 'horror'], readingTimeMinutes: 25, provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000148/card799.html', note: 'Original-publication information.' }, { source: 'app-curation', note: 'Genre and reading-time labels are Kotori curation signals, not source facts.' }] },
  { id: 'work-rashomon', canonicalEditionID: 'edition-aozora-000128', authorSlug: 'akutagawa-ryunosuke', originalPublication: { precision: 'month', year: 1915, month: 11 }, historicalContext: { publicationEra: 'taisho' }, editorialGenres: ['horror', 'mystery', 'history'], readingTimeMinutes: 12, provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000879/card128.html', note: 'Original-publication information.' }, { source: 'app-curation', note: 'Genre and reading-time labels are Kotori curation signals, not source facts.' }] },
  { id: 'work-botchan', canonicalEditionID: 'edition-aozora-000752', authorSlug: 'natsume-soseki', originalPublication: { precision: 'month', year: 1906, month: 4 }, historicalContext: { publicationEra: 'meiji' }, editorialGenres: ['humor', 'youth', 'human-drama'], readingTimeMinutes: 35, provenance: [{ source: 'aozora-card', reference: 'https://www.aozora.gr.jp/cards/000148/card752.html', note: 'Original-publication information.' }, { source: 'app-curation', note: 'Genre and reading-time labels are Kotori curation signals, not source facts.' }] },
];

export const authorHubs: readonly AuthorHub[] = [
  { status: 'ready', indexation: 'index', slug: 'natsume-soseki', name: '夏目漱石', aozoraAuthorID: '000148', seo: { title: '夏目漱石は何から読む？ はじめての3作品｜コトリ', description: '夏目漱石を初めて読むなら、語り手の声を追う『坊っちゃん』、幻想的な場面を味わう『夢十夜』、人と人の距離を追う『こころ』から。今の気分に合う一冊を選び、作品案内へ進めます。' }, introduction: '夏目漱石の三作品を、語りの調子や作品ごとの距離の違いからたどります。気になる一作から、ゆっくり読み始めてみてください。', provenance: [{ source: 'site-editorial', note: 'Kotoriの公開中作品案内をまとめた編集ページ。' }] },
];
export const curatedCollections: readonly CuratedCollection[] = [
  { status: 'draft', indexation: 'not-published', slug: 'meiji-kaidan', name: '明治の怪談を読む', seo: { title: '明治の怪談を読む｜コトリ', description: '明治期に発表された怪談を集めた作品案内です。' }, introduction: '公開前の編集コレクションです。', selector: { publicationEra: 'meiji', genre: 'horror' }, memberships: [{ workID: 'work-yumejuya', reason: '夢の場面が連なる短い作品として、怪異の気配を入り口に読めます。' }], provenance: [{ source: 'site-editorial', note: '公開前の選書条件。' }] },
];

export const authorHubPath = (author: Pick<AuthorHub, 'slug'>): string => `/authors/${author.slug}/`;
export const collectionPath = (collection: Pick<CuratedCollection, 'slug'>): string => `/collections/${collection.slug}/`;
export const canonicalEditionForWork = (work: CatalogWork): CatalogEdition | undefined => catalogEditions.find((edition) => edition.id === work.canonicalEditionID);
export const catalogEditionForWorkID = (workID: string): CatalogEdition | undefined => { const work = catalogWorks.find((candidate) => candidate.id === workID); return work ? canonicalEditionForWork(work) : undefined; };
export const catalogWorkForBookID = (bookID: string): CatalogWork | undefined => { const edition = catalogEditions.find((candidate) => candidate.providerBookID === bookID); return edition ? catalogWorks.find((work) => work.id === edition.workID) : undefined; };
export const readyAuthorHubs = (): AuthorHub[] => authorHubs.filter((author) => author.status === 'ready' && author.indexation === 'index');
export const readyCollections = (): CuratedCollection[] => curatedCollections.filter((collection) => collection.status === 'ready' && collection.indexation === 'index');
export function readyAuthorHubForWork(work: Pick<WorkPage, 'bookID'>): AuthorHub | undefined { const catalogWork = catalogWorkForBookID(work.bookID); return catalogWork ? readyAuthorHubs().find((author) => author.slug === catalogWork.authorSlug) : undefined; }
export function matchesCollection(work: CatalogWork, selector: CollectionSelector): boolean { return (!selector.publicationEra || work.historicalContext.publicationEra === selector.publicationEra) && (!selector.genre || work.editorialGenres.includes(selector.genre)) && (!selector.author || work.authorSlug === selector.author) && (!selector.maxMinutes || (work.readingTimeMinutes !== undefined && work.readingTimeMinutes <= selector.maxMinutes)); }
export function readyCatalogWorks(): CatalogWork[] { const readyBookIDs = new Set(readyWorkPages().map((work) => work.bookID)); return catalogWorks.filter((work) => { const edition = canonicalEditionForWork(work); return edition !== undefined && readyBookIDs.has(edition.providerBookID); }); }
export function authorNameForSlug(slug: string): string | undefined { const catalogWork = readyCatalogWorks().find((work) => work.authorSlug === slug); const edition = catalogWork && canonicalEditionForWork(catalogWork); return edition ? readyWorkPages().find((work) => work.bookID === edition.providerBookID)?.author : undefined; }
export function workPagesForSelector(selector: CollectionSelector): WorkPage[] { const selectedIDs = new Set(readyCatalogWorks().filter((work) => matchesCollection(work, selector)).map((work) => canonicalEditionForWork(work)?.providerBookID)); return readyWorkPages().filter((work) => selectedIDs.has(work.bookID)); }
export function workPagesForCollection(collection: CuratedCollection): Array<{ work: WorkPage; reason: string }> { const readyPages = new Map(readyWorkPages().map((work) => [work.bookID, work])); return collection.memberships.flatMap((membership) => { const edition = catalogEditionForWorkID(membership.workID); const page = edition && readyPages.get(edition.providerBookID); return page ? [{ work: page, reason: membership.reason }] : []; }); }
export function collectionMembershipForWork(work: Pick<WorkPage, 'bookID'>): CuratedCollection[] { const catalogWork = catalogWorkForBookID(work.bookID); return catalogWork ? readyCollections().filter((collection) => collection.memberships.some((membership) => membership.workID === catalogWork.id)) : []; }
export function parseDiscoveryFilters(searchParams: URLSearchParams): DiscoveryFilters { const author = searchParams.get('author'); const era = searchParams.get('era'); const genre = searchParams.get('genre'); const rawMaxMinutes = searchParams.get('maxMinutes'); const maxMinutes = rawMaxMinutes && /^\d{1,3}$/.test(rawMaxMinutes) ? Number(rawMaxMinutes) : undefined; return { ...(author && catalogWorks.some((work) => work.authorSlug === author) ? { author } : {}), ...(era && publicationEras.includes(era as PublicationEra) ? { publicationEra: era as PublicationEra } : {}), ...(genre && editorialGenres.includes(genre as EditorialGenre) ? { genre: genre as EditorialGenre } : {}), ...(maxMinutes && maxMinutes > 0 && maxMinutes <= 180 ? { maxMinutes } : {}) }; }
export const hasActiveDiscoveryFilter = (filters: DiscoveryFilters): boolean => Object.keys(filters).length > 0;
