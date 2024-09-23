// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf4yxwSbYtiKnTbuF3S6iEBnqjrUp7aU0",
  authDomain: "luxe-hotel-cefff.firebaseapp.com",
  projectId: "luxe-hotel-cefff",
  storageBucket: "luxe-hotel-cefff.appspot.com",
  messagingSenderId: "106757627113",
  appId: "1:106757627113:web:c7b1b9ca2fab69e9fe6478",
  measurementId: "G-BYV90S4C5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth}