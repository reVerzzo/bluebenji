// admin.js - Panel de administración: estadísticas de ventas desde la FakeStore API
// El acceso es solo para la cuenta de administrador. Las "ventas" se calculan a
// partir de los pedidos (/carts) cruzados con las prendas del catálogo (/products).
document.addEventListener("DOMContentLoaded", async () => {
    // --- Protección: solo el administrador puede entrar ---
    if (!window.Auth || !window.Auth.esAdmin()) {
        window.location.href = "login.html";
        return;
    }

    const API_URL = "https://fakestoreapi.com";
    const CAT_LABELS = { "men's clothing": "Hombre", "women's clothing": "Mujer" };

    const estado = document.getElementById("estadoPanel");
    const elKpis = document.getElementById("kpis");
    const elTop = document.getElementById("topProductos");
    const elCat = document.getElementById("ventasCategoria");

    // Botón de cerrar sesión del panel
    document.getElementById("btnCerrar").addEventListener("click", () => {
        window.Auth.salir();
        window.location.href = "../index.html";
    });

    const dinero = (n) =>
        "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    try {
        // Pedidos y catálogo en paralelo
        const [resCarts, resProds] = await Promise.all([
            fetch(`${API_URL}/carts`),
            fetch(`${API_URL}/products`),
        ]);
        if (!resCarts.ok || !resProds.ok) throw new Error("API no disponible");
        const carts = await resCarts.json();
        const productos = await resProds.json();

        // Mapa solo de prendas de ropa (lo que vende la tienda)
        const mapa = {};
        productos.forEach((p) => {
            if (p.category && p.category.includes("clothing")) mapa[p.id] = p;
        });

        let ventasTotales = 0;
        let unidades = 0;
        let pedidos = 0;
        const porProducto = {}; // id -> { prod, unidades, ingresos }
        const porCategoria = {}; // categoria -> { ingresos, unidades }

        carts.forEach((cart) => {
            let tieneRopa = false;
            (cart.products || []).forEach((linea) => {
                const prod = mapa[linea.productId];
                if (!prod) return; // ignorar lo que no es ropa
                tieneRopa = true;

                const ingreso = prod.price * linea.quantity;
                ventasTotales += ingreso;
                unidades += linea.quantity;

                if (!porProducto[prod.id]) porProducto[prod.id] = { prod, unidades: 0, ingresos: 0 };
                porProducto[prod.id].unidades += linea.quantity;
                porProducto[prod.id].ingresos += ingreso;

                if (!porCategoria[prod.category]) porCategoria[prod.category] = { ingresos: 0, unidades: 0 };
                porCategoria[prod.category].ingresos += ingreso;
                porCategoria[prod.category].unidades += linea.quantity;
            });
            if (tieneRopa) pedidos++;
        });

        const ticket = pedidos ? ventasTotales / pedidos : 0;

        // --- Tarjetas de indicadores (KPIs) ---
        const kpis = [
            { etiqueta: "Ventas totales", valor: dinero(ventasTotales), icono: "fa-sack-dollar", color: "text-brand-green" },
            { etiqueta: "Pedidos", valor: pedidos, icono: "fa-receipt", color: "text-brand-blue" },
            { etiqueta: "Unidades vendidas", valor: unidades, icono: "fa-box-open", color: "text-brand-gold" },
            { etiqueta: "Ticket promedio", valor: dinero(ticket), icono: "fa-chart-line", color: "text-brand-green" },
        ];
        elKpis.innerHTML = kpis
            .map(
                (k) => `
            <div class="bg-brand-card rounded-xl p-5">
                <i class="fas ${k.icono} ${k.color} text-xl mb-3"></i>
                <p class="text-2xl font-bold">${k.valor}</p>
                <p class="text-white/50 text-sm">${k.etiqueta}</p>
            </div>`
            )
            .join("");

        // --- Productos más vendidos (por unidades) ---
        const top = Object.values(porProducto)
            .sort((a, b) => b.unidades - a.unidades)
            .slice(0, 6);
        const maxU = top.length ? top[0].unidades : 1;
        elTop.innerHTML = top.length
            ? top
                  .map(
                      (t) => `
            <li>
                <div class="flex justify-between text-sm mb-1 gap-3">
                    <span class="truncate">${t.prod.title}</span>
                    <span class="text-white/60 whitespace-nowrap">${t.unidades} u · ${dinero(t.ingresos)}</span>
                </div>
                <div class="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full bg-brand-green rounded-full" style="width:${(t.unidades / maxU) * 100}%"></div>
                </div>
            </li>`
                  )
                  .join("")
            : '<li class="text-white/50 text-sm">Sin datos de ventas.</li>';

        // --- Ventas por categoría (por ingresos) ---
        const cats = Object.entries(porCategoria).sort((a, b) => b[1].ingresos - a[1].ingresos);
        const maxI = cats.length ? cats[0][1].ingresos : 1;
        elCat.innerHTML = cats.length
            ? cats
                  .map(([cat, d]) => {
                      const pct = ventasTotales ? (d.ingresos / ventasTotales) * 100 : 0;
                      return `
            <li>
                <div class="flex justify-between text-sm mb-1">
                    <span>${CAT_LABELS[cat] || cat}</span>
                    <span class="text-white/60">${dinero(d.ingresos)} · ${pct.toFixed(1)}%</span>
                </div>
                <div class="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full bg-brand-blue rounded-full" style="width:${(d.ingresos / maxI) * 100}%"></div>
                </div>
            </li>`;
                  })
                  .join("")
            : '<li class="text-white/50 text-sm">Sin datos de ventas.</li>';

        estado.textContent = `Basado en ${carts.length} pedidos registrados en la tienda.`;
    } catch (err) {
        console.error("Error al cargar estadísticas:", err);
        estado.textContent = "No se pudieron cargar las estadísticas. Intenta de nuevo más tarde.";
        estado.classList.add("text-brand-noti");
    }
});
