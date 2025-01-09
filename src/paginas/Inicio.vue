<script setup lang="ts"></script>

<template>
  <nav id="menu" ref="menu">
    <RouterLink class="elementoMenu" to="/">Inicio</RouterLink>
    <RouterLink class="elementoMenu" to="/welcomeToMyHomepage"> Welcome to my homepage </RouterLink>
  </nav>
  <h1>En construcción</h1>
  <RouterView />
</template>

<style lang="scss" scoped>
@use '@/scss/constantes' as *;

h1 {
  text-align: center;
}

@media screen and (min-width: $minTablet) {
  #presentacion {
    margin: 0 2em;
    padding-right: 1em;
    width: 40vw;
  }
  .contenedorCentral {
    width: 65vw;
    padding-bottom: 0;
  }

  .icono {
    display: block;
  }
}

@media screen and (min-width: $minPantalla) {
  #presentacion {
    overflow: auto;
    margin-left: 4em;
    padding-right: 1em;
    width: 28vw;
  }
}
</style>
