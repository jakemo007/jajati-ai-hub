---
title: 'Role, Context, Task, Format: the 4-Part Prompt Template'
description: 'The fill-in template behind every prompt on the PROMPT sheet. Tell AI its role, your situation, the exact task and the shape of the answer.'
category: prompt-engineering
tools: [chatgpt, any-chat-ai]
difficulty: Beginner
prompt: 'Tum [ROLE] ho. [CONTEXT: main kaun hoon, situation kya hai]. [TASK: exactly kya chahiye]. [FORMAT: bullets, table, ya kitne words]. Jo jaankari maine nahi di, uska andaaza mat lagao. Pehle mujhse poochho.'
problem: 'A one-line prompt like "resume bana do" gets a generic answer, because AI has to guess everything you did not say.'
placeholders:
  - token: '[ROLE]'
    meaning: 'Who AI should act as: an HR expert, a patient teacher, a senior interviewer.'
  - token: '[CONTEXT: ...]'
    meaning: 'Who you are and what your situation is. The details AI cannot know on its own.'
  - token: '[TASK: ...]'
    meaning: 'Exactly what you want made: a 1-page resume, a 5-line email, 3 captions.'
  - token: '[FORMAT: ...]'
    meaning: 'The shape of the answer: bullet points, a table, a word limit.'
exampleInput:
  text: 'Tum 10 saal ke HR expert ho. Main fresher hoon, Python aur SQL aata hai, data analyst job chahiye. Mere projects ke basis par 1 page ka resume banao, projects sabse upar. Bullet points mein, har point 10 words se kam. Mere projects: [yahan likho]'
  note: 'This is prompt 1 on the PROMPT sheet: the same template, filled in for a resume.'
source:
  label: 'PROMPT cheat sheet, template (AI Explained Episode 5)'
added: 2026-11-06
featured: true
order: 1
resource: chatgpt-prompt-cheatsheet
relatedEpisodes: [prompt-engineering]
relatedPrompts: [chatgpt-resume-prompt, show-an-example-prompt, step-by-step-prompt]
video:
  youtube: 'https://www.youtube.com/shorts/kHaRG06jrrM'
  instagram: 'https://www.instagram.com/reel/DfaHvKvixjC/'
---

## Kab use karein

Jab bhi AI se kuch banwana ho: resume, email, notes, captions, plan. Agar jawab generic lag raha hai, to aksar prompt mein in 4 mein se kuch missing hota hai.

## Kaise use karein

1. **Role:** AI ko batao wo kaun hai. "Tum ek patient teacher ho."
2. **Context:** apni situation batao. Tum kaun ho, kya pata hai, kya chahiye.
3. **Task:** saaf likho exactly kya banana hai.
4. **Format:** batao jawab kis shape mein chahiye: bullets, table, ya kitne words.

Charon ko ek message mein likho aur send karo.

## Ye kaam kyun karta hai

OpenAI ki prompt engineering guide bhi yahi cheezein suggest karti hai: model ko ek identity do, saaf instructions do, context do, examples do, aur output ka format batao. Role se jawab ka tone aur focus badalta hai. Ye guarantee nahi hai ki AI sach mein expert ban jaayega, isliye zaroori baatein hamesha check karo.
