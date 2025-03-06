// --- CoinGecko Ping API Call ---
const pingUrl = 'https://api.coingecko.com/api/v3/ping';
const pingOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': 'CG-16yhk7Quh4Sov5LDDs9X226k'
  }
};

fetch(pingUrl, pingOptions)
  .then(res => res.json())
  .then(json => {
    console.log('Ping API response:', json);
    // You can add additional logic here, such as updating a UI element
  })
  .catch(err => console.error('Ping API error:', err));


// --- Example: Fetching Crypto Prices for the Quotation Section ---
const quotationList = document.getElementById("quotation-list");

// Replace with your actual crypto API endpoint if different
const cryptoApiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd&include_24hr_change=true";

function fetchCryptoPrices() {
  fetch(cryptoApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Crypto API Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Clear existing list items
      quotationList.innerHTML = "";

      // Build new list items for BTC, ETH, USDT
      const coins = [
        { name: "BTC", key: "bitcoin" },
        { name: "ETH", key: "ethereum" },
        { name: "USDT", key: "tether" }
      ];

      coins.forEach(coin => {
        const price = data[coin.key].usd;
        const change = data[coin.key].usd_24h_change;
        const changeClass = change >= 0 ? "positive" : "negative";
        const listItem = document.createElement("li");

        listItem.innerHTML = `
          <div class="coin-name">${coin.name}</div>
          <div class="coin-price">$${price.toLocaleString()}</div>
          <div class="coin-change ${changeClass}">${change.toFixed(2)}%</div>
        `;
        quotationList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error fetching crypto prices:", error);
      quotationList.innerHTML = "<li>Error loading data</li>";
    });
}


// --- Example: Fetching Recent Transactions for the Revenue Section ---
const revenueTableBody = document.getElementById("revenue-table-body");

// Replace with your actual revenue/transactions API endpoint
const revenueApiUrl = "https://api.example.com/revenue";

function fetchRevenueData() {
  fetch(revenueApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Revenue API Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Clear existing rows
      revenueTableBody.innerHTML = "";

      // Populate table rows
      data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.username}</td>
          <td>${entry.amount}</td>
          <td>${entry.date}</td>
        `;
        revenueTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error fetching revenue data:", error);
      revenueTableBody.innerHTML = "<tr><td colspan='3'>Error loading data</td></tr>";
    });
}


// --- Event Listener for DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", () => {
  // Call API functions on page load
  fetchCryptoPrices();
  fetchRevenueData();

  // Optionally, refresh data periodically:
  // setInterval(fetchCryptoPrices, 60000); // Refresh every 60 seconds
  // setInterval(fetchRevenueData, 60000);
});
