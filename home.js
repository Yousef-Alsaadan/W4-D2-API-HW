window.onload = function () {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userBar = document.getElementsByClassName("user_bar")[0];

  if (userData) {
    let div = document.createElement("div");
    let name = document.createElement("p");
    let logOut = document.createElement("button");

    div.setAttribute("class", "flex");
    name.textContent = `${userData.user}`;
    logOut.textContent = "Log Out";
    div.setAttribute("onclick", "logOut()");

    div.appendChild(name);
    div.appendChild(logOut);
    userBar.appendChild(div);
  } else {
    window.location.href = "./index.html";
  }
  // else {
  //   let hidden = document.getElementsByClassName("hidden")[0];
  //   hidden.style.display = "block";
  // }
};

function logOut() {
  localStorage.removeItem("user");
  window.location.href = "./home.html";
}
