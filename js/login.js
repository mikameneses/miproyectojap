
function validateLogin() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Validar que los campos no estén vacíos
        if (username.trim() !== "" && password.trim() !== "") {
                sessionStorage.setItem("loggedIn", "yes")
               localStorage.setItem("username", username)
               localStorage.setItem("password", password)
            window.location.href = "index.html";
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }
