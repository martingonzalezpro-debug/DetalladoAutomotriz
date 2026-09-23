const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const mensajeExito = document.getElementById("mensaje-exito");

        mensajeExito.classList.add("mostrar");

        formularioContacto.reset();

        setTimeout(function() {

            mensajeExito.classList.remove("mostrar");

        }, 4000);

    });

}


const formularioRegistro = document.getElementById("formulario-registro");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const mensajeRegistro =
            document.getElementById("registro-exito");

        mensajeRegistro.classList.add("mostrar");

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1200);

    });

}


const formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const mensajeLogin =
            document.getElementById("login-exito");

        mensajeLogin.classList.add("mostrar");

        setTimeout(function() {

            window.location.href = "perfil.html";

        }, 1200);

    });

}


const botonCerrarSesion = document.getElementById("cerrar-sesion");

if (botonCerrarSesion) {

    botonCerrarSesion.addEventListener("click", function() {

        const mensajeSesion =
            document.getElementById("mensaje-sesion");

        mensajeSesion.classList.add("mostrar");

        setTimeout(function() {

            window.location.href = "index.html";

        }, 1200);

    });

}


/* filtros del catalogo */

const botonesFiltro =
    document.querySelectorAll(".filtro-boton");

const servicios =
    document.querySelectorAll(".servicio");


if (botonesFiltro.length > 0) {

    botonesFiltro.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const filtroSeleccionado =
                boton.getAttribute("data-filtro");


            botonesFiltro.forEach(function(otroBoton) {

                otroBoton.classList.remove("activo");

            });


            boton.classList.add("activo");


            servicios.forEach(function(servicio) {

                const categoria =
                    servicio.getAttribute("data-categoria");


                if (
                    filtroSeleccionado === "todos" ||
                    categoria === filtroSeleccionado
                ) {

                    servicio.classList.remove("oculto");

                } else {

                    servicio.classList.add("oculto");

                }

            });

        });

    });

}


/* cantidad */

const botonesCantidad =
    document.querySelectorAll(".cantidad-boton");


botonesCantidad.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const controles =
            boton.closest(".cantidad-controles");

        const numero =
            controles.querySelector(".cantidad-numero");

        let cantidad =
            Number(numero.textContent);


        if (
            boton.getAttribute("data-accion") === "sumar"
        ) {

            cantidad++;

        }


        if (
            boton.getAttribute("data-accion") === "restar" &&
            cantidad > 1
        ) {

            cantidad--;

        }


        numero.textContent = cantidad;

    });

});


/* agregar al carrito */

const botonesAgregar =
    document.querySelectorAll(".agregar-carrito");


botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const detalle =
            boton.closest(".detalle-info");

        const cantidad =
            Number(
                detalle.querySelector(
                    ".cantidad-numero"
                ).textContent
            );

        const nombre =
            boton.getAttribute("data-nombre");

        const precio =
            Number(
                boton.getAttribute("data-precio")
            );


        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        const productoExistente =
            carrito.find(function(producto) {

                return producto.nombre === nombre;

            });


        if (productoExistente) {

            productoExistente.cantidad += cantidad;

        } else {

            carrito.push({

                nombre: nombre,
                precio: precio,
                cantidad: cantidad

            });

        }


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        const mensaje =
            detalle.querySelector(
                ".mensaje-carrito"
            );

        mensaje.classList.add("mostrar");


        detalle.querySelector(
            ".cantidad-numero"
        ).textContent = "1";


        setTimeout(function() {

            mensaje.classList.remove("mostrar");

        }, 2500);

    });

});