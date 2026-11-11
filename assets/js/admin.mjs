// Atelier Suflé: admin login and edit mode.
// Loaded on demand by main.mjs (click on "Log in", or a remembered session).
//
// Roles
//   Login is reserved for the site owner. Any other account is told it has no access and signed out.
//   admin:  a verified email listed in Firestore /admins/{email}. Gets the admin bar: edit the page
//           in place, replace photos, add/move/remove items and sections, publish, restore versions.
// Data
//   Firestore /site/content  { json, version, updatedAt, by }   published content (public read)
//   Firestore /history/{id}  same fields                         every published version
//   Storage   /media/*                                           uploaded photos (public read)
// Security is enforced by firebase/firestore.rules and firebase/storage.rules, not by this file.
import { sanitize, LANGS, PATHS, LANG_TITLE, LANG_LABEL } from './render.mjs';

// ---------- UI text (login dialog is seen by visitors, so it follows the page language) ----------
const UI = {
  en: {
    login: 'Log in', ownerOnly: 'For the site owner only.', notAdmin: 'This account has no access to the site administration.', logout: 'Log out', close: 'Close', google: 'Continue with Google', or: 'or', email: 'Email',
    password: 'Password', submit: 'Log in', forgot: 'Forgot password?', resetSent: 'A password reset email has been sent.',
    notConfigured: 'Login is not available yet. The site owner still needs to connect it (see README, “Admin mode: setup”).', signedIn: 'Signed in as', error: 'Something went wrong. Please try again.',
    errWrong: 'Email or password is not correct.', errPopup: 'The Google window was closed before signing in.',
    // admin
    admin: 'Admin', edit: 'Edit page', stopEdit: 'Stop editing', publish: 'Publish', discard: 'Discard changes',
    history: 'History', settings: 'Settings', saved: 'Draft saved on this device', unsaved: 'Unpublished changes',
    upToDate: 'Everything is published', publishing: 'Publishing…', published: 'Published. Visitors see the new version now.',
    publishFail: 'Publishing failed. Are you still signed in as admin?', editingLang: 'Editing the page in',
    otherLangs: 'Switch language to edit its text', confirmDiscard: 'Discard all unpublished changes?',
    yes: 'Yes', no: 'No', restore: 'Restore into editor', restored: 'Version restored into the editor. Publish to make it live.',
    noHistory: 'No published versions yet.', uploading: 'Uploading photo…', uploadFail: 'The photo could not be uploaded.',
    remove: 'Remove', up: 'Move up', down: 'Move down', changePhoto: 'Change photo', confirmRemove: 'Remove this item?',
    newItem: 'New item', newText: 'Text', newSection: 'New section', newTitle: 'Title', save: 'Save', cancel: 'Cancel',
    metaTitle: 'Page title (Google)', metaDesc: 'Page description (Google)', instagram: 'Instagram link', handle: 'Instagram name',
    contactEmail: 'Contact email', settingsSaved: 'Settings updated in the draft.', tipEdit: 'Click any text to change it. Click a photo to replace it.'
  },
  de: {
    login: 'Anmelden', ownerOnly: 'Nur für die Inhaberin der Website.', notAdmin: 'Dieses Konto hat keinen Zugang zur Verwaltung der Website.', logout: 'Abmelden', close: 'Schließen', google: 'Mit Google fortfahren', or: 'oder', email: 'E-Mail',
    password: 'Passwort', submit: 'Anmelden', forgot: 'Passwort vergessen?', resetSent: 'Eine E-Mail zum Zurücksetzen wurde gesendet.',
    notConfigured: 'Die Anmeldung ist noch nicht verfügbar. Sie muss erst eingerichtet werden (siehe README).', signedIn: 'Angemeldet als', error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    errWrong: 'E-Mail oder Passwort ist nicht korrekt.', errPopup: 'Das Google-Fenster wurde vor der Anmeldung geschlossen.',
    admin: 'Admin', edit: 'Seite bearbeiten', stopEdit: 'Bearbeiten beenden', publish: 'Veröffentlichen', discard: 'Änderungen verwerfen',
    history: 'Verlauf', settings: 'Einstellungen', saved: 'Entwurf auf diesem Gerät gespeichert', unsaved: 'Unveröffentlichte Änderungen',
    upToDate: 'Alles ist veröffentlicht', publishing: 'Wird veröffentlicht…', published: 'Veröffentlicht. Besucher sehen jetzt die neue Version.',
    publishFail: 'Veröffentlichen fehlgeschlagen. Sind Sie noch als Admin angemeldet?', editingLang: 'Sie bearbeiten die Seite auf',
    otherLangs: 'Sprache wechseln, um deren Text zu bearbeiten', confirmDiscard: 'Alle unveröffentlichten Änderungen verwerfen?',
    yes: 'Ja', no: 'Nein', restore: 'In den Editor laden', restored: 'Version in den Editor geladen. Veröffentlichen, um sie online zu stellen.',
    noHistory: 'Noch keine veröffentlichten Versionen.', uploading: 'Foto wird hochgeladen…', uploadFail: 'Das Foto konnte nicht hochgeladen werden.',
    remove: 'Entfernen', up: 'Nach oben', down: 'Nach unten', changePhoto: 'Foto ändern', confirmRemove: 'Dieses Element entfernen?',
    newItem: 'Neuer Eintrag', newText: 'Text', newSection: 'Neuer Abschnitt', newTitle: 'Titel', save: 'Speichern', cancel: 'Abbrechen',
    metaTitle: 'Seitentitel (Google)', metaDesc: 'Seitenbeschreibung (Google)', instagram: 'Instagram-Link', handle: 'Instagram-Name',
    contactEmail: 'Kontakt-E-Mail', settingsSaved: 'Einstellungen im Entwurf aktualisiert.', tipEdit: 'Klicken Sie auf einen Text, um ihn zu ändern, oder auf ein Foto, um es zu ersetzen.'
  },
  'zh-hant': {
    login: '登入', ownerOnly: '僅供網站管理者使用。', notAdmin: '此帳號沒有網站管理權限。', logout: '登出', close: '關閉', google: '使用 Google 繼續', or: '或', email: '電子郵件',
    password: '密碼', submit: '登入', forgot: '忘記密碼？', resetSent: '重設密碼的電子郵件已寄出。',
    notConfigured: '登入功能尚未開放，網站管理者仍需完成設定（請見 README）。', signedIn: '目前登入：', error: '發生錯誤，請再試一次。',
    errWrong: '電子郵件或密碼不正確。', errPopup: 'Google 視窗在登入前被關閉了。',
    admin: '管理員', edit: '編輯頁面', stopEdit: '結束編輯', publish: '發布', discard: '放棄修改',
    history: '版本紀錄', settings: '設定', saved: '草稿已儲存在此裝置', unsaved: '有尚未發布的修改',
    upToDate: '所有內容都已發布', publishing: '發布中……', published: '已發布，訪客現在會看到新版本。',
    publishFail: '發布失敗。您是否仍以管理員身分登入？', editingLang: '目前編輯的語言：',
    otherLangs: '切換語言即可編輯該語言的文字', confirmDiscard: '要放棄所有尚未發布的修改嗎？',
    yes: '是', no: '否', restore: '載入到編輯器', restored: '已將此版本載入編輯器，按下發布即可上線。',
    noHistory: '目前還沒有已發布的版本。', uploading: '照片上傳中……', uploadFail: '照片無法上傳。',
    remove: '刪除', up: '上移', down: '下移', changePhoto: '更換照片', confirmRemove: '要刪除這個項目嗎？',
    newItem: '新項目', newText: '文字', newSection: '新區塊', newTitle: '標題', save: '儲存', cancel: '取消',
    metaTitle: '網頁標題（Google）', metaDesc: '網頁描述（Google）', instagram: 'Instagram 連結', handle: 'Instagram 名稱',
    contactEmail: '聯絡信箱', settingsSaved: '設定已更新到草稿。', tipEdit: '點擊任何文字即可修改，點擊照片即可更換。'
  }
};
UI['zh-hans'] = {
  ...UI['zh-hant'],
  login: '登录', ownerOnly: '仅供网站管理者使用。', notAdmin: '此账号没有网站管理权限。', logout: '退出登录', close: '关闭', google: '使用 Google 继续', email: '电子邮箱', password: '密码',
  submit: '登录', forgot: '忘记密码？',
  resetSent: '重置密码的邮件已发送。',
  notConfigured: '登录功能尚未开放，网站管理者仍需完成设置（请见 README）。', signedIn: '当前登录：',
  error: '发生错误，请再试一次。', errWrong: '邮箱或密码不正确。',
  errPopup: 'Google 窗口在登录前被关闭了。', admin: '管理员', edit: '编辑页面', stopEdit: '结束编辑', publish: '发布', discard: '放弃修改',
  history: '版本记录', settings: '设置', saved: '草稿已保存在此设备', unsaved: '有尚未发布的修改', upToDate: '所有内容都已发布',
  publishing: '发布中……', published: '已发布，访客现在会看到新版本。', publishFail: '发布失败。您是否仍以管理员身份登录？',
  editingLang: '当前编辑的语言：', otherLangs: '切换语言即可编辑该语言的文字', confirmDiscard: '要放弃所有尚未发布的修改吗？',
  restore: '载入到编辑器', restored: '已将此版本载入编辑器，点击发布即可上线。', noHistory: '目前还没有已发布的版本。',
  uploading: '照片上传中……', uploadFail: '照片无法上传。', remove: '删除', up: '上移', down: '下移', changePhoto: '更换照片',
  confirmRemove: '要删除这个项目吗？', newItem: '新项目', newText: '文字', newSection: '新区块', newTitle: '标题', save: '保存', cancel: '取消',
  metaTitle: '网页标题（Google）', metaDesc: '网页描述（Google）', instagram: 'Instagram 链接', handle: 'Instagram 名称',
  contactEmail: '联系邮箱', settingsSaved: '设置已更新到草稿。', tipEdit: '点击任何文字即可修改，点击照片即可更换。'
};

const DRAFT_KEY = 'sufle-draft';
const ZH_WORDS = [['波昂', '波恩'], ['线上', '在线'], ['联络', '联系'], ['隐私权政策', '隐私政策'], ['视讯', '视频'], ['电子邮件', '电子邮箱']];

let fb, site, U, fbApp, auth, db, storage;
let user = null, role = null, denied = false;
let draft = null, editing = false, base = null;
let authReady;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* private mode */ } }
};
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clone = o => JSON.parse(JSON.stringify(o));
const uid = p => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ---------- Entry ----------
export async function start(s, action) {
  site = s;
  U = UI[site.lang] || UI.en;
  loadCss();
  if (!site.config.projectId) {
    if (action === 'login') openDialog(`<p class="adm-msg">${esc(U.notConfigured)}</p>`);
    store.del('sufle-auth');
    return;
  }
  if (!fbApp) await initFirebase();
  await authReady;
  if (action === 'login') {
    if (user) openAccountDialog(); else openLoginDialog();
  }
}

function loadCss() {
  if (document.querySelector('link[data-admin-css]')) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = `${site.root}assets/css/admin.css`; l.dataset.adminCss = '';
  document.head.append(l);
}

async function initFirebase() {
  fb = await import('./vendor/firebase.mjs');
  const c = site.config;
  fbApp = fb.initializeApp({ apiKey: c.apiKey, authDomain: c.authDomain, projectId: c.projectId, storageBucket: c.storageBucket, appId: c.appId });
  auth = fb.getAuth(fbApp);
  db = fb.getFirestore(fbApp);
  storage = fb.getStorage(fbApp);
  if (c.useEmulators) {
    const host = c.emulatorHost || '127.0.0.1';
    fb.connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
    fb.connectFirestoreEmulator(db, host, 8080);
    fb.connectStorageEmulator(storage, host, 9199);
  }
  authReady = new Promise(resolve => {
    let first = true;
    fb.onAuthStateChanged(auth, async u => {
      user = u;
      role = null;
      if (u) {
        if (await isAdmin(u)) {
          role = 'admin';
          store.set('sufle-auth', '1');
        } else {
          denied = true;
          store.del('sufle-auth');
          await fb.signOut(auth);
          return;
        }
      } else {
        store.del('sufle-auth');
      }
      applyRole();
      if (first) { first = false; resolve(); }
    });
  });
}

async function isAdmin(u) {
  if (!u.email || !u.emailVerified) return false;
  try {
    const snap = await fb.getDoc(fb.doc(db, 'admins', u.email.toLowerCase()));
    return snap.exists();
  } catch (e) { return false; }
}

// ---------- Header state ----------
function applyRole() {
  updateHeader();
  if (role === 'admin') showAdminBar(); else removeAdminBar();
  if (role !== 'admin' && editing) stopEditing();
}
function firstName() {
  const n = user?.displayName || user?.email?.split('@')[0] || '';
  return n.split(/\s+/)[0];
}
// The discreet "Admin" button in the footer shows who is signed in.
function updateHeader() {
  const btn = $('login-btn');
  if (!btn) return;
  if (user && role === 'admin') { btn.title = `${U.signedIn} ${user.email || ''}`; btn.classList.add('signed-in'); }
  else { btn.removeAttribute('title'); btn.classList.remove('signed-in'); }
}
document.addEventListener('sufle:render', () => { if (site) { updateHeader(); if (editing) attachEditing(); } });

// ---------- Dialogs ----------
function openDialog(inner, { wide = false } = {}) {
  closeDialog();
  const d = document.createElement('dialog');
  d.className = `adm-dialog${wide ? ' wide' : ''}`;
  d.id = 'adm-dialog';
  d.innerHTML = `<button type="button" class="adm-x" data-close aria-label="${esc(U.close)}">×</button>${inner}`;
  document.body.append(d);
  d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) closeDialog(); });
  d.addEventListener('close', () => d.remove());
  d.showModal();
  return d;
}
function closeDialog() { const d = $('adm-dialog'); if (d) { d.close(); d.remove(); } }

function authError(e) {
  const c = e?.code || '';
  if (/wrong-password|invalid-credential|user-not-found|invalid-email/.test(c)) return U.errWrong;
  if (/popup-closed|cancelled-popup|popup-blocked/.test(c)) return U.errPopup;
  return U.error;
}

function openLoginDialog() {
  const d = openDialog(`
    <h2 class="adm-title">${esc(U.login)}</h2>
    <p class="adm-msg">${esc(U.ownerOnly)}</p>
    <button type="button" class="btn btn-ghost btn-block adm-google" data-google>
      <svg aria-hidden="true" viewBox="0 0 18 18" width="18" height="18"><path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.5 1.4l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z"/></svg>
      ${esc(U.google)}</button>
    <p class="adm-or"><span>${esc(U.or)}</span></p>
    <form class="adm-form" novalidate>
      <label class="adm-field">${esc(U.email)}<input name="email" type="email" autocomplete="email" required></label>
      <label class="adm-field">${esc(U.password)}<input name="password" type="password" autocomplete="current-password" required minlength="6"></label>
      <p class="adm-error" role="alert"></p>
      <button class="btn btn-block" type="submit">${esc(U.submit)}</button>
    </form>
    <div class="adm-links"><button type="button" class="adm-link" data-forgot>${esc(U.forgot)}</button></div>`);
  const err = d.querySelector('.adm-error');
  const form = d.querySelector('form');
  d.querySelector('[data-google]').addEventListener('click', async () => {
    err.className = 'adm-error'; err.textContent = '';
    try { await fb.signInWithPopup(auth, new fb.GoogleAuthProvider()); await afterSignIn(err); } catch (e) { console.warn('Google sign-in:', e.code || e); err.textContent = authError(e); }
  });
  d.querySelector('[data-forgot]').addEventListener('click', async () => {
    const email = form.email.value.trim();
    if (!email) { err.textContent = U.errWrong; form.email.focus(); return; }
    try { await fb.sendPasswordResetEmail(auth, email); err.className = 'adm-ok'; err.textContent = U.resetSent; } catch (e) { err.textContent = authError(e); }
  });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    err.className = 'adm-error'; err.textContent = '';
    try {
      await fb.signInWithEmailAndPassword(auth, form.email.value.trim(), form.password.value);
      await afterSignIn(err);
    } catch (e2) { err.textContent = authError(e2); }
  });
  d.querySelector('input')?.focus();
}

// Waits until onAuthStateChanged has decided: admin (close the dialog) or no access (explain).
async function afterSignIn(err) {
  for (let i = 0; i < 80 && role !== 'admin' && !denied; i++) await new Promise(r => setTimeout(r, 50));
  if (role === 'admin') { closeDialog(); return; }
  if (denied) { denied = false; err.className = 'adm-error'; err.textContent = U.notAdmin; }
}

function openAccountDialog() {
  const d = openDialog(`
    <h2 class="adm-title">${esc(U.admin)} · ${esc(firstName())}</h2>
    <p class="adm-msg">${esc(U.signedIn)} ${esc(user.email || '')}${role === 'admin' ? ` · ${esc(U.admin)}` : ''}</p>
    <button type="button" class="btn btn-ghost btn-block" data-logout>${esc(U.logout)}</button>`);
  d.querySelector('[data-logout]').addEventListener('click', logout);
}

async function logout() {
  closeDialog();
  if (editing) stopEditing();
  await fb.signOut(auth);
}

// ---------- Admin bar ----------
function showAdminBar() {
  if ($('adm-bar')) { refreshBar(); return; }
  const bar = document.createElement('div');
  bar.id = 'adm-bar';
  bar.className = 'adm-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', U.admin);
  document.body.append(bar);
  document.body.classList.add('adm-on');
  refreshBar();
  if (store.get(DRAFT_KEY)) startEditing();
}
function removeAdminBar() {
  $('adm-bar')?.remove();
  document.body.classList.remove('adm-on');
}
function refreshBar(statusText) {
  const bar = $('adm-bar');
  if (!bar) return;
  const dirty = !!store.get(DRAFT_KEY);
  const langs = LANGS.map(l => `<a href="${site.root}${PATHS[l]}index.html" title="${esc(LANG_TITLE[l])}"${l === site.lang ? ' aria-current="true"' : ''}>${esc(LANG_LABEL[l])}</a>`).join('');
  bar.innerHTML = `
    <div class="adm-bar-in">
      <span class="adm-badge">${esc(U.admin)}</span>
      <span class="adm-status" role="status">${esc(statusText || (dirty ? U.unsaved : U.upToDate))}</span>
      ${editing ? `<span class="adm-langs" title="${esc(U.otherLangs)}"><span class="adm-langs-label">${esc(U.editingLang)}</span> ${langs}</span>` : ''}
      <span class="adm-actions">
        <button type="button" class="adm-btn" data-act="edit">${esc(editing ? U.stopEdit : U.edit)}</button>
        ${editing ? `<button type="button" class="adm-btn" data-act="settings">${esc(U.settings)}</button>` : ''}
        <button type="button" class="adm-btn" data-act="history">${esc(U.history)}</button>
        ${dirty ? `<button type="button" class="adm-btn" data-act="discard">${esc(U.discard)}</button>` : ''}
        <button type="button" class="adm-btn primary" data-act="publish"${dirty ? '' : ' disabled'}>${esc(U.publish)}</button>
        <button type="button" class="adm-btn ghost" data-act="logout">${esc(U.logout)}</button>
      </span>
    </div>`;
  bar.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => ACTIONS[b.dataset.act]()));
  if (statusText && statusText !== U.saved && window.matchMedia('(max-width: 640px)').matches) toast(statusText);
}

const ACTIONS = {
  edit: () => (editing ? stopEditing() : startEditing()),
  publish: () => publish(),
  discard: () => confirmBox(U.confirmDiscard, () => { store.del(DRAFT_KEY); draft = null; stopEditing(); refreshBar(); }),
  history: () => openHistory(),
  settings: () => openSettings(),
  logout: () => logout()
};

function confirmBox(text, onYes) {
  const d = openDialog(`<p class="adm-msg">${esc(text)}</p><div class="adm-row"><button type="button" class="btn" data-yes>${esc(U.yes)}</button><button type="button" class="btn btn-ghost" data-close>${esc(U.no)}</button></div>`);
  d.querySelector('[data-yes]').addEventListener('click', () => { closeDialog(); onYes(); });
}

// ---------- Draft ----------
async function loadBase() {
  base = (await site.fetchLive().catch(() => null)) || site.content || (await site.fetchBuilt());
  return base;
}
async function ensureDraft() {
  if (draft) return draft;
  const saved = store.get(DRAFT_KEY);
  if (saved) { try { draft = JSON.parse(saved); return draft; } catch (e) { store.del(DRAFT_KEY); } }
  draft = clone(await loadBase());
  draft._touched = {};
  return draft;
}
let saveTimer;
function saveDraft(now = false) {
  clearTimeout(saveTimer);
  const write = () => { store.set(DRAFT_KEY, JSON.stringify(draft)); refreshBar(U.saved); };
  if (now) write(); else saveTimer = setTimeout(write, 400);
}
function touch(lang, key) {
  draft._touched ||= {};
  (draft._touched[lang] ||= {})[key] = true;
}
function setText(key, value, lang = site.lang) {
  (draft.i18n[lang] ||= {})[key] = value;
  touch(lang, key);
  // Languages that have not been written yet for a new item follow this text.
  const auto = draft._auto?.[key];
  if (auto) {
    const own = auto.indexOf(lang);
    if (own > -1) auto.splice(own, 1);
    for (const l of auto) { draft.i18n[l][key] = value; touch(l, key); }
    if (!auto.length) delete draft._auto[key];
  }
}
// New items start with the same text in every language; each language then follows the first edits
// until it is edited on its own page.
function setAll(key, value) {
  for (const l of LANGS) { (draft.i18n[l] ||= {})[key] = value; touch(l, key); }
  (draft._auto ||= {})[key] = [...LANGS];
}

// ---------- Edit mode ----------
async function startEditing() {
  await ensureDraft();
  editing = true;
  rerender();
  refreshBar();
  toast(U.tipEdit);
}
function stopEditing() {
  editing = false;
  const content = draft || site.content || base;
  if (content) site.render(stripPrivate(content));
  refreshBar();
}
function rerender() {
  const y = window.scrollY;
  site.render(draft, { edit: true });
  window.scrollTo(0, y);
}

// Turns contenteditable HTML into the small allowed subset (em, strong, br, a).
function cleanEditable(html) {
  let s = html.replace(/&nbsp;/g, ' ');
  s = s.replace(/<(div|p)[^>]*>/gi, '<br>').replace(/<\/(div|p)>/gi, '');
  s = s.replace(/<(?!\/?(em|strong|br|a)\b)[^>]*>/gi, '');
  s = s.replace(/<(em|strong|br)\b[^>]*>/gi, '<$1>');
  s = s.replace(/(<br>\s*){3,}/g, '<br><br>').replace(/^(\s*<br>)+|(<br>\s*)+$/g, '').trim();
  return sanitize(s);
}

function attachEditing() {
  const app = $('app');
  // Text
  app.querySelectorAll('[data-k]').forEach(el => {
    const single = /^(H1|H2|H3|H4|SPAN|B|DT|DD|FIGCAPTION|LABEL)$/.test(el.tagName);
    el.addEventListener('input', () => { setText(el.dataset.k, cleanEditable(el.innerHTML)); saveDraft(); });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); if (!single) document.execCommand('insertLineBreak'); }
    });
    el.addEventListener('paste', e => {
      e.preventDefault();
      document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
    });
    el.addEventListener('click', e => { if (el.closest('a')) e.preventDefault(); });
  });
  // Plain fields (minutes, news date and link)
  app.querySelectorAll('[data-field]').forEach(el => {
    const ev = el.tagName === 'INPUT' ? 'change' : 'input';
    el.addEventListener(ev, () => {
      const [, list, id, field] = el.dataset.field.split('.');
      const it = draft.lists[list].find(i => i.id === id);
      if (!it) return;
      it[field] = el.tagName === 'INPUT' ? el.value.trim() : el.textContent.trim();
      saveDraft();
      if (field === 'date') rerender();
    });
  });
  // Photos
  app.querySelectorAll('[data-img]').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', U.changePhoto);
    el.dataset.label = U.changePhoto;
    const pick = e => { e.preventDefault(); e.stopPropagation(); choosePhoto(file => uploadAndSet(el.dataset.img, file)); };
    el.addEventListener('click', pick);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') pick(e); });
  });
  // List items: move and remove
  app.querySelectorAll('[data-item]').forEach(el => {
    const [list, id] = el.dataset.item.split(':');
    const tools = document.createElement('span');
    tools.className = 'adm-tools';
    tools.innerHTML = `<button type="button" data-m="-1" title="${esc(U.up)}" aria-label="${esc(U.up)}">↑</button><button type="button" data-m="1" title="${esc(U.down)}" aria-label="${esc(U.down)}">↓</button><button type="button" data-rm title="${esc(U.remove)}" aria-label="${esc(U.remove)}">✕</button>`;
    tools.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      e.preventDefault(); e.stopPropagation();
      const arr = draft.lists[list];
      const i = arr.findIndex(x => x.id === id);
      if (b.dataset.rm !== undefined) return confirmBox(U.confirmRemove, () => { arr.splice(i, 1); dropKeys(list, id); saveDraft(true); rerender(); });
      const j = i + Number(b.dataset.m);
      if (j < 0 || j >= arr.length) return;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      saveDraft(true); rerender();
    });
    el.classList.add('adm-item');
    el.prepend(tools);
  });
  // Add buttons
  app.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => addItem(b.dataset.add)));
  // Sections
  app.querySelectorAll('.adm-secbar').forEach(bar => {
    const id = bar.dataset.sec;
    bar.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const secs = draft.sections;
      const i = secs.findIndex(s => s.id === id);
      if (b.dataset.secmove) {
        const j = i + Number(b.dataset.secmove);
        if (j < 0 || j >= secs.length) return;
        [secs[i], secs[j]] = [secs[j], secs[i]];
      } else if (b.dataset.sechide !== undefined) {
        secs[i].hidden = !secs[i].hidden;
      } else if (b.dataset.secdel !== undefined) {
        return confirmBox(U.confirmRemove, () => { secs.splice(i, 1); delete draft.custom[id]; dropKeys('custom', id); saveDraft(true); rerender(); });
      } else if (b.dataset.secadd !== undefined) {
        const nid = uid('s');
        secs.splice(i + 1, 0, { id: nid, type: 'custom', hidden: false });
        (draft.custom ||= {})[nid] = { image: null };
        setAll(`custom.${nid}.label`, U.newSection);
        setAll(`custom.${nid}.title`, U.newTitle);
        setAll(`custom.${nid}.text`, U.newText);
      }
      saveDraft(true); rerender();
    });
  });
}

const KEY_PREFIX = { who: 'who', places: 'where', steps: 'step', musicPhotos: 'photo', news: 'news', custom: 'custom' };
function dropKeys(list, id) {
  const p = KEY_PREFIX[list];
  if (!p) return;
  for (const l of Object.keys(draft.i18n)) for (const k of Object.keys(draft.i18n[l])) {
    if (k === `${p}.${id}` || k.startsWith(`${p}.${id}.`)) delete draft.i18n[l][k];
  }
}

function addItem(list) {
  const arr = draft.lists[list];
  const id = uid('i');
  if (list === 'who') { arr.push({ id }); setAll(`who.${id}.t`, U.newItem); setAll(`who.${id}.p`, U.newText); }
  else if (list === 'lengths') { arr.push({ id, minutes: '90' }); }
  else if (list === 'places') { arr.push({ id }); setAll(`where.${id}`, U.newItem); setAll(`where.${id}.mode`, U.newText); }
  else if (list === 'steps') { arr.push({ id }); setAll(`step.${id}.t`, U.newItem); setAll(`step.${id}.p`, U.newText); }
  else if (list === 'news') {
    arr.push({ id, date: new Date().toISOString().slice(0, 10), image: null, link: '' });
    setAll(`news.${id}.title`, U.newTitle); setAll(`news.${id}.text`, U.newText);
  } else if (list === 'musicPhotos') {
    return choosePhoto(async file => {
      const img = await upload(file); if (!img) return;
      arr.push({ id, image: img }); setAll(`photo.${id}.alt`, ''); setAll(`photo.${id}.cap`, U.newText);
      saveDraft(true); rerender();
    });
  }
  saveDraft(true); rerender();
}

// ---------- Photos ----------
function choosePhoto(onFile) {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  input.addEventListener('change', () => { if (input.files[0]) onFile(input.files[0]); });
  input.click();
}
// Resizes to at most 1800 px on the long side and encodes WebP (JPEG where WebP encoding is unavailable).
async function resize(file, max = 1800) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(bmp, 0, 0, w, h);
  let blob = await new Promise(r => canvas.toBlob(r, 'image/webp', 0.82));
  if (!blob || blob.type !== 'image/webp') blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.85));
  return { blob, w, h };
}
async function upload(file) {
  toast(U.uploading, 0);
  try {
    const { blob, w, h } = await resize(file);
    const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
    const r = fb.ref(storage, `media/${uid('p')}.${ext}`);
    await fb.uploadBytes(r, blob, { contentType: blob.type, cacheControl: 'public, max-age=31536000, immutable' });
    const src = await fb.getDownloadURL(r);
    toast('');
    return { src, w, h };
  } catch (e) {
    console.error(e);
    toast(U.uploadFail);
    return null;
  }
}
async function uploadAndSet(path, file) {
  const img = await upload(file);
  if (!img) return;
  const parts = path.split('.');
  if (parts[0] === 'images') draft.images[parts[1]] = img;
  else if (parts[0] === 'lists') { const it = draft.lists[parts[1]].find(i => i.id === parts[2]); if (it) it.image = img; }
  else if (parts[0] === 'custom') (draft.custom[parts[1]] ||= {}).image = img;
  saveDraft(true);
  rerender();
}

// ---------- Settings (texts for Google, contact links) ----------
function openSettings() {
  const L = draft.i18n[site.lang] || {};
  const plain = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  const d = openDialog(`
    <h2 class="adm-title">${esc(U.settings)} · ${esc(LANG_TITLE[site.lang])}</h2>
    <form class="adm-form">
      <label class="adm-field">${esc(U.metaTitle)}<input name="title" value="${esc(plain(L['meta.title']))}" maxlength="70"></label>
      <label class="adm-field">${esc(U.metaDesc)}<textarea name="desc" rows="3" maxlength="170">${esc(plain(L['meta.desc']))}</textarea></label>
      <label class="adm-field">${esc(U.contactEmail)}<input name="email" type="email" value="${esc(draft.settings.email)}"></label>
      <label class="adm-field">${esc(U.instagram)}<input name="instagram" type="url" value="${esc(draft.settings.instagram)}"></label>
      <label class="adm-field">${esc(U.handle)}<input name="handle" value="${esc(draft.settings.instagramHandle)}"></label>
      <div class="adm-row"><button class="btn" type="submit">${esc(U.save)}</button><button class="btn btn-ghost" type="button" data-close>${esc(U.cancel)}</button></div>
    </form>`, { wide: true });
  d.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    setText('meta.title', esc(f.title.value.trim()));
    setText('meta.desc', esc(f.desc.value.trim()));
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) draft.settings.email = f.email.value.trim();
    if (/^https:\/\//.test(f.instagram.value.trim())) draft.settings.instagram = f.instagram.value.trim();
    draft.settings.instagramHandle = f.handle.value.trim();
    saveDraft(true); closeDialog(); rerender(); toast(U.settingsSaved);
  });
}

// ---------- Publish and history ----------
function stripPrivate(c) { const o = clone(c); delete o._touched; delete o._auto; return o; }

async function publish() {
  if (!draft) return;
  refreshBar(U.publishing);
  try {
    // Simplified Chinese follows Traditional for every text changed in Traditional only.
    const hant = draft._touched?.['zh-hant'] || {};
    const hans = draft._touched?.['zh-hans'] || {};
    const toConvert = Object.keys(hant).filter(k => !hans[k]);
    if (toConvert.length) {
      const { t2s } = await import('./vendor/t2s.mjs');
      for (const k of toConvert) {
        const v = draft.i18n['zh-hant'][k];
        if (v !== undefined) draft.i18n['zh-hans'][k] = ZH_WORDS.reduce((s, [a, b]) => s.split(a).join(b), t2s(v));
      }
    }
    const content = stripPrivate(draft);
    content.meta = { version: Date.now(), updatedAt: new Date().toISOString(), by: user.email };
    const payload = { json: JSON.stringify(content), version: content.meta.version, updatedAt: fb.serverTimestamp(), by: user.email };
    await fb.setDoc(fb.doc(db, 'site', 'content'), payload);
    await fb.addDoc(fb.collection(db, 'history'), payload);
    store.del(DRAFT_KEY);
    draft = null;
    site.content = content;
    editing = false;
    site.render(content);
    refreshBar(U.published);
  } catch (e) {
    console.error(e);
    refreshBar(U.publishFail);
  }
}

async function openHistory() {
  const d = openDialog(`<h2 class="adm-title">${esc(U.history)}</h2><div class="adm-history">…</div>`, { wide: true });
  try {
    const snap = await fb.getDocs(fb.query(fb.collection(db, 'history'), fb.orderBy('version', 'desc'), fb.limit(20)));
    const rows = [];
    snap.forEach(s => rows.push(s.data()));
    const fmt = v => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(v));
    d.querySelector('.adm-history').innerHTML = rows.length
      ? `<ol>${rows.map((r, i) => `<li><span>${esc(fmt(r.version))}<small>${esc(r.by || '')}</small></span><button type="button" class="adm-btn" data-i="${i}">${esc(U.restore)}</button></li>`).join('')}</ol>`
      : `<p class="adm-msg">${esc(U.noHistory)}</p>`;
    d.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => {
      draft = JSON.parse(rows[Number(b.dataset.i)].json);
      draft._touched = {};
      saveDraft(true);
      closeDialog();
      editing = true;
      rerender();
      refreshBar(U.restored);
    }));
  } catch (e) {
    d.querySelector('.adm-history').innerHTML = `<p class="adm-msg">${esc(U.error)}</p>`;
  }
}

// ---------- Toast ----------
let toastTimer;
function toast(text, ms = 4000) {
  let t = $('adm-toast');
  if (!text) { t?.remove(); return; }
  if (!t) { t = document.createElement('div'); t.id = 'adm-toast'; t.className = 'adm-toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = text;
  clearTimeout(toastTimer);
  if (ms) toastTimer = setTimeout(() => t.remove(), ms);
}
