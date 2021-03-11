importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyAV7QrSKaiK1El4MjI7_sXrfajsDcB97KU",
    authDomain: "webdirectory-993df.firebaseapp.com",
    projectId: "webdirectory-993df",
    storageBucket: "webdirectory-993df.appspot.com",
    messagingSenderId: "173594208626",
    appId: "1:173594208626:web:8df9e654b9ddb39ef6d5eb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});

firebase.messaging().onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: 'img/background.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });

self.addEventListener('push', function(event) {
    const payload = event.data ? event.data.text() : 'no payload';
    event.waitUntil(
      self.registration.showNotification('ServiceWorker Cookbook', {
          body: payload,
      })
    );
  });