const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

const showError = (msg) => alert(msg);

const handleLogin = () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const rememberMe = document.getElementById('rememberMe');

  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail && emailInput) {
    emailInput.value = rememberedEmail;
    if (rememberMe) {
        rememberMe.checked = true;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    const users = getUsers();
    const foundUser = users.find(user => user.email === email);

    if (foundUser && foundUser.password === password) {
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('Login successful. Redirecting...');
      window.location.href = 'homepage.html';

    } else {
      showError('Invalid email or password.');
    }
  });
};

const handleRegistration = () => {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullname = document.getElementById('regFullname').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (!fullname || !email || !password) {
      showError('Please fill in all fields');
      return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
      showError('Email already registered!');
      return;
    }

    users.push({ fullname, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! You can now login.');
    window.location.href = 'login.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loginForm')) {
    handleLogin();
  }
  if (document.getElementById('registrationForm')) {
    handleRegistration();
  }
});
