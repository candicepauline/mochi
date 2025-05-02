const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const showError = (message) => alert(message);

const handleLogin = () => {
  const form = document.getElementById('loginForm');
  const rememberMe = document.getElementById('rememberMe');
  const emailInput = document.getElementById('loginEmail');

  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMe.checked = true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    const users = getUsers();
    const validUser = users.find(user => 
      user.email === email && user.password === password
    );

    if (validUser) {
      rememberMe.checked ?
        localStorage.setItem('rememberedEmail', email) :
        localStorage.removeItem('rememberedEmail');

      window.location.href = 'homepage.html';
    } else {
      showError('Invalid email or password');
    }
  });
};

const handleRegistration = () => {
  const form = document.getElementById('registrationForm');
  
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
    window.location.href = 'homepage.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loginForm')) handleLogin();
  if (document.getElementById('registrationForm')) handleRegistration();
});