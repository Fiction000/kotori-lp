import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../src/data/editorial-manifest.json', import.meta.url));
const defaultDestination = fileURLToPath(
  new URL('../../../code/kotori/kotori/Resources/editorial_manifest.json', import.meta.url)
);
const destination = process.env.KOTORI_APP_ROOT
  ? resolve(process.env.KOTORI_APP_ROOT, 'kotori/Resources/editorial_manifest.json')
  : defaultDestination;

await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);

const [sourceData, destinationData] = await Promise.all([
  readFile(source, 'utf8'),
  readFile(destination, 'utf8'),
]);
if (sourceData !== destinationData) throw new Error('Editorial snapshot verification failed.');
console.log(`Synced editorial manifest to ${destination}`);
