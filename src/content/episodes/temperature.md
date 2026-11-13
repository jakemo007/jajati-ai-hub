---
number: 11
title: 'Temperature'
headline: 'ChatGPT Har Baar Alag Jawab Kyun Deta Hai? AI Temperature Explained in Hindi'
seoTitle: 'ChatGPT Har Baar Alag Jawab Kyun Deta Hai? (Hindi)'
description: 'Same question, different answer? AI picks each next word like a loaded dice, and temperature changes the dice. Safe answers, new ideas, and the risk for facts.'
status: published
category: ai-fundamentals
difficulty: Beginner
campaign: ep11_temperature
notebook:
  file: 'ep11-temperature-explained.ipynb'
  about: 'Ek chhota "agla word chunne wala" banao: har word ka score, score se chance (%), temperature ka dial, 20 baar chalao, aur dekho fact wale sawal par zyada temperature galat shehar kaise chun leta hai.'
relatedPrompts: [source-for-every-fact-prompt, say-i-dont-know-prompt]
sources:
  - label: 'Anthropic, Glossary: Temperature'
    url: 'https://platform.claude.com/docs/en/about-claude/glossary'
  - label: 'Google AI Studio, Prompt design strategies'
    url: 'https://aistudio.google.com/docs/prompting-strategies'
  - label: 'Hugging Face (2020), How to generate text'
    url: 'https://huggingface.co/blog/how-to-generate'
quiz:
  - q: 'Ek hi sawal do baar poochha aur jawab badal gaya. Kyun?'
    options: ['AI har agla word chance ke hisaab se chunta hai', 'AI confuse ho gaya', 'Internet slow tha']
    answer: 0
    explain: 'AI paasa phenkta hai, aur paasa tedha hai: sabse achhe word ka chance sabse zyada, par baaki words ka bhi thoda chance hai.'
  - q: 'Temperature kam karne se kya hota hai?'
    options: ['Sabse upar wala word lagbhag har baar aata hai', 'AI zyada creative ho jaata hai']
    answer: 0
    explain: 'Notebook mein temperature 0.2 par samosa 98%. Pakka, safe jawab. Zyada temperature par chhote words ko bhi mauka milta hai.'
  - q: 'Fact wala sawal 2 baar poochha aur jawab badal gaya. Kya karo?'
    options: ['Khud check karo, jawab ko pakka mat maano', 'Doosra jawab hi sahi hoga']
    answer: 0
    explain: 'Temperature 2 par notebook ne pehli baar New Delhi aur doosri baar Mumbai bola. Jawab badle, to source se check karo.'
---

> **Short mein:** Ek hi sawal do baar poochha aur jawab badal gaya? AI confuse nahi hai. AI har agla word **paasa phenk kar** chunta hai, aur **temperature** tay karta hai ki paasa kitna tedha ho.

## Agla word kaise chunta hai?

Episode 1 yaad karo: AI ek-ek token karke likhta hai, aur har baar agla word chunta hai. Har option ka ek score hota hai. Notebook mein ek chhota model hai: "Chai ke saath ___" ke 4 words aur unke score (samosa 3.0, biscuit 2.2, pakoda 1.6, pizza 0.2). Ye scores haath se rakhe hain, kisi asli model ke nahi.

## AI ka paasa

Notebook ka `chance()` har score ko temperature se divide karta hai, phir softmax lagata hai, taaki sab milakar 100% ho. Temperature 1 par: **samosa 57%, biscuit 26%, pakoda 14%, pizza 3%**.

Yaani AI paasa phenkta hai, par ye paasa tedha hai. Samosa wali side badi, pizza wali bahut chhoti. Isiliye jawab badalta hai.

## Temperature ka dial

| temp | samosa | biscuit | pakoda | pizza |
| --- | --- | --- | --- | --- |
| 0.2 | 98% | 2% | 0% | 0% |
| 0.5 | 79% | 16% | 5% | 0% |
| 1.0 | 57% | 26% | 14% | 3% |
| 2.0 | 41% | 28% | 21% | 10% |

Temperature kam: sabse upar wala word lagbhag har baar. Zyada: chhote words ko bhi mauka milta hai.

## 20 baar chalao

Notebook ka `bolo()` chance ke hisaab se ek word chunta hai (temperature 0 par seedha sabse upar wala). Har temperature par 20 baar chalaya:

- **0 aur 0.2:** 20 mein se 20 baar samosa.
- **1.0:** 12 samosa, 6 biscuit, 2 pakoda.
- **2.0:** 10 samosa, 7 biscuit, 1 pakoda, aur 2 baar pizza.

Zyada temperature, zyada variety. Caption, naam aur ideas ke liye achha.

## Fact par khatra

Ab fact wala sawal: "India ki rajdhani?" New Delhi ka score sabse ooncha, phir Mumbai, phir Kolkata.

- **Temperature 0.2:** New Delhi 100%.
- **1.0:** New Delhi 92%.
- **2.0:** New Delhi sirf 71%. Sau mein 29 baar galat shehar.

Wahi sawal do baar, temperature 2 par: pehli baar New Delhi, doosri baar Mumbai. Isliye facts, code aur maths ke liye kam temperature achha. Aur jawab badle, to use pakka mat maano.

## Asli AI mein

- ChatGPT ya Gemini app mein temperature ki setting dikhti nahi. Developers ise API mein set kar sakte hain.
- Kuch naye models custom temperature ko ignore karte hain. Google ke docs ke hisaab se Gemini 3.6+ aur Gemini 4 aisa karte hain.
- Temperature 0 par bhi jawab har baar bilkul same ho, ye zaroori nahi (Anthropic glossary).

**App mein 2 aadatein:** fact 2 baar poochho, jawab badle to khud check karo. Ideas chahiye, to likho: "5 alag options do."

**Ek line yaad rakho:** Kam temperature, pakka jawab. Zyada, naye ideas.

Agla episode: **System Prompt**, har AI app ki chhupi instructions.
