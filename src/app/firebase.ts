// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnsUC4g8gFZWND8xgDSpLjNx1EwyM4CDE",
  authDomain: "bsvcodefinances.firebaseapp.com",
  projectId: "bsvcodefinances",
  storageBucket: "bsvcodefinances.appspot.com",
  messagingSenderId: "531695288894",
  appId: "1:531695288894:web:5ea820258a0ca0cf5ec76f",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
