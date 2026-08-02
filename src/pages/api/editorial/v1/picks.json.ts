import type { APIRoute } from 'astro';
import { editorialManifest } from '../../../../data/editorial';

export const prerender = true;

export const GET: APIRoute = () => new Response(JSON.stringify(editorialManifest), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
  },
});
