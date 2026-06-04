
/*
utils.js
Descripción: Funciones auxiliares para procesar los datos y formatear información

*/


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

