# Bar La Calle · carta digital

Carta digital mobile-first para un bar-restaurante español, pensada para abrirse desde un código QR. El proyecto es una adaptación del repositorio original **Food Ordering SaaS**: se ha eliminado el backend, la autenticación, los paneles y las funciones de pedidos para dejar una web estática, rápida y fácil de mantener.

## Requisitos

- Node.js 18 o superior.
- npm 9 o superior.

## Instalación y uso

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal. Para generar la versión de producción:

```bash
npm run build
npm run preview
```

El resultado optimizado se guarda en `dist/` y puede publicarse en cualquier alojamiento estático, por ejemplo Netlify, Vercel, Cloudflare Pages o GitHub Pages.

## Personalizar el menú

Todos los productos están en `src/data/menu.json`; no están escritos dentro de los componentes. Cada elemento admite:

- `category`: una de las diez categorías visibles.
- `name` y `description`.
- `price` para un precio único o `prices` para varios tamaños o formatos.
- `image`: ruta opcional de la fotografía.
- `tags`: `vegetariano`, `vegano`, `picante` o `sin gluten`.
- `allergens`: lista accesible de alérgenos.
- `available`: `true` para disponible o `false` para mostrarlo agotado.

Los precios se guardan como números y se formatean automáticamente en euros con coma decimal. Guarda fotografías nuevas en `public/images/`, preferentemente en WebP y con un ancho máximo aproximado de 720 px para platos.

## Personalizar el restaurante

- Nombre, teléfono, dirección, horario y enlaces: `src/App.tsx`.
- Colores, tipografías y diseño responsive: `src/index.css`.
- SEO y Open Graph: `index.html`.
- Favicon y manifest: `public/images/logo.webp` y `public/manifest.webmanifest`.

Antes de publicar, sustituye el enlace genérico de Instagram por el perfil real y confirma el horario con el restaurante.

## Accesibilidad y rendimiento

La interfaz incluye enlace para saltar al contenido, navegación por teclado, foco visible, etiquetas accesibles, texto de alérgenos, áreas táctiles amplias, compatibilidad con reducción de movimiento y carga diferida de imágenes de producto. El diseño está preparado para 320 px, 375 px, 768 px y pantallas de escritorio.

## Origen de los datos

Los platos, precios y fotografías se han adaptado de la carta pública de Bar La Calle en El Menú QR. Conviene revisarlos con el restaurante antes de publicar cambios definitivos.

## Licencia

Se mantiene la licencia MIT y el aviso de copyright del proyecto original en `LICENSE`.
