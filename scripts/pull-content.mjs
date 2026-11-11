// Downloads the published content from Firestore into content/site.json, so the static pages
// (and Google) get every change made in the admin mode. Used by the deploy workflow before the build.
// Usage: npm run pull
//   FIREBASE_PROJECT_ID overrides the project from assets/js/firebase-config.js
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 reads from the local emulator instead
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../assets/js/firebase-config.js';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(SITE, 'content/site.json');
const project = process.env.FIREBASE_PROJECT_ID || config.projectId;
if (!project) {
  console.log('No Firebase project configured: content/site.json is kept as is.');
  process.exit(0);
}
const host = process.env.FIRESTORE_EMULATOR_HOST ? `http://${process.env.FIRESTORE_EMULATOR_HOST}` : 'https://firestore.googleapis.com';
const res = await fetch(`${host}/v1/projects/${project}/databases/(default)/documents/site/content`);
if (res.status === 404) {
  console.log('Nothing published from the admin mode yet: content/site.json is kept as is.');
  process.exit(0);
}
if (!res.ok) {
  console.error(`Could not read the published content (HTTP ${res.status}).`);
  process.exit(1);
}
const doc = await res.json();
const live = JSON.parse(doc.fields.json.stringValue);
const local = JSON.parse(readFileSync(file, 'utf8'));
if ((live.meta?.version || 0) <= (local.meta?.version || 0)) {
  console.log(`content/site.json is up to date (version ${local.meta?.version}).`);
} else {
  writeFileSync(file, JSON.stringify(live, null, 1) + '\n');
  console.log(`content/site.json updated to version ${live.meta.version} (published ${live.meta.updatedAt} by ${live.meta.by}).`);
}
