document.addEventListener("DOMContentLoaded", function () {
    checkLogin();
});

function checkLogin() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            loadUserData(user.uid);
        } else {
            // User is signed out.
            // Redirect to login page or display a message
            window.location.href = "login.html"; // Replace with your login page URL
        }
    });
}

function loadUserData(uid) {
    const userDocRef = firebase.firestore().collection('users').doc(uid);

    userDocRef.onSnapshot(doc => {
        if (doc.exists) {
            const userData = doc.data();
            user = userData;
            updateBalance();
        } else {
            // User document doesn't exist, create it
            userDocRef.set({ balance: 0 });
        }
    });
}

let user = {
    balance: 0
};

function deposit() {
    let amount = prompt("Enter amount to deposit:");
    if (amount && !isNaN(amount) && amount > 0) {
        user.balance += parseFloat(amount);
        updateBalance();
        updateFirestoreBalance();
    } else {
        alert("Invalid amount");
    }
}

function withdraw() {
    let amount = prompt("Enter amount to withdraw:");
    if (amount && !isNaN(amount) && amount > 0 && amount <= user.balance) {
        user.balance -= parseFloat(amount);
        updateBalance();
        updateFirestoreBalance();
    } else {
        alert("Invalid amount or insufficient balance");
    }
}

function updateBalance() {
    document.getElementById("usd-value").innerText = user.balance;
}

function updateFirestoreBalance() {
    const user = firebase.auth().currentUser;
    if (user) {
        firebase.firestore().collection('users').doc(user.uid).update({
            balance: user.balance
        });
    }
}
