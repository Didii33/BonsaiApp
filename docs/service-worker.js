self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('bonsai-cache-v2').then((cache) => {  // Verwende eine neue Cache-Version
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
  
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['bonsai-cache-v2'];  // Definiere hier die neuen Cache-Namen
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
  