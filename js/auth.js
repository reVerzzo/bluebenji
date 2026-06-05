// auth.js - Sesión de usuario (login del administrador) y botón de sesión del navbar
// Compartido por todas las páginas.
// Cuenta de administrador: admin / Hola123
(function () {
    const SESION_KEY = "bluebenji_sesion";
    const ADMIN = { usuario: "admin", clave: "Hola123" };

    // ¿La página está dentro de la carpeta pantallas_html/?
    const enSub = window.location.pathname.includes("/pantallas_html/");
    const P = enSub ? "" : "pantallas_html/"; // prefijo hacia las pantallas
    const RAIZ = enSub ? "../" : ""; // prefijo hacia la raíz (index.html)

    function leerSesion() {
        try {
            return JSON.parse(localStorage.getItem(SESION_KEY));
        } catch (e) {
            return null;
        }
    }
    function guardarSesion(s) {
        localStorage.setItem(SESION_KEY, JSON.stringify(s));
    }
    function cerrarSesion() {
        localStorage.removeItem(SESION_KEY);
    }

    // Valida credenciales; devuelve la sesión creada o null si son incorrectas
    function login(usuario, clave) {
        if (usuario === ADMIN.usuario && clave === ADMIN.clave) {
            const s = { usuario: ADMIN.usuario, rol: "admin" };
            guardarSesion(s);
            return s;
        }
        return null;
    }
    function esAdmin() {
        const s = leerSesion();
        return !!s && s.rol === "admin";
    }

    // Pinta el botón de sesión del navbar según el estado actual
    function pintarNavbar() {
        const area = document.getElementById("authArea");
        if (!area) return;

        if (esAdmin()) {
            area.innerHTML =
                '<a href="' + P + 'admin.html" class="hidden sm:inline font-bold text-sm hover:text-brand-green">Panel</a>' +
                '<button id="btnSalir" class="hover:opacity-80" aria-label="Cerrar sesión" title="Cerrar sesión">' +
                '<i class="fas fa-right-from-bracket text-lg text-brand-noti"></i></button>';
            const salir = document.getElementById("btnSalir");
            if (salir) {
                salir.addEventListener("click", () => {
                    cerrarSesion();
                    window.location.href = RAIZ + "index.html";
                });
            }
        } else {
            area.innerHTML =
                '<a href="' + P + 'login.html" class="hover:opacity-80" aria-label="Iniciar sesión" title="Iniciar sesión">' +
                '<i class="fas fa-user text-lg"></i></a>';
        }
    }

    // API pública (disponible de inmediato para login.js / admin.js)
    window.Auth = {
        login: login,
        salir: cerrarSesion,
        sesion: leerSesion,
        esAdmin: esAdmin,
        rutas: { raiz: RAIZ, pantallas: P },
        pintarNavbar: pintarNavbar,
    };

    document.addEventListener("DOMContentLoaded", pintarNavbar);
})();
