/** URL helpers. Every internal URL ends with a slash, matching the built folders. */

export function withSlash(path: string): string {
  if (/\.[a-z0-9]+$/i.test(path) || path.endsWith('/')) return path;
  return `${path}/`;
}

/** Absolute URL on the configured site (SITE_URL). */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(withSlash(path), site ?? 'https://jajati-ai-hub.pages.dev').toString();
}

export const paths = {
  prompt: (id: string) => `/prompts/${id}/`,
  resource: (id: string) => `/free-resources/${id}/`,
  episode: (id: string) => `/episodes/${id}/`,
  blog: (id: string) => `/blog/${id}/`,
  file: (name: string) => `/resources/${name}`,
};

/** Add UTM parameters for campaign links (used in docs and the deliverables, not for internal links). */
export function utm(url: string, source: string, medium: string, campaign: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}

/** JSON for a data-track-params attribute. */
export function trackParams(params: Record<string, string | number | undefined>): string {
  return JSON.stringify(Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)));
}
