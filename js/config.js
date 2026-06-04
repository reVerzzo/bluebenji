// config.js - Carga de configuración central de la app

window.Config = {
    
    API_URL: "https://fakestoreapi.com",

    
    CATEGORIAS: {
        "men's clothing": "Hombre",
        "women's clothing": "Mujer",
    },

    // Producto de muestra por defecto
    ID_DEFAULT: 2,

    TALLAS: ["S", "M", "L", "XL"],

    CARRITO_KEY: "bluebenji_carrito",
    ENVIO: 0, // envío gratis

    CACHE_KEY: "bluebenji_productos",
    CACHE_MIN: 10,
};
