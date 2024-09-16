let url = "https://66e7e6a8b17821a9d9da6f51.mockapi.io/usersAccount";

let signUpBtn = document.getElementById("signUpBtn");
let userName = document.getElementById("userName");
let emailAddress = document.getElementById("emailAddress");
let pass = document.getElementById("pass");

let logInBtn = document.getElementById("logInBtn");
let userValidate = document.getElementById("userValidate");
let passValidate = document.getElementById("passValidate");

let alertDisplayed = false;
let wrapper = document.createElement("div");
let mess = document.createElement("p");

async function signUp() {
  event.preventDefault();
  if (userName.value.length >= 5) {
    if (pass.value.length >= 8) {
      let validateEmail = (emailAddress) => {
        return emailAddress.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      if (validateEmail(emailAddress)) {
        let textUser = await areUserTaken(userName.value, emailAddress.value);
        if (!textUser) {
          fetch(url, {
            method: "POST",
            body: JSON.stringify({
              user: userName.value,
              email: emailAddress.value,
              pass: pass.value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  user: userName.value,
                  email: emailAddress.value,
                })
              );
              window.location.href = "./home.html";
            });
        } else {
          errorSign("Username or email is Taken!");
        }
      } else {
        errorSign("Invalid email!");
      }
    } else {
      errorSign("Password must be at least 8 characters!");
    }
  } else {
    errorSign("Username must be at least 5 characters!");
  }
}

function logIn() {
  event.preventDefault();
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let userFound = false;
      json.map((data) => {
        if (userValidate.value === data.user) {
          if (passValidate.value === data.pass) {
            localStorage.setItem(
              "user",
              JSON.stringify({ user: data.user, email: data.email })
            );
            window.location.href = "./home.html";
            userFound = true;
          } else {
            errorLog("Incorrect password!");
          }
        }
      });
      if (!userFound) {
        errorLog("User not found!");
      }
    });
}

function errorSign(message) {
  let alertPlaceholder = document.getElementsByClassName(
    "liveAlertPlaceholder"
  )[1];

  if (!alertDisplayed) {
    let appendAlert = (message) => {
      mess.textContent = message;
      mess.style.color = "red";
      wrapper.appendChild(mess);

      alertPlaceholder.append(wrapper);
      alertDisplayed = true;

      setTimeout(() => {
        wrapper.remove();
      }, 5000);
    };
    let alertTrigger = document.getElementsByClassName("liveAlertBtn")[1];
    if (alertTrigger) {
      alertTrigger.addEventListener("click", () => {
        appendAlert(message);
      });
    }
  }
}

function errorLog(message) {
  let alertPlaceholder = document.getElementsByClassName(
    "liveAlertPlaceholder"
  )[0];

  if (!alertDisplayed) {
    let appendAlert = (message) => {
      mess.textContent = message;
      mess.style.color = "red";
      wrapper.appendChild(mess);

      alertPlaceholder.append(wrapper);
      alertDisplayed = true;

      setTimeout(() => {
        wrapper.remove();
      }, 5000);
    };
    let alertTrigger = document.getElementsByClassName("liveAlertBtn")[0];
    if (alertTrigger) {
      alertTrigger.addEventListener("click", () => {
        appendAlert(message);
      });
    }
  }
}

function areUserTaken(userName, emailAddress) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json.some(
        (data) => data.user === userName || data.email === emailAddress
      );
    });
}
