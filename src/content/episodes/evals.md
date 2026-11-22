---
number: 18
title: 'Evals'
headline: 'Evals: AI Ka Jawab Sahi Hai, Ye Kaise Jaanchein? (Hindi)'
seoTitle: 'Evals: Naya Prompt Better? 10 Sawaal Pe Score Karo'
description: 'Interview question: how do you know your LLM app works? Write a small test set, score every answer the same way, and run it on every change. Python toy inside.'
status: published
category: rag-llms
difficulty: Intermediate
campaign: ep18_evals
notebook:
  file: 'ep18-evals-explained.ipynb'
  about: 'Ek nakli college help-desk (10 facts) aur uske bot ke do toy prompt. Library ke ek sawaal par naya prompt accha lagta hai, par 10 test sawaal par purana 9/10 aur naya 6/10. Phir grader badlo, ek fix karo, aur ek user ki shikayat ko naya test banao. Aakhir mein apna sawaal jodkar khud chalao.'
relatedPrompts: [say-i-dont-know-prompt, source-for-every-fact-prompt, interview-practice-prompt]
sources:
  - label: 'OpenAI: Evaluation best practices'
    url: 'https://developers.openai.com/api/docs/guides/evaluation-best-practices'
  - label: 'Anthropic: Define success criteria and build evaluations'
    url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests'
  - label: 'Anthropic Engineering: Demystifying evals for AI agents'
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'
  - label: 'Zheng et al. 2023, Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena'
    url: 'https://arxiv.org/abs/2306.05685'
quiz:
  - q: 'Library ke sawaal par naya prompt accha laga. 10 test sawaal par kya hua?'
    options: ['Naya 10/10', 'Purana 9/10, naya 6/10', 'Dono barabar']
    answer: 1
    explain: 'Naya prompt sawaal mein pehla milta word pakadta hai. "exam form" poochha, to exam ki date bol di. Ek sawaal mein ye galti dikhti hi nahi.'
  - q: 'Exact match grader ne naye prompt ko 0/10 kyun diya?'
    options: ['Saare jawab galat the', 'Har jawab "Haan ji!" se shuru hota hai', 'Test sawaal galat the']
    answer: 1
    explain: 'Grader bhi galat ho sakta hai. Exact match ne sahi jawab bhi kaat diye, kyunki unke aage "Haan ji!" tha. Isliye notebook "jawab andar hai?" wala grader use karta hai.'
  - q: 'Ek user ne shikayat ki. Ab kya karoge?'
    options: ['Prompt badlo aur ek jawab padho', 'Shikayat ko naya test bana do', 'Kuch nahi']
    answer: 1
    explain: 'Jo galti ek baar mili, wo test set mein jud jaati hai, taaki dobaara chhup na sake. Hamare toy mein 11 tests par score 10/11 hua. Score gira, aur yahi accha hai.'
---

> **Short mein:** Interview mein poochha: "Tumhe kaise pata tumhara LLM app sahi chalta hai?" **Jawab: evals.** Fixed test sawaal, unke sahi jawab, aur ek grader jo har jawab ko same tareeke se score de. Har badlav par wahi set chalao.

## Vibe check

College project mein tumne prompt badla, ek jawab padha, accha laga, aur maan liya ki naya behtar hai. Ise vibe check kehte hain. OpenAI ka guide is galti ka naam leta hai: *"Vibe-based evals"*, yaani "lag raha hai chal raha hai".

Notebook mein ek nakli college help-desk hai: 10 facts, aur bot ke do toy prompt. Library ka sawaal poochha:

> v1: 9 pm
> v2: Haan ji! 9 pm

Naya (v2) zyaada friendly lagta hai. Par ye ek sawaal hai, test nahi.

## Test set

Ab 10 sawaal likho, har ek ka sahi jawab ke saath. Library, exam, exam form, fees, late fees, result, result recheck, hostel, mess, placement talk. Grader simple hai: sahi jawab reply ke andar hai ya nahi.

> v1 purana: 9/10
> v2 naya  : 6/10

Ulta. Naya prompt sawaal mein pehla milta word pakadta hai:

> exam form ki last date       -> Haan ji! 2 january
> late fees kitni hai          -> Haan ji! 20 december
> result recheck ki last date  -> Haan ji! 5 february
> mess kab tak khula hai       -> Maaf kijiye, pata nahi

"exam form" poochha, to exam ki date bol di. Mess ka fact FAQ mein tha hi nahi, isliye dono bot wahan fail hue.

## Grader bhi galat ho sakta hai

Grader badal kar exact match lagao, yaani reply bilkul sahi jawab jaisa ho:

> exact v1: 9/10
> exact v2: 0/10

Naye ko 0/10, sahi jawab bhi kat gaye, sirf "Haan ji!" ki wajah se. Grader teen tarah ke hote hain:

- **Code:** jaise hamara "jawab andar hai?" check. Sasta aur hamesha same.
- **Insaan:** OpenAI ke guide mein sabse acchi quality, par slow aur mehenga.
- **LLM judge:** sasta aur bada scale. Par pehle insaanon se milao. Zheng et al. 2023 mein strong LLM judges insaanon se 80% se zyaada sahmat hue, utna hi jitna insaan aapas mein. Par unmein position aur verbosity jaise bias bhi mile.

## Har badlav par

Version 3 banaya: friendly start bhi, aur sabse pakka match bhi.

> v3: 9/10
> v3: 10/10

Doosri line tab aayi jab mess wala fact FAQ mein joda. Fail ne bataya ki kya theek karna hai.

Ab ek user ki shikayat aayi: "library sunday ko khuli hai?" Ise naya test bana do:

> 11 tests | v3: 10/11

Score gira, aur yahi accha hai. Ab ye galti dobaara chhup nahi sakti. Anthropic ka engineering blog kehta hai: *"20-50 simple tasks drawn from real failures is a great start."* Bina evals ke debugging ulta chalta hai: shikayat ka intezaar, haath se dohrao, fix karo, aur ummeed karo ki kuch aur nahi toota.

Fair raho: hamare toy bot sirf words milaate hain. Asli bot ek LLM hota hai. Par tareeka wahi hai.

## Interview jawab

Teen lines, apne shabdon mein:

> 1. Eval yaani fixed test sawaal aur unke sahi jawab, plus ek grader jo har jawab ko same tareeke se score de.
> 2. Har prompt ya model badalne par ise chalao, aur score compare karo, ek jawab nahi.
> 3. Chhota shuru karo, asli failures jodte jao, aur LLM judge ko pehle insaanon se milao.

Notebook mein ye jawab English mein bhi hai. Follow-up aaye, to exam form wala example do.

**Ek line yaad rakho:** ek jawab vibe hai, test nahi.

Agla episode: **Function calling**, AI tool kaise chalata hai?
