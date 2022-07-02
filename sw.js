const version = 3;
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
          "/js/index.js",
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
  if(event.request.headers.get('range')) {

    

  }else{
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
  }
  
});

async function handleVideoResponse(event) {


  event.respondWith(
    (async () => {
      const fromCache = await caches.open(cacheVersion).then( cache => cache.match(event.request.url));
      let buffer;
      if(!fromCache) {
        const fromNetwork = await fetch(event.request);
         buffer = await fromNetwork.arrayBuffer();
      } else {
        buffer = await fromCache.arrayBuffer();
      }

      return new Response(ab.slice(pos), {
        status: 206,
        statusText: "Partial Content",
        headers: [
          ["Content-Type", "video/mp4"],
          [
            "Content-Range",
            "bytes " + pos + "-" + (ab.byteLength - 1) + "/" + ab.byteLength,
          ],
        ],
      });
    })()
  );
}


caches
      .open(cacheVersion)
      .then(function (cache) {
        return cache.match(event.request.url);
      })
      .then(function (res) {
        if (!res) {
          return fetch(event.request).then((res) => {
            return res.arrayBuffer();
          });
        }
        return res.arrayBuffer();
      })
      .then(function (ab) {
        return new Response(ab.slice(pos), {
          status: 206,
          statusText: "Partial Content",
          headers: [
            ["Content-Type", "video/mp4"],
            [
              "Content-Range",
              "bytes " + pos + "-" + (ab.byteLength - 1) + "/" + ab.byteLength,
            ],
          ],
        });
      })