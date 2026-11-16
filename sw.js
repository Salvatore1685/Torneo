// Service worker minimale: tiene in cache la "scocca" dell'app per aprirla anche con rete lenta.
// I dati del torneo arrivano sempre da Firebase.
const CACHE = 'torneo-v1';
const FILES = ['./', 'index.html', 'firebase-config.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'sfondo.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // prima la rete (cosi' gli aggiornamenti arrivano subito), cache come ripiego
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
