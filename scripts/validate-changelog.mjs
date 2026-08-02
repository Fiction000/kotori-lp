import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

const manifest = JSON.parse(await readFile(new URL('../src/data/changelog-manifest.json', import.meta.url)));
const requireSource = process.argv.includes('--require-source');
const checkSource = requireSource || Boolean(process.env.KOTORI_APP_ROOT);

assert.equal(manifest.schemaVersion, 1, 'Unsupported changelog schema');
assert(Array.isArray(manifest.releases) && manifest.releases.length > 0, 'Changelog has no releases');
assert.match(manifest.source.appStoreURL, /^https:\/\/apps\.apple\.com\/jp\/app\//);

const versions = new Set();
let previousDate = '9999-12-31';

for (const release of manifest.releases) {
  assert.match(release.version, /^\d+\.\d+\.\d+$/, `Invalid version: ${release.version}`);
  assert(!versions.has(release.version), `Duplicate version: ${release.version}`);
  versions.add(release.version);
  assert.equal(release.status, 'released', `${release.version} is not released`);
  assert.match(release.releasedAt, /^\d{4}-\d{2}-\d{2}$/, `Invalid release date: ${release.version}`);
  assert.equal(release.dateSource, 'app-store-version-history', `Missing public date source: ${release.version}`);
  assert(release.releasedAt <= previousDate, 'Changelog releases must be newest first');
  previousDate = release.releasedAt;
  assert.equal(release.sourceLedger, `${release.version}.md`, `Unexpected ledger for ${release.version}`);

  for (const locale of ['ja', 'en']) {
    const copy = release.locales?.[locale];
    assert(copy?.title?.trim(), `${release.version}.${locale}.title is empty`);
    assert(Array.isArray(copy.items) && copy.items.length >= 1 && copy.items.length <= 3,
      `${release.version}.${locale} needs 1-3 items`);
    assert(copy.items.every((item) => item.trim()), `${release.version}.${locale} has an empty item`);
  }
}

const appRoot = process.env.KOTORI_APP_ROOT
  ? resolve(process.env.KOTORI_APP_ROOT)
  : resolve(homedir(), 'code/kotori');

let checkedLedgers = 0;
if (checkSource) {
  for (const release of manifest.releases) {
    try {
      const ledger = await readFile(resolve(appRoot, 'RELEASES', release.sourceLedger), 'utf8');
      assert.match(ledger, new RegExp(`^# Release ${release.version}$`, 'm'));
      assert.match(ledger, /^- \*\*Status:\*\* Released$/m,
        `${release.version} is public but its native release ledger is not Released`);
      checkedLedgers += 1;
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }

  try {
    const ledgerFiles = (await readdir(resolve(appRoot, 'RELEASES')))
      .filter((file) => /^\d+\.\d+\.\d+\.md$/.test(file));

    for (const file of ledgerFiles) {
      const ledger = await readFile(resolve(appRoot, 'RELEASES', file), 'utf8');
      if (/^- \*\*Status:\*\* Released$/m.test(ledger)) {
        const version = file.replace(/\.md$/, '');
        assert(versions.has(version), `${version} is Released in the native ledger but missing from the public changelog`);
      }
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

const ledgerNote = checkedLedgers === manifest.releases.length
  ? ' and matched the native release ledgers'
  : '';
const versionLabel = manifest.releases.length === 1 ? 'version' : 'versions';
assert(!requireSource || checkedLedgers === manifest.releases.length,
  `Native release ledgers were not found at ${resolve(appRoot, 'RELEASES')}`);
console.log(`Validated ${manifest.releases.length} bilingual released ${versionLabel}${ledgerNote}.`);
if (!checkSource) {
  console.warn('Native ledger validation skipped; run npm run check:changelog:source with KOTORI_APP_ROOT set.');
}
