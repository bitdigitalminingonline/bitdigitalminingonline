document.addEventListener("DOMContentLoaded", function () {
    loadUser(); // Load user data from local storage
    updateBalance();
});

let user = {
    balance: 0
};

function loadUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user = JSON.parse(storedUser);
    }
}

function saveUser() {
    localStorage.setItem('user', JSON.stringify(user));
}

function deposit() {
    let amount = prompt("Enter amount to deposit:");
    if (amount && !isNaN(amount) && amount > 0) {
        user.balance += parseFloat(amount);
        saveUser();
        updateBalance();
    } else {
        alert("Invalid amount");
    }
}

function withdraw() {
    let amount = prompt("Enter amount to withdraw:");
    if (amount && !isNaN(amount) && amount > 0 && amount <= user.balance) {
        user.balance -= parseFloat(amount);
        saveUser();
        updateBalance();
    } else {
        alert("Invalid amount or insufficient balance");
    }
}

function updateBalance() {
    document.getElementById("usd-value").innerText = user.balance;
}
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

let userBalance = 0; // Store user's balance

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      userBalance = userData.balance; // Store balance for validation
      document.getElementById("userBalance").textContent = `$${userData.balance}`;
    }
  }
});

// Step 1: Confirm Bank Details
document.getElementById("confirmBankDetails").addEventListener("click", function() {
  const name = document.getElementById("withdrawName").value;
  const bankName = document.getElementById("bankName").value;
  const iban = document.getElementById("iban").value;
  const bankBranch = document.getElementById("bankBranch").value;
  const cardNumber = document.getElementById("cardNumber").value;

  if (!name || !bankName || !iban || !bankBranch || !cardNumber) {
    document.getElementById("withdrawalMessage").textContent = "Please fill all details!";
    return;
  }

  // Hide bank details section, show amount section
  document.getElementById("withdrawalSection").style.display = "none";
  document.getElementById("amountSection").style.display = "block";
});

// Step 2: Confirm Withdrawal Amount
document.getElementById("confirmWithdraw").addEventListener("click", async function() {
  const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
  const errorDiv = document.getElementById("withdrawalErrorMessage");

  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    errorDiv.textContent = "Invalid amount. Enter a valid number.";
    return;
  }

  if (withdrawAmount > userBalance) {
    errorDiv.textContent = "Insufficient balance!";
    return;
  }

  try {
    const user = auth.currentUser;

    // Reduce user's balance
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      balance: userBalance - withdrawAmount
    });

    // Store withdrawal request for admin review
    await addDoc(collection(db, "withdrawalRequests"), {
      userId: user.uid,
      amount: withdrawAmount,
      status: "Pending",
      requestedAt: new Date().toISOString()
    });

    errorDiv.style.color = "green";
    errorDiv.textContent = "Withdrawal request submitted! Contact live support.";

    // Optional: Redirect to live support
    setTimeout(() => {
      window.location.href = "https://t.me/support_chat"; // Change this to your support link
    }, 3000);
  } catch (error) {
    errorDiv.textContent = "Error processing withdrawal: " + error.message;
  }
});

