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
const carritoContainer = document.getElementById("carrito-container");
const itemsContainer = document.getElementById("items-container");
const itemDetail = document.getElementById("item-detail");
const closeCarrito = document.getElementById("close-carrito");
let array = [];

//Inicio de libreria
AOS.init();

//Funcion para animar c/u de las secciones
function AOSAnimacion() {
    const elementos = document.querySelectorAll("[data-aos]");
    elementos.forEach(el => { el.classList.remove("aos-animate"); });
    setTimeout(() => {
        elementos.forEach(el => {
            el.classList.add("aos-animate");
        });
        AOS.refreshHard();
    }, 200);
}

//Evento para cuando se cargue la pagina
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-down");

    if (localStorage.getItem("array")) {
        array = JSON.parse(localStorage.getItem("array"));
        renderizarCarrito();

        if (array.length > 0) {
            cantProductos.classList.remove("disable");
            cantProductos.textContent = array.length;
        }
    }
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
    if (window.scrollY === 0 && !divContainer.matches(".disable")) {
        nav.classList.remove("nav-bar");
        iconos.forEach(icono => { icono.style.color = "#FFFFFF" });
        cantProductos.style.color = "#FFFFFF";
        inputBusqueda.style.color = "#FFFFFF";
        inputBusqueda.style.borderBlockColor = "#FFFFFF";
        styleCarritoContainer();
    } else {
        nav.classList.add("nav-bar");
        iconos.forEach(icono => { icono.style.color = "#000000" });
        cantProductos.style.color = "#000000";
        inputBusqueda.style.color = "#000000";
        inputBusqueda.style.borderBlockColor = "#000000";
        styleCarritoContainer();
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
    if (innerWidth < 580) 
        document.querySelector(".logo").style.display = "block";
        document.querySelector(".logo>a>img").style.display = "block";
        nav.style.padding = "3px 0";
});

//Buscar productos y renderizarlos
inputBusqueda.addEventListener("keyup", async (e) => {
    if (e.key === "Enter" && inputBusqueda.value !== "") {
        //Reseteo el scroll
        window.scrollTo(0, 0);
        divContainer.classList.add("disable");
        itemsContainer.classList.add("disable");
        itemDetail.classList.add("disable");
        busquedaContainer.classList.remove("disable");
        AOSAnimacion();
        mainRtadosBusqueda();
        strong.textContent = inputBusqueda.value;

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
                            <div class="productos-json" data-categoria="${producto.categoria}">
                                <img src=${producto.imagen} alt=${producto.nombre} class="img">
                                <h3 class="h3-title">${producto.nombre}</h3>
                                <div class="span-container">
                                    <span class="span">$${producto.precio.toLocaleString("es-AR")}</span>
                                </div>
                                <div class="btn-agregar-container">
                                    <button class="btn">VER</button>
                                </div>
                            </div>
                        `
                }
            }
            //Si no hay productos, se muestra mensaje correspondiente
            if (!hayProductos) {
                AOSAnimacion();
                const p = document.createElement("p");
                p.textContent = "¡No encontramos resultados!";
                productosContainer.appendChild(p);
            }
        } catch (error) {
            console.log(error);
        }

        productosContainer.querySelectorAll(".btn").forEach(el => {
            el.addEventListener("click", (event) => {
                busquedaContainer.classList.add("disable");
                itemDetail.classList.remove("disable");
                switch (event.target.closest(".productos-json").dataset.categoria) {
                    case "top10":
                    case "ofertas":
                        itemDetail.innerHTML =
                            `
                                <div class="item-modal">
                                    <div class="img-modal">
                                        <img src=${event.target.closest(".productos-json").querySelector(".img").src} alt=${event.target.closest(".productos-json").querySelector(".h3-title").textContent}>
                                    </div>
                                    <div class="title-modal">
                                        <div class="title-container-modal">
                                            <h2>${event.target.closest(".productos-json").querySelector(".h3-title").textContent}</h2>
                                            <h4>${event.target.closest(".productos-json").querySelector(".span-container .span").textContent}</h4>
                                        </div>
                                        <div>
                                            <ul class="talles-modal">
                                                <li>XS</li>
                                                <li>S</li>
                                                <li>M</li>
                                                <li>L</li>
                                                <li>XL</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn-modal" id="btn-agregar">Agregar</button>
                                    <div class="ir-al-inicio">
                                        <a href="index.html" class="ir-al-inicio">Ir al inicio</a>
                                    </div>
                                </div>
                            `
                        break;
                    case "pasionQueViaja":
                        itemDetail.innerHTML =
                            `
                                <div class="item-modal">
                                    <div class="img-modal">
                                        <img src=${event.target.closest(".productos-json").querySelector(".img").src} alt=${event.target.closest(".productos-json").querySelector(".h3-title").textContent}>
                                    </div>
                                    <div class="title-modal">
                                        <div class="title-container-modal">
                                            <h2>${event.target.closest(".productos-json").querySelector(".h3-title").textContent}</h2>
                                            <h4>${event.target.closest(".productos-json").querySelector(".span-container .span").textContent}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn-modal" id="btn-agregar">Agregar</button>
                                    <div class="ir-al-inicio">
                                        <a href="index.html" class="ir-al-inicio">Ir al inicio</a>
                                    </div>
                                </div>
                            `
                        break;
                }
                //Reseteo el scroll
                window.scrollTo(0, 0);
                agregarProductos();
            });
        });
    }
});

//Cuando se toca en el lupa y se lo esta viendo desde un mobile, se esconde el logo
buscar.addEventListener("click", () => {
    if (innerWidth < 580)
        document.querySelector(".nav-bar>.logo>a>img").style.display = "none";
        document.querySelector(".logo>a>img").style.display = "none";
        nav.style.padding = "10px 0";
});

//Estilos de la pantalla principal cuando aparezcan los productos
function mainRtadosBusqueda() {
    if (!divContainer.matches(".disable")) return;

    nav.classList.remove("nav-bar-flex");
    nav.classList.add("nav-bar");
    iconos.forEach(icono => { icono.style.color = "#000000"; });
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
    locationHash();
});

//Funcion para reestablecer estilos
function volverAlInicio() {
    divContainer.classList.remove("disable");
    busquedaContainer.classList.add("disable");
    itemDetail.classList.add("disable");
    itemsContainer.classList.add("disable");
    carritoContainer.classList.add("disable");
    nav.classList.remove("nav-bar");
    nav.classList.add("nav-bar-flex");
    iconos.forEach(icono => { icono.style.color = "#ffffffff"; });
    cantProductos.style.color = "#FFFFFF";
    inputBusqueda.style.color = "#000000";
    inputBusqueda.style.borderBlockColor = "#000000";
    styleModal();
    if (innerWidth > 1024) {
        document.querySelector("main").style.marginTop = "640px";
    } else {
        document.querySelector("main").style.marginTop = "415px";
    }
    document.querySelector("footer").style.marginTop = "90px";
    setTimeout(() => { AOSAnimacion(); }, 200);
}

//Funcion para volver a cada una de las secciones
function locationHash() {
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
}

//Abrir el carrito
carrito.addEventListener("click", (e) => {
    if (array.length === 0) {
        if (itemsContainer.classList.contains("disable")) {
            AOSAnimacion();
        }

        //Reseteo el scroll
        window.scrollTo(0, 0);;
        busquedaContainer.classList.add("disable");
        divContainer.classList.add("disable");
        itemDetail.classList.add("disable");
        itemsContainer.classList.remove("disable");
        nav.classList.remove("nav-bar-flex");
        nav.classList.add("nav-bar");
        iconos.forEach(icono => { icono.style.color = "#000000"; });
        cantProductos.style.color = "#000000";
        inputBusqueda.style.color = "#000000";
        inputBusqueda.style.borderBlockColor = "#000000";
        modal.classList.remove("modal");
        modal.classList.add("modalWhite");
        document.querySelector("footer").style.marginTop = "30px";
        document.querySelector("main").style.marginTop = "20px";
        locationHash();
    } else {
        carritoContainer.classList.remove("disable");
    }
});

//Estilos para el carrito container
function styleCarritoContainer() {
    if (document.querySelector(".nav-bar")) {
        carritoContainer.classList.add("carrito-container-white");
        document.querySelectorAll(".descripcion-container>.h3-producto").forEach(el => {
            el.style.color = "#000000";
        });
        document.querySelectorAll(".descripcion-container>.span-producto").forEach(el => {
            el.style.color = "#0088cc";
        });
        document.querySelectorAll(".iconos span.material-symbols-outlined:not(#carrito)").forEach(el => {
            el.style.color = "#000000";
        });
        document.querySelectorAll(".contador>.cantidad").forEach(el => {
            el.style.color = "#0088cc";
        });
        document.querySelectorAll(".total-container").forEach(el => {
            el.style.background = "rgba(224, 224, 224, 0.6)";
        });
        document.querySelectorAll(".total-container>p").forEach(el => {
            el.style.color = "#0088cc";
        });
        document.querySelector(".cerrar-carrito").style.background = "rgba(224, 224, 224, 0.6)";
    } else {
        carritoContainer.classList.remove("carrito-container-white");
        document.querySelectorAll(".descripcion-container>.h3-producto").forEach(el => {
            el.style.color = "#FFFFFF";
        });
        document.querySelectorAll(".descripcion-container>.span-producto").forEach(el => {
            el.style.color = "#FFFFFF";
        });
        document.querySelectorAll(".iconos span.material-symbols-outlined:not(#carrito)").forEach(el => {
            el.style.color = "#FFFFFF";
        });
        document.querySelectorAll(".contador>.cantidad").forEach(el => {
            el.style.color = "#FFFFFF";
        });
        document.querySelectorAll(".total-container").forEach(el => {
            el.style.background = "rgba(0, 0, 0, 0.6)";
        });
        document.querySelectorAll(".total-container>p").forEach(el => {
            el.style.color = "#FFFFFF";
        });
        document.querySelector(".cerrar-carrito").style.background = "rgba(0, 0, 0, 0.6)";
    }
}

//Renderizar en una nueva seccion los prodcutos seleccionados
divContainer.addEventListener("click", (e) => {
    if (!e.target.closest(".btn")) return;

    //Reseteo el scroll
    window.scrollTo(0, 0);;
    AOSAnimacion();
    if (e.target.closest(".btn")) {
        itemDetail.classList.remove("disable");
        itemDetail.classList.add("item-detail");
        divContainer.classList.add("disable");
        document.querySelector("main").style.marginTop = "20px";
        document.querySelector("footer").style.marginTop = "30px";

        if (e.target.closest(".pasion-que-viaja")) {
            itemDetail.innerHTML =
                `
                    <div class="item-modal">
                        <div class="img-modal">
                            <img src=${e.target.closest(".swiper-slide").querySelector("img").src} alt=${e.target.closest(".swiper-slide").querySelector(".h3-title").textContent}>
                        </div>
                        <div class="title-modal">
                            <div class="title-container-modal">
                                <h2>${e.target.closest(".swiper-slide").querySelector(".h3-title").textContent}</h2>
                                <h4>${e.target.closest(".swiper-slide").querySelector(".span-container .span").textContent}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-modal" id="btn-agregar">Agregar</button>
                        <div class="ir-al-inicio">
                            <a href="index.html" class="ir-al-inicio">Ir al inicio</a>
                        </div>
                    </div>
                `
        } else {
            itemDetail.innerHTML =
                `
                    <div class="item-modal">
                        <div class="img-modal">
                            <img src=${e.target.closest(".swiper-slide").querySelector("img").src} alt=${e.target.closest(".swiper-slide").querySelector(".h3-title").textContent}>
                        </div>
                        <div class="title-modal">
                            <div class="title-container-modal">
                                <h2>${e.target.closest(".swiper-slide").querySelector(".h3-title").textContent}</h2>
                                <h4>${e.target.closest(".swiper-slide").querySelector(".span-container .span").textContent}</h4>
                            </div>
                            <div class="talles-container">
                                <ul class="talles-modal">
                                    <li>XS</li>
                                    <li>S</li>
                                    <li>M</li>
                                    <li>L</li>
                                    <li>XL</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-modal" id="btn-agregar">Agregar</button>
                        <div class="ir-al-inicio">
                            <a href="index.html" class="ir-al-inicio">Ir al inicio</a>
                        </div>
                    </div>
                `
        }
        agregarProductos();
    }
});

//Funcion para agregar productos al carrito-container
let acum = 0;
function agregarProductos() {
    let seAgrega = false;
    elegirTalle();
    document.getElementById("btn-agregar").addEventListener("click", (e) => {
        //Agregamos el producto al carrito-container
        if (e.target.closest(".item-detail").querySelectorAll(".talles-modal li").length > 0) {
            if (talle) {
                //Si se intenta agregar un item que ya esta en el carrito
                let talleExiste = false;
                carritoContainer.querySelectorAll(".h3-producto").forEach(h3 => {
                    if (h3.querySelector(".span-talle")) {
                        //Le saco los paréntesis al talle y comparo si es igual al talle seleccionado
                        if (h3.querySelector(".span-talle").textContent.replace(/[()]/g, "").trim() === talle && e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent === h3.dataset.nombre) {
                            talleExiste = true;
                        }
                    }
                });
                if (talleExiste) {
                    Toastify({
                        text: "El producto ya se encuentra en el carrito, aumenta su cantidad",
                        duration: 2500,
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "#015179",
                            color: "#FFFFFF",
                            fontSize: "16px",
                            padding: "15px",
                        }
                    }).showToast();
                    return;
                }
                carritoContainer.innerHTML +=
                    `
                        <div class="item-container">
                            <div class="item">
                                <div class="img-container">
                                    <img src=${e.target.closest(".item-detail").querySelector(".img-modal img").src}>
                                </div>
                                <div class="descripcion-container">
                                    <h3 class="h3-producto" data-nombre="${e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent}">${e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent}<span class="span-talle" style="padding: 0 5px;">(${talle})</span></h3>
                                    <span class="span-producto">${e.target.closest(".item-detail").querySelector(".title-container-modal h4").textContent}</span>
                                </div>
                                <div class="contador">
                                    <button class="btn-restar">-</button>
                                    <span class="cantidad">1</span>
                                    <button class="btn-sumar">+</button>
                                </div>
                                <span class="material-symbols-outlined delete">delete</span>
                            </div>
                        </div>
                    `
                seAgrega = true;
                //Agregamos los productos al array
                array.push(
                    {
                        nombre: e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent,
                        talle: talle,
                        precio: Number(e.target.closest(".item-detail")
                            .querySelector(".title-container-modal h4")
                            .textContent.replace(/[$.]/g, "")),
                        img: e.target.closest(".item-detail").querySelector(".img-modal img").src,
                        cantidad: 1
                    }
                )
                localStorage.setItem("array", JSON.stringify(array));
            } else {
                Toastify({
                    text: "Debes seleccionar un talle",
                    duration: 2500,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "#015179",
                        color: "#FFFFFF",
                        fontSize: "16px",
                        padding: "15px",
                    }
                }).showToast();
            }
        } else {
            //Si se intenta agregar un item que ya esta en el carrito
            let existeProducto = false;
            carritoContainer.querySelectorAll(".h3-producto").forEach(h3 => {
                if (!h3.querySelector(".span-talle")) {
                    if (h3.getAttribute("data-nombre") === e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent) {
                        existeProducto = true;
                    }
                }
            });

            if (existeProducto) {
                Toastify({
                    text: "El producto ya se encuentra en el carrito, aumenta su cantidad",
                    duration: 2500,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "#015179",
                        color: "#FFFFFF",
                        fontSize: "16px",
                        padding: "15px",
                    }
                }).showToast();
                return;
            }

            carritoContainer.innerHTML +=
                `
                    <div class="item-container">
                        <div class="item">
                            <div class="img-container">
                                <img src=${e.target.closest(".item-detail").querySelector(".img-modal img").src}>
                            </div>
                            <div class="descripcion-container">
                                <h3 class="h3-producto" data-nombre="${e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent}">${e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent}</h3>
                                <span class="span-producto">${e.target.closest(".item-detail").querySelector(".title-container-modal h4").textContent}</span>
                            </div>
                            <div class="contador">
                                <button class="btn-restar">-</button>
                                <span class="cantidad">1</span>
                                <button class="btn-sumar">+</button>
                            </div>
                            <span class="material-symbols-outlined delete">delete</span>
                        </div>
                    </div>
                `
            seAgrega = true;

            //Agregamos los productos al array
            array.push(
                {
                    nombre: e.target.closest(".item-detail").querySelector(".title-container-modal h2").textContent,
                    talle: null,
                    precio: Number(e.target.closest(".item-detail")
                        .querySelector(".title-container-modal h4")
                        .textContent.replace(/[$.]/g, "")),
                    img: e.target.closest(".item-detail").querySelector(".img-modal img").src,
                    cantidad: 1
                }
            )
            localStorage.setItem("array", JSON.stringify(array));
        }

        if (seAgrega) {
            carritoContainer.classList.remove("disable");
            closeCarrito.classList.remove("disable");
            document.getElementById("total-container").classList.remove("disable");
            Toastify({
                text: "Producto agregado al carrito",
                duration: 2500,
                gravity: "top",
                position: "center",
                style: {
                    background: "#0088cc",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    padding: "15px",
                }
            }).showToast();

            cantProductos.classList.remove("disable");
            cantProductos.textContent = array.length;

            styleCarritoContainer();

            //Calculo el subtotal
            document.querySelector(".total-container p").textContent = "Subtotal: $" + (acum += parseFloat(e.target.closest(".item-detail").querySelector(".title-container-modal h4").textContent.replace(/[^0-9,]+|(?<=\d)\.(?=\d{3})/g, ""))).toLocaleString("es-AR");

            //Funcion para cerrar el carrito
            document.querySelector(".cerrar-carrito .close-carrito").addEventListener("click", () => {
                carritoContainer.classList.add("disable");
            });

            //Funcion para sumar la cantidad de productos
            document.querySelectorAll(".btn-sumar").forEach(btn => {
                btn.addEventListener("click", () => {
                    btn.closest(".item").querySelector(".cantidad").textContent =
                        Number(btn.closest(".item").querySelector(".cantidad").textContent) + 1;

                    // Recalculo el subtotal
                    acum += parseFloat(btn.closest(".item").querySelector(".span-producto").textContent.replace(/[^0-9,]+|(?<=\d)\.(?=\d{3})/g, ""));
                    document.querySelector(".total-container p").textContent = "Subtotal: $" + acum.toLocaleString("es-AR");

                    const nombreProducto = btn.closest(".item").querySelector(".h3-producto").getAttribute("data-nombre");

                    let talleProducto = null;
                    if (btn.closest(".item").querySelector(".span-talle")) {
                        talleProducto = btn.closest(".item").querySelector(".span-talle").textContent.replace(/[()]/g, "").trim();
                    }

                    const producto = array.find(prod => prod.nombre === nombreProducto && prod.talle === talleProducto);
                    if (producto) {
                        producto.cantidad++;
                        localStorage.setItem("array", JSON.stringify(array));
                    }
                });
            });

            //Funcion para restar la cantidad de productos
            document.querySelectorAll(".btn-restar").forEach(btn => {
                btn.addEventListener("click", () => {
                    if (Number(btn.closest(".item").querySelector(".cantidad").textContent) > 1) {
                        btn.closest(".item").querySelector(".cantidad").textContent =
                            Number(btn.closest(".item").querySelector(".cantidad").textContent) - 1;

                        // Actualizo subtotal
                        const precioUnitario = parseFloat(btn.closest(".item").querySelector(".span-producto").textContent.replace(/[^0-9,]+|(?<=\d)\.(?=\d{3})/g, ""));
                        acum -= precioUnitario;
                        document.querySelector(".total-container p").textContent = "Subtotal: $" + acum.toLocaleString("es-AR");

                        const nombreProducto = btn.closest(".item").querySelector(".h3-producto").getAttribute("data-nombre");

                        let talleProducto = null;
                        if (btn.closest(".item").querySelector(".span-talle")) {
                            talleProducto = btn.closest(".item").querySelector(".span-talle").textContent.replace(/[()]/g, "").trim();
                        }

                        const producto = array.find(prod => prod.nombre === nombreProducto && prod.talle === talleProducto);
                        if (producto) {
                            producto.cantidad--;
                            localStorage.setItem("array", JSON.stringify(array));
                        }
                    } else {
                        eliminarProducto(btn.closest(".item"));
                    }
                });
            });
        }

        eliminarProducto();
        styleCarritoContainer();
    });
}

//Funcion para eliminar un producto del carrito   
function eliminarProducto(itemParametro = null) {
    // Si no existe item, el click fue en el tachito   
    if (!itemParametro) {
        document.querySelectorAll(".delete").forEach(btn => {
            btn.addEventListener("click", (e) => {
                eliminarProducto(e.target.closest(".item"));
            });
        });
        return;
    }

    // Si existe el item, se elimina desde el botón de restar
    const precioUnitario = parseFloat(itemParametro.querySelector(".span-producto").textContent.replace(/[^0-9,]+|(?<=\d)\.(?=\d{3})/g, ""));
    acum -= precioUnitario * Number(itemParametro.querySelector(".cantidad").textContent);

    // Actualizo subtotal
    document.querySelector(".total-container p").textContent = "Subtotal: $" + acum.toLocaleString("es-AR");

    let talleItem = null;
    if (itemParametro.querySelector(".span-talle")) {
        //Saco los paréntesis
        talleItem = itemParametro.querySelector(".span-talle").textContent.replace(/[()]/g, "").trim();
    }

    array = array.filter(el => !(el.nombre === itemParametro.querySelector(".h3-producto").dataset.nombre && el.talle === talleItem));

    localStorage.setItem("array", JSON.stringify(array));

    //Elimino item
    itemParametro.remove();

    // Actualizo contador
    cantProductos.textContent = array.length;

    if (cantProductos.textContent == 0) {
        cantProductos.classList.add("disable");
        carritoContainer.classList.add("disable");
    }

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 2500,
        gravity: "top",
        position: "center",
        style: {
            background: "#015179",
            color: "#FFFFFF",
            fontSize: "15px",
            padding: "12px 18px",
        }
    }).showToast();
}

//Elegimos el talle del producto
let talle;
function elegirTalle() {
    talle = null;

    document.querySelectorAll(".talles-modal li").forEach(el => {
        el.style.background = "";
        el.style.color = "";
        el.addEventListener("click", (e) => {
            document.querySelectorAll(".talles-modal li").forEach(li => {
                li.style.background = "";
                li.style.color = "";
            });
            talle = e.target.textContent;
            e.target.style.background = "#0088cc";
            e.target.style.color = "#FFFFFF";
        });
    });
}

//Funcion para recuperar los datos desde el Local Storage
function renderizarCarrito() {
    carritoContainer.querySelectorAll(".item-container").forEach(item => item.remove());

    array.forEach(el => {
        if (el.talle) {
            carritoContainer.innerHTML +=
                `
                    <div class="item-container">
                        <div class="item">
                            <div class="img-container">
                                <img src=${el.img}>
                            </div>
                            <div class="descripcion-container">
                                <h3 class="h3-producto" data-nombre="${el.nombre}">${el.nombre}<span class="span-talle" style="padding: 0 5px;">(${el.talle})</span></h3>
                                <span class="span-producto">$${el.precio.toLocaleString("es-AR")}</span>
                            </div>
                            <div class="contador">
                                <button class="btn-restar">-</button>
                                <span class="cantidad">${el.cantidad}</span>
                                <button class="btn-sumar">+</button>
                            </div>
                            <span class="material-symbols-outlined delete">delete</span>
                        </div>
                    </div>
                `
        } else {
            carritoContainer.innerHTML +=
                `
                    <div class="item-container">
                        <div class="item">
                            <div class="img-container">
                                <img src=${el.img}>
                            </div>
                            <div class="descripcion-container">
                                <h3 class="h3-producto" data-nombre="${el.nombre}">${el.nombre}</h3>
                                <span class="span-producto">$${el.precio.toLocaleString("es-AR")}</span>
                            </div>
                            <div class="contador">
                                <button class="btn-restar">-</button>
                                <span class="cantidad">${el.cantidad}</span>
                                <button class="btn-sumar">+</button>
                            </div>
                            <span class="material-symbols-outlined delete">delete</span>
                        </div>
                    </div>
                `
        }
    });

    document.getElementById("total-container").classList.remove("disable");

    // Recalculo el subtotal desde el array
    acum = 0;
    array.forEach(producto => {
        acum += producto.precio * producto.cantidad;
    });

    document.querySelector(".total-container p").textContent = "Subtotal: $" + acum.toLocaleString("es-AR");
    agregarEventListenersCarrito();
    styleCarritoContainer();
}

//Funcion para darle vida nuevamente a los botones
function agregarEventListenersCarrito() {
    // Botón cerrar carrito
    document.querySelector(".cerrar-carrito .close-carrito").addEventListener("click", () => {
        carritoContainer.classList.add("disable");
    });

    // Boton sumar
    document.querySelectorAll(".btn-sumar").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".item").querySelector(".cantidad").textContent =
                Number(btn.closest(".item").querySelector(".cantidad").textContent) + 1;

            acum += parseFloat(btn.closest(".item").querySelector(".span-producto").textContent.replace(/[^0-9,]+|(?<=\d)\.(?=\d{3})/g, ""));
            document.querySelector(".total-container p").textContent = "Subtotal: $" + acum.toLocaleString("es-AR");

            const nombreProducto = btn.closest(".item").querySelector(".h3-producto").getAttribute("data-nombre");
            let talleProducto = null;
            if (btn.closest(".item").querySelector(".span-talle")) {
                talleProducto = btn.closest(".item").querySelector(".span-talle").textContent.replace(/[()]/g, "").trim();
            }

            const producto = array.find(prod => prod.nombre === nombreProducto && prod.talle === talleProducto);
            if (producto) {
                producto.cantidad++;
                localStorage.setItem("array", JSON.stringify(array));
            }
        });
    });

    // Boton restar
    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", () => {
            if (Number(btn.closest(".item").querySelector(".cantidad").textContent) > 1) {
                btn.closest(".item").querySelector(".cantidad").textContent =
                    Number(btn.closest(".item").querySelector(".cantidad").textContent) - 1;

                const precioUnitario = parseFloat(btn.closest(".item").querySelector(".span-producto").textContent.replace(/[^0-9,]+|(?<=\d)\.(?=\d{3})/g, ""));
                acum -= precioUnitario;
                document.querySelector(".total-container p").textContent = "Subtotal: $" + acum.toLocaleString("es-AR");

                const nombreProducto = btn.closest(".item").querySelector(".h3-producto").getAttribute("data-nombre");
                let talleProducto = null;
                if (btn.closest(".item").querySelector(".span-talle")) {
                    talleProducto = btn.closest(".item").querySelector(".span-talle").textContent.replace(/[()]/g, "").trim();
                }

                const producto = array.find(prod => prod.nombre === nombreProducto && prod.talle === talleProducto);
                if (producto) {
                    producto.cantidad--;
                    localStorage.setItem("array", JSON.stringify(array));
                }
            } else {
                eliminarProducto(btn.closest(".item"));
            }
        });
    });

    // Boton eliminar
    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", () => {
            eliminarProducto(btn.closest(".item"));
        });
    });
}

//Evento para que el usuario se suscriba
document.getElementById("arrow").addEventListener("click", () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.querySelector("#form input").value.trim())) {
        Toastify({
            text: "El correo es inválido",
            duration: 2500,
            gravity: "bottom",
            position: "center",
            style: {
                background: "#015179",
                color: "#FFFFFF",
                fontSize: "16px",
                padding: "15px",
            }
        }).showToast();
    } else {
        setTimeout(() => {
            document.querySelector("#form input").value = "";
        }, 1500);

        Toastify({
            text: "Suscrito correctamente!",
            duration: 2500,
            gravity: "bottom",
            position: "center",
            style: {
                background: "#0088cc",
                color: "#FFFFFF",
                fontSize: "16px",
                padding: "15px",
            }
        }).showToast();
    }
});
