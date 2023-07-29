<script setup lang='ts'>
import { useLocationStore } from "@/stores/location";
import { storeToRefs } from "pinia";
import type { Coordinates, LocationType } from "@/customTypings/Location";
import { onMounted, ref } from "vue";
import { getLondonSpots } from "@/ApiService";
import locationIcon from './icons/locationIcon.svg'

const mapInstance = ref({})
const { location } = storeToRefs(useLocationStore());

let map: google.maps.Map;
let currentMarker: google.maps.Marker;

// getPosition().then(pos => {
//   success(pos, map)
// })

const watchID = navigator.geolocation.watchPosition(pos => success(pos, map), error => console.log(error))

const emit = defineEmits([])

initMap(location.value)
// onUnmounted(() => {
//   navigator.geolocation.clearWatch(watchID)
// })




async function initMap(center: Coordinates): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 15,
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

  const { lat, lng } = center;
  // const svgMarker = {

  // }
  // const pinAnchor = new google.maps.Point(23, 47);
  // var pin = new google.maps.Mar({ iconUrl: "Images/Map-Marker-Push-Pin-Right-Green.png", iconAnchor: pinAnchor });
  currentMarker = new google.maps.Marker({
    position: {
      lat,
      lng
    },
    map,
    icon: {
      path: "%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' width='50px' viewBox='0 0 1000 1000' enable-background='new 0 0 1000 1000' xml:space='preserve'%3E%3Cg transform='translate(500, 500)'%3E%3Ccircle fill='%23FDFEFF' cx='0' cy='0' r='200' /%3E%3Ccircle fill='%233E8CF9' cx='0' cy='0' r='150'%3E%3CanimateTransform attributeName='transform' attributeType='XML' type='scale' values='1.1;0.7;1.1' keyTimes='0;0.5;1' dur='2s' repeatCount='indefinite' calcMode='spline' keySplines='0.42 0 0.58 1; 0.42 0 0.58 1' transform-origin='500 500' /%3E%3C!-- Set the origin to the center of the blue circle --%3E%3C/circle%3E%3C/g%3E%3C/svg%3E",
      anchor: new google.maps.Point(0, 50)
    }
  });
  // const londonSpots = await getLondonSpots()

  // londonSpots.forEach((elem: LocationType) => {
  //   map.data.addGeoJson(elem)
  // });
  // console.log(londonSpots);
  // const l = new google.maps.KmlLayer({
  //   url: getLondonSpots()[1]
  // })
  // londonSpots.setMap(map)
}

// function getPosition(): Promise<GeolocationPosition> {
//     return new Promise((resolve, reject) =>
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     );
// }

function success(pos: GeolocationPosition, map: google.maps.Map) {
  const newLocation = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  }
  console.log(pos);
  if (map) {
    // map.panTo(newLocation);
    mapInstance.value = map;
  }
  location.value = newLocation;
}
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

@keyframes breathingAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(0.5); }
  100% { transform: scale(1); }
}

#blueCircle {
  animation: breathingAnimation 4s infinite; /* Adjust the duration as needed */
}
</style>