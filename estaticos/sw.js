// Al incrementar el  OFFLINE_VERSION obligará a lanzar el evento de instalación y
// los caché anteriores serán actualizados desde la red.
// Esta variable está declarada intencionalmente y no se usa.
// Agrega un comentario para tu linter si lo deseas:
// eslint-disable-next-line no-unused-vars
const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
// Modifica esto con una diferente URL si es necesario.
const OFFLINE_URL = 'desconectado.html';

const assetsPredescargados = ['possum1.jpg', 'possum2.jpg', './src/desconectado.ts'];

self.addEventListener('install', (event) => {
  // Precache assets on install
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsPredescargados);
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Al definir {cache: 'reload'} en la nueva consulta asegurará que la
      // respuesta no sea desde el caché de HTTP; i.e., esta será
      // de la red.
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })()
  );
  // Obliga al service worker que espera a que se convierta en uno activo.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Permite la navegación precargada si tiene compatibilidad
      // Mira https://developers.google.com/web/updates/2017/02/navigation-preload
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Le dice al service worker activo que tome el control inmediato de la página.
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Solo queremos llamar al event.respondWith() si es una solicitud de navegación
  // para una página HTML.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Primero, utiliza una respuesta de precarga de navegación.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Siempre usa la red primero.
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // El catch solo se dispara cuando se obtiene una excepción
          // gracias a un error en la red.
          // Si fetch() regresa una respuesta HTTP válida con un código de respuesta en el
          // rango de 4xx o 5xx, el catch() no se llamará
          console.log('Falló el fetch; devolviendo la página desconectada en su lugar.', error);

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }

  // si nuestra condición de if() es falsa, el controlador de fetch no atrapará la
  // solicitud. Si hay más controladores de fetch registrados, ellos tendrán la
  // oportunidad de llamar a event.respondWith(). De lo contrario, si no hay, no se llamará a
  // event.respondWith(), la solicitud será controlada por el buscador como si no
  // los service worker no se hubieran involucrado.
});
