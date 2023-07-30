<script setup lang='ts'>
  import Map from '@/components/Map.vue';
  import Logo from "./Logo.vue";
  import MapControls from './MapControls.vue';
  import TrackLocationButton from './TrackLocationButton.vue';
 
</script>

<template>
  <Map />
  <div class="map-overlay-container">
    <Logo />
    <TrackLocationButton />
    <MapControls />
  </div>
</template>

<style scoped>
  .map-overlay-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    z-index: 2;
  }

  .trackLocation {
    z-index: 2;
  }


</style>