/**
 * Safe localStorage helpers for favourites and episode progress.
 * Storage can be missing or blocked (private windows, strict settings), so every call is
 * wrapped and the site keeps working without it. Data stays in this browser only.
 */

export const KEYS = {
  favourites: 'ja_favourite_prompts',
  completed: 'ja_completed_episodes',
} as const;

function store(): Storage | null {
  try {
    const s = window.localStorage;
    const probe = '__ja_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

export function storageAvailable(): boolean {
  return store() !== null;
}

export function readSet(key: string): Set<string> {
  try {
    const raw = store()?.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

export function writeSet(key: string, value: Set<string>): boolean {
  try {
    const s = store();
    if (!s) return false;
    s.setItem(key, JSON.stringify([...value]));
    return true;
  } catch {
    return false;
  }
}

/** Toggle an id in a stored set. Returns the new state (true = now in the set), or null if storage failed. */
export function toggleInSet(key: string, id: string): boolean | null {
  const set = readSet(key);
  const on = !set.has(id);
  if (on) set.add(id);
  else set.delete(id);
  if (!writeSet(key, set)) return null;
  window.dispatchEvent(new CustomEvent('ja:storage', { detail: { key } }));
  return on;
}
