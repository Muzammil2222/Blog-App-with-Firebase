import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAkKa2lBs_rk5QMvWH4AgM9LX72yS9Q3yo",
    authDomain: "crudapp-8a106.firebaseapp.com",
    databaseURL: "https://crudapp-8a106-default-rtdb.firebaseio.com",
    projectId: "crudapp-8a106",
    storageBucket: "crudapp-8a106.firebasestorage.app",
    messagingSenderId: "79976453512",
    appId: "1:79976453512:web:8f1186e7431fde5772963d",
    measurementId: "G-BCP8BYJYZ8"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);