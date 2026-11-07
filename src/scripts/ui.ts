/**
 * Site-wide behaviour, loaded once by BaseLayout:
 * copy buttons, share buttons, favourites, episode progress and the mobile menu.
 * Everything is driven by data attributes, so components need no script of their own.
 */
import { initAnalytics, track } from '../utils/analytics';
import { KEYS, readSet, storageAvailable, toggleInSet } from '../utils/storage';

function announce(message: string): void {
  const live = document.getElementById('ja-live');
  if (!live) return;
  live.textContent = '';
  window.setTimeout(() => (live.textContent = message), 50);
}

function params(el: Element, attr = 'data-track-params'): Record<string, unknown> {
  try {
    return JSON.parse(el.getAttribute(attr) ?? '{}') as Record<string, unknown>;
  } catch {
    return {};
  }
}

function setLabel(btn: HTMLElement, text: string): void {
  const label = btn.querySelector('[data-label]');
  if (label) label.textContent = text;
  else btn.textContent = text;
}

/* ---------------------------------------------------------------- copy */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    // Deprecated but still the only fallback for in-app browsers without the async Clipboard API.
    const ok = (document as unknown as { execCommand(cmd: string): boolean }).execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function selectContents(el: Element): void {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

function initCopy(): void {
  document.addEventListener('click', async (e) => {
    const btn = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-copy]') : null;
    if (!btn) return;
    const source = document.querySelector(btn.dataset.copy ?? '');
    if (!source) return;
    const text = (source.textContent ?? '').trim();
    const original = btn.dataset.labelDefault ?? btn.querySelector('[data-label]')?.textContent ?? 'Copy';
    btn.dataset.labelDefault = original;
    const ok = await copyText(text);
    if (ok) {
      btn.dataset.state = 'done';
      setLabel(btn, 'Copied!');
      announce('Prompt copied. Paste it into your AI chat.');
      track('prompt_copy', params(btn));
    } else {
      selectContents(source);
      setLabel(btn, 'Text selected: copy it');
      announce('Copy was blocked. The prompt text is selected, use your copy shortcut.');
    }
    window.setTimeout(() => {
      delete btn.dataset.state;
      setLabel(btn, original);
    }, 2200);
  });
}

/* ---------------------------------------------------------------- share */
function initShare(): void {
  document.addEventListener('click', async (e) => {
    const btn = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-share]') : null;
    if (!btn) return;
    const url = btn.dataset.shareUrl ?? window.location.href;
    const title = btn.dataset.shareTitle ?? document.title;
    const base = params(btn);
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        track('share', { ...base, method: 'native' });
      } catch {
        /* the visitor closed the share sheet */
      }
      return;
    }
    const original = btn.dataset.labelDefault ?? btn.querySelector('[data-label]')?.textContent ?? 'Share';
    btn.dataset.labelDefault = original;
    if (await copyText(url)) {
      btn.dataset.state = 'done';
      setLabel(btn, 'Link copied!');
      announce('Link copied. Paste it in a chat to share.');
      track('share', { ...base, method: 'copy_link' });
      window.setTimeout(() => {
        delete btn.dataset.state;
        setLabel(btn, original);
      }, 2200);
    }
  });
}

/* ---------------------------------------------------------------- favourites */
function paintFavourites(): void {
  const favs = readSet(KEYS.favourites);
  document.querySelectorAll<HTMLElement>('[data-fav]').forEach((btn) => {
    const on = favs.has(btn.dataset.fav ?? '');
    btn.setAttribute('aria-pressed', String(on));
    setLabel(btn, on ? 'Saved' : 'Save');
  });
  document.querySelectorAll<HTMLElement>('[data-fav-count]').forEach((el) => {
    el.textContent = String(favs.size);
  });
}

function initFavourites(): void {
  if (!storageAvailable()) {
    document.querySelectorAll<HTMLElement>('[data-fav], [data-needs-storage]').forEach((el) => (el.hidden = true));
    return;
  }
  paintFavourites();
  document.addEventListener('click', (e) => {
    const btn = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-fav]') : null;
    if (!btn?.dataset.fav) return;
    const on = toggleInSet(KEYS.favourites, btn.dataset.fav);
    if (on === null) return;
    announce(on ? 'Saved to your favourites in this browser.' : 'Removed from favourites.');
    track('prompt_favourite', { ...params(btn), state: on ? 'added' : 'removed' });
    paintFavourites();
  });
  window.addEventListener('ja:storage', paintFavourites);
}

/* ---------------------------------------------------------------- episode progress */
function paintProgress(): void {
  const done = readSet(KEYS.completed);
  document.querySelectorAll<HTMLElement>('[data-complete]').forEach((btn) => {
    const on = done.has(btn.dataset.complete ?? '');
    btn.setAttribute('aria-pressed', String(on));
    btn.dataset.state = on ? 'done' : '';
    setLabel(btn, on ? 'Completed ✓ (tap to undo)' : 'Mark as completed');
  });
  document.querySelectorAll<HTMLElement>('[data-progress-for]').forEach((el) => {
    el.hidden = !done.has(el.dataset.progressFor ?? '');
  });
  document.querySelectorAll<HTMLElement>('[data-progress-count]').forEach((el) => {
    const ids = (el.dataset.progressCount ?? '').split(',').filter(Boolean);
    el.textContent = String(ids.filter((id) => done.has(id)).length);
  });
}

function initProgress(): void {
  if (!storageAvailable()) {
    document.querySelectorAll<HTMLElement>('[data-complete], [data-needs-storage]').forEach((el) => (el.hidden = true));
    return;
  }
  paintProgress();
  document.addEventListener('click', (e) => {
    const btn = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-complete]') : null;
    if (!btn?.dataset.complete) return;
    const on = toggleInSet(KEYS.completed, btn.dataset.complete);
    if (on === null) return;
    if (on) track('episode_complete', params(btn));
    announce(on ? 'Episode marked as completed in this browser.' : 'Marked as not completed.');
    paintProgress();
  });
  window.addEventListener('ja:storage', paintProgress);
}

/* ---------------------------------------------------------------- mobile menu */
function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.getElementById(toggle?.getAttribute('aria-controls') ?? '');
  if (!toggle || !panel) return;
  const set = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      set(false);
      toggle.focus();
    }
  });
}

initAnalytics();
initCopy();
initShare();
initFavourites();
initProgress();
initMenu();
