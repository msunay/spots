<script setup lang='ts'>
import { ref, onMounted } from "vue";

// const google = window.google;
const center = ref({
    lat: 51.49496781651615,
    lng: -0.1274318650326508
  })

  let map: google.maps.Map;
  async function initMap(center: any): Promise<void> {

    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: {
    lat: 51.49496781651615,
    lng: -0.1274318650326508
  },
      zoom: 8,
      mapId: '777af55e9dcc2cb5',
      zoomControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });
}

initMap(center);

</script>

<template>
  <div id="map"></div>
</template>

<style lang='postcss' scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}
.vue-map-container {
  height: 100%;
}
</style>