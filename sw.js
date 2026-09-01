/* Kingdom Home service worker.
   Bump CACHE when you change any file, or phones will keep the old copy. */
const CACHE = "kingdom-home-v3";
const SHELL = [
  './', './index.html', './styles.css', './data.js', './practices.js', './app.js', './steps.js',
  './manifest.webmanifest',
  './img/hero.jpg', './img/bg.jpg',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // never cache the Groq or Supabase posts
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;             // fonts and APIs go straight to the network
  if (url.pathname.startsWith('/api/')) return;

  // Network first for the page itself so a redeploy is picked up.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Cache first for the shell, so it opens with no signal.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    }).catch(() => hit))
  );
});
