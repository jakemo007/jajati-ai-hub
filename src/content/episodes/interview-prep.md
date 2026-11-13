---
number: 7
title: 'Interview Prep'
headline: 'ChatGPT Se Mock Interview Kaise Lein? Interview Ki Taiyari, Hindi Mein'
seoTitle: 'ChatGPT Se Mock Interview Kaise Lein? (Hindi)'
description: 'Stop memorising 50 questions. Make AI your interviewer with a 3-line prompt (role, one at a time, feedback), then say your answers out loud.'
status: published
category: practical-ai
difficulty: Beginner
keyword: PROMPT
campaign: ep07_interview
resource: chatgpt-prompt-cheatsheet
notebook:
  file: 'ep7-interview-prep-explained.ipynb'
  about: 'Ek chhota mock interviewer: ek-ek sawal poochhta hai aur har jawab par 3 rules se feedback deta hai. Strong jawab 1/3 se 3/3.'
relatedPrompts: [interview-practice-prompt, role-context-task-format]
quiz:
  - q: 'Interview ki taiyari ka behtar tareeka?'
    options: ['AI se 50 sawalon ki list lekar ratna', 'AI ko interviewer banakar mock interview dena']
    answer: 1
    explain: 'List padhna aur interview mein bolna alag cheezein hain. Mock interview mein tum bolne ki practice karte ho.'
  - q: 'Prompt mein "Ek-ek karke sawal poochho" kyun likhte hain?'
    options: ['Warna AI aksar saare sawal ek saath de deta hai', 'Isse AI tez chalta hai', 'Isse jawab chhote aate hain']
    answer: 0
    explain: 'Ek-ek sawal aur tumhare jawab ka wait: tab hi asli interview jaisa lagta hai.'
  - q: '"Apne baare mein batao": jawab type karoge ya bologe?'
    options: ['Type karunga', 'Bolunga']
    answer: 1
    explain: 'Asli interview mein bolna padta hai. ChatGPT ya Gemini mein mic dabao aur bolo.'
---

> **Short mein:** AI se sawalon ki list mat maango. **AI ko apna interviewer banao:** wo ek-ek sawal poochhe, tum jawab do, aur har jawab ke baad feedback mile.

## List vs mock interview

Interview se pehle AI se 50 sawalon ki list maangi, raat bhar rati, aur pehle sawal par dimaag khaali. List padhna aur interview mein bolna alag cheezein hain.

## 3 line ka prompt

1. **Role:** "Tum senior interviewer ho. Mera data analyst ka interview hai."
2. **Ek-ek:** "Ek-ek karke sawal poochho, mere jawab ka wait karo." Ye line na ho to AI aksar saare sawal ek saath de deta hai.
3. **Feedback:** "Har jawab ke baad feedback do: kya achha tha, kya sudharna hai."

Data analyst ki jagah apna role likho.

## Notebook mein mock interviewer

- `interviewer()` ek generator hai: `next()` par sirf pehla sawal, phir doosra. Baaki sawal chhupe rehte hain.
- `feedback()` ke 3 rules: koi number ya result? apna example? 25 se 90 words?
- "Main hardworking hoon aur team player hoon.": 0 achha, 3 sudhaaro, sirf 7 words.
- Pehle round mein strong jawab: 1 / 3. Feedback ke baad pehla aur teesra jawab dobara likha (2,000 rows, 3 din, 4 ghante): 3 / 3.

Yahan feedback simple rules se hai. Asli AI isse kahin behtar feedback deta hai, par loop wahi hai: sawal, jawab, feedback, dobara.

## Bolo, type mat karo

Jawab type mat karo. ChatGPT ya Gemini mein mic dabao aur bolo, asli interview jaisa.

**Ek line yaad rakho:** AI se jawab mat rato, AI se interview lo.

Agla episode: **Office Email**.
