const CACHE_NAME = 'bonsai-app-cache-v1';
const urlsToCache = [
  '/', // Deine Startseite
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/firebaseConfig.js',
  '/app.js',
  '/service-worker.js',
  '/bonsai-form.html',
  '/bonsai-form.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js'
];

// Service Worker Installation
self.addEventListener('install', (event) => {
  console.log('Service Worker installiert');
  // Ressourcen für die Offline-Nutzung cachen
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching wichtige Ressourcen');
        return cache.addAll(urlsToCache)
          .catch((err) => {
            console.error('Fehler beim Caching der Ressourcen:', err);
          });
      })
  );
});

// Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
  console.log('Service Worker aktiviert');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Cache gelöscht: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch-Event für das Abrufen von Ressourcen
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Verhindere das Caching von POST-Anfragen
  if (request.method === 'POST') {
    event.respondWith(fetch(request));
    return;
  }

  // Verhindere das Caching von chrome-extension-URLs
  const requestUrl = new URL(request.url);
  if (requestUrl.protocol === 'chrome-extension:') {
    return;
  }

  // Caching nur für GET-Anfragen
  event.respondWith(
    caches.match(request).then(response => {
      return (
        response ||
        fetch(request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(() => {
      return caches.match(request);
    })
  );
});
