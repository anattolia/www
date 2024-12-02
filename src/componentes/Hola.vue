<script setup lang="ts">
import { onMounted } from 'vue';

/**
 * Entendiendo serviceWorkers🧮
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview
 * https://web.dev/articles/offline-fallback-page?hl=es
 *
 */

// Don't register the service worker
// until the page has fully loaded

onMounted(() => {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  });

  /*   window.addEventListener('load', () => {
    // Is service worker available?
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('Service worker registrado!');
        })
        .catch((error) => {
          console.warn('Error registrando service worker:');
          console.warn(error);
        });
    }
  }); */
});
</script>

<template>
  <h1>Anto web</h1>
</template>

<style lang="scss" scoped></style>
