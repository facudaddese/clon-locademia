#  Clon Locademia - Tienda de Racing Club

Este proyecto consiste en el desarrollo de un **e-commerce Front-End** que permite visualizar productos, abrir un modal con información detallada y gestionar un **carrito lateral**, desarrollado como práctica de programación web.  
El objetivo principal es aplicar conceptos de **HTML, CSS, JavaScript**, manipulación del DOM, modularidad y uso de librerías externas.

---

## Estructura del proyecto

-   **HTML5 :** contiene la estructura base de la interfaz (`index.html`).  
-   **CSS3:** definen el diseño con `Flexbox`, `Grid` y transiciones (`styles/style.css`).
-   **JavaScript:** (`scripts/app.js`) gestionan eventos, renderizado dinámico y lógica del carrito. 
-   **Assets:** (`assets/`) incluye imágenes, íconos y contenido multimedia utilizado en el sitio.

---


## Funcionalidades destacadas

-   **Validación de productos duplicados**: No permite agregar el mismo producto con el mismo talle dos veces.
-   **Gestión dinámica de cantidades**: Botones +/- que actualizan en tiempo real.
-   **Sincronización array ↔ localStorage**: Cada cambio se guarda instantáneamente.
-   **Cálculo automático de subtotales**: Se recalcula al sumar, restar o eliminar productos.
- **Validación obligatoria**: No permite agregar productos sin seleccionar talle (cuando aplica).
- **Animaciones fluidas** (AOS): Los elementos aparecen suavemente al hacer scroll.
-   **Notificaciones toast** (Toastify): Feedback visual de cada acción.
-   **Diseño responsive**: Se adapta perfectamente a móviles, tablets y desktop.
-   **Carruseles interactivos** (Swiper): Navegación táctil y con flechas.
-   **Sin resultados**: Mensaje amigable cuando no encuentra productos.
-   **Navegación fluida**: Desde la búsqueda puedes ver el producto y agregarlo al carrito.

## Tecnologías utilizadas

### **Lenguajes**

-   **HTML5**
-   **CSS3**
-   **JavaScript (ES6+)**

----------

### **Librerías y Frameworks**

-   **Swiper.js v11**
    -   Carruseles interactivos y responsivos
    -   Navegación táctil y con flechas
    -   Breakpoints adaptativos
-   **AOS (Animate On Scroll) v2.3.1**
    -   Animaciones fluidas al hacer scroll
    -   Efectos fade-up, fade-down, zoom-in
-   **Toastify.js**
    -   Notificaciones toast elegantes
    -   Feedback visual de acciones del usuario
-   **Google Material Symbols**
    -   Iconos modernos y consistentes
    -   Carga desde CDN de Google Fonts

----------

### **Almacenamiento y Datos**

-   **LocalStorage API**
    -   Persistencia de datos del carrito
    -   Almacenamiento en formato JSON
-   **JSON**
    -   Base de datos de productos
    -   Formato estructurado para datos

----------

### **APIs del Navegador**

-   **DOM API**
    -   Manipulación dinámica de elementos
    -   Event listeners y delegación
-   **Fetch API**
    -   Carga asíncrona de productos
    -   Manejo con async/await
-   **Window API**
    -   Gestión de LocalStorage
    -   Detección de scroll y navegación

----------

### **Técnicas y Patrones**

-   **ES6+ Features**
    -   Arrow functions
    -   Template literals
    -   Array methods (forEach, find, filter, map)
    -   Async/await
-   **Responsive Design**
    -   Media queries en CSS
    -   Mobile-first approach
    -   Flexbox y Grid
-   **Arquitectura**
    -   Vanilla JavaScript puro
    -   Funciones reutilizables y modulares
    -   Separación de responsabilidade

---

## Autor
 [Facundo D’addese](https://www.linkedin.com/in/facundo-d-addese-797b241aa/)  estudiante de **Licenciatura en Sistemas** – Universidad Nacional de Lanús.
 
 [GitHub](https://github.com/facudaddese?tab=repositories) | [facundo.daddese19@gmail.com](mailto:facundo.daddese19@gmail.com)  
