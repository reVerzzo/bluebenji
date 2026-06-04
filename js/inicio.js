
// inicio.js - Carrusel 

// Los productos se obtienen de la FakeStore API (https://fakestoreapi.com).

document.addEventListener("DOMContentLoaded", async () => {
    const track = document.getElementById("carruselTrack");
    const btnPrev = document.getElementById("carruselPrev");
    const btnNext = document.getElementById("carruselNext");
    if (!track) return;

    try {
        // Se cachea la respuesta de la API para no volver a pedirla en cada visita
        const todos = await window.Cache.recordar(
            window.Config.CACHE_KEY,
            window.Config.CACHE_MIN,
            async () => {
                const res = await fetch(`${window.Config.API_URL}/products`);
                if (!res.ok) throw new Error("Respuesta no válida de la API");
                return res.json();
            }
        );
        const productos = window.Utils.soloRopa(todos);

        track.innerHTML = productos
            .map(
                (p) => `
            <a href="pantallas_html/producto.html?id=${p.id}"
               class="shrink-0 w-52 bg-brand-card rounded-xl p-3 border-2 border-transparent transition">
                <div class="w-full h-44 rounded-lg bg-white bg-contain bg-center bg-no-repeat mb-3"
                     style="background-image:url('${p.image}')"></div>
                <h3 class="text-sm font-semibold truncate">${p.title}</h3>
                <p class="text-brand-green font-bold">${window.Utils.precio(p.price)}</p>
            </a>`
            )
            .join("");
    } catch (error) {
        console.error("Error al cargar el carrusel:", error);
        track.innerHTML = `<p class="text-white/50 p-3">No se pudieron cargar los productos.</p>`;
        return;
    }

    const paso = 232;
    btnNext.addEventListener("click", () => track.scrollBy({ left: paso, behavior: "smooth" }));
    btnPrev.addEventListener("click", () => track.scrollBy({ left: -paso, behavior: "smooth" }));

    
});
