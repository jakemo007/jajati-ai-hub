---
number: 14
title: 'Practical RAG'
headline: 'Practical RAG: Bot Ka Jawab Galat? Pehle Chunks Dekho (Hindi)'
seoTitle: 'RAG Bot Galat Jawab De? Chunks Print Karo, Overlap Do'
description: 'Your RAG bot gave a wrong answer. Print the retrieved chunks first, fix cut sentences with overlap, and test with 5 questions. Free Python notebook.'
status: published
category: rag-llms
difficulty: Intermediate
campaign: ep14_practical_rag
notebook:
  file: 'ep14-practical-rag-explained.ipynb'
  about: 'Ek chhote placement FAQ ko 6-6 words ke chunks mein kaato, dekho sentence beech mein kata to top chunk mein jawab nahi aata (5 mein se 1), overlap lagao (5 mein se 5), aur jo sawal doc mein nahi hai uspar bot ko "Doc mein nahi hai" bolna sikhao.'
relatedPrompts: [answer-only-from-document-prompt, say-i-dont-know-prompt, source-for-every-fact-prompt]
sources:
  - label: 'OpenAI, Retrieval guide (default chunking: 800 tokens, 400 overlap)'
    url: 'https://developers.openai.com/api/docs/guides/retrieval.md'
  - label: 'OpenAI, File search (results are not returned by default)'
    url: 'https://developers.openai.com/api/docs/guides/tools-file-search.md'
  - label: 'Anthropic, Introducing Contextual Retrieval'
    url: 'https://www.anthropic.com/news/contextual-retrieval'
quiz:
  - q: 'Tumhare RAG bot ne galat jawab diya. Sabse pehle kya dekhna chahiye?'
    options: ['Retrieved chunks print karke dekho', 'Prompt ko lamba kar do', 'Model badal do']
    answer: 0
    explain: 'Model wahi padhta hai jo search use deta hai. Sahi chunk top mein hi nahi aaya, to prompt badalna bekaar hai.'
  - q: 'Notebook mein bina overlap ke, 5 sawalon mein se kitnon ka jawab top chunk mein mila?'
    options: ['1', '3', '5']
    answer: 0
    explain: 'Sentence beech mein kat gaye the. 3 words ke overlap ke saath 5 mein se 5 mile. Ye chhota nakli FAQ hai, isliye numbers sirf is example ke hain.'
  - q: 'Sawal ka jawab doc mein hai hi nahi. Bot ko kya karna chahiye?'
    options: ['Kuch bhi guess karke bol do', 'Score kam ho to bolo "doc mein nahi hai", aur source dikhao']
    answer: 1
    explain: 'Notebook mein "CEO kaun hai" ka best score 1 aaya, limit 2 se kam. Limit apne docs par test karke chuno.'
---

> **Short mein:** Resume wala bot galat bola? Prompt ya model? Dono baad mein. Interview mein poochha: "tumhare RAG bot ne galat jawab diya, to pehle kya dekhoge?" **Pehle retrieved chunks print karo, prompt baad mein.** Model wahi padhta hai jo search use deta hai.

## Jawab galat kyun

Episode 4 ka RAG yaad karo: pehle sahi chunk dhoondho, phir model usi chunk se jawab likhe. Yani search chuka, to model ke paas sahi page hi nahi hoga.

Hamara doc ek chhota placement FAQ hai, sirf 36 words ka. Ye doc nakli hai, samjhane ke liye. Notebook ka `chunk()` use 6-6 words ke tukdon mein kaatta hai, to 6 chunks bante hain:

| Chunk | Text |
| --- | --- |
| 1 | College FAQ notes Resume ki last |
| 2 | date 15 December Mock interview ka |
| 3 | din Friday hai Join karne ki |
| 4 | limit 60 din Placement cell roz |
| 5 | 10 baje khulta Sabhi ke liye. |
| 6 | Resume mein sirf ek page rakho |

"Resume ki last" ek chunk mein reh gaya, aur "date 15 December" agle mein.

## Pehle chunks dekho

Sawal: "Resume ki last date kab hai". Notebook ka `score()` ginta hai ki sawal ke kitne words chunk mein mile. Top 2 chunks print karo:

| Score | Chunk |
| --- | --- |
| 3 | College FAQ notes Resume ki last |
| 2 | din Friday hai Join karne ki |

15 December kisi mein nahi. Model ko ye chunks milenge, to wo guess karega ya bolega "pata nahi". Yahan galti search ki hai.

Har galti chunks ki nahi hoti. Par pehle yahin dekho, ye sabse aasan check hai.

**Pehla niyam:** jawab galat ho, to prompt badalne se pehle retrieved chunks print karo.

## Overlap se fix

Overlap: har chunk pichhle chunk ke aakhiri kuch words phir se leta hai, taaki sentence beech mein na kate. Notebook mein step 6 ki jagah 3 hai: 6 words ka chunk, 3 words ka overlap, aur ab 12 chunks.

5 sawalon ka test chalao, har sawal ka jawab hamein pata hai. Dekho top chunk mein jawab aaya ya nahi:

| Chunking | Sahi chunk mila |
| --- | --- |
| Bina overlap | 1 / 5 |
| Overlap 3 words | 5 / 5 |

Wahi pehla sawal: top chunk ab poora sentence hai, "Resume ki last date 15 December", score 4.

Ye chhota test hi RAG ki testing hai: kuch sawal lo jinke jawab pata hon, aur dekho sahi chunk top mein aaya ya nahi. FAQ nakli hai aur score sirf same words ginta hai, isliye ye numbers sirf is toy ke hain.

## Asli defaults

OpenAI ke retrieval docs ka default: chunk 800 tokens ka, overlap 400 tokens. Yani overlap koi extra trick nahi, default hai. Size aur overlap dono settings hain: apne docs par test karke chuno.

## Doc mein jawab hi nahi hai

"CEO kaun hai?" Ye doc mein hai hi nahi. Best score sirf 1 aaya, hamari limit 2 hai, to bot bolta hai "Doc mein nahi hai". Limit apne docs par test karke chuno, aur har jawab ke saath source dikhao, taaki user khud check kar sake.

## Asli app mein

- OpenAI ke file search mein retrieved results default mein wapas nahi aate. Unhe include karna padta hai.
- Ek chunk akela padho, to context kho sakta hai. Anthropic ka example: ek chunk kehta hai revenue badha, par kaun si company aur kab, ye chunk mein nahi. Unka fix: har chunk ke saath chhota context jodo, ki wo kis document ka hai. Isse wo contextual retrieval kehte hain.

**Ek line yaad rakho:** RAG galat bole, to pehle chunks dekho, model baad mein.

Agla episode: **Resume Bullets**, project se resume ke points AI se kaise likhwayein.
