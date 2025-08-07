// grab elements from html and store them in variables
const form = document.getElementById("form");
const firstnameInput = document.getElementById("firstname-input");
const lastnameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("repeatpassword-input");

//
const errorMessage = document.getElementById("error-message");

// create an event listener to check for errors when the form is submitted and whether it is the sign up or login page
// utilize functions to validate the inputs and then return the appropriate error messages
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let errors = [];

  if (firstnameInput) {
    errors = getSignupErrors(
      firstnameInput.value,
      lastnameInput.value,
      emailInput.value,
      passwordInput.value,
      confirmPasswordInput.value
    );
  } else {
    errors = getLoginErrors(emailInput.value, passwordInput.value);
  }
});

// function to validate login inputs
// if statements to check if the inputs are empty and return the appropriate error messages and add a class to the parent element of the input to change color of element to red
function getSignupErrors(
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) {
  let errors = [];

  if (firstname === "" || firstname === null) {
    errors.push("First name is required.");
    firstnameInput.parentElement.classList.add("incorrect");
  }
  if (lastname === "" || lastname === null) {
    errors.push("Last name is required.");
    lastnameInput.parentElement.classList.add("incorrect");
  }
  if (email === "" || email === null) {
    errors.push("Email is required.");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password === null) {
    errors.push("Password name is required.");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if (confirmPassword === "" || confirmPassword === null) {
    errors.push("Password confirmation is required.");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters.");
    passwordInput.parentElement.classList.add("incorrect");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
    passwordInput.parentElement.classList.add("incorrect");
    confirmPasswordInput.parentElement.classList.add("incorrect");
  }

  if (errors.length > 0) {
    event.preventDefault();
    errorMessage.innerText = errors.join("");
  }

  console.log(errors)
}

function getLoginErrors(email, password) {
  let errors = [];

  if (email === "" || email === null) {
    errors.push("Email is required.");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password === null) {
    errors.push("Password name is required.");
    passwordInput.parentElement.classList.add("incorrect");
  }
}


// store all input variables in an array to loop through them
const allInputs = [
  firstnameInput,
  lastnameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
].filter(input => input != null);

//
// for each input, add an event listener that removes the "incorrect" class and clears the error message when the user types in the input field
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("incorrect");
    errorMessage.innerText = "";
  });
});

// add an event listener to the window that listens for the "DOMContentLoaded" event
// when the event is triggered, remove the "incorrect" class from all elements with the "incorrect" class and clear the error message
// this ensures that the error styling is cleared when the page is loaded
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".incorrect").forEach((el) => {
    el.classList.remove("incorrect");
  });
  errorMessage.innerText = "";
});
