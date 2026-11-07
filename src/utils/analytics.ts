/**
 * The one analytics utility for the whole site.
 *
 * - Call `track(name, params)` from anywhere in client code.
 * - Links and buttons can also opt in with attributes, no code needed:
 *     <a data-track="youtube_click" data-track-params='{"link_location":"footer"}'>
 * - Clicks on Instagram, YouTube and other external links are tracked automatically.
 *
 * It is a no-op unless PUBLIC_GA4_ID is set at build time. Events are then only kept in a small
 * in-memory list (window.__jaEvents) so tests and debugging can see them; nothing leaves the browser.
 * Add ?analytics_debug=1 to any URL to log events to the console for that tab.
 *
 * Privacy: only content ids, titles and campaign parameters are sent. Never send names, emails,
 * usernames, search text or anything a visitor typed.
 */

export type EventName =
  | 'page_view'
  | 'prompt_copy'
  | 'resource_download'
  | 'resource_view'
  | 'episode_view'
  | 'episode_complete'
  | 'quiz_complete'
  | 'next_episode_click'
  | 'blog_article_view'
  | 'instagram_click'
  | 'youtube_click'
  | 'external_resource_click'
  | 'share'
  | 'prompt_favourite';

type ParamValue = string | number | boolean;
export type EventParams = Partial<Record<(typeof ALLOWED_PARAMS)[number], ParamValue>>;

const ALLOWED_PARAMS = [
  'resource_id',
  'resource_title',
  'episode_id',
  'episode_title',
  'prompt_id',
  'prompt_title',
  'category',
  'tool',
  'file_format',
  'file_name',
  'link_url',
  'link_location',
  'method',
  'page_type',
  'quiz_score',
  'quiz_total',
  'state',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
] as const;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const UTM_STORE = 'ja_utm';
const DEBUG_STORE = 'ja_analytics_debug';

const GA4_ID = String(import.meta.env.PUBLIC_GA4_ID ?? '').trim();
/** True only for a real-looking GA4 Measurement ID. */
export const GA4_ENABLED = /^G-[A-Z0-9]{4,}$/i.test(GA4_ID);

interface LoggedEvent {
  name: EventName;
  params: EventParams;
  at: number;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __jaEvents?: LoggedEvent[];
    __jaAnalyticsReady?: boolean;
  }
}

function session(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** UTM values from this URL, or from earlier in the same tab session (first touch wins in a session). */
function utmParams(): EventParams {
  const out: EventParams = {};
  try {
    const url = new URL(window.location.href);
    const fromUrl: EventParams = {};
    for (const key of UTM_KEYS) {
      const v = url.searchParams.get(key);
      if (v) fromUrl[key] = v.slice(0, 60);
    }
    const store = session();
    if (Object.keys(fromUrl).length) {
      store?.setItem(UTM_STORE, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = store?.getItem(UTM_STORE);
    if (saved) Object.assign(out, JSON.parse(saved));
  } catch {
    /* ignore */
  }
  return out;
}

function sanitize(params: Record<string, unknown>): EventParams {
  const clean: EventParams = {};
  for (const key of ALLOWED_PARAMS) {
    const v = params[key];
    if (typeof v === 'number' || typeof v === 'boolean') clean[key] = v;
    else if (typeof v === 'string' && v.length) clean[key] = v.slice(0, 100);
  }
  return clean;
}

function debugEnabled(): boolean {
  try {
    if (new URL(window.location.href).searchParams.get('analytics_debug') === '1') session()?.setItem(DEBUG_STORE, '1');
    return session()?.getItem(DEBUG_STORE) === '1';
  } catch {
    return false;
  }
}

export function track(name: EventName, params: Record<string, unknown> = {}): void {
  try {
    const clean = sanitize({ ...utmParams(), ...params });
    const log = (window.__jaEvents ??= []);
    log.push({ name, params: clean, at: Date.now() });
    if (log.length > 50) log.shift();
    if (debugEnabled()) console.info('[analytics]', name, clean);
    // GA4 sends its own page_view from the config call, so ours stays local.
    if (name === 'page_view') return;
    if (GA4_ENABLED && typeof window.gtag === 'function') window.gtag('event', name, clean);
  } catch {
    /* analytics must never break the page */
  }
}

function readParams(el: Element): Record<string, unknown> {
  const raw = el.getAttribute('data-track-params');
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function classifyExternal(a: HTMLAnchorElement): EventName | null {
  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol) || url.origin === window.location.origin) return null;
  const host = url.hostname.replace(/^www\./, '');
  if (host === 'instagram.com') return 'instagram_click';
  if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') return 'youtube_click';
  return 'external_resource_click';
}

/** Wire up page-level events and delegated click tracking. Safe to call more than once. */
export function initAnalytics(): void {
  if (window.__jaAnalyticsReady) return;
  window.__jaAnalyticsReady = true;

  const body = document.body;
  const pageType = body.dataset.pageType ?? 'page';
  track('page_view', { page_type: pageType });

  const pageEvent = body.dataset.pageEvent as EventName | undefined;
  if (pageEvent) track(pageEvent, { page_type: pageType, ...readParams(body) });

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      const tagged = target.closest('[data-track]');
      if (tagged) {
        track(tagged.getAttribute('data-track') as EventName, readParams(tagged));
        return;
      }
      const a = target.closest('a[href]');
      if (a instanceof HTMLAnchorElement) {
        const kind = classifyExternal(a);
        if (kind) {
          const url = new URL(a.href);
          track(kind, {
            link_url: (url.hostname + url.pathname).slice(0, 100),
            link_location: a.closest('[data-section]')?.getAttribute('data-section') ?? pageType,
          });
        }
      }
    },
    { capture: true },
  );
}
