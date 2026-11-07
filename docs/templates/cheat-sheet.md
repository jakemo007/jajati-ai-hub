---
# Adding a cheat sheet (5 steps):
#  1. Put the PUBLIC files (only files made for public sharing) in public/resources/.
#     They are served unchanged at /resources/<file>. Never put DM scripts, username lists or .env files here.
#  2. Copy each PNG preview also to src/assets/resources/ (Astro makes small AVIF/WebP versions from it).
#  3. Copy this file to src/content/resources/<slug>.md. URL: /free-resources/<slug>/
#  4. Optional short link (e.g. /agent): add it to SHORT_LINKS in astro.config.mjs AND to public/_redirects
#     (both forms, with and without the trailing slash). `npm run check:dist` fails if they differ.
#  5. Optional social image: add an ogSheet(...) line in tools/make-og.mjs, run `npm run og`, set ogImage below.

title: 'Full sheet title (the H1)'
shortTitle: 'KEYWORD sheet: what it gives you'   # used on cards and buttons
description: 'What is in it and which episode it is from. PDF and PNG. Max 160 characters.'
keyword: KEYWORD          # the comment keyword from the Reel
campaign: ep06_topic      # the UTM campaign for this sheet's links
shortPath: /keyword       # must match step 4, or remove if there is no short link
learn:
  - 'What the reader gets, point 1'
  - 'Point 2'
files:
  - label: 'Full sheet, 1 page'   # the first file is the big download button
    file: my-sheet.pdf
    format: PDF
    pages: 1
  - label: 'Phone image'
    file: my-sheet.png
    format: PNG
previews:
  - src: ../../assets/resources/my-sheet.png
    file: my-sheet.png
    alt: 'Describe what the sheet image shows, for screen readers.'
ogImage: /og/my-sheet.png   # or remove to use the default social image
episode: some-episode        # optional
relatedPrompts: []
# promptsHeading: 'Copy-paste lines'
# takeaway: 'One closing line from the sheet.'
added: 2026-11-07
order: 4
---

The sheet's text, typed out (so it can be copied and read without downloading, and so search engines can read it).
