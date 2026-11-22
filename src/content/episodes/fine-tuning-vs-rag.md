---
number: 17
title: 'Fine-tuning ya RAG'
headline: 'Fine-tuning ya RAG: Kab Kaun-sa? (Hindi)'
seoTitle: 'Fine-tuning ya RAG? Interview Jawab Ek Line Mein'
description: 'Interview question: fine-tuning or RAG? Facts go to RAG, a fixed format or tone to fine-tuning. Change a date in Python and see which toy goes stale.'
status: published
category: rag-llms
difficulty: Intermediate
campaign: ep17_fine_tuning_rag
notebook:
  file: 'ep17-fine-tuning-rag-explained.ipynb'
  about: 'Do chhote toy: RAG notice dhoondhkar padhta hai, fine-tune toy ek example se seekhta hai. Notice ki date 10 se 15 December badlo aur dekho kaun purani date bolta hai, phir retrain karo. Aakhir mein ek checker jo 6 nakli cases ko RAG, fine-tuning, dono ya sirf prompt mein baanta hai.'
relatedPrompts: [answer-only-from-document-prompt, source-for-every-fact-prompt, show-an-example-prompt]
sources:
  - label: 'OpenAI: Optimizing LLM accuracy (context optimization vs LLM optimization)'
    url: 'https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy'
  - label: 'Google, Machine Learning Crash Course: LLMs, fine-tuning'
    url: 'https://developers.google.com/machine-learning/crash-course/llm/tuning'
  - label: 'Ovadia et al. 2024, Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs'
    url: 'https://arxiv.org/abs/2312.05934'
  - label: 'Lewis et al. 2020, Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks'
    url: 'https://arxiv.org/abs/2005.11401'
quiz:
  - q: 'Notice ki date 10 se 15 December badli. Hamare do toy mein se kaun purani date bolega?'
    options: ['RAG toy', 'Fine-tuned toy', 'Dono']
    answer: 1
    explain: 'RAG har sawaal par notice dobaara padhta hai, isliye 15 bola, source ke saath. Fine-tuned toy ne 10 andar seekha tha. Dobaara train karne par hi wo 15 bola.'
  - q: 'Har support reply ek fixed format aur company ke tone mein chahiye, aur prompt se kaam nahi chal raha. Kya try karoge?'
    options: ['RAG', 'Fine-tuning', 'Kuch nahi, aise hi chalne do']
    answer: 1
    explain: 'OpenAI ka guide: format, tone ya reasoning consistent na ho, tab model ko optimize karo (fine-tuning). Naye ya apne facts chahiye, tab context (RAG).'
  - q: 'In dono se pehle kya try karna chahiye?'
    options: ['Fine-tuning', 'RAG', 'Ek accha prompt']
    answer: 2
    explain: 'OpenAI aur Google dono kehte hain: shuruaat prompt engineering se. Prompt model ke parameters nahi badalta, to wo sasta aur tez hai.'
---

> **Short mein:** Interview mein poochha: "Fine-tuning ya RAG, kab kaun-sa?" **Jawab: facts ke liye RAG, aadat ke liye fine-tuning.** Aur dono se pehle ek accha prompt.

## Do raaste

Exam se pehle tumne notes ki PDF ChatGPT ko di. Jawab sahi aaye. Par kya usne kuch seekha? Nahi, sirf padha.

Model ko nayi baat batane ke do raaste hain:

- **RAG:** sawaal aane par sahi document dhoondho, aur prompt mein de do. Model ke andar kuch nahi badalta. Episode 4 aur Episode 14 mein yahi dekha tha: pehle search, phir jawab.
- **Fine-tuning:** model ko task ke examples par aur train karo. Is baar uske parameters badalte hain.

Exam se samjho. RAG open-book exam hai: kitaab saamne, jawab usi se. Fine-tuning practice hai: baar-baar likho, aadat ban jaati hai.

## Date badli

Notebook mein 3 nakli college notices hain. Pehle mein likha hai: exam form ki last date, 10 December. Dono toy se poochha:

> RAG: exam form ki last date 10 december hai [source: notice-1]
> FT : 10 december

Ab notice badla: date ab 15 December. Phir se poochha:

> RAG: exam form ki last date 15 december hai [source: notice-1]
> FT : 10 december <- purani date

Fine-tuning ne jo seekha, wo model ke andar jam gaya. Fact badla, to use dobaara train karna pada. Tab jaakar 15. RAG mein bas notice badalna tha.

Fair raho: hamara fine-tune toy sirf ek example yaad rakhta hai. Asli fine-tuning model ke parameters badalti hai. Par baat wahi hai: jo andar seekha gaya, wo fact badalne par apne aap nahi badalta.

## Source kahan?

RAG ka doosra faayda: source. Jawab batata hai ki kis document se aaya, to tum khud check kar sakte ho.

RAG wale pehle paper (Lewis et al. 2020) ne bhi yahi likha: model ke parameters mein rakha knowledge update karna mushkil hai, aur uska source dikhana bhi. Ek aur paper (Ovadia et al. 2024) ne dono ko compare kiya: naye facts sikhane mein RAG, unsupervised fine-tuning se lagaataar behtar raha.

## Fine-tuning kab?

To fine-tuning bekaar hai? Nahi. OpenAI ka accuracy guide do alag dikkatein batata hai:

- Model ke paas sahi jaankari nahi, purani hai, ya tumhari private hai: **context** do (RAG).
- Model ka format, tone ya reasoning consistent nahi: **model** badlo (fine-tuning).

Matlab fine-tuning facts ke liye nahi, behaviour ke liye hai. Jaise har jawab ek fixed format mein, ya company ke tone mein.

Par pehle prompt try karo. Wahi guide kehta hai: shuruaat prompt engineering se. Aur Google ka course: prompt engineering model ke parameters nahi badalta. Dono saath bhi chalte hain: facts RAG se, format fine-tuning se. Guide inhein additive kehta hai, ek ke upar ek.

## Kaun-sa chuno

Notebook mein ek chhota checker hai. Teen sawaal:

1. Prompt se kaam chal raha hai?
2. Naye ya apne facts chahiye?
3. Fixed format ya tone chahiye?

Humne 6 nakli cases daale:

| Case | Checker |
| --- | --- |
| college notices ke sawal | RAG |
| har reply company tone mein | FINE-TUNE |
| team docs + team format | RAG + FINE-TUNE |
| ek baar ka email | PROMPT |
| HR policy ke sawal | RAG |
| ticket ko fixed label do | FINE-TUNE |

6 mein se: RAG 2, fine-tuning 2, dono 1, aur prompt 1.

## Interview jawab

Teen lines, apne shabdon mein:

> 1. RAG sawaal ke waqt model ko sahi documents deta hai, model nahi badalta.
> 2. Fine-tuning model ko examples par train karta hai, format aur tone same rakhne ke liye.
> 3. Facts badalte hain ya source chahiye, to RAG. Fixed behaviour chahiye, to fine-tuning. Aur pehle prompt try karo.

Notebook mein ye jawab English mein bhi hai. Follow-up aaye, to date wala example do. Example, definition se zyaada yaad rehta hai.

**Ek line yaad rakho:** RAG jaankari deta hai, fine-tuning aadat.

Agla episode: **Evals**, AI ka jawab sahi hai, ye kaise jaanchein?
