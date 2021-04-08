if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('/static/sw.js')
  navigator.serviceWorker.register('/static/sw.mjs')
  navigator.serviceWorker.register('/static/firebase-messaging-sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  // pushButton.textContent = 'Push Not Supported';
}