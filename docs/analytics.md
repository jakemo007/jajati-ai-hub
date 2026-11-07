# Analytics

## Default: nothing is sent

With no environment variables set, the site loads **no analytics script, sets no cookies and sends no data**.
Events still run through the analytics utility, but they only go into a small list in the page
(`window.__jaEvents`, last 50) so you and the tests can see them.

## The two options

| | Cloudflare Web Analytics | Google Analytics 4 |
| --- | --- | --- |
| Cost | Free | Free |
| Cookies | None | Yes (`_ga` cookies) |
| Page views, top pages, referrers, countries, devices | Yes | Yes |
| Custom events (downloads, copies, quiz) | **No** ("not yet" in Cloudflare's docs) | Yes |
| UTM campaigns (which Reel sent the visit) | **No** (does not log query strings) | Yes |
| Blocked by ad blockers | Can be | Can be |
| Setup | Add a site, set `PUBLIC_CF_ANALYTICS_TOKEN` (one click on Pages) | Create a GA4 property, set `PUBLIC_GA4_ID` |

**Recommendation:** turn on Cloudflare Web Analytics on day one (5 minutes, no cookie notice needed).
Add GA4 when you want to know which Reel sends visitors and how many people download or copy. Both can run together.

### Cloudflare Web Analytics (page views)

This site is deployed as a Cloudflare **Worker** (static assets), so use the token:

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site** → enter the site's address.
2. From the JS snippet it shows, copy only the `token` value.
3. Worker → Settings → Build → **Build variables and secrets** → add `PUBLIC_CF_ANALYTICS_TOKEN` = the token.
4. Redeploy. The site then loads Cloudflare's beacon on every page.

If you ever move to a **Pages** project instead: Pages → project → **Metrics** → Web Analytics → **Enable** injects the
beacon automatically. In that case do **not** also set the token, or every visit counts twice.

### Google Analytics 4 (events and campaigns)

1. [analytics.google.com](https://analytics.google.com) → Admin → Create → Property. Time zone: India.
2. Add a **Web** data stream with your site URL. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. Cloudflare Pages → your project → Settings → Variables and secrets → add `PUBLIC_GA4_ID` = the ID, for **Production**.
   Leave it out of Preview so test deployments do not pollute the data.
4. Redeploy (Deployments → ⋯ → Retry deployment, or push a commit). The variable is read at build time.
5. Open the site, then GA4 → Reports → **Realtime**: you should see yourself within a minute.
6. GA4 → Admin → **Events**: after events arrive (can take up to a day), mark `resource_download` and `prompt_copy`
   as **key events**.
7. GA4 → Admin → **Custom definitions** → create event-scoped custom dimensions for the parameters you want in reports:
   `resource_id`, `prompt_id`, `episode_id`, `file_format`, `link_location`, `method`, `category`, `quiz_score`.
   GA4 only shows custom parameters in standard reports after you register them; data from before is not backfilled.

The GA4 tag is configured with Google signals and ad personalisation **off**. The privacy policy page
switches its wording automatically when `PUBLIC_GA4_ID` is set. GA4 sets cookies: decide whether you need a cookie
notice for your audience. The site does not include a consent banner.

## What is tracked

All events go through `track()` in `src/utils/analytics.ts`. Parameters are filtered to a fixed allow-list
and cut to 100 characters. Never add names, emails, usernames, search text or anything a visitor typed.

| Event | When | Main parameters |
| --- | --- | --- |
| `page_view` | Every page (kept local; GA4 sends its own page view) | `page_type` |
| `resource_view` | A cheat sheet page opens | `resource_id`, `resource_title` |
| `resource_download` | A PDF or PNG download button or a preview image is tapped | `resource_id`, `file_format`, `file_name`, `method` |
| `prompt_copy` | A Copy button copies a prompt | `prompt_id`, `prompt_title`, `category`, `tool`, `link_location` |
| `prompt_favourite` | Save / Saved is tapped | `prompt_id`, `state` (added/removed) |
| `episode_view` | An episode page opens | `episode_id`, `episode_title` |
| `episode_complete` | "Mark as completed" is tapped | `episode_id`, `episode_title` |
| `quiz_complete` | All quiz questions answered and checked | `episode_id`, `quiz_score`, `quiz_total` |
| `next_episode_click` | The next-episode link on an episode page | `episode_id`, `episode_title` |
| `blog_article_view` | A blog post opens | `category` |
| `instagram_click` / `youtube_click` | Any link to Instagram or YouTube (automatic) | `link_url`, `link_location` |
| `external_resource_click` | Any other external link, e.g. a source (automatic) | `link_url`, `link_location` |
| `share` | Share button (native share sheet or link copied) | `method`, plus the page's ids |

**UTM parameters** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) from the landing URL are remembered
for the browser tab session and added to every event, so a download can be traced back to the Reel or bio link that
brought the visitor. GA4 also reads them from the page URL for its own acquisition reports.

**Where:** the click-based events use `data-track` attributes in the components, for example

```html
<a href="/resources/x.pdf" download data-track="resource_download"
   data-track-params='{"resource_id":"x","file_format":"PDF"}'>Download</a>
```

`link_location` comes from the nearest `data-section="..."` around the link.

## Adding an event

1. Add the name to `EventName` in `src/utils/analytics.ts` (and any new parameter to `ALLOWED_PARAMS`).
2. Call `track('my_event', { ... })` from client code, or put `data-track="my_event"` on the element.
3. Add a row to the table above.

## Checking it works

- Add `?analytics_debug=1` to any URL: every event is logged to the browser console for that tab.
- Or open the console and run `window.__jaEvents`.
- `npm run test:smoke` checks the main events fire and that no analytics requests are made without an ID.
- With GA4 on: GA4 → Admin → DebugView shows events from browsers with the Google Analytics Debugger extension.

## Questions the data can answer

| Question | Where |
| --- | --- |
| How many people opened the PROMPT sheet page? | CF: Path `/free-resources/chatgpt-prompt-cheatsheet/`. GA4: Pages and screens |
| Which Reel sent them? | GA4 only: Traffic acquisition, Session campaign (`ep05_prompting`, `bio`, ...) |
| How many downloaded vs copied a prompt? | GA4: Events `resource_download`, `prompt_copy` (filter by `resource_id` / `prompt_id`) |
| Do people use the short links? | GA4: Session source `shortlink`. CF cannot see this (no query strings) |
| Are people finishing episodes? | GA4: `episode_complete`, `quiz_complete` |
