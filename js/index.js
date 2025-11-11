const nav = document.getElementById("nav-bar");
const iconos = document.querySelectorAll(".material-symbols-outlined");
const cantProductos = document.querySelector(".cant-productos");
const buscar = document.getElementById("buscar");
const inputBusqueda = document.getElementById("input-busqueda");
const carrito = document.getElementById("carrito");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close");
const modal = document.getElementById("modal");
const closeBusqueda = document.getElementById("close-busqueda");
const divContainer = document.getElementById("div-container");
const busquedaContainer = document.getElementById("busqueda-container");
const strong = document.getElementById("strong");
const productosContainer = document.getElementById("productos-container");

//Inicio de libreria
AOS.init();
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-down");
});

//Carrousel
const swiper1 = new Swiper(".swiper-top10", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".top10-next",
        prevEl: ".top10-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
        1500: { slidesPerView: 5 }
    }
});
const swiper2 = new Swiper(".swiper-pasion-que-viaja", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".pasion-que-viaja-next",
        prevEl: ".pasion-que-viaja-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
        1500: { slidesPerView: 5 }
    }
});
const swiper3 = new Swiper(".swiper-ofertas", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".ofertas-next",
        prevEl: ".ofertas-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
        1500: { slidesPerView: 5 }
    }
});

//Cambio de estilos para el nav
window.addEventListener("scroll", () => {
    let existe = divContainer.matches(".disable");

    if (window.scrollY === 0 && !existe) {
        nav.classList.remove("nav-bar");
        iconos.forEach(icono => icono.style.color = "#FFFFFF");
        cantProductos.style.color = "#FFFFFF";
        inputBusqueda.style.color = "#FFFFFF";
        inputBusqueda.style.borderBlockColor = "#FFFFFF";
    } else {
        nav.classList.add("nav-bar");
        iconos.forEach(icono => icono.style.color = "#000000");
        cantProductos.style.color = "#000000";
        inputBusqueda.style.color = "#000000";
        inputBusqueda.style.borderBlockColor = "#000000";
    }
});

//Icono menu - Modal
menu.addEventListener("click", () => {
    menu.classList.add("disable");
    closeMenu.classList.remove("disable");
    modal.classList.remove("disable");
    document.body.style.overflow = "hidden";
    document.querySelector("main").style.pointerEvents = "none";
    document.querySelectorAll("#modal a").forEach(icono => {
        icono.addEventListener("click", () => {
            closeMenuFn();
        });
    });

    styleModal();
});

//Funcion estilos del modal
function styleModal() {
    if (window.scrollY === 0) {
        modal.classList.remove("modalWhite");
        modal.classList.add("modal");
    } else {
        modal.classList.remove("modal");
        modal.classList.add("modalWhite");
    }
}

//Funcion para cerrar el modal
function closeMenuFn() {
    menu.classList.remove("disable");
    closeMenu.classList.add("disable");
    modal.classList.add("disable");
    document.body.style.overflow = "";
    document.querySelector("main").style.pointerEvents = "auto";
}
closeMenu.onclick = closeMenuFn;

//Icono buscar
buscar.addEventListener("click", () => {
    inputBusqueda.classList.remove("disable");
    closeBusqueda.classList.remove("disable");
});

//Icono cerrar busqueda
closeBusqueda.addEventListener("click", () => {
    inputBusqueda.classList.add("disable");
    closeBusqueda.classList.add("disable");
});

//Buscar productos -- renderizar las img dependiendo la busqueda
inputBusqueda.addEventListener("keyup", async (e) => {
    if (e.key === "Enter" && inputBusqueda.value !== "") {
        divContainer.classList.add("disable");
        busquedaContainer.classList.remove("disable");
        mainRtadosBusqueda();
        strong.innerHTML = inputBusqueda.value;

        try {
            const res = await fetch("./js/productos.json");
            const data = await res.json();

            let hayProductos = false;
            productosContainer.innerHTML = "";
            for (let producto of data) {
                if (producto.nombre.toLowerCase().includes(inputBusqueda.value.toLowerCase())) {
                    hayProductos = true;
                    productosContainer.innerHTML +=
                        `
                            <div class="productos-json">
                                <img src=${producto.imagen} alt=${producto.nombre} class="img">
                                <h3 class="h3-title">${producto.nombre}</h3>
                                <div class="span-container">
                                    <span class="span">$${producto.precio}</span>
                                </div>
                                <div class="btn-agregar-container">
                                    <button class="btn">AGREGAR</button>
                                </div>
                            </div>
                        `
                }
            }
            if (!hayProductos) {
                const p = document.createElement("p");
                p.textContent = "¡No encontramos resultados!";
                productosContainer.appendChild(p);
            }
        } catch (error) {
            console.log(error);
        }
    }
});

//Estilos de la pantalla principal cuando aparezcan los productos
function mainRtadosBusqueda() {
    if (!divContainer.matches(".disable")) return;

    nav.classList.remove("nav-bar-flex");
    nav.classList.add("nav-bar");
    iconos.forEach(icono => {
        icono.style.color = "#000000";
    });
    cantProductos.style.color = "#000000";
    inputBusqueda.style.color = "#000000";
    inputBusqueda.style.borderBlockColor = "#000000";
    modal.classList.remove("modal");
    modal.classList.add("modalWhite");
    document.querySelector("main").style.marginTop = "20px";
    document.querySelector("footer").style.marginTop = "30px";
}

//Estilo del modal cuando aparezcan los productos y location.hash para volver al inicio
menu.addEventListener("click", () => {
    if (divContainer.matches(".disable")) {
        if (window.scrollY >= 0) {
            modal.classList.remove("modal");
            modal.classList.add("modalWhite");
        }
    }
    if (modal.matches(".modalWhite")) {
        document.querySelectorAll("#modal a").forEach(ancor => {
            ancor.addEventListener("click", () => {
                switch (ancor.textContent) {
                    case "Top 10":
                        location.hash = "top-10";
                        volverAlInicio();
                        break;
                    case "Una pasión que viaja":
                        location.hash = "pasion-que-viaja";
                        volverAlInicio();
                        break;
                    case "Ofertas":
                        location.hash = "ofertas";
                        volverAlInicio();
                        break;
                    case "Suscribite":
                        location.hash = "suscribite";
                        volverAlInicio();
                        break;
                }
            });
        })

    }
});

//Funcion para reestablecer estilos
function volverAlInicio() {
    divContainer.classList.remove("disable");
    busquedaContainer.classList.add("disable");
    nav.classList.remove("nav-bar");
    nav.classList.add("nav-bar-flex");
    iconos.forEach(icono => {
        icono.style.color = "#ffffffff";
    });
    cantProductos.style.color = "#FFFFFF";
    inputBusqueda.style.color = "#000000";
    inputBusqueda.style.borderBlockColor = "#000000";
    styleModal();
    document.querySelector("main").style.marginTop = "640px";
    document.querySelector("footer").style.marginTop = "90px";
}

//Agregar productos al carrito desde el inicio
let cantidad = 1;
divContainer.addEventListener("click", (e) => {
    if (!e.target.closest(".swiper-slide")) return;

});

//Agregar producto al carrito desde la busqueda
productosContainer.addEventListener("click", (e) => {
    console.log(e.target.closest(".productos-json"));
});