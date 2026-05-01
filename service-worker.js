const CACHE_NAME = 'ta-station-v1.8.1';
const ASSETS = [
  'index.html',
  'm/index.html',
  'c/index.html',
  'style.css',
  'config.js',
  'manifest.json',
  'm/manifest.json',
  'c/manifest.json',
  'images/TAStation-1.JPG'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event
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
  // Only handle GET requests for caching
  if (event.request.method !== 'GET') {
    return;
  }

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
