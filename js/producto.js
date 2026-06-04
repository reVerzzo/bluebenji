// producto.js - Talla, favoritos y botón "Agregar al carrito"
// Responsable: Alberto Ávila

document.addEventListener("DOMContentLoaded", () => {
    let tallaSeleccionada = null;
    const aviso = document.getElementById("avisoTalla");

    // Selector de tallas
    const tallas = document.querySelectorAll(".talla-btn");
    tallas.forEach(btn => {
        btn.addEventListener("click", () => {
            tallas.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            tallaSeleccionada = btn.dataset.talla;
            aviso.textContent = "";
        });
    });

    // Botón de favoritos (alterna corazón relleno / contorno)
    const btnFav = document.getElementById("btnFavorito");
    btnFav.addEventListener("click", () => {
        const activo = btnFav.classList.toggle("active");
        const icono = btnFav.querySelector("i");
        icono.classList.toggle("fas", activo);
        icono.classList.toggle("far", !activo);
    });

    // Agregar al carrito (exige seleccionar talla)
    document.getElementById("btnAgregar").addEventListener("click", () => {
        if (!tallaSeleccionada) {
            aviso.style.color = "var(--badge-noti)";
            aviso.textContent = "Selecciona una talla antes de agregar al carrito.";
            return;
        }
        aviso.style.color = "var(--btn-primary)";
        aviso.textContent = `¡Agregado! Camiseta Bugs Bunny Cruz Roja (talla ${tallaSeleccionada}).`;
    });
});
