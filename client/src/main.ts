// import 'dotenv/config'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import HammerVuePlugin from 'hammer-vue-plugin'
// import type { HammerVuePlugin } from 'HammerVuePlugin'
// import { VueHammer } from 'vue2-hammer'

import App from './App.vue'
import router from './router'


const app = createApp(App)
// export const apiKey = import.meta.env.VITE_API_KEY;
app.use(createPinia())
app.use(router)
// app.use(VueHammer)
// app.use(HammerVuePlugin: HammerVuePlugin)
app.mount('#app')
