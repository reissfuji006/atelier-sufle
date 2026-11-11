// Atelier Suflé: page entry point.
// 1. Starts the behaviours on the static page.
// 2. Fetches the latest published content from Firestore (REST, no SDK for visitors) and
//    re-renders the page if it is newer than the build.
// 3. Loads the admin module only on a click on "Admin" (footer), on …/#admin, or with an admin session.
import { renderApp, jsData } from './render.mjs';
import { initBehaviors } from './behaviors.mjs';
import config from './firebase-config.js';

const baked = JSON.parse(document.getElementById('i18n').textContent);
const lang = baked.lang;
const root = document.body.dataset.root || '';
const app = document.getElementById('app');

let adminModule = null;
async function openAdmin(action) {
  adminModule ||= await import('./admin.mjs');
  adminModule.start(site, action);
}
function bindLogin() {
  const button = document.getElementById('login-btn');
  if (button) button.addEventListener('click', () => openAdmin('login'));
}

async function fetchLive() {
  if (!config.projectId) return null;
  const base = config.useEmulators ? `http://${config.emulatorHost || '127.0.0.1'}:8080` : 'https://firestore.googleapis.com';
  const res = await fetch(`${base}/v1/projects/${config.projectId}/databases/(default)/documents/site/content`, { cache: 'no-store' });
  if (!res.ok) return null;
  const doc = await res.json();
  const json = doc.fields && doc.fields.json && doc.fields.json.stringValue;
  return json ? JSON.parse(json) : null;
}

// The published content shipped with the site, used when Firestore is empty or not set up.
async function fetchBuilt() {
  const res = await fetch(`${root}content/site.json`, { cache: 'no-store' });
  return res.ok ? res.json() : null;
}

export const site = {
  lang, root, config, baked,
  content: null,
  fetchLive, fetchBuilt,
  render(content, { edit = false } = {}) {
    app.innerHTML = renderApp(content, { lang, root, edit });
    initBehaviors(jsData(content, lang), root, { edit });
    bindLogin();
    document.dispatchEvent(new CustomEvent('sufle:render', { detail: { edit } }));
  }
};
window.SufleSite = site;

initBehaviors(baked, root);
bindLogin();

(async () => {
  try {
    const live = await fetchLive();
    if (live) {
      site.content = live;
      if ((live.meta?.version || 0) > (baked.version || 0)) site.render(live);
    }
  } catch (e) { /* offline or not configured: the static page stays as built */ }
  let resume = false;
  try { resume = localStorage.getItem('sufle-auth') === '1'; } catch (e) {}
  // Suhsuan can bookmark …/#admin to open the login directly.
  if (location.hash === '#admin') openAdmin('login');
  else if (resume) openAdmin('resume');
})();
