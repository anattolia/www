<script setup lang="ts">
/* POR HACER: 
- Probar otras fuentes para los textos
- Menú con info
- A cada enlace asignarle un gif?
- Ir haciendo aparecer las puertas?
- enlaces: https://www.welcometomyhomepage.net/about-residency
- https://www.welcometomyhomepage.net/apply
*/

import { onMounted, ref, Ref } from 'vue';
import type { Web } from '../utilidades/tipos';

const listaWebs: Ref<Web[]> = ref([]);
const botonAnterior: Ref<HTMLElement | undefined> = ref(undefined);
const botonSiguiente: Ref<HTMLElement | undefined> = ref(undefined);
const colEsp: Ref<HTMLElement | undefined> = ref(undefined);
const colEng: Ref<HTMLElement | undefined> = ref(undefined);
const contenedorInicial: Ref<HTMLElement | undefined> = ref(undefined);

const textosEspInicio = [
  'Este es un sitio excéntrico, un sitio que sale de sí mismo.',
  'Es un mapa,',
  'una colección de alegrías,',
  'una guía de navegación por mis rincones preferidos de Internet.',
  'Es un ejercicio para pensar la web como territorio.',
  '----------------',
  'Si los territorios son actos,',
  'modos de habitar,',
  'maneras de hacer mundo,',
  '¿Cuál es la potencia de los hipervínculos?',
  '[la potencia expresiva, afectiva]',
  '¿A dónde nos llevan?',
  '----------------',
  'Este es un sitio excéntrico',
  'que no quiere quedarse encerrado en enlaces concéntricos',
  'que solo apunten a sí mismos.',
  'Que no quiere mirarse el ombligo',
  'ni llevar hacia el centro de megalópolis virtuales',
  'que lo devoran todo.',
  'En cambio, quiere que sus visitantes',
  'salgan expulsadxs hacia otros mundos,',
  'hacia otras rutas que les lleven a saltar de aquí para allá',
  '[como en los buenos tiempos de Internet, la época dorada del compartir],',
  'a descubrir, a enlazar, a hiper-vincular.',
  '----------------',
  'En español la palabra "link" puede traducirse como "vínculo".',
  '"Hyperlink" es "hipervínculo".',
  '"Vínculo" tiene una connotación afectiva.',
  'Un vínculo une o ata una cosa con otra',
  'pero también una persona con otra.',
  '----------------',
  'En inglés un "link" es algo que conecta',
  'y es también es uno de los anillos de una cadena',
  '[más parecido a "enlace" o a "eslabón", en español],',
  'relaciona cosas entre sí,',
  'no "es" totalmente en sí mismo,',
  '"es" en su relación con otros.',
];
const textosEngInicio = [
  'This is an eccentric site, a site that goes out of itself.',
  'It is a map,',
  'a collection of joys,',
  'a navigation guide through my favorite corners of the Internet.',
  'It is an exercise of thinking about the web as a territory.',
  '----------------',
  'If territories are acts,',
  'ways of living,',
  'ways of making worlds,',
  'what is the power of hyperlinks?',
  '[the expressive, affective power]',
  'Where do they take us?',
  '----------------',
  'This is an eccentric site',
  'that does not want to remain locked in concentric links',
  'that only point to themselves.',
  'It is not interested in navel-gazing,',
  'nor lead to the center of virtual megalopolises',
  'that devour everything.',
  'Instead, it wants its visitors',
  'to get expelled to other worlds,',
  'to other paths where they can jump from here to there,',
  '[like in the good old days of the Internet, those golden times of sharing],',
  'to discover, to link, to hyper-link.',
  '----------------',
  'In Spanish the word "link" can be translated as "vínculo".',
  '"Hyperlink" is "hipervínculo".',
  '"Vínculo" has an affective connotation.',
  'A link ("vínculo") unites or ties one thing with another,',
  'but also one person with another.',
  '----------------',
  'In English a "link" is something that connects,',
  'and it is also one of the rings of a chain,',
  '[more similar to "enlace" or "eslabón", in Spanish],',
  'it relates things to each other,',
  'it is not "totally" in itself,',
  '"it is" in its relationship with others.',
];
let frase = 1;

async function cargarDatosWebs(ruta: string) {
  const peticion = await fetch(`${import.meta.env.BASE_URL}${ruta}`).then((res) => res.json());

  if (peticion.errors) {
    throw new Error(JSON.stringify(peticion.errors, null, 2));
  }

  return peticion as Web[];
}

function cambiarTexto(boton: string, i: number) {
  if (boton === 'anterior' && i >= 0) {
    console.log(i);
    if (!colEsp.value || !colEng.value) return;
    colEsp.value.innerText = textosEspInicio[i];
    colEng.value.innerText = textosEngInicio[i];
    frase--;
  }
  if (boton === 'siguiente' && i < textosEngInicio.length) {
    if (!colEsp.value || !colEng.value) return;
    colEsp.value.innerText = textosEspInicio[i];
    colEng.value.innerText = textosEngInicio[i];
    console.log(i);
    frase++;
  } else if (boton === 'siguiente' && i === textosEngInicio.length) {
    if (!contenedorInicial.value) return;
    contenedorInicial.value.style.display = 'none';
  }
}

//function revelarPuerta() {}

onMounted(async () => {
  listaWebs.value = await cargarDatosWebs('listadoWebs.json');
  if (!colEsp.value || !colEng.value) return;
  colEsp.value.innerText = textosEspInicio[0];
  colEng.value.innerText = textosEngInicio[0];
  console.log(listaWebs.value);
});
</script>

<template>
  <main>
    <!--  <h1>welcome to my homepage</h1> -->
    <div ref="contenedorInicial" id="contenedorInicial">
      <div ref="botonAnterior" class="boton" @click="cambiarTexto('anterior', frase)"><</div>
      <div id="contenedorColumnas">
        <div class="columna" ref="colEsp"></div>
        <div class="columna" ref="colEng"></div>
      </div>
      <div ref="botonSiguiente" class="boton" @click="cambiarTexto('siguiente', frase)">></div>
    </div>
    <div id="contenido">
      <div id="contenedorNodos">
        <a v-for="web in listaWebs" class="nodo" :class="web.tipo[0]" :href="web.url" target="_blank">
          <p class="descripcionPuerta">{{ web.descripcionEng }}</p>
        </a>
      </div>
      <div id="contenedorLista">
        <ul>
          <li v-for="web in listaWebs" class="">
            <a :href="web.url">{{ web.nombre }} </a> <span v-for="tipo in web.tipo" class="tipo">{{ tipo }}</span>
          </li>
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
  background-image: url('/estaticos/fondo_cielo.jpg');
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
  align-items: center;
  border-radius: 15px;
  display: flex;
  //font-family: Doto, serif;
  font-family: monospace;
  font-size: 0.9em;
  height: -moz-fit-content;
  justify-content: space-between;
  left: 4vw;
  padding: 2em 0;
  position: fixed;
  top: 0vh;
  width: 63vw;

  #contenedorColumnas {
    display: flex;
  }

  .columna {
    background-color: hsla(0, 0%, 100%, 0.7);
    border-radius: 5px;
    box-shadow: 2px 2px 3px #fff;
    font-size: 1.1em;
    margin: 1.5em 1em;
    padding: 1px 1em;
    text-align: center;
    width: 23vw;
  }

  .boton {
    cursor: pointer;
    background-color: hsla(0, 0%, 100%, 0.7);
    padding: 0.5em 0.7em;
    border-radius: 50%;

    &:hover {
      color: white;
    }
  }
}

#contenido {
  display: flex;
  //  background-color: #3b3e3956;
}

#contenedorNodos {
  display: flex;
  flex-wrap: wrap;
  margin-left: 5vw;
  padding: 8em 3em;
  width: 75vw;
}

#contenedorLista {
  // font-family: Courier New, Courier, monospace;
  font-family: 'Doto', serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: 'ROND' 0;
  font-size: 0.8em;
  background-color: #ff52008f;
  // background-color: #32499487;
  margin: 4em;
  border-radius: 15px;
  height: fit-content;
  margin: 5em 5vw;
  padding: 3em;
  width: 22vw;
  li {
    margin-bottom: 0.5em;
    border-bottom: 1px solid white;
    color: white;
    //list-style: square;
    display: flex;
    justify-content: space-between;
  }
  a {
    color: rgb(24, 24, 24);
    font-weight: 600;
    flex-basis: 65%;
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
  .tipo {
    font-size: 0.9em;
  }
}

.nodo {
  width: 116px;
  height: 120px;
  border-radius: 16px;
  //border-radius: 50%;
  //border: white 1px solid;
  margin: 1em 0.7em;
  background-image: url('/estaticos/puertabold.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;

  .descripcionPuerta {
    background-color: rgba(255, 82, 0, 0.561);
    border-radius: 16px;
    color: #fff;
    display: block;
    font-family: Doto, serif;
    font-size: 0.8em;
    font-weight: 600;
    margin: 0 auto;
    opacity: 0;
    padding: 1em;
    text-align: center;
    height: 116px;
    width: 120px;
  }

  &:hover {
    background-image: none;
    .descripcionPuerta {
      opacity: 1;
    }
  }

  /* &.artist {
    &:hover {
      background-image: url('/estaticos/200.webp');
    }
  }

  &.archive {
    &:hover {
      background-image: url('/estaticos/heart.png');
    }
  }

  &.gaze {
    &:hover {
      background-image: url('/estaticos/200.webp');
    }
  }

  &.community {
    &:hover {
      background-image: url('/estaticos/synchronized_cats.gif');
    }
  }

  &.gaze {
    &:hover {
      background-image: url('/estaticos/200.webp');
    }
  } */
}

@media screen and (min-width: $minTablet) {
}

@media screen and (min-width: $minPantalla) {
}
</style>
