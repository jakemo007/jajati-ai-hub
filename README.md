# Jajati AI | AI Explained Hindi

Free AI prompts, cheat sheets and short lessons in simple Hindi. This is the website behind the
"AI Explained" Reels and Shorts by [@jakemo007](https://www.instagram.com/jakemo007/) and [@jajatiai](https://www.youtube.com/@jajatiai).

- Static site: [Astro](https://astro.build) 5 + TypeScript + Tailwind CSS 4
- Hosting: Cloudflare Pages (Free plan). No server, no database, no login.
- Content lives in Markdown files under `src/content/`.

## Quick start

Needs Node 22 (22.0 works locally; Cloudflare builds with the version in `.node-version`).

```bash
npm install
npm run dev        # http://localhost:4321 with live reload
npm run build      # production build into dist/
npm run preview    # serve dist/ at http://localhost:4321
npm test           # type check + build + dist checks + browser smoke test
```

| Script | What it does |
| --- | --- |
| `npm run check` | TypeScript and Astro type check (`astro check`) |
| `npm run check:dist` | Static checks on `dist/`: links, titles, canonicals, sitemap, redirects, privacy |
| `npm run test:smoke` | Opens every page in Chrome at 360, 390, 768, 1024 and 1440 px and tests the interactive parts. Screenshots go to `tests/output/` |
| `npm run og` | Regenerates the favicons and social preview images in `public/` (Windows, uses Segoe UI) |

The smoke test uses your installed Chrome (no browser download). Set `CHROME_PATH` if it is somewhere
unusual, and `BASE_URL=https://your-site.pages.dev` to test a deployed site instead of the local preview.

## Pages

| URL | Page |
| --- | --- |
| `/` | Homepage: featured PROMPT sheet, popular prompts, the formula, categories, sheets, latest episodes |
| `/start/` | Link-in-bio landing page: keyword → sheet, popular prompts, latest episode |
| `/free-resources/` and `/free-resources/<slug>/` | Cheat sheets: download, text version, copyable prompts |
| `/prompts/` and `/prompts/<slug>/` | Prompt library with search and filters; one page per prompt |
| `/episodes/` and `/episodes/<slug>/` | AI Explained episodes, Coming Soon topics, learning path, quiz |
| `/blog/` | Empty until the first post is published (hidden from search until then) |
| `/about/`, `/contact/`, `/privacy-policy/`, `/disclaimer/` | Info pages |
| `/prompt`, `/sach`, `/rag` | Short links to the three sheets (for spoken or typed CTAs) |

## Project structure

```
src/
  content/            Markdown content (the only place you need for day-to-day updates)
    prompts/          one file per prompt
    resources/        one file per cheat sheet
    episodes/         one file per episode or Coming Soon topic
    blog/             articles (empty for now)
  content.config.ts   the fields each content type accepts (checked at build time)
  data/
    site.ts           site name, tagline, social links, contact email, navigation
    taxonomy.ts       prompt categories, tools, difficulty levels, blog categories
  assets/resources/   sheet PNGs used for the optimized previews
  components/         UI pieces (PromptCard, PromptBlock, EpisodeCard, Quiz, ...)
  layouts/BaseLayout.astro   <head>, SEO tags, JSON-LD, analytics loading, header/footer
  pages/              routes
  scripts/            browser code: copy, share, favourites, progress, menu, filters
  utils/analytics.ts  the one analytics utility (see docs/analytics.md)
public/
  resources/          the public sheet files, served unchanged at /resources/<file>
  og/                 social preview images (made by `npm run og`)
  _redirects          Cloudflare short-link redirects
  _headers            Cloudflare security and cache headers
docs/                 analytics, deployment, SEO, Instagram links, templates, test report
tests/                check-dist.mjs and smoke.mjs
tools/make-og.mjs     favicon and social image generator
```

## Adding content

Copy a template from `docs/templates/`, fill it in, and run `npm run build`. The build fails with a
clear message if a field is missing or a reference points at a file that does not exist.

**A prompt:** copy `docs/templates/prompt.md` to `src/content/prompts/<slug>.md`.
- Put the parts people must change in `[square brackets]`. They are highlighted on the page.
- `featured: true` shows the prompt under Popular on the homepage, `/start/` and `/prompts/`.
- Only add an `exampleOutput` you actually got from the AI. Do not write one from imagination.
- A new category or tool goes in `src/data/taxonomy.ts` first. Filters only show categories and tools that have prompts.

**A cheat sheet:** follow the 5 steps at the top of `docs/templates/cheat-sheet.md`. Only files made for public
sharing go in `public/resources/`. Never copy DM scripts, username lists, `dm-links.json` or `.env` files into this repo.

**An episode:** copy `docs/templates/episode.md` to `src/content/episodes/<slug>.md`.
- Coming Soon topics need only a few fields and get no page of their own.
- To publish one, add the number, date, video links, sources and quiz, and set `status: published`.
- Only real, published video links.

**A blog post:** copy `docs/templates/blog-post.md` to `src/content/blog/<slug>.md`. It stays hidden while `status: draft`.
The blog list, homepage section and sitemap entry appear once the first post is `published`.

**Social links, tagline, contact email:** `src/data/site.ts`. The contact email is empty on purpose; the contact page
shows it only once you add one.

## Configuration (environment variables)

Copy `.env.example` to `.env` for local builds, or set these in Cloudflare Pages → Settings → Variables and secrets.
All are optional.

| Variable | Used for |
| --- | --- |
| `SITE_URL` | The public address, e.g. `https://jajati-ai-hub.pages.dev` or your own domain. Used for canonical URLs, the sitemap, robots.txt and social previews. Default: `https://jajati-ai-hub.pages.dev` |
| `PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID (`G-XXXXXXX`). Empty = no GA4 script, no cookies |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics token, only if you do **not** use the one-click setup in Pages |

Details: [docs/analytics.md](docs/analytics.md). Deployment: [docs/deployment.md](docs/deployment.md).
SEO: [docs/seo-checklist.md](docs/seo-checklist.md). Instagram and YouTube links: [docs/instagram-links.md](docs/instagram-links.md).

## Analytics in one paragraph

Nothing is sent anywhere until you set an ID. Every event goes through `src/utils/analytics.ts` (`track()`), or a
`data-track="event_name"` attribute on a link or button. Clicks on Instagram, YouTube and other external links are tracked
automatically. Add `?analytics_debug=1` to any URL to see events in the browser console, or run `window.__jaEvents` in the console.

## Short links

`/prompt`, `/sach` and `/rag` exist for CTAs people type or hear ("website par jao: …/prompt").
They are listed twice, on purpose:
- `public/_redirects`: real HTTP redirects on Cloudflare, adding `utm_source=shortlink`.
- `SHORT_LINKS` in `astro.config.mjs`: fallback pages, so the short links also work in `npm run preview` and on any host.

`npm run check:dist` fails if the two lists differ.

## Troubleshooting

- **`astro check` fails with `require() of ES Module` on Node 22.0.** Newer `@astrojs/language-server` versions need
  Node 22.12+. This project pins `@astrojs/check` 0.9.10 with `@astrojs/language-server` 2.16.16 (see `overrides` in
  `package.json`), which work on 22.0. After upgrading Node to 22.12 or later you can drop the override.
- **Astro 5, not 6/7:** the newest Astro needs Node 22.23.4 or later. Upgrade Node first, then Astro.
- **`npm audit` warnings:** on 7 Nov 2026, `npm audit --omit=dev` lists 3 advisories, all inside Astro 5 (`astro`, its
  bundled `zod`, `zod-to-ts`). The fixes are only in Astro 7.4.7+, which needs Node 22.23.4+. They concern server
  rendering, server islands, view transitions, MDX and build-time validation of untrusted input; this site is static,
  uses none of those, and builds only your own content. Still, plan the upgrade: install Node 22.23.4 or later,
  then `npm install astro@latest @astrojs/sitemap@latest @astrojs/check@latest`, remove the `overrides` block, and
  run `npm test`. `sharp` (0.35.5) and esbuild (0.28.2, via `overrides`) are already on fixed versions.
- **"The collection "blog" does not exist or is empty" during the build** is expected while there are no blog posts.
- **A sheet's social image or the favicon looks wrong:** edit `tools/make-og.mjs`, run `npm run og` on Windows, and commit the PNGs.
- **Downloads do nothing inside Instagram:** the Instagram in-app browser can block file downloads. Every sheet page
  says how to open it in Chrome or Safari, and the prompts can be copied straight from the page.
- **Port 4321 is busy:** stop the other `astro dev` or `astro preview`, or run `npx astro preview --port 4322`.
