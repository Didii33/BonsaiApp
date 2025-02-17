// service-worker.js

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
        return cache.addAll(urlsToCache);
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
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Wenn die Ressource im Cache gefunden wird, wird sie verwendet
        return cachedResponse;
      }

      // Andernfalls wird die Anfrage über das Netzwerk ausgeführt
      return fetch(event.request).then((response) => {
        // Speichern der Antwort im Cache, falls sie erfolgreich ist
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch((error) => {
      // Fehlerbehandlung, wenn sowohl das Netzwerk als auch der Cache nicht verfügbar sind
      console.error('Fehler beim Abrufen der Ressource:', error);
      throw error;
    })
  );
});
