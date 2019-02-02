var CACHE_NAME = 'the-broom-cache-v1'
var urlsToCache = [
  '/thebroom',
  '/thebroom/index.html',
  '/thebroom/chunk-vendors.js',
  '/thebroom/favicon.ico',
  '/thebroom/app.js',
  '/thebroom/img/icons/favicon-16x16.png',
  '/thebroom/img/icons/favicon-32x32.png',
  '/thebroom/manifest.json',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
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
      .catch(err => {
        console.log(err)
      })
  )
})
self.addEventListener('activate', (event) => {
  console.log('Activated')
})
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
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
    .catch(err => {
      console.log(err)
    })
  )
})