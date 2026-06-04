// producto.js - Pantalla de detalle: datos desde API, tallas, favoritos y carrito
// Responsable: Alberto Ávila
// El producto se obtiene de la FakeStore API (https://fakestoreapi.com).
// El id se toma de ?id= en la URL; si no hay, se usa una prenda por defecto.
document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = window.Config.API_URL;

    const imgPrincipal = document.getElementById("imagenPrincipal");
    const miniaturas = document.getElementById("miniaturas");
    const elCategoria = document.getElementById("prodCategoria");
    const elTitulo = document.getElementById("prodTitulo");
    const elPrecio = document.getElementById("prodPrecio");
    const elDescripcion = document.getElementById("prodDescripcion");
    const elRating = document.getElementById("prodRating");
    const aviso = document.getElementById("avisoTalla");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnComprar = document.getElementById("btnComprarYa");

    const TALLA_ACTIVE = ["bg-brand-green", "text-brand-bg", "border-brand-green"];

    let producto = null;
    let tallaSeleccionada = null;

    // --- Cargar el producto ---
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id") || window.Config.ID_DEFAULT; // prenda por defecto

    try {
        const res = await fetch(`${API_URL}/products/${idProducto}`);
        if (!res.ok) throw new Error("Respuesta no válida de la API");
        producto = await res.json();

        imgPrincipal.style.backgroundImage = `url('${producto.image}')`;
        // La API trae una sola imagen: la usamos como miniaturas
        miniaturas.innerHTML = [0, 1, 2, 3]
            .map(
                (i) => `
            <div class="miniatura w-20 h-20 rounded-lg bg-white bg-contain bg-center bg-no-repeat border-2 ${i === 0 ? "border-brand-green" : "border-transparent"} cursor-pointer"
                 style="background-image:url('${producto.image}')"></div>`
            )
            .join("");

        elCategoria.textContent = window.Utils.categoria(producto.category);
        elTitulo.textContent = producto.title;
        elPrecio.textContent = window.Utils.precio(producto.price);
        elDescripcion.textContent = producto.description;
        if (producto.rating) {
            elRating.textContent = `${producto.rating.rate} / 5 (${producto.rating.count} reseñas)`;
        }
        document.title = `${producto.title} - Benji's Lab`;
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        elTitulo.textContent = "No se pudo cargar el producto";
        elCategoria.textContent = "";
        return;
    }

    // --- Miniaturas: marcar activa ---
    miniaturas.addEventListener("click", (e) => {
        const mini = e.target.closest(".miniatura");
        if (!mini) return;
        miniaturas.querySelectorAll(".miniatura").forEach((m) => {
            m.classList.remove("border-brand-green");
            m.classList.add("border-transparent");
        });
        mini.classList.remove("border-transparent");
        mini.classList.add("border-brand-green");
    });

    // --- Selector de tallas ---
    const tallas = document.querySelectorAll(".talla-btn");
    tallas.forEach((btn) => {
        btn.addEventListener("click", () => {
            tallas.forEach((b) => {
                b.classList.remove(...TALLA_ACTIVE);
                b.classList.add("border-white/30");
            });
            btn.classList.add(...TALLA_ACTIVE);
            btn.classList.remove("border-white/30");
            tallaSeleccionada = btn.dataset.talla;
            aviso.textContent = "";
        });
    });

    // --- Favoritos ---
    const btnFav = document.getElementById("btnFavorito");
    btnFav.addEventListener("click", () => {
        const activo = btnFav.classList.toggle("text-brand-noti");
        btnFav.classList.toggle("border-brand-noti", activo);
        const icono = btnFav.querySelector("i");
        icono.classList.toggle("fas", activo);
        icono.classList.toggle("far", !activo);
    });

    // --- Añadir al carrito (exige talla) ---
    function intentarAgregar() {
        if (!tallaSeleccionada) {
            aviso.className = "text-sm mt-3 text-brand-noti";
            aviso.textContent = "Selecciona una talla antes de continuar.";
            return false;
        }
        window.Carrito.agregar({
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            imagen: producto.image,
            talla: tallaSeleccionada,
        });
        aviso.className = "text-sm mt-3 text-brand-green";
        aviso.textContent = `¡Agregado! ${producto.title} (talla ${tallaSeleccionada}).`;
        return true;
    }

    btnAgregar.addEventListener("click", () => {
        if (intentarAgregar()) window.Carrito.abrir();
    });

    // "Comprar ahora": agrega y va al pago
    btnComprar.addEventListener("click", (e) => {
        e.preventDefault();
        if (intentarAgregar()) window.location.href = "pago.html";
    });
});
