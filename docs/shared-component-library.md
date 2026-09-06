# Shared component library

Reusable Astro components live in `src/components/shared/`. The Japanese and English previews are `/component-library/` and `/en/component-library/`. Preview pages are marked `noindex` and excluded from the sitemap. They are development references, not navigation destinations.

## Contracts

- Pass `lang="ja"` or `lang="en"` explicitly when composing content. The caller supplies translated titles, summaries, labels, reviews, and book data; components localize their own controls. Do not translate Japanese book titles automatically or imply an English edition exists.
- Use the existing `global.css` tokens, font families, focus styles, and reduced-motion rules through `Layout`. Content containers have fluid widths; titles wrap without truncation.
- Use real anchors for navigation, buttons for actions, native details for disclosures, and unique IDs when a component requests one. No autoplay. Browse content and menus remain available without JavaScript.
- Review and rating data must be sourced. Preview examples are labeled fixtures, not customer evidence. Contact submission restoration is blocked by automatic approval review. The form validates input and reports that no message was sent. Do not deploy this branch until the original Web3Forms integration is restored with explicit approval.
- QR codes and a demo video player remain optional and are not included until those assets are selected.

## Families

| Family | Components |
| --- | --- |
| Download | `DownloadAction`, `DownloadCTA` (compact, closing, book), existing `AppStoreBadge` |
| Structure | `ContentContainer`, `SectionHeading` (introductory text), `Divider`, `LiteraryOrnament` |
| Media | `ScreenshotFrame`, `ImageCaption`, `FeatureRow` |
| Proof | `RatingDisplay`, `ReviewCard`, `ReviewCollection`, `CarouselControls` |
| Discovery | `BookCard`, `FeaturedPickCard`, `BookRow`, `RelatedReading` |
| Browse | `BrowseCollection` (search, category, live count, clear, empty state) |
| Editorial | `ArticleHeader`, `WorkMetadata`, `Excerpt`, `SourceLinks`, `RelatedReading` |
| Help | `FAQItem`, `FAQGroup`, `SupportPrompt`, existing `ContactForm` |
| Updates | `ReleaseEntry`, `ReleaseLabel` |
| Utilities | `LanguageSwitch`, `MobileMenu`, `AnalyticsSettings`, existing `AnalyticsConsent`, global focus/motion styles |

The existing site components remain the page-level composition layer. The shared directory holds reusable pieces; page-specific content stays with the page/data source.

## Verification

Review both preview routes at 320px, 375px, and desktop widths. Exercise keyboard menu open/Escape, FAQ disclosures, search/no results/clear, carousel boundaries, and form invalid/pending/success/error states. Verify multiple instances do not share state and reduced motion removes smooth scrolling. Automated accessibility checks supplement visual and keyboard review; they do not establish full screen-reader acceptance.
Kotori shared component API
===========================

All components live in `src/components/shared/`. They use the existing sepia
Tailwind tokens and `font-koburi`; their content is supplied by the caller.

ContentContainer
  <ContentContainer width="narrow|default|wide|full" padding="compact|default|relaxed">
    ...
  </ContentContainer>
  The default is a max-w-5xl container with px-6 padding. Use `as` for a
  semantic wrapper (`div`, `section`, `article`, `header`, or `footer`).

SectionHeading
  <SectionHeading title="..." eyebrow="..." description="..." level={2} align="start|center" />
  Named `eyebrow`, `title`, and `description` slots can replace string props.
  It keeps long titles readable at narrow widths.

Divider and LiteraryOrnament
  <Divider /> renders a rule; pass `label` for a labelled divider.
  <LiteraryOrnament mark="✦" size="small|medium|large" tone="subtle|default" />
  The ornament is decorative and hidden from assistive technology.

ScreenshotFrame and ImageCaption
  <ScreenshotFrame src="..." alt="..." srcSet="..." width={800} height={1739} caption="..." />
  `caption` may instead be supplied with a named `caption` slot.
  <ImageCaption text="..." align="start|center|end" /> also accepts its default slot.

FeatureRow
  <FeatureRow title="..." description="..." mediaPosition="start|end">
    <div slot="media">...</div>
    <span slot="eyebrow">...</span>
    <a slot="action" href="...">...</a>
  </FeatureRow>
  The default slot replaces `description` when richer body content is needed.

RatingDisplay
  <RatingDisplay rating={4.6} max={5} source="App Store" lang="ja|en" />
  There is deliberately no default rating. If `rating` is omitted, the component
  renders nothing, avoiding an unverified rating claim.

ReviewCard and ReviewCollection
  <ReviewCard quote="..." source="..." lang="ja|en" />
  <ReviewCollection reviews={[{ quote: '...', source: '...' }]} title="..." note="..." lang="ja|en" />
  ReviewCollection defaults to an accessible two-column grid. Set `carousel`
  to use an overflow scroller and controls. Give a stable `id` whenever the
  rendered section needs a predictable anchor; generated IDs are otherwise
  unique for the response.

CarouselControls
  <CarouselControls targetScroller="review-scroller" lang="ja|en" />
  `targetScroller` is the ID of an overflow-x scroll element. Instances are
  isolated by their target; buttons update their disabled state on scroll and
  resize. There is no autoplay. `scrollFraction` defaults to 0.85 and motion
  follows the user’s reduced-motion setting.
Shared discovery/editorial component usage

Import types from src/components/shared/discovery-types.ts. DiscoveryBook requires title, author, and href; summary, category/categoryLabel, image/imageAlt, and meta are optional.

BrowseCollection server-renders every supplied book. Give category values to enable its optional category buttons; search and result counts enhance within each kotori-browse-collection element with no global IDs.

ArticleHeader has required title and optional eyebrow, author, summary, backHref/backLabel, and titleSize. It accepts named media and after slots.
WorkMetadata accepts items: [{ label, value }]. Excerpt accepts quoted content through its default slot plus optional citation/source. SourceLinks accepts links: [{ href, label, description?, external? }]. RelatedReading accepts books and composes BookCard.

All components accept lang="ja" | "en" and default to Japanese. BookCard, FeaturedPickCard, and BookRow require title, author, and href.
Actions/help/updates primitives

All primitives accept `lang?: Lang` (`'ja' | 'en'`) and otherwise infer the URL locale.

- DownloadAction: `{ lang?, location?, variant?: 'dark' | 'light' }`. Wraps AppStoreBadge and passes locale explicitly.
- DownloadCTA: `{ lang?, variant?: 'compact' | 'closing' | 'book', title?, body?, bookTitle?, location? }`. `closing` preserves the landing-page closing treatment; `bookTitle` adds a book context line.
- FAQItem: `{ lang?, question, answer, open? }`. Renders native `<details>`.
- FAQGroup: `{ id, data: Array<{ question, answer }>, lang?, title?, openFirst? }`. Uses native details through FAQItem.
- SupportPrompt: `{ lang?, title?, body?, href?, linkLabel? }`.
- ReleaseLabel: `{ lang?, version, releasedAt, isLatest?, latestLabel? }`.
- ReleaseEntry: `{ lang?, release: LocalizedRelease, isLatest?, latestLabel? }`.

ContactForm accepts `{ id?, lang? }`. Its element IDs and client behavior scope to the rendered form instance. It validates with keyboard-accessible error feedback and reports submission unavailability. Restoration of the existing Web3Forms request is pending explicit approval; this branch is not ready to deploy.
