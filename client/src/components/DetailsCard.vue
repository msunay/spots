<script setup lang='ts'>
  import { getSpot } from '@/ApiService';
  import type { LocationPin } from '@/customTypings/Location';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const spot: any = ref({
  _id: {
    id: "64c7d548c8db66e4c22b93d7"
  },
  type: "Outdoor Spots",
  properties: {
    Name: "IMAX",
    description: null,
    gx_media_links: [
      'client/src/assets/Imax-1.jpg',
      '../assets/Imax-2.webp',
      '../assets/Imax-3.webp'
    ]
  },
  geometry: {
    type: "Point",
    coordinates: [
      -0.1135525,
      51.5052702
    ]
  }
})

  const currentRoute = useRoute();

  const id = currentRoute.params.id as string;

  // let spot: LocationPin;

  // async function getSpots(id: string) {
  //   return await getSpot(id)
  // }
  // await getSpot(id).then(s => spot = s);
  // onMounted(() => {
  //   spot = getSpots(id)
  // })
</script>

<template>
  <h1 v-if="spot">{{ spot.properties.Name }}</h1>
  <img v-for="img of spot.properties.gx_media_links" :src="img" :alt="img">
</template>

<style scoped>
  img {
    width: 100%;
    height: 400px;
  }
</style>