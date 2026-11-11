// Atelier Suflé: page behaviours (music staff with flute samples, header progress and active
// section, copy email, mobile booking bar, contact form). initBehaviors() can run again after the
// page body is re-rendered (live content or admin edit mode); it cleans up what it set before.

const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const BEAT = 0.46; // seconds; matches assets/audio/mary.mp3 (src/make_sound.py, 130 bpm)
const MELODY = [
  { x: 70, y: 72, k: 'b4', f: 493.88, s: 'Ma-', d: 1 },
  { x: 135, y: 80, k: 'a4', f: 440.0, s: 'ry', d: 1 },
  { x: 200, y: 88, k: 'g4', f: 392.0, s: 'had', d: 1 },
  { x: 265, y: 80, k: 'a4', f: 440.0, s: 'a', d: 1 },
  { x: 385, y: 72, k: 'b4', f: 493.88, s: 'lit-', d: 1 },
  { x: 450, y: 72, k: 'b4', f: 493.88, s: 'tle', d: 1 },
  { x: 525, y: 72, k: 'b4', f: 493.88, s: 'lamb', d: 2, half: true }
];
const FILL = { b4: 'var(--orange)', a4: 'var(--slate)', g4: 'var(--orange-text)' };

// ---------- Audio (kept across re-renders) ----------
let actx, out, loading;
const buffers = {};
let audioRoot = '';
function audio() {
  try {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      out = actx.createGain(); out.gain.value = 0.9; out.connect(actx.destination);
    }
  } catch (e) { return null; }
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function load() {
  if (loading) return loading;
  const c = audio();
  if (!c) return (loading = Promise.resolve());
  loading = Promise.all(['b4', 'a4', 'g4', 'mary'].map(k =>
    fetch(`${audioRoot}assets/audio/${k}.mp3`)
      .then(r => r.arrayBuffer())
      .then(b => new Promise((ok, no) => c.decodeAudioData(b, ok, no)))
      .then(buf => { buffers[k] = buf; })
      .catch(() => {})
  ));
  return loading;
}
function sample(k, at) {
  const c = audio();
  if (!c || !buffers[k]) return false;
  const src = c.createBufferSource();
  src.buffer = buffers[k]; src.connect(out); src.start(at || c.currentTime);
  return true;
}
function tone(freq, dur, at) {
  const c = audio(); if (!c) return;
  const t0 = at || c.currentTime;
  const osc = c.createOscillator(), amp = c.createGain(), lfo = c.createOscillator(), depth = c.createGain();
  osc.frequency.value = freq; lfo.frequency.value = 5; depth.gain.value = freq * 0.006;
  lfo.connect(depth).connect(osc.frequency);
  amp.gain.setValueAtTime(0, t0);
  amp.gain.linearRampToValueAtTime(0.22, t0 + 0.06);
  amp.gain.setValueAtTime(0.2, t0 + dur - 0.08);
  amp.gain.linearRampToValueAtTime(0, t0 + dur);
  osc.connect(amp).connect(out);
  osc.start(t0); lfo.start(t0); osc.stop(t0 + dur + 0.02); lfo.stop(t0 + dur + 0.02);
}

// ---------- Header progress (one window listener for the page's lifetime) ----------
let ticking = false;
function onScroll() {
  const header = document.querySelector('.top');
  if (header) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', window.scrollY > 8);
    header.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
  }
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

let observers = [];

export function initBehaviors(I, root = '', { edit = false } = {}) {
  audioRoot = root;
  observers.forEach(o => o.disconnect());
  observers = [];
  onScroll();
  if ($('year')) $('year').textContent = new Date().getFullYear();

  // Active section marker in the navigation
  const links = [...document.querySelectorAll('.main-nav a[data-section]')];
  if ('IntersectionObserver' in window && links.length) {
    const seen = new Map();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      let best = null, ratio = 0;
      seen.forEach((r, id) => { if (r > ratio) { ratio = r; best = id; } });
      links.forEach(a => {
        const on = a.dataset.section === best;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-30% 0px -50% 0px', threshold: [0, .25, .5, 1] });
    links.forEach(a => { const sec = document.getElementById(a.dataset.section); if (sec) io.observe(sec); });
    observers.push(io);
  }

  // Music staff: "Mary Had a Little Lamb" on B A G
  const notesG = $('notes');
  if (notesG) {
    const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
    notesG.replaceChildren();
    let progress = 0;
    const reward = $('reward');
    const showReward = key => {
      $('reward-text').textContent = I[key];
      if (!edit) $('staff-caption').hidden = true;
      reward.hidden = false;
    };
    const flash = (g, ms) => { g.classList.add('on'); setTimeout(() => g.classList.remove('on'), ms); };
    const noteEls = MELODY.map((n, i) => {
      const g = el('g', { class: 'note', tabindex: '0', role: 'button', 'aria-label': `${I.notes[n.k]} (${n.s.replace('-', '')})` });
      const head = el('ellipse', { class: 'head', cx: n.x, cy: n.y, rx: 10, ry: 7.5 });
      head.style.fill = n.half ? 'var(--surface)' : FILL[n.k];
      if (n.half) { head.style.stroke = FILL[n.k]; head.style.strokeWidth = 4; }
      const name = el('text', { class: 'name', x: n.x, y: 130 }); name.textContent = I.notes[n.k];
      const lyric = el('text', { class: 'lyric', x: n.x, y: 158 }); lyric.textContent = n.s;
      g.append(el('rect', { class: 'hit', x: n.x - 30, y: 8, width: 60, height: 156 }),
        el('line', { class: 'stem', x1: n.x + 9, x2: n.x + 9, y1: n.y, y2: n.y - 46 }), head, name, lyric);
      const tap = async () => {
        flash(g, n.d * BEAT * 1000);
        await load();
        if (!sample(n.k)) tone(n.f, n.d * BEAT);
        progress = i === progress ? progress + 1 : (i === 0 ? 1 : 0);
        if (progress === MELODY.length) { progress = 0; setTimeout(() => showReward('rw.bravo'), 900); }
      };
      g.addEventListener('click', tap);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
      notesG.append(g);
      return g;
    });
    const card = $('staff-card');
    ['pointerenter', 'pointerdown', 'focusin'].forEach(ev => card.addEventListener(ev, load, { once: true }));
    let playing = false;
    $('play').addEventListener('click', async () => {
      if (playing) return;
      playing = true;
      await load();
      const c = audio();
      const at = c ? c.currentTime + 0.05 : 0;
      const whole = sample('mary', at);
      let beat = 0;
      MELODY.forEach((n, i) => {
        if (!whole && c) tone(n.f, n.d * BEAT - 0.03, at + beat * BEAT);
        setTimeout(() => flash(noteEls[i], n.d * BEAT * 1000), (beat * BEAT + 0.05) * 1000);
        beat += n.d;
      });
      setTimeout(() => { playing = false; showReward('rw.listen'); }, (beat * BEAT + 0.6) * 1000);
    });
  }

  // Copy email
  const copy = $('copy');
  if (copy) copy.addEventListener('click', () => {
    const email = $('email');
    const done = () => { copy.textContent = I['contact.copied']; setTimeout(() => { copy.textContent = I['contact.copy']; }, 1600); };
    const select = () => { const r = document.createRange(); r.selectNodeContents(email); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    try { navigator.clipboard.writeText(email.textContent.trim()).then(done, select); } catch (e) { select(); }
  });

  // Mobile booking bar: hidden while the contact section is visible
  const bar = $('mobile-cta');
  const contact = $('contact');
  if (bar && contact && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => bar.classList.toggle('away', e.isIntersecting), { threshold: 0.05 });
    io.observe(contact);
    observers.push(io);
  }

  // Contact form: validation + sending through FormSubmit to Suhsuan's inbox.
  // The very first submission triggers a one-time confirmation email to her address.
  const form = $('contact-form');
  if (!form) return;
  const status = $('form-status');
  const send = $('f-send');
  const checks = [
    { input: $('f-name'), err: $('f-name-err'), ok: v => v.trim().length > 0 },
    { input: $('f-mail'), err: $('f-mail-err'), ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) }
  ];
  const validate = check => {
    const valid = check.ok(check.input.value);
    check.input.setAttribute('aria-invalid', String(!valid));
    check.err.hidden = valid;
    return valid;
  };
  checks.forEach(c => c.input.addEventListener('blur', () => { if (c.input.value) validate(c); }));
  checks.forEach(c => c.input.addEventListener('input', () => { if (c.input.getAttribute('aria-invalid') === 'true') validate(c); }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (edit) return;
    const invalid = checks.filter(c => !validate(c));
    if (invalid.length) {
      status.className = 'status bad';
      status.textContent = I['err.summary'];
      invalid[0].input.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return;
    delete data._honey;
    Object.assign(data, { _subject: 'Atelier Suflé: new lesson request', _template: 'table', _replyto: data.email, _captcha: 'false' });
    send.disabled = true;
    send.textContent = I['f.sending'];
    status.className = 'status';
    status.textContent = '';
    try {
      const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || String(body.success) === 'false') throw new Error(body.message || String(res.status));
      status.className = 'status ok';
      status.textContent = I['f.thanks'];
      form.reset();
    } catch (err) {
      status.className = 'status bad';
      status.textContent = I['f.error'];
    } finally {
      send.disabled = false;
      send.textContent = I['f.send'];
    }
  });
}
