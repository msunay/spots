<script setup lang='ts'>
  import Map from '@/components/Map.vue';
  import Logo from "./Logo.vue";
  import MapControls from './MapControls.vue';
  import centerLocation from './icons/locationIcon.svg';

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
    <button id="center-user">
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" id="location"><switch>
        <g><path d="M48 4C23.7 4 4 23.7 4 48c0 24.301 19.7 44 44 44 24.301 0 44-19.699 44-44C92 23.7 72.301 4 48 4zm4 79.773V72a4 4 0 0 0-8 0v11.773C27.315 81.928 14.072 68.686 12.228 52H24a4 4 0 0 0 0-8H12.228C14.072 27.315 27.315 14.072 44 12.228V24a4 4 0 0 0 8 0V12.228C68.686 14.072 81.928 27.315 83.773 44H72a4 4 0 0 0 0 8h11.773C81.928 68.686 68.686 81.928 52 83.773z"></path></g></switch>
      </svg>
    </button>
    <MapControls />
  </div>
</template>

<style lang='postcss' scoped>
  .map-overlay-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    //justify-content: space-between;
    z-index: 2;
  }

  .trackLocation {
    z-index: 2;
  }

  #center-user {
    z-index: 2;
    border: none;
    font-family: Roboto, Arial, sans-serif;
    font-size: 18px;
  }
</style>