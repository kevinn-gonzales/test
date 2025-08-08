const form = document.getElementById("form");
const firstnameInput = document.getElementById("firstname-input");
const lastnameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("repeatpassword-input");
const errorMessage = document.getElementById("error-message");

// Run when the form is submitted
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let errors = [];

  if (firstnameInput) {
    // Signup page
    errors = getSignupErrors(
      firstnameInput.value,
      lastnameInput.value,
      emailInput.value,
      passwordInput.value,
      confirmPasswordInput.value
    );

    if (errors.length === 0) {
      // No errors — send signup request
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: emailInput.value,
            password: passwordInput.value,
            firstname: firstnameInput.value,
            lastname: lastnameInput.value,
          }),
        });

        const message = await response.text();
        alert(message);

        if (message == "Signup successful") {
          window.location.href = "login.html";
        }

      } catch (err) {
        alert("Signup failed. Try again.");
        console.error(err);
      }
    } else {
      errorMessage.innerText = errors.join("\n");
    }
  } else {
    // Login page
    errors = getLoginErrors(emailInput.value, passwordInput.value);

    if (errors.length === 0) {
      // No errors — send login request
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: emailInput.value,
            password: passwordInput.value,
          }),
        });

        const message = await response.text();
        alert(message);

        if (message == "Login successful") {
          window.location.href = "home.html";
        }

      } catch (err) {
        alert("Login failed. Try again.");
        console.error(err);
      }
    } else {
      errorMessage.innerText = errors.join("\n");
    }
  }
});

// Validation for signup
function getSignupErrors(
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) {
  let errors = [];

  if (!firstname) {
    errors.push("First name is required.");
    firstnameInput.parentElement.classList.add("incorrect");
  }
  if (!lastname) {
    errors.push("Last name is required.");
    lastnameInput.parentElement.classList.add("incorrect");
  }
  if (!email) {
    errors.push("Email is required.");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (!password) {
    errors.push("Password is required.");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if (!confirmPassword) {
    errors.push("Password confirmation is required.");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }

  if (password && password.length < 8) {
    errors.push("Password must be at least 8 characters.");
    passwordInput.parentElement.classList.add("incorrect");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
    passwordInput.parentElement.classList.add("incorrect");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }

  return errors;
}

// Validation for login
function getLoginErrors(email, password) {
  let errors = [];

  if (!email) {
    errors.push("Email is required.");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (!password) {
    errors.push("Password is required.");
    passwordInput.parentElement.classList.add("incorrect");
  }

  return errors;
}

// Clear styles on input
const allInputs = [
  firstnameInput,
  lastnameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("incorrect");
    errorMessage.innerText = "";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".incorrect").forEach((el) => {
    el.classList.remove("incorrect");
  });
  errorMessage.innerText = "";
});
