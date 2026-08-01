import manifestData from './editorial-manifest.json';

export type EditorialLocale = 'ja' | 'en';

export type EditorialCopy = {
  title: string;
  author: string;
  summaryLines: string[];
  whyNow: string;
  background: string;
  quote: string | null;
};

export type EditorialPick = {
  id: string;
  bookID: string;
  status: 'draft' | 'reviewed' | 'ready';
  source: { cardURL: string };
  locales: Record<EditorialLocale, EditorialCopy>;
};

export type EditorialManifest = {
  schemaVersion: number;
  contentVersion: string;
  cadence: 'daily';
  timezone: 'Asia/Tokyo';
  rotation: {
    effectiveFrom: string;
    pickIDs: string[];
  };
  picks: EditorialPick[];
};

export const editorialManifest = manifestData as EditorialManifest;

export function readyPicks(manifest = editorialManifest): EditorialPick[] {
  const pickByID = new Map(manifest.picks.map((pick) => [pick.id, pick]));
  return manifest.rotation.pickIDs.flatMap((id) => {
    const pick = pickByID.get(id);
    return pick?.status === 'ready' ? [pick] : [];
  });
}

function datePartsInTokyo(date: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: editorialManifest.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day') };
}

function serialDay(year: number, month: number, day: number): number {
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

export function dailyPick(date = new Date(), manifest = editorialManifest): EditorialPick {
  const picks = readyPicks(manifest);
  if (picks.length === 0) throw new Error('Editorial rotation has no ready picks.');

  const current = datePartsInTokyo(date);
  const [anchorYear, anchorMonth, anchorDay] = manifest.rotation.effectiveFrom
    .split('-')
    .map(Number);
  const elapsed = serialDay(current.year, current.month, current.day)
    - serialDay(anchorYear, anchorMonth, anchorDay);
  const index = ((elapsed % picks.length) + picks.length) % picks.length;
  return picks[index];
}

export function localizedPick(pick: EditorialPick, locale: EditorialLocale) {
  return { ...pick, ...pick.locales[locale] };
}
