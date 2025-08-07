const form = document.getElementById("form");
const firstnameInput = document.getElementById("firstname-input");
const lastnameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
