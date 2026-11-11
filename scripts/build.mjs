// Builds the static pages from content/site.json:
// index.html (English), de/, zh-hant/, zh-hans/ + sitemap.xml + robots.txt.
// Simplified Chinese texts missing from content are converted from Traditional (OpenCC).
//
// Usage: npm run build
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as OpenCC from 'opencc-js';
import { LANGS, PATHS, HTML_LANG, renderApp, renderHead, jsData, esc } from '../assets/js/render.mjs';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const content = JSON.parse(readFileSync(join(SITE, 'content/site.json'), 'utf8'));

// Fill Simplified Chinese from Traditional where no Simplified text exists.
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });
const WORDS = [['波昂', '波恩'], ['线上', '在线'], ['联络', '联系'], ['隐私权政策', '隐私政策'], ['视讯', '视频'], ['电子邮件', '电子邮箱']];
const hans = content.i18n['zh-hans'] ||= {};
for (const [k, v] of Object.entries(content.i18n['zh-hant'] || {})) {
  if (hans[k] === undefined) hans[k] = WORDS.reduce((s, [a, b]) => s.split(a).join(b), t2s(v));
}

const tidy = html => html.split('\n').map(l => l.trimEnd()).join('\n').replace(/\n{3,}/g, '\n\n');

for (const lang of LANGS) {
  const root = PATHS[lang] ? '../' : '';
  const skip = esc((content.i18n[lang]?.skip ?? content.i18n.en.skip));
  const page = `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
${renderHead(content, lang)}
</head>
<body data-root="${root}">
<a class="skip" href="#main">${skip}</a>
<div id="app">
${renderApp(content, { lang, root })}
</div>

<script type="application/json" id="i18n">${JSON.stringify(jsData(content, lang)).replace(/</g, '\\u003c')}</script>
<script type="module" src="${root}assets/js/main.mjs"></script>
</body>
</html>
`;
  const out = join(SITE, PATHS[lang], 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, tidy(page));
  console.log('built', PATHS[lang] + 'index.html');
}

const site = content.settings.siteUrl;
const urls = LANGS.map(l => `  <url><loc>${site}${PATHS[l]}</loc>`
  + LANGS.map(a => `<xhtml:link rel="alternate" hreflang="${HTML_LANG[a]}" href="${site}${PATHS[a]}"/>`).join('')
  + '</url>').join('\n');
writeFileSync(join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);
writeFileSync(join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`);
console.log('built sitemap.xml, robots.txt');
