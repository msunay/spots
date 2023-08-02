<script setup lang='ts'>
  import { getSpot } from '@/ApiService';
  import type { LocationPin, Coordinates } from '@/customTypings/Location';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useLocationStore } from "@/stores/location";
  import { storeToRefs } from 'pinia';


  const spot: any = ref({
    _id: {
      id: "64c7d548c8db66e4c22b93d7"
    },
    type: "Outdoor Spots",
    properties: {
      Name: "IMAX",
      description: "The IMAX Parkour Spot is a classic and has features for all levels, including wall runs, railings and concrete barriers for dynamic moves. It's a prime playground for freerunners.",
      gx_media_links: [
        '/src/assets/Imax-1.jpg',
        '/src/assets/Imax-2.webp',
        '/src/assets/Imax-3.webp'
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
  const { currentlocation, tracking } = storeToRefs(useLocationStore())


  console.log(spot.value);
  const spotLatLng = {
    lat: spot.value.geometry.coordinates[1],
    lng: spot.value.geometry.coordinates[0]
  }
  const distanceAway = haversine_distance(currentlocation.value, spotLatLng)

  const currentRoute = useRoute();

  const id = currentRoute.params.id as string;

  getSpot(id).then(s => spot.value = s)
  // let spot: LocationPin;

  // async function getSpots(id: string) {
  //   return await getSpot(id)
  // }
  // await getSpot(id).then(s => spot = s);
  // onMounted(() => {
  //   spot = getSpots(id)
  // })

  function haversine_distance(mk1: Coordinates, mk2: Coordinates) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

</script>

<template>
  <div class="card-container">
    <h1 v-if="spot">{{ spot.properties.Name }}</h1>
    <h4 v-if="tracking">{{ distanceAway }} Miles Away</h4>
    <div class="img-grid">
      <div class="img-container" v-for="img of spot.properties.gx_media_links">
        <img class="vim" :src="`${img}`">

      </div>

    </div>
    <!-- <img v-for="img of spot.properties.gx_media_links" :src="`${img}`" :alt="img"> -->
    <!-- <img src="../assets/Imax-3.webp"> -->
    <p>{{ spot.properties.description }}</p>
    <router-link class="home-link" to="/">Back to Map</router-link>
  </div>
</template>

<style scoped>
  .card-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: #0d060f;
  }
  .img-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    justify-items: center;
  }
  .vim {
    height: 130px;
    width: 175px;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
  }

  .img-container {
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
  }

  p {
    width: 80%;
    color: aliceblue;
  }

  h1 {
    margin-bottom: 10px;
    color: aliceblue;
  }

  .home-link {
    /* margin-top: auto; */
    color: aliceblue;
    border: 1px solid aliceblue;
    padding: 5px;
    text-decoration: none;
  }
  </style>