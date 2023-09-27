<script setup lang="ts">
  import Dashboard from '@/components/Dashboard.vue';
  import Loader from '@/components/Loader.vue';

</script>

<template>
  <main>
    <Suspense>

      <Dashboard />
      <template #fallback>

        <Loader />
      </template>
    </Suspense >
  </main>
</template>