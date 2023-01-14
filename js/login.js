const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.querySelector(".form");
const data = JSON.parse(localStorage.getItem("users"));

function validateUser() {
  for (user of data) {
    if (
      (username.value === user.username || username.value === user.email) &&
      password.value === user.password
    ) {
      document.querySelector(".submit-btn").setAttribute("disabled", "false");
      document.querySelector(".error").textContent = "";
      document.querySelector("#success").textContent =
        "Logged in Successfully!";
      let loginObj = {
        ...user,
        isLoggedIn: true,
      };
      localStorage.setItem("auth", JSON.stringify(loginObj));
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1000);
      break;
    } else {
      document.querySelector(".success").textContent = "";
      document.querySelector(".error").textContent =
        "Username or password invalid!";
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUser();
  var uri = window.location.toString();
  if (uri.indexOf("?") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri);
  }
});

function goToRegisterPage() {
  window.location.href = "register.html";
}
