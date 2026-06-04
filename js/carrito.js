// carrito.js - Funcionalidad del carrito de compras
// Responsable: Santiago (Colin)

const CARRITO_KEY = "bluebenji_carrito";

const leerCarrito = () => JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
const guardarCarrito = (items) => localStorage.setItem(CARRITO_KEY, JSON.stringify(items));

// Agregar producto (si ya existe, suma cantidad)
function agregarProducto(producto) {
    const items = leerCarrito();
    const existente = items.find(i => i.id === producto.id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        items.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(items);
    renderCarrito();
}

// Quitar producto del carrito
function quitarProducto(id) {
    guardarCarrito(leerCarrito().filter(i => i.id !== id));
    renderCarrito();
}

// Mostrar el carrito en el panel y actualizar el contador
function renderCarrito() {
    const items = leerCarrito();
    const lista = document.getElementById("carritoItems");
    const total = document.getElementById("carritoTotal");
    const badge = document.getElementById("cartCount");

    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
    const totalPrecio = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

    if (badge) badge.textContent = totalItems;
    if (total) total.textContent = "$" + totalPrecio;
    if (!lista) return;

    if (items.length === 0) {
        lista.innerHTML = `<li class="text-secondary">Tu carrito está vacío.</li>`;
        return;
    }

    lista.innerHTML = items.map(i => `
        <li class="d-flex justify-content-between align-items-center mb-2">
            <span>${i.nombre} <small class="text-secondary">x${i.cantidad}</small></span>
            <span class="d-flex align-items-center gap-2">
                <strong>$${i.precio * i.cantidad}</strong>
                <button class="btn btn-sm btn-outline-danger js-quitar" data-id="${i.id}" aria-label="Quitar">&times;</button>
            </span>
        </li>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    // Las tarjetas se cargan desde la API, así que usamos delegación de eventos:
    // escuchamos los clics de cualquier botón "AÑADIR AL CARRITO" presente o futuro.
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".js-add-cart");
        if (!btn) return;
        e.preventDefault();
        agregarProducto({
            id: btn.dataset.id,
            nombre: btn.dataset.nombre,
            precio: Number(btn.dataset.precio),
        });
    });

    // Quitar productos (delegación de eventos sobre la lista del panel)
    document.getElementById("carritoItems")?.addEventListener("click", (e) => {
        const btn = e.target.closest(".js-quitar");
        if (btn) quitarProducto(btn.dataset.id);
    });

    renderCarrito();
});
