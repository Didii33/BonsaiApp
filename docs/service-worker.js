// Cache-Name und Ressourcen, die während der Installation gecached werden sollen
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
        // Versuche, alle URLs zu cachen und fange Fehler ab
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
  // Entferne alte Caches
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
  const requestUrl = new URL(event.request.url);
  
  // Verhindere, dass URLs mit chrome-extension:// gecached werden
  if (requestUrl.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (response.ok && requestUrl.protocol === 'http:' || requestUrl.protocol === 'https:') {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    }).catch((error) => {
      console.error('Fehler beim Abrufen der Ressource:', error);
      throw error;
    })
  );
});
