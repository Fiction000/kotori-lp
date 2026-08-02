import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../src/data/editorial-manifest.json', import.meta.url)));
const vectors = JSON.parse(await readFile(new URL('../src/data/editorial-selection-vectors.json', import.meta.url)));

assert.equal(manifest.schemaVersion, 1, 'Unsupported editorial schema');
assert.equal(manifest.cadence, 'daily');
assert.equal(manifest.timezone, 'Asia/Tokyo');
assert.match(manifest.contentVersion, /^\d{4}-\d{2}-\d{2}\.\d+$/);
assert.match(manifest.rotation.effectiveFrom, /^\d{4}-\d{2}-\d{2}$/);

const pickIDs = new Set();
const bookIDs = new Set();
for (const pick of manifest.picks) {
  assert(!pickIDs.has(pick.id), `Duplicate pick ID: ${pick.id}`);
  assert(!bookIDs.has(pick.bookID), `Duplicate book ID: ${pick.bookID}`);
  pickIDs.add(pick.id);
  bookIDs.add(pick.bookID);
  assert.match(pick.source.cardURL, /^https:\/\/www\.aozora\.gr\.jp\/cards\//);

  for (const locale of ['ja', 'en']) {
    const copy = pick.locales[locale];
    assert(copy, `${pick.id} is missing ${locale} copy`);
    assert(copy.title.trim(), `${pick.id}.${locale}.title is empty`);
    assert(copy.author.trim(), `${pick.id}.${locale}.author is empty`);
    assert.equal(copy.summaryLines.length, 3, `${pick.id}.${locale} needs exactly three summary lines`);
    assert(copy.summaryLines.every((line) => line.trim()), `${pick.id}.${locale} has an empty summary line`);
    assert(copy.whyNow.trim(), `${pick.id}.${locale}.whyNow is empty`);
    assert(copy.background.trim(), `${pick.id}.${locale}.background is empty`);
  }
}

assert(manifest.rotation.pickIDs.length > 0, 'Rotation is empty');
assert.equal(new Set(manifest.rotation.pickIDs).size, manifest.rotation.pickIDs.length, 'Rotation contains duplicates');
for (const id of manifest.rotation.pickIDs) {
  assert(pickIDs.has(id), `Rotation references unknown pick: ${id}`);
  assert.equal(manifest.picks.find((pick) => pick.id === id).status, 'ready', `Rotation pick is not ready: ${id}`);
}

const format = new Intl.DateTimeFormat('en-CA', {
  timeZone: manifest.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const serialDay = (year, month, day) => Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
const [anchorYear, anchorMonth, anchorDay] = manifest.rotation.effectiveFrom.split('-').map(Number);
const anchor = serialDay(anchorYear, anchorMonth, anchorDay);

for (const vector of vectors) {
  const parts = format.formatToParts(new Date(vector.instant));
  const part = (type) => Number(parts.find((item) => item.type === type)?.value);
  const elapsed = serialDay(part('year'), part('month'), part('day')) - anchor;
  const index = ((elapsed % manifest.rotation.pickIDs.length) + manifest.rotation.pickIDs.length)
    % manifest.rotation.pickIDs.length;
  assert.equal(manifest.rotation.pickIDs[index], vector.pickID, `Selection mismatch at ${vector.instant}`);
}

try {
  const appSnapshot = JSON.parse(await readFile(
    new URL('../../../code/kotori/kotori/Resources/editorial_manifest.json', import.meta.url)
  ));
  assert.deepEqual(appSnapshot, manifest, 'The bundled Kotori manifest is out of sync; run npm run sync:editorial:app');
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

console.log(`Validated ${manifest.picks.length} bilingual editorial picks and ${vectors.length} JST selection vectors.`);
