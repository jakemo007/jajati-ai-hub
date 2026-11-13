---
number: 6
title: 'AI Agents'
headline: 'AI Agent Kya Hai? Chatbot vs Agent, Explained in Hindi (Plan, Tools, Check)'
seoTitle: 'AI Agent Kya Hai? Chatbot vs Agent in Hindi'
description: 'A chatbot tells you the steps, an agent does them. The Plan, Tools, Check loop, a tiny agent in Python, and 3 safety rules before you let one click.'
status: published
category: ai-agents
difficulty: Intermediate
keyword: AGENT
campaign: ep06_agents
notebook:
  file: 'ep6-ai-agents-explained.ipynb'
  about: 'Nakli flight data par ek chhota agent: Plan, Tools, Check ke loop mein chalta hai, FULL flight par phir try karta hai, aur payment se pehle ruk jaata hai.'
sources:
  - label: 'OWASP GenAI Security Project, LLM01:2025 Prompt Injection'
    url: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/'
quiz:
  - q: 'Chatbot aur AI agent mein farak?'
    options: ['Chatbot steps batata hai, agent khud karta hai', 'Agent bas tez chatbot hai', 'Koi farak nahi']
    answer: 0
    explain: 'Agent tools use karta hai (browser, search, files) aur kaam poora hone tak loop mein chalta hai.'
  - q: 'Agent ka loop kya hai?'
    options: ['Plan, Tools, Check', 'Read, Write, Delete', 'Ask, Wait, Stop']
    answer: 0
    explain: 'Plan: goal ko chhote steps mein todo. Tools: kaam karo. Check: result dekho, galat ho to phir se try.'
  - q: 'Agent payment page par pahunch gaya. Ab kya hona chahiye?'
    options: ['Agent khud pay kar de', 'Agent ruke aur tumhari "haan" maange']
    answer: 1
    explain: 'Payment ya password se pehle final click tumhara. Web pages par likha text bhi agent ko bhatka sakta hai.'
---

> **Short mein:** Chatbot tumhe steps batata hai. **AI agent wahi steps khud karta hai:** plan banata hai, tools chalata hai, result check karta hai, aur kaam poora hone tak dobara try karta hai.

## Chatbot vs agent

Goa ki sabse sasti flight poochho. Chatbot kahega: pehle dates check karo, phir prices compare karo, phir seat dekho. Kaam tumhe karna hai. Agent wahi kaam khud karta hai aur jawab laakar deta hai.

## Agent ke 3 steps

1. **Plan:** goal ko chhote steps mein todta hai (dates, airlines, price).
2. **Tools:** browser kholta hai, search karta hai, click karta hai.
3. **Check:** result dekhta hai. Galat laga to phir se try, kaam poora hone tak.

## Notebook mein chhota agent

Full video ke notebook mein nakli flight data par ek chhota agent hai. Koi website nahi khulti.

- 3 dates, 6 flights, 2 flights FULL. Goal: Goa, budget Rs 5,500.
- Plan: 5 steps (3 search, sabse sasti chuno, seat check).
- Agent: Rs 4,890 FULL, phir se try. Rs 4,990 FULL, phir se try. Rs 5,150 (13 Dec): seat hai, jawab mil gaya.
- Budget Rs 4,500 kiya, to sabse sasti flight bhi 4,890 thi. Jawab: "Budget mein kuch nahi". Agent ne guess nahi kiya.

Yahan plan simple rules se bana hai. Asli agent mein plan LLM banata hai, aur tools asli hote hain: browser, search, files.

## 3 safety rules

1. **Payment ya password se pehle agent ko roko.** Final click tumhara. Notebook ka `book()` bhi payment se pehle ruk kar tumhari "haan" maangta hai.
2. **Web pages par likha text agent ko bhatka sakta hai.** Ise prompt injection kehte hain. OWASP ki AI apps wali risk list mein ye pehle number par hai (LLM01), aur OWASP bade actions se pehle insaan ki approval rakhne ki salah deta hai.
3. **Step limit rakho,** taaki loop hamesha chalta na rahe.

Episode mein kisi product ka naam nahi hai, kyunki agent products har kuch mahine badalte hain. Plan, Tools, Check ka loop wahi rehta hai.

**Ek line yaad rakho:** Chatbot batata hai, agent karta hai. Final click tumhara.

Agla episode: **Interview Prep**.
