//firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase config object
   const firebaseConfig = {
      apiKey: "AIzaSyBoRjw2YOVHIq1uUYJuc-fhEbiP9ykfweI",
      authDomain: "table-23514.firebaseapp.com",
      projectId: "table-23514",
      storageBucket: "table-23514.appspot.com",
      messagingSenderId: "111280711097",
      appId: "1:111280711097:web:7a802ed2d3b4a0ce5b4268"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
