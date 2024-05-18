// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0JDUBYuYP0gq4JucEOvf02REM2V1PY5Q",
  authDomain: "chatroom-596d1.firebaseapp.com",
  projectId: "chatroom-596d1",
  storageBucket: "chatroom-596d1.appspot.com",
  messagingSenderId: "103024812152",
  appId: "1:103024812152:web:4bf474806507c312244d8d",
  measurementId: "G-8TWRYVGL4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getDatabase(
  app,
  "https://chatroom-596d1-default-rtdb.europe-west1.firebasedatabase.app"
);
