/**
 * Generates the favicons and the 1200x630 social preview images into public/.
 * Run locally after changing a sheet or the brand: `npm run og`. The output PNGs are committed,
 * so the Cloudflare build does not need to run this (it has different fonts).
 * Text uses Segoe UI (Windows). Sheet previews come from src/assets/resources/ (public sheets only).
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pub = join(root, 'public');
const assets = join(root, 'src', 'assets', 'resources');
mkdirSync(join(pub, 'og'), { recursive: true });

const C = { bg: '#0a0f1f', surface: '#111a33', line: '#33436a', cyan: '#22d3ee', blue: '#3b82f6', text: '#f1f5f9', muted: '#a3b1c6' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function mark(size, withBg = true) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  ${withBg ? `<rect width="64" height="64" rx="${size >= 120 ? 0 : 14}" fill="${C.surface}"/>` : ''}
  <path d="M24 15h-8v34h8" fill="none" stroke="${C.cyan}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40 15h8v34h-8" fill="none" stroke="${C.cyan}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="6" fill="${C.blue}"/></svg>`;
}

function background(eyebrow, lines, sub, maxTitle = 88) {
  const titleSize = lines.some((l) => l.length > 16) ? Math.min(76, maxTitle) : maxTitle;
  const lineH = Math.round(titleSize * 1.12);
  const top = 200 + titleSize;
  const title = lines
    .map((l, i) => `<text x="72" y="${top + i * lineH}" font-family="Segoe UI" font-weight="800" font-size="${titleSize}" fill="${i === lines.length - 1 ? C.cyan : C.text}">${esc(l)}</text>`)
    .join('');
  const subY = top + (lines.length - 1) * lineH + 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="85%" cy="0%" r="70%"><stop offset="0" stop-color="${C.blue}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.blue}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0%" cy="100%" r="60%"><stop offset="0" stop-color="${C.cyan}" stop-opacity="0.18"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
  <g transform="translate(72 64)">${mark(56).replace('<svg', '<svg x="0" y="0"')}</g>
  <text x="144" y="104" font-family="Segoe UI" font-weight="700" font-size="34" fill="${C.text}">Jajati <tspan fill="${C.cyan}">AI</tspan></text>
  <text x="72" y="184" font-family="Segoe UI" font-weight="700" font-size="24" letter-spacing="2" fill="${C.cyan}">${esc(eyebrow)}</text>
  ${title}
  <text x="72" y="${subY + 30}" font-family="Segoe UI" font-size="32" fill="${C.muted}">${esc(sub)}</text>
  <text x="72" y="566" font-family="Segoe UI" font-weight="600" font-size="26" fill="${C.text}">Free · No sign-up · No DM needed</text>
  </svg>`;
}

async function ogDefault() {
  const svg = background('AI EXPLAINED IN SIMPLE HINDI', ['Stop Guessing.', 'Start Prompting Better.'], 'Free AI prompts, cheat sheets and lessons');
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(pub, 'og', 'default.png'));
}

async function ogSheet(name, preview, eyebrow, lines, sub) {
  const bg = await sharp(Buffer.from(background(eyebrow, lines, sub, 66))).png().toBuffer();
  const sheetH = 560;
  const sheetW = Math.round((1080 / 1920) * sheetH);
  const sheet = await sharp(join(assets, preview)).resize(sheetW, sheetH).png().toBuffer();
  const frame = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetW + 16}" height="${sheetH + 16}"><rect x="0" y="0" width="${sheetW + 16}" height="${sheetH + 16}" rx="14" fill="${C.line}"/></svg>`,
  );
  const left = 1200 - sheetW - 72;
  await sharp(bg)
    .composite([
      { input: frame, left: left - 8, top: 35 - 8 + 8 },
      { input: sheet, left, top: 35 + 8 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(pub, 'og', `${name}.png`));
}

async function icons() {
  await sharp(Buffer.from(mark(32))).png().toFile(join(pub, 'favicon-32.png'));
  await sharp(Buffer.from(mark(180))).png().toFile(join(pub, 'apple-touch-icon.png'));
  await sharp(Buffer.from(mark(512))).png().toFile(join(pub, 'icons', 'icon-512.png'));
}

await icons();
await ogDefault();
await ogSheet('chatgpt-prompt-cheatsheet', 'prompt-5-prompts-1.png', 'FREE CHEAT SHEET · KEYWORD: PROMPT', ['5 Copy-Paste', 'ChatGPT Prompts'], 'Role · Context · Task · Format');
await ogSheet('ai-hallucination-cheatsheet', 'sach-ai-jhooth-cheatsheet.png', 'FREE CHEAT SHEET · KEYWORD: SACH', ['AI Ka Jhooth', 'Pakdo'], 'Hallucination cheat sheet, 1 page');
await ogSheet('rag-notebooklm-cheatsheet', 'rag-notebooklm-cheatsheet.png', 'FREE CHEAT SHEET · KEYWORD: RAG', ['RAG +', 'NotebookLM'], 'RAG in 4 steps, try it free');
console.log('icons and og images written to public/');
