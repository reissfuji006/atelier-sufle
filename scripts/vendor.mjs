// Bundles the third-party code used only by the admin mode into assets/js/vendor/:
// firebase.mjs (Auth, Firestore, Storage) and t2s.mjs (Traditional -> Simplified Chinese).
// Usage: npm run vendor   (run again after updating the firebase or opencc-js versions)
import { build } from 'esbuild';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = join(SITE, 'node_modules/.vendor');
mkdirSync(tmp, { recursive: true });
writeFileSync(join(tmp, 'firebase.js'), `
export { initializeApp } from 'firebase/app';
export { getAuth, connectAuthEmulator, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
export { getFirestore, connectFirestoreEmulator, doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, limit,
  serverTimestamp } from 'firebase/firestore';
export { getStorage, connectStorageEmulator, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
`);
writeFileSync(join(tmp, 't2s.js'), `
import { Converter } from 'opencc-js/t2cn';
export const t2s = Converter({ from: 'tw', to: 'cn' });
`);
for (const name of ['firebase', 't2s']) {
  await build({
    entryPoints: [join(tmp, `${name}.js`)], bundle: true, format: 'esm', minify: true, target: 'es2020',
    outfile: join(SITE, `assets/js/vendor/${name}.mjs`), legalComments: 'eof', logLevel: 'warning'
  });
  console.log('bundled', `assets/js/vendor/${name}.mjs`);
}
