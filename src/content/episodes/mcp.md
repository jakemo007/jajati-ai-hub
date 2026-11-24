---
number: 20
title: 'MCP'
headline: 'MCP: AI Ko Tools Se Jodne Ka Standard (Hindi)'
seoTitle: 'MCP Kya Hai? 12 Connectors Ginaaye, 7 Kaafi The'
description: 'Interview question: 3 AI apps, 4 tools, how many connectors? Without a standard 12. With MCP each tool is a server once and each app a client once: 7.'
status: published
category: rag-llms
difficulty: Intermediate
campaign: ep20_mcp
notebook:
  file: 'ep20-mcp-explained.ipynb'
  about: 'Teen nakli apps aur chaar nakli tools: bina standard 12 connectors, MCP ke saath 7. Ek toy weather server jo tools/list aur tools/call ka jawab deta hai, ek client function jo har app use karta hai, ek calendar server jo bina app badle judta hai, aur ek gate jo book_slot se pehle user se poochhta hai. Aakhir mein apna server jodkar khud chalao.'
relatedPrompts: [interview-practice-prompt, ask-me-3-questions-first, say-i-dont-know-prompt]
sources:
  - label: 'Model Context Protocol: Specification'
    url: 'https://modelcontextprotocol.io/specification/latest'
  - label: 'Model Context Protocol: Tools (tools/list, tools/call)'
    url: 'https://modelcontextprotocol.io/specification/latest/server/tools'
  - label: 'Anthropic: Introducing the Model Context Protocol'
    url: 'https://www.anthropic.com/news/model-context-protocol'
  - label: 'OpenAI: MCP and Connectors'
    url: 'https://developers.openai.com/api/docs/guides/tools-connectors-mcp'
quiz:
  - q: '3 apps, 4 tools, aur har jodi ka apna code. Bina standard kitne connectors?'
    options: ['7', '12', '4']
    answer: 1
    explain: 'Har app har tool ke liye apna jugaad code likhta hai: 3 x 4 = 12. Notebook print karta hai: bina standard: 12 connectors.'
  - q: 'Chautha app aaya. MCP ke saath ab kitne?'
    options: ['8', '16', '7']
    answer: 0
    explain: 'Har tool ek baar server (4), har app ek baar client (ab 4): 8. Bina standard 16 hote, har naye app par chaar aur. MCP mein bas ek aur.'
  - q: 'MCP aane ke baad tool call kaun likhta hai?'
    options: ['MCP server', 'Model, pehle jaisa', 'User']
    answer: 1
    explain: 'MCP function calling ki jagah nahi leta. Model ab bhi call likhta hai; app usse sahi server par tools/call bhejta hai, aur server chalata hai.'
---

> **Short mein:** Interview mein poochha: "3 AI apps, 4 tools, kitne connectors?" Tumne 12 ginaaye. Galat nahi tha, **par 7 kaafi the.** MCP (Model Context Protocol) ek open standard hai: har tool ek baar server banta hai, har app ek baar client. Tool ek baar, app ek baar.

## Bina standard

Episode 19 mein model ne call likhi, aur hamare code ne weather tool chalaya. Par wo tool ek hi app ke andar tha. Notebook mein teen apps hain (chat app, code editor, terminal agent) aur chaar tools (weather, calendar, GitHub, Drive). Standard nahi, to har app har tool ke liye apna jugaad code likhta hai, har app ka alag tarika.

Anthropic ne MCP launch karte waqt yahi likha tha: *"Every new data source requires its own custom implementation, making truly connected systems difficult to scale."*

## Kitne connectors?

Notebook ginti karta hai:

> 3 apps, 4 tools
> bina standard: 12 connectors
> MCP ke saath : 7 (4 servers + 3 clients)

Chautha app aaya:

> 4 apps, 4 tools
> bina standard: 16
> MCP ke saath : 8

Bina standard har naye app par chaar aur. MCP mein bas ek aur.

## MCP kya hai

Model Context Protocol. Spec ke shabdon mein: *"an open protocol that enables seamless integration between LLM applications and external data sources and tools."*

Teen roles: **host**, yaani AI app; **server**, jo tools deta hai; aur **client**, host ke andar ka connector, har server ke liye ek. MCP ki site ise AI apps ka USB-C port kehti hai: *"Think of MCP like a USB-C port for AI applications."*

## List aur call

App ko kaise pata ki server ke paas kaun-se tools hain? Client ek message bhejta hai, `tools/list`:

> ['get_weather']

Phir `tools/call`, city pune. Chat app aur code editor, dono ko ek hi jawab:

> chat app -> pune: 31°C
> code editor -> pune: 31°C

Koi naya code nahi. Ye messages JSON-RPC 2.0 mein jaate hain. Local server stdio par chalta hai, remote server HTTP par. Anthropic ne MCP launch kiya tha; ab ye Linux Foundation ke Agentic AI Foundation ke paas hai, kisi ek company ka nahi.

## Model aur MCP

Naya tool jodna ho to? Calendar server joda, app ka code wahi raha:

> 2 servers, tools: ['get_weather', 'book_slot']

Model ab bhi call likhta hai, Episode 19 jaisa. App call padhkar sahi server chunta hai aur `tools/call` bhejta hai:

> {'name': 'get_weather', 'arguments': {'city': 'pune'}}
> {'content': 'pune: 31°C'}

To MCP function calling ki jagah nahi leta. Model call likhta hai; MCP batata hai ki tool kahan hai aur kaise chale.

## Pehle poochho

Kuch tools kaam bhi karte hain, jaise slot book karna. Spec kehta hai: *"there SHOULD always be a human in the loop with the ability to deny tool invocations."* Notebook mein user ne mana kiya:

> user ne mana kiya, nahi chala
> chala: []

Haan kaha, tab:

> slot: friday, 4 pm
> chala: ['book_slot']

Aur sirf bharose wale servers jodo. OpenAI ka guide: *"Only use remote MCP servers you trust"*, kyunki galat server tumhara data nikaal sakta hai.

Apps, tools, weather aur slot humne teaching ke liye banaye hain. Asli MCP mein aur bhi hai (transports, auth, resources, prompts), par tareeka wahi hai.

## Interview jawab

Teen lines, apne shabdon mein:

> 1. MCP ek open protocol hai: AI app tools aur data se ek hi tarike se judta hai.
> 2. Har tool ek baar server banta hai, har app ek baar client: M x N nahi, M + N.
> 3. Client tools/list se tools dhoondhta hai, tools/call se chalata hai. Model ab bhi call likhta hai.

Notebook mein ye jawab English mein bhi hai.

**Ek line yaad rakho:** 12 nahi, 7. MCP standard hai, model nahi.

Agla episode: **Prompt injection**, AI ko chhupa hua hukm.
