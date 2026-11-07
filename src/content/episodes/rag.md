---
number: 4
title: 'RAG'
headline: 'RAG Explained in Hindi: How a Company AI Bot Reads Your Files'
seoTitle: 'RAG Explained in Hindi: How a Company AI Bot Reads Files'
description: 'RAG (Retrieval Augmented Generation) as an open-book exam for AI, in 4 steps, how it differs from fine-tuning, and how to try it free in NotebookLM.'
status: published
category: rag-llms
difficulty: Intermediate
published: 2026-11-05
videos:
  youtube: 'https://www.youtube.com/shorts/0EZYoUYOtM8'
  instagram: 'https://www.instagram.com/reel/DfYw8uHChUf/'
keyword: RAG
campaign: ep04_rag
resource: rag-notebooklm-cheatsheet
relatedPrompts: [answer-only-from-document-prompt, source-for-every-fact-prompt]
sources:
  - label: 'Lewis et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Facebook AI Research)'
    url: 'https://arxiv.org/abs/2005.11401'
quiz:
  - q: 'RAG ko is episode mein kis cheez se samjhaya gaya?'
    options: ['Closed-book exam', 'Open-book exam', 'Ratta maarna']
    answer: 1
    explain: 'Pehle sahi page dhoondho, phir usse jawab likho.'
  - q: 'RAG mein chunks kaise dhoondhe jaate hain?'
    options: ['Sirf keyword match se', 'Meaning se: jo chunks sawal ke matlab se sabse milte hain']
    answer: 1
    explain: 'Har chunk ka meaning numbers (embedding) mein hota hai, aur sawal ke sabse paas waale chunks chune jaate hain.'
  - q: 'RAG aur fine-tuning mein fark?'
    options: ['Dono same hain', 'Fine-tuning = poori kitaab ratwana, RAG = sahi page khol kar dena']
    answer: 1
    explain: 'Fine-tuning model ko badalta hai. RAG sirf ye badalta hai ki model ko padhne ke liye kya diya gaya.'
---

> **Short mein:** ChatGPT ne tumhari company ki files kabhi nahi padhi. Company ka AI bot unse jawab de paata hai kyunki wo **RAG** use karta hai: pehle sahi page dhoondho, phir usse jawab likho.

## Problem: AI sirf yaaddasht se bolta hai

Bina RAG ke, ChatGPT sirf us cheez se bolta hai jo usne training mein padhi. Tumhari office policy, tumhare notes, tumhara product manual: ye usne kabhi dekhe hi nahi. Isliye office ke sawal par wo guess karta hai (aur guess ka kya hota hai, wo Episode 3 mein dekha).

## RAG = AI ka open-book exam

Episode 3 ki exam waali aadat yaad karo. RAG AI ko **open-book exam** deta hai: pehle sahi page dhoondho, phir jawab likho.

Poora naam: **Retrieval Augmented Generation**. Retrieval = dhoondhna, Generation = jawab banana. Ye naam 2020 mein Facebook AI ki ek research paper ne diya. (Idea isse purana hai, naam wahan se aaya.)

## RAG ke 4 steps

1. **Chunk:** apni files ko chhote tukdon mein kaato. Har tukda ek chunk.
2. **Embedding:** har chunk ka meaning numbers mein badlo. Episode 1 mein words numbers bane the, yahan poore chunk ka meaning banta hai. Ye numbers ek vector database mein rakhe jaate hain.
3. **Retrieval:** sawal aaya, to uske meaning se sabse milte-julte chunks dhoondho. Keyword se nahi, meaning se.
4. **Answer:** wo chunks prompt mein jodo. Haan, wahi context window wali desk, Episode 2 se. Ab AI unhi chunks ko padhkar jawab deta hai, aur bata sakta hai ki kis source se liya.

## RAG vs fine-tuning

- **Fine-tuning** = AI ko poori kitaab ratwana. Model khud badalta hai.
- **RAG** = AI ko bas sahi page khol kar dena. Model wahi rehta hai, sirf padhne ka material badalta hai.

## Dhyan rahe

- Galat chunk mila, to jawab bhi galat.
- RAG jhooth **kam** karta hai, khatam nahi. Source khud check karo.
- Office ki files kisi tool mein daalne se pehle company ki policy dekh lo.

## Free mein try karo: NotebookLM

1. [notebooklm.google.com](https://notebooklm.google.com/) kholo, Google account se sign in karo.
2. Naya notebook banao aur source daalo: PDF, Google Doc, website link ya YouTube link.
3. Sawal poochho. Jawab mein [1] jaise number par click karo, source ka wahi hissa dikhega.

Steps RAG cheat sheet mein bhi hain. Tools badalte rehte hain, isliye agar koi option alag dikhe to NotebookLM ki apni help dekh lo.

**Ek line yaad rakho:** AI ko ratne mat do, padhne do.
