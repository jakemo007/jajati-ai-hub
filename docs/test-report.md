# Test report (7 Nov 2026)

Everything below was actually run on this machine (Windows 11, Node 22.0.0, npm 10.5.1, Chrome stable, headless),
against `astro preview` serving the production build. Re-run any time with `npm test`.

## Summary

| Step | Command | Result |
| --- | --- | --- |
| Type check | `npm run check` | **0 errors, 0 warnings, 0 hints** (46 files) |
| Production build | `npm run build` | **Passed.** 37 HTML files (32 indexable pages, 3 short-link redirect pages, 404, empty blog index), sitemap, AVIF/WebP previews |
| Static checks on `dist/` | `npm run check:dist` | **All passed.** 1,470 internal references, 32 sitemap URLs |
| Browser smoke test | `npm run test:smoke` | **1,002 of 1,002 checks passed.** 33 pages × 5 widths + interactive checks |
| Dependency audit | `npm audit --omit=dev` | 3 advisories left, all inside Astro 5 (see README, Troubleshooting) |

## What the static checks cover (`tests/check-dist.mjs`)

- Every internal `href`, `src`, `srcset`, `og:image` and `#anchor` resolves to a file in `dist/`.
- Every indexable page: exactly one `<h1>`, `<html lang>`, a unique title (under 70 characters) and description
  (under 170), a canonical URL on `SITE_URL` matching the page, JSON-LD that parses, `alt` on every image,
  `rel="noopener"` on new-tab links.
- The sitemap lists every indexable page and nothing else; robots.txt points to it.
- `public/_redirects` and `SHORT_LINKS` in `astro.config.mjs` match, and both targets exist.
- Privacy: no DM, ledger or `.env` file; `/resources/` holds only PDF/PNG files identical to `public/resources/`;
  no email address; no `@handle` or Instagram profile link except @jakemo007 and @jajatiai; optional `DENYLIST_FILE`
  terms. No analytics script in the HTML without an ID.
- **The checker was tested against injected problems** (a fake handle, an email, an Instagram profile link,
  a broken link, a `dm-links.json` file and a denylist term): it reported all 6 and exited with an error.

## What the browser test covers (`tests/smoke.mjs`)

**Every page at 360, 390, 768, 1024 and 1440 px** (33 pages, 165 page loads): HTTP 200, no console or page errors,
no failed requests, no sideways scrolling, one visible `<h1>`, `page_view` recorded, images load (390 px and the
screenshot pages, after scrolling through the page). Full-page screenshots of 8 key pages at each width are in
`tests/output/<width>/`.

**Interactive checks (phone, 390 px, unless noted):**

| Area | Checked |
| --- | --- |
| PROMPT sheet | `resource_view` event; download button visible near the top; all 3 files return 200 with the right type and full size; clicking the main button downloads the PDF; `resource_download` event; every Copy button copies the exact prompt text and says "Copied!"; `prompt_copy` event; no gate wording |
| SACH and RAG sheets | PDF and PNG downloads return 200 |
| Short links | `/prompt`, `/sach`, `/rag` land on the right sheet (local fallback pages) |
| Prompt library | search narrows the list, is kept in the URL and survives reload; Clear; no-results message; category, tool and difficulty filters show only matching prompts, are in the URL and toggle off; `/prompts/?category=education` opens filtered |
| Favourites | Save toggles, count updates, stored in localStorage, `prompt_favourite` event, Saved-only filter, survives reload, shows on the prompt page, unsave works |
| Prompt page | Copy copies the prompt; Share falls back to copying the link when there is no share sheet; `share` event |
| Episodes | `episode_view`; Mark as completed toggles, `episode_complete`, survives reload; quiz asks for unanswered questions, scores 3/3, `quiz_complete`; `next_episode_click` and the link opens Episode 2; progress count on `/episodes/`; episode search |
| Mobile menu | visible on phone, opens, Escape closes and returns focus, links work; hidden on desktop |
| Keyboard (1440 px) | first Tab shows the skip link, Enter moves focus to the content, the next 12 Tab stops all show a focus ring |
| Analytics | no `gtag`/`dataLayer` without an ID; UTM from the bio link carries to the next page's events; `?analytics_debug=1` logs; YouTube link clicks tracked; **zero requests to Google or Cloudflare analytics across the whole run** |
| 404 | unknown URL returns 404 with the friendly page and links to the 3 sheets |
| Storage blocked | Save and Mark-as-completed buttons hide, all prompts still listed, Copy still works, no errors |
| No JavaScript | every prompt listed, filter form hidden, downloads and prompt text available |

## Manual review and fixes during testing

- Screenshots at 360, 390 and 1440 px were looked at by eye. Prompt cards showed half of a fourth text line under the
  3-line preview; fixed.
- 10 browser titles were over 70 characters; they now use a shorter `seoTitle`.
- A typo in a content reference (e.g. `relatedEpisodes: [typo]`) only produced a warning in Astro; it now fails the build
  with the file and field named (tested with a deliberately broken file).
- `sharp` was upgraded to 0.35.5 and esbuild to 0.28.2 to clear `npm audit` advisories; the social images were
  regenerated and checked, and all tests re-run.
- One run of the browser test failed on `favicon.svg ... net::ERR_ABORTED`: the browser cancelled a favicon request
  because the test moved to the next page. The test now ignores requests cancelled by navigation (HTTP errors still
  fail it). The re-run passed 1,002 of 1,002.

## Not tested (needs the live site or a real phone)

- Instagram and YouTube in-app browsers on a real phone, especially downloads and the clipboard.
- Cloudflare `_redirects` (302 with UTM) and `_headers`: only work on Cloudflare (`docs/deployment.md` step 7).
- GA4 and Cloudflare Web Analytics with real IDs.
- Lighthouse scores, a screen reader, Safari and Firefox.
