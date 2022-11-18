/**
 * TODO:
 *  - cache files in background after install stage
 *  - update cache
 *  - update SW
 */

const cacheName = "hello-pwa";
const filesToCache = ["/", "/index.html", "/styles.css", "/script.js"];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (event) => {
  console.log(self);
  event.waitUntil(addResourcesToCache(filesToCache));
  console.log(self.navigator);
});

self.addEventListener("activate", function () {
  console.log("activated!");
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  console.log({ url: e.request.url });
  if (e.request.url === "http://127.0.0.1:5500/offline") {
    e.respondWith(
      new Response(
        "<p>Hello from your friendly neighborhood service worker!</p>",
        {
          headers: { "Content-Type": "text/html" },
        }
      )
    );
  }
  //d
  e.respondWith(
    caches.match(e.request).then(async function (response) {
      if (!response) {
        return fetch(e.request);
      }
      return response;
    })
  );
});
