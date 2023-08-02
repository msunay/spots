<script setup lang='ts'>
  import { useLocationStore } from '../stores/location'

  // Get location store
  const location = useLocationStore()

</script>

<template>
  <button id="center-user" v-if="location.tracking" @click="() => location.tracking = false" >
    <svg class="glow-icon" xmlns="http://www.w3.org/2000/svg" width="96" height="96" id="location"><switch>
      <g fill="#0000ff" transform="scale(0.5)">
        <path d="M48 4C23.7 4 4 23.7 4 48c0 24.301 19.7 44 44 44 24.301 0 44-19.699 44-44C92 23.7 72.301 4 48 4zm4 79.773V72a4 4 0 0 0-8 0v11.773C27.315 81.928 14.072 68.686 12.228 52H24a4 4 0 0 0 0-8H12.228C14.072 27.315 27.315 14.072 44 12.228V24a4 4 0 0 0 8 0V12.228C68.686 14.072 81.928 27.315 83.773 44H72a4 4 0 0 0 0 8h11.773C81.928 68.686 68.686 81.928 52 83.773z"></path>
      </g></switch>
    </svg>
  </button>
  <button id="center-user" v-else @click="() => location.tracking = true" >
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" id="location"><switch>
      <g fill="#000000" transform="scale(0.5)">
        <path d="M48 4C23.7 4 4 23.7 4 48c0 24.301 19.7 44 44 44 24.301 0 44-19.699 44-44C92 23.7 72.301 4 48 4zm4 79.773V72a4 4 0 0 0-8 0v11.773C27.315 81.928 14.072 68.686 12.228 52H24a4 4 0 0 0 0-8H12.228C14.072 27.315 27.315 14.072 44 12.228V24a4 4 0 0 0 8 0V12.228C68.686 14.072 81.928 27.315 83.773 44H72a4 4 0 0 0 0 8h11.773C81.928 68.686 68.686 81.928 52 83.773z"></path>
      </g></switch>
    </svg>
  </button>
</template>

<style scoped>
  #center-user {
    z-index: 2;
    background: none;
    border: none;
    align-self: flex-end;
    margin-right: 20px;
    margin-top: 80px;
    font-family: Roboto, Arial, sans-serif;
    font-size: 18px;
    width: 48px;
    height: 48px;
  }

  .glow-icon {
    /* z-index: 3; */
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        filter: drop-shadow(0 0 5px blue);
      }
      50% {
        filter: drop-shadow(0 0 10px blue);
      }
      100% {
        filter: drop-shadow(0 0 5px blue);
      }
    }
</style>