<script setup lang='ts'>
  import Icon from './Icon.vue';
  import { ref } from 'vue';

  const currentY = ref(0);

  // const onPan = (e: any) => {
  //   currentY.value = Math.min(0, e)
  // }
  // v-hammer:panstart="($event: any) => console.log($event)"

</script>

<template>
  <div
    class="controls-container"
  > // TODO
    <div class="controls-pull-tab"></div>
    <div class="nav-container">

      <Icon />
    </div>
  </div>
</template>

<style lang='postcss' scoped>
  .controls-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70px;
    width: 100%;
    background-color: white;
    box-shadow: 1px 1px 11px;
    z-index: 1;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }

  .controls-pull-tab {
    position: relative;
    top: 6px;
    //align-self: center;
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