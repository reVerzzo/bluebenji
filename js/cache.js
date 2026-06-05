// cache.js - Almacenamiento en localStorage (evita recargas innecesarias)
// Guarda y lee datos del navegador y cachea respuestas de la API con caducidad.
// Expone window.Cache.
window.Cache = {
    // Guardar cualquier dato (se serializa a JSON)
    guardar(clave, dato) {
        try {
            localStorage.setItem(clave, JSON.stringify(dato));
        } catch (e) {
            console.warn("No se pudo guardar en caché:", e);
        }
    },

    // Leer un dato (o null si no existe)
    leer(clave) {
        const dato = localStorage.getItem(clave);
        return dato ? JSON.parse(dato) : null;
    },

    // Borrar un dato
    borrar(clave) {
        localStorage.removeItem(clave);
    },

    // Recordar el resultado de una función async (p. ej. un fetch) durante
    // unos minutos, para no volver a pedir lo mismo a la API en cada visita.
    async recordar(clave, minutos, obtener) {
        const guardado = this.leer(clave);
        if (guardado && Date.now() - guardado.t < minutos * 60000) {
            return guardado.datos;
        }
        const datos = await obtener();
        this.guardar(clave, { t: Date.now(), datos });
        return datos;
    },
};
