---
number: 13
title: 'Embeddings'
headline: 'Embeddings Kya Hai? AI Salary Aur Package Ko Ek Kaise Samajhta Hai (Hindi)'
seoTitle: 'Embeddings Kya Hai? Keyword vs Meaning Search (Hindi)'
description: 'Your bot was asked about salary, the doc said package, and it found nothing. How embeddings turn meaning into numbers, with cosine similarity and a tiny search.'
status: published
category: rag-llms
difficulty: Intermediate
campaign: ep13_embeddings
notebook:
  file: 'ep13-embeddings-explained.ipynb'
  about: 'Ek placement FAQ par keyword search chalao (0 match), phir 7 words ko 3-3 numbers do, cosine similarity se 0 se 100 ka score nikalo, aur wahi sawal meaning se search karo. Asli models ke embedding sizes bhi dekho.'
relatedPrompts: [answer-only-from-document-prompt]
sources:
  - label: 'OpenAI, Embeddings guide'
    url: 'https://developers.openai.com/api/docs/guides/embeddings.md'
  - label: 'Google AI Studio, Embeddings'
    url: 'https://aistudio.google.com/docs/embeddings'
quiz:
  - q: 'Bot se poochha "salary kitni milegi?", doc mein "package" likha tha. Keyword search ko kya mila?'
    options: ['0 match, kyunki shabd alag hain', 'Sahi line, kyunki matlab same hai']
    answer: 0
    explain: 'Keyword search sirf same shabd ginta hai. Notebook mein teeno lines par 0 match aaya.'
  - q: 'Embedding kya hai?'
    options: ['Numbers ki list, jo text ka matlab pakadti hai', 'Text ka chhota summary', 'Ek tarah ka keyword']
    answer: 0
    explain: 'Matlab paas, to numbers paas. Hamare toy mein salary aur package ka score 96 hai, salary aur samosa ka 0.'
  - q: 'RAG mein sahi chunks kaise dhoondhe jaate hain?'
    options: ['Sawal ka embedding banao, aur sabse paas wale chunks uthao', 'Sabse lambe chunks uthao']
    answer: 0
    explain: 'Files ke chunks ke embeddings pehle se store hote hain. Sawal ka embedding unse compare hota hai.'
---

> **Short mein:** Tumhare placement bot se poochha "salary kitni milegi?", doc mein "package" likha tha, aur bot ko kuch nahi mila. **Keyword search shabd milata hai, embeddings matlab.** Embedding yaani numbers ki list: matlab paas, to numbers paas.

## Keyword search fail

Hamara FAQ teen lines ka hai: package wali, exam wali aur canteen wali. Sawal: "salary kitni milegi". Notebook ka `keyword()` same shabd ginta hai:

| Match | Line |
| --- | --- |
| 0 | Average package 6 LPA hai |
| 0 | Exam syllabus portal par hai |
| 0 | Canteen mein samosa milta hai |

"Salary" shabd kahin likha hi nahi. Keyword search ke liye salary aur package alag hain.

## Word = numbers

Har word ko numbers ki ek list de do. Isi list ko **embedding** kehte hain. Hamare toy mein har word ke 3 numbers hain: paisa, padhai, khana. Ye numbers haath se rakhe hain, asli model ke nahi.

| Word | paisa | padhai | khana |
| --- | --- | --- | --- |
| salary | 0.9 | 0.1 | 0.0 |
| package | 0.7 | 0.3 | 0.0 |
| samosa | 0.0 | 0.0 | 1.0 |

Matlab paas, to numbers paas. Salary aur package ek taraf, samosa bilkul doosri taraf.

## Similarity naapo

Do lists kitni paas hain, ye **cosine similarity** se naapte hain: dono ki disha kitni milti hai. Notebook use 0 se 100 ke beech laata hai:

- salary aur package: **96**
- salary aur ctc: **99**
- salary aur exam: **11**
- salary aur samosa: **0**

Ek bhi shabd nahi mila, phir bhi AI ko pata hai ki salary aur package ek hi baat hai.

## Meaning se search

Poori line ka embedding uske words ke numbers ka average hai. Wahi sawal, ab meaning se:

| Score | Line |
| --- | --- |
| 96 | Average package 6 LPA hai |
| 17 | Exam syllabus portal par hai |
| 6 | Canteen mein samosa milta hai |

Sahi line sabse upar. Isi ko **semantic search** kehte hain.

## Asli embeddings

Asli models 3 nahi, hazaaron numbers dete hain: OpenAI ka `text-embedding-3-small` 1536, `text-embedding-3-large` aur Gemini ka `gemini-embedding-2` 3072. Ye numbers koi haath se nahi rakhta. Model bahut saara text padhkar khud seekhta hai.

Ek farak: hamare numbers ke naam the (paisa, padhai, khana). Asli embedding ke numbers ka aisa saaf matlab nahi hota.

## RAG mein kaam

Episode 4 ka RAG yaad karo. Files ke chunks ko embeddings mein badlo aur store kar lo. Sawal aaye, to uska bhi embedding banao, aur sabse paas wale chunks uthao. Search aur recommendation bhi isi se chalte hain.

**Ek line yaad rakho:** Keyword shabd dhoondhta hai, embeddings matlab.

Agla episode: **Practical RAG**, apni files wala bot kaise banta hai.
