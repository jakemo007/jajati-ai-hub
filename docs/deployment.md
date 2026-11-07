# Deploying to Cloudflare Pages (Free plan)

Nothing here has been done yet: no GitHub repository and no Cloudflare project exist. Each step below is yours to do
(or ask Claude to do it with you, step by step).

Free plan limits that matter here (Cloudflare docs, checked 7 Nov 2026): 500 builds a month, 1 build at a time,
20 minute build timeout, 20,000 files per site, 25 MiB per file, 100 custom domains per project,
2,000 static redirects in `_redirects`, 100 rules in `_headers`. This site uses about 115 files and 6 redirects.

## 1. Commit the code

```bash
cd C:\Github\jajati-ai-hub
git add -A
git status            # check: no .env, no node_modules, no dist, no DM or username files
git commit -m "Jajati AI hub: first version"
```

## 2. Create the GitHub repository

On github.com → New repository → name `jajati-ai-hub` → **Private** is fine (Cloudflare can read private repos).
Do not add a README or .gitignore there. Then:

```bash
git remote add origin https://github.com/<your-user>/jajati-ai-hub.git
git push -u origin main
```

## 3. Create the Pages project

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git** → authorise GitHub →
pick `jajati-ai-hub`.

## 4. Build settings

| Setting | Value |
| --- | --- |
| Project name | `jajati-ai-hub` (becomes `jajati-ai-hub.pages.dev`; if taken, Cloudflare picks another name, see step 6) |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (leave empty) |

The Node version comes from `.node-version` (22.23.4). You do not need a `NODE_VERSION` variable.

## 5. Environment variables

Settings → Variables and secrets → **Production**:

| Variable | Value |
| --- | --- |
| `SITE_URL` | `https://jajati-ai-hub.pages.dev` (or your real `*.pages.dev` address / custom domain) |
| `PUBLIC_GA4_ID` | only if you set up GA4 (see `docs/analytics.md`) |

## 6. Deploy and check the address

**Save and Deploy.** The first build takes 1 to 2 minutes. Note the address Cloudflare gives you.
If it is not `jajati-ai-hub.pages.dev`, set `SITE_URL` to the real one and **Retry deployment**, then replace the
address in `docs/instagram-links.md` before posting any link.

## 7. Test the live site

```bash
curl -sI https://jajati-ai-hub.pages.dev/prompt
```

Expect `HTTP/2 302` and a `location:` header pointing to the PROMPT sheet page. Then run the browser test against the live site:

```bash
BASE_URL=https://jajati-ai-hub.pages.dev npm run test:smoke
```

(In PowerShell: `$env:BASE_URL='https://jajati-ai-hub.pages.dev'; npm run test:smoke`.) Note: on Cloudflare the short
links are real redirects, so they also pass. Open the PROMPT sheet on your phone **inside the Instagram app** (send yourself
the link in a DM and tap it) and try the download and the Copy buttons.

## 8. Turn on Web Analytics

Workers & Pages → project → **Metrics** → Web Analytics → **Enable**, then redeploy once. See `docs/analytics.md`.

## 9. Custom domain (optional, costs money)

A domain is not needed. If you buy one later: project → **Custom domains** → Set up a custom domain. Then change
`SITE_URL` to it, redeploy, and update your bio link. Search engines are told the real address through the canonical tags.

## 10. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Add property → **URL prefix** →
   `https://jajati-ai-hub.pages.dev/` (a Domain property needs DNS access, which `pages.dev` does not give you).
2. Verify with the **HTML tag** method: copy the `content` value, then add to `src/layouts/BaseLayout.astro` inside `<head>`:
   `<meta name="google-site-verification" content="..." />`. Commit, push, wait for the deploy, click Verify.
3. Sitemaps → submit `sitemap-index.xml`.
4. URL inspection → paste the PROMPT sheet URL → **Request indexing**.

Also worth doing: [Bing Webmaster Tools](https://www.bing.com/webmasters) → Import from Google Search Console.

## Updating the site later

Edit the Markdown, `npm test`, commit, `git push`. Cloudflare rebuilds automatically.
Every other branch gets its own preview address (`<branch>.jajati-ai-hub.pages.dev`), which Cloudflare marks
`noindex` automatically.

## Rolling back

Workers & Pages → project → **Deployments** → pick an older deployment → ⋯ → **Rollback to this deployment**.
