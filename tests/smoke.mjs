/**
 * Browser smoke test with real Chrome (playwright-core, no browser download).
 *
 *   npm run build && npm run test:smoke
 *
 * Starts `astro preview` on 127.0.0.1:4321 (or tests BASE_URL if set, e.g. a Cloudflare preview URL),
 * then:
 *  1. opens every page at 360, 390, 768, 1024 and 1440 px and checks: HTTP 200, no console or page
 *     errors, no failed same-site requests, no sideways scrolling, one visible <h1>, images load,
 *     and no analytics requests (none are configured)
 *  2. runs the interactive checks: copy buttons, downloads, short links, prompt search and filters,
 *     favourites, episode progress, quiz, share fallback, mobile menu, keyboard, analytics events,
 *     UTM carry-over, 404, blocked storage and no-JS
 * Screenshots go to tests/output/<width>/ (git-ignored).
 *
 * Chrome is found at the usual install paths; set CHROME_PATH to use another Chromium browser.
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const outDir = join(root, 'tests', 'output');
const WIDTHS = [360, 390, 768, 1024, 1440];
const SCREENSHOT_ROUTES = [
  '/',
  '/start/',
  '/free-resources/chatgpt-prompt-cheatsheet/',
  '/free-resources/',
  '/prompts/',
  '/prompts/chatgpt-resume-prompt/',
  '/episodes/',
  '/episodes/prompt-engineering/',
];
const ANALYTICS_HOSTS = /googletagmanager\.com|google-analytics\.com|cloudflareinsights\.com/;

const results = [];
const failures = [];
const warnings = [];
let current = '';
function check(cond, msg) {
  results.push({ ok: Boolean(cond), msg: `${current}: ${msg}` });
  if (!cond) failures.push(`${current}: ${msg}`);
  return Boolean(cond);
}
const warn = (msg) => warnings.push(`${current}: ${msg}`);

/* ------------------------------------------------------------------ setup */
function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('No Chrome found. Set CHROME_PATH to a Chrome or Chromium executable.');
  return found;
}

function routesFromDist() {
  const walk = (dir) =>
    readdirSync(dir).flatMap((n) => {
      const f = join(dir, n);
      return statSync(f).isDirectory() ? walk(f) : [f];
    });
  return walk(dist)
    .filter((f) => f.endsWith('index.html'))
    .filter((f) => !/http-equiv="refresh"/i.test(readFileSync(f, 'utf8')))
    .map((f) => '/' + relative(dist, f).split(sep).join('/').replace(/index\.html$/, ''))
    .sort();
}

async function waitForServer(url, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const r = await fetch(url);
      if (r.status < 500) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server at ${url} did not start`);
}

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

let server = null;
const BASE = (process.env.BASE_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
if (!process.env.BASE_URL) {
  server = spawn(process.execPath, [join(root, 'node_modules', 'astro', 'astro.js'), 'preview', '--port', '4321', '--host', '127.0.0.1'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stderr.on('data', (d) => process.stderr.write(`[preview] ${d}`));
  await waitForServer(BASE + '/');
}
const ORIGIN = new URL(BASE).origin;

const browser = await chromium.launch({ executablePath: findChrome(), headless: true });
const analyticsRequests = [];

async function newContext(width, extra = {}) {
  const mobile = width < 768;
  const ctx = await browser.newContext({
    viewport: { width, height: mobile ? 800 : 900 },
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: 1,
    acceptDownloads: true,
    ...extra,
  });
  ctx.on('request', (req) => {
    if (ANALYTICS_HOSTS.test(req.url())) analyticsRequests.push(req.url());
  });
  return ctx;
}

/** Attach listeners that collect problems for one page load. */
function watch(page) {
  const issues = [];
  page.on('console', (m) => {
    if (m.type() === 'error') issues.push(`console error: ${m.text().slice(0, 200)}`);
  });
  page.on('pageerror', (e) => issues.push(`page error: ${e.message.slice(0, 200)}`));
  page.on('response', (r) => {
    const u = r.url();
    if (u.startsWith(ORIGIN) && r.status() >= 400 && !u.includes('/this-does-not-exist')) issues.push(`HTTP ${r.status()} ${u}`);
  });
  page.on('requestfailed', (r) => {
    const reason = r.failure()?.errorText ?? '';
    // ERR_ABORTED = the browser cancelled it because the test moved to the next page (e.g. a favicon still loading).
    // Real failures (4xx/5xx) are caught by the 'response' handler above.
    if (r.url().startsWith(ORIGIN) && !reason.includes('ERR_ABORTED')) issues.push(`request failed: ${r.url()} (${reason})`);
  });
  return issues;
}

const events = (page) => page.evaluate(() => window.__jaEvents ?? []);
const hasEvent = async (page, name, pred = () => true) => (await events(page)).some((e) => e.name === name && pred(e.params));

/* ------------------------------------------------------------------ 1. every page at every width */
const routes = routesFromDist();
console.log(`Testing ${routes.length} pages at ${WIDTHS.join(', ')} px against ${BASE}`);

for (const width of WIDTHS) {
  const ctx = await newContext(width);
  const page = await ctx.newPage();
  mkdirSync(join(outDir, String(width)), { recursive: true });
  for (const route of routes) {
    current = `${route} @${width}`;
    const issues = watch(page);
    const resp = await page.goto(BASE + route, { waitUntil: 'load' });
    check(resp?.status() === 200, `HTTP ${resp?.status()}`);

    const layout = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const offenders = [];
      if (sw > vw + 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width && r.right > vw + 1) {
            let p = el.parentElement;
            let clipped = false;
            while (p) {
              const ox = getComputedStyle(p).overflowX;
              if (ox !== 'visible') {
                clipped = true;
                break;
              }
              p = p.parentElement;
            }
            if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join('.')} right=${Math.round(r.right)}`);
          }
          if (offenders.length >= 3) break;
        }
      }
      const h1s = [...document.querySelectorAll('h1')].filter((h) => h.getBoundingClientRect().height > 0);
      const smallTargets = [...document.querySelectorAll('button, .btn, input:not([type=radio]):not([type=checkbox]), select')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.height < 32;
        })
        .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 30)}" h=${Math.round(el.getBoundingClientRect().height)}`);
      return { vw, sw, offenders, h1: h1s.length, smallTargets };
    });
    check(layout.sw <= layout.vw + 1, `no sideways scroll (scrollWidth ${layout.sw} vs ${layout.vw}) ${layout.offenders.join('; ')}`);
    check(layout.h1 === 1, `one visible h1 (found ${layout.h1})`);
    if (layout.smallTargets.length) warn(`tap targets under 32px: ${layout.smallTargets.slice(0, 3).join(', ')}`);

    if (width === 390 || SCREENSHOT_ROUTES.includes(route)) {
      // Scroll through the page so lazy images load, then check none are broken.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle').catch(() => {});
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.currentSrc || i.src),
      );
      check(broken.length === 0, `images load ${broken.join(', ')}`);
    }
    if (SCREENSHOT_ROUTES.includes(route)) {
      const name = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '__');
      await page.screenshot({ path: join(outDir, String(width), `${name}.png`), fullPage: true });
    }
    const pageEvents = await events(page);
    check(pageEvents[0]?.name === 'page_view', 'page_view event recorded locally');
    check(issues.length === 0, `no errors ${issues.join(' | ')}`);
    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
    page.removeAllListeners('response');
    page.removeAllListeners('requestfailed');
  }
  await ctx.close();
}

/* ------------------------------------------------------------------ 2. interactive checks (phone, 390 px) */
const ctx = await newContext(390);
await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGIN });
const page = await ctx.newPage();
const clip = () => page.evaluate(() => navigator.clipboard.readText());
const errors = watch(page);

// --- Priority 0: the PROMPT sheet page
current = 'PROMPT sheet';
await page.goto(BASE + '/free-resources/chatgpt-prompt-cheatsheet/');
check(await hasEvent(page, 'resource_view', (p) => p.resource_id === 'chatgpt-prompt-cheatsheet'), 'resource_view event');
const primary = page.locator('[data-section="downloads"] a[download]').first();
check(await primary.isVisible(), 'download button visible without scrolling far');
const primaryBox = await primary.boundingBox();
check(primaryBox && primaryBox.y + primaryBox.height < 800 * 1.6, `download button near the top (y=${Math.round(primaryBox?.y ?? -1)})`);
const hrefs = await page.locator('a[download]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
check(hrefs.length >= 3, `at least 3 download links (${hrefs.length})`);
for (const href of hrefs) {
  const r = await ctx.request.get(BASE + href);
  const body = await r.body();
  const local = join(dist, decodeURIComponent(href));
  check(r.status() === 200, `${href} returns 200`);
  check(existsSync(local) && body.length === statSync(local).size, `${href} is the full file (${body.length} bytes)`);
  check(/pdf|png/.test(r.headers()['content-type'] ?? ''), `${href} content-type ${r.headers()['content-type']}`);
}
const [download] = await Promise.all([page.waitForEvent('download'), primary.click()]);
check(download.suggestedFilename().endsWith('.pdf'), `clicking the main button downloads a PDF (${download.suggestedFilename()})`);
check(await hasEvent(page, 'resource_download', (p) => p.file_format === 'PDF' && p.resource_id === 'chatgpt-prompt-cheatsheet'), 'resource_download event');

const copyBtns = page.locator('[data-copy]');
const copyCount = await copyBtns.count();
check(copyCount >= 5, `copy buttons for the prompts (${copyCount})`);
for (let i = 0; i < copyCount; i++) {
  const btn = copyBtns.nth(i);
  const target = await btn.getAttribute('data-copy');
  const expected = ((await page.locator(target).textContent()) ?? '').trim();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(150);
  check((await clip()) === expected, `copy button ${i + 1} copies the exact prompt text`);
  check((await btn.textContent())?.includes('Copied!'), `copy button ${i + 1} says Copied!`);
}
check(await hasEvent(page, 'prompt_copy'), 'prompt_copy event');
const sheetText = await page.locator('main').innerText();
check(!/sign.?up required|follow to unlock|dm me/i.test(sheetText), 'no gate wording');

// --- other sheet pages
for (const slug of ['ai-hallucination-cheatsheet', 'rag-notebooklm-cheatsheet']) {
  current = slug;
  await page.goto(BASE + `/free-resources/${slug}/`);
  const links = await page.locator('a[download]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  check(links.length >= 2, `has PDF and PNG downloads (${links.length})`);
  for (const href of links) check((await ctx.request.get(BASE + href)).status() === 200, `${href} returns 200`);
}

// --- short links (static fallback pages in astro preview; _redirects answers them on Cloudflare)
current = 'short links';
for (const [short, dest] of [
  ['/prompt', '/free-resources/chatgpt-prompt-cheatsheet/'],
  ['/sach', '/free-resources/ai-hallucination-cheatsheet/'],
  ['/rag', '/free-resources/rag-notebooklm-cheatsheet/'],
]) {
  await page.goto(BASE + short);
  await page.waitForURL((u) => u.pathname === dest, { timeout: 5000 }).catch(() => {});
  check(new URL(page.url()).pathname === dest, `${short} lands on ${dest} (got ${new URL(page.url()).pathname})`);
}

// --- prompt library: search + filters
current = 'prompt library';
await page.goto(BASE + '/prompts/');
const cards = page.locator('[data-prompt-card]');
const total = await cards.count();
const visible = () => page.locator('[data-prompt-card]:not([hidden])').count();
check(total >= 10, `lists the prompts (${total})`);
check(await page.locator('[data-prompt-filters]').isVisible(), 'filters shown with JS');
await page.fill('input[name="q"]', 'resume');
await page.waitForTimeout(400);
const matched = await visible();
check(matched > 0 && matched < total, `search "resume" narrows the list (${matched} of ${total})`);
check(new URL(page.url()).searchParams.get('q') === 'resume', 'search is kept in the URL');
await page.reload();
await page.waitForTimeout(300);
check((await page.inputValue('input[name="q"]')) === 'resume' && (await visible()) === matched, 'search survives a reload');
await page.click('[data-filter-clear]');
check((await visible()) === total, 'clear shows every prompt again');
await page.fill('input[name="q"]', 'zzzz-nothing');
await page.waitForTimeout(400);
check((await visible()) === 0 && (await page.locator('#no-results').isVisible()), 'no-results message for an empty search');
await page.click('[data-filter-clear]');

for (const group of ['category', 'tool', 'difficulty']) {
  const btn = page.locator(`[data-filter-group="${group}"]`).first();
  if (!(await btn.count())) {
    warn(`no ${group} filter buttons`);
    continue;
  }
  const value = await btn.getAttribute('data-value');
  await btn.click();
  const attr = group === 'tool' ? 'tools' : group;
  const mismatch = await page
    .locator('[data-prompt-card]:not([hidden])')
    .evaluateAll((els, [a, v]) => els.filter((el) => !(el.dataset[a] ?? '').split(' ').includes(v)).length, [attr, value]);
  check((await btn.getAttribute('aria-pressed')) === 'true', `${group} filter "${value}" is pressed`);
  check(mismatch === 0 && (await visible()) > 0, `${group} filter "${value}" shows only matching prompts (${await visible()})`);
  check(new URL(page.url()).searchParams.get(group) === value, `${group} filter is in the URL`);
  await btn.click();
  check((await visible()) === total, `${group} filter toggles off`);
}
await page.goto(BASE + '/prompts/?category=education');
const eduMismatch = await page.locator('[data-prompt-card]:not([hidden])').evaluateAll((els) => els.filter((el) => el.dataset.category !== 'education').length);
check(eduMismatch === 0 && (await visible()) > 0, 'a filtered link (/prompts/?category=education) opens filtered');

// --- favourites
current = 'favourites';
await page.goto(BASE + '/prompts/');
const firstCard = cards.first();
const favId = await firstCard.getAttribute('data-id');
const favBtn = firstCard.locator('[data-fav]');
await favBtn.click();
check((await favBtn.getAttribute('aria-pressed')) === 'true', 'Save button becomes pressed');
check((await page.locator('[data-fav-count]').first().textContent()) === '1', 'saved count shows 1');
const stored = await page.evaluate(() => localStorage.getItem('ja_favourite_prompts'));
check(stored?.includes(favId), 'favourite stored in localStorage');
check(await hasEvent(page, 'prompt_favourite', (p) => p.state === 'added'), 'prompt_favourite event');
await page.click('[data-filter-saved]');
check((await visible()) === 1, 'Saved-only filter shows the saved prompt');
await page.reload();
await page.waitForTimeout(300);
check((await visible()) === 1 && (await page.locator(`[data-fav="${favId}"]`).first().getAttribute('aria-pressed')) === 'true', 'favourite survives a reload');
await page.goto(BASE + `/prompts/${favId}/`);
check((await page.locator(`[data-fav="${favId}"]`).first().getAttribute('aria-pressed')) === 'true', 'favourite shows as saved on the prompt page');
await page.locator(`[data-fav="${favId}"]`).first().click();
check((await page.evaluate(() => localStorage.getItem('ja_favourite_prompts'))) === '[]', 'unsaving removes it');

// --- prompt page copy + share fallback
current = 'prompt page';
await page.goto(BASE + '/prompts/chatgpt-resume-prompt/');
const pBtn = page.locator('[data-copy]').first();
const pTarget = await pBtn.getAttribute('data-copy');
await pBtn.click();
await page.waitForTimeout(150);
check((await clip()) === ((await page.locator(pTarget).textContent()) ?? '').trim(), 'copy button copies the prompt');
await page.evaluate(() => {
  Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
});
const shareBtn = page.locator('[data-share]').first();
const shareUrl = await shareBtn.getAttribute('data-share-url');
await shareBtn.click();
await page.waitForTimeout(150);
check((await clip()) === shareUrl, `share falls back to copying the link (${shareUrl})`);
check(await hasEvent(page, 'share', (p) => p.method === 'copy_link'), 'share event');

// --- episodes: progress, quiz, next
current = 'episode';
await page.goto(BASE + '/episodes/tokens/');
check(await hasEvent(page, 'episode_view', (p) => p.episode_id === 'tokens'), 'episode_view event');
const done = page.locator('[data-complete="tokens"]').first();
await done.click();
check((await done.getAttribute('aria-pressed')) === 'true', 'Mark as completed toggles on');
check(await hasEvent(page, 'episode_complete', (p) => p.episode_id === 'tokens'), 'episode_complete event');
await page.reload();
check((await page.locator('[data-complete="tokens"]').first().getAttribute('aria-pressed')) === 'true', 'completion survives a reload');

const quiz = page.locator('[data-quiz]').first();
await quiz.locator('button[type="submit"]').click();
check(/baaki/.test((await quiz.locator('[data-score]').textContent()) ?? ''), 'quiz asks for unanswered questions');
const sets = quiz.locator('fieldset[data-answer]');
const nQ = await sets.count();
for (let i = 0; i < nQ; i++) {
  const ans = await sets.nth(i).getAttribute('data-answer');
  await sets.nth(i).locator(`input[value="${ans}"]`).check();
}
await quiz.locator('button[type="submit"]').click();
check(((await quiz.locator('[data-score]').textContent()) ?? '').includes(`${nQ} / ${nQ}`), `quiz scores ${nQ} / ${nQ}`);
check(await hasEvent(page, 'quiz_complete', (p) => p.quiz_score === nQ && p.quiz_total === nQ), 'quiz_complete event');

const next = page.locator('[data-track="next_episode_click"]').first();
await page.evaluate(() =>
  document.querySelector('[data-track="next_episode_click"]')?.addEventListener('click', (e) => e.preventDefault(), { once: true }),
);
await next.click();
check(await hasEvent(page, 'next_episode_click'), 'next_episode_click event');
await next.click();
await page.waitForURL(/\/episodes\/context-window\//, { timeout: 5000 }).catch(() => {});
check(page.url().includes('/episodes/context-window/'), 'next episode link opens episode 2');

await page.goto(BASE + '/episodes/');
check((await page.locator('[data-progress-count]').first().textContent())?.trim() === '1', 'episodes page shows 1 completed');
await page.fill('#episode-search', 'rag');
await page.waitForTimeout(300);
const epShown = await page.locator('[data-episode-card]:visible').count();
const epTotal = await page.locator('[data-episode-card]').count();
check(epShown > 0 && epShown < epTotal, `episode search narrows the list (${epShown} of ${epTotal})`);

// --- mobile menu + keyboard
current = 'mobile menu';
await page.goto(BASE + '/');
const toggle = page.locator('[data-menu-toggle]');
check(await toggle.isVisible(), 'Menu button visible on a phone');
check(!(await page.locator('#mobile-nav').isVisible()), 'menu starts closed');
await toggle.click();
check((await toggle.getAttribute('aria-expanded')) === 'true' && (await page.locator('#mobile-nav').isVisible()), 'menu opens');
await page.keyboard.press('Escape');
check(!(await page.locator('#mobile-nav').isVisible()), 'Escape closes the menu');
check(await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle')), 'focus returns to the Menu button');
await toggle.click();
await page.locator('#mobile-nav a[href="/prompts/"]').click();
await page.waitForURL(/\/prompts\/$/);
check(new URL(page.url()).pathname === '/prompts/', 'menu link navigates');

current = 'keyboard (1440)';
const desk = await (await newContext(1440)).newPage();
await desk.goto(BASE + '/');
await desk.keyboard.press('Tab');
const skip = await desk.evaluate(() => {
  const el = document.activeElement;
  const r = el?.getBoundingClientRect();
  return { cls: el?.className ?? '', visible: !!r && r.top >= 0 && r.height > 0 };
});
check(skip.cls.includes('skip-link') && skip.visible, 'first Tab shows the skip link');
await desk.keyboard.press('Enter');
check(await desk.evaluate(() => document.activeElement?.id === 'main'), 'skip link moves focus to the main content');
let noRing = 0;
for (let i = 0; i < 12; i++) {
  await desk.keyboard.press('Tab');
  const ring = await desk.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return true;
    const s = getComputedStyle(el);
    return (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
  });
  if (!ring) noRing += 1;
}
check(noRing === 0, `focus is visible on the next 12 Tab stops (${noRing} without a ring)`);
check(!(await desk.locator('[data-menu-toggle]').isVisible()), 'no Menu button on desktop');
await desk.context().close();

// --- analytics: no-op, UTM, debug
current = 'analytics';
check(await page.evaluate(() => typeof window.gtag === 'undefined' && typeof window.dataLayer === 'undefined'), 'no gtag or dataLayer without PUBLIC_GA4_ID');
await page.goto(BASE + '/start/?utm_source=instagram&utm_medium=social&utm_campaign=bio&analytics_debug=1');
const debugLogs = [];
page.on('console', (m) => {
  if (m.text().startsWith('[analytics]')) debugLogs.push(m.text());
});
await page.locator('a[href="/free-resources/chatgpt-prompt-cheatsheet/"]').first().click();
await page.waitForURL(/chatgpt-prompt-cheatsheet/);
check(
  await hasEvent(page, 'resource_view', (p) => p.utm_source === 'instagram' && p.utm_campaign === 'bio'),
  'UTM from the bio link carries over to the next page',
);
check(debugLogs.length > 0, 'analytics_debug=1 logs events to the console');
await page.evaluate(() => sessionStorage.removeItem('ja_analytics_debug'));
const extLink = page.locator('a[href^="https://www.youtube.com"], a[href^="https://youtube.com"], a[href^="https://youtu.be"]').first();
if (await extLink.count()) {
  await page.evaluate(() => document.addEventListener('click', (e) => e.preventDefault(), { once: true }));
  await extLink.scrollIntoViewIfNeeded();
  await extLink.click();
  check(await hasEvent(page, 'youtube_click'), 'YouTube link click is tracked');
}

// --- 404
current = '404';
const r404 = await page.goto(BASE + '/this-does-not-exist/');
check(r404?.status() === 404, `unknown URL returns 404 (got ${r404?.status()})`);
check((await page.locator('h1').textContent())?.includes('does not exist'), 'friendly 404 page');
check((await page.locator('main a[href^="/free-resources/"]').count()) >= 3, '404 links to the 3 sheets');
check(errors.filter((e) => !e.includes('404')).length === 0, `no errors during interactive checks ${errors.join(' | ')}`);
await ctx.close();

// --- storage blocked (strict privacy settings, some in-app browsers)
current = 'storage blocked';
const blocked = await newContext(390);
await blocked.addInitScript(() => {
  Object.defineProperty(window, 'localStorage', {
    get() {
      throw new DOMException('blocked', 'SecurityError');
    },
  });
});
const bp = await blocked.newPage();
const bErr = watch(bp);
await bp.goto(BASE + '/prompts/');
check((await bp.locator('[data-fav]:visible').count()) === 0, 'Save buttons are hidden');
check((await bp.locator('[data-prompt-card]:not([hidden])').count()) === total, 'all prompts still listed');
await bp.goto(BASE + '/episodes/tokens/');
check((await bp.locator('[data-complete]:visible').count()) === 0, 'Mark as completed is hidden');
await bp.goto(BASE + '/free-resources/chatgpt-prompt-cheatsheet/');
await bp.locator('[data-copy]').first().click();
check(bErr.length === 0, `no errors ${bErr.join(' | ')}`);
await blocked.close();

// --- no JavaScript
current = 'no JavaScript';
const nojs = await newContext(390, { javaScriptEnabled: false });
const np = await nojs.newPage();
await np.goto(BASE + '/prompts/');
check((await np.locator('[data-prompt-card]:visible').count()) === total, 'every prompt listed without JS');
check(!(await np.locator('[data-prompt-filters]').isVisible()), 'filter form stays hidden without JS');
await np.goto(BASE + '/free-resources/chatgpt-prompt-cheatsheet/');
check((await np.locator('a[download]').count()) >= 3, 'downloads work without JS');
check((await np.locator('pre').count()) >= 5, 'prompt text readable without JS');
await nojs.close();

/* ------------------------------------------------------------------ 3. analytics requests anywhere */
current = 'whole run';
check(analyticsRequests.length === 0, `no requests to analytics hosts (${analyticsRequests.slice(0, 3).join(', ')})`);

await browser.close();
server?.kill();

const passed = results.filter((r) => r.ok).length;
console.log(`\nSmoke test: ${passed}/${results.length} checks passed, ${routes.length} pages x ${WIDTHS.length} widths.`);
if (warnings.length) {
  const uniq = [...new Set(warnings)];
  console.log(`${uniq.length} warning(s):`);
  for (const w of uniq.slice(0, 40)) console.log(' ~ ' + w);
}
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}
console.log(`Screenshots: ${relative(root, outDir)}${sep}<width>${sep}`);
