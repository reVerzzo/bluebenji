// tw-config.js - Configuración de Tailwind (Play CDN) para Benji's Lab
// Define la paleta de marca, las fuentes y un par de utilidades.
// Se carga DESPUÉS del CDN de Tailwind en todas las páginas.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Paleta exacta de la marca (tema oscuro / aerógrafo urbano)
                brand: {
                    bg: "#0F0F0F",     // fondo principal
                    text: "#F5F5F5",   // texto principal
                    card: "#2E2E2E",   // tarjetas
                    green: "#76FF03",  // acción principal (verde neón)
                    blue: "#00AEEF",   // acción secundaria (azul)
                    noti: "#FF3C00",   // notificaciones (naranja)
                    purple: "#9400D3", // borde morado
                    gold: "#FFD700",   // borde amarillo
                },
            },
            fontFamily: {
                // Titulares con tipografía tipo cartel
                brand: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
                sans: ["Arial", "Helvetica", "sans-serif"],
            },
        },
    },
    plugins: [
        // Utilidad para ocultar la barra de scroll del carrusel
        function ({ addUtilities }) {
            addUtilities({
                ".no-scrollbar": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                },
                ".no-scrollbar::-webkit-scrollbar": { display: "none" },
            });
        },
    ],
};
