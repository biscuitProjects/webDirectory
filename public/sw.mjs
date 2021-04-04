importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')
if (workbox) {
    console.log('Yay! Workbox is loaded');
  
    /**
     * The workboxSW.precacheAndRoute() method efficiently caches and responds to
     * requests for URLs in the manifest.
     *
     */
  
    /*      https://developers.google.com/web/tools/workbox/modules/workbox-sw  -namespace */
    /* https://developers.google.com/web/tools/workbox/guides/precache-files */
    workbox.precaching.precacheAndRoute(
      [
        { url: "/static/404.html", revision: "dc3feaa1058d8c1efcea96fefc3153ed" },
        { url: "/static/offline.html", revision: "e0683df2f740244dd3788ae2347e2bb4" },
        { url: "/static/css/404.css", revision: "e0683df2f740244dd3sdadsaddddw" },
        { url: "/static/css/index.css", revision: "e0683df2f740244dd3sdadsaddddw" },
        { url: "/static/css/login.css", revision: "e0683df2f740244dd3sdadsaddddw" }
      ]
    );
  
  
  
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|svg|css|js|json)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'nonhtml-cache',
        plugins: [
  
  
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          })
        ]
      })
    )
  
  
  
    workbox.routing.registerRoute(
      /\.(?:html)$/,
      new workbox.strategies.NetworkFirst({
        cacheName: 'html-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
  
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 5 * 60,
          })
        ]
      })
    )
  

    workbox.routing.registerRoute(
      ({url}) => url.origin === 'localhost' &&
      url.pathname.startsWith('/localhost'),
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        })
        ]
      })
    )
  
    //changes replace /404 with 404, replace php$ with php
    workbox.routing.registerRoute(/\.html/, args => {
      return articleHandler.handle(args).then(response => {
        if (!response) {
          return caches.match('offline.html');
        } else if (response.status === 404) {
          return caches.match('404.html');
        }
        return response;
      });
    });
  
  } else {
    console.log('Boo! Workbox did not load');
}

// const { registerRoute } = 'workbox-routing';
// const {
//   NetworkFirst,
//   StaleWhileRevalidate,
//   CacheFirst,
// } = 'workbox-strategies';

// // Used for filtering matches based on status code, header, or both
// const { CacheableResponsePlugin } = 'workbox-cacheable-response';
// // Used to limit entries in cache, remove entries after a certain period of time
// const { ExpirationPlugin } = 'workbox-expiration';

// // Cache page navigations (html) with a Network First strategy
// registerRoute(
//   // Check to see if the request is a navigation to a new page
//   ({ request }) => request.mode === 'navigate',
//   // Use a Network First caching strategy
//   new NetworkFirst({
//     // Put all cached files in a cache named 'pages'
//     cacheName: 'pages',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   }),
// );

// // Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// registerRoute(
//   // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
//   ({ request }) =>
//     request.destination === 'style' ||
//     request.destination === 'script' ||
//     request.destination === 'worker',
//   // Use a Stale While Revalidate caching strategy
//   new StaleWhileRevalidate({
//     // Put all cached files in a cache named 'assets'
//     cacheName: 'assets',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   }),
// );

// // Cache images with a Cache First strategy
// registerRoute(
//   // Check to see if the request's destination is style for an image
//   ({ request }) => request.destination === 'image',
//   // Use a Cache First caching strategy
//   new CacheFirst({
//     // Put all cached files in a cache named 'images'
//     cacheName: 'images',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//       // Don't cache more than 50 items, and expire them after 30 days
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
//       }),
//     ],
//   }),
// );