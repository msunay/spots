import { ref } from "vue"
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const location = ref({ lat: 51.49496781651615, lng: -0.1274318650326508 })

  return { location }
})