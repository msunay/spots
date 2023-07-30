import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPresetEnv from 'postcss-preset-env'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv()
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
        "@fawmi/vue-google-maps",
        "fast-deep-equal"
    ]
}
})
