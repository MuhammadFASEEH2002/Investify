import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

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
export const storage = getStorage(app);
export const db = getFirestore(app);