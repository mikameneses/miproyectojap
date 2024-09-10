document.addEventListener("DOMContentLoaded", function() {
    // Guardar los identificadores de categoría y redireccionar
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });

    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });

    // Verifica si el usuario está autenticado
    const loggedIn = localStorage.getItem('loggedIn');

    if (!loggedIn) {
        // Redirige al usuario al login si no ha iniciado sesión
        window.location.href = 'login.html';
    }

    // Mostrar el nombre de usuario si está disponible
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("userDisplay").textContent = username;
    }
});
 ⁠
