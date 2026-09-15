document.addEventListener("DOMContentLoaded", () => {
    resaltarNavbarAlScroll();
    resaltarSeccionActivaEnMenu();
    cerrarMenuMobileAlHacerClick();
    activarModoOscuro();
    activarBotonVolverArriba();
});



function resaltarNavbarAlScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    const contenedorNavbar = navbar.querySelector(".container");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.remove("bg-danger");
            if (contenedorNavbar) contenedorNavbar.classList.remove("text-bg-danger");
            navbar.style.boxShadow = "none";
            navbar.style.backgroundColor = "rgba(115, 13, 21, 0.5)";
            if (contenedorNavbar) contenedorNavbar.style.backgroundColor = "rgba(53, 7, 11, 0.5)";
        } else {
            navbar.classList.add("bg-danger");
            if (contenedorNavbar) contenedorNavbar.classList.add("text-bg-danger");
            navbar.style.boxShadow = "";
            navbar.style.backgroundColor = "";
            if (contenedorNavbar) contenedorNavbar.style.backgroundColor = "";
        }
    });
}



function resaltarSeccionActivaEnMenu() {
    const secciones = document.querySelectorAll("main section[id]");
    const linksMenu = document.querySelectorAll(".navbar-nav .nav-link");

    if (secciones.length === 0 || linksMenu.length === 0) return;

    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const idSeccion = entrada.target.getAttribute("id");

                    linksMenu.forEach((link) => {
                        const apuntaAEstaSeccion = link.getAttribute("href") === `#${idSeccion}`;
                        link.classList.toggle("active", apuntaAEstaSeccion);
                    });
                }
            });
        },
        {
            rootMargin: "-45% 0px -50% 0px",
        }
    );

    secciones.forEach((seccion) => observador.observe(seccion));
}


function cerrarMenuMobileAlHacerClick() {
    const menu = document.getElementById("menuPrincipal");
    if (!menu) return;

    const linksMenu = menu.querySelectorAll(".nav-link");

    linksMenu.forEach((link) => {
        link.addEventListener("click", () => {
            const estaAbierto = menu.classList.contains("show");
            if (estaAbierto) {
                const instanciaCollapse = bootstrap.Collapse.getOrCreateInstance(menu);
                instanciaCollapse.hide();
            }
        });
    });
}


function activarModoOscuro() {
    const boton = document.getElementById("btnModoOscuro");
    const icono = boton ? boton.querySelector("i") : null;
    if (!boton || !icono) return;

    const CLAVE_ALMACENAMIENTO = "tema-club-deportivo";

    const aplicarTema = (tema) => {
        document.documentElement.setAttribute("data-bs-theme", tema);
        icono.classList.toggle("bi-moon-stars-fill", tema === "light");
        icono.classList.toggle("bi-sun-fill", tema === "dark");
    };


    const temaGuardado = localStorage.getItem(CLAVE_ALMACENAMIENTO) || "light";
    aplicarTema(temaGuardado);

    boton.addEventListener("click", () => {
        const temaActual = document.documentElement.getAttribute("data-bs-theme");
        const nuevoTema = temaActual === "dark" ? "light" : "dark";

        aplicarTema(nuevoTema);
        localStorage.setItem(CLAVE_ALMACENAMIENTO, nuevoTema);
    });
}

const btnVolverArriba = document.getElementById('btnVolverArriba');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnVolverArriba.classList.remove('d-none');
        } else {
            btnVolverArriba.classList.add('d-none');
        }
    });

    btnVolverArriba.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });