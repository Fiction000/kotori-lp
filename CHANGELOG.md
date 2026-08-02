# Public changelog workflow

The native Kotori release ledgers are the source of truth for public changelog eligibility. The LP keeps a curated bilingual projection because its production build cannot depend on a sibling checkout.

## Add a release

1. Confirm the version is marked `Released` in the native app's `RELEASES/<version>.md` ledger.
2. Confirm the public release date in the Apple App Store version history.
3. Add one Japanese and one English reader-facing summary to `src/data/changelog-manifest.json`. Keep each locale to one title and one to three changes; do not copy internal implementation details.
4. Run the source-backed validation:

   ```sh
   KOTORI_APP_ROOT=/path/to/kotori npm run check:changelog:source
   ```

5. Run `npm run build` and confirm both language routes appear in the generated `www` sitemap.

`npm run check:changelog` always validates the committed public data. It reports when native-ledger validation was skipped. Pre-merge source verification must use `npm run check:changelog:source` with the native repository available.
