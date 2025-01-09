<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import type { Web } from '../utilidades/tipos';

const listaWebs: Ref<Web[]> = ref([]);

async function cargarDatosWebs(ruta: string) {
  const peticion = await fetch(`${import.meta.env.BASE_URL}${ruta}`).then((res) => res.json());

  if (peticion.errors) {
    throw new Error(JSON.stringify(peticion.errors, null, 2));
  }

  return peticion as Web[];
}

onMounted(async () => {
  listaWebs.value = await cargarDatosWebs('listadoWebs.json');

  console.log(listaWebs.value);
});
</script>

<template>
  <main>
   <!--  <h1>welcome to my homepage</h1> -->
    <div id="contenedorInicial">
      <div><p>Esta es una web "excéntrica"</p></div>
      <div></div>
    </div>
    <div id="contenido">
    <div id="contenedorNodos">
      <a v-for="web in listaWebs" class="nodo" :class="web.tipo[0]" :href="web.url" target="_blank"></a>
    </div>
    <div id="contenedorLista">
      <ul>
      <li v-for="web in listaWebs" class="" ><a :href="web.url">{{ web.nombre }} </a> <span v-for="tipo in web.tipo">{{ tipo }}</span></li>
    </ul>
    </div>
  </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/constantes' as *;
@import url('https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Jura:wght@300..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
main {
  background-color: #c0fa9f; // rgb(84, 171, 84);
  //background-color: #fede7e; //#ffdd00; #F2E5BD;
  background-image: url('fondo_cielo.jpg');
  //background-color: #e6ccff;
  margin: 0;
  min-height: 100vh;
  font-family: 'Ubuntu', serif;
  font-weight: 300;
  background-attachment: fixed;
   // background-blend-mode: exclusion;
    background-size: cover;
    //background-blend-mode: lighten;
    background-color: #ff0000;
}
#contenedorInicial {
  display: none;
}

#contenido {
  display: flex;
//  background-color: #3b3e3956;
}

#contenedorNodos {
  display: flex;
  flex-wrap: wrap;
  margin-left: 5vw;
    padding: 3em;
    width: 69vw;
}

#contenedorLista {
 // font-family: Courier New, Courier, monospace;
 font-family: "Doto", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings:
    "ROND" 0;
    font-size: .8em;
    background-color: #ff52008f;
   // background-color: #32499487;
    margin: 4em;
    border-radius: 15px;
    height: fit-content;
    margin: 5em 5vw;
    padding: 3em;
    width: 22vw;
li {
  margin-bottom: .5em;
  border-bottom: 1px solid white;
    color: white;
   // list-style: square;
    display: flex;
    justify-content: space-between;
}
a {
  color: rgb(24, 24, 24);
  font-weight: 600;
}
a:visited {
  color: white;
  font-weight: 400;
}
a:hover {
  color: #baffe7;
    text-shadow: 1px 1px 1px #000000;
    font-weight: 900;
}
}

.nodo {
  width: 116px;
  height: 120px;
  //border-radius: 50%;
  //border: white 3px solid;
  margin: 2em 1.5em;
 background-image: url('puertabold.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  
   // background-color: #ffe876;
    padding: 1em;
   // border-radius: 50%;

  &.artist {
  //  background-image: url('p2.png');
    &:hover {
    background-image: url('200.webp');
  }
  }

  &.archive {
  //  background-image: url('p3.png');
    &:hover {
    background-image: url('heart.png');
  }
  }

  &.gaze {
  //  background-image: url('p4.png');
    &:hover {
    background-image: url('200.webp');
  }
  }

  &.community {
  //  background-image: url('p5.png');
    &:hover {
    background-image: url('200.webp');
  }
  }

    &.gaze {
   // background-image: url('p6.png');
    &:hover {
    background-image: url('200.webp');
  }
  }
 
}

@media screen and (min-width: $minTablet) {
}

@media screen and (min-width: $minPantalla) {
}
</style>
