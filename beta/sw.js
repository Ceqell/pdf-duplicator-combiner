// sw.js
const CACHE_NAME = 'pdf-duplicator-v1';
const ASSETS = [
  './',
  './index.html',
  'styles.css',
  'js/lucide.min.js',
  'js/pdf.min.js',
  'js/pdf.worker.min.js', // Crucial
  'js/Sortable.min.js',
  'js/pdf-lib.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});