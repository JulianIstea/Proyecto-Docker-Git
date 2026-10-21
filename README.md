# Stixx Muebles de confianza

Sitio web estático de venta de muebles con catálogo de productos, sección de beneficios y formulario de contacto. Incluye carrito de compras profesional y imágenes de productos. Diseño responsive, desarrollado con HTML, CSS y JavaScript, listo para ejecutarse en un contenedor Docker con nginx.

Trabajo Práctico N° 1 – Git y Docker.

## Tecnologías

- HTML5
- CSS3
- JavaScript (carrito de compras con `localStorage`)
- nginx (imagen `nginx:alpine`)
- Docker

## Requisitos

- [Git](https://git-scm.com/downloads) para clonar el repositorio
- [Docker](https://www.docker.com/get-started) para construir y ejecutar la imagen
- Un navegador web (Chrome, Firefox, Edge, etc.)

## Estructura del proyecto

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── cart.js
├── Dockerfile
└── README.md
```

## Funcionalidades

- Catálogo de 6 productos con imágenes
- Carrito de compras lateral (agregar, modificar cantidades, eliminar)
- Total del carrito y simulación de compra
- Persistencia del carrito con `localStorage`
- Notificaciones emergentes (toast)
- Sección de beneficios y formulario de contacto
- Diseño responsive

## Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
cd NOMBRE_DEL_REPO
```

## Ejecutar sin Docker

Abrí el archivo `index.html` directamente en tu navegador.

## Construir y ejecutar la imagen Docker

1. **Construir la imagen:**

   ```bash
   docker build -t stixx-muebles .
   ```

2. **Ejecutar el contenedor:**

   ```bash
   docker run -d -p 8080:80 --name stixx stixx-muebles
   ```

3. **Abrir en el navegador:**

   ```
   http://localhost:8080
   ```

4. **Detener y eliminar el contenedor (cuando termines):**

   ```bash
   docker stop stixx
   docker rm stixx
   ```
