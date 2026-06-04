// config.js - Carga de configuración central de la app
// Valores compartidos por todas las pantallas (API, categorías, tallas, carrito).
// Se carga ANTES que el resto de scripts y expone window.Config.
window.Config = {
    // FakeStore API: origen de todo el catálogo (sin datos en duro)
    API_URL: "https://fakestoreapi.com",

    // Categorías de ropa de la API con su etiqueta en español
    CATEGORIAS: {
        "men's clothing": "Hombre",
        "women's clothing": "Mujer",
    },

    // Producto que se muestra por defecto en el detalle cuando no hay ?id=
    ID_DEFAULT: 2,

    // Tallas disponibles para las prendas
    TALLAS: ["S", "M", "L", "XL"],

    // Carrito: clave de localStorage y costo de envío
    CARRITO_KEY: "bluebenji_carrito",
    ENVIO: 0, // envío gratis

    // Caché de la API: clave y minutos de vigencia
    CACHE_KEY: "bluebenji_productos",
    CACHE_MIN: 10,
};
