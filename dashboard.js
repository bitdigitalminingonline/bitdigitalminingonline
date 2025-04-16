import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoRjw2YOVHIq1uUYJuc-fhEbiP9ykfweI",
  authDomain: "table-23514.firebaseapp.com",
  projectId: "table-23514"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check UID from localStorage
const uid = localStorage.getItem("uid");
if (!uid) {
  window.location.href = "index.html";
}

// Reference user document
const userRef = doc(db, "users", uid);

// Listen for real-time updates
onSnapshot(userRef, (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("User Data:", data); // <-- Check what is being retrieved

    const symbol = getCurrencySymbol(data.currency);

    document.getElementById("welcomeUser").textContent = data.username || data.fullName || "User";
    document.getElementById("balanceAmount").textContent = symbol + (data.balance || 0);
    document.getElementById("bonusAmount").textContent = symbol + (data.bonus || 0);
    document.getElementById("withdrawalAmount").textContent = symbol + (data.withdrawal || 0);

    const timestamp = new Date().toLocaleString();
    document.getElementById("balanceUpdated").textContent = `Last updated: ${timestamp}`;
    document.getElementById("bonusUpdated").textContent = `Last updated: ${timestamp}`;
    document.getElementById("withdrawalUpdated").textContent = `Last updated: ${timestamp}`;

    const activityLog = document.getElementById("activityLog");
    const activityList = data.recentActivity || [];
    activityLog.innerHTML = activityList.length
      ? activityList.slice().reverse().map(item => `<li>${item}</li>`).join("")
      : `<li>No recent activity to display</li>`;
  } else {
    console.log("No such document!");
  }
});

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("uid");
    window.location.href = "index.html";
  });
});

// Currency symbol helper
function getCurrencySymbol(currencyCode) {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    AUD: "$",
    JPY: "¥"
  };
  return symbols[currencyCode] || "$";
}
