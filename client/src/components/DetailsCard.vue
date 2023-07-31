<script setup lang='ts'>
  import { getSpot } from '@/ApiService';
  import type { LocationPin } from '@/customTypings/Location';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const currentRoute = useRoute();

  const id = currentRoute.params.id as string;

  onMounted(() => {

  })
  let spot: LocationPin = await getSpot(id)

  // async function getSpots(id: string) {
  //   return await

  // }
  // await getSpot(id).then(s => spot = s);

</script>

<template>
  <h1 v-if="spot">{{ spot.properties.Name }}</h1>
</template>

<style scoped>

</style>