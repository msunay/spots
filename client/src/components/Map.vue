<script setup lang='ts'>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useLocationStore } from "@/stores/location";
import { storeToRefs } from "pinia";

const google = window.google;
// const center = ref({
//   lat: 51,
//   lng: -0.1274318650326508
// })
const { location } = storeToRefs(useLocationStore());



function success(pos: any, map: google.maps.Map) {
  const newLocation = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  }
  map.panTo(newLocation);
  location.value = newLocation;
}

const watchID = navigator.geolocation.watchPosition(pos => success(pos, map), error => console.log(error))




onUnmounted(() => {
  navigator.geolocation.clearWatch(watchID)

})

let map: google.maps.Map
async function initMap(center: any): Promise<void> {

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
  // infoWindow = new google.maps.InfoWindow();

  // const locationButton = document.createElement("button");
  // // addEventListener('click', ())

  // locationButton.textContent = "Current Location";
  // locationButton.classList.add("custom-map-control-button");

  // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

}

initMap(location.value)

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