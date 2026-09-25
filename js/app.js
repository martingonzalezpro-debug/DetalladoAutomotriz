/* carrito */

function obtenerCarrito() {

    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];


    const carritoSinRepetidos = [];


    carrito.forEach(function(producto) {

        const existe =
            carritoSinRepetidos.some(
                function(guardado) {

                    return (
                        guardado.nombre ===
                        producto.nombre
                    );

                }
            );


        if (!existe) {

            carritoSinRepetidos.push({

                nombre: producto.nombre,

                precio: producto.precio,

                cantidad: 1

            });

        }

    });


    return carritoSinRepetidos;

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();

}


function obtenerCantidadCarrito() {

    const carrito =
        obtenerCarrito();


    return carrito.length;

}


function actualizarContadorCarrito() {

    const contador =
        document.getElementById(
            "contador-carrito"
        );


    if (contador) {

        contador.textContent =
            obtenerCantidadCarrito();

    }

}


function agregarCarritoNavbar() {

    const menu =
        document.querySelector(".menu");


    if (!menu) {

        return;

    }


    if (
        document.querySelector(
            ".enlace-carrito"
        )
    ) {

        actualizarContadorCarrito();

        return;

    }


    const elementoCarrito =
        document.createElement("li");


    const enlaceCarrito =
        document.createElement("a");


    enlaceCarrito.href =
        "carrito.html";


    enlaceCarrito.classList.add(
        "enlace-carrito"
    );


    if (
        window.location.pathname.includes(
            "carrito.html"
        )
    ) {

        enlaceCarrito.classList.add(
            "activo"
        );

    }


    enlaceCarrito.innerHTML =
        'Carrito (<span id="contador-carrito">0</span>)';


    elementoCarrito.appendChild(
        enlaceCarrito
    );


    const ultimoElemento =
        menu.lastElementChild;


    if (ultimoElemento) {

        menu.insertBefore(
            elementoCarrito,
            ultimoElemento
        );

    } else {

        menu.appendChild(
            elementoCarrito
        );

    }


    actualizarContadorCarrito();

}


agregarCarritoNavbar();



/* formulario contacto */

const formularioContacto =
    document.getElementById(
        "formulario-contacto"
    );


if (formularioContacto) {

    formularioContacto.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const mensajeExito =
                document.getElementById(
                    "mensaje-exito"
                );


            mensajeExito.classList.add(
                "mostrar"
            );


            formularioContacto.reset();


            setTimeout(function() {

                mensajeExito.classList.remove(
                    "mostrar"
                );

            }, 4000);

        }
    );

}



/* registro */

const formularioRegistro =
    document.getElementById(
        "formulario-registro"
    );


if (formularioRegistro) {

    formularioRegistro.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const mensajeRegistro =
                document.getElementById(
                    "registro-exito"
                );


            mensajeRegistro.classList.add(
                "mostrar"
            );


            setTimeout(function() {

                window.location.href =
                    "login.html";

            }, 1200);

        }
    );

}



/* login */

const formularioLogin =
    document.getElementById(
        "formulario-login"
    );


if (formularioLogin) {

    formularioLogin.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const mensajeLogin =
                document.getElementById(
                    "login-exito"
                );


            mensajeLogin.classList.add(
                "mostrar"
            );


            setTimeout(function() {

                window.location.href =
                    "perfil.html";

            }, 1200);

        }
    );

}



/* cerrar sesion */

const botonCerrarSesion =
    document.getElementById(
        "cerrar-sesion"
    );


if (botonCerrarSesion) {

    botonCerrarSesion.addEventListener(
        "click",
        function() {

            const mensajeSesion =
                document.getElementById(
                    "mensaje-sesion"
                );


            mensajeSesion.classList.add(
                "mostrar"
            );


            setTimeout(function() {

                window.location.href =
                    "index.html";

            }, 1200);

        }
    );

}



/* filtros del catalogo */

const botonesFiltro =
    document.querySelectorAll(
        ".filtro-boton"
    );


const servicios =
    document.querySelectorAll(
        ".servicio"
    );


if (botonesFiltro.length > 0) {

    botonesFiltro.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const filtroSeleccionado =
                        boton.getAttribute(
                            "data-filtro"
                        );


                    botonesFiltro.forEach(
                        function(otroBoton) {

                            otroBoton.classList.remove(
                                "activo"
                            );

                        }
                    );


                    boton.classList.add(
                        "activo"
                    );


                    servicios.forEach(
                        function(servicio) {

                            const categoria =
                                servicio.getAttribute(
                                    "data-categoria"
                                );


                            if (
                                filtroSeleccionado ===
                                "todos" ||
                                categoria ===
                                filtroSeleccionado
                            ) {

                                servicio.classList.remove(
                                    "oculto"
                                );

                            } else {

                                servicio.classList.add(
                                    "oculto"
                                );

                            }

                        }
                    );

                }
            );

        }
    );

}



/* agregar servicio al carrito */

const botonesAgregar =
    document.querySelectorAll(
        ".agregar-carrito"
    );


botonesAgregar.forEach(
    function(boton) {

        boton.addEventListener(
            "click",
            function() {

                const detalle =
                    boton.closest(
                        ".detalle-info"
                    );


                const nombre =
                    boton.getAttribute(
                        "data-nombre"
                    );


                const precio =
                    Number(
                        boton.getAttribute(
                            "data-precio"
                        )
                    );


                let carrito =
                    obtenerCarrito();


                const productoExistente =
                    carrito.find(
                        function(producto) {

                            return (
                                producto.nombre ===
                                nombre
                            );

                        }
                    );


                const mensaje =
                    detalle.querySelector(
                        ".mensaje-carrito"
                    );


                if (productoExistente) {

                    mensaje.textContent =
                        "Este servicio ya está en tu carrito.";


                    mensaje.classList.add(
                        "mensaje-aviso"
                    );


                    mensaje.classList.add(
                        "mostrar"
                    );


                    setTimeout(function() {

                        mensaje.classList.remove(
                            "mostrar"
                        );

                        mensaje.classList.remove(
                            "mensaje-aviso"
                        );

                    }, 2500);


                    return;

                }


                carrito.push({

                    nombre: nombre,

                    precio: precio,

                    cantidad: 1

                });


                guardarCarrito(
                    carrito
                );


                mensaje.textContent =
                    "Servicio agregado al carrito.";


                mensaje.classList.remove(
                    "mensaje-aviso"
                );


                mensaje.classList.add(
                    "mostrar"
                );


                setTimeout(function() {

                    mensaje.classList.remove(
                        "mostrar"
                    );

                }, 2500);

            }
        );

    }
);



/* mostrar carrito */

const listaCarrito =
    document.getElementById(
        "lista-carrito"
    );


function mostrarCarrito() {

    if (!listaCarrito) {

        return;

    }


    const carrito =
        obtenerCarrito();


    guardarCarrito(
        carrito
    );


    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <div class="carrito-vacio">

                <h2>
                    Tu carrito está vacío
                </h2>

                <p>
                    Agrega un servicio desde nuestro catálogo.
                </p>

                <a
                    href="catalogo.html"
                    class="boton boton-principal"
                >
                    Ver catálogo
                </a>

            </div>

        `;


        document.getElementById(
            "resumen-cantidad"
        ).textContent = "0";


        document.getElementById(
            "total-carrito"
        ).textContent = "$0";


        const botonPagar =
            document.getElementById(
                "boton-pagar"
            );


        if (botonPagar) {

            botonPagar.classList.add(
                "boton-deshabilitado"
            );

        }


        return;

    }


    let total = 0;


    carrito.forEach(
        function(producto, indice) {

            total += producto.precio;


            const productoHTML =
                document.createElement(
                    "article"
                );


            productoHTML.classList.add(
                "producto-carrito"
            );


            productoHTML.innerHTML = `

                <div class="producto-carrito-info">

                    <h2>
                        ${producto.nombre}
                    </h2>

                    <p>
                        Servicio para el vehículo
                    </p>

                </div>


                <div class="producto-carrito-precio">

                    <strong>
                        $${producto.precio.toLocaleString("es-MX")}
                    </strong>

                    <button
                        class="eliminar-producto"
                        data-indice="${indice}"
                    >
                        Eliminar
                    </button>

                </div>

            `;


            listaCarrito.appendChild(
                productoHTML
            );

        }
    );


    document.getElementById(
        "resumen-cantidad"
    ).textContent =
        carrito.length;


    document.getElementById(
        "total-carrito"
    ).textContent =
        "$" +
        total.toLocaleString(
            "es-MX"
        );


    activarBotonesEliminar();

}



/* eliminar servicio */

function activarBotonesEliminar() {

    const botonesEliminar =
        document.querySelectorAll(
            ".eliminar-producto"
        );


    botonesEliminar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.getAttribute(
                                "data-indice"
                            )
                        );


                    const carrito =
                        obtenerCarrito();


                    carrito.splice(
                        indice,
                        1
                    );


                    guardarCarrito(
                        carrito
                    );


                    mostrarCarrito();

                }
            );

        }
    );

}


mostrarCarrito();



/* resumen checkout */

const checkoutProductos =
    document.getElementById(
        "checkout-productos"
    );


if (checkoutProductos) {

    const carrito =
        obtenerCarrito();


    let total = 0;


    checkoutProductos.innerHTML = "";


    if (carrito.length === 0) {

        checkoutProductos.innerHTML = `

            <div class="checkout-vacio">

                <p>
                    No hay servicios en el carrito.
                </p>

            </div>

        `;

    }


    carrito.forEach(
        function(producto) {

            total += producto.precio;


            const fila =
                document.createElement(
                    "div"
                );


            fila.classList.add(
                "checkout-producto"
            );


            fila.innerHTML = `

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                </div>

                <span>
                    $${producto.precio.toLocaleString("es-MX")}
                </span>

            `;


            checkoutProductos.appendChild(
                fila
            );

        }
    );


    document.getElementById(
        "checkout-total"
    ).textContent =
        "$" +
        total.toLocaleString(
            "es-MX"
        );

}