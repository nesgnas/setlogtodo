const formTitle = document.getElementById('formTitle');
const loginForm = document.getElementById('loginForm');
const toggleForm = document.getElementById('toggleForm');
const toggleLink = document.getElementById('toggleLink');
const errorMessage = document.getElementById('errorMessage');

let isLogin = true; // Track whether the user is on the login or signup form

// Toggle between login and signup forms
toggleLink.addEventListener('click', function(event) {
    event.preventDefault();
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.textContent = 'Login';
        toggleForm.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign up here</a>`;
        document.querySelector('button').textContent = 'Login';
    } else {
        formTitle.textContent = 'Sign Up';
        toggleForm.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login here</a>`;
        document.querySelector('button').textContent = 'Sign Up';
    }
});

// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        // Login logic
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            alert('Login successful!');
            window.location.href = "dashboard.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    } else {
        // Signup logic
        if (localStorage.getItem(username)) {
            errorMessage.textContent = "Username already exists.";
        } else {
            const user = { username: username, password: password };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Signup successful! Please log in.');
            isLogin = true;
            formTitle.textContent = 'Login';
            toggleForm.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign up here</a>`;
            document.querySelector('button').textContent = 'Login';
        }
    }
});

// Check if user is already logged in
window.onload = function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = "dashboard.html";
    }
};
