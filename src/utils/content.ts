import { getCollection, type CollectionEntry } from 'astro:content';
import { LEARN_CATEGORIES, PROMPT_CATEGORIES, TOOLS, type PromptCategoryId, type ToolId } from '../data/taxonomy';

export type Prompt = CollectionEntry<'prompts'>;
export type Resource = CollectionEntry<'resources'>;
export type Episode = CollectionEntry<'episodes'>;
export type BlogPost = CollectionEntry<'blog'>;

type Ref = { collection: string; id: string };

/**
 * Astro only warns about a reference to a missing entry (e.g. `relatedEpisodes: [typo]`) and builds anyway.
 * This makes the build fail instead, with the file and field named. Runs once per build.
 */
let refsChecked: Promise<void> | undefined;
function validateReferences(): Promise<void> {
  refsChecked ??= (async () => {
    const [prompts, resources, episodes, blog] = await Promise.all([
      getCollection('prompts'),
      getCollection('resources'),
      getCollection('episodes'),
      getCollection('blog'),
    ]);
    const ids: Record<string, Set<string>> = {
      prompts: new Set(prompts.map((e) => e.id)),
      resources: new Set(resources.map((e) => e.id)),
      episodes: new Set(episodes.map((e) => e.id)),
      blog: new Set(blog.map((e) => e.id)),
    };
    const problems: string[] = [];
    const entries = [...prompts, ...resources, ...episodes, ...blog];
    for (const entry of entries) {
      for (const [field, value] of Object.entries(entry.data as Record<string, unknown>)) {
        const refs = (Array.isArray(value) ? value : [value]).filter(
          (v): v is Ref => !!v && typeof v === 'object' && 'collection' in v && 'id' in v,
        );
        for (const ref of refs) {
          if (!ids[ref.collection]?.has(ref.id))
            problems.push(`src/content/${entry.collection}/${entry.id}.md: ${field} → "${ref.id}" is not in src/content/${ref.collection}/`);
        }
      }
    }
    if (problems.length) throw new Error(`Broken content references:\n${problems.join('\n')}`);
  })();
  return refsChecked;
}

/** Published prompts, best first: featured, then `order`, then newest. */
export async function getPrompts(): Promise<Prompt[]> {
  await validateReferences();
  const all = await getCollection('prompts', ({ data }) => data.status === 'published');
  return all.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order ||
      b.data.added.getTime() - a.data.added.getTime(),
  );
}

export async function getResources(): Promise<Resource[]> {
  await validateReferences();
  const all = await getCollection('resources', ({ data }) => data.status === 'published');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** All episodes. Published ones by number, then Coming Soon topics in file order. */
export async function getEpisodes(): Promise<Episode[]> {
  await validateReferences();
  const all = await getCollection('episodes');
  return all.sort((a, b) => {
    const pa = a.data.status === 'published' ? 0 : 1;
    const pb = b.data.status === 'published' ? 0 : 1;
    return (
      pa - pb ||
      (a.data.number ?? 999) - (b.data.number ?? 999) ||
      a.data.order - b.data.order ||
      a.id.localeCompare(b.id)
    );
  });
}

export async function getPublishedEpisodes(): Promise<Episode[]> {
  return (await getEpisodes()).filter((e) => e.data.status === 'published');
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  await validateReferences();
  const all = await getCollection('blog', ({ data }) => data.status === 'published');
  return all.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export function categoryLabel(id: PromptCategoryId): string {
  return PROMPT_CATEGORIES[id].label;
}

export function toolLabel(id: ToolId): string {
  return TOOLS[id].label;
}

export function learnCategoryLabel(id: keyof typeof LEARN_CATEGORIES): string {
  return LEARN_CATEGORIES[id];
}

/** Minutes to read a Markdown body at about 200 words a minute (Hinglish reads slower than English). */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|\-[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function episodeLabel(ep: Episode): string {
  return ep.data.number ? `Episode ${ep.data.number}` : 'Coming soon';
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

/** Related prompts: explicit ones first, then same category, then same resource. */
export function relatedPrompts(current: Prompt, all: Prompt[], limit = 3): Prompt[] {
  const picked = new Map<string, Prompt>();
  const byId = new Map(all.map((p) => [p.id, p]));
  for (const ref of current.data.relatedPrompts) {
    const p = byId.get(ref.id);
    if (p && p.id !== current.id) picked.set(p.id, p);
  }
  for (const p of all) {
    if (picked.size >= limit) break;
    if (p.id !== current.id && p.data.category === current.data.category) picked.set(p.id, p);
  }
  for (const p of all) {
    if (picked.size >= limit) break;
    if (p.id !== current.id && current.data.resource && p.data.resource?.id === current.data.resource.id) picked.set(p.id, p);
  }
  return [...picked.values()].slice(0, limit);
}
