<script setup lang="ts"></script>

<template>
  <div id="contenedorInicio">
    <h1>Antonia Bustamante</h1>
    <div id="contenedor_bio">
      <p class="columna">
        Coder and sound engineer based in Bogotá (Colombia). My creative practice focuses on a critical and practical
        understanding of the intersection of arts and technologies. I am interested in collective ways of working,
        listening practices, and experimental and local ways of using technologies. Currently, I am studying for an MA
        in Philosophy and work mixing live music, teaching, researching, and developing web projects.
      </p>
      <p class="columna">
        Soy programadora e ingeniera de sonido de Bogotá (Colombia). Mi práctica creativa se centra en la comprensión
        crítica y práctica de la intersección entre las artes y las tecnologías. Me interesan las formas colectivas de
        trabajo, las prácticas de escucha y las formas experimentales y locales de utilizar las tecnologías.
        Actualmente, estudio una maestría en Filosofía y trabajo mezclando música en vivo, enseñando, investigando y
        desarrollando proyectos web.  **
      </p>
    </div>
    <nav id="menu" ref="menu">
      <RouterLink class="elementoMenu" to="/">Inicio</RouterLink>
      <RouterLink class="elementoMenu" to="/welcomeToMyHomepage"> Welcome to my homepage </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/constantes' as *;

h1 {
  text-align: center;
}

#menu {
  display: flex;
  margin: 4em;
  justify-content: flex-start;

  a {
    margin-right: 2em;
  }
  a:hover {
    color: red;
  }
}

#contenedorInicio {
  margin: 0;
  background-color: #ffe57b;
  padding: 1em 20vw;
  font-family: monospace;
  min-height: 100vh;
}

#contenedor_bio {
  display: flex;
  flex-direction: column;
  margin-top: 0em;
  .columna {
    margin: 1em 1em;
  }
}

@media screen and (min-width: $minTablet) {
  #contenedor_bio {
    display: flex;
    flex-direction: row;

    margin-top: 3em;
    .columna {
      margin: 0 4em;
    }
  }
}

@media screen and (min-width: $minPantalla) {
}
</style>
