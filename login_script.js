const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const submitButton = document.getElementById("submit-button");
const toggleLink = document.getElementById("toggle-link");
const confirmPasswordGroup = document.getElementById("confirm-password-group");

let isLogin = true; // Tracks if the current form is for login or registration

// Toggle between Login and Registration forms
toggleLink.addEventListener("click", (event) => {
    event.preventDefault();

    isLogin = !isLogin;

    if (isLogin) {
        formTitle.textContent = "Login";
        submitButton.textContent = "Login";
        toggleLink.innerHTML = "Don't have an account? <a href='#'>Register</a>";
        confirmPasswordGroup.style.display = "none";
    } else {
        formTitle.textContent = "Register";
        submitButton.textContent = "Register";
        toggleLink.innerHTML = "Already have an account? <a href='#'>Login</a>";
        confirmPasswordGroup.style.display = "block";
    }
});

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form["confirm-password"].value;

    if (!isLogin && password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (isLogin) {
        // Perform login action
        console.log("Logging in with", { email, password });
    } else {
        // Perform registration action
        console.log("Registering with", { email, password });
    }

    form.reset();
});
