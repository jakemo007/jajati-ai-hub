# Deploying to Cloudflare (Free plan)

Status (7 Nov 2026): code on GitHub at `jakemo007/jajati-ai-hub` (public). The Cloudflare project `jajati-ai-hub` was
created as a **Worker** (what Cloudflare now creates when you import a Git repository). The site is fully static, so it
is served as Workers **static assets**: no Worker script, no Astro adapter, no server rendering.

`wrangler.jsonc` in the repo tells Cloudflare exactly that. Without it, `npx wrangler deploy` "auto-configures" the
project, adds the `@astrojs/cloudflare` adapter, switches the build to server mode, and the deploy then fails with
"Invalid _redirects configuration: Duplicate rule for path /sach" (the adapter writes the short links a second time).

Limits that matter here: `_redirects` allows 2,000 static rules (this site uses 6). The build output is about 150 files.

## 1. Code on GitHub (done)

```bash
cd C:\Github\jajati-ai-hub
git status            # check: no .env, no node_modules, no dist, no DM or username files
git push
```

This repository uses the GitHub private email for commits (`git config user.email` in this repo only).

## 2. The Cloudflare project (done: a Worker connected to the repo)

Workers & Pages → `jajati-ai-hub` → **Settings** → **Build**:

| Setting | Value |
| --- | --- |
| Git repository | `jakemo007/jajati-ai-hub`, branch `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (the default) |
| Root directory | (empty) |

The Node version comes from `.node-version` (22.23.4); no variable needed. Every push to `main` builds and deploys.

## 3. Build variables

Worker → **Settings** → **Build** → **Build variables and secrets** (not "Variables & Secrets", which are runtime-only
and invisible to the build):

| Variable | Value |
| --- | --- |
| `SITE_URL` | the site's address, e.g. `https://jajati-ai-hub.<your-subdomain>.workers.dev` (see step 4) |
| `PUBLIC_GA4_ID` | only if you set up GA4 (`docs/analytics.md`) |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics token (step 6) |

These are read at build time. After changing one, retry the latest deployment or push a commit.

## 4. The address

A Worker is served at `https://jajati-ai-hub.<your-subdomain>.workers.dev`; the deploy log prints it at the end
("Deployed jajati-ai-hub triggers"), and it is shown on the Worker's overview page. Set `SITE_URL` to it (step 3),
redeploy, then replace `jajati-ai-hub.pages.dev` in `docs/instagram-links.md` before posting any link.

Prefer a shorter `jajati-ai-hub.pages.dev` address? That needs a **Pages** project instead (Workers & Pages → Create →
Pages → Connect to Git; build command `npm run build`, output `dist`). The same code works on both; Pages ignores
`wrangler.jsonc` because it has no `pages_build_output_dir`. Delete the Worker afterwards so there is one live copy.

## 5. Test the live site

```bash
curl -sI https://<your-address>/prompt
```

Expect `HTTP/2 302` and a `location:` header pointing to the PROMPT sheet page with `utm_source=shortlink`. Also check
`curl -sI https://<your-address>/resources/prompt-5-prompts.pdf` shows `x-robots-tag: noindex` (from `public/_headers`)
and `curl -sI https://<your-address>/nope/` returns `404`. Then the browser test against the live site
(PowerShell):

```powershell
$env:BASE_URL='https://<your-address>'; npm run test:smoke
```

Open the PROMPT sheet on your phone **inside the Instagram app** (send yourself the link in a DM and tap it) and try
Download and Copy.

## 6. Web Analytics

Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site** → enter the address → copy the `token`
value from the snippet (not the whole snippet) → set it as the `PUBLIC_CF_ANALYTICS_TOKEN` build variable (step 3)
→ redeploy. The site then loads Cloudflare's beacon itself. See `docs/analytics.md` for what it can and cannot measure.

## 7. Custom domain (optional, costs money)

A domain is not needed. If you buy one later: Worker → **Settings** → **Domains & Routes** → Add → Custom domain.
Then change `SITE_URL` to it, redeploy, and update your bio link. Canonical tags tell search engines the real address.

## 8. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Add property → **URL prefix** →
   your address (a Domain property needs DNS access, which `workers.dev` / `pages.dev` do not give you).
2. Verify with the **HTML tag** method: copy the `content` value, then add to `src/layouts/BaseLayout.astro` inside `<head>`:
   `<meta name="google-site-verification" content="..." />`. Commit, push, wait for the deploy, click Verify.
3. Sitemaps → submit `sitemap-index.xml`.
4. URL inspection → paste the PROMPT sheet URL → **Request indexing**.

Also worth doing: [Bing Webmaster Tools](https://www.bing.com/webmasters) → Import from Google Search Console.

## Updating the site later

Edit the Markdown, `npm test`, commit, `git push`. Cloudflare rebuilds and deploys `main` automatically.

## Rolling back

Worker → **Deployments** → pick an older version → **Deploy** / Rollback.
