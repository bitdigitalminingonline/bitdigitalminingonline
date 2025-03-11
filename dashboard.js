// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7nRo1nVCaIg75JOpvh1gPy_kQ3_zQjXY",
    authDomain: "digital-bit-6e599.firebaseapp.com",
    projectId: "digital-bit-6e599",
    storageBucket: "digital-bit-6e599.appspot.com",
    messagingSenderId: "261463383888",
    appId: "1:261463383888:web:c5cf8991d02645e6fb5655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to check login and fetch user data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        await loadUserData(user.uid);
    } else {
        console.log("No user is logged in.");
        window.location.href = "login.html"; // Redirect to login page
    }
});

// Function to fetch username and balance from Firestore
const loadUserData = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
        // Update Username
        document.getElementById("username").textContent = `Hello, ${userData.username || "User"}`;
        
        // Update Balance
        user.balance = userData.balance || 0;
        updateBalance();
    } else {
        console.error("User document not found, creating new user data...");
        await setDoc(userDocRef, { username: "User", balance: 0 });
    }
};

// User balance object
let user = {
    balance: 0
};

// Function to deposit money
const deposit = async () => {
    let amount = prompt("Enter amount to deposit:");
    if (amount && !isNaN(amount) && amount > 0) {
        user.balance += parseFloat(amount);
        updateBalance();
        await updateFirestoreBalance();
    } else {
        alert("Invalid amount");
    }
};

// Function to withdraw money
const withdraw = async () => {
    let amount = prompt("Enter amount to withdraw:");
    if (amount && !isNaN(amount) && amount > 0 && amount <= user.balance) {
        user.balance -= parseFloat(amount);
        updateBalance();
        await updateFirestoreBalance();
    } else {
        alert("Invalid amount or insufficient balance");
    }
};

// Function to update balance on the page
const updateBalance = () => {
    document.getElementById("usd-value").innerText = user.balance;
};

// Function to update Firestore balance
const updateFirestoreBalance = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, { balance: user.balance });
    } else {
        console.error("No authenticated user found.");
    }
};

// Attach deposit and withdraw functions to buttons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".action-btn.deposit").addEventListener("click", deposit);
    document.querySelector(".action-btn.withdraw").addEventListener("click", withdraw);
});
