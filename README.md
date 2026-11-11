# Atelier Suflé

Website for **Atelier Suflé**: one-to-one flute lessons with Suhsuan Wang in Bonn, Köln and online, in English, German, Traditional and Simplified Chinese.

- Fast static pages (good for Google), hosted free on GitHub Pages.
- Built for one goal: visitors understand the offer in seconds and send Suhsuan an email (big **Email Suhsuan** button, or a 3-field form).
- An **admin mode** on the site itself, invisible to visitors: Suhsuan opens it with the discreet **Admin** link in the footer (or `…/#admin`), logs in (Google or email) and changes texts, photos, lessons, news and sections without touching code.

## How it works

```
content/site.json           All content: texts in 4 languages, photos, lists, sections (source for the build)
assets/js/render.mjs        Draws the page from the content. Shared by the build and the browser
assets/js/main.mjs          Page start: behaviours, loads the latest published content, footer "Admin" link
assets/js/behaviors.mjs     Music staff and flute sound, form, menu, mobile booking bar
assets/js/admin.mjs         Admin login, admin bar and edit mode (loaded only on demand)
assets/js/firebase-config.js  Firebase project settings (empty until set up)
assets/js/vendor/           Firebase SDK and Chinese converter, bundled (npm run vendor)
assets/css/site.css         Site styles;  assets/css/admin.css  admin styles (loaded only on demand)
firebase/*.rules            Security rules for the database and photos
scripts/build.mjs           Builds index.html, de/, zh-hant/, zh-hans/, sitemap.xml, robots.txt
scripts/pull-content.mjs    Copies what was published from the admin mode into content/site.json
.github/workflows/deploy.yml  Pull + build + publish on GitHub Pages (on push, every 3 h, or on demand)
impressum.html, datenschutz.html  Legal pages (German law), edited by hand
```

Publishing flow: Suhsuan clicks **Publish** → the content is saved in Firebase → every visitor sees it at once (the page loads the latest version) → within 3 hours the workflow bakes it into the static pages so Google indexes it too. Every published version is kept and can be restored.

## Admin mode: what Suhsuan can do

After logging in with an admin account, a dark bar appears at the bottom of the page:

- **Edit page**: click any text to change it (titles, biography, lessons, steps, captions, footer…). Texts are per language: switch language in the bar to edit the German or Chinese page. Changes to Traditional Chinese are copied to Simplified Chinese automatically on Publish, unless the Simplified page was edited by hand.
- **Photos**: click a photo to replace it (resized automatically). Add photos to the Music section or to news items.
- **Lists**: add, move (↑ ↓) or remove items in "For", "Lesson length", "Where", "How to start", Music photos and News.
- **Sections**: move, hide/show, or add a new section (title, text, optional photo) anywhere; delete added sections.
- **News & events**: add an item with date, title, text, photo and optional link. Shown newest first; dated items are also given to Google as events. The section (and its menu link) stays hidden from visitors until the first item is published.
- **Settings**: page title and description for Google (per language), contact email, Instagram link.
- **Publish** / **Discard changes** / **History** (restore any of the last 20 published versions). Unpublished work is kept on the device as a draft.

## Admin mode: setup (once, about 20 minutes)

1. Go to <https://console.firebase.google.com>, **Add project** → name `atelier-sufle` (Google Analytics not needed).
2. **Build → Authentication → Get started → Sign-in method**: enable **Google** and **Email/Password**.
   Then **Settings → Authorized domains**: add `reissfuji006.github.io` (and the own domain later).
3. **Build → Firestore Database → Create database**: location **europe-west3 (Frankfurt)**, production mode.
   **Rules** tab: paste the contents of `firebase/firestore.rules` → **Publish**.
4. Still in Firestore, **Data** tab → **Start collection** `admins` → **Document ID**: `hsuan41213@gmail.com` (lowercase) → add one field, e.g. `role` = `admin` → Save. Every email listed here is an admin; nobody can add themselves from the website.
5. **Build → Storage → Get started** (Firebase asks to switch to the pay-as-you-go *Blaze* plan; the free quota covers this site, and you can set a budget alert of 1 €). Location **europe-west3**. **Rules** tab: paste `firebase/storage.rules` → **Publish**.
6. **Project settings (gear) → Your apps → Web (</>)** → register "Atelier Suflé" → copy the shown values into `assets/js/firebase-config.js` (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `appId`) → commit and push.
7. Suhsuan opens the site, clicks **Admin** at the bottom of the page (or bookmarks `…/#admin`) → **Continue with Google** with `hsuan41213@gmail.com`: the admin bar appears. Her first **Publish** creates the online content. Any account that is not listed as admin is told it has no access and signed out; visitors never need an account.

The values in `firebase-config.js` are public by design; the security rules decide who can write. Rules tested: visitors and non-admin accounts cannot publish or upload, an unverified email cannot act as admin even if listed, and nobody can make themselves admin.

## Publish the website (GitHub Pages)

1. Push this folder's contents to the root of a public repository `atelier-sufle`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow runs on every push (and every 3 hours). Site: `https://reissfuji006.github.io/atelier-sufle/` (also `/de/`, `/zh-hant/`, `/zh-hans/`).

## Before going live

1. **Impressum / Datenschutz**: replace every highlighted `[placeholder]` (postal address is required by law). The privacy policy already covers GitHub Pages, FormSubmit and Firebase (content and login); it is a starting point, not legal advice.
2. **Contact form**: requests go to `hsuan41213@gmail.com` through [FormSubmit](https://formsubmit.co). The first submission sends Suhsuan a one-time confirmation link; she must click it.
3. **Proofreading**: Suhsuan should read the German and Chinese texts (she can now fix them herself in admin mode).

## SEO checklist

1. After publishing: **Google Search Console** → add the site → submit `sitemap.xml` (also Bing Webmaster Tools).
2. **Google Business Profile** "Atelier Suflé" (music/flute teacher, service area Bonn and Köln): link the site, add photos, ask students and parents for reviews. Never invent reviews (illegal in Germany, UWG).
3. Site link in the Instagram bio.
4. Own domain (e.g. `ateliersufle.de`): **Settings → Pages → Custom domain**, add it to Firebase *Authorized domains*, change `settings.siteUrl` in `content/site.json`, push.

## For developers

```
npm ci              install build tools
npm run build       build the pages from content/site.json
npm run pull        copy the published content from Firebase into content/site.json
npm run vendor      re-bundle Firebase and the Chinese converter after upgrading them
python3 scripts/make_sound.py assets/audio 2 0.46   regenerate the flute sounds (keep BEAT in behaviors.mjs equal)
```

Local test with Firebase emulators (Java 11+ and `firebase-tools`): `npx firebase-tools emulators:start --only auth,firestore,storage --project demo-sufle`, then serve the folder and set `projectId: 'demo-sufle', useEmulators: true` in `firebase-config.js` (do not commit that).

## Sound

The staff plays *Mary Had a Little Lamb* on B, A, G with a soft recorder-like flute (synthesized by `scripts/make_sound.py`, quiet, little reverb, 130 bpm). Recordings of Suhsuan can replace `assets/audio/*.mp3` (same names).

## Quality checks run before delivery

- Pixel comparison with the earlier version: hero, About, Lessons and Music identical in all languages on phone and desktop.
- End-to-end test against the Firebase emulators: admin login, refusal of non-admin accounts, admin editing, photo upload, sections, publish, visitors see the change, Traditional → Simplified, history restore, and the security rules. Not testable in the build environment: the real Google sign-in window (its network blocks apis.google.com).
- html-validate: no errors. axe-core (WCAG 2.2 AA): no violations on all pages and on the login dialog. Lighthouse (mobile): Performance 94-97, Accessibility 100, Best Practices 100, SEO 100.
