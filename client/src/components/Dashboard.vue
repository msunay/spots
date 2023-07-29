<script setup lang='ts'>
  import Map from '@/components/Map.vue';
  import Logo from "./Logo.vue";
  import MapControls from './MapControls.vue';

  const trackLocation = '<button class="trackLocation">fdas</button>'
  //TODO add marker for current location and a button for centering map at location
  // onMounted(() => {
  //   map.controls[google.maps.ControlPosition.TOP_RIGHT].push('trackLocation');
  // })

</script>

<template>
  <Map />
  <div class="map-overlay-container">
    <Logo />

    <MapControls />
  </div>
</template>

<style lang='postcss' scoped>
  .map-overlay-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    z-index: 2;
  }

  .trackLocation {
    z-index: 2;
  }
</style>