const CACHE_NAME = 'gawad-hosni-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/schoollogo.jpg',
  // أضف هنا الملفات الأخرى التي تريد تخزينها
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