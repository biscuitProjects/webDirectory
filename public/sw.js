// Тут имя можно любое задать
const staticCacheName = 's-app-v4'
const dynamicCacheName = 'd-app-v4'

// задаём файлы для сохранения их в кеше
const assetUrls = [
    'department.css',
    'style.css',
    'style2.css',
    'public.js',
    'loginSuccess.js',
    'img/logoB.svg',
    'offline.html'
    // 'views/index.hbs'
    // '/views/create.hbs',
    // '/views/login.hbs'
]

// При установки ПВА, создаём кеш
self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

// При активации ПВА, проверяем кеш, если мы задали новое значение,
// то загружаем новый и удаляем старый кеш
self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
        .filter(name => name !== staticCacheName)
        .filter(name => name !== dynamicCacheName)
        .map(name => caches.delete(name))
    )
})

// Тут проверяет тип запроса.
// Если запрос относится к нашему домену, сначала проверяем его в кеше
// Если нет, то проверяем
// 
self.addEventListener('fetch', event => {
    const {request} = event

    const url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})

// Если запрос есть в кеше, то возвращяем его
async function cacheFirst(request) {
    // Проверка кеша
    const cached = await caches.match(request)    
    return cached ?? await fetch(request)
}

// Если запроса нет в кеше, то вызываем эту функцию
async function networkFirst(request) {
    // Проверка кеша
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/offline.html')
    }
}


// self.addEventListener('push', (event) => {
//     event.waitUntil(
//         fetch('/latest.json').then(function (response) {
//           if (response.status !== 200) {
//             console.log('Latest.json request error: ' + response.status);
//             throw new Error();
//           }
    
//           return response.json().then(function (data) {
//             if (data.error || !data.notification) {
//               console.error('Latest.json Format Error.', data.error);
//               throw new Error();
//             }
    
//             var title = 'help';
//             var body = 'me';
    
//             return self.registration.showNotification(title, {
//               body: body,
//               data: {
//                 url: data.notification.url
//               }
//             });
//           }).catch(function (err) {
//             console.error('Retrieve data Error', err);
//           });
//         })
//       );
// })

// importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');


// var firebaseConfig = {
//     apiKey: "AIzaSyAV7QrSKaiK1El4MjI7_sXrfajsDcB97KU",
//     authDomain: "webdirectory-993df.firebaseapp.com",
//     projectId: "webdirectory-993df",
//     storageBucket: "webdirectory-993df.appspot.com",
//     messagingSenderId: "173594208626",
//     appId: "1:173594208626:web:8df9e654b9ddb39ef6d5eb"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();



// const messagins = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/img/background.png'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });


//   messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });

//   messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/img/background.png'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });



