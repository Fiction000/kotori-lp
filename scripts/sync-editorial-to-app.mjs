import { copyFile, mkdir, readFile, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../src/data/editorial-manifest.json', import.meta.url));
const defaultAppRoot = resolve(homedir(), 'code/kotori');
const appRoot = process.env.KOTORI_APP_ROOT
  ? resolve(process.env.KOTORI_APP_ROOT)
  : defaultAppRoot;
const destination = resolve(appRoot, 'kotori/Resources/editorial_manifest.json');

if (!process.env.KOTORI_APP_ROOT) {
  const appRootStats = await stat(appRoot).catch(() => null);
  if (!appRootStats?.isDirectory()) {
    throw new Error(
      `Default Kotori app checkout not found at ${appRoot}. Set KOTORI_APP_ROOT to its repository root.`
    );
  }
}

await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);

const [sourceData, destinationData] = await Promise.all([
  readFile(source, 'utf8'),
  readFile(destination, 'utf8'),
]);
if (sourceData !== destinationData) throw new Error('Editorial snapshot verification failed.');
console.log(`Synced editorial manifest to ${destination}`);
