// pago.js - Pantalla de pago: resumen del carrito, métodos de pago y cobro
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPago");
    const resumenItems = document.getElementById("resumenItems");
    const resumenSubtotal = document.getElementById("resumenSubtotal");
    const resumenTotal = document.getElementById("resumenTotal");
    const errorPago = document.getElementById("errorPago");
    const btnPagar = document.getElementById("btnPagar");
    const camposTarjeta = document.getElementById("camposTarjeta");
    const vistaCheckout = document.getElementById("vistaCheckout");
    const vistaExito = document.getElementById("vistaExito");

    // --- Resumen del pedido ---
    function pintarResumen() {
        const items = window.Carrito.leer();
        const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

        if (items.length === 0) {
            resumenItems.innerHTML = `<li class="text-white/50 text-sm">Tu carrito está vacío.</li>`;
            btnPagar.disabled = true;
            btnPagar.classList.add("opacity-50", "cursor-not-allowed");
            errorPago.textContent = "Agrega productos al carrito antes de pagar.";
        } else {
            resumenItems.innerHTML = items
                .map(
                    (i) => `
                <li class="flex items-center gap-3 text-sm">
                    <div class="w-12 h-12 shrink-0 rounded-lg bg-white bg-contain bg-center bg-no-repeat"
                         style="background-image:url('${i.imagen || ""}')"></div>
                    <div class="flex-1 min-w-0">
                        <p class="truncate">${i.nombre}</p>
                        <p class="text-xs text-white/50">${i.talla ? "Talla " + i.talla + " · " : ""}x${i.cantidad}</p>
                    </div>
                    <strong class="whitespace-nowrap">${window.Utils.precio(i.precio * i.cantidad)}</strong>
                </li>`
                )
                .join("");
        }
        resumenSubtotal.textContent = window.Utils.precio(total);
        resumenTotal.textContent = window.Utils.precio(total);
        btnPagar.textContent = items.length ? `Pagar ${window.Utils.precio(total)}` : "Pagar";
    }

    // --- Método de pago: muestra/oculta campos de tarjeta y resalta la opción ---
    function actualizarMetodo() {
        const metodo = form.querySelector('input[name="metodo"]:checked').value;
        camposTarjeta.classList.toggle("hidden", metodo !== "tarjeta");

        document.querySelectorAll(".metodo-card").forEach((card) => {
            const activo = card.querySelector("input").checked;
            card.classList.toggle("border-brand-green", activo);
            card.classList.toggle("border-white/15", !activo);
        });
    }
    form.querySelectorAll('input[name="metodo"]').forEach((r) =>
        r.addEventListener("change", actualizarMetodo)
    );

    // --- Validación y cobro ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorPago.textContent = "";

        const items = window.Carrito.leer();
        if (items.length === 0) {
            errorPago.textContent = "Tu carrito está vacío.";
            return;
        }

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        if (!nombre || !direccion) {
            errorPago.textContent = "Completa tu nombre y dirección.";
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorPago.textContent = "Escribe un correo electrónico válido.";
            return;
        }

        const metodo = form.querySelector('input[name="metodo"]:checked').value;
        if (metodo === "tarjeta") {
            const tarjeta = document.getElementById("tarjeta").value.replace(/\s/g, "");
            const venc = document.getElementById("venc").value.trim();
            const cvv = document.getElementById("cvv").value.trim();
            if (!/^\d{13,19}$/.test(tarjeta)) {
                errorPago.textContent = "Número de tarjeta inválido.";
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(venc)) {
                errorPago.textContent = "Fecha de vencimiento inválida (MM/AA).";
                return;
            }
            if (!/^\d{3,4}$/.test(cvv)) {
                errorPago.textContent = "CVV inválido.";
                return;
            }
        }

        // Pago "exitoso": vaciar carrito y mostrar confirmación
        window.Carrito.vaciar();
        document.getElementById("numeroPedido").textContent =
            "#BL-" + Math.floor(100000 + Math.random() * 900000);
        vistaCheckout.classList.add("hidden");
        vistaExito.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    pintarResumen();
    actualizarMetodo();
});
