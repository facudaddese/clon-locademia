const buscar = document.getElementById("buscar");
const carrito = document.getElementById("carrito");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close");
const modal = document.getElementById("modal");

//Inicio de libreria
AOS.init();
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-down");
})

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
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
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
    const nav = document.getElementById("nav-bar");
    const iconos = document.querySelectorAll(".material-symbols-outlined");

    if (window.scrollY === 0) {
        nav.classList.remove("nav-bar");
        iconos.forEach(icono => {
            icono.style.color = "#FFFFFF";
        });
    } else {
        nav.classList.add("nav-bar");
        iconos.forEach(icono => {
            icono.style.color = "#000000";
        });
    }
});

//Modal
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

    if (window.scrollY === 0) {
        modal.classList.remove("modalWhite");
        modal.classList.add("modal");
    } else {
        modal.classList.remove("modal");
        modal.classList.add("modalWhite");
    }
});

function closeMenuFn() {
    menu.classList.remove("disable");
    closeMenu.classList.add("disable");
    modal.classList.add("disable");
    document.body.style.overflow = "";
    document.querySelector("main").style.pointerEvents = "auto";
}

closeMenu.onclick = closeMenuFn;


