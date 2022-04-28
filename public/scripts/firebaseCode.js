const firebaseConfig = {
    apiKey: "AIzaSyC2dTvcQ0lm7Q8Z9plCvaV3bRsNIA0rmSU",
    authDomain: "delivery-6c0fd.firebaseapp.com",
    databaseURL: "https://delivery-6c0fd-default-rtdb.firebaseio.com",
    projectId: "delivery-6c0fd",
    storageBucket: "delivery-6c0fd.appspot.com",
    messagingSenderId: "380556576342",
    appId: "1:380556576342:web:c4ed087b789cceaa0b9df7",
    measurementId: "G-W6TDFDZX87"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const auth2 = firebase.auth;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

