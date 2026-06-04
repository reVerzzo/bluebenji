# Boceto y wireframe-BlueBenji (Benji's Lab)

Responsable: **Uriel** · Actividad: *Boceto y diseño de la interfaz (wireframe)*

Tienda de ropa urbana con diseños tipo aerógrafo. Estilo visual: fondo oscuro,
acentos en verde neón y azul. A continuación la estructura de las dos vistas
principales definidas en el boceto inicial.

## 1. Página de inicio (`index.html`)

```
+--------------------------------------------------------------+
|  NAVBAR                                                       |
|  [BENJI'S LAB]        INICIO  TIENDA  DROPS  CONTACTO  🛒 🔍  |
+--------------------------------------------------------------+
|                                                              |
|                  HERO / IMAGEN DESTACADA                     |
|              (banner promocional + CTA)                      |
|                                                              |
+--------------------------------------------------------------+
|              LOS DESTACADOS DE LA SEMANA                     |
|   +--------+   +--------+   +--------+   +--------+          |
|   | card   |   | card   |   | card   |   | card   |          |
|   | foto   |   | foto   |   | foto   |   | foto   |          |
|   | nombre |   | nombre |   | nombre |   | nombre |          |
|   | precio |   | precio |   | precio |   | precio |          |
|   | [+cart]|   | [+cart]|   | [+cart]|   | [+cart]|          |
|   +--------+   +--------+   +--------+   +--------+          |
+--------------------------------------------------------------+
|              CARRUSEL "PRODUCTOS TOP"                        |
|        ‹   [ ] [ ] [ ] [ ] [ ] [ ]   ›                       |
+--------------------------------------------------------------+
|  FOOTER   enlaces · redes sociales · contacto                |
+--------------------------------------------------------------+
```

## 2. Página de producto (`producto.html`)

```
+--------------------------------------------------------------+
|  NAVBAR (mismo encabezado reutilizable)                      |
+--------------------------------------------------------------+
|  +-----------------+   NOMBRE DEL PRODUCTO                   |
|  |                 |   $ precio                              |
|  |   IMAGEN        |   descripción corta                     |
|  |   PRINCIPAL     |                                         |
|  |                 |   Talla:  [S] [M] [L] [XL]              |
|  +-----------------+                                         |
|  [min][min][min]      [ ♥ favorito ]  [ AGREGAR AL CARRITO ] |
|  miniaturas                                                  |
+--------------------------------------------------------------+
|  FOOTER                                                      |
+--------------------------------------------------------------+
```

## Distribución (grid)

- Layout base sobre **Bootstrap 5** (sistema de 12 columnas).
- Desktop: tarjetas de producto en 4 columnas (`col-lg-3`).
- Tablet: 2 columnas (`col-md-6`).
- Móvil: 1 columna (`col-12`).
- Página de producto: 2 columnas (imagen / información) que colapsan a 1 en móvil.

## Flujo de navegación

`Inicio` → (clic en tarjeta) → `Página de producto` → (Agregar al carrito) → `Carrito`.
