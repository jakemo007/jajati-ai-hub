/**
 * Prompt library search and filters (progressive enhancement: without JS every prompt is listed).
 * Filters are single-choice per group and mirrored in the URL (?q=&category=&tool=&difficulty=&saved=1),
 * so a filtered view can be linked, e.g. /prompts/?category=education.
 * Search text stays in the browser; it is never sent to analytics.
 */
import { KEYS, readSet } from '../utils/storage';

type Group = 'category' | 'tool' | 'difficulty';
interface State {
  q: string;
  category: string;
  tool: string;
  difficulty: string;
  saved: boolean;
}

const root = document.querySelector<HTMLElement>('[data-prompt-filters]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-prompt-card]')];

if (root && cards.length) {
  root.hidden = false;
  const input = root.querySelector<HTMLInputElement>('input[name="q"]')!;
  const count = document.getElementById('result-count');
  const empty = document.getElementById('no-results');
  const clear = root.querySelector<HTMLButtonElement>('[data-filter-clear]');
  const savedBtn = root.querySelector<HTMLButtonElement>('[data-filter-saved]');

  const params = new URLSearchParams(window.location.search);
  const state: State = {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    tool: params.get('tool') ?? '',
    difficulty: params.get('difficulty') ?? '',
    saved: params.get('saved') === '1',
  };
  input.value = state.q;

  const words = (s: string) =>
    s
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean);

  function syncUrl(): void {
    const p = new URLSearchParams(window.location.search);
    for (const key of ['q', 'category', 'tool', 'difficulty'] as const) {
      if (state[key]) p.set(key, state[key]);
      else p.delete(key);
    }
    if (state.saved) p.set('saved', '1');
    else p.delete('saved');
    const qs = p.toString();
    history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
  }

  function apply(): void {
    const terms = words(state.q);
    const favs = readSet(KEYS.favourites);
    let shown = 0;
    for (const card of cards) {
      const hay = card.dataset.search ?? '';
      const ok =
        terms.every((t) => hay.includes(t)) &&
        (!state.category || card.dataset.category === state.category) &&
        (!state.tool || (card.dataset.tools ?? '').split(' ').includes(state.tool)) &&
        (!state.difficulty || card.dataset.difficulty === state.difficulty) &&
        (!state.saved || favs.has(card.dataset.id ?? ''));
      card.hidden = !ok;
      if (ok) shown += 1;
    }
    root!.querySelectorAll<HTMLButtonElement>('[data-filter-group]').forEach((btn) => {
      const group = btn.dataset.filterGroup as Group;
      btn.setAttribute('aria-pressed', String(state[group] === btn.dataset.value));
    });
    savedBtn?.setAttribute('aria-pressed', String(state.saved));
    const active = Boolean(state.q || state.category || state.tool || state.difficulty || state.saved);
    if (clear) clear.hidden = !active;
    if (count) count.textContent = `${shown} ${shown === 1 ? 'prompt' : 'prompts'}${active ? ' match' : ''}`;
    if (empty) empty.hidden = shown > 0;
    syncUrl();
  }

  let timer = 0;
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      state.q = input.value.trim();
      apply();
    }, 120);
  });
  root.addEventListener('submit', (e) => e.preventDefault());

  root.addEventListener('click', (e) => {
    const btn = e.target instanceof Element ? e.target.closest<HTMLButtonElement>('button') : null;
    if (!btn) return;
    if (btn.dataset.filterGroup) {
      const group = btn.dataset.filterGroup as Group;
      const value = btn.dataset.value ?? '';
      state[group] = state[group] === value ? '' : value;
    } else if (btn.hasAttribute('data-filter-saved')) {
      state.saved = !state.saved;
    } else if (btn.hasAttribute('data-filter-clear')) {
      state.q = '';
      state.category = '';
      state.tool = '';
      state.difficulty = '';
      state.saved = false;
      input.value = '';
      input.focus();
    } else return;
    apply();
  });

  window.addEventListener('ja:storage', () => {
    if (state.saved) apply();
  });
  apply();
}
