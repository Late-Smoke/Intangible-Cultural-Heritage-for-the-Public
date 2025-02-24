import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/users': {
        // target: 'http://182.43.22.191:31789', // 服务器地址
        target:'http://182.43.22.191:30111',
        changeOrigin: true, // 允许代理修改请求来源，解决跨域问题
      },
    },
  },
})
