<script setup lang='ts'>
import { useLocationStore } from "@/stores/location";
import { storeToRefs } from "pinia";
import type { Coordinates } from "@/customTypings/Location";
import { ref } from "vue";

const mapInstance = ref({})
const { location } = storeToRefs(useLocationStore());

const watchID = navigator.geolocation.watchPosition(pos => success(pos, map), error => console.log(error))

const emit = defineEmits([])

// onUnmounted(() => {
//   navigator.geolocation.clearWatch(watchID)
// })

let map: google.maps.Map;

initMap(location.value)


async function initMap(center: Coordinates): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: center,
    zoom: 17,
    mapId: '777af55e9dcc2cb5',
    zoomControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  })
}

function success(pos: GeolocationPosition, map: google.maps.Map) {
  const newLocation = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  }
  map.panTo(newLocation);
  mapInstance.value = map;
  console.log(newLocation);
  location.value = newLocation;
}
</script>

<template>
  <div id="map">

  </div>
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