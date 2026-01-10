// Change this version string whenever you update styles or JS!
const CACHE_NAME = 'pdf-duplicator-v1.1.2-1beta';

const ASSETS = [
  './',
  './index.html',
  'styles.css',
  'js/lucide.min.js',
  'js/pdf.min.js',
  'js/pdf.worker.min.js',
  'js/Sortable.min.js',
  'js/pdf-lib.min.js'
];

// Install: Cache files
self.addEventListener('install', (e) => {
  // Forces this SW to become active immediately, bypassing the "waiting" state
  self.skipWaiting(); 
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Activate: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  // Takes control of any open pages immediately
  return self.clients.claim(); 
});

// Fetch: Serve from cache, fall back to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
