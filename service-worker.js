var CACHE_NAME = 'ta-station-v1.9.6';
var ASSETS = [
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
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; }).map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// STALE-WHILE-REVALIDATE Strategy
self.addEventListener('fetch', function(event) {
  // Only handle GET requests for caching
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(cachedResponse) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          // Update cache with new version if successful
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })['catch'](function() {
          // Fallback if offline and not in cache
          return cachedResponse;
        });

        // Return cached version immediately, or wait for network if not cached
        return cachedResponse || fetchPromise;
      });
    })
  );
});
