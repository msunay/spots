import { ref } from "vue"
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const currentlocation = ref({
    lat: 51.50801934581279,
    lng: -0.08776463605191384
  })

  // Tracking enabled state
  const tracking = ref(false)

  return { currentlocation, tracking }
})