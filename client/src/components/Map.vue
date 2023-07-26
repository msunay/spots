<script setup lang='ts'>
// import { Loader } from "@googlemaps/js-api-loader"
import { ref, onMounted } from "vue";



const center = ref({
    lat: 51.49496781651615,
    lng: -0.1274318650326508
  })
// const loader = new Loader({
//   apiKey: "import.meta.env.VITE_API_KEY",
//   version: "weekly",
//   libraries: ["core", "places", "marker"]
// });

// const mapOptions = {
//   center: {
//     lat: 51.49496781651615,
//     lng: -0.1274318650326508
//   },
//   zoom: 4
// };

// const map = ref(null);

// function initMap() {
//   map.value = new google.maps.Map(document.getElementById('map'), mapOptions)
// }


// loader
//   .importLibrary("maps")
//   .then(({Map}) => {
//     new Map(map, mapOptions);

//   })

// loader.load().then(async () => {
//   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//   map = new Map(document.getElementById("map") as HTMLElement, {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// });
</script>

<template>
  <!-- <div ref="map" id="map">

  </div> -->
  <GMapMap
      :center='center'
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
  >
  </GMapMap>
</template>

<style lang='postcss' scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>