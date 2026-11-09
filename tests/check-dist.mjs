/**
 * Static checks on the built site in dist/. Run after `npm run build`:  npm run check:dist
 *
 * - every internal link, image, srcset and og:image points at a file that exists in dist/
 * - every indexable page: one <h1>, a unique <title> and meta description, a canonical URL, lang, valid JSON-LD
 * - sitemap and robots.txt exist; noindex and redirect pages are not in the sitemap
 * - public/_redirects and the SHORT_LINKS in astro.config.mjs list the same short links
 * - nothing private is published: no DM or ledger files, no .env files, no handles or Instagram
 *   profiles other than the creator's own, no email addresses, and (optionally) none of the terms
 *   in DENYLIST_FILE (a text file kept OUTSIDE the repo, one term per line)
 * - no analytics scripts in the HTML unless their env vars were set for the build
 *
 * No dependencies. Exits with code 1 and a list of problems if anything fails.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const problems = [];
const fail = (msg) => problems.push(msg);
const posix = (p) => p.split(sep).join('/');

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

/* ------------------------------------------------------------------ helpers */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const files = walk(dist);
const fileSet = new Set(files.map((f) => '/' + posix(relative(dist, f))));

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    out[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return out;
}
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map((m) => attrs(m[1]));
}
function metaContent(html, key, value) {
  return tags(html, 'meta').find((a) => a[key] === value)?.content;
}

/** Map a URL path to the file Cloudflare Pages / astro preview would serve, or null. */
function resolvePath(pathname) {
  let p = decodeURIComponent(pathname);
  if (fileSet.has(p)) return p;
  if (!p.endsWith('/')) p += '/';
  if (fileSet.has(p + 'index.html')) return p + 'index.html';
  const noSlash = p.replace(/\/$/, '');
  if (fileSet.has(noSlash + '.html')) return noSlash + '.html';
  return null;
}

/* ------------------------------------------------------------------ config */
const configSrc = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
const shortBlock = configSrc.match(/SHORT_LINKS\s*=\s*\{([\s\S]*?)\}/)?.[1] ?? '';
const SHORT_LINKS = Object.fromEntries([...shortBlock.matchAll(/'([^']+)'\s*:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]));
if (!Object.keys(SHORT_LINKS).length) fail('Could not read SHORT_LINKS from astro.config.mjs');

// The site origin the build used, taken from the homepage canonical.
const homeHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const homeCanonical = tags(homeHtml, 'link').find((a) => a.rel === 'canonical')?.href;
const SITE = homeCanonical ? new URL(homeCanonical).origin : null;
if (!SITE) fail('Homepage has no canonical URL, cannot work out the site origin');

/* ------------------------------------------------------------------ pages */
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const titles = new Map();
const descriptions = new Map();
const indexable = [];
const redirectPages = [];
let linkCount = 0;

for (const file of htmlFiles) {
  const rel = '/' + posix(relative(dist, file));
  const route = rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
  const html = readFileSync(file, 'utf8');

  const refresh = tags(html, 'meta').find((a) => (a['http-equiv'] ?? '').toLowerCase() === 'refresh');
  if (refresh) {
    redirectPages.push(route);
    const target = refresh.content?.split('url=')[1];
    if (!target || !resolvePath(new URL(target, SITE ?? 'http://x').pathname))
      fail(`${route}: redirect target ${target} does not exist`);
    continue;
  }

  const robots = metaContent(html, 'name', 'robots') ?? '';
  const noindex = /noindex/i.test(robots);
  if (!noindex) indexable.push(route);

  // lang
  if (!/<html[^>]*\blang="[a-z]{2}/i.test(html)) fail(`${route}: <html> has no lang`);

  // one h1
  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) fail(`${route}: has ${h1s} <h1> elements (want 1)`);

  // title + description
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
  const desc = metaContent(html, 'name', 'description') ?? '';
  if (!title) fail(`${route}: missing <title>`);
  if (title.length > 70) fail(`${route}: title is ${title.length} chars (keep it under 70): ${title}`);
  if (!desc) fail(`${route}: missing meta description`);
  if (desc.length > 170) fail(`${route}: description is ${desc.length} chars (keep it under 170)`);
  if (!noindex) {
    if (titles.has(title)) fail(`${route}: duplicate title with ${titles.get(title)}: ${title}`);
    else titles.set(title, route);
    if (descriptions.has(desc)) fail(`${route}: duplicate description with ${descriptions.get(desc)}`);
    else descriptions.set(desc, route);
  }

  // canonical
  const canonical = tags(html, 'link').find((a) => a.rel === 'canonical')?.href;
  if (!canonical) fail(`${route}: missing canonical`);
  else if (SITE && !noindex) {
    const c = new URL(canonical);
    if (c.origin !== SITE) fail(`${route}: canonical ${canonical} is not on ${SITE}`);
    if (c.pathname !== route && route !== '/404/') fail(`${route}: canonical path ${c.pathname} does not match the page`);
  }

  // og:image and twitter:image exist
  for (const [k, v] of [
    ['property', 'og:image'],
    ['name', 'twitter:image'],
  ]) {
    const img = metaContent(html, k, v);
    if (!img) fail(`${route}: missing ${v}`);
    else if (!resolvePath(new URL(img).pathname)) fail(`${route}: ${v} ${img} not found in dist`);
  }

  // JSON-LD parses
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      if (!data['@context'] && !Array.isArray(data)) fail(`${route}: JSON-LD without @context`);
    } catch (e) {
      fail(`${route}: JSON-LD does not parse (${e.message})`);
    }
  }

  // internal references
  const refs = [];
  for (const name of ['a', 'link', 'img', 'source', 'script']) {
    for (const a of tags(html, name)) {
      for (const key of ['href', 'src']) if (a[key]) refs.push(a[key]);
      if (a.srcset) for (const part of a.srcset.split(',')) refs.push(part.trim().split(/\s+/)[0]);
    }
  }
  for (const ref of refs) {
    if (!ref || ref.startsWith('#') || /^(mailto|tel|data|javascript):/i.test(ref)) continue;
    let url;
    try {
      url = new URL(ref, (SITE ?? 'http://site.local') + route);
    } catch {
      fail(`${route}: unparseable URL ${ref}`);
      continue;
    }
    const internal = url.origin === (SITE ?? 'http://site.local');
    if (!internal) {
      if (url.protocol === 'http:') fail(`${route}: insecure external link ${ref}`);
      continue;
    }
    linkCount += 1;
    if (!resolvePath(url.pathname)) fail(`${route}: broken internal reference ${ref}`);
    if (url.hash.length > 1) {
      const target = resolvePath(url.pathname);
      const targetHtml = target?.endsWith('.html') ? readFileSync(join(dist, target), 'utf8') : '';
      const id = decodeURIComponent(url.hash.slice(1));
      if (targetHtml && !new RegExp(`\\sid="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(targetHtml))
        fail(`${route}: link ${ref} points at a missing #${id}`);
    }
  }

  // target=_blank links are safe
  for (const a of tags(html, 'a')) {
    if (a.target === '_blank' && !/noopener/.test(a.rel ?? '')) fail(`${route}: target=_blank without rel=noopener: ${a.href}`);
  }

  // images have alt text
  for (const img of tags(html, 'img')) if (!('alt' in img)) fail(`${route}: <img> without alt: ${img.src}`);
}

/* ------------------------------------------------------------------ sitemap + robots */
const sitemapIndex = join(dist, 'sitemap-index.xml');
const sitemapFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
if (!existsSync(sitemapIndex)) fail('sitemap-index.xml missing');
if (!sitemapFiles.length) fail('no sitemap-N.xml files');
const sitemapUrls = sitemapFiles.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const sitemapPaths = new Set(sitemapUrls.map((u) => new URL(u).pathname));
for (const u of sitemapUrls) {
  if (SITE && !u.startsWith(SITE)) fail(`sitemap URL ${u} is not on ${SITE}`);
  if (!resolvePath(new URL(u).pathname)) fail(`sitemap URL ${u} has no page`);
}
for (const route of indexable) if (route !== '/404/' && !sitemapPaths.has(route)) fail(`indexable page ${route} missing from sitemap`);
for (const p of sitemapPaths) if (!indexable.includes(p)) fail(`sitemap lists ${p}, which is noindex or a redirect`);

const robotsFile = join(dist, 'robots.txt');
if (!existsSync(robotsFile)) fail('robots.txt missing');
else {
  const robots = readFileSync(robotsFile, 'utf8');
  if (SITE && !robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) fail('robots.txt does not point at the sitemap on the site origin');
  if (/Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt blocks the whole site');
}

/* ------------------------------------------------------------------ redirects */
const redirectsFile = join(dist, '_redirects');
if (!existsSync(redirectsFile)) fail('_redirects missing from dist');
else {
  const rules = readFileSync(redirectsFile, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/\s+/));
  const bySource = new Map(rules.map(([src, dest, code]) => [src, { dest, code }]));
  // Cloudflare rejects the whole deploy on a duplicate source ("Duplicate rule for path ...").
  // This happens if an Astro adapter appends its own copy of the `redirects` config.
  if (bySource.size !== rules.length) {
    const seen = new Set();
    for (const [src] of rules) {
      if (seen.has(src)) fail(`_redirects has a duplicate rule for ${src} (Cloudflare refuses to deploy this)`);
      seen.add(src);
    }
  }
  for (const [src, dest, code] of rules) {
    if (!dest) fail(`_redirects rule for ${src} has no destination`);
    if (code && !['301', '302', '303', '307', '308'].includes(code)) fail(`_redirects rule for ${src} has unsupported status ${code}`);
  }
  for (const [src, dest] of Object.entries(SHORT_LINKS)) {
    for (const variant of [src, src + '/']) {
      const rule = bySource.get(variant);
      if (!rule) fail(`_redirects has no rule for ${variant}`);
      else if (new URL(rule.dest, 'http://x').pathname !== dest) fail(`_redirects sends ${variant} to ${rule.dest}, config says ${dest}`);
    }
    if (!resolvePath(dest)) fail(`short link ${src} points at ${dest}, which does not exist`);
    if (!redirectPages.includes(src + '/')) fail(`no static fallback page for short link ${src}`);
  }
  for (const [src] of bySource) {
    if (!Object.keys(SHORT_LINKS).includes(src.replace(/\/$/, ''))) fail(`_redirects has ${src}, which is not in SHORT_LINKS`);
  }
}

/* ------------------------------------------------------------------ privacy */
const forbiddenName = /(^|\/)(dm[-_]|.*ledger|\.env|cheatsheets\/|ig_keyword_dm)/i;
for (const f of fileSet) if (forbiddenName.test(f)) fail(`private-looking file published: ${f}`);

// Only the public sheet files are in /resources/, and they are byte-identical to public/resources/.
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
for (const f of fileSet) {
  if (!f.startsWith('/resources/')) continue;
  if (!['.pdf', '.png'].includes(extname(f).toLowerCase())) fail(`unexpected file type in /resources/: ${f}`);
  const src = join(root, 'public', f);
  if (!existsSync(src)) fail(`${f} is in dist but not in public/resources/`);
  else if (sha(src) !== sha(join(dist, f))) fail(`${f} differs from public${f}`);
}

const ALLOWED_HANDLES = new Set(['jakemo007', 'jajatiai']);
const CODE_AT = new Set(['context', 'type', 'id', 'graph', 'media', 'supports', 'layer', 'keyframes', 'property', 'font-face', 'import', 'theme', 'container', 'charset', 'apply', 'tailwind']);
const denylist = [];
if (process.env.DENYLIST_FILE) {
  if (!existsSync(process.env.DENYLIST_FILE)) fail(`DENYLIST_FILE ${process.env.DENYLIST_FILE} not found`);
  else
    denylist.push(
      ...readFileSync(process.env.DENYLIST_FILE, 'utf8')
        .split(/\r?\n/)
        .map((s) => s.trim().replace(/^@/, '').toLowerCase())
        .filter((s) => s.length >= 3 && !s.startsWith('#')),
    );
}

for (const f of files) {
  if (!/\.(html|xml|txt|json|js|css|webmanifest)$/i.test(f) && !f.endsWith('_redirects') && !f.endsWith('_headers')) continue;
  const rel = '/' + posix(relative(dist, f));
  const text = readFileSync(f, 'utf8');
  const visible = text.replace(/<style[\s\S]*?<\/style>/gi, '');

  for (const m of visible.matchAll(/(?<![A-Za-z0-9._%+-])@([A-Za-z0-9._]{2,30})/g)) {
    const handle = m[1].replace(/\.+$/, '').toLowerCase();
    if (ALLOWED_HANDLES.has(handle) || CODE_AT.has(handle)) continue;
    if (/\.(js|css)$/i.test(f)) continue; // bundled code uses @ for decorators/at-rules
    fail(`${rel}: unexpected handle @${handle}`);
  }
  for (const m of text.matchAll(/instagram\.com\/([A-Za-z0-9._]+)/gi)) {
    const seg = m[1].toLowerCase();
    if (!ALLOWED_HANDLES.has(seg) && !['p', 'reel', 'reels'].includes(seg)) fail(`${rel}: Instagram profile link other than the creator's: instagram.com/${m[1]}`);
  }
  for (const m of text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
    if (/\.(js|css)$/i.test(f)) continue;
    fail(`${rel}: email address published: ${m[0].replace(/^(.).*@/, '$1***@')}`);
  }
  if (denylist.length) {
    const lower = text.toLowerCase();
    for (const term of denylist) if (lower.includes(term)) fail(`${rel}: contains a DENYLIST_FILE term (${term.length} chars, starts with "${term[0]}")`);
  }
}

/* ------------------------------------------------------------------ notebooks (GitHub only, never in the site) */
for (const f of files) if (/\.ipynb$/i.test(f)) fail(`/${posix(relative(dist, f))}: notebooks must stay out of the website build`);
const nbDir = join(root, 'notebooks');
const epDir = join(root, 'src', 'content', 'episodes');
for (const name of readdirSync(epDir).filter((n) => n.endsWith('.md'))) {
  const fm = readFileSync(join(epDir, name), 'utf8').split(/^---$/m)[1] ?? '';
  const file = fm.match(/^notebook:\s*\n\s+file:\s*'?([^'\n]+)'?/m)?.[1];
  if (file && !existsSync(join(nbDir, file))) fail(`episodes/${name}: notebook ${file} is not in notebooks/`);
}
if (existsSync(nbDir)) {
  for (const name of readdirSync(nbDir).filter((n) => n.endsWith('.ipynb'))) {
    const text = readFileSync(join(nbDir, name), 'utf8');
    try {
      JSON.parse(text);
    } catch (e) {
      fail(`notebooks/${name}: not valid JSON (${e.message})`);
    }
    if (/[A-Z]:\\\\Users|\/Users\/|\/home\//.test(text)) fail(`notebooks/${name}: contains a local file path`);
    for (const m of text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) fail(`notebooks/${name}: email address: ${m[0].replace(/^(.).*@/, '$1***@')}`);
  }
}

/* ------------------------------------------------------------------ analytics */
const anyHtml = htmlFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
const gaSet = /^G-[A-Z0-9]{4,}$/i.test(process.env.PUBLIC_GA4_ID ?? '');
const cfSet = /^[a-f0-9]{16,64}$/i.test(process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? '');
if (!gaSet && /googletagmanager\.com/.test(anyHtml)) fail('GA4 script is in the HTML but PUBLIC_GA4_ID is not set for this check');
if (!cfSet && /cloudflareinsights\.com/.test(anyHtml)) fail('Cloudflare beacon is in the HTML but PUBLIC_CF_ANALYTICS_TOKEN is not set for this check');

/* ------------------------------------------------------------------ report */
console.log(`dist check: ${htmlFiles.length} HTML files (${indexable.length} indexable, ${redirectPages.length} redirect pages), ${linkCount} internal references, ${sitemapUrls.length} sitemap URLs${denylist.length ? `, ${denylist.length} denylist terms` : ''}`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log('All dist checks passed.');
