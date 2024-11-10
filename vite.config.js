import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css:{
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' //修改API调用方式
      }
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1',
        changeOrigin:true

      }
    }
  }
})
