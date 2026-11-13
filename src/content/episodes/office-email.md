---
number: 8
title: 'Office Email'
headline: 'ChatGPT Se Office Email Kaise Likhwayein? Kisko, Details, Kitna (Hindi)'
seoTitle: 'ChatGPT Se Office Email Kaise Likhwayein? (Hindi)'
description: '"Chhutti ka email likho" gets you an 82-word essay full of blank brackets. Tell AI who it is for, the real details and how long, and get 5 lines.'
status: published
category: practical-ai
difficulty: Beginner
keyword: PROMPT
campaign: ep08_email
resource: chatgpt-prompt-cheatsheet
notebook:
  file: 'ep8-office-email-explained.ipynb'
  about: 'Ek chhota checker jo batata hai ki email ke prompt mein kya missing hai: kisko, details, kitna. 82 words ka draft, 24 words ka email.'
relatedPrompts: [leave-email-prompt, role-context-task-format]
quiz:
  - q: '"Chhutti ka email likho" mein kya missing hai?'
    options: ['Kuch nahi', 'Kisko, details aur kitna', 'Sirf subject line']
    answer: 1
    explain: 'AI ko nahi pata email manager ko hai ya HR ko, dates kya hain, aur kitna lamba ho. To wo guess karta hai.'
  - q: 'AI ke draft mein [Start Date] jaisi khaali jagah dikhe to?'
    options: ['Waise hi bhej do', 'Asli detail bharo, phir bhejo']
    answer: 1
    explain: 'Koi [bracket] bacha ho to bhejo mat. Dates, naam aur amount khud check karo.'
  - q: 'Client ko payment reminder: sabse zaroori details?'
    options: ['Invoice number, amount aur due date', 'Company ka logo', 'Lamba thank you note']
    answer: 0
    explain: 'Notebook ka example: invoice 214, Rs 45,000, due date 15 Nov. Client ko turant pata chalta hai kya karna hai.'
---

> **Short mein:** "Chhutti ka email likho" bologe to AI nibandh likh dega, beech mein khaali brackets ke saath. **AI ko 3 cheezein batao: kisko, details, kitna.**

## Adhura prompt, lamba email

Manager ko chhutti ka email bhejna tha. AI se kaha "chhutti ka email likho". Aise prompt par aksar aisa draft aata hai: 82 words, 13 lines, aur 5 khaali jagah ([Manager's Name], [Start Date], [End Date], [Reason], [Your Name]). (Ye notebook ka haath se likha example hai.) AI bura nahi tha, prompt adhura tha.

## 3 cheezein

1. **Kisko:** manager, client ya HR. Tone usi se badalta hai: manager ko seedha aur polite, client ko polite par baat saaf, HR ko formal, dates ke saath.
2. **Details:** dates, wajah, amount. Asli wale.
3. **Kitna:** 5 lines se kam, subject line ke saath.

## Notebook mein checker

- "Chhutti ka email likho": missing kisko, details, kitna. Teeno.
- `email_prompt("manager", "13-14 Nov chhutti, wajah: behen ki shaadi")`: kuch missing nahi.
- Chhota email (ye bhi haath se likha example): 24 words, 5 lines, 0 khaali jagah.
- Client payment reminder (invoice 214, Rs 45,000, due date 15 Nov): kuch missing nahi.

## Bhejne se pehle

Dates, naam aur amount khud check karo. Koi [bracket] bacha ho to bhejo mat. AI draft banata hai, send button tum dabate ho.

**Ek line yaad rakho:** AI ko batao kisko, kya, aur kitna.

Agla episode: **AI se Padhai**.
