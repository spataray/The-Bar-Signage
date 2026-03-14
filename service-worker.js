const CACHE_NAME = 'ta-station-v1.1.0';
const ASSETS = [
  'index.html',
  'maintenance.html',
  'customer.html',
  'config.js',
  'style.css',
  'manifest.json',
  'manifest-remote.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
