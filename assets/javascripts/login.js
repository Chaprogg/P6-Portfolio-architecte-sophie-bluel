// Access DOM LOGIN
const form = document.querySelector("form");
const errorMessage = document.querySelector(".errorLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");

//AddEventListener for Email and Password Input Form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userEmail = email.value;
    const userPassword = password.value;
    console.log(userEmail, userPassword);
    const login = {
      email: userEmail,
      password: userPassword,
    };
    //JSON format response
    const user = JSON.stringify(login);


//Fetch Request Server (same-origin= validate login)
fetch("http://localhost:5678/api/users/login", {
    method: "post",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: user,
})

//Response recover Database
.then((ServerResponse) => {
    if (!ServerResponse.ok) {
    const errorLogin = document.querySelector("p");
    errorLogin.textContent = "L'Email ou le Mot de passe sont incorrects.";

      throw new Error();
    }
    // Json Parse
    return ServerResponse.json(); 
})

// Recover Data Id and Token of user
.then((data) => {
    const userId = data.userId;
    const userToken = data.token;
    window.sessionStorage.setItem("userId", userId);
    window.sessionStorage.setItem("token", userToken);
    window.location.href = "index.html";
    })

    .catch(() => {
    console.error("L'email ou le mot de passe sont manquants ou invalides");
    });
})

// Display Modal at click on Modifier Button
//login.addEventListener("click", () => {
  //  containerModal.style.display = "flex"
//})
//console.log(sessionStorage)