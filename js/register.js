const form = document.querySelector(".form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
let emailError = document.querySelector("#email-error");
let nameError = document.querySelector("#name-error");
let mobileError = document.querySelector("#mobile-error");
let passError = document.querySelector("#password-error");
let confirmError = document.querySelector("#confirm-error");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const mobileRegEx = /^[0]?[789]\d{9}$/;

const users = [];

checkOnLoad();
checkInput();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkOnSubmit();
  let user = {
    username: username.value,
    email: email.value,
    mobile: mobile.value,
    password: confirmPassword.value,
  };

  if (!checkAlreadyExists(user)) {
    addEntry(user);
    document.querySelector(".success").textContent = "Successfully registered!";
    window.location.href = "index.html";
  }
});

function checkAlreadyExists(user) {
  const values = JSON.parse(localStorage.getItem("users"));

  values.forEach((value) => {
    if (
      value.username === user.username &&
      value.email === user.email &&
      value.mobile === user.mobile &&
      value.password === user.password
    ) {
      document.querySelector(".success").textContent =
        "User already exists, Please login";
      console.log("exists");
      return true;
    } else if (value.username === user.username || value.email === user.email) {
      document.querySelector(".success").textContent =
        "Username already exists";
      console.log("username exists");
      return true;
    }
  });
  return false;
}

function addEntry(user) {
  // Parse the JSON stored in allEntriesP
  var existingEntries = JSON.parse(localStorage.getItem("users"));
  if (existingEntries == null) existingEntries = [];
  var entry = user;
  localStorage.setItem("entry", JSON.stringify(entry));
  // Save allEntries back to local storage
  existingEntries.push(entry);
  localStorage.setItem("users", JSON.stringify(existingEntries));
  delete localStorage.entry;
}

function goToLoginPage() {
  window.location.href = "index.html";
}

function checkOnLoad() {
  window.addEventListener("load", () => {
    username.className = username.value.length === 0 ? "valid" : "invalid";
    email.className =
      email.value.length === 0 || emailRegExp.test(email.value)
        ? "valid"
        : "invalid";
    mobile.className =
      mobile.value.length === 0 || mobileRegEx.test(mobile.value)
        ? "valid"
        : "invalid";
    password.className =
      password.value.length === 0 || passRegEx.test(password.value)
        ? "valid"
        : "invalid";
    confirmPassword.className =
      confirmPassword.value.length === 0 ? "valid" : "invalid";
  });
}

function checkInput() {
  username.addEventListener("input", () => {
    const isValid =
      username.value.length === 0 || !username.value.includes("@");
    if (isValid) {
      username.className = "valid";
      nameError.textContent = "";
      nameError.className = "error";
    } else {
      username.className = "invalid";
    }
  });

  email.addEventListener("input", () => {
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    if (isValid) {
      email.className = "valid";
      emailError.textContent = "";
      emailError.className = "error";
    } else {
      email.className = "invalid";
    }
  });

  mobile.addEventListener("input", () => {
    const isValid = mobile.value.length === 0 || mobileRegEx.test(mobile.value);
    if (isValid) {
      mobile.className = "valid";
      mobileError.textContent = "";
      mobileError.className = "error";
    } else {
      mobile.className = "invalid";
    }
  });

  password.addEventListener("input", () => {
    const isValid =
      password.value.length === 0 || passRegEx.test(password.value);
    if (isValid) {
      password.className = "valid";
      passError.textContent = "";
      passError.className = "error";
    } else {
      password.className = "invalid";
    }
  });

  confirmPassword.addEventListener("input", () => {
    const isValid =
      confirmPassword.value.length === 0 ||
      confirmPassword.value === password.value;
    if (isValid) {
      confirmPassword.className = "valid";
      confirmError.textContent = "";
      confirmError.className = "error";
    } else {
      confirmPassword.className = "invalid";
    }
  });
}

function checkOnSubmit() {
  const isValid1 = username.value.length === 0 || !username.value.includes("@");
  if (!isValid1) {
    username.className = "invalid";
    nameError.textContent = "Username can not contain special characters!";
    nameError.className = "error active";
  } else {
    username.className = "valid";
    nameError.textContent = "";
    nameError.className = "error";
  }
  const isValid2 = email.value.length === 0 || emailRegExp.test(email.value);
  if (!isValid2) {
    email.className = "invalid";
    emailError.textContent = "Invalid email";
    emailError.className = "error active";
  } else {
    email.className = "valid";
    emailError.textContent = "";
    emailError.className = "error";
  }
  const isValid3 = mobile.value.length === 0 || mobileRegEx.test(mobile.value);
  if (!isValid3) {
    mobile.className = "invalid";
    mobileError.textContent = "Invalid number";
    mobileError.className = "error active";
  } else {
    mobile.className = "valid";
    mobileError.textContent = "";
    mobileError.className = "error";
  }
  const isValid4 =
    password.value.length === 0 || passRegEx.test(password.value);
  if (!isValid4) {
    password.className = "invalid";
    passError.textContent =
      "Password must be 6-16 characters long and must contains special characters!";
    passError.className = "error active";
  } else {
    password.className = "valid";
    passError.textContent = "";
    passError.className = "error";
  }
  const isValid5 =
    confirmPassword.value.length === 0 ||
    confirmPassword.value === password.value;
  if (!isValid5) {
    confirmPassword.className = "invalid";
    confirmError.textContent = "Password does not match";
    confirmError.className = "error active";
  } else {
    confirmPassword.className = "valid";
    confirmError.textContent = "";
    confirmError.className = "error";
  }
}
