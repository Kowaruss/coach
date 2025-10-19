// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA02pnYXHaYB7tsGgOhDfDdEUs8FX4bH8I",
  authDomain: "casino-trainer-4e73d.firebaseapp.com",
  projectId: "casino-trainer-4e73d",
  storageBucket: "casino-trainer-4e73d.firebasestorage.app",
  messagingSenderId: "310814667967",
  appId: "1:310814667967:web:00dde0aab8271612e1420a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
