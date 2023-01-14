const user = JSON.parse(localStorage.getItem("auth"));
const form = document.querySelector(".form");
const title = document.getElementById("title");
const body = document.getElementById("body");
const create = document.getElementById("create");
const update = document.getElementById("update");
const userTasks = document.querySelector(".user-tasks");
const username = document.querySelector(".username");

// localStorage.clear();
username.innerHTML = user.username;
if (user.isLoggedIn === "false") {
  window.location.href = "index.html";
}
if (localStorage.getItem(user.email) === null) {
  let obj = {
    title: "Dummy",
    body: "This is dummy task.",
  };
  let tasks = [];
  tasks.push(obj);
  localStorage.setItem(user.email, JSON.stringify(tasks));
}

let data = JSON.parse(localStorage.getItem(user.email));
loadData();
function loadData() {
  data.forEach((element) => {
    let taskElement = document.createElement("div");
    taskElement.className = "card";
    taskElement.innerHTML = `
    <div class="body"><p>${element.body}</p></div>
    <div class="title">
      <h4>${element.title}</h4>
      <button type="button" class="triggerUpdate">Modify</button>
      <button type="button" class="triggerDelete">Delete</button>
      </div>
      `;
    userTasks.appendChild(taskElement);
  });
}

function createTask(user) {
  let taskObj = {
    title: title.value,
    body: body.value,
  };
  // Parse the JSON stored in allEntries
  var existingEntries = JSON.parse(localStorage.getItem(user.email));
  console.log(existingEntries);
  if (existingEntries == null) existingEntries = [];
  var entry = taskObj;
  localStorage.setItem("entry", JSON.stringify(entry));
  // Save allEntries back to local storage
  existingEntries.push(entry);
  localStorage.setItem(user.email, JSON.stringify(existingEntries));
  delete localStorage.entry;

  title.value = "";
  body.value = "";
  window.location.reload();
}

// update task
let index;
let filteredData;
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("triggerUpdate")) {
    let taskTitle = e.target.previousSibling.previousSibling.innerHTML;
    console.log(taskTitle);
    let taskBody = [
      ...e.target.parentElement.previousSibling.previousSibling.childNodes,
    ][0].outerText;
    console.log(taskBody);
    title.value = taskTitle;
    body.value = taskBody;

    index = data.findIndex((element) => {
      return element.title === taskTitle && element.body === taskBody;
    });
    // console.log(index);
    filteredData = data.filter((element) => {
      return element.title !== taskTitle && element.body !== taskBody;
    });
    // console.log(filteredData);
    localStorage.setItem(user.email, JSON.stringify(filteredData));
    create.disabled = "true";
  }
});

function updateTask() {
  const updatedTask = {
    title: title.value,
    body: body.value,
  };

  const data = JSON.parse(localStorage.getItem(user.email));
  console.log(data);
  console.log(index);
  data.splice(index, 0, updatedTask);
  console.log(data);
  localStorage.setItem(user.email, JSON.stringify(data));

  title.value = "";
  body.value = "";
  window.location.reload();
}

// delete task
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("triggerDelete")) {
    let taskTitle = e.target.previousSibling.innerHTML;
    console.log(taskTitle);
    let taskBody = [
      ...e.target.parentElement.previousSibling.previousSibling.childNodes,
    ][0].outerText;

    // title.value = taskTitle;
    // body.value = taskBody;
    // index = data.findIndex((element) => {
    //   return element.title === taskTitle && element.body === taskBody;
    // });
    filteredData = data.filter((element) => {
      return element.title !== taskTitle && element.body !== taskBody;
    });
    localStorage.setItem(user.email, JSON.stringify(filteredData));
    console.log(filteredData);
    window.location.reload();
  }
});

create.addEventListener("click", (e) => {
  e.preventDefault();
  createTask(user);
});

update.addEventListener("click", (e) => {
  e.preventDefault();
  updateTask();
});

function logout() {
  const obj = JSON.parse(localStorage.getItem("auth"));
  let newObj = {
    ...obj,
    isLoggedIn: "false",
  };
  localStorage.setItem("auth", JSON.stringify(newObj));
  window.location.href = "index.html";
}
function searchBar(data) {
  // get search bar element
  const searchInput = document.getElementById("searchInput");

  // store name elements in array-like object
  const namesFromDOM = document.getElementsByClassName("name");

  // listen for user events
  searchInput.addEventListener("keyup", (event) => {
    const { value } = event.target;

    // get user search input converted to lowercase
    const searchQuery = value.toLowerCase();

    for (const nameElement of namesFromDOM) {
      // store name text and convert to lowercase
      let name = nameElement.textContent.toLowerCase();

      // compare current name to search input
      if (name.includes(searchQuery)) {
        // found name matching search, display it
        nameElement.style.backgroundColor = "blue";
      } else {
        // no match, don't display name
        nameElement.style.backgroundColor = "none";
      }
    }
  });
}
