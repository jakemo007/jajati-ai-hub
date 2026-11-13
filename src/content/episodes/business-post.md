---
number: 10
title: 'Business Post'
headline: 'ChatGPT Se Business Post Apni Aawaz Mein Kaise Likhwayein? (Hindi)'
seoTitle: 'ChatGPT Se Business Post Kaise Likhwayein? (Hindi)'
description: 'AI posts sound like a big company ad. Give AI your business, one of your old posts as an example and a format, then pick from 3 options.'
status: published
category: practical-ai
difficulty: Beginner
keyword: PROMPT
campaign: ep10_business
resource: chatgpt-prompt-cheatsheet
notebook:
  file: 'ep10-business-post-explained.ipynb'
  about: 'Python se post ki aawaz naapo (emoji, "!", numbers, company wale shabd), 3 hisson wala prompt banao, aur 3 options mein se sabse achha chuno.'
relatedPrompts: [festival-offer-captions-prompt, show-an-example-prompt]
sources:
  - label: 'OpenAI, Prompt engineering guide'
    url: 'https://developers.openai.com/api/docs/guides/prompt-engineering'
quiz:
  - q: 'AI ka post kisi company ka ad jaisa kyun lagta hai?'
    options: ['AI ne tumhari aawaz kabhi suni hi nahi', 'AI ko chhote business pasand nahi']
    answer: 0
    explain: 'Bina example ke AI generic marketing shabd use karta hai: unlock, premium, exclusive.'
  - q: 'Business post wale prompt ke 3 hisse?'
    options: ['Business, example, format', 'Hello, offer, bye', 'Logo, price, hashtag']
    answer: 0
    explain: 'Business: kya, kisko, offer. Example: apni purani post, "isi style mein likho". Format: 3 options, 2 lines, call to action.'
  - q: 'AI se 3 options kyun maango, ek kyun nahi?'
    options: ['Ek mile to wahi rakhna padta, 3 mein se tum chunte ho', 'AI 3 se kam likh hi nahi sakta']
    answer: 0
    explain: 'Sabse achha rakho, baaki se ideas lo. Aur post karne se pehle offer, price aur timing khud check karo.'
---

> **Short mein:** AI se seedha post likhwaoge to kisi badi company ka ad lagega. **Pehle AI ko apni aawaz sunao** (apni ek purani post dikhao), phir likhwao.

## Company ka ad?

AI se bakery ka post maanga, aur aaya: "Unlock the magic of premium taste!" Lagta hai kisi badi company ka ad hai. AI ne tumhari aawaz kabhi suni hi nahi.

## Aawaz ko naapo

Notebook ka `style()` function 4 cheezein ginta hai: emoji, "!", asli numbers, aur company wale shabd (unlock, premium, exclusive...). Asha Home Bakery ek nakli dukaan hai, aur saare posts haath se likhe examples hain.

- **AI wala post:** 5 emoji, 2 "!", 0 numbers, 6 company shabd.
- **Bakery ki apni post:** 1 emoji, 0 "!", 4 numbers, 0 company shabd. "Kal 12 chocolate cake bane, 11 bik gaye. Bacha hua 1 maine khud kha liya."

Seedhi baat, asli numbers, ek emoji: ye insaan ki aawaz hai. AI ise tabhi pakdega jab tum use dikhaoge.

## Prompt ke 3 hisse

1. **Business:** kya bechte ho, kisko, aur offer kya hai. ("Ghar ke bane cake, Pune ke parivaaron ke liye. Offer: Sunday ko 10% off.")
2. **Example:** apni ek purani post paste karo, aur likho "Isi style mein likho." AI us style ko pakadne ki koshish karta hai. Ise few-shot prompting kehte hain (Episode 5 ki bonus trick).
3. **Format:** "3 options do, har caption 2 lines ka, ek saaf call to action ke saath." Call to action matlab padhne wala aage kya kare: order karo, DM karo, dukaan aao.

## 3 options kyun?

Ek option milta to wahi rakhna padta. Teen mein se tum chunte ho. Notebook ka `score()` 5 cheezein dekhta hai: company shabd nahi, asli number, emoji tumhari post jaisa, order wala call to action, aur 2 lines.

- Option 1 (unlock aur premium wala): 2 / 5
- Option 2 (12 cake wala): 5 / 5
- Option 3 (bahut chhota): 4 / 5, call to action nahi

Sabse achha rakho, baaki se ideas lo.

## Post karne se pehle

Offer, price aur timing khud check karo. AI kabhi-kabhi aisa offer likh deta hai jo tumne diya hi nahi.

**Ek line yaad rakho:** Pehle AI ko apni aawaz sunao, phir likhwao.

Agla episode: **Temperature**.
