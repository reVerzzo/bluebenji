// carrusel.js - Carrusel de "Productos top"
// Responsable: Santiago (Colin)
// Los productos se obtienen de la FakeStore API (https://fakestoreapi.com)

document.addEventListener("DOMContentLoaded", async () => {
    const track = document.getElementById("carruselTrack");
    const btnPrev = document.getElementById("carruselPrev");
    const btnNext = document.getElementById("carruselNext");
    if (!track) return;

    const API_URL = "https://fakestoreapi.com";
    const bordes = ["border-purple", "border-yellow"];

    try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Respuesta no válida de la API");
    
        const productos = (await res.json()).filter(p => p.category.includes("clothing"));

        track.innerHTML = productos.map((p, i) => `
            <div class="carrusel-item ${bordes[i % bordes.length]}">
                <div class="carrusel-img" style="background-image: url('${p.image}')"></div>
                <h6 class="fs-6 mb-1">${p.title}</h6>
                <p class="mb-0">$${p.price}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error al cargar el carrusel:", error);
        track.innerHTML = `<p class="text-secondary p-3">No se pudieron cargar los productos.</p>`;
        return;
    }

    const paso = 236;
    btnNext.addEventListener("click", () => track.scrollBy({ left: paso, behavior: "smooth" }));
    btnPrev.addEventListener("click", () => track.scrollBy({ left: -paso, behavior: "smooth" }));

    // Auto-desplazamiento: vuelve al inicio
    setInterval(() => {
        const finReal = track.scrollWidth - track.clientWidth - 5;
        if (track.scrollLeft >= finReal) {
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            track.scrollBy({ left: paso, behavior: "smooth" });
        }
    }, 3000);
});
