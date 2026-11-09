---
number: 3
title: 'Hallucination'
headline: 'ChatGPT Jhooth Kyun Bolta Hai? AI Hallucination Explained in Hindi'
seoTitle: 'ChatGPT Jhooth Kyun Bolta Hai? AI Hallucination in Hindi'
description: 'Why AI gives confident wrong answers, fake links and fake facts, the $100 billion mistake, and 3 tricks to catch it.'
status: published
category: ai-fundamentals
difficulty: Beginner
published: 2026-11-03
videos:
  youtube: 'https://www.youtube.com/shorts/YdcDpEGoYP0'
  instagram: 'https://www.instagram.com/reel/DfT0SVONTW6/'
keyword: SACH
campaign: ep03_hallucination
resource: ai-hallucination-cheatsheet
notebook:
  file: 'ep3-hallucination-explained.ipynb'
  about: 'Ek chhota AI khud banao: 6 sach sentences se seekhta hai, phir Australia ki rajdhani poochho aur dekho woh confidence se Delhi kyun bolta hai.'
relatedPrompts: [say-i-dont-know-prompt, source-for-every-fact-prompt, answer-only-from-document-prompt]
sources:
  - label: 'OpenAI (2025), "Why language models hallucinate"'
    url: 'https://openai.com/index/why-language-models-hallucinate/'
  - label: 'NPR (2023), Google shares fall after Bard''s error'
    url: 'https://www.npr.org/2023/02/09/1155650909/google-chatbot--error-bard-shares'
  - label: 'LawNext (2023), sanctions in the fake ChatGPT cases'
    url: 'https://www.lawnext.com/2023/06/court-imposes-sanctions-on-lawyers-who-filed-bogus-cases-after-relying-on-chatgpt-for-legal-research.html'
quiz:
  - q: 'AI hallucination kya hai?'
    options: ['AI ka hang ho jaana', 'AI ka poore confidence se galat baat bolna', 'AI ka slow chalna']
    answer: 1
    explain: 'Fake facts, fake links, fake quotes: sab poore confidence ke saath.'
  - q: 'AI guess kyun karta hai?'
    options: ['Wo jaan-boojhkar jhooth bolta hai', 'Training mein guess karne par marks milte hain, "pata nahi" bolne par nahi', 'Internet slow hai']
    answer: 1
    explain: 'Bilkul exam jaisa: khaali chhodo to zero, guess karo to shayad marks.'
  - q: 'AI ne link diya. Use check karne ka sahi tareeka?'
    options: ['AI se poochho "kya ye sahi hai?"', 'Link khud kholo aur padho']
    answer: 1
    explain: 'AI se verify karwaoge to wo dobara guess karega. Fake cases waale lawyers ne yahi galti ki thi.'
---

> **Short mein:** AI sach nahi dhoondhta. Wo bas agla word guess karta hai jo sabse sahi lage. Isliye kabhi-kabhi poore confidence se galat bolta hai. Ise **hallucination** kehte hain.

## Ek galti, aur 100 billion dollars

Feb 2023 mein Google ke chatbot Bard ke ek ad mein likha tha ki James Webb telescope ne hamare solar system ke bahar ke planet ki pehli photo li. Ye galat tha: pehli aisi photo 2004 mein Chile ke Very Large Telescope ne li thi. Is ad ke baad 8 Feb 2023 ko Alphabet (Google) ke shares karib 7.7% gire, aur company ki value lagbhag $100 billion kam hui. (Kuch analysts ne launch event ko bhi wajah bataya, isliye "ke baad" kaha hai, "ki wajah se" nahi.)

## Hallucination kya hai?

AI poore confidence se galat baat bolta hai. Fake facts, fake links, fake quotes, fake research papers bhi.

## AI aisa kyun karta hai?

1. **AI sach nahi dhoondhta.** Episode 1 yaad karo: AI probability se agla token chunta hai. Wo wahi chunta hai jo sabse sahi *lagta* hai, zaroori nahi ki sahi *ho*.
2. **Andar koi sach-jhooth meter nahi hai.** Fluent sentence sahi dikhta hai, par fluent hona aur sach hona alag baatein hain.
3. **Exam wali aadat.** OpenAI ki 2025 ki research kehti hai ki training aur testing mein guess karne par number milte hain, "pata nahi" bolne par nahi. Bilkul exam jaisa: khaali chhodo to zero, guess karo to shayad marks.

## Court tak pahunchi galti

2023 mein America mein do lawyers ne ek case (Mata v. Avianca) mein ChatGPT ke diye 6 cases court mein de diye. Wo cases kabhi exist hi nahi karte the. Lawyers ne ChatGPT se hi poochha tha ki cases asli hain ya nahi. Court ne $5,000 ka fine lagaya.

## Sabse zyada khatra kahan?

- Links, sources aur citations
- Numbers, dates aur percentages
- Naam: log, court cases, kitaabein, research papers
- Nayi khabar, jo training ke baad hui
- Rare topics, jin par internet par kam likha hai

## 3 tricks

1. **Source maango, link khud kholo.** AI se verify mat karwao, wo dobara guess karega.
2. **"Pata nahi" bolne ki chhoot do.** Prompt mein likho ki pakka nahi pata to "pata nahi" bolo.
3. **Apna document do.** Bolo: sirf isi se jawab do. Isse jhooth kam hota hai, khatam nahi. (Ye idea Episode 4, RAG, ka base hai.)

Teeno tricks ki copy-paste lines SACH cheat sheet mein hain.

**Ek line yaad rakho:** AI jhootha nahi, guesser hai. Zaroori baat hamesha check karo.
