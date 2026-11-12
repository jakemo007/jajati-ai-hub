---
title: '"Step by Step Socho": the One Line for Hard Math and Logic Questions'
seoTitle: 'Step by Step Prompt for Hard Math and Logic Questions'
description: 'Bonus trick 2 from the PROMPT sheet. On a hard math or logic question, end your prompt with "Step by step socho."'
category: prompt-engineering
tools: [chatgpt, any-chat-ai]
difficulty: Beginner
prompt: '[sawal yahan likho] Step by step socho. Pehle har step alag line mein likho, phir final answer alag se do. Har step ke baad check karo ki wo sahi hai ya nahi.'
placeholders:
  - token: '[sawal yahan likho]'
    meaning: 'Your maths or logic question, word for word.'
problem: 'AI jumps straight to an answer on a multi-step math or logic question, and the answer is wrong.'
source:
  label: 'PROMPT cheat sheet, bonus trick 2 (AI Explained Episode 5)'
added: 2026-11-06
order: 8
resource: chatgpt-prompt-cheatsheet
relatedEpisodes: [prompt-engineering]
relatedPrompts: [role-context-task-format, explain-in-3-steps]
video:
  youtube: 'https://www.youtube.com/shorts/kHaRG06jrrM'
  instagram: 'https://www.instagram.com/reel/DfaHvKvixjC/'
---

## Kab use karein

Math ke word problems, logic puzzles, ya koi bhi sawal jisme kai steps hain.

## Kaise use karein

Apna sawal likho, aur end mein ye line jodo. AI pehle steps likhega, phir answer. Har step padho: galti kahan hui, wo bhi dikh jaata hai.

## Research kya kehti hai

2022 ki ek research (Kojima et al., "Large Language Models are Zero-Shot Reasoners") mein English line "Let's think step by step" jodne se ek math test (MultiArith) par score 17.7% se 78.7% ho gaya. Ye ek purane model par tha (InstructGPT, text-davinci-002). Aaj ke kai naye "reasoning" models khud hi step by step sochte hain, isliye fark itna bada nahi dikhega. Phir bhi steps dekhne se tum answer check kar sakte ho.

Source: [arXiv 2205.11916](https://arxiv.org/abs/2205.11916)
