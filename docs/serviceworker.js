var CACHE_NAME = 'the-broom-cache-v1'
var urlsToCache = [
  '/',
  '/index.html',
  '/chunk-vendors.js',
  '/favicon.ico',
  '/serviceworker.js',
  '/thebroom/app.js',
  'thebroom/img/icons/favicon-16x16.png',
  'thebroom/img/icons/favicon-32x32.png',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  '/thebroom/manifest.json',
  'https://fonts.googleapis.com/css?family=Montserrat',
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  console.log('Installed')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})
self.addEventListener('activate', (event) => {
  console.log('activated')
})
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then( response => {
      // Cache hit - return response
      if (response) {
        console.log('Request found in cache!', event.request.url)
        return response
      }

      caches.open(CACHE_NAME)
      .then(cache => {
        cache.add(event.request)
          .then(() => {
            console.log('Request saved in cache!', event.request.url)
          })
      })
      console.warn('Request not found in cache :(', event.request.url)
      return fetch(event.request)
    })
  )
})