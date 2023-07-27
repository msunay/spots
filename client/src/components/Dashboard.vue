<script setup lang='ts'>
  import Map from '@/components/Map.vue';
  import Logo from "./Logo.vue";
  import MapControls from './MapControls.vue';
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

</style>