navigator.serviceWorker.register('/docs/service-worker.js')
  .then(registration => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  })
  .catch(err => {
    console.log('ServiceWorker registration failed: ', err);
  });


  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('bonsai-cache').then((cache) => {
        return cache.addAll([
          '/docs/',
          '/docs/index.html',
          '/docs/style.css',
          '/docs/app.js',
          '/docs/firebaseConfig.js',
          '/docs/manifest.json',
          '/docs/favicon.ico',
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
  