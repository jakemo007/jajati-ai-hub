---
# Copy to src/content/episodes/<slug>.md. URL: /episodes/<slug>/ (published episodes only).
#
# A Coming Soon topic needs only: title, headline, description, status: coming-soon, category,
# difficulty, order, and optionally note. It shows on /episodes/ without its own page.
# To publish it later: add number, published, videos, sources and quiz, set status: published.

number: 6
title: 'AI Agents'                 # topic name, used on cards and in "Ep 6: AI Agents"
headline: 'AI Agents Explained in Hindi: ...'   # the H1
# seoTitle: 'Shorter title if "headline | Jajati AI" is over 70 characters (max 58)'
description: 'What the episode teaches. Max 160 characters.'
status: published                 # published | coming-soon

# One of: prompt-engineering, ai-fundamentals, ai-tutorials, practical-ai, ai-tools, python-ai, rag-llms, ai-agents
category: ai-agents
difficulty: Beginner              # Beginner | Intermediate | Advanced
published: 2026-11-10
# updated: 2026-11-20

# Only real, published video links.
videos:
  youtube: 'https://www.youtube.com/shorts/VIDEO_ID'
  instagram: 'https://www.instagram.com/reel/REEL_ID/'

# The comment keyword and UTM campaign used in the Reel CTA (see docs/instagram-links.md)
# keyword: AGENT
campaign: ep06_agents
# resource: some-cheatsheet       # if the episode has a free sheet
relatedPrompts: []

sources:
  - label: 'Source name'
    url: 'https://example.com'

# 3 short questions. answer is the index of the right option, starting at 0.
quiz:
  - q: 'Question?'
    options: ['Option A', 'Option B', 'Option C']
    answer: 1
    explain: 'Why B is right.'

# note: 'Shown on Coming Soon cards, e.g. "Next up."'
order: 100
---

> **Short mein:** the one-sentence answer.

## Section from the script

The episode explained in text, from the video script. Facts must match the sources above.
