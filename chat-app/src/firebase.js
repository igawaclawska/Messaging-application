// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvqjXRkAPWODxw0vyeZjsvuv6IuHwe-rM",
  authDomain: "chat-app-test-dc04e.firebaseapp.com",
  projectId: "chat-app-test-dc04e",
  storageBucket: "chat-app-test-dc04e.appspot.com",
  messagingSenderId: "920922032405",
  appId: "1:920922032405:web:5a108fb0418afe7b56011c",
  measurementId: "G-4KH3BKQN2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);