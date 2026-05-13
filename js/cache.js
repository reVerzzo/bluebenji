// cache.js - almacenar los datos en el navegador para evitar recargas innecesarias
const cacheData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};