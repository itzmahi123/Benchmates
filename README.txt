BENCHMATES PWA SETUP

Files:
- index.html: updated HTML with manifest metadata and service-worker registration
- manifest.json: app name, standalone display, theme, start URL and icon
- sw.js: service worker for app-shell caching and offline fallback

Install into your existing GitHub Pages repository:
1. Replace the existing index.html with this updated index.html.
2. Add manifest.json and sw.js beside index.html in the Benchmates repository root.
3. Keep style.css, script.js, logo.png and the other existing website files in that same root.
4. Commit and push the changes to GitHub Pages.
5. Open https://itzmahi123.github.io/Benchmates/ in Chrome, refresh once, then close and reopen the page.
6. In Chrome, open the three-dot menu and look for "Install app". If Chrome still offers only "Create shortcut", check the browser console and the Application > Manifest / Service Workers panels in DevTools.

Notes:
- The manifest uses the existing logo.png as the app icon. The repository's logo is a 1024x1024 PNG, so Chrome can scale it for launcher use.
- The service worker is scoped to the /Benchmates/ GitHub Pages project path; do not move sw.js into a different folder.
- The service worker provides an offline fallback for the home page and caches available core assets. First installation still needs an internet connection.
