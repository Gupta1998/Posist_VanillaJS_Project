const registerForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");
const registerShow = document.querySelector(".registerShow");
const loginShow = document.querySelector(".loginShow");

loginShow.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.parentElement.classList.add("hide");
  loginForm.parentElement.classList.remove("hide");
});

registerShow.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.parentElement.classList.remove("hide");
  loginForm.parentElement.classList.add("hide");
});

registerForm.addEventListener("submit", register);
loginForm.addEventListener("submit", login);

function login(e, username, password) {
  e.preventDefault();
  username = loginForm.querySelector('[data-id="username"]');
  password = loginForm.querySelector('[data-id="pass"]');

  let values = Object.values(localStorage);
  let modifiedValues = values.map((value) => JSON.parse(value));

  let result = modifiedValues.find((value) => {
    if (username.value.includes("@"))
      return (
        username.value === value.email && password.value === value.password
      );
    else
      return username.value === value.name && password.value === value.password;
  });

  if (result) {
    console.log("Logged in");
    window.history.pushState(
      {},
      "/home",
      window.location.origin + "/home.html"
    );
  } else {
    const error = loginForm.querySelector(".error-msg");
    error.innerHTML = "Invalid username or password!";
    console.log("Invalid username or password!");
  }

  loginForm.reset();
}

function register(e) {
  e.preventDefault();
  let inputs = [...registerForm.querySelectorAll(".form-input")];
  addUser(e, inputs);
  registerForm.reset();
}

function addUser(e, inputs) {
  let user = {};
  inputs.forEach((input) => {
    user[input.name] = input.value;
  });

  localStorage.setItem(Date.now(), JSON.stringify(user));
}

function validation(target) {
  let error;
  let pass;
  const specialChars = "!@#$%&*_";

  if (target.name === "name") {
    for (c of specialChars) {
      if (target.value.includes(c)) {
        error = registerForm.querySelector(".name-error");
        error.classList.remove("hide");
        error.innerHTML = "Special character not allowed!";
        return true;
      }
    }
  } else if (target.name === "email") {
    if (!target.value.includes("@")) {
      error = registerForm.querySelector(".email-error");
      error.classList.remove("hide");
      error.innerHTML = "Email is not valid!";
      return true;
    }
  } else if (target.name === "mobile") {
    if (target.value.length !== 10) {
      error = registerForm.querySelector(".mobile-error");
      error.classList.remove("hide");
      error.innerHTML = "Must be 10 digits!";
      return false;
    }
  } else if (target.name === "password") {
    pass = target.value;
    console.log(pass);
    for (c in specialChars) {
      if (target.value.length < 6 && !target.value.includes(c)) {
        error = registerForm.querySelector(".pass-error");
        error.classList.remove("hide");
        error.innerHTML =
          "Password must be >= 6 characters and must include special characters!";
        return false;
      }
    }
  } else if (target.name === "confirmPassword") {
    console.log(target.value);
    if (!target.value === pass) {
      error = registerForm.querySelector(".password-error");
      error.classList.remove("hide");
      error.innerHTML = "Password does not match!";
      return false;
    }
  }
}
