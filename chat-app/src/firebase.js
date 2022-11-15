import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
// const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();