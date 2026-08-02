import manifest from './changelog-manifest.json';

export type ChangelogLocale = 'ja' | 'en';

export interface LocalizedRelease {
  version: string;
  releasedAt: string;
  sourceLedger: string;
  title: string;
  items: string[];
}

export function releasedChangelog(locale: ChangelogLocale): LocalizedRelease[] {
  return manifest.releases
    .filter((release) => release.status === 'released')
    .map((release) => ({
      version: release.version,
      releasedAt: release.releasedAt,
      sourceLedger: release.sourceLedger,
      ...release.locales[locale],
    }));
}
