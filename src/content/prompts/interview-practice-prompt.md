---
title: 'Interview Practice Prompt: ChatGPT as Your Interviewer'
description: 'ChatGPT asks you 5 interview questions one at a time and gives feedback after every answer: what was good, what to improve.'
category: interview-prep
tools: [chatgpt]
difficulty: Intermediate
prompt: 'Tum ek senior interviewer ho. Mera [role] ka interview hai, [X] saal ka experience hai. Mujhse 5 sawal poochho, ek-ek karke. Har jawab ke baad feedback do: kya achha tha, kya sudharna hai, aur ek better jawab ka example. Agla sawal tab tak mat poochho jab tak main jawab na doon.'
problem: 'You have an interview coming up and nobody to practise with.'
placeholders:
  - token: '[role]'
    meaning: 'The job you are interviewing for.'
  - token: '[X]'
    meaning: 'Your years of experience. Write 0 if you are a fresher.'
exampleInput:
  text: 'Tum ek senior interviewer ho. Mera data analyst ka interview hai, 0 saal ka experience hai. Mujhse 5 sawal poochho, ek-ek karke. Har jawab ke baad feedback do: kya achha tha, kya sudharna hai.'
  note: 'Sample filled-in version. Put in your own role and experience.'
source:
  label: 'PROMPT cheat sheet, prompt 4 (AI Explained Episode 5)'
added: 2026-11-06
featured: true
order: 5
resource: chatgpt-prompt-cheatsheet
relatedEpisodes: [prompt-engineering, interview-prep]
relatedPrompts: [chatgpt-resume-prompt, ask-me-3-questions-first]
---

## Kab use karein

Interview se pehle practice ke liye. Ye ek conversation hai: AI sawal poochhega, tum jawab doge, AI feedback dega.

## Kaise use karein

1. Prompt copy karo, ChatGPT mein paste karo.
2. `[role]` mein job ka naam aur `[X]` mein apna experience likho.
3. Send karo. AI pehla sawal poochhega. Apna jawab type karo, jaise interview mein bolte.
4. Feedback padho, phir agle sawal par jao. 5 sawal ke baad AI se poochh sakte ho: "Mere sabse kamzor jawab kaun se the?"

## Dhyan rahe

- "Ek-ek karke" wala part zaroori hai. Iske bina AI saare sawal ek saath de deta hai.
- AI ka feedback ek practice partner ki tarah lo, final judgement ki tarah nahi.
