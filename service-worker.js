const CACHE_NAME = 'ta-station-v1.6.6';
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
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// STALE-WHILE-REVALIDATE Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Update cache with new version if successful
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Fallback if offline and not in cache
          return cachedResponse;
        });

        // Return cached version immediately, or wait for network if not cached
        return cachedResponse || fetchPromise;
      });
    })
  );
});
