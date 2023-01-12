if (localStorage.getItem("authenticated") === "false") {
  window.location.href = "index.html";
}

fetch("https://dummyjson.com/quotes?limit=10")
  .then((res) => res.json())
  .then((data) => {
    const userPosts = document.querySelector(".user-posts");
    data.quotes.forEach((quote) => {
      let childElement = document.createElement("div");
      childElement.className = "quote";
      childElement.innerHTML = `
                <div class="body">
                    <p>${quote.quote}</p>
                    <div class="author"><h3>${quote.author}</h3></div>
                </div>
        `;
      userPosts.appendChild(childElement);
    });
    console.log(userPosts);
  });

function logout() {
  localStorage.authenticated = false;
  window.location.href = "index.html";
}
