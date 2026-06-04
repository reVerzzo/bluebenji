// carrito.js - Carrito de compras (localStorage) + panel lateral (drawer)
// Responsable: Santiago (Colin)
// Compartido por todas las páginas. Expone window.Carrito para otras pantallas.

const CARRITO_KEY = window.Config.CARRITO_KEY;

const leerCarrito = () => window.Cache.leer(CARRITO_KEY) || [];
const guardarCarrito = (items) => window.Cache.guardar(CARRITO_KEY, items);
const vaciarCarrito = () => {
    window.Cache.borrar(CARRITO_KEY);
    renderCarrito();
};

// Agregar producto (si ya existe el mismo id, suma cantidad)
function agregarProducto(producto) {
    const items = leerCarrito();
    const existente = items.find((i) => i.id === producto.id);
    if (existente) {
        existente.cantidad += 1;
        if (producto.talla) existente.talla = producto.talla;
    } else {
        items.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(items);
    renderCarrito();
}

// Quitar producto del carrito
function quitarProducto(id) {
    guardarCarrito(leerCarrito().filter((i) => String(i.id) !== String(id)));
    renderCarrito();
}

// Pintar el carrito en el panel y actualizar el contador del navbar
function renderCarrito() {
    const items = leerCarrito();
    const lista = document.getElementById("carritoItems");
    const total = document.getElementById("carritoTotal");
    const badge = document.getElementById("cartCount");

    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
    const totalPrecio = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

    if (badge) {
        badge.textContent = totalItems;
        badge.classList.toggle("hidden", totalItems === 0);
    }
    if (total) total.textContent = window.Utils.precio(totalPrecio);
    if (!lista) return;

    if (items.length === 0) {
        lista.innerHTML = `<li class="text-white/50 text-sm">Tu carrito está vacío.</li>`;
        return;
    }

    lista.innerHTML = items
        .map(
            (i) => `
        <li class="flex items-center gap-3">
            <div class="w-14 h-14 shrink-0 rounded-lg bg-white bg-contain bg-center bg-no-repeat"
                 style="background-image: url('${i.imagen || ""}')"></div>
            <div class="flex-1 min-w-0">
                <p class="text-sm leading-tight truncate">${i.nombre}</p>
                <p class="text-xs text-white/50">
                    ${i.talla ? "Talla " + i.talla + " · " : ""}x${i.cantidad}
                </p>
            </div>
            <strong class="text-sm whitespace-nowrap">${window.Utils.precio(i.precio * i.cantidad)}</strong>
            <button class="js-quitar text-brand-noti text-xl leading-none px-1 hover:opacity-70"
                    data-id="${i.id}" aria-label="Quitar">&times;</button>
        </li>`
        )
        .join("");
}

// --- Drawer (panel lateral) ---
function abrirCarrito() {
    const drawer = document.getElementById("cartDrawer");
    const panel = document.getElementById("cartPanel");
    if (!drawer || !panel) return;
    drawer.classList.remove("hidden");
    requestAnimationFrame(() => panel.classList.remove("translate-x-full"));
}

function cerrarCarrito() {
    const drawer = document.getElementById("cartDrawer");
    const panel = document.getElementById("cartPanel");
    if (!drawer || !panel) return;
    panel.classList.add("translate-x-full");
    setTimeout(() => drawer.classList.add("hidden"), 300);
}

document.addEventListener("DOMContentLoaded", () => {
    // Abrir / cerrar el drawer
    document.querySelectorAll("[data-cart-open]").forEach((el) =>
        el.addEventListener("click", (e) => {
            e.preventDefault();
            abrirCarrito();
        })
    );
    document.querySelectorAll("[data-cart-close]").forEach((el) =>
        el.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarCarrito();
        })
    );

    // Añadir al carrito: delegación para botones presentes y futuros (API)
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".js-add-cart");
        if (!btn) return;
        e.preventDefault();
        agregarProducto({
            id: btn.dataset.id,
            nombre: btn.dataset.nombre,
            precio: Number(btn.dataset.precio),
            imagen: btn.dataset.imagen || "",
            talla: btn.dataset.talla || "",
        });
        abrirCarrito(); // feedback inmediato
    });

    // Quitar productos (delegación sobre la lista del panel)
    document.getElementById("carritoItems")?.addEventListener("click", (e) => {
        const btn = e.target.closest(".js-quitar");
        if (btn) quitarProducto(btn.dataset.id);
    });

    renderCarrito();
});

// Disponible para otras pantallas (producto.html, pago.html)
window.Carrito = {
    leer: leerCarrito,
    agregar: agregarProducto,
    quitar: quitarProducto,
    vaciar: vaciarCarrito,
    render: renderCarrito,
    abrir: abrirCarrito,
    cerrar: cerrarCarrito,
};
