<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getLondonSpots } from './ApiService';

getLondonSpots()
</script>

<template>

  <nav>
    <RouterLink to="/"></RouterLink>
  </nav>
  <RouterView />

</template>

<style scoped>

</style>
