---
number: 15
title: 'Resume Bullets from a Project'
headline: 'Project Se Resume Bullets: AI Number Na Bana De (Hindi)'
seoTitle: 'Resume Bullet Mein AI Ka 40%? Facts Do, Number Khud Naapo'
description: 'AI wrote 40% into your project bullet and you never measured it. Give AI only your facts, earn the number with a test, check bullets in Python.'
status: published
category: prompt-engineering
difficulty: Beginner
campaign: ep15_resume_bullets
notebook:
  file: 'ep15-project-resume-bullets-explained.ipynb'
  about: 'Ek chhota bullet checker: har project bullet mein verb, number aur tareeka dekho (3 mein se kitne), aur aisa number pakdo jo tumhare facts mein hai hi nahi (AI wale bullet ka 40). Phir 20 sawalon ke test se apna number naapo (18 sahi, 90%).'
relatedPrompts: [chatgpt-resume-prompt, say-i-dont-know-prompt, ask-me-3-questions-first]
sources:
  - label: 'Laszlo Bock, the X-Y-Z resume formula (his personal advice; text via Auburn University)'
    url: 'https://harbert.auburn.edu/blogs/school-of-accountancy/better-resume-formula.html'
  - label: 'Anthropic, Reduce hallucinations'
    url: 'https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations'
quiz:
  - q: 'AI ne tumhare project bullet mein "improved accuracy by 40%" likh diya. Tumne 40 kabhi naapa nahi. Kya karoge?'
    options: ['Rehne do, number accha lagta hai', 'Number hatao, ya apne test se asli number lao', 'Number aur bada kar do']
    answer: 1
    explain: 'Interview mein sabse pehle wahi number poochha jata hai: kaise naapa? Jo number tum samjha nahi sakte, wo tumhare khilaaf jaata hai.'
  - q: 'X-Y-Z formula mein Y kya hai?'
    options: ['Kya kiya', 'Kis number se naapa', 'Kaise kiya']
    answer: 1
    explain: '"Accomplished [X] as measured by [Y], by doing [Z]": X kya haasil kiya, Y kis number se naapa, Z kaise kiya. Ye Laszlo Bock ki personal advice hai, Google ka hiring rule nahi.'
  - q: 'Notebook ke test mein 20 sawal the. Kitne sahi aaye?'
    options: ['18', '20', '40']
    answer: 0
    explain: '18 / 20 = 90%. Ye toy data hai: apne project mein apna test banao, aur ginti tumhari apni ho.'
---

> **Short mein:** Interviewer bola: "ye 40% kahan se aaya?" Resume mein likha tha, par wo number AI ne banaya tha. **AI ko sirf apne facts do, aur bolo ki koi number mat banana.** Number tum apne test se lao.

## Kamzor bullet

Ek aam project bullet: "Worked on a chatbot using Python." Isme kaam ka naam hai, nateeja nahi. Padhne wale ko pata nahi chalta ki kitna accha chala, aur kaise naapa.

Notebook mein humne ek chhota checker banaya. Wo teen sawal poochta hai: action wala verb hai? Koi number hai? Kaise kiya, ye likha hai? Is bullet ko 3 mein se sirf 1 mila: verb kamzor ("worked on"), number koi nahi, sirf tareeka ("using Python").

## X-Y-Z formula

Laszlo Bock, Google ke poorv HR head, ne apni personal advice mein ek formula bataya: **"Accomplished [X] as measured by [Y], by doing [Z]."** Yaani kya haasil kiya, kis number se naapa, aur kaise kiya. Ye unki salah hai, Google ka hiring rule nahi.

Hamare project mein: X, sawalon ke sahi jawab. Y, 20 mein se 18. Z, sabse sahi chunk dhoondhkar. Notebook ka teesra bullet yahi hai, aur checker ne use 3 mein se 3 diya:

| Bullet | Checker |
| --- | --- |
| Worked on a chatbot using Python. | 1 / 3 |
| Built an AI chatbot that improved accuracy by 40%. | 2 / 3, invented number: 40 |
| Built a Python FAQ bot that answered 18 of 20 test questions right, by retrieving the best chunk. | 3 / 3 |

## AI ka number jaal

AI se bullet maangoge, to wo kabhi-kabhi ek number jod dega jo tumne kabhi diya hi nahi. Anthropic ke docs bhi maante hain ki model kabhi-kabhi factually galat text likh sakta hai. Isse hallucination kehte hain.

Hamare facts mein 20 aur 18 hain, 40 kahin nahi. Notebook ka `invented()` har wo number pakadta hai jo facts mein nahi hai. AI wale bullet ko 3 mein se 2 mile, par ek number jhootha hai. Interview mein yahi number sabse pehle poochha jayega: kaise naapa?

## Facts pehle

Fix: AI ko pehle facts do. Kya banaya, kis tool se, aur test mein kya nateeja aaya. Anthropic ke docs ka pehla tip: model ko "I don't know" kehne ki ijaazat do. Notebook ka prompt, jo tum copy kar sakte ho:

> Write 3 resume bullets using ONLY these facts: {facts}. Do not use any number that is not in the facts. If something is missing, ask me.

Facts mein sirf wahi likho, jo sach mein hua. Jhoothe facts doge, to sabse accha prompt bhi jhootha bullet dega.

## Test se number

Number aayega kahan se? Episode 14 mein humne 5 sawalon ka test banaya tha, yahan bhi wahi tareeka. 20 sawal likho jinke jawab tumhe pata hain, bot chalao, aur gino kitne sahi aaye. Notebook mein 18 sahi nikle: 18 / 20 = 90%. Ye number tumne khud naapa, isliye tumhara hai.

Ye toy data hai. Asli project mein apna test banao, aur ginti tumhari apni ho.

## Interview mein

Interviewer poochhe: "ye 18 kahan se?" Tum bol sakte ho: "20 test sawal the, 18 sahi aaye." Wo poochhe: "test mein kya tha?" Tab tum sawalon ki list dikhao. Yahi bullet ko sachcha banata hai.

Notebook ki last cell mein apne facts aur apna bullet daalo. Invented number hoga, to checker bata dega.

**Ek line yaad rakho:** shabd AI ke, number tumhare.

Agla episode: **LLM Fundamentals**, jo interviewer poochte hain.
