import manifestData from './editorial-manifest.json';
import { workPagePathForWeeklyID } from './work-pages';

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
  /** Aozora Bunko book IDs for works that make a natural next read. */
  relatedBookIDs?: string[];
  /** Localized author names for broader curated connections. */
  relatedAuthors?: Record<EditorialLocale, string[]>;
  locales: Record<EditorialLocale, EditorialCopy>;
};

export type EditorialManifest = {
  schemaVersion: number;
  contentVersion: string;
  cadence: 'weekly';
  timezone: 'Asia/Tokyo';
  rotation: {
    effectiveFrom: string;
    pickIDs: string[];
  };
  picks: EditorialPick[];
};

export const editorialManifest = manifestData as EditorialManifest;

export function editorialDetailPath(id: string, locale: EditorialLocale): string {
  const permanentPath = workPagePathForWeeklyID(id);
  if (locale === 'ja' && permanentPath) return permanentPath;
  return `${locale === 'en' ? '/en' : ''}/weekly/${id}/`;
}

export function readyPicks(manifest = editorialManifest): EditorialPick[] {
  const pickByID = new Map(manifest.picks.map((pick) => [pick.id, pick]));
  return manifest.rotation.pickIDs.flatMap((id) => {
    const pick = pickByID.get(id);
    return pick?.status === 'ready' ? [pick] : [];
  });
}

export type TokyoDate = { year: number; month: number; day: number };

function datePartsInTokyo(date: Date, timezone = editorialManifest.timezone): TokyoDate {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day') };
}

export function serialDay(year: number, month: number, day: number): number {
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

export function weekStartSerial(date: TokyoDate): number {
  const day = serialDay(date.year, date.month, date.day);
  // 1970-01-01 was Thursday; Monday is the start of Kotori's editorial week.
  return day - ((day + 3) % 7);
}

export function dateFromSerial(day: number): string {
  return new Date(day * 86_400_000).toISOString().slice(0, 10);
}

function pickForWeekStart(day: number, manifest: EditorialManifest): EditorialPick {
  const picks = readyPicks(manifest);
  if (picks.length === 0) throw new Error('Editorial rotation has no ready picks.');

  const [anchorYear, anchorMonth, anchorDay] = manifest.rotation.effectiveFrom
    .split('-')
    .map(Number);
  const elapsedWeeks = Math.floor((day - serialDay(anchorYear, anchorMonth, anchorDay)) / 7);
  const index = ((elapsedWeeks % picks.length) + picks.length) % picks.length;
  return picks[index];
}

export function weeklyPick(date = new Date(), manifest = editorialManifest): EditorialPick {
  const current = datePartsInTokyo(date, manifest.timezone);
  return pickForWeekStart(weekStartSerial(current), manifest);
}

export type WeeklySelection = { pick: EditorialPick; weekStart: string };

export function recentWeeklySelections(
  date = new Date(),
  manifest = editorialManifest,
  count = readyPicks(manifest).length,
): WeeklySelection[] {
  const current = datePartsInTokyo(date, manifest.timezone);
  const currentWeek = weekStartSerial(current);
  return Array.from({ length: Math.min(count, readyPicks(manifest).length) }, (_, offset) => {
    const start = currentWeek - offset * 7;
    return { pick: pickForWeekStart(start, manifest), weekStart: dateFromSerial(start) };
  });
}

export function localizedPick(pick: EditorialPick, locale: EditorialLocale) {
  const { locales, relatedAuthors, ...basePick } = pick;
  return { ...basePick, relatedAuthors: relatedAuthors?.[locale] ?? [], ...locales[locale] };
}
