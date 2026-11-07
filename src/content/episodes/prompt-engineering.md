---
number: 5
title: 'Prompt Engineering'
headline: 'ChatGPT Prompt Kaise Likhe? Prompt Engineering in Hindi (Role, Context, Task, Format)'
seoTitle: 'ChatGPT Prompt Kaise Likhe? Prompt Engineering in Hindi'
description: 'Stop typing "resume bana do". Add 4 things to any prompt (Role, Context, Task, Format) plus 2 bonus tricks. With the free PROMPT sheet.'
status: published
category: prompt-engineering
difficulty: Beginner
published: 2026-11-06
videos:
  youtube: 'https://www.youtube.com/shorts/kHaRG06jrrM'
  instagram: 'https://www.instagram.com/reel/DfaHvKvixjC/'
keyword: PROMPT
campaign: ep05_prompting
resource: chatgpt-prompt-cheatsheet
relatedPrompts: [role-context-task-format, chatgpt-resume-prompt, show-an-example-prompt, step-by-step-prompt]
sources:
  - label: 'OpenAI, Prompt engineering guide'
    url: 'https://developers.openai.com/api/docs/guides/prompt-engineering'
  - label: 'Kojima et al. (2022), "Large Language Models are Zero-Shot Reasoners"'
    url: 'https://arxiv.org/abs/2205.11916'
quiz:
  - q: 'Prompt ki 4 cheezein kaun si hain?'
    options: ['Role, Context, Task, Format', 'Hello, Please, Thanks, Bye', 'Title, Body, Footer, Link']
    answer: 0
    explain: 'Role: AI kaun hai. Context: tumhari situation. Task: exactly kya chahiye. Format: jawab kis shape mein.'
  - q: '"Har point 10 words se kam" prompt ka kaun sa hissa hai?'
    options: ['Role', 'Context', 'Format']
    answer: 2
    explain: 'Format batata hai ki jawab kis shape mein chahiye: bullets, table, ya kitne words.'
  - q: 'AI ko apna pasandida example dikhane se kya hota hai?'
    options: ['AI confuse ho jaata hai', 'AI usi style ko copy karta hai']
    answer: 1
    explain: 'Ise few-shot prompting kehte hain. Example se AI ko style ka pattern mil jaata hai.'
---

> **Short mein:** ChatGPT mein sirf "resume bana do" likhoge to jawab generic aayega. **4 cheezein jodo: Role, Context, Task, Format.** Wahi ChatGPT, aur jawab tumhare liye bana.

## Problem: adhura prompt

"Resume bana do" mein AI ko nahi pata ki tum kaun ho, kya jaante ho, kaun si job chahiye, aur resume kaisa dikhna chahiye. To wo guess karta hai, aur guess hamesha generic hota hai. Isse theek karne ki skill ko **prompt engineering** kehte hain.

## 4 cheezein, ek-ek karke

### 1. Role
AI ko batao wo kaun hai: **"Tum 10 saal ke HR expert ho."** AI usi nazar se likhega. (Role tone aur focus badalta hai. Ye guarantee nahi ki AI sach mein expert ban jaayega.)

### 2. Context
Apni situation batao: **"Main fresher hoon, Python aur SQL aata hai, data analyst job chahiye."**

### 3. Task
Saaf-saaf batao kya chahiye: **"Mere projects ke basis par 1 page ka resume banao, projects sabse upar."**

### 4. Format
Jawab ki shape batao: **"Bullet points mein, har point 10 words se kam."**

Charon ko jodo, to ye pura prompt banta hai (PROMPT sheet ka prompt 1):

> Tum 10 saal ke HR expert ho. Main fresher hoon, Python aur SQL aata hai, data analyst job chahiye. Mere projects ke basis par 1 page ka resume banao, projects sabse upar. Bullet points mein, har point 10 words se kam. Mere projects: [yahan likho]

Wahi ChatGPT, aur jawab bilkul alag: generic nahi, tumhare liye bana.

## Bonus 1: example dikhao

Prompt ke end mein likho **"Is style mein likho:"** aur apna pasandida example paste karo. AI usi style ko copy karta hai. Isse few-shot prompting kehte hain, aur OpenAI ki prompt engineering guide bhi examples dene ki salah deti hai.

## Bonus 2: step by step socho

Mushkil math ya logic sawal par end mein likho **"Step by step socho."** 2022 ki ek research mein English line "Let's think step by step" jodne se ek math test par score 17.7% se 78.7% ho gaya tha. Ye ek purane model par tha. Aaj ke kai naye models khud hi step by step sochte hain, par steps dekhne se tum jawab check kar sakte ho.

## 5 prompts, copy-paste ready

PROMPT cheat sheet mein isi formula par bane 5 prompts hain: resume, office leave email, padhai (class 12), interview practice, aur small business ke festival captions. Saare neeche wale link par hain, Copy button ke saath.

**Ek line yaad rakho:** AI bura nahi, adhura prompt bura hai. Role, Context, Task, Format.

Agla episode: **AI Agents**.
