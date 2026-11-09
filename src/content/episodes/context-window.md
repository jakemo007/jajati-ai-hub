---
number: 2
title: 'Context Window'
headline: 'ChatGPT Bhool Kyun Jaata Hai? Context Window Explained in Hindi'
seoTitle: 'Context Window Explained in Hindi: Why ChatGPT Forgets'
description: 'Why a long ChatGPT chat forgets your first messages: the context window is AI''s desk. Plus 3 tricks to stop it forgetting.'
status: published
category: ai-fundamentals
difficulty: Beginner
published: 2026-11-02
videos:
  youtube: 'https://www.youtube.com/shorts/Pko5jMeTMHE'
  instagram: 'https://www.instagram.com/reel/DfPy2BvtGLI/'
campaign: ep02_context_window
notebook:
  file: 'ep2-context-window-explained.ipynb'
  about: 'Video ka har number isi notebook se aaya: 6 messages ki chat 83 tokens, har turn par poori chat dobara (kul 299), aur 128,000 tokens ki desk = lagbhag 373 pages.'
relatedPrompts: [role-context-task-format, answer-only-from-document-prompt]
sources:
  - label: 'Liu et al. (2023), "Lost in the Middle: How Language Models Use Long Contexts"'
    url: 'https://arxiv.org/abs/2307.03172'
  - label: 'Vaswani et al. (2017), "Attention Is All You Need" (self-attention)'
    url: 'https://arxiv.org/abs/1706.03762'
quiz:
  - q: 'Context window ko is episode mein kis cheez se samjhaya gaya?'
    options: ['AI ka dimaag', 'AI ki working desk', 'AI ka hard disk']
    answer: 1
    explain: 'Jo desk par hai, AI sirf utna hi dekh sakta hai. Desk bhar gayi to purane papers neeche gir jaate hain.'
  - q: 'Har naye message par AI kya karta hai?'
    options: ['Sirf naya message padhta hai', 'Poori chat (jitni desk par hai) shuru se padhta hai', 'Pichhli chat yaad rakhta hai']
    answer: 1
    explain: 'Model ke paas messages ke beech koi memory nahi hoti. App har baar conversation dobara bhejti hai.'
  - q: 'Sabse zaroori instruction prompt mein kahan likhna chahiye?'
    options: ['Beech mein', 'Shuruaat ya aakhir mein']
    answer: 1
    explain: '"Lost in the Middle" research ke hisaab se lambe text ke beech ki baatein AI zyada miss karta hai.'
---

> **Short mein:** ChatGPT bhoolta nahi, uski **desk** bhar jaati hai. Ise context window kehte hain. Desk saaf rakho, aur zaroori baat shuru ya aakhir mein likho.

## Context window = AI ki working desk

AI ke paas ek desk hai. Jo is desk par rakha hai, AI bas utna hi dekh sakta hai. Is desk ka naam hai **context window**.

## Sabse bada raaz: AI ko kuch yaad nahi rehta

Model ke paas ek message se doosre message tak koi memory nahi hoti. Har baar jab tum send dabate ho, app **poori chat shuru se** dobara desk par rakhti hai, aur AI use phir se padhta hai.

(ChatGPT ka "Memory" feature kuch notes save karta hai, par wo notes bhi isi desk par hi rakhe jaate hain.)

## Desk bhar gayi to?

Lambi chat mein desk bhar jaati hai. Tab sabse purane messages AI ko dikhne band ho jaate hain: kuch apps unhe hata deti hain, kuch unka summary bana deti hain. Yahi hai AI ka "bhoolna". Ye bug nahi, desk ka size hai.

## Desk par kya-kya rakha hota hai

- Hidden instructions (system prompt), jo app khud jodti hai
- Tumhare saare messages
- Files jo tumne daali
- Aur AI ke apne jawab bhi

Desk ka size **tokens** mein naapa jaata hai, wahi bricks jo Episode 1 mein dekhe. Example: GPT-4o ka context window 1,28,000 tokens ka hai. Ek token lagbhag 0.75 English words, to ye karib 96,000 words, yaani lagbhag 300 pages ki kitaab. Kuch models 10 lakh tokens tak lete hain.

Aur yaad hai? Hindi mein tokens zyada bante hain, isliye Hindi chat desk jaldi bharti hai.

## Desk badi kyun nahi kar dete?

Standard "self-attention" mein har token baaki har token se juda hota hai. Tokens doguna, to jode lagbhag chaar guna, aur kaam bhi lagbhag chaar guna. Naye models isse tez tareeke bhi use karte hain, par badi desk phir bhi mehngi padti hai.

## Surprise: Lost in the Middle

Badi desk par bhi AI **beech ki baatein** zyada miss karta hai. Research ne dikhaya ki lambe input ki shuruaat aur aakhir ki baatein AI behtar use karta hai, beech ki kam. Naye models isme behtar hue hain, par advice kaam ki hai.

## 3 tricks

1. **Sabse zaroori instruction prompt ki shuruaat ya aakhir mein likho**, beech mein nahi.
2. **Naya topic, nayi chat.** Ek hi chat mein sab kuch mat chalao.
3. **Lambi chat ka summary banwao**, aur use nayi chat mein paste karo.

**Ek line yaad rakho:** AI bhoolta nahi, uski desk bharti hai. Desk saaf rakho.
