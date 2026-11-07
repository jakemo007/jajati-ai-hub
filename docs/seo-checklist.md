# SEO checklist

✅ = built and checked automatically by `npm run check:dist` or `npm run test:smoke` on every run.
⬜ = needs you (after the site is live).

## Built in

| | Item | How |
| --- | --- | --- |
| ✅ | One `<h1>` per page | check:dist and smoke test |
| ✅ | Unique `<title>` (under 70 characters) and meta description (under 170) on every indexable page | check:dist. Long prompt and episode titles use a shorter `seoTitle` |
| ✅ | Canonical URL on every page, on `SITE_URL` | check:dist |
| ✅ | `lang` on `<html>` (`en-IN`); prompts, quiz and Hinglish text marked `lang="hi-Latn"` | `<html lang>` checked by check:dist |
| ✅ | Open Graph and Twitter card tags with an image that exists | check:dist. Each sheet has its own 1200×630 image |
| ✅ | Structured data (JSON-LD) that parses: WebSite, Organization, BreadcrumbList, LearningResource (sheets), CreativeWork (prompts), Article (episodes), CreativeWorkSeries | check:dist |
| ✅ | `sitemap-index.xml` with every indexable page and nothing else | check:dist |
| ✅ | `robots.txt` allows everything and points to the sitemap | check:dist |
| ✅ | No broken internal links or anchors (1,470 references checked) | check:dist |
| ✅ | Empty blog index and 404 are `noindex` and not in the sitemap | check:dist |
| ✅ | Short links `/prompt`, `/sach`, `/rag` are redirects, not duplicate pages | check:dist |
| ✅ | PDFs and PNGs carry `X-Robots-Tag: noindex` (`public/_headers`), so Google sends people to the sheet pages, which have the text, the downloads and the prompts | `_headers` |
| ✅ | Sheet text is on the page as real text, not only inside a PDF or image | content files |
| ✅ | Images have `alt` text; previews are AVIF/WebP with width and height (no layout shift) | `alt` checked by check:dist; formats by Astro `<Picture>` |
| ✅ | Works on phones from 360 px with no sideways scrolling | smoke test at 5 widths |
| ✅ | No analytics or third-party scripts by default (fast first load) | smoke test |
| ✅ | Descriptive URLs (`/prompts/chatgpt-resume-prompt/`, `/free-resources/chatgpt-prompt-cheatsheet/`) | routes |
| ✅ | Internal linking: sheet ↔ episode ↔ prompts, related prompts, prev/next episode, breadcrumbs | pages |

## After launch

| | Item |
| --- | --- |
| ⬜ | Set `SITE_URL` to the real address before the first production build (see `docs/deployment.md` step 5) |
| ⬜ | Google Search Console: add the property, verify, submit `sitemap-index.xml` (deployment step 10) |
| ⬜ | Request indexing for the 3 sheet pages and `/prompts/` |
| ⬜ | Bing Webmaster Tools: import from Search Console |
| ⬜ | Put the site link on the Instagram bio, YouTube channel links and YouTube video descriptions (`docs/instagram-links.md`). These are the first links that tell Google the site exists |
| ⬜ | Share a sheet link once on WhatsApp and check the preview card shows the sheet image |
| ⬜ | After 2 to 4 weeks: Search Console → Performance. Note which queries bring people, and write prompt pages and blog posts for them |
| ⬜ | If you buy a domain later: add it, change `SITE_URL`, and the canonicals move with it |

## Writing new pages (keep doing this)

- Title: what people type. "ChatGPT Resume Prompt for Freshers" beats "Prompt 1".
- Description: one or two sentences, max 160 characters, says what they get.
- One idea per page. A new prompt gets its own file, not a paragraph in another page.
- Link new pages from at least one existing page (related prompts, the episode, the sheet).
- Only real facts with sources. No invented numbers, quotes, results or testimonials.
