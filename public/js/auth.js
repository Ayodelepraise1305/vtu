// ===== Authentication Forms =====

// Handle user registration
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phoneNumber: formData.get('phone'),
      };

      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        const messageEl = document.getElementById('registerMessage');

        if (response.ok) {
          messageEl.className = 'message success';
          messageEl.textContent = 'Registration successful! Redirecting...';
          setToken(result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1500);
        } else {
          messageEl.className = 'message error';
          messageEl.textContent = result.message || 'Registration failed';
        }
      } catch (error) {
        document.getElementById('registerMessage').className = 'message error';
        document.getElementById('registerMessage').textContent = error.message;
      }
    });
  }

  const adminRegisterForm = document.getElementById('adminRegisterForm');
  if (adminRegisterForm) {
    adminRegisterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(adminRegisterForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phoneNumber: formData.get('phone'),
        adminCode: formData.get('adminCode'),
      };

      try {
        const response = await fetch(`${API_URL}/auth/register-admin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        const messageEl = document.getElementById('adminRegisterMessage');

        if (response.ok) {
          messageEl.className = 'message success';
          messageEl.textContent = 'Admin account created! Redirecting...';
          setToken(result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          setTimeout(() => {
            window.location.href = 'admin.html';
          }, 1500);
        } else {
          messageEl.className = 'message error';
          messageEl.textContent = result.message || 'Admin registration failed';
        }
      } catch (error) {
        document.getElementById('adminRegisterMessage').className = 'message error';
        document.getElementById('adminRegisterMessage').textContent = error.message;
      }
    });
  }

  // Handle user login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        const messageEl = document.getElementById('loginMessage');

        if (response.ok) {
          messageEl.className = 'message success';
          messageEl.textContent = 'Login successful! Redirecting...';
          setToken(result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          setTimeout(() => {
            // Redirect based on role
            if (result.user.role === 'admin') {
              window.location.href = 'admin.html';
            } else {
              window.location.href = 'dashboard.html';
            }
          }, 1500);
        } else {
          messageEl.className = 'message error';
          messageEl.textContent = result.message || 'Login failed';
        }
      } catch (error) {
        document.getElementById('loginMessage').className = 'message error';
        document.getElementById('loginMessage').textContent = error.message;
      }
    });
  }

  // Setup logout buttons
  const logoutBtns = document.querySelectorAll('#logoutBtn2, #logoutBtn3');
  logoutBtns.forEach((btn) => {
    btn.addEventListener('click', logout);
  });
});
