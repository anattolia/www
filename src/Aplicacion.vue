<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Hola from './componentes/Hola.vue';
</script>

<template>
  <nav id="menu" ref="menu">
    <RouterLink class="elementoMenu" to="/">Inicio</RouterLink>
    <RouterLink class="elementoMenu" to="/welcomeToMyHomepage"> Welcome to my homepage </RouterLink>
  </nav>
  <RouterView />
</template>

<style lang="scss" scoped>
#main {
  background-color: yellow;
}
</style>
