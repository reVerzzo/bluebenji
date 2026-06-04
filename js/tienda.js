// tienda.js - Catálogo con filtros (categoría, precio y búsqueda)
// Los productos se obtienen de la FakeStore API (https://fakestoreapi.com).
document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("gridTienda");
    const contador = document.getElementById("contadorResultados");
    if (!grid) return;

    // Elementos de filtro
    const inputBuscar = document.getElementById("filtroBuscar");
    const contCategorias = document.getElementById("filtroCategorias");
    const precioMin = document.getElementById("precioMin");
    const precioMax = document.getElementById("precioMax");
    const precioMinVal = document.getElementById("precioMinVal");
    const precioMaxVal = document.getElementById("precioMaxVal");
    const btnLimpiar = document.getElementById("limpiarFiltros");

    let productos = [];

    // --- Cargar productos (cacheados, compartidos con la portada) ---
    try {
        const todos = await window.Cache.recordar(
            window.Config.CACHE_KEY,
            window.Config.CACHE_MIN,
            async () => {
                const res = await fetch(`${window.Config.API_URL}/products`);
                if (!res.ok) throw new Error("Respuesta no válida de la API");
                return res.json();
            }
        );
        productos = window.Utils.soloRopa(todos);
    } catch (error) {
        console.error("Error al cargar la tienda:", error);
        grid.innerHTML = `<p class="text-white/50 col-span-full">No se pudieron cargar los productos.</p>`;
        return;
    }

    // --- Rango de precios ---
    const precios = productos.map((p) => p.price);
    const minGlobal = Math.floor(Math.min(...precios));
    const maxGlobal = Math.ceil(Math.max(...precios));
    [precioMin, precioMax].forEach((s) => {
        s.min = minGlobal;
        s.max = maxGlobal;
    });
    precioMin.value = minGlobal;
    precioMax.value = maxGlobal;

    // --- Casillas de categoría ---
    const categorias = [...new Set(productos.map((p) => p.category))];
    contCategorias.innerHTML = categorias
        .map(
            (cat) => `
        <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="js-cat accent-brand-green" value="${cat}" checked>
            ${window.Utils.categoria(cat)}
        </label>`
        )
        .join("");
    const casillas = () => [...document.querySelectorAll(".js-cat")];

    // --- Render del grid según los filtros ---
    function render() {
        const texto = inputBuscar.value.trim().toLowerCase();
        const catsActivas = casillas().filter((c) => c.checked).map((c) => c.value);
        const min = Number(precioMin.value);
        const max = Number(precioMax.value);

        const filtrados = window.Utils.filtrar(productos, {
            texto,
            categorias: catsActivas,
            min,
            max,
        });

        contador.textContent = `${filtrados.length} producto(s)`;

        if (filtrados.length === 0) {
            grid.innerHTML = `<p class="text-white/50 col-span-full">No hay prendas que coincidan con los filtros.</p>`;
            return;
        }

        grid.innerHTML = filtrados
            .map(
                (p) => `
            <div class="bg-brand-card rounded-xl overflow-hidden border-2 border-brand-purple/40 flex flex-col">
                <a href="producto.html?id=${p.id}" class="block">
                    <div class="h-56 bg-white bg-contain bg-center bg-no-repeat" style="background-image:url('${p.image}')"></div>
                </a>
                <div class="p-4 flex flex-col flex-1">
                    <a href="producto.html?id=${p.id}" class="hover:text-brand-green">
                        <h3 class="text-sm font-semibold line-clamp-2 mb-1">${p.title}</h3>
                    </a>
                    <p class="text-xs text-white/50 mb-2">${window.Utils.categoria(p.category)}</p>
                    <p class="text-brand-green font-bold text-lg mb-3">${window.Utils.precio(p.price)}</p>
                    <button class="js-add-cart mt-auto bg-brand-blue text-brand-text font-bold text-sm py-2.5 rounded-lg hover:opacity-90"
                            data-id="${p.id}" data-nombre="${p.title}" data-precio="${p.price}" data-imagen="${p.image}">
                        AÑADIR AL CARRITO
                    </button>
                </div>
            </div>`
            )
            .join("");
    }

    // --- Eventos de filtro ---
    inputBuscar.addEventListener("input", render);
    contCategorias.addEventListener("change", render);

    function syncPrecio(origen) {
        let min = Number(precioMin.value);
        let max = Number(precioMax.value);
        // Evita que se crucen los deslizadores
        if (origen === "min" && min > max) precioMax.value = min;
        if (origen === "max" && max < min) precioMin.value = max;
        precioMinVal.textContent = precioMin.value;
        precioMaxVal.textContent = precioMax.value;
        render();
    }
    precioMin.addEventListener("input", () => syncPrecio("min"));
    precioMax.addEventListener("input", () => syncPrecio("max"));

    btnLimpiar.addEventListener("click", () => {
        inputBuscar.value = "";
        casillas().forEach((c) => (c.checked = true));
        precioMin.value = minGlobal;
        precioMax.value = maxGlobal;
        syncPrecio("min");
    });

    // Primer render
    precioMinVal.textContent = minGlobal;
    precioMaxVal.textContent = maxGlobal;
    render();
});
