# Editorial picks

`src/data/editorial-manifest.json` is the canonical source for Kotori's daily
editorial pick on the website and in the iOS app. The site publishes the same
manifest at `/api/editorial/v1/picks.json`; the app caches that feed and ships a
snapshot as `kotori/Resources/editorial_manifest.json` for offline use.

## Publishing workflow

1. Add or edit the Japanese copy and verify the Aozora Bunko card URL.
2. Add the English copy. A literary quotation may be `null` in English; the
   app explicitly retains the verified Japanese passage as its reading sample.
3. Keep the pick out of `rotation.pickIDs` until both locales are reviewed.
4. Set `status` to `ready`, add the ID to the ordered rotation, and increment
   `contentVersion`.
5. Run `npm run check:editorial`.
6. Run `npm run sync:editorial:app` to update the Kotori app bundle, then run
   the matching Swift selection-vector tests before publishing either repository.

The date changes at midnight in `Asia/Tokyo`. Selection is the positive modulo
of whole Tokyo calendar days since `rotation.effectiveFrom`; the ordered
`rotation.pickIDs` array is shared by TypeScript and Swift. The fixtures in
`src/data/editorial-selection-vectors.json` define the cross-platform contract.

## Content rules

- The same book ID must be selected in Japanese and English.
- English routes must never silently fall back to Japanese editorial prose.
- Pick IDs and book IDs are unique.
- Every ready pick has exactly three non-empty summary lines in both locales.
- Quotes must come from the linked Aozora Bunko source record.
- Build a larger reviewed pool before promoting the daily feature broadly; the
  initial four entries prove the pipeline but repeat too quickly for launch.
