# Editorial picks

`src/data/editorial-manifest.json` is the canonical source for Kotori's weekly
editorial pick on the website and in the iOS app. The site publishes the same
manifest at `/api/editorial/v1/weekly-picks.json`. `/api/editorial/v1/picks.json`
remains a compatibility alias for released app versions. The app caches the feed
and ships a snapshot as `kotori/Resources/editorial_manifest.json` for offline use.

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
   By default, the script expects the app checkout at `~/code/kotori`. If it is
   elsewhere, set `KOTORI_APP_ROOT` to the app repository root; the manifest is
   written to `$KOTORI_APP_ROOT/kotori/Resources/editorial_manifest.json`.

The selection changes every Monday at midnight in `Asia/Tokyo`. Selection is the
positive modulo of whole Tokyo calendar weeks since `rotation.effectiveFrom`, which
must itself be a Monday; the ordered
`rotation.pickIDs` array is shared by TypeScript and Swift. The fixtures in
`src/data/editorial-selection-vectors.json` define the cross-platform contract.

## Content rules

- The same book ID must be selected in Japanese and English.
- English routes must never silently fall back to Japanese editorial prose.
- Pick IDs and book IDs are unique.
- A published weekly rotation contains at least 12 ready picks.
- Every ready pick has exactly three non-empty summary lines in both locales.
- Quotes must come from the linked Aozora Bunko source record.
- `relatedBookIDs` holds Aozora Bunko book IDs. The app can resolve them against
  its full catalog; the website links those that are also in the reviewed pick
  pool. Use localized `relatedAuthors.ja` and `relatedAuthors.en` values for
  broader curated author connections.
