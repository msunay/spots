<script setup lang='ts'>
  import { useLocationStore } from "@/stores/location";
  import { storeToRefs } from "pinia";
  import type { Coordinates, LocationType } from "@/customTypings/Location";
  import { onUnmounted, ref } from "vue";
  import { getLondonSpots } from "@/ApiService";
  import locationIcon from './icons/locationIcon.svg'

  const { location } = storeToRefs(useLocationStore());

  let map: google.maps.Map;
  let currentMarker: google.maps.Marker;

  getPosition().then(pos => {
    success(pos, map)
    initMap(location.value)
  })

  const watchID = navigator.geolocation.watchPosition(pos => success(pos, map), error => console.log(error), {
    timeout: 3000,
    enableHighAccuracy: true
  })

  onUnmounted(() => {
    navigator.geolocation.clearWatch(watchID)
  })

  async function initMap(center: Coordinates): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 15,
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
    })

    const { lat, lng } = center;

    currentMarker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      map,
      icon: {
        url: locationIcon,
        anchor: new google.maps.Point(25,25)
      }
    });

    const londonSpots = await getLondonSpots()

    londonSpots.forEach((elem: LocationType) => {
      map.data.addGeoJson(elem)
    });

    pulseMarker()
  }

  function pulseMarker() {
    let scale = 1.1;
    let direction = 1;
    let minScale = 0.7;
    let maxScale = 1.1;

    setInterval(function () {
        if (scale > maxScale || scale < minScale) {
            direction *= -1;
        }

        scale += direction * 0.01;

        let anchor = new google.maps.Point(25 * scale, 25 * scale);

        currentMarker.setIcon({
            url: locationIcon,
            scaledSize: new google.maps.Size(50 * scale, 50 * scale),
            anchor: anchor
        });
    }, 20);
  }

  function getPosition(): Promise<GeolocationPosition> {
      return new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );
  }

  function success(pos: GeolocationPosition, map: google.maps.Map) {
    const newLocation = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
    console.log(pos);
    if (map) {
      currentMarker.setPosition(newLocation)
      // map.panTo(newLocation);
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


</style>