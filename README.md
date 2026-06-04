# BlueBenji — Benji's Lab

Página web para la venta de ropa urbana con diseños tipo aerógrafo
(camisetas, gorras y sudaderas). Proyecto de la materia **Desarrollo de
Páginas Web**.

## Tecnologías

- HTML5
- CSS3 (variables y estilos propios)
- [Bootstrap 5.3](https://getbootstrap.com/) vía CDN
- [Font Awesome 6](https://fontawesome.com/) vía CDN
- JavaScript (carrusel y carrito de compras)

## Estructura del proyecto

```
bluebenji/
├── index.html          # Página de inicio (landing)
├── producto.html       # Página de detalle de producto
├── css/
│   ├── variables.css   # Paleta de colores y tipografías
│   ├── styles.css      # Estilos generales del sitio
│   └── responsive.css  # Media queries (diseño responsivo)
├── js/
│   ├── carrusel.js     # Carrusel de "Productos top"
│   ├── carrito.js      # Lógica del carrito de compras
│   ├── config.js       # Carga de configuración
│   └── cache.js        # Almacenamiento en localStorage
├── docs/
│   └── wireframe.md    # Boceto y wireframe de las vistas
└── README.md
```

> Nota: cada integrante trabaja en su propia rama; algunos archivos
> aparecen al integrar todas las ramas en `develop`.

## Cómo ejecutar

No requiere instalación. Basta con abrir `index.html` en el navegador,
o levantar un servidor estático:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node (npx)
npx serve .
```

Luego abrir `http://localhost:8000`.

## Paleta de marca

| Color           | Hex       | Uso                         |
|-----------------|-----------|-----------------------------|
| Negro           | `#0F0F0F` | Fondo principal             |
| Blanco hueso    | `#F5F5F5` | Texto principal             |
| Gris oscuro     | `#2E2E2E` | Tarjetas                    |
| Verde neón      | `#76FF03` | Acción principal / acentos  |
| Azul            | `#00AEEF` | Acción secundaria           |
| Naranja/rojo    | `#FF3C00` | Notificaciones              |

## Equipo y responsabilidades

| Integrante       | Rama             | Responsabilidad principal                          |
|------------------|------------------|----------------------------------------------------|
| Uriel            | `uriel`          | Diseño, boceto y estilos generales (CSS)           |
| Alessandro       | `alessandro`     | Página de inicio, imagen principal y documentación |
| Santiago (Colin) | `santiago`       | Carrusel de productos y carrito (JavaScript)       |
| Alberto Ávila    | `alberto-avila`  | Página de producto, tallas, favoritos y compra     |
| Alberto Vásquez  | `alberto-vasquez`| Encabezado, footer y diseño responsivo             |

## Flujo de ramas (Git)

```
main → develop → ( uriel · alessandro · santiago · alberto-avila · alberto-vasquez )
```

Cada integrante desarrolla en su rama y luego se integra a `develop`.
