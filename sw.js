const version = 1;
const cacheVersion = `version-${version}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheVersion)
      .then((cache) =>
        cache.addAll([
          "/",
          "/images/naksu-1.jpg",
          "/images/naksu-2.jpg",
          "/images/naksu-3.jpg",
          "/images/naksu-4.png",
          "/images/naksu-5.png",
          "/images/naksu-6.png",
          "/images/naksu-7.png",
          "/images/naksu-8.png",
          "/css/style.css",
          "/js/index.js"
        ])
      )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cacheVersion) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const responseFromCache = await caches.match(event.request.url);
      if (responseFromCache) {
        return responseFromCache;
      }
      const responseFromNetwork = await fetch(event.request.url);
      if (responseFromNetwork) {
        await caches
          .open(cacheVersion)
          .then((cache) =>
            cache.put(event.request.url, responseFromNetwork.clone())
          );
        return responseFromNetwork;
      }

      return new Response("Not in cache or network is not available");
    })()
  );
});
