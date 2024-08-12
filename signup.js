document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Check if the username already exists
    if (localStorage.getItem(username)) {
        errorMessage.textContent = "Username already exists.";
    } else {
        const user = { username: username, password: password };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Signup successful! Please log in.');
        window.location.href = "login.html"; // Redirect to login page after successful signup
    }
});
