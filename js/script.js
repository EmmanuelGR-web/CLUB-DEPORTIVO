document.addEventListener("DOMContentLoaded", () => {
    resaltarNavbarAlScroll();
    resaltarSeccionActivaEnMenu();
    cerrarMenuMobileAlHacerClick();
    activarModoOscuro();
    activarBotonVolverArriba();
    activarContadorDeCaracteres();
    validarFormularioContacto();
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

function activarBotonVolverArriba() {
    const boton = document.getElementById("btnVolverArriba");
    if (!boton) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            boton.classList.remove("d-none");
        } else {
            boton.classList.add("d-none");
        }
    });

    boton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function actualizarAnioDelFooter() {
    const spanAnio = document.getElementById("anioActual");
    if (!spanAnio) return;
    spanAnio.textContent = new Date().getFullYear();
}

function activarContadorDeCaracteres() {
    const textarea = document.getElementById("mensaje");
    const contador = document.getElementById("contadorMensaje");

    if (!textarea || !contador) return;

    const limite = textarea.maxLength;

    textarea.addEventListener("input", () => {
        const cantidadActual = textarea.value.length;
        contador.textContent = `${cantidadActual}/${limite} caracteres`;

        if (cantidadActual >= limite - 20) {
            contador.classList.add("text-danger");
        } else {
            contador.classList.remove("text-danger");
        }
    });
}

function validarFormularioContacto() {
    const formulario = document.getElementById("formularioContacto");
    const contenedorMensaje = document.getElementById("mensajeEnvioContacto");
    const campoNombre = document.getElementById("nombre");
    const campoEmail = document.getElementById("email");
    const campoMensaje = document.getElementById("mensaje");
    const contador = document.getElementById("contadorMensaje");

    if (!formulario || !contenedorMensaje || !campoNombre || !campoEmail || !campoMensaje || !contador) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const esValido = formulario.checkValidity();
        formulario.classList.add("was-validated");

        if (!esValido) {
            contenedorMensaje.innerHTML = "";
            return;
        }

        const nombre = campoNombre.value.trim();
        const email = campoEmail.value.trim();
        const mensaje = campoMensaje.value.trim();

        console.log("Formulario Recibido:", {
            nombre,
            email,
            mensaje
        });

        const alerta = document.createElement("div");
        alerta.className = "alert alert-success d-flex align-items-center gap-2 mt-2";
        alerta.setAttribute("role", "alert");
        alerta.innerHTML = '<i class="bi bi-check-circle-fill"></i><span></span>';
        alerta.querySelector("span").textContent = `Gracias, ${nombre}! Recibimos tu mensaje, te vamos a responder a la brevedad.`;
        contenedorMensaje.replaceChildren(alerta);

        formulario.reset();
        formulario.classList.remove("was-validated");
        contador.textContent = "0/300 caracteres";
        contador.classList.remove("text-danger");
    });
}