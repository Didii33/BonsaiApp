self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('bonsai-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/app.js',
          '/firebaseConfig.js',
          '/manifest.json',
          '/favicon.ico',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
  });
  