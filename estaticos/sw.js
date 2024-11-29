// /sw.js
self.addEventListener('install', (event) => {
  const cachaco = 'Cachaco';

  event.waitUntil(
    caches.open(cachaco).then((cache) => {
      // Agregar todos los assets a un array 'Cachaco'
      // `Cache` instance for later use.
      return cache.addAll(['/icono_512.png']);
    })
  );
});
const cachaco = 'Cachaco';

self.addEventListener('fetch', (event) => {
  // Check if this is a navigation request
  if (event.request.mode === 'navigate') {
    // Open the cache
    event.respondWith(
      caches.open(cachaco).then((cache) => {
        // Go to the network first
        return fetch(event.request.url)
          .then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            // Si la red no está disponible, devuelve
            console.log('No hay internet');
            return cache.match(event.request.url);
          });
      })
    );
  } else {
    return;
  }
});
