import { ref } from "vue"
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const currentlocation = ref({
    lat: 51.507351,
    lng: -0.127758
  })

  // Tracking enabled state
  const tracking = ref(false)

  return { currentlocation, tracking }
})