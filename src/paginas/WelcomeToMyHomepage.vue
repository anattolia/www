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
    <h1>welcome to my homepage</h1>
    <div id="contenedorInicial">
      <div><p>Esta es una web "excéntrica"</p></div>
      <div></div>
    </div>
    <div id="contenedorNodos">
    <div v-for="web in listaWebs" class="nodo">{{  }}</div>
</div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/constantes' as *;
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
main {
  //background-color: rgb(84, 171, 84);
  background-color: #e6ccff;
  margin: 0;
  min-height: 100vh;
  font-family: "Ubuntu", serif;
  font-weight: 300;
}
#contenedorInicial {
}

#contenedorNodos {
    display: flex;
    flex-wrap: wrap;
    padding: 3em;
    width: 80vw;
}

.nodo {
    width: 100px;
    height: 150px;
    //border-radius: 50%;
    //border: white 3px solid;
    margin: 2em 1.5em;
    background-image: url('puerta.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;

    &:hover {
      background-image: url('flor.png');
    }
}

@media screen and (min-width: $minTablet) {
}

@media screen and (min-width: $minPantalla) {
}
</style>
