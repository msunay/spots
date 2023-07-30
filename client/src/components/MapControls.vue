<script setup lang='ts'>
  import { ref } from 'vue';
import Icon from './Icon.vue';

  // Drawer tab open state
  const open = ref(false);

  function drawerToggle() {
    if (open.value) {
      console.log('Drawer Open => Closed');
      open.value = false;
    } else {
      console.log('Drawer Closed => Open');
      open.value = true;
    }
  }
  </script>

<template>
  <button
    class="controls-container"
    @click="drawerToggle()"
  >
    <div class="controls-pull-tab"></div>
    <div class="nav-container">

      <Icon />
    </div>
  </button>
</template>

<style scoped>
  .controls-container {
    border: none;
    display: flex;
    position: absolute;
    bottom: 0px;
    flex-direction: column;
    align-items: center;
    height: 70px;
    width: 99%;
    background-color: white;
    box-shadow: 1px 1px 11px;
    z-index: 1;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }

  .controls-pull-tab {
    position: relative;
    top: 6px;
    height: 4px;
    width: 40px;
    background-color: rgba(128, 128, 128, 0.495);
    border-radius: 2px;
  }

  .nav-container {
    z-index: 2;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>