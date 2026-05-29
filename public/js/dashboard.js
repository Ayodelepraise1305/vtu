// ===== Dashboard Functionality =====

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadWalletBalance();
  loadTransactionHistory();
  setupBuyForms();
  setupFundWallet();
});

// Load and display wallet balance
async function loadWalletBalance() {
  try {
    const response = await makeRequest('/payments/wallet-balance');
    if (response) {
      const balanceElement = document.getElementById('walletBalance');
      balanceElement.textContent = `₦${response.walletBalance.toFixed(2)}`;
    }
  } catch (error) {
    console.error('Error loading wallet balance:', error);
  }
}

// Load transaction history
async function loadTransactionHistory() {
  try {
    const response = await makeRequest('/transactions/history');
    if (response) {
      const tbody = document.getElementById('transactionBody');
      tbody.innerHTML = '';

      response.forEach((transaction) => {
        const row = document.createElement('tr');
        const date = new Date(transaction.transactionDate).toLocaleDateString();
        row.innerHTML = `
          <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
          <td>${transaction.networkProvider}</td>
          <td>₦${transaction.amount.toFixed(2)}</td>
          <td>${transaction.recipientPhone}</td>
          <td><span class="status-${transaction.status}">${transaction.status}</span></td>
          <td>${date}</td>
        `;
        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error loading transactions:', error);
  }
}

// Setup buy airtime and buy data forms
function setupBuyForms() {
  const airtimeForm = document.getElementById('airtimeForm');
  if (airtimeForm) {
    airtimeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        networkProvider: document.getElementById('airtimeProvider').value,
        amount: parseInt(document.getElementById('airtimeAmount').value),
        recipientPhone: document.getElementById('airtimePhone').value,
      };

      try {
        const response = await makeRequest('/transactions/buy-airtime', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        alert('Airtime purchased successfully!');
        airtimeForm.reset();
        loadWalletBalance();
        loadTransactionHistory();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }

  const dataForm = document.getElementById('dataForm');
  if (dataForm) {
    dataForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        networkProvider: document.getElementById('dataProvider').value,
        amount: parseInt(document.getElementById('dataAmount').value),
        recipientPhone: document.getElementById('dataPhone').value,
      };

      try {
        const response = await makeRequest('/transactions/buy-data', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        alert('Data purchased successfully!');
        dataForm.reset();
        loadWalletBalance();
        loadTransactionHistory();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }
}

// Setup fund wallet functionality
function setupFundWallet() {
  const fundForm = document.getElementById('fundForm');
  if (fundForm) {
    fundForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = parseInt(document.getElementById('fundAmount').value);

      try {
        const response = await makeRequest('/payments/initialize', {
          method: 'POST',
          body: JSON.stringify({ amount }),
        });

        alert(
          'Payment initialized. In production, redirect to: ' + response.paystackUrl
        );
        document.getElementById('fundModal').style.display = 'none';
        fundForm.reset();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }
}

// Switch between tabs
function switchTab(tabName) {
  // Hide all tabs
  document.getElementById('airtimeTab').classList.remove('active');
  document.getElementById('dataTab').classList.remove('active');

  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Show selected tab
  if (tabName === 'airtime') {
    document.getElementById('airtimeTab').classList.add('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
  } else {
    document.getElementById('dataTab').classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
  }
}
