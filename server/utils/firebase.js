const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const { getFirestore } = require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDJm1Rzo_xJbOl6fd8uFnxeZvSSgIG6dtU",
  authDomain: "investify-39636.firebaseapp.com",
  projectId: "investify-39636",
  storageBucket: "investify-39636.appspot.com",
  messagingSenderId: "539751980628",
  appId: "1:539751980628:web:475ca3742be343642fd7c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const storage = getStorage(app);
 const db = getFirestore(app);

module.exports = {
  storage,
  db
};