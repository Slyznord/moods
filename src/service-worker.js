/* eslint-disable */
import { precacheAndRoute } from 'workbox-precaching'

// define a prefix for your cache names. It is recommended to use your project name
workbox.core.setCacheNameDetails({ prefix: 'simple-vue-project' })

// These lines are responsible for precaching static resources. Using 'generateSW'(zero config), these lines would be added automatically to the serviceworker.
// __precacheManifest is the list of resources you want to precache. It will be generated and imported automatically by workbox during build time
self.__precacheManifest = [].concat(self.__precacheManifest || [])
precacheAndRoute(self.__precacheManifest, {})
precacheAndRoute(self.__WB_MANIFEST)

// Here is where we apply our customization for the api
// all the api request wich starts with this pattern(first parameter) will use CacheFirst strategy for caching
workbox.routing.registerRoute(
  /https:\/\/slyznord\.github\.io\/moods/,
  new workbox.strategies.CacheFirst()
)
