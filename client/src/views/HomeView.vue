<script setup lang="ts">
  import Dashboard from '@/components/Dashboard.vue';
  import DetailsCard from '@/components/DetailsCard.vue';
  import Loader from '@/components/Loader.vue';

</script>

<template>
  <main>
    <Suspense>

      <Dashboard />
      <!-- <DetailsCard /> -->
      <template #fallback>

        <Loader />
      </template>
    </Suspense >
  </main>
</template>