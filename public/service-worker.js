// service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Проверяем, загрузился ли Workbox
if (workbox) {
  console.log('Workbox is loaded')

  // Кэширование файлов, указанных в self.__WB_MANIFEST
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

  // Пример дополнительного кэширования
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 дней
        })
      ]
    })
  )

  // Пример кэширования JS и CSS файлов
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources'
    })
  )
} else {
  console.log('Workbox failed to load')
}
