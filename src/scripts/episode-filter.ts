/** Episode directory search (progressive enhancement). Search text never leaves the browser. */
const box = document.querySelector<HTMLElement>('[data-episode-search]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-episode-card]')];

if (box && cards.length) {
  box.hidden = false;
  const input = box.querySelector<HTMLInputElement>('input')!;
  const count = document.getElementById('episode-count');
  const empty = document.getElementById('episode-empty');
  const sections = [...document.querySelectorAll<HTMLElement>('[data-episode-section]')];

  const apply = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const ok = terms.every((t) => (card.dataset.search ?? '').includes(t));
      (card.closest('li') ?? card).hidden = !ok;
      if (ok) shown += 1;
    }
    for (const s of sections) {
      s.hidden = ![...s.querySelectorAll<HTMLElement>('[data-episode-card]')].some((c) => !(c.closest('li') ?? c).hidden);
    }
    if (count) count.textContent = terms.length ? `${shown} ${shown === 1 ? 'match' : 'matches'}` : '';
    if (empty) empty.hidden = shown > 0;
  };
  input.addEventListener('input', apply);
  box.addEventListener('submit', (e) => e.preventDefault());
}
