// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVzBsLYYjQDHPO6GXelLV9pIOu-nmzqnY",
  authDomain: "earn-money-online-9f77b.firebaseapp.com",
  databaseURL: "https://earn-money-online-9f77b-default-rtdb.firebaseio.com",
  projectId: "earn-money-online-9f77b",
  storageBucket: "earn-money-online-9f77b.firebasestorage.app",
  messagingSenderId: "119190206068",
  appId: "1:119190206068:web:20c136c3c972039eacc321",
  measurementId: "G-W6B3H6TQ8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
