// ===== API Base URL =====
const API_URL = '/api';

// ===== Authentication Utilities =====

// Get JWT token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Save JWT token to localStorage
function setToken(token) {
  localStorage.setItem('token', token);
}

// Clear token (logout)
function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Get current user from localStorage
function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Make API request with JWT authentication
async function makeRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      clearToken();
      window.location.href = 'login.html';
      return null;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Update navigation based on user authentication status
function updateNavigation() {
  const user = getCurrentUser();
  const loginLink = document.getElementById('loginLink');
  const dashboardLink = document.getElementById('dashboardLink');
  const adminLink = document.getElementById('adminLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (dashboardLink) dashboardLink.style.display = 'block';
    if (adminLink && user.role === 'admin') adminLink.style.display = 'block';
    if (logoutBtn) {
      logoutBtn.style.display = 'block';
      logoutBtn.onclick = logout;
    }
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (dashboardLink) dashboardLink.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

// Logout user
function logout() {
  clearToken();
  window.location.href = 'index.html';
}

// Check if user is authenticated (redirect if not)
function checkAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Check if user is admin
function checkAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = 'dashboard.html';
    return false;
  }
  return true;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();
});
