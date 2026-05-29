// ===== Admin Dashboard Functionality =====

document.addEventListener('DOMContentLoaded', () => {
  checkAdmin();
  loadAdminStats();
  loadAllUsers();
  loadAllTransactions();
});

// Load admin statistics
async function loadAdminStats() {
  try {
    const response = await makeRequest('/admin/stats');
    if (response) {
      document.getElementById('totalUsers').textContent = response.totalUsers;
      document.getElementById('totalTransactions').textContent =
        response.totalTransactions;
      document.getElementById('totalVolume').textContent =
        `₦${response.totalVolume.toFixed(2)}`;
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Load all users
async function loadAllUsers() {
  try {
    const response = await makeRequest('/admin/users');
    if (response) {
      const tbody = document.getElementById('usersBody');
      tbody.innerHTML = '';

      response.forEach((user) => {
        const row = document.createElement('tr');
        const createdDate = new Date(user.createdAt).toLocaleDateString();
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phoneNumber}</td>
          <td>₦${user.walletBalance.toFixed(2)}</td>
          <td><span class="badge badge-${user.role}">${user.role}</span></td>
          <td>${createdDate}</td>
        `;
        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

// Load all transactions
async function loadAllTransactions() {
  try {
    const response = await makeRequest('/admin/transactions');
    if (response) {
      const tbody = document.getElementById('adminTransactionsBody');
      tbody.innerHTML = '';

      response.forEach((transaction) => {
        const row = document.createElement('tr');
        const date = new Date(transaction.transactionDate).toLocaleDateString();
        row.innerHTML = `
          <td>${transaction.userId?.name || 'Unknown'}</td>
          <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
          <td>${transaction.networkProvider}</td>
          <td>₦${transaction.amount.toFixed(2)}</td>
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
