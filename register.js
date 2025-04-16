// register.js
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const fullName = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const currency = document.getElementById("currency").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Save extra user data in Firestore
    await setDoc(doc(db, "users", uid), {
      email,
      username,
      fullName,
      phone,
      currencySymbol: currency,
      balance: 0,
      bonus: 0,
      withdrawal: 0,
      recentActivity: []
    });

    alert("Registration successful! Redirecting to login...");
    window.location.href = "login.html";

  } catch (error) {
    alert("Error: " + error.message);
  }
});
