// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxMDg1_byHYFIxej9AHE7xgiWRpfatztI",
  authDomain: "chat-7e806.firebaseapp.com",
  projectId: "chat-7e806",
  storageBucket: "chat-7e806.appspot.com",
  messagingSenderId: "994791669623",
  appId: "1:994791669623:web:6b383a546e7e571950ab72",
  measurementId: "G-P5BX2NGDJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);