// productos.js - Cuadrícula de "Destacados de la semana"
// Responsable: Santiago (Colin)
// Los productos se obtienen de la FakeStore API (https://fakestoreapi.com)

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("gridDestacados");
    if (!grid) return;

    const API_URL = "https://fakestoreapi.com";
    const bordes = ["border-purple", "border-yellow"];

    // Cargar productos destacados usando la FakeStore API
    try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Respuesta no válida de la API");
        
        const productos = (await res.json())
            .filter(p => p.category.includes("clothing"))
            .slice(0, 8);

        grid.innerHTML = productos.map((p, i) => `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card custom-card ${bordes[i % bordes.length]} h-100 p-3 text-white">
                    <div class="product-img mb-3" style="background-image: url('${p.image}')"></div>
                    <h5 class="card-title fs-6">${p.title}</h5>
                    <p class="card-text mb-4">$${p.price}</p>
                    <button class="btn btn-custom-blue w-100 mt-auto js-add-cart"
                            data-id="${p.id}" data-nombre="${p.title}" data-precio="${p.price}">
                        AÑADIR AL CARRITO
                    </button>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error al cargar los destacados:", error);
        grid.innerHTML = `<p class="text-center text-secondary">No se pudieron cargar los productos.</p>`;
    }
});
