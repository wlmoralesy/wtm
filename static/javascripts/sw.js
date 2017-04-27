importScripts('/offline-google-analytics/offline-google-analytics-import.js');
goog.offlineGoogleAnalytics.initialize();


const cacheName = 'wtm17-v7';
const pathsToCache = [
  '/',
  '/coc',
  '/static/manifest.json',
  '/static/stylesheets/fonts.min.css',
  '/static/stylesheets/main.min.css',
  '/static/javascripts/main.min.js',
  '/static/javascripts/sw-register.min.js',
  '/offline-google-analytics/offline-google-analytics-import.js',
  '/static/images/logo.png',
  '/static/images/logo-full.png',
  '/static/images/gdg-logo.png',
  '/static/images/speakers/erika-legara.png',
  '/static/images/speakers/loveme-felicilda.png',
  '/static/images/speakers/rhez-albaracin.png',
  '/static/images/speakers/rochel-abrasaldo.png',
  '/static/images/speakers/sheryl-satorre.png',
  '/static/images/speakers/frances-teves.png',
  '/static/images/speakers/franchette-camoro.png',
  '/static/images/speakers/jane-vestil.png',
  '/static/images/speakers/nicole-padin.png',
  '/static/images/sponsors/google.svg',
  '/static/images/sponsors/payoneer.png',
  '/static/images/sponsors/symph.png',
  '/static/fonts/droid-sans/bold.ttf',
  '/static/fonts/droid-sans/regular.ttf',
  '/static/fonts/quicksand/bold.woff2'
];


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(pathsToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});


self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys()
      .then(function(cacheKeys) {
        return Promise.all(cacheKeys.map(function(cacheKey) {
          if (cacheKey !== cacheName) {
            caches.delete(cacheKey);
          }
        }));
      })
      .then(function() {
        self.clients.claim();
      })
  );
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
      .then(function(response) {
        return response || fetch(e.request);
      })
  );
});
