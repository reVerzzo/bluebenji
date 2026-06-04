// utils.js - Funciones auxiliares para formatear datos y filtrar productos
// Expone window.Utils. Usa window.Config para las etiquetas de categoría.
window.Utils = {
    // Formatear un precio: 12.5 -> "$12.50"
    precio(n) {
        return "$" + Number(n || 0).toFixed(2);
    },

    // Etiqueta en español de una categoría de la API
    categoria(cat) {
        return (window.Config?.CATEGORIAS || {})[cat] || cat;
    },

    // Quedarse solo con las prendas de ropa de la API
    soloRopa(productos) {
        return productos.filter((p) => p.category && p.category.includes("clothing"));
    },

    // Filtrar productos por texto, categorías y rango de precio
    filtrar(productos, { texto = "", categorias = null, min = -Infinity, max = Infinity }) {
        const q = texto.trim().toLowerCase();
        return productos.filter(
            (p) =>
                p.title.toLowerCase().includes(q) &&
                (!categorias || categorias.includes(p.category)) &&
                p.price >= min &&
                p.price <= max
        );
    },
};
