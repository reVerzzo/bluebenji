// login.js - Validación del formulario de inicio de sesión
document.addEventListener("DOMContentLoaded", () => {
    // Si ya hay una sesión de administrador, ir directo al panel
    if (window.Auth && window.Auth.esAdmin()) {
        window.location.href = "admin.html";
        return;
    }

    const form = document.getElementById("formLogin");
    const error = document.getElementById("errorLogin");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        error.textContent = "";

        const usuario = document.getElementById("usuario").value.trim();
        const clave = document.getElementById("clave").value;

        if (!usuario || !clave) {
            error.textContent = "Escribe tu usuario y contraseña.";
            return;
        }

        const sesion = window.Auth.login(usuario, clave);
        if (!sesion) {
            error.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        // Acceso correcto: ir al panel de administración
        window.location.href = "admin.html";
    });
});
