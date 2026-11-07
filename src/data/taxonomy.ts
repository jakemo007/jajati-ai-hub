/**
 * Categories, tools and difficulty levels for prompts, episodes and blog posts.
 * Add a new category or tool here first, then use its id in a Markdown file.
 * Listing pages only show categories and tools that at least one published item uses,
 * so empty ones (for example Nano Banana today) stay hidden until content exists.
 */

export const PROMPT_CATEGORIES = {
  'prompt-engineering': { label: 'Prompt Engineering', blurb: 'The formula and tricks that make any prompt better.' },
  'resume-career': { label: 'Resume and Career', blurb: 'Resumes, job search and career moves.' },
  'interview-prep': { label: 'Interview Preparation', blurb: 'Practice questions and feedback before the real interview.' },
  education: { label: 'Education', blurb: 'Padhai: understand a topic, then test yourself.' },
  productivity: { label: 'Productivity', blurb: 'Office emails and everyday work.' },
  'business-marketing': { label: 'Business and Marketing', blurb: 'Posts and offers for a small business.' },
  'content-creation': { label: 'Content Creation', blurb: 'Scripts and structure for your own videos and posts.' },
  'fact-checking': { label: 'Fact-checking', blurb: 'Lines that make AI admit when it does not know.' },
  'image-generation': { label: 'Image Generation', blurb: 'Prompts for image tools.' },
  'video-generation': { label: 'Video Generation', blurb: 'Prompts for video tools.' },
  coding: { label: 'Coding and Development', blurb: 'Prompts for code and developers.' },
} as const;

export type PromptCategoryId = keyof typeof PROMPT_CATEGORIES;
export const PROMPT_CATEGORY_IDS = Object.keys(PROMPT_CATEGORIES) as [PromptCategoryId, ...PromptCategoryId[]];

export const TOOLS = {
  chatgpt: { label: 'ChatGPT' },
  gemini: { label: 'Gemini' },
  claude: { label: 'Claude' },
  'any-chat-ai': { label: 'Any chat AI' },
  notebooklm: { label: 'NotebookLM' },
  'nano-banana': { label: 'Nano Banana' },
} as const;

export type ToolId = keyof typeof TOOLS;
export const TOOL_IDS = Object.keys(TOOLS) as [ToolId, ...ToolId[]];

export const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

/** Categories for episodes and blog posts (the spec's blog list). */
export const LEARN_CATEGORIES = {
  'prompt-engineering': 'Prompt Engineering',
  'ai-fundamentals': 'AI Fundamentals',
  'ai-tutorials': 'AI Tutorials',
  'practical-ai': 'Practical AI',
  'ai-tools': 'AI Tools',
  'python-ai': 'Python and AI Development',
  'rag-llms': 'RAG and LLMs',
  'ai-agents': 'AI Agents',
} as const;

export type LearnCategoryId = keyof typeof LEARN_CATEGORIES;
export const LEARN_CATEGORY_IDS = Object.keys(LEARN_CATEGORIES) as [LearnCategoryId, ...LearnCategoryId[]];
