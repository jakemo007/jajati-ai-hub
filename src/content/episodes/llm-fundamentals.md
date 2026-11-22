---
number: 16
title: 'LLM Fundamentals'
headline: 'LLM Fundamentals: ChatGPT Ka Jawab Kahan Se Aata Hai? (Hindi)'
seoTitle: 'ChatGPT Ka Jawab Kahan Se Aata Hai? LLM Ek Line Mein'
description: 'Interview question: how does ChatGPT answer? An LLM predicts the next token. Build a toy model in Python and see why likely is not the same as true.'
status: published
category: ai-fundamentals
difficulty: Beginner
campaign: ep16_llm_fundamentals
notebook:
  file: 'ep16-llm-fundamentals-explained.ipynb'
  about: 'Ek chhota toy model: 9 sentences ki ginti se seekho ki kaun-sa word kiske baad aata hai ("your" ke baad time 50%, help 33%, reply 17%), ek-ek word jodkar sentence banao, aur dekho ki wo "the capital of australia is sydney" kyun likhta hai. Phir data badlo aur jawab sahi karo.'
relatedPrompts: [say-i-dont-know-prompt, source-for-every-fact-prompt, interview-practice-prompt]
sources:
  - label: 'Google, Machine Learning Crash Course: Introduction to Large Language Models'
    url: 'https://developers.google.com/machine-learning/resources/intro-llms'
  - label: 'Google, Machine Learning Crash Course: LLMs, what is a large language model?'
    url: 'https://developers.google.com/machine-learning/crash-course/llm/transformers'
  - label: 'Google, Machine Learning Crash Course: LLMs, fine-tuning'
    url: 'https://developers.google.com/machine-learning/crash-course/llm/tuning'
  - label: 'Claude Help Center: knowledge cutoff of each model'
    url: 'https://support.claude.com/en/articles/8114494'
  - label: 'Ouyang et al. 2022, Training language models to follow instructions with human feedback (InstructGPT)'
    url: 'https://arxiv.org/abs/2203.02155'
quiz:
  - q: 'Interviewer poochhe: ChatGPT jawab kaise banata hai? Ek line mein kya bologe?'
    options: ['Wo internet se search karke jawab copy karta hai', 'Wo agla token predict karta hai, ek-ek karke', 'Wo database se ready jawab nikaalta hai']
    answer: 1
    explain: 'Search tool mile tab bhi, jawab ka har word aise hi banta hai: model agla token predict karta hai, use jodta hai, phir agla predict karta hai.'
  - q: 'Hamare toy data mein "is" ke baad Sydney 2 baar aaya, Canberra 1 baar. Toy ne Australia ki capital kya likhi?'
    options: ['Canberra', 'Sydney', 'Kuch nahi']
    answer: 1
    explain: 'Sydney 67%, Canberra 33%. Model sabse likely word chunta hai, sabse sachcha nahi. Asli LLM poora sentence dekhta hai, par mushkil sawaalon par yahi galti hoti hai.'
  - q: 'Toy ke data mein "today" tha hi nahi. predict("today") ne kya diya?'
    options: ['{} (khaali)', 'time', 'canberra']
    answer: 0
    explain: 'Jo data mein nahi, wo model ko pata nahi. Asli models ki bhi knowledge cutoff hoti hai: uske baad ki baatein unhe shaayad pata na hon.'
---

> **Short mein:** Interview mein poochha: "ChatGPT ka jawab aata kahan se hai?" **Jawab: LLM agla token predict karta hai, ek-ek karke.** Wo likely word chunta hai, zaroori nahi ki sach ho.

## Agla token

Pehle ek game. Tum LLM bano: "Thank you for your..." ke baad agla word kya hoga? Shaayad tumne socha: time. Yahi LLM karta hai: pichhle words dekhkar agla word guess.

Google ka Machine Learning Crash Course bhi yahi kehta hai: language model agle token ki probability nikaalta hai, phone ke autocomplete jaise. Token yaani word ka tukda (Episode 1). Aasaani ke liye hum yahan har word ko ek token maanenge.

## Training = ginti

Notebook mein humne 9 chhote sentences likhe, kul 50 words. Ye nakli training data hai. Hamara toy ginta hai ki kaun-sa word kiske baad aaya. "your" ke baad:

| Agla word | Kitni baar | Prediction |
| --- | --- | --- |
| time | 3 | 50% |
| help | 2 | 33% |
| reply | 1 | 17% |

Asli LLM ginti nahi karta. Wo bahut saare text par neural network ke parameters seekhta hai. Par kaam wahi hai: agla token.

## Ek-ek token

Poora jawab kaise banta hai? Model ek word chunta hai, use jodta hai, phir agla predict karta hai. Notebook mein "thank" se shuru kiya: you, for, your, time. 4 baar predict kiya, sentence ban gaya.

Har baar sabse likely word chuno, to jawab same aata hai. Thoda random chuno, to alag. Episode 11 ka temperature yahi hai.

## Sach ya likely?

Dusra game. Hamare data mein likha hai: "the capital of australia is canberra". Par do aur sentences mein "is" ke baad sydney aata hai. Model ne likha: **"the capital of australia is sydney"**. Galat.

"is" ke baad Sydney 67%, Canberra 33%. Model ne sach nahi chuna, sabse likely word chuna. Google ka course bhi kehta hai: LLMs hallucinate, yaani unke predictions mein aksar galtiyan hoti hain.

Fair raho: hamara toy sirf pichhla word dekhta hai. Asli LLM poora sentence dekhta hai, to yahan shaayad Canberra bole. Par mushkil sawaalon par yahi galti hoti hai.

## Data hi sab

Notebook ki last cell mein Canberra wala sentence 2 baar aur joda. Ab Canberra 60%, Sydney 40%, aur jawab sahi. Model wahi bolta hai jo data mein zyaada tha. Isiliye LLMs apne training data ka bias bhi uthaate hain.

Jo word data mein tha hi nahi, jaise "today", uske baad toy ke paas kuch nahi: khaali. Asli models ki bhi knowledge cutoff hoti hai.

Chat kaise bana? Pehle model ne agla token seekha. Phir examples aur insaano ki ranking se instructions maanna seekha (InstructGPT paper). Ise fine-tuning kehte hain.

## Interview jawab

Teen lines, apne shabdon mein:

> 1. LLM bahut saare text par agla token predict karna seekhta hai.
> 2. Jawab wo ek-ek token jodkar banata hai.
> 3. Isliye fluent hai, par hamesha sahi nahi.

Notebook mein ye jawab English mein bhi hai. Follow-up aaye ki galat kyun hota hai, to Sydney wala example do. Example, definition se zyaada yaad rehta hai.

**Ek line yaad rakho:** ChatGPT ka jawab likely hota hai, zaroori nahi sachcha.

Agla episode: **Fine-tuning ya RAG**, kab kaun-sa?
