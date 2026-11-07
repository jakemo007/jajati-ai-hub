// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

// SITE_URL comes from the environment (Cloudflare Pages env var or a local .env file).
// Until a real domain is configured, the default Pages address is used.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SITE_URL = (env.SITE_URL || process.env.SITE_URL || 'https://jajati-ai-hub.pages.dev').replace(/\/+$/, '');

// Short, typeable paths for spoken or written CTAs ("jajati-ai-hub.pages.dev/prompt").
// On Cloudflare Pages, public/_redirects answers these with a real HTTP redirect first.
// These static fallbacks keep them working in `astro preview` and on any other host.
// Keep the two lists in sync (tests/check-dist.mjs compares them).
export const SHORT_LINKS = {
  '/prompt': '/free-resources/chatgpt-prompt-cheatsheet/',
  '/sach': '/free-resources/ai-hallucination-cheatsheet/',
  '/rag': '/free-resources/rag-notebooklm-cheatsheet/',
};

// The blog index is noindex while it has no published posts, so it stays out of the sitemap too.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const hasBlogPosts =
  existsSync(blogDir) &&
  readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .some((f) => /^status:\s*['"]?published/m.test(readFileSync(new URL(f, blogDir), 'utf8')));

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  redirects: SHORT_LINKS,
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        if (path === '/blog' && !hasBlogPosts) return false;
        return !Object.keys(SHORT_LINKS).includes(path) && !path.startsWith('/404');
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
