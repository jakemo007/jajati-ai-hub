# Handover: Jajati AI hub, first version (7 Nov 2026)

Status: **on GitHub** (`jakemo007/jajati-ai-hub`, public). Hosting: Cloudflare Pages at `https://jajati-ai-hub.pages.dev`
(see `docs/deployment.md`). A Worker created first by mistake is to be deleted once Pages is live.

| Deliverable | Where |
| --- | --- |
| Source code | `C:\Github\jajati-ai-hub`, https://github.com/jakemo007/jajati-ai-hub |
| Run it locally | `npm install`, then `npm run dev` or `npm run build && npm run preview` → http://localhost:4321 |
| How it works, how to add content | `README.md`, `docs/templates/` |
| Test report | `docs/test-report.md` |
| Analytics | `docs/analytics.md` |
| SEO checklist | `docs/seo-checklist.md` |
| Deployment, steps 1 to 10 | `docs/deployment.md` |
| Instagram bio, link title, CTAs, pinned comments, UTM links | `docs/instagram-links.md` |

## Resource inventory

Copied from `Documents\AI\scripts\cheatsheets-public\` only. The 7 files are byte-identical to the source
(SHA-256 compared), served unchanged at `/resources/<file>`.

| File | Size | Sheet | Page |
| --- | --- | --- | --- |
| `prompt-5-prompts.pdf` (2 pages) | 417 KB | PROMPT | `/free-resources/chatgpt-prompt-cheatsheet/` |
| `prompt-5-prompts-1.png` | 181 KB | PROMPT, page 1 | same |
| `prompt-5-prompts-2.png` | 154 KB | PROMPT, page 2 | same |
| `sach-ai-jhooth-cheatsheet.pdf` (1 page) | 226 KB | SACH | `/free-resources/ai-hallucination-cheatsheet/` |
| `sach-ai-jhooth-cheatsheet.png` | 170 KB | SACH | same |
| `rag-notebooklm-cheatsheet.pdf` (1 page) | 233 KB | RAG | `/free-resources/rag-notebooklm-cheatsheet/` |
| `rag-notebooklm-cheatsheet.png` | 181 KB | RAG | same |

**Not copied (private):** `scripts\cheatsheets\` (including `dm-links.json`), `tools\ig_keyword_dm.py`, `.env.local`,
the audit that names the commenters, video files. `.gitignore` also blocks `cheatsheets/`, `dm-*.json`, `*ledger*.json`
and `.env*`, and `npm run check:dist` fails if a DM, ledger or `.env` file, an email address, or a handle other than
@jakemo007 / @jajatiai ends up in the built site.

**Made for the site:** 4 social preview images (`public/og/`), favicons, and the typed text of each sheet on its page.

## Published prompts (15)

| Prompt page `/prompts/<slug>/` | Category | Source |
| --- | --- | --- |
| `role-context-task-format` ★ | Prompt engineering | PROMPT sheet, template |
| `chatgpt-resume-prompt` ★ | Resume and career | PROMPT sheet, prompt 1 |
| `leave-email-prompt` ★ | Productivity | PROMPT sheet, prompt 2 |
| `class-12-topic-explainer-prompt` ★ | Education | PROMPT sheet, prompt 3 |
| `interview-practice-prompt` ★ | Interview prep | PROMPT sheet, prompt 4 |
| `festival-offer-captions-prompt` ★ | Business and marketing | PROMPT sheet, prompt 5 |
| `show-an-example-prompt` | Prompt engineering | PROMPT sheet, bonus trick 1 |
| `step-by-step-prompt` | Prompt engineering | PROMPT sheet, bonus trick 2 |
| `ask-me-3-questions-first` ★ | Prompt engineering | YouTube Short "AI Ko Guess Mat Karne Do" |
| `explain-in-3-steps` | Education | "3 tricks" reel and Short, trick 1 |
| `quiz-me-prompt` | Education | "3 tricks" reel and Short, trick 2 |
| `video-script-structure-prompt` | Content creation | "3 tricks" reel and Short, trick 3 |
| `say-i-dont-know-prompt` ★ | Fact-checking | SACH sheet, copy-paste line |
| `source-for-every-fact-prompt` | Fact-checking | SACH sheet, copy-paste line |
| `answer-only-from-document-prompt` | Fact-checking | SACH sheet, copy-paste line |

★ = featured (shown under Popular). Every prompt text is taken from the sheets or scripts. No example outputs are shown,
because none were saved; each prompt page says so instead of inventing one.

## Published episodes (5)

| # | Page `/episodes/<slug>/` | Date | YouTube | Instagram | Sheet |
| --- | --- | --- | --- | --- | --- |
| 1 | `tokens` | 30 Oct 2026 | rBdvln_vaME | (none known) | none |
| 2 | `context-window` | 2 Nov 2026 | Pko5jMeTMHE | DfPy2BvtGLI | none |
| 3 | `hallucination` | 3 Nov 2026 | YdcDpEGoYP0 | DfT0SVONTW6 | SACH |
| 4 | `rag` | 5 Nov 2026 | 0EZYoUYOtM8 | DfYw8uHChUf | RAG |
| 5 | `prompt-engineering` | 6 Nov 2026 | kHaRG06jrrM | DfaHvKvixjC | PROMPT |

Each has a text version from the script, sources, a 3-question quiz, related prompts, and "Mark as completed".

**Code notebooks (from 9 Nov 2026).** The long-form videos come with a Python notebook. It lives in `notebooks/` at the
repo root, so it is on GitHub but **not** in the website build (Astro ships only `src/` and `public/`). To link one, add
`notebook: { file, about }` to the episode's front matter. The page then shows an "Open in Google Colab" / "View on
GitHub" card. Also add a row to `notebooks/README.md`. `tests/check-dist.mjs` fails if:

- a referenced notebook is missing
- an `.ipynb` reaches `dist/`
- a notebook contains a local file path or an email address

Episodes 1 to 5 link their notebooks (`ep1-tokens-explained.ipynb` to `ep5-prompt-engineering-explained.ipynb`).
`ep6-ai-agents-explained.ipynb` is in `notebooks/` and the README, but `ai-agents.md` is still `coming-soon`, so add its
`notebook:` front matter when that page is published.

## Coming Soon topics (listed on `/episodes/`, no pages)

1. AI Agents (promised at the end of Episode 5, shown as "Next up")
2. Temperature
3. System Instructions vs User Prompts
4. Embeddings
5. LLM Fundamentals (How Large Language Models Work)
6. Practical RAG Applications

## What you need to do

1. **Review the site** locally: `npm run preview`, open http://localhost:4321 (and the screenshots in `tests/output/`).
2. ~~Create the GitHub repository and Cloudflare project~~ (done 7 Nov; see `docs/deployment.md`).
3. Set the `SITE_URL` **build** variable in Cloudflare to the real address (`docs/deployment.md` steps 3 and 4).
4. **Test on your phone inside the Instagram app**: open the PROMPT sheet link from a DM, try Download and Copy.
5. Turn on Cloudflare Web Analytics (`docs/deployment.md` step 6). Optional: GA4 for campaigns and downloads (`docs/analytics.md`).
6. Update the Instagram bio and link, the YouTube channel link (`docs/instagram-links.md`).
7. **Reply to the 4 people waiting for the PROMPT sheet** with the reply text in `docs/instagram-links.md`
   (after step 6, so the bio link works).
8. Pin the new comments on the Episode 3, 4 and 5 Reels.
9. Google Search Console and sitemap (`docs/deployment.md` step 10).
10. Optional: add a contact email in `src/data/site.ts` (it is empty on purpose).

## Known gaps and choices

- Not tested on a real phone or inside Instagram's in-app browser (only Chrome with phone-size emulation).
- The Cloudflare `_redirects` 302s for `/prompt`, `/sach`, `/rag` can only be tested after deployment
  (`docs/deployment.md` step 7). Locally the fallback pages were tested.
- GA4 and Cloudflare Web Analytics were not tested with real IDs; the no-ID behaviour was.
- No Lighthouse or screen-reader run. Keyboard use, focus rings, skip link and the menu were tested automatically.
- Episode 1 has no Instagram link because none was found; add it to `src/content/episodes/tokens.md` if it exists.
- The spec's "ChatGPT", "Gemini" and "Nano Banana" categories are **tool** filters on `/prompts/`, because a prompt's
  topic (resume, education...) and its tool are different things. Categories and tools with no prompts are hidden.
- The homepage has no "Practical AI tutorials" section and the blog is empty, because there is no such content yet.
- Local Node is 22.0, which limits Astro to version 5 and needs a pinned type checker (see README, Troubleshooting).
