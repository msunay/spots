<script setup lang='ts'>

</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="50px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
    <circle fill="#FDFEFF" cx="500" cy="500" r="200"/>
    <circle id="blueCircle" fill="#3E8CF9" cx="500" cy="500" r="150"/>
  </svg>
</template>

<style lang='postcss' scoped>
  @keyframes breathingAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(0.5); }
    100% { transform: scale(1); }
  }

  #blueCircle {
    animation: breathingAnimation 4s infinite; /* Adjust the duration as needed */
  }
</style>