
/*
utils.js
Descripción: Funciones auxiliares para procesar los datos y formatear información
Autor: Santiago Colín
Fecha: 13/05/26

*/


// Validar el email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Calcular envío basado en monto
const calculateShipping = (orderAmount) => {
  if (orderAmount > 100) return 0; // envío gratis
  if (orderAmount > 50) return 5; // 
  return 10;
};

// Calcular impuestos
const calculateTax = (price, taxRate = 0.16) => price * taxRate;


// Filtrar productos por categoría, precio, talla
const filterProducts = (products, filters) => {
  return products.filter(p => 
    (!filters.category || p.category === filters.category) &&
    (!filters.minPrice || p.price >= filters.minPrice) &&
    (!filters.maxPrice || p.price <= filters.maxPrice) &&
    (!filters.size || p.sizes.includes(filters.size))
  );
};

// Buscar productos por nombre o descripción
const searchProducts = (products, query) => {
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q)
  );
};

