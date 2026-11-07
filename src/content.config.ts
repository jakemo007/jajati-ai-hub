import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { DIFFICULTIES, LEARN_CATEGORY_IDS, PROMPT_CATEGORY_IDS, TOOL_IDS } from './data/taxonomy';

/**
 * Content collections. Every item is one Markdown file; the file name is the URL slug.
 * Files whose names start with "_" are ignored (use them for drafts or notes).
 */

const videoLinks = z
  .object({
    youtube: z.string().url().optional(),
    instagram: z.string().url().optional(),
  })
  .default({});

const prompts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/prompts' }),
  schema: z.object({
    title: z.string(),
    /** Shorter browser/search title when `title` is long (" | Jajati AI" is added, keep the total under 70). */
    seoTitle: z.string().max(58).optional(),
    /** One or two sentences for cards and the meta description (max 160 characters). */
    description: z.string().max(160),
    status: z.enum(['published', 'draft']).default('published'),
    category: z.enum(PROMPT_CATEGORY_IDS),
    tools: z.array(z.enum(TOOL_IDS)).min(1),
    difficulty: z.enum(DIFFICULTIES),
    /** The exact text the Copy button copies. Keep it identical to the source (sheet or script). */
    prompt: z.string(),
    /** BCP 47 language of the prompt text: hi-Latn for Roman Hinglish, en for English. */
    promptLang: z.string().default('hi-Latn'),
    /** The problem this prompt solves, one line. */
    problem: z.string(),
    placeholders: z.array(z.object({ token: z.string(), meaning: z.string() })).default([]),
    /** A filled-in example. Say in `note` where the values come from. */
    exampleInput: z.object({ text: z.string(), note: z.string() }).optional(),
    /** Only a real output you actually got. Never invent one. */
    exampleOutput: z.object({ text: z.string(), note: z.string() }).optional(),
    /** Where the prompt comes from, shown on the page. */
    source: z.object({ label: z.string(), note: z.string().optional() }),
    added: z.coerce.date(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    resource: reference('resources').optional(),
    relatedEpisodes: z.array(reference('episodes')).default([]),
    relatedPrompts: z.array(reference('prompts')).default([]),
    video: videoLinks,
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/resources' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Short name for cards and buttons. */
      shortTitle: z.string(),
      description: z.string().max(160),
      status: z.enum(['published', 'draft']).default('published'),
      /** The Instagram comment keyword this sheet answers, e.g. PROMPT. */
      keyword: z.string(),
      /** UTM campaign id used in links to this page. */
      campaign: z.string(),
      /** Short path that redirects here, e.g. /prompt (must also be in public/_redirects). */
      shortPath: z.string().optional(),
      learn: z.array(z.string()).min(1),
      files: z
        .array(
          z.object({
            label: z.string(),
            /** File name inside public/resources/. */
            file: z.string(),
            format: z.enum(['PDF', 'PNG']),
            pages: z.number().int().optional(),
          }),
        )
        .min(1),
      previews: z.array(z.object({ src: image(), alt: z.string(), file: z.string() })).min(1),
      /** Social preview image path relative to /public. */
      ogImage: z.string().optional(),
      episode: reference('episodes').optional(),
      /** Prompts shown with Copy buttons on the sheet's page, in this order. */
      relatedPrompts: z.array(reference('prompts')).default([]),
      promptsHeading: z.string().default('Related prompts'),
      /** The sheet's closing line. */
      takeaway: z.string().optional(),
      added: z.coerce.date(),
      order: z.number().default(100),
    }),
});

const episodes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/episodes' }),
  schema: z.object({
    /** Series number. Leave empty for Coming Soon topics that have no number yet. */
    number: z.number().int().optional(),
    /** Topic name, e.g. "Tokens". */
    title: z.string(),
    /** The article's H1, and the page title unless seoTitle is set. */
    headline: z.string(),
    /** Shorter browser/search title when the headline is long (" | Jajati AI" is added, keep the total under 70). */
    seoTitle: z.string().max(58).optional(),
    description: z.string().max(160),
    status: z.enum(['published', 'coming-soon']),
    category: z.enum(LEARN_CATEGORY_IDS),
    difficulty: z.enum(DIFFICULTIES),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    videos: videoLinks,
    /** Instagram comment keyword used in this episode's caption, if any. */
    keyword: z.string().optional(),
    campaign: z.string().optional(),
    resource: reference('resources').optional(),
    relatedPrompts: z.array(reference('prompts')).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    quiz: z
      .array(
        z.object({
          q: z.string(),
          options: z.array(z.string()).min(2).max(4),
          /** Zero-based index of the right option. */
          answer: z.number().int().min(0),
          explain: z.string(),
        }),
      )
      .default([]),
    /** For Coming Soon cards: why it is coming, e.g. "Promised at the end of Episode 5". */
    note: z.string().optional(),
    /** Sort order among Coming Soon topics (lowest first = next up). */
    order: z.number().default(100),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    status: z.enum(['published', 'draft']).default('draft'),
    category: z.enum(LEARN_CATEGORY_IDS),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    relatedPrompts: z.array(reference('prompts')).default([]),
    relatedEpisodes: z.array(reference('episodes')).default([]),
  }),
});

export const collections = { prompts, resources, episodes, blog };
