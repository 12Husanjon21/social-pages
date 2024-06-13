const emailInput = document.getElementsByName("email")[0];
const passwordInput = document.getElementsByName("password")[0];
const form = document.querySelector("form");
const loginButton = document.querySelector("button");
const visibilityBtn = document.querySelector(".visibility-btn");
const eyeContainer = document.querySelector("button.visibility-btn > span");

let email, password;
let passwordShow = false;
        

init();

function init() {
    redirect();

    emailInput.oninput = function(event) {
        email = event.target.value.trim();
        toggleButton();
    }

    passwordInput.oninput = function(event) {
        password = event.target.value.trim();
        toggleButton();
    }
    form.onsubmit = async function(event) {
        event.preventDefault();
               
        const result = await login();
        saveToken(result.token);
        redirect();
    }

    eyeContainer.textContent = "visibility_off";

  visibilityBtn.onclick = function () {
    passwordShow = passwordShow ? false : true;

    if (passwordShow == true) {
      passwordInput.type = "text";
      eyeContainer.textContent = 'visibility';
    } else {
      passwordInput.type = "password";
      eyeContainer.textContent = 'visibility_off';
    }

    }
}

        function toggleButton() {
            if (email && password) {
                loginButton.disabled = false;
            } else {
                loginButton.disabled = true;
            }
        }


        async function login() {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login',{
            method:'POST',
            body:JSON.stringify({
                email: "john@mail.com",
                password: "changeme"
            }),
            headers: {
                'Content-Type': 'application/json'
        }
        });
        const result = await response.json();
        return result;
    }

    
        
        function saveToken(token) {
             localStorage.setItem("token", token); 
        }

        function redirect() {
            const token = localStorage.getItem("token");
            if (token) {
            window.location.href = "/index.html";
            }
        }