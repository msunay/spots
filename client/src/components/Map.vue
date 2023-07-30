<script setup lang='ts'>
  import { useLocationStore } from "@/stores/location";
  import type { Coordinates, LocationType } from "@/customTypings/Location";
  import { onUnmounted, watch } from "vue";
  import { getLondonSpots } from "@/ApiService";
  import locationIcon from './icons/locationIcon.svg'
  import locationIconBack from './icons/locationIconBack.svg'
  import { storeToRefs } from "pinia";

  // Get location store
  const location = useLocationStore();
  const { currentlocation, tracking } = storeToRefs(location);

  // Define local vars
  let map: google.maps.Map;
  let currentMarker: google.maps.Marker;
  let currentMarkerBackground: google.maps.Marker;
  let watchID: number;

  // Init Map
  initMap(currentlocation.value)

  // Track location if tracking state true
  watch(tracking, toggleTracking)

  // Stop tracking on unmount
  onUnmounted(() => {
    navigator.geolocation.clearWatch(watchID)
  })


  // Functions
  // Setup map
  async function initMap(center: Coordinates): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 13,
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

    // Set current location marker
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
    currentMarker.setVisible(false);

    currentMarkerBackground = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      map,
      icon: {
        url: locationIconBack,
        anchor: new google.maps.Point(25,25)
      }
    });
    currentMarkerBackground.setVisible(false);

    // Get data and add to map
    const londonSpots = await getLondonSpots()

    londonSpots.forEach((elem: LocationType) => {
      map.data.addGeoJson(elem)
    });

    // Marker animation
    pulseMarker()
  }


  function toggleTracking() {
    if (tracking.value && map) {
      // Get and watch user location to set markers
      watchID = navigator.geolocation.watchPosition(pos => success(pos, map), error => console.log(error), {
        timeout: 3000,
        enableHighAccuracy: true
      })
      // Show markers
      currentMarker.setVisible(true)
      currentMarkerBackground.setVisible(true)
      map.setZoom(16)

    } else if (!tracking.value && map) {
      // Clear watch and hide markers
      navigator.geolocation.clearWatch(watchID)
      currentMarker.setVisible(false)
      currentMarkerBackground.setVisible(false)
    }
  }

  // Marker animation
  function pulseMarker() {
    let scale = 1.1;
    let direction = 1;
    let minScale = 0.7;
    let maxScale = 1.1;

    setInterval(function () {
        if (scale > maxScale || scale < minScale) direction *= -1;
        scale += direction * 0.01;

        let anchor = new google.maps.Point(25 * scale, 25 * scale);

        currentMarker.setIcon({
            url: locationIcon,
            scaledSize: new google.maps.Size(50 * scale, 50 * scale),
            anchor: anchor
        });
    }, 20);
  }


  function success(pos: GeolocationPosition, map: google.maps.Map) {
    // Make latlng obj
    const newLocation = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
    console.log(pos);
    if (map) {
      // Set markers at current postion when watch comes through
      currentMarker.setPosition(newLocation)
      currentMarkerBackground.setPosition(newLocation)
      currentMarkerBackground.setZIndex(10)

      // If marker moves out of map view pan map to location
      if (!map.getBounds()?.contains(newLocation)) {
        map.panTo(newLocation);
      }
    }
    // Update location state
    currentlocation.value = newLocation;
  }
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .vue-map-container {
    height: 100%;
  }


</style>