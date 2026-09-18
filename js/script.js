document.addEventListener("DOMContentLoaded", () => {
    resaltarNavbarAlScroll();
    resaltarSeccionActivaEnMenu();
    cerrarMenuMobileAlHacerClick();
    activarModoOscuro();
    activarBotonVolverArriba();
    activarContadorDeCaracteres();
    validarFormularioContacto();
    activarAccesoPorRoles();
    activarCarruselActividades();
    configurarVideoBanner();
    configurarBarajaNoticias();
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
            navbar.style.backgroundColor = "rgba(53, 7, 11, 0.83)";
            if (contenedorNavbar) contenedorNavbar.style.backgroundColor = "rgba(111, 19, 19, 0.5)";
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

function activarAccesoPorRoles() {
    const formularioAcceso = document.getElementById("formularioAcceso");
    const contenedorBotones = document.getElementById("contenedorBotonesAcceso");
    const formularioRegistro = document.getElementById("formularioRegistro");
    const formularioRecuperacion = document.getElementById("formularioRecuperacion");
    
    const botonRegistro = document.getElementById("btnMostrarRegistro");
    const botonRecuperacion = document.getElementById("btnMostrarRecuperacion");
    const botonVolverRegistro = document.getElementById("btnVolverAccesoDesdeRegistro");
    const botonVolverRecuperacion = document.getElementById("btnVolverAccesoDesdeRecuperacion");

    const mensajeAcceso = document.getElementById("mensajeAcceso");
    const mensajeRegistro = document.getElementById("mensajeRegistro");
    const mensajeRecuperacion = document.getElementById("mensajeRecuperacion");
    const modal = document.getElementById("modalAcceso");
    const panel = document.getElementById("panelUsuario");
    const contenidoPublico = document.querySelector("main");
    const tituloPanel = document.getElementById("tituloPanel");
    const contenidoPanel = document.getElementById("contenidoPanel");
    const botonCerrarSesion = document.getElementById("btnCerrarSesion");

    if (!formularioAcceso || !modal || !panel || !contenidoPublico) return;

    const usuarios = {
        socio: {
            email: "socio@club.com",
            contrasena: "socio123",
            nombreRol: "Socio",
            titulo: "Mis datos",
            tarjetas: [
                ["bi-person-badge", "Datos personales", "Consultá tu información y estado de socio."],
                ["bi-credit-card-2-back", "Carnet digital", "Mostrá tu carnet digital para acceder a las instalaciones."],
                ["bi-coin", "Mis pagos", "Revisá tus pagos y vencimientos de cuotas."],
            ]
        },
        administrativo: {
            email: "administrativo@club.com",
            contrasena: "admin123",
            nombreRol: "Personal administrativo",
            titulo: "Panel administrativo",
            tarjetas: [
                ["bi-people", "Gestión de socios", "Consultá y actualizá los datos de los socios."],
                ["bi-clipboard-data", "Inscripciones", "Revisá las nuevas solicitudes de asociacion."],
            ]
        },
        administrador: {
            email: "principal@club.com",
            contrasena: "principal123",
            nombreRol: "Administrador principal",
            titulo: "Panel de administración principal",
            tarjetas: [
                ["bi-people", "Gestión de socios", "Consultá y actualizá los datos de los socios."],
                ["bi-shield-lock", "Permisos", "Administrá los accesos y roles del sistema."],
            ]
        }
    };

    const obtenerSociosRegistrados = () => JSON.parse(localStorage.getItem("sociosRegistrados") || "[]");

    const mostrarMensaje = (contenedor, tipo, texto) => {
        if (contenedor) contenedor.innerHTML = `<div class="alert alert-${tipo} mb-0" role="alert">${texto}</div>`;
    };

    const actualizarAvisosDeValidacion = (formulario) => {
        if (!formulario) return;
        formulario.querySelectorAll("input, select").forEach((campo) => {
            const contenedorCampo = campo.closest(".mb-3");
            const aviso = contenedorCampo ? contenedorCampo.querySelector(".invalid-feedback") : null;
            if (aviso) aviso.classList.toggle("d-block", !campo.checkValidity());
        });
    };

    [formularioAcceso, formularioRegistro, formularioRecuperacion].forEach((formulario) => {
        if (!formulario) return;
        formulario.addEventListener("input", () => {
            if (formulario.classList.contains("was-validated")) actualizarAvisosDeValidacion(formulario);
        });
        formulario.addEventListener("change", () => {
            if (formulario.classList.contains("was-validated")) actualizarAvisosDeValidacion(formulario);
        });
    });

    const alternarVisibilidadContrasena = (boton) => {
        const campo = document.getElementById(boton.dataset.target);
        const icono = boton.querySelector("i");
        if (!campo || !icono) return;

        const mostrar = campo.type === "password";
        campo.type = mostrar ? "text" : "password";
        icono.classList.toggle("bi-eye", !mostrar);
        icono.classList.toggle("bi-eye-slash", mostrar);
        boton.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
        boton.setAttribute("title", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
    };

    document.querySelectorAll(".btnVerContrasena").forEach((boton) => {
        boton.addEventListener("click", () => alternarVisibilidadContrasena(boton));
    });

    const renderizarPanel = (usuario) => {
        if (!tituloPanel || !contenidoPanel) return;
        tituloPanel.textContent = usuario.titulo;
        contenidoPanel.replaceChildren();
        const bienvenidaAnterior = panel.querySelector("[data-bienvenida]");
        if (bienvenidaAnterior) bienvenidaAnterior.remove();

        usuario.tarjetas.forEach(([icono, titulo, texto]) => {
            const columna = document.createElement("div");
            columna.className = "col-12 col-md-4";
            columna.innerHTML = `
                <article class="card h-100 border-0 shadow-sm">
                    <div class="card-body p-4">
                        <i class="bi ${icono} fs-2 text-danger" aria-hidden="true"></i>
                        <h2 class="h5 mt-3">${titulo}</h2>
                        <p class="text-secondary mb-0">${texto}</p>
                    </div>
                </article>
            `;
            contenidoPanel.appendChild(columna);
        });

        const bienvenida = document.createElement("p");
        bienvenida.className = "text-secondary mb-4";
        bienvenida.dataset.bienvenida = "true";
        bienvenida.textContent = `Sesión iniciada como ${usuario.nombreRol}.`;
        contenidoPanel.before(bienvenida);
    };

    formularioAcceso.addEventListener("submit", (evento) => {
        evento.preventDefault();
        formularioAcceso.classList.add("was-validated");
        actualizarAvisosDeValidacion(formularioAcceso);

        if (!formularioAcceso.checkValidity()) return;

        const rol = document.getElementById("rolUsuario").value;
        const email = document.getElementById("emailAcceso").value.trim().toLowerCase();
        const contrasena = document.getElementById("contrasenaAcceso").value;
        const usuario = usuarios[rol];
        const socioRegistrado = rol === "socio"
            ? obtenerSociosRegistrados().find((socio) => socio.email === email && socio.contrasena === contrasena)
            : null;

        if (!usuario || (rol === "socio" && !socioRegistrado && (email !== usuario.email || contrasena !== usuario.contrasena)) || (rol !== "socio" && (email !== usuario.email || contrasena !== usuario.contrasena))) {
            mostrarMensaje(mensajeAcceso, "danger", "El rol, email o contraseña no coinciden.");
            return;
        }

        renderizarPanel(usuario);
        contenidoPublico.classList.add("d-none");
        panel.classList.remove("d-none");
        formularioAcceso.reset();
        formularioAcceso.classList.remove("was-validated");
        if (mensajeAcceso) mensajeAcceso.replaceChildren();
        bootstrap.Modal.getOrCreateInstance(modal).hide();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    
    if (botonRegistro && formularioRegistro) {
        botonRegistro.addEventListener("click", () => {
            formularioAcceso.classList.add("d-none");
            if (contenedorBotones) contenedorBotones.classList.add("d-none");
            if (formularioRecuperacion) formularioRecuperacion.classList.add("d-none");
            formularioRegistro.classList.remove("d-none");
            if (mensajeRegistro) mensajeRegistro.replaceChildren();
        });
    }

    if (botonVolverRegistro && formularioRegistro) {
        botonVolverRegistro.addEventListener("click", () => {
            formularioRegistro.classList.add("d-none");
            formularioAcceso.classList.remove("d-none");
            if (contenedorBotones) contenedorBotones.classList.remove("d-none");
            if (mensajeRegistro) mensajeRegistro.replaceChildren();
        });
    }

    if (botonRecuperacion && formularioRecuperacion) {
        botonRecuperacion.addEventListener("click", () => {
            formularioAcceso.classList.add("d-none");
            if (contenedorBotones) contenedorBotones.classList.add("d-none");
            if (formularioRegistro) formularioRegistro.classList.add("d-none");
            formularioRecuperacion.classList.remove("d-none");
            if (mensajeRecuperacion) mensajeRecuperacion.replaceChildren();
        });
    }

    if (botonVolverRecuperacion && formularioRecuperacion) {
        botonVolverRecuperacion.addEventListener("click", () => {
            formularioRecuperacion.classList.add("d-none");
            formularioAcceso.classList.remove("d-none");
            if (contenedorBotones) contenedorBotones.classList.remove("d-none");
            if (mensajeRecuperacion) mensajeRecuperacion.replaceChildren();
        });
    }

    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", (evento) => {
            evento.preventDefault();
            formularioRegistro.classList.add("was-validated");

            const contrasena = document.getElementById("contrasenaRegistro");
            const confirmarContrasena = document.getElementById("confirmarContrasenaRegistro");
            if (contrasena && confirmarContrasena) {
                confirmarContrasena.setCustomValidity(contrasena.value === confirmarContrasena.value ? "" : "Las contraseñas no coinciden.");
            }
            actualizarAvisosDeValidacion(formularioRegistro);

            if (!formularioRegistro.checkValidity()) return;

            const socios = obtenerSociosRegistrados();
            const email = document.getElementById("emailRegistro").value.trim().toLowerCase();

            if (socios.some((socio) => socio.email === email) || email === usuarios.socio.email) {
                mostrarMensaje(mensajeRegistro, "danger", "Ya existe un socio registrado con ese correo.");
                return;
            }

            socios.push({
                nombre: document.getElementById("nombreRegistro").value.trim(),
                email,
                telefono: document.getElementById("telefonoRegistro").value.trim(),
                contrasena: contrasena.value
            });
            localStorage.setItem("sociosRegistrados", JSON.stringify(socios));
            mostrarMensaje(mensajeRegistro, "success", "Registro exitoso. Ya podés iniciar sesión como socio.");
            formularioRegistro.reset();
            formularioRegistro.classList.remove("was-validated");
        });
    }

    if (formularioRecuperacion) {
        formularioRecuperacion.addEventListener("submit", (evento) => {
            evento.preventDefault();
            formularioRecuperacion.classList.add("was-validated");
            actualizarAvisosDeValidacion(formularioRecuperacion);

            if (!formularioRecuperacion.checkValidity()) return;

            const email = document.getElementById("emailRecuperacion").value.trim();
            mostrarMensaje(mensajeRecuperacion, "success", `Enviamos instrucciones de recuperación a ${email}.`);
            formularioRecuperacion.reset();
            formularioRecuperacion.classList.remove("was-validated");
        });
    }

    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener("click", () => {
            panel.classList.add("d-none");
            contenidoPublico.classList.remove("d-none");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

function activarCarruselActividades() {
    const carrusel = document.getElementById("carruselActividades");
    if (!carrusel || typeof bootstrap === "undefined") return;

    const instanciaCarrusel = bootstrap.Carousel.getOrCreateInstance(carrusel, {
        interval: 4000,
        touch: true,
        keyboard: true,
        pause: "hover" 
    });

    instanciaCarrusel.cycle();
}

function configurarVideoBanner() {
    const video = document.getElementById("bannerVideo");
    if (video) {
        video.playbackRate = 0.80;
    }
}

function configurarBarajaNoticias() {
    const boton = document.getElementById("btnPasarCarta");
    const mazo = document.getElementById("mazoNoticias");

    if (boton && mazo) {
        boton.addEventListener("click", function() {
            const cartas = mazo.getElementsByClassName("tarjeta-baraja");
            if (cartas.length > 0) {
                mazo.appendChild(cartas[0]);
            }
        });
    }

    mazo?.addEventListener("click", function() {
        const cartas = this.getElementsByClassName("tarjeta-baraja");
        if (cartas.length > 0) {
            this.appendChild(cartas[0]);
        }
    });
}
