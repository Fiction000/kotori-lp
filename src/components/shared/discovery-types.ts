export type SharedLocale = 'ja' | 'en';

/** A portable work record for discovery lists and editorial recommendations. */
export type DiscoveryBook = {
  id?: string;
  title: string;
  author: string;
  href: string;
  summary?: string;
  category?: string;
  /** Human-readable category name; falls back to `category` when omitted. */
  categoryLabel?: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
};

export type WorkMetadataItem = {
  label: string;
  value: string;
};

export type SourceLinkItem = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};
