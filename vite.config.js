import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
         target: 'http://8.134.250.189:8085', // 服务器地址
        //target:'http://182.43.22.191:30111',
        changeOrigin: true, // 允许代理修改请求来源，解决跨域问题
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
