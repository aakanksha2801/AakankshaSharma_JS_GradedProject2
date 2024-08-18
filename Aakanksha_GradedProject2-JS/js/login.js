function login() {
  const loginForm = document.querySelector('.login-container');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = usernameInput.value;
    let password = passwordInput.value;

    if (username === 'username' && password === 'password') {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = './html/resume.html';
    } else {
      errorMessage.textContent = 'Invalid username/password';
    }
  });
}
