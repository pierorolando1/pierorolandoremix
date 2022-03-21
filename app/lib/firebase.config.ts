// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4n3nyuos42F48CnjtLsQef9qtc30JR1Q",
  authDomain: "blog-pierorolando.firebaseapp.com",
  projectId: "blog-pierorolando",
  storageBucket: "blog-pierorolando.appspot.com",
  messagingSenderId: "331281651106",
  appId: "1:331281651106:web:7b7f724c087eb5a5b28efb",
  measurementId: "G-XZWNQNKC0F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth()
//getAnalytics(app);
