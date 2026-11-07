# Deploying to Cloudflare Pages (Free plan)

The site is static and is hosted on **Cloudflare Pages** at `https://jajati-ai-hub.pages.dev`, built from
`jakemo007/jajati-ai-hub` (public), branch `main`. That address is also the default `SITE_URL` in the code, so canonical
URLs, the sitemap and social previews are right without setting any variable.

Why Pages and not a Worker: a Worker's address is `<project>.<account-subdomain>.workers.dev`, and this account's
subdomain is a personal identifier. A Pages address has no account part, and it is shorter to type in a CTA.

Free plan limits that matter here (Cloudflare docs, checked 7 Nov 2026): 500 builds a month, 1 build at a time,
20 minute build timeout, 20,000 files per site, 25 MiB per file, 2,000 static redirects in `_redirects`, 100 rules in
`_headers`. This site uses about 150 files and 6 redirects.

## 1. Code on GitHub (done)

```bash
cd C:\Github\jajati-ai-hub
git status            # check: no .env, no node_modules, no dist, no DM or username files
git push
```

This repository commits with the GitHub private email (`git config user.email`, set for this repo only).

## 2. Create the Pages project

Cloudflare dashboard → **Workers & Pages** → **Create application**. The first screen creates a *Worker*; look for
**"Looking to deploy Pages? Get started"** (or the **Pages** tab) → **Import an existing Git repository** →
`jakemo007/jajati-ai-hub`.

| Setting | Value |
| --- | --- |
| Project name | `jajati-ai-hub` (gives `jajati-ai-hub.pages.dev`; if Cloudflare adds a suffix, see step 4) |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (leave empty) |

The Node version comes from `.node-version` (22.23.4). No `NODE_VERSION` variable is needed. **Save and Deploy.**

## 3. Variables (optional)

Pages project → Settings → **Variables and secrets** → Production:

| Variable | Value |
| --- | --- |
| `SITE_URL` | only if the address is not `https://jajati-ai-hub.pages.dev` (custom domain or suffixed name) |
| `PUBLIC_GA4_ID` | only if you set up GA4 (`docs/analytics.md`) |

They are read at build time: after changing one, **Retry deployment** or push a commit.

## 4. Check the address

The first build takes about 1 minute. If the address is not exactly `jajati-ai-hub.pages.dev`, set `SITE_URL` (step 3),
redeploy, and replace the address in `docs/instagram-links.md` before posting any link.

## 5. Test the live site

```bash
curl -sI https://jajati-ai-hub.pages.dev/prompt
```

Expect `302` and a `location:` header to the PROMPT sheet with `utm_source=shortlink`. Also
`curl -sI https://jajati-ai-hub.pages.dev/resources/prompt-5-prompts.pdf` should show `x-robots-tag: noindex`, and
`/nope/` should return `404`. Then the browser test against the live site (PowerShell):

```powershell
$env:BASE_URL='https://jajati-ai-hub.pages.dev'; npm run test:smoke
```

Open the PROMPT sheet on your phone **inside the Instagram app** (send yourself the link in a DM and tap it) and try
Download and Copy.

## 6. Web Analytics

Pages project → **Metrics** → Web Analytics → **Enable**, then redeploy once. Do not also set
`PUBLIC_CF_ANALYTICS_TOKEN` (every visit would count twice). See `docs/analytics.md`.

## 7. Custom domain (optional, costs money)

A domain is not needed. If you buy one later: Pages project → **Custom domains** → Set up a custom domain. Then set
`SITE_URL` to it, redeploy, and update your bio link. Canonical tags tell search engines the real address.

## 8. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Add property → **URL prefix** →
   `https://jajati-ai-hub.pages.dev/` (a Domain property needs DNS access, which `pages.dev` does not give you).
2. Verify with the **HTML tag** method: copy the `content` value, then add to `src/layouts/BaseLayout.astro` inside `<head>`:
   `<meta name="google-site-verification" content="..." />`. Commit, push, wait for the deploy, click Verify.
3. Sitemaps → submit `sitemap-index.xml`.
4. URL inspection → paste the PROMPT sheet URL → **Request indexing**.

Also worth doing: [Bing Webmaster Tools](https://www.bing.com/webmasters) → Import from Google Search Console.

## Updating the site later

Edit the Markdown, `npm test`, commit, `git push`. Pages rebuilds `main` automatically. Other branches get a preview
address (`<branch>.jajati-ai-hub.pages.dev`), which Cloudflare marks `noindex` automatically.

## Rolling back

Pages project → **Deployments** → pick an older deployment → ⋯ → **Rollback to this deployment**.

## About `wrangler.jsonc` and the old Worker

The project was first created as a Worker by mistake. With no Wrangler config in the repo, the Worker's
`npx wrangler deploy` "auto-configured" the site: it added the `@astrojs/cloudflare` adapter, switched the build to
server mode, and the deploy failed with "Invalid _redirects configuration: Duplicate rule for path /sach".
`wrangler.jsonc` (a static-assets-only config) fixed that, and the Worker served the site correctly, but at an address
containing the account subdomain.

Once the Pages site is live, delete the Worker (Workers & Pages → `jajati-ai-hub` Worker → Settings → Delete) so there is
one copy of the site. After that, `wrangler.jsonc` is only needed if you ever deploy as a Worker again. Never run
`astro add cloudflare` for this site: it must stay static.
