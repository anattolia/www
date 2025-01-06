<script setup lang="ts"></script>

<template>
  <main>
    <h1>En construcción</h1>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/constantes' as *;

.icono,
.logo {
  height: auto;
  margin: 0 auto;
  display: block;
}

.logo {
  width: 60%;
}

.icono {
  margin-top: -20px;
  margin-bottom: 2em;
  display: none;
}

h1 {
  text-align: center;
}

#presentacion {
  overflow: auto;
  margin: 0 10vw;
  padding-right: 1em;
  width: 80vw;
}

.contenedorCentral {
  width: 80vw;
  margin: 0 auto;
  padding-bottom: 7em;
}

.botonesVista {
  margin-top: 2em;
}

.tituloSeccion {
  text-align: center;
}

.botonVista {
  color: var(--magentaCuenco);
  margin: 1em;
  cursor: pointer;
  border: 1px solid var(--azulClaroCuenco);
  border-radius: 5px;
  padding: 0.3em;

  &:hover {
    color: var(--azulClaroCuenco);
  }

  &.activo {
    background-color: var(--azulClaroCuenco);
    color: var(--blanco);
  }
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
