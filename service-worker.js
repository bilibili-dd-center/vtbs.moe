importScripts("/precache-manifest.a5e5f356e208d67a6fb1442af63a138f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint no-undef: 0 */

console.log('vtbs.moe 超级 ServiceWorker 参上！')

workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate()
)

workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
  /https:\/\/api\.vtbs\.moe/,
  new workbox.strategies.NetworkOnly()
)

workbox.routing.registerRoute(
  /https:\/\/www\.google-analytics\.com/,
  new workbox.strategies.NetworkOnly()
)

workbox.routing.registerRoute(
  /https:\/\/i[0123].hdslb.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'face',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 2333,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
)

workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/')
  }
  return Response.error()
})

