// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCURKSGmM5EqxIVbQeZ08hZkmQilO0xDSE",
  authDomain: "signup-7dbdd.firebaseapp.com",
  projectId: "signup-7dbdd",
  storageBucket: "signup-7dbdd.firebasestorage.app",
  messagingSenderId: "494207098434",
  appId: "1:494207098434:web:2b83f29b79da934e62d7db",
  measurementId: "G-T433YTY03M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
