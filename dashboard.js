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
