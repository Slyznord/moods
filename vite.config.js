import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/moods/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    process.env.NODE_ENV === 'production'
      ? VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: false // Включить в режиме разработки
        },
        manifest: {
          name: 'moods',
          short_name: 'moods',
          description: 'Check your mood every day',
          theme_color: '#FFF',
          icons: []
        },
        workbox: {
          // Генерация манифеста файлов для кэширования
          globPatterns: ['**/*.{js,css,html,png,jpg}'],
          globIgnores: ['**/node_modules/**', '**/dist/**'],
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 дней
                }
              }
            },
            {
              urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-resources'
              }
            }
          ]
        }
      })
      : null
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
