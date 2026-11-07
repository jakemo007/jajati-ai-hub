import type { APIRoute } from 'astro';

/** robots.txt points crawlers at the sitemap on the configured SITE_URL. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://jajati-ai-hub.pages.dev').toString();
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
