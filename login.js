document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        alert('Login successful!');
        window.location.href = "dashboard.html"; // Redirect to dashboard after successful login
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});

// Check if user is already logged in
window.onload = function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = "dashboard.html";
    }
};
