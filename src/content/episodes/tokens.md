---
number: 1
title: 'Tokens'
headline: 'AI Tokens Explained in Hindi: Why Is a 5-Token Sentence 8 Tokens in Hindi?'
seoTitle: 'AI Tokens Explained in Hindi (Why Hindi Uses More)'
description: 'What a token is, why Hindi uses more tokens than English, the strawberry bug, and why limits and cost are counted in tokens.'
status: published
category: ai-fundamentals
difficulty: Beginner
published: 2026-10-30
videos:
  youtube: 'https://www.youtube.com/shorts/rBdvln_vaME'
campaign: ep01_tokens
notebook:
  file: 'ep1-tokens-explained.ipynb'
  about: 'Video ka har number isi notebook se aaya: English 5 tokens, Hindi 8, purane tokenizer par 24, aur BPE khud likh ke.'
relatedPrompts: [role-context-task-format, step-by-step-prompt]
sources:
  - label: 'OpenAI tiktoken (the open-source tokenizer used for the counts below)'
    url: 'https://github.com/openai/tiktoken'
quiz:
  - q: 'AI ke liye "token" kya hai?'
    options: ['Ek poora sentence', 'Text ka chhota tukda: word, word ka hissa, ya comma', 'Ek password']
    answer: 1
    explain: 'Text tokens mein tootta hai. Kabhi poora word, kabhi word ka hissa, kabhi sirf ek comma.'
  - q: 'GPT-4o par Roman Hinglish ("AI jeevan ko aasan banata hai!") likhne se tokens bachte hain?'
    options: ['Haan, hamesha', 'Nahi, is sentence mein Roman 11 tokens aur Devanagari 8 tokens bana']
    answer: 1
    explain: 'GPT-4o ke tokenizer par Roman version 11 tokens ka tha, Devanagari version 8 ka. Isliye "Hindi ko English letters mein likho" token bachane ka tareeka nahi hai.'
  - q: 'AI "strawberry" mein r ginne mein galti kyun kar sakta hai?'
    options: ['Use spelling nahi aati', 'Use letters nahi, tokens dikhte hain: st + raw + berry', 'Ye internet ki galti hai']
    answer: 1
    explain: 'AI ko pura word letter-by-letter nahi dikhta. Use st, raw aur berry jaise tukde dikhte hain.'
---

> **Short mein:** AI letters nahi padhta. Wo text ko chhote tukdon mein todta hai, jinhe **tokens** kehte hain. AI ki limit, speed aur bill, sab tokens mein gine jaate hain.

## Token = AI ka Lego brick

Jab tum ChatGPT ko kuch likhte ho, to AI pehle us text ko bricks mein todta hai. Kabhi ek brick ek poora word hota hai, kabhi word ka hissa, kabhi sirf ek comma. AI ko letters nahi, numbers samajh aate hain, isliye har brick ko ek ID number milta hai. Text ko in bricks mein todne ko **tokenization** kehte hain.

## Subwords kyun?

- Agar har letter ek token ho, to sequence bahut lambi ho jaayegi.
- Agar har word ek token ho, to vocabulary bahut badi ho jaayegi (har naya word, har spelling).

Isliye AI beech ka raasta chunta hai: **subwords**. Ye BPE (Byte Pair Encoding) se bante hain: sabse common jodi baar-baar judti hai, jab tak vocabulary ek tay size tak na pahunch jaaye. GPT-4o ke tokenizer mein lagbhag 2 lakh tokens hain.

## Hindi mein zyada tokens kyun?

Ek hi sentence, alag-alag tokenizer par (tiktoken se gina gaya):

| Sentence | GPT-4o tokenizer | Purana GPT-4 tokenizer |
|---|---|---|
| AI makes life easier! | 5 | 5 |
| AI जीवन को आसान बनाता है! | 8 | 24 |
| AI jeevan ko aasan banata hai! (Roman) | 11 | 11 |

Wajah: tokenizer zyada tar English text se seekha hai. Aur Devanagari ka har character computer mein 3 bytes ka hota hai (English letter 1 byte ka), isliye kam-common Hindi words chhote tukdon mein toot jaate hain.

Do baatein yaad rakho:

- **Har model ka apna tokenizer hota hai.** Naye tokenizer par Hindi ka fark kaafi kam hua hai.
- **Roman letters mein likhne se token nahi bachte** (GPT-4o par is sentence mein Roman 11, Devanagari 8).

## Strawberry wala bug

"strawberry" AI ko teen tukdon mein dikhta hai: `st` + `raw` + `berry`. Use letters ek-ek karke nahi dikhte, isliye "isme kitne r hain?" jaise sawal par AI galti kar sakta hai. Numbers bhi tootte hain: `1234567` = `123` + `456` + `7`.

Space aur capital letter se bhi ID badal jaati hai: `hello`, ` hello` (space ke saath), `Hello` aur `HELLO`, sab alag tokens hain. `HELLO` to do tukdon mein tootta hai: `HEL` + `LO`.

## Tokens ke baad kya hota hai

1. Har token ek **vector** banta hai: numbers ki ek lambi list. Milte-julte matlab waale words ke vectors paas-paas rehte hain.
2. AI jawab "jaanta" nahi. Wo probability se **agla token** chunta hai. **Temperature** setting tay karti hai ki choice safe ho ya creative.
3. Jawab ek-ek token karke banta hai, aur ek "end" token par rukta hai.
4. API ka bill input aur output, dono tokens ka banta hai.

## Ye tumhare kaam ka kaise hai

Limits aur cost tokens mein gine jaate hain. Isliye lamba prompt nahi, **saaf prompt** aksar behtar jawab deta hai. Video ke end mein formula tha: **Role, Goal aur Output batao.** Episode 5 mein yahi formula poora bana: Role, Context, Task, Format.

**Ek line yaad rakho:** AI words nahi, tokens padhta hai. Aur Hindi mein tokens zyada bante hain.
