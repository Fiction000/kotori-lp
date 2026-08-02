# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Japanese readers who want to discover and read Aozora Bunko literature on iPhone, including readers who benefit from vertical text, dictionary lookup, highlights, and offline access.

## Product Purpose

Kotori is a free iOS reader that helps people find Aozora Bunko works, read them comfortably in vertical text, look up unfamiliar words, and keep memorable passages. The website explains the app, offers a daily editorial pick, provides support and privacy information, and records reader-visible improvements.

## Positioning

Kotori joins discovery, a Japanese vertical-reading experience, in-reader dictionary lookup, highlights, and offline access without advertising or account registration.

## Operating Context

Readers discover Kotori on the bilingual website, download it from the Japanese App Store, and read Japanese literature on iPhone. Public release information is prepared from the native app repository's `RELEASES/*.md` ledgers.

## Capabilities and Constraints

- The site is bilingual: Japanese is the default and English routes use `/en/`.
- The app is free, has no ads, requires no account, and supports offline reading.
- Only releases marked `Released` in the native app ledgers may appear on the public changelog.
- The LP keeps a committed, curated bilingual projection so production builds do not depend on a sibling local repository.
- Internal implementation details and draft release notes are not public copy.

## Brand Commitments

The product is named コトリ / Kotori. Public release notes are quiet, warm, concise, and describe how a reader's experience changed. The incumbent website's paper-and-blue-ink identity remains authoritative for extensions.

## Evidence on Hand

- App release workflow and voice: `/Users/kawana/code/kotori/RELEASE.md`
- Release ledgers: `/Users/kawana/code/kotori/RELEASES/`
- App Store listing: app ID `6759166859`
- Existing bilingual website copy and product screenshots in this repository

The release ledgers do not currently contain English public copy. English changelog summaries must be faithful translations of confirmed reader-visible changes.

## Product Principles

- Help readers move from discovery into reading with minimal friction.
- Describe benefits in the language of reading, not implementation.
- Keep public claims traceable to product or release evidence.
- Preserve Japanese as the primary language while maintaining complete English routes.
