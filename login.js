"use strict";
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

function Toggle() {
  const passwordInput = document.getElementById("password");
  const eyesIcon = document.getElementById("eyesIcon");
  if (passwordInput.type === "password") {
    passwordInput.type = " text ";
    eyesIcon.innerHTML = `<i class="bi bi-eye"></i>`;
  } else {
    passwordInput.type = "password";
    eyesIcon.innerHTML = `<i class="bi bi-eye-slash"></i>`;
  }
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const emailSpace = document.getElementById("email").value;
  const passwordSpace = document.getElementById("password").value;

  if (!isValidEmail(emailSpace)) {
    alert("Invalid Email");
    return;
  }
  if (passwordSpace.length < 8) {
    alert("characters should be 8 or more");
    return;
  }
  if (
    emailSpace === "anim-larbi.eddison@persol.net" &&
    passwordSpace === "Persol1994*"
  ) {
    window.location.href = "/to-do.html";
  } else if (
    emailSpace !== "anim-larbi.eddison@persol.net" &&
    passwordSpace !== "Persol1994*"
  ) {
    alert("Invalid email or password");
  }
});

function isValidEmail(emailSpace) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailSpace);
}
