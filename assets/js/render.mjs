// Atelier Suflé: page renderer shared by the static build (Node) and the browser
// (live content and admin edit mode). Pure functions, no DOM access, no dependencies.
//
// content: see content/site.json
// opts: { lang, root: '' | '../', edit: false }

export const LANGS = ['en', 'de', 'zh-hant', 'zh-hans'];
export const PATHS = { en: '', de: 'de/', 'zh-hant': 'zh-hant/', 'zh-hans': 'zh-hans/' };
export const HTML_LANG = { en: 'en', de: 'de', 'zh-hant': 'zh-Hant', 'zh-hans': 'zh-Hans' };
export const OG_LOCALE = { en: 'en_GB', de: 'de_DE', 'zh-hant': 'zh_TW', 'zh-hans': 'zh_CN' };
export const LANG_LABEL = { en: 'EN', de: 'DE', 'zh-hant': '繁中', 'zh-hans': '简中' };
export const LANG_TITLE = { en: 'English', de: 'Deutsch', 'zh-hant': '繁體中文', 'zh-hans': '简体中文' };
export const NOTE_NAMES = {
  en: { b4: 'B', a4: 'A', g4: 'G' }, de: { b4: 'H', a4: 'A', g4: 'G' },
  'zh-hant': { b4: 'Si', a4: 'La', g4: 'Sol' }, 'zh-hans': { b4: 'Si', a4: 'La', g4: 'Sol' }
};
// Section types an admin can add, move or hide. 'hero' is always first and not listed here.
export const SECTION_TYPES = ['about', 'lessons', 'music', 'news', 'contact', 'custom'];
// Strings the browser behaviours need.
export const JS_KEYS = ['rw.listen', 'rw.bravo', 'contact.copy', 'contact.copied', 'f.send', 'f.sending',
  'f.thanks', 'f.error', 'err.summary', 'nav.login'];

// ---------- Escaping and sanitising ----------
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rich text allows only <em>, <strong>, <br> and <a href> with a safe URL. Everything else is escaped.
export function sanitize(html) {
  let s = String(html ?? '');
  s = s.replace(/&(?!(amp|lt|gt|quot|#39|nbsp);)/g, '&amp;');
  const kept = [];
  s = s.replace(/<\s*(\/?)\s*(em|strong|br|a)\b([^>]*)>/gi, (m, close, tag, attrs) => {
    tag = tag.toLowerCase();
    let out;
    if (tag === 'a' && !close) {
      const href = /href\s*=\s*"([^"]*)"/i.exec(attrs)?.[1] ?? /href\s*=\s*'([^']*)'/i.exec(attrs)?.[1] ?? '';
      const safe = /^(https:\/\/|mailto:|#|\.{0,2}\/?[\w-]+(\.html)?(#[\w-]*)?$|\{\{root\}\}[\w./-]*$)/i.test(href) && !/^\s*javascript:/i.test(href);
      out = safe ? `<a href="${esc(href)}"${/^https:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>` : '<a>';
    } else if (tag === 'br') {
      out = '<br>';
    } else {
      out = `<${close}${tag}>`;
    }
    kept.push(out);
    return `\u0000${kept.length - 1}\u0000`;
  });
  s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => kept[+i]);
}

// ---------- Context ----------
function ctx(content, opts) {
  const lang = opts.lang || 'en';
  const root = opts.root ?? (PATHS[lang] ? '../' : '');
  const edit = !!opts.edit;
  const L = content.i18n[lang] || {};
  const EN = content.i18n.en || {};
  const raw = k => (L[k] ?? EN[k] ?? '');
  const html = k => sanitize(raw(k)).replace(/\{\{root\}\}/g, root);
  const plain = k => esc(raw(k).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'));
  // Editable text element: <tag data-k=key contenteditable> in edit mode.
  const T = (tag, k, attrs = '') =>
    `<${tag}${attrs ? ' ' + attrs : ''}${edit ? ` data-k="${k}" contenteditable="true" spellcheck="true"` : ''}>${html(k)}</${tag}>`;
  const url = src => (/^(https?:|data:|blob:)/.test(src) ? src : root + src);
  const srcset = s => s ? s.split(',').map(p => { const [u, w] = p.trim().split(/\s+/); return `${url(u)} ${w}`; }).join(', ') : '';
  return { lang, root, edit, raw, html, plain, T, url, srcset, s: content.settings, c: content };
}

// <picture> for an image object { src, srcset?, webp?, w, h }.
function picture(x, img, { cls = '', alt = '', sizes = '', lazy = true, priority = false, slot = '' } = {}) {
  if (!img || !img.src) return x.edit && slot ? `<button type="button" class="adm-empty-img" data-img="${slot}">+ Photo</button>` : '';
  const webp = img.webp ? (img.webp.includes(' ') ? x.srcset(img.webp) : x.url(img.webp)) : '';
  const source = webp ? `<source type="image/webp" srcset="${webp}"${sizes && img.webp.includes(' ') ? ` sizes="${sizes}"` : ''}>` : '';
  const set = img.srcset ? ` srcset="${x.srcset(img.srcset)}"${sizes ? ` sizes="${sizes}"` : ''}` : '';
  return `<picture${x.edit && slot ? ` data-img="${slot}"` : ''}>${source}<img${cls ? ` class="${cls}"` : ''} src="${x.url(img.src)}"${set} alt="${alt}" width="${img.w || 800}" height="${img.h || 600}"${priority ? ' fetchpriority="high"' : ''}${lazy && !priority ? ' loading="lazy" decoding="async"' : ''}></picture>`;
}

// Wraps a list item so the admin can move or delete it.
const item = (x, list, id, inner, tag = 'div') =>
  x.edit ? inner.replace(new RegExp(`^<${tag}`), `<${tag} data-item="${list}:${id}"`) : inner;
const addBtn = (x, list, label) => x.edit ? `<button type="button" class="adm-add" data-add="${list}">+ ${label}</button>` : '';

// ---------- Sections ----------
// A section is shown to visitors unless it is hidden, or it is News without any item yet.
const visible = (x, s) => !s.hidden && !(s.type === 'news' && !x.c.lists.news.length);

function header(x, sections) {
  const navTypes = { about: 'nav.about', lessons: 'nav.lessons', music: 'nav.music', news: 'nav.news', contact: 'nav.contact' };
  const nav = sections.filter(s => visible(x, s) || (x.edit && !s.hidden)).map(s => {
    const key = s.type === 'custom' ? `custom.${s.id}.label` : navTypes[s.type];
    return key ? `      <a href="#${s.id}" data-section="${s.id}">${x.html(key)}</a>` : '';
  }).filter(Boolean).join('\n');
  const langs = LANGS.map(l => `<a href="${x.root}${PATHS[l]}index.html" hreflang="${HTML_LANG[l]}" lang="${HTML_LANG[l]}" title="${LANG_TITLE[l]}"${l === x.lang ? ' aria-current="true"' : ''}>${LANG_LABEL[l]}</a>`).join('');
  return `<header class="top" id="top">
  <div class="wrap top-row">
    <a class="logo" href="index.html"><img src="${x.root}assets/brand/logo-mark.png" alt="Atelier Suflé" width="773" height="256"></a>
    <nav class="main-nav" aria-label="${x.plain('nav.label')}">
${nav}
    </nav>
    <nav class="langs" aria-label="${x.plain('lang.label')}">${langs}</nav>
    <a class="btn btn-sm head-cta" href="#contact">${x.html('cta.short')}</a>
  </div>
  <span class="progress" aria-hidden="true"></span>
</header>`;
}

function hero(x) {
  return `  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <h1 id="hero-title">${x.T('span', 'hero.kicker', 'class="kicker"')} ${x.T('span', 'hero.title', 'class="display"')}</h1>
        ${x.T('p', 'hero.lead', 'class="lead"')}
        <div class="actions">
          <a class="btn" href="#contact">${x.html('cta.book')}</a>
          <a class="btn btn-ghost" href="#about">${x.html('hero.cta2')}</a>
        </div>
        <ul class="facts">
${[1, 2, 3, 4].map(i => `          <li>${x.T('b', `f${i}.b`)}${x.T('span', `f${i}.s`)}</li>`).join('\n')}
        </ul>
      </div>
      <div class="hero-visual">
        ${picture(x, x.c.images.hero, { cls: 'portrait', alt: x.plain('hero.alt'), sizes: '(max-width: 900px) 80vw, 460px', lazy: false, priority: true, slot: 'images.hero' })}
        <div class="staff-card" id="staff-card">
          <div class="staff-head">
            ${x.T('h2', 'staff.title', 'class="staff-title"')}
            <button class="play" type="button" id="play"><svg aria-hidden="true" viewBox="0 0 10 12" width="10" height="12"><path d="M0 0 10 6 0 12z" fill="currentColor"/></svg>${x.html('staff.play')}</button>
          </div>
          <svg class="staff" viewBox="0 0 600 168" role="group" aria-label="${x.plain('staff.aria')}">
            <g class="lines" aria-hidden="true">
              <line x1="20" x2="580" y1="40" y2="40"/><line x1="20" x2="580" y1="56" y2="56"/><line x1="20" x2="580" y1="72" y2="72"/><line x1="20" x2="580" y1="88" y2="88"/><line x1="20" x2="580" y1="104" y2="104"/>
              <line x1="330" x2="330" y1="40" y2="104"/><line x1="580" x2="580" y1="40" y2="104"/>
            </g>
            <g id="notes"></g>
          </svg>
          ${x.T('p', 'staff.caption', 'class="staff-caption" id="staff-caption"')}
          <div class="reward" id="reward" hidden>
            <p id="reward-text" aria-live="polite"></p>
            <a class="btn btn-sm" href="#contact">${x.html('cta.book')}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function about(x, sec) {
  const quote = x.raw('about.quote') ? `\n        ${x.T('blockquote', 'about.quote', 'class="quote"')}` : '';
  return `  <section class="block about" id="${sec.id}" aria-labelledby="about-title">
    <div class="wrap about-grid">
      <figure class="about-photo">
        ${picture(x, x.c.images.about, { alt: x.plain('alt.about'), sizes: '(max-width: 900px) 80vw, 440px', slot: 'images.about' })}
      </figure>
      <div class="about-text">
        ${x.T('p', 'about.label', 'class="label"')}
        ${x.T('h2', 'about.title', 'id="about-title"')}
        ${x.T('p', 'about.p1', 'class="prose"')}${quote}
        <div class="diplomas" role="group" aria-label="${x.plain('edu.label')}">
          <div class="diploma">${x.T('p', 'edu.m', 'class="diploma-kind"')}${x.T('p', 'edu.mf')}</div>
          <div class="diploma">${x.T('p', 'edu.b', 'class="diploma-kind"')}${x.T('p', 'edu.bf')}</div>
        </div>
        ${x.T('p', 'edu.school', 'class="school"')}
      </div>
    </div>
  </section>`;
}

function lessons(x, sec) {
  const L = x.c.lists;
  const who = L.who.map(i => item(x, 'who', i.id, `<div>${x.T('dt', `who.${i.id}.t`)}${x.T('dd', `who.${i.id}.p`)}</div>`)).join('\n            ');
  const lengths = L.lengths.map(i => item(x, 'lengths', i.id,
    `<li><span class="num"${x.edit ? ` data-field="lists.lengths.${i.id}.minutes" contenteditable="true"` : ''}>${esc(i.minutes)}</span> ${x.html('len.unit')}</li>`, 'li')).join('\n            ');
  const places = L.places.map(i => item(x, 'places', i.id, `<div>${x.T('dt', `where.${i.id}`)}${x.T('dd', `where.${i.id}.mode`)}</div>`)).join('\n            ');
  const steps = L.steps.map(i => item(x, 'steps', i.id, `<li>${x.T('h4', `step.${i.id}.t`)}${x.T('p', `step.${i.id}.p`)}</li>`, 'li')).join('\n        ');
  return `  <section class="block lessons" id="${sec.id}" aria-labelledby="lessons-title">
    <div class="wrap">
      <div class="section-head">
        ${x.T('p', 'lessons.label', 'class="label"')}
        ${x.T('h2', 'lessons.title', 'id="lessons-title"')}
      </div>
      <div class="lessons-grid">
        <div class="col">
          ${x.T('h3', 'who.title', 'class="sub"')}
          <dl class="rows">
            ${who}
          </dl>${addBtn(x, 'who', 'Item')}
        </div>
        <div class="col">
          ${x.T('h3', 'len.title', 'class="sub"')}
          <ul class="lengths">
            ${lengths}
          </ul>${addBtn(x, 'lengths', 'Length')}
          ${x.T('p', 'len.note', 'class="note"')}
        </div>
        <div class="col">
          ${x.T('h3', 'where.title', 'class="sub"')}
          <dl class="rows places">
            ${places}
          </dl>${addBtn(x, 'places', 'Place')}
        </div>
      </div>
      ${x.T('h3', 'steps.title', 'class="sub steps-title"')}
      <ol class="flute-steps">
        ${steps}
        <li class="headjoint"><a class="btn" href="#contact">${x.html('cta.book')}</a></li>
      </ol>${addBtn(x, 'steps', 'Step')}
    </div>
  </section>`;
}

function music(x, sec) {
  const photos = x.c.lists.musicPhotos.map(p => item(x, 'musicPhotos', p.id,
    `<figure>${picture(x, p.image, { alt: x.plain(`photo.${p.id}.alt`), slot: `lists.musicPhotos.${p.id}.image` })}${x.T('figcaption', `photo.${p.id}.cap`)}</figure>`, 'figure')).join('');
  return `  <section class="block music" id="${sec.id}" aria-labelledby="music-title">
    <div class="wrap music-grid">
      <div class="music-photos">${photos}${addBtn(x, 'musicPhotos', 'Photo')}</div>
      <div class="music-text">
        ${x.T('p', 'music.label', 'class="label"')}
        ${x.T('h2', 'music.title', 'id="music-title"')}
        ${x.T('p', 'music.p1')}
        ${x.T('p', 'music.p2')}
        <a class="btn btn-light" href="${esc(x.s.instagram)}" target="_blank" rel="noopener">${x.html('music.cta')} <span class="sr-only">(${esc(x.s.instagramHandle)})</span></a>
      </div>
    </div>
  </section>`;
}

const LOCALE = { en: 'en-GB', de: 'de-DE', 'zh-hant': 'zh-TW', 'zh-hans': 'zh-CN' };
export function formatDate(iso, lang) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00Z');
  if (isNaN(d)) return esc(iso);
  return new Intl.DateTimeFormat(LOCALE[lang] || 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

function news(x, sec) {
  const items = [...x.c.lists.news].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const cards = items.map(n => {
    const date = x.edit
      ? `<input class="adm-input" type="date" value="${esc(n.date)}" data-field="lists.news.${n.id}.date" aria-label="Date">`
      : (n.date ? `<time datetime="${esc(n.date)}">${formatDate(n.date, x.lang)}</time>` : '');
    const link = x.edit
      ? `<input class="adm-input" type="url" placeholder="https://… (optional link)" value="${esc(n.link || '')}" data-field="lists.news.${n.id}.link" aria-label="Link">`
      : (n.link && /^https:\/\//.test(n.link) ? `<a class="news-more" href="${esc(n.link)}" target="_blank" rel="noopener">${x.html('news.more')}</a>` : '');
    return item(x, 'news', n.id, `<article class="news-card">${picture(x, n.image, { alt: x.plain(`news.${n.id}.title`), sizes: '(max-width: 900px) 92vw, 360px', slot: `lists.news.${n.id}.image` })}<div class="news-body">${date}${x.T('h3', `news.${n.id}.title`)}${x.T('p', `news.${n.id}.text`)}${link}</div></article>`, 'article');
  }).join('\n        ');
  const empty = items.length ? '' : `
        <div class="news-empty">${x.T('p', 'news.empty')}<a class="btn btn-ghost" href="${esc(x.s.instagram)}" target="_blank" rel="noopener">${x.html('music.cta')} <span class="sr-only">(${esc(x.s.instagramHandle)})</span></a></div>`;
  return `  <section class="block news" id="${sec.id}" aria-labelledby="news-title">
    <div class="wrap">
      <div class="section-head">
        ${x.T('p', 'news.label', 'class="label"')}
        ${x.T('h2', 'news.title', 'id="news-title"')}
      </div>
      <div class="news-list">${empty}
        ${cards}
      </div>${addBtn(x, 'news', 'News item')}
    </div>
  </section>`;
}

function contact(x, sec) {
  const s = x.s;
  return `  <section class="block contact" id="${sec.id}" aria-labelledby="contact-title">
    <div class="wrap contact-grid">
      <div class="contact-info">
        ${x.T('p', 'contact.label', 'class="label"')}
        ${x.T('h2', 'contact.title', 'id="contact-title"')}
        ${x.T('p', 'contact.lead', 'class="lead"')}
        <a class="btn mail-btn" id="mail-btn" href="mailto:${esc(s.email)}?subject=${encodeURIComponent(x.raw('contact.subject').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'))}"><svg aria-hidden="true" viewBox="0 0 20 16" width="20" height="16"><rect x="1" y="1" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m2 3 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>${x.html('contact.write')}</a>
        <dl class="info">
          <div><dt>${x.html('contact.email')}</dt><dd><a id="email" href="mailto:${esc(s.email)}">${esc(s.email)}</a> <button class="copy" type="button" id="copy">${x.html('contact.copy')}</button></dd></div>
          <div><dt>${x.html('contact.insta')}</dt><dd><a href="${esc(s.instagram)}" target="_blank" rel="noopener">${esc(s.instagramHandle)}</a></dd></div>
          <div><dt>${x.html('contact.where')}</dt>${x.T('dd', 'contact.places')}</div>
        </dl>
      </div>
      <form class="form" id="contact-form" action="https://formsubmit.co/${esc(s.email)}" method="POST" novalidate>
        ${x.T('p', 'contact.formTitle', 'class="form-title"')}
        <p class="form-hint">${x.html('f.required')}</p>
        <div class="field-row">
          <div class="field">
            <label for="f-name">${x.html('f.name')} <span aria-hidden="true">*</span></label>
            <input id="f-name" type="text" name="name" autocomplete="name" required aria-describedby="f-name-err">
            <p class="err" id="f-name-err" hidden>${x.html('err.name')}</p>
          </div>
          <div class="field">
            <label for="f-mail">${x.html('f.email')} <span aria-hidden="true">*</span></label>
            <input id="f-mail" name="email" type="email" autocomplete="email" required aria-describedby="f-mail-err">
            <p class="err" id="f-mail-err" hidden>${x.html('err.email')}</p>
          </div>
        </div>
        <div class="field">
          <label for="f-msg">${x.html('f.msg')} <span class="opt">(${x.html('f.optional')})</span></label>
          <textarea id="f-msg" name="message" rows="3" placeholder="${x.plain('f.ph')}"></textarea>
        </div>
        <input type="hidden" name="language" value="${LANG_TITLE[x.lang]}">
        <div class="hp" aria-hidden="true"><label for="f-hp">Leave empty</label><input id="f-hp" type="text" name="_honey" tabindex="-1" autocomplete="off"></div>
        <button class="btn btn-block" type="submit" id="f-send">${x.html('f.send')}</button>
        <p class="status" id="form-status" role="status" aria-live="polite"></p>
        <p class="privacy">${x.html('f.privacy')}</p>
      </form>
    </div>
  </section>`;
}

function custom(x, sec) {
  const img = x.c.custom?.[sec.id]?.image;
  const photo = img || x.edit ? `<figure class="custom-photo">${picture(x, img, { alt: x.plain(`custom.${sec.id}.title`), sizes: '(max-width: 900px) 92vw, 520px', slot: `custom.${sec.id}.image` })}</figure>` : '';
  return `  <section class="block custom${photo ? '' : ' no-photo'}" id="${sec.id}" aria-labelledby="${sec.id}-title">
    <div class="wrap custom-grid">
      ${photo}
      <div class="custom-text">
        ${x.T('p', `custom.${sec.id}.label`, 'class="label"')}
        ${x.T('h2', `custom.${sec.id}.title`, `id="${sec.id}-title"`)}
        ${x.T('div', `custom.${sec.id}.text`, 'class="prose"')}
      </div>
    </div>
  </section>`;
}

const RENDER = { about, lessons, music, news, contact, custom };

function footer(x) {
  return `<footer class="foot">
  <div class="wrap foot-row">
    <div class="foot-brand">
      <img src="${x.root}assets/brand/logo-mark.png" alt="" width="773" height="256" class="foot-logo" loading="lazy">
      ${x.T('p', 'footer.tag')}
    </div>
    <nav aria-label="${x.plain('footer.legal')}">
      <a href="${x.root}impressum.html">${x.html('footer.legal')}</a>
      <a href="${x.root}datenschutz.html">${x.html('footer.privacy')}</a>
      <span>© <span id="year">2026</span> Atelier Suflé · Suhsuan Wang</span>
      <button class="foot-admin" type="button" id="login-btn" aria-haspopup="dialog">${x.html('nav.admin')}</button>
    </nav>
  </div>
</footer>`;
}

// Section wrapper with admin controls (move, hide, delete) in edit mode.
function sectionBlock(x, sec, i, n) {
  const fn = RENDER[sec.type];
  if (!fn) return '';
  if (!x.edit && !visible(x, sec)) return '';
  let html = fn(x, sec);
  if (!x.edit) return html;
  const name = sec.type === 'custom' ? x.plain(`custom.${sec.id}.label`) || 'Section' : sec.type;
  const bar = `<div class="adm-secbar" data-sec="${sec.id}"><span class="adm-secname">${esc(name)}${sec.hidden ? ' · hidden' : ''}</span>`
    + `<button type="button" data-secmove="-1"${i === 0 ? ' disabled' : ''} title="Move up">↑</button>`
    + `<button type="button" data-secmove="1"${i === n - 1 ? ' disabled' : ''} title="Move down">↓</button>`
    + `<button type="button" data-sechide>${sec.hidden ? 'Show' : 'Hide'}</button>`
    + (sec.type === 'custom' ? '<button type="button" data-secdel>Delete</button>' : '')
    + `<button type="button" data-secadd>+ Add section below</button></div>`;
  html = html.replace(/^(\s*<section class="[^"]*)"/, `$1${sec.hidden ? ' adm-hidden' : ''}"`);
  return html.replace(/(<section[^>]*>)/, `$1\n${bar}`);
}

// The page body inside #app: header, main, footer and the mobile booking bar.
export function renderApp(content, opts) {
  const x = ctx(content, opts);
  const secs = content.sections;
  return `${header(x, secs)}

<main id="main">
${hero(x)}

${secs.map((s, i) => sectionBlock(x, s, i, secs.length)).filter(Boolean).join('\n\n')}
</main>

${footer(x)}

<aside class="mobile-cta" id="mobile-cta" aria-label="${x.plain('cta.book')}"><a class="btn btn-block" href="#contact">${x.html('cta.book')}</a></aside>`;
}

// Strings and settings the browser behaviours need for one language.
export function jsData(content, lang) {
  const x = ctx(content, { lang });
  const out = {};
  for (const k of JS_KEYS) out[k] = x.raw(k).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  out.notes = NOTE_NAMES[lang];
  out.lang = lang;
  out.version = content.meta?.version ?? 0;
  return out;
}

// <head> contents and JSON-LD, used by the static build.
export function renderHead(content, lang) {
  const x = ctx(content, { lang });
  const site = content.settings.siteUrl;
  const canonical = site + PATHS[lang];
  const alternates = LANGS.map(l => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${site}${PATHS[l]}">`).join('\n')
    + `\n<link rel="alternate" hreflang="x-default" href="${site}">`;
  const hero = content.images.hero;
  const preload = hero.webp && hero.webp.includes(' ')
    ? `<link rel="preload" href="${x.url(hero.webp.split(',').pop().trim().split(/\s+/)[0])}" as="image" type="image/webp" imagesrcset="${x.srcset(hero.webp)}" imagesizes="(max-width: 900px) 80vw, 460px">`
    : `<link rel="preload" href="${x.url(hero.src)}" as="image">`;
  const plainTxt = k => x.raw(k).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicSchool', '@id': site + '#school', name: 'Atelier Suflé', description: plainTxt('meta.desc'),
        url: canonical, image: site + 'assets/og-image.jpg', logo: site + 'assets/brand/logo-mark.png', email: content.settings.email,
        areaServed: [{ '@type': 'City', name: 'Bonn' }, { '@type': 'City', name: 'Köln' }],
        availableLanguage: ['en', 'de', 'zh'], sameAs: [content.settings.instagram], founder: { '@id': site + '#suhsuan' }
      },
      {
        '@type': 'Person', '@id': site + '#suhsuan', name: 'Suhsuan Wang', jobTitle: 'Flautist and flute teacher',
        knowsLanguage: ['en', 'de', 'zh'], alumniOf: { '@type': 'CollegeOrUniversity', name: 'Hochschule für Musik und Tanz Köln' },
        sameAs: [content.settings.instagram]
      }
    ]
  };
  const news = content.lists.news.filter(n => n.date);
  if (news.length) {
    ld['@graph'].push(...news.map(n => ({
      '@type': 'Event', name: plainTxt(`news.${n.id}.title`), startDate: n.date, description: plainTxt(`news.${n.id}.text`),
      organizer: { '@id': site + '#school' }, ...(n.image?.src ? { image: x.url(n.image.src).replace(/^\.\.\//, site) } : {})
    })));
  }
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${x.html('meta.title')}</title>
<meta name="description" content="${x.plain('meta.desc')}">
<link rel="canonical" href="${canonical}">
${alternates}
<meta name="theme-color" content="#F6F2ED">
<link rel="icon" type="image/png" href="${x.root}favicon.png">
<link rel="apple-touch-icon" href="${x.root}apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Atelier Suflé">
<meta property="og:locale" content="${OG_LOCALE[lang]}">
<meta property="og:title" content="${x.plain('meta.title')}">
<meta property="og:description" content="${x.plain('meta.desc')}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site}assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="${x.root}assets/fonts/cormorant-garamond-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${x.root}assets/fonts/jost-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="${x.root}assets/fonts/fonts.css">
<link rel="stylesheet" href="${x.root}assets/css/site.css">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`;
}
