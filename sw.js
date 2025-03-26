// في sw.js:
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/schoollogo.jpg',
    '/b.jpg',
    '/c.jpg',
    '/d.jpg'
  ];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
