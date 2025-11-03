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


window.addEventListener("scroll", () => {
    const nav = document.getElementById("nav-bar");
    const iconos = document.querySelectorAll(".material-symbols-outlined");

    if (window.scrollY === 0) {
        nav.classList.remove("nav-bar");
        iconos.forEach(icono => {
            icono.style.color = "#FFFFFF";
        });
    }

    if (window.scrollY > 10) {
        nav.classList.add("nav-bar");
        iconos.forEach(icono => {
            icono.style.color = "#000000";
        });
    }
});