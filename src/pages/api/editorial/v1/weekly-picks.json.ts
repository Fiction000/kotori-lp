import type { APIRoute } from 'astro';
import { editorialManifest } from '../../../../data/editorial';

export const prerender = true;

/**
 * Canonical weekly editorial feed. `picks.json` remains as a stable alias for
 * installed app versions that predate the weekly endpoint.
 */
export const GET: APIRoute = () => new Response(JSON.stringify(editorialManifest), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
  },
});
