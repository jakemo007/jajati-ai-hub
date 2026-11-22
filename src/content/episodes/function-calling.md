---
number: 19
title: 'Function calling'
headline: 'Function Calling: AI Tool Kaise Chalata Hai? (Hindi)'
seoTitle: 'Function Calling: AI Ne 31°C Bataya, Naapa Kisne?'
description: 'Interview question: how does an LLM call a tool or an API? The model writes a structured call, your code checks and runs it, and sends the result back.'
status: published
category: rag-llms
difficulty: Intermediate
campaign: ep19_function_calling
notebook:
  file: 'ep19-function-calling-explained.ipynb'
  about: 'Ek toy model aur do tools (get_weather, book_slot). Model sirf call likhta hai, aur LOG dikhata hai ki kuch nahi chala. Phir tumhara code call check karke chalata hai, result wapas bhejta hai, aur "kal" jaisa galat argument rok deta hai. Aakhir mein apna tool jodkar khud chalao.'
relatedPrompts: [interview-practice-prompt, ask-me-3-questions-first, say-i-dont-know-prompt]
sources:
  - label: 'OpenAI: Function calling'
    url: 'https://developers.openai.com/api/docs/guides/function-calling'
  - label: 'Anthropic: How tool use works'
    url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works'
  - label: 'Google: Function calling with the Gemini API'
    url: 'https://ai.google.dev/gemini-api/docs/function-calling'
quiz:
  - q: 'Model ne likha: get_weather, city pune. Ab tak kya chala?'
    options: ['get_weather chal gaya', 'Kuch nahi', 'Weather API ne jawab de diya']
    answer: 1
    explain: 'Model sirf ek structured call likhta hai. Notebook ka LOG khaali hai: chala: []. Function tab chalta hai jab tumhara code us call ko padhkar chalata hai.'
  - q: 'Model tool kaise chunta hai?'
    options: ['Tumhara code padhkar', 'Tool ke name aur description se', 'Random']
    answer: 1
    explain: 'Model tumhara code kabhi nahi dekhta, sirf schema (name, description, parameters) aur result. Description "data laata hai" kiya, to toy ne koi tool nahi chuna.'
  - q: 'Model ne book_slot ke liye day: "kal" likha. Tumhara code kya kare?'
    options: ['Seedha chala de', 'Check kare, aur list mein nahi to function na chalaye', 'Model ko band kar de']
    answer: 1
    explain: 'Action se pehle aakhri faisla tumhare code ka hai. Notebook mein "kal" monday-friday list mein nahi tha, to function chala hi nahi, aur model ne poocha: kaunsa day?'
---

> **Short mein:** Interview mein poochha: "LLM tool ya API kaise chalata hai?" **Jawab: wo chalata hi nahi.** Model ek structured call likhta hai (kaun-sa function, kaun-se arguments). Tumhara code use check karke chalata hai, result wapas bhejta hai, aur phir model final jawab likhta hai.

## Bina tool

AI ne tumhe Pune ka 31°C bataya, aur galti nahi thi. Par model ke paas sirf training mein padha text hai. Abhi ka weather usmein nahi hai. Notebook ke toy model se bina tools ke poochha:

> Mere paas live data nahi hai.

Google ka guide function calling ke teen kaam batata hai: bahar se jaankari laana (augment knowledge), calculator jaise tools (extend capabilities), aur actions, jaise appointment book karna (take actions).

## Tool ka menu

Model ko ek menu do. Hamare menu mein do tools hain:

> 2 tools: ['get_weather', 'book_slot']

Har tool ke teen hisse: **name**, **description**, aur **parameters**. Parameters ek JSON schema hai: kaun-se arguments, kis type ke. `book_slot` ka `day` sirf monday se friday ho sakta hai.

Model tumhara code nahi dekhta. Anthropic ka guide kehta hai: *"Claude never receives your implementation; it only receives the schema you provided and the result you returned."*

## Kya chala?

Model ne menu padha aur likha:

> {'name': 'get_weather', 'args': {'city': 'pune'}}
> chala: []

Log khaali hai. Koi function nahi chala. Model ne bas ek structured message likha. Google ka guide saaf kehta hai: *"The model doesn't execute the function itself."* Anthropic: *"The model can't run your code, so every tool call is a round trip."*

## Tumhara code

Ab tumhara code call padhta hai, arguments check karta hai, aur function chalata hai:

> {'city': 'pune', 'temp_c': 31}
> chala: ['get_weather']

Result model ko doosri request mein wapas jaata hai, aur tab model likhta hai:

> Pune mein abhi 31°C hai

OpenAI ka guide isse paanch steps mein likhta hai: tools ke saath request, model se tool call, tumhara code chalta hai, output ke saath doosri request, aur final jawab. Ek jawab mein zero, ek, ya kai calls ho sakti hain.

## Description aur check

Model tool description se chunta hai. Wahi function, par description likha "data laata hai":

> Mere paas live data nahi hai.

Toy ne koi tool nahi chuna. OpenAI ka "intern test": kya ek intern sirf tumhare diye text se function sahi chala paayega? Nahi, to description sudhaaro.

Ab slot book karo:

> {'day': 'friday'} -> Slot book: friday, 4 pm
> {'day': 'kal'} -> Pehle ye batao: monday-friday, kaunsa day?
> chala: ['get_weather', 'book_slot']

"kal" list mein nahi tha, to hamare code ne function chalaya hi nahi. Isliye enums rakho, strict mode arguments ko schema se baandhta hai, aur action se pehle aakhri faisla tumhare code ka.

Weather data, slot aur toy model humne teaching ke liye banaye hain. Asli app mein model ek LLM hota hai, par tareeka wahi hai.

## Interview jawab

Teen lines, apne shabdon mein:

> 1. Model ko tools ka menu do: name, description, aur arguments ka JSON schema.
> 2. Model kuch nahi chalata. Wo ek structured call likhta hai: kaun-sa function, kaun-se arguments.
> 3. Tumhara code arguments check karke function chalata hai, result wapas bhejta hai, aur model final jawab likhta hai.

Notebook mein ye jawab English mein bhi hai. Follow-up aaye, to "kal" wala example do.

**Ek line yaad rakho:** 31°C model ne nahi, tumhare code ne laaya.

Agla episode: **MCP**, AI ko tools se jodne ka ek standard.
