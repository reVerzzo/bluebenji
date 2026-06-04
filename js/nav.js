// nav.js - Comportamiento del navbar (menú hamburguesa en móvil)
// Compartido por todas las páginas.
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const oculto = menu.classList.toggle("hidden");
        menu.classList.toggle("flex", !oculto); // en móvil se muestra como columna
    });

    // Al hacer clic en un enlace del menú, se cierra en móvil
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                menu.classList.add("hidden");
                menu.classList.remove("flex");
            }
        });
    });
});
