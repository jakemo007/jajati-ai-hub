# Instagram and YouTube: bio, links and CTAs

All links below use `https://jajati-ai-hub.pages.dev`. **Use them only after the site is live**, and if Cloudflare
gives you a different address, replace it everywhere first.

## Which links are clickable

| Place | Clickable? | Use |
| --- | --- | --- |
| Instagram bio link | Yes | the main route: `/start/` |
| Instagram Story link sticker | Yes | per-episode tracked link |
| Instagram DM | Yes | the sheet page link (instead of sending the file) |
| Instagram caption, comments | **No** | say "link bio mein" and give the short link to type |
| YouTube channel links (header) | Yes | `/start/` |
| YouTube Shorts description, comments | **No** (Shorts) | say "link channel page par" and the short link |

So the plan is: **bio link → `/start/`** for everyone, and **short links** (`/prompt`, `/sach`, `/rag`) for people
who would rather type. Short links add `utm_source=shortlink` on Cloudflare, so you can count them in GA4.

## Instagram bio

Suggested bio (125 characters, limit is 150):

```
AI aur ChatGPT, simple Hindi mein
AI Explained: har episode ek concept + ek trick
Free prompts & cheat sheets, no DM needed 👇
```

**Link URL:**
```
https://jajati-ai-hub.pages.dev/start/?utm_source=instagram&utm_medium=social&utm_campaign=bio
```
**Link title:** `Free AI Prompts & Cheat Sheets`

## YouTube channel link

Channel → Customise channel → Basic info → Links → Add link:
- Title: `Free AI Prompts & Cheat Sheets`
- URL: `https://jajati-ai-hub.pages.dev/start/?utm_source=youtube&utm_medium=social&utm_campaign=channel_link`

## Per-episode CTAs

The campaign names match the content files, so GA4 shows them side by side.

### Episode 5: Prompt Engineering (keyword PROMPT)

- Sheet page: `https://jajati-ai-hub.pages.dev/free-resources/chatgpt-prompt-cheatsheet/`
- Short link: `jajati-ai-hub.pages.dev/prompt`
- Story sticker / DM link:
  `https://jajati-ai-hub.pages.dev/free-resources/chatgpt-prompt-cheatsheet/?utm_source=instagram&utm_medium=social&utm_campaign=ep05_prompting`

**Pinned comment (Instagram):**
```
PROMPT sheet ab free hai, DM ka wait nahi 🙌
5 copy-paste prompts + Role, Context, Task, Format.
Bio ke link par tap karo, phir PROMPT.
Ya browser mein type karo: jajati-ai-hub.pages.dev/prompt
```

**Reply to everyone who commented PROMPT and is still waiting** (paste as a reply under each comment, no names needed):
```
Sorry for the wait! Sheet ab website par hai, free, koi sign-up nahi.
Bio link par tap karo, ya type karo: jajati-ai-hub.pages.dev/prompt
```

**Spoken / on-screen CTA for future Reels:**
`Comment PROMPT, ya seedha bio link se sheet le lo.`

### Episode 4: RAG (keyword RAG)

- Short link: `jajati-ai-hub.pages.dev/rag`
- Story sticker / DM link:
  `https://jajati-ai-hub.pages.dev/free-resources/rag-notebooklm-cheatsheet/?utm_source=instagram&utm_medium=social&utm_campaign=ep04_rag`

```
RAG + NotebookLM sheet free hai, DM ki zaroorat nahi.
Bio link par tap karo, phir RAG.
Ya type karo: jajati-ai-hub.pages.dev/rag
```

### Episode 3: Hallucination (keyword SACH)

- Short link: `jajati-ai-hub.pages.dev/sach`
- Story sticker / DM link:
  `https://jajati-ai-hub.pages.dev/free-resources/ai-hallucination-cheatsheet/?utm_source=instagram&utm_medium=social&utm_campaign=ep03_hallucination`

```
"AI ka jhooth pakdo" sheet free hai, DM ki zaroorat nahi.
3 copy-paste lines bhi website par hain.
Bio link par tap karo, phir SACH. Ya type karo: jajati-ai-hub.pages.dev/sach
```

### Episode 2: Context Window (no sheet)

- Story sticker link:
  `https://jajati-ai-hub.pages.dev/episodes/context-window/?utm_source=instagram&utm_medium=social&utm_campaign=ep02_context_window`

```
Poora episode text mein + 3 sawal ka quick quiz, bio link mein (Episodes).
```

### Episode 1: Tokens (YouTube only, no sheet)

- YouTube pinned comment (not clickable on Shorts, so give the name):
```
Text version + quiz: jajati-ai-hub.pages.dev par Episodes mein. Link channel page par hai.
```
- Tracked link for anywhere clickable:
  `https://jajati-ai-hub.pages.dev/episodes/tokens/?utm_source=youtube&utm_medium=social&utm_campaign=ep01_tokens`

### YouTube versions of Episodes 3 to 5

Same pinned comment text as Instagram, but replace "Bio ke link par tap karo" with "Link channel page par hai",
and use `utm_source=youtube` in any clickable link.

## UTM rules (for new episodes)

```
?utm_source=<instagram|youtube>&utm_medium=social&utm_campaign=ep<NN>_<topic>[&utm_content=<story|dm|pinned>]
```

- Lowercase, underscores, no spaces. Keep the same `campaign` as in the episode's Markdown file.
- `utm_content` is optional, to tell a Story link from a DM link.
- Never put names, usernames or anything personal in a UTM.
