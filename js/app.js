/* productos */

const productosIniciales = [

    {
        id: 1,
        nombre: "Paquete Clásico",
        categoria: "Lavado",
        precio: 250,
        etiqueta: "Popular",
        descripcion:
            "Lavado exterior, aspirado interior, limpieza de plásticos, vidrios y cuidado general del vehículo."
    },

    {
        id: 2,
        nombre: "Paquete Interior Completo",
        categoria: "Interior",
        precio: 1200,
        etiqueta: "",
        descripcion:
            "Lavado profundo de asientos, techo, plásticos, alfombra, tapetes y eliminación de malos olores."
    },

    {
        id: 3,
        nombre: "Exterior Completo - Cera Soft99",
        categoria: "Exterior",
        precio: 1600,
        etiqueta: "",
        descripcion:
            "Servicio de limpieza, descontaminación y protección exterior con Cera Soft99."
    },

    {
        id: 4,
        nombre: "Nano Ceramic",
        categoria: "Exterior",
        precio: 3300,
        etiqueta: "Nuevo",
        descripcion:
            "Corrección de pintura y protección cerámica para mejorar brillo y protección exterior."
    },

    {
        id: 5,
        nombre: "Graphene Ceramic",
        categoria: "Exterior",
        precio: 5200,
        etiqueta: "Premium",
        descripcion:
            "Servicio de corrección y protección exterior con recubrimiento de grafeno."
    },

    {
        id: 6,
        nombre: "Restauración de faros",
        categoria: "Restauración",
        precio: 450,
        etiqueta: "Oferta",
        descripcion:
            "Restauración de faros para recuperar transparencia, apariencia y mejorar su acabado."
    },

    {
        id: 7,
        nombre: "Descontaminación de vidrios",
        categoria: "Restauración",
        precio: 350,
        etiqueta: "",
        descripcion:
            "Eliminación de contaminación mineral adherida en los vidrios y aplicación de protección."
    },

    {
        id: 8,
        nombre: "Pulido de clúster",
        categoria: "Restauración",
        precio: 300,
        etiqueta: "",
        descripcion:
            "Pulido del plástico del clúster para disminuir marcas y recuperar claridad."
    }

];


function obtenerProductosTienda() {

    let productos =
        JSON.parse(
            localStorage.getItem(
                "productosAdmin"
            )
        );


    if (!productos) {

        productos =
            productosIniciales;


        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productos)
        );

    }


    return productos;

}



/* catalogo */

function mostrarCatalogo() {

    const catalogo =
        document.getElementById(
            "catalogo-productos"
        );


    if (!catalogo) {

        return;

    }


    const productos =
        obtenerProductosTienda();


    catalogo.innerHTML =
        "";


    productos.forEach(
        function(producto) {

            const servicio =
                document.createElement(
                    "article"
                );


            servicio.className =
                "servicio";


            servicio.setAttribute(
                "data-categoria",
                producto.categoria
                    .toLowerCase()
            );


            let etiquetaHTML =
                "";


            if (producto.etiqueta) {

                etiquetaHTML = `

                    <span class="etiqueta-servicio">
                        ${producto.etiqueta}
                    </span>

                `;

            }


            servicio.innerHTML = `

                <div class="servicio-imagen">

                    Imagen del servicio

                </div>


                <div class="servicio-contenido">

                    ${etiquetaHTML}

                    <h2>
                        ${producto.nombre}
                    </h2>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <h3>
                        Desde $${Number(producto.precio).toLocaleString("es-MX")}
                    </h3>

                    <a
                        href="detalle-producto.html?id=${producto.id}"
                        class="boton-detalle"
                    >
                        Ver detalle
                    </a>

                </div>

            `;


            catalogo.appendChild(
                servicio
            );

        }
    );

}



/* detalle automatico */

function mostrarDetalleProducto() {

    const contenedor =
        document.getElementById(
            "detalle-producto-dinamico"
        );


    if (!contenedor) {

        return;

    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const id =
        parametros.get("id");


    const productos =
        obtenerProductosTienda();


    const producto =
        productos.find(
            function(producto) {

                return (
                    String(producto.id) ===
                    String(id)
                );

            }
        );


    if (!producto) {

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <h2>
                    Servicio no encontrado
                </h2>

                <p>
                    El servicio que buscas no está disponible.
                </p>

                <a
                    href="catalogo.html"
                    class="boton boton-principal"
                >
                    Volver al catálogo
                </a>

            </div>

        `;


        return;

    }


    document.title =
        producto.nombre +
        " | Dr. Chulo";


    const relacionados =
        productos
            .filter(
                function(otroProducto) {

                    return (
                        String(otroProducto.id) !==
                        String(producto.id)
                    );

                }
            )
            .slice(0, 3);


    let relacionadosHTML =
        "";


    relacionados.forEach(
        function(relacionado) {

            relacionadosHTML += `

                <a
                    href="detalle-producto.html?id=${relacionado.id}"
                    class="relacionado"
                >

                    <h3>
                        ${relacionado.nombre}
                    </h3>

                    <p>
                        Desde $${Number(relacionado.precio).toLocaleString("es-MX")}
                    </p>

                </a>

            `;

        }
    );


    contenedor.innerHTML = `

        <div class="detalle-servicio">

            <div class="detalle-imagen">

                <p>
                    Imagen del servicio
                </p>

            </div>


            <div class="detalle-info">

                <p class="etiqueta">
                    ${producto.categoria.toUpperCase()}
                </p>


                <h1>
                    ${producto.nombre}
                </h1>


                <h2>
                    Desde $${Number(producto.precio).toLocaleString("es-MX")}
                </h2>


                <p>
                    ${producto.descripcion}
                </p>


                <div class="acciones-detalle">

                    <button
                        type="button"
                        class="boton boton-principal agregar-carrito"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}"
                    >
                        Agregar al carrito
                    </button>


                    <a
                        href="catalogo.html"
                        class="boton boton-secundario"
                    >
                        Regresar al catálogo
                    </a>

                </div>


                <div class="mensaje-carrito">
                </div>

            </div>

        </div>


        <section class="relacionados">

            <h2>
                También te puede interesar
            </h2>

            <div class="relacionados-grid">

                ${relacionadosHTML}

            </div>

        </section>

    `;

}



/* carrito */

function obtenerCarrito() {

    const carritoGuardado =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];


    const carrito =
        [];


    carritoGuardado.forEach(
        function(producto) {

            const existe =
                carrito.some(
                    function(productoGuardado) {

                        return (
                            productoGuardado.nombre ===
                            producto.nombre
                        );

                    }
                );


            if (!existe) {

                carrito.push({

                    nombre:
                        producto.nombre,

                    precio:
                        Number(
                            producto.precio
                        ),

                    cantidad: 1

                });

            }

        }
    );


    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    return carrito;

}



function guardarCarrito(
    carrito
) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();

}



function obtenerCantidadCarrito() {

    return obtenerCarrito().length;

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



/* carrito barra */

function agregarCarritoNavbar() {

    const menu =
        document.querySelector(
            ".menu"
        );


    if (!menu) {

        return;

    }


    const existente =
        document.querySelector(
            ".enlace-carrito"
        );


    if (existente) {

        actualizarContadorCarrito();

        return;

    }


    const li =
        document.createElement(
            "li"
        );


    const enlace =
        document.createElement(
            "a"
        );


    enlace.href =
        "carrito.html";


    enlace.className =
        "enlace-carrito";


    enlace.title =
        "Carrito";


    enlace.innerHTML = `

        <span class="carrito-icono">
            🛒
        </span>

        <span
            id="contador-carrito"
            class="carrito-contador"
        >
            0
        </span>

    `;


    li.appendChild(
        enlace
    );


    const ultimo =
        menu.lastElementChild;


    if (ultimo) {

        menu.insertBefore(
            li,
            ultimo
        );

    } else {

        menu.appendChild(
            li
        );

    }


    actualizarContadorCarrito();

}



/* filtros */

function activarFiltrosCatalogo() {

    const botones =
        document.querySelectorAll(
            ".filtro-boton"
        );


    if (botones.length === 0) {

        return;

    }


    botones.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const filtro =
                        boton.getAttribute(
                            "data-filtro"
                        );


                    botones.forEach(
                        function(otroBoton) {

                            otroBoton.classList.remove(
                                "activo"
                            );

                        }
                    );


                    boton.classList.add(
                        "activo"
                    );


                    const servicios =
                        document.querySelectorAll(
                            ".servicio"
                        );


                    servicios.forEach(
                        function(servicio) {

                            const categoria =
                                servicio.getAttribute(
                                    "data-categoria"
                                );


                            if (
                                filtro === "todos" ||
                                categoria === filtro
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



/* agregar servicio */

function activarBotonesAgregar() {

    const botones =
        document.querySelectorAll(
            ".agregar-carrito"
        );


    if (botones.length === 0) {

        return;

    }


    const carritoActual =
        obtenerCarrito();


    botones.forEach(
        function(boton) {

            const nombre =
                boton.getAttribute(
                    "data-nombre"
                );


            const yaExiste =
                carritoActual.some(
                    function(producto) {

                        return (
                            producto.nombre ===
                            nombre
                        );

                    }
                );


            if (yaExiste) {

                boton.textContent =
                    "Ya está en el carrito";


                agregarBotonVerCarrito(
                    boton
                );

            }


            boton.addEventListener(
                "click",
                function() {

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


                    const carrito =
                        obtenerCarrito();


                    const existe =
                        carrito.some(
                            function(producto) {

                                return (
                                    producto.nombre ===
                                    nombre
                                );

                            }
                        );


                    const detalle =
                        boton.closest(
                            ".detalle-info"
                        );


                    let mensaje = null;


                    if (detalle) {

                        mensaje =
                            detalle.querySelector(
                                ".mensaje-carrito"
                            );

                    }


                    if (existe) {

                        if (mensaje) {

                            mensaje.textContent =
                                "Este servicio ya está en tu carrito.";


                            mensaje.classList.add(
                                "mensaje-aviso"
                            );


                            mensaje.classList.add(
                                "mostrar"
                            );


                            setTimeout(
                                function() {

                                    mensaje.classList.remove(
                                        "mostrar"
                                    );

                                },
                                2500
                            );

                        }


                        agregarBotonVerCarrito(
                            boton
                        );


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


                    boton.textContent =
                        "Ya está en el carrito";


                    agregarBotonVerCarrito(
                        boton
                    );


                    if (mensaje) {

                        mensaje.textContent =
                            "Servicio agregado al carrito.";


                        mensaje.classList.remove(
                            "mensaje-aviso"
                        );


                        mensaje.classList.add(
                            "mostrar"
                        );


                        setTimeout(
                            function() {

                                mensaje.classList.remove(
                                    "mostrar"
                                );

                            },
                            2500
                        );

                    }

                }
            );

        }
    );

}



function agregarBotonVerCarrito(
    boton
) {

    const acciones =
        boton.closest(
            ".acciones-detalle"
        );


    if (!acciones) {

        return;

    }


    if (
        acciones.querySelector(
            ".ver-carrito-detalle"
        )
    ) {

        return;

    }


    const enlace =
        document.createElement(
            "a"
        );


    enlace.href =
        "carrito.html";


    enlace.className =
        "boton boton-secundario ver-carrito-detalle";


    enlace.textContent =
        "Ver carrito";


    acciones.appendChild(
        enlace
    );

}



/* carrito pagina */

function mostrarCarrito() {

    const lista =
        document.getElementById(
            "lista-carrito"
        );


    if (!lista) {

        return;

    }


    const carrito =
        obtenerCarrito();


    const cantidad =
        document.getElementById(
            "resumen-cantidad"
        );


    const totalElemento =
        document.getElementById(
            "total-carrito"
        );


    const botonPagar =
        document.getElementById(
            "boton-pagar"
        );


    lista.innerHTML =
        "";


    if (
        carrito.length === 0
    ) {

        lista.innerHTML = `

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


        if (cantidad) {

            cantidad.textContent =
                "0";

        }


        if (totalElemento) {

            totalElemento.textContent =
                "$0";

        }


        if (botonPagar) {

            botonPagar.classList.add(
                "boton-deshabilitado"
            );

        }


        return;

    }


    if (botonPagar) {

        botonPagar.classList.remove(
            "boton-deshabilitado"
        );

    }


    let total = 0;


    carrito.forEach(
        function(producto, indice) {

            total +=
                Number(
                    producto.precio
                );


            const elemento =
                document.createElement(
                    "article"
                );


            elemento.className =
                "producto-carrito";


            elemento.innerHTML = `

                <div class="producto-carrito-info">

                    <h2>
                        ${producto.nombre}
                    </h2>

                    <p>
                        Servicio seleccionado para este vehículo
                    </p>

                </div>


                <div class="producto-carrito-precio">

                    <strong>
                        $${Number(producto.precio).toLocaleString("es-MX")}
                    </strong>

                    <button
                        type="button"
                        class="eliminar-producto"
                        data-indice="${indice}"
                    >
                        Eliminar
                    </button>

                </div>

            `;


            lista.appendChild(
                elemento
            );

        }
    );


    if (cantidad) {

        cantidad.textContent =
            carrito.length;

    }


    if (totalElemento) {

        totalElemento.textContent =
            "$" +
            total.toLocaleString(
                "es-MX"
            );

    }


    activarEliminarCarrito();

}



function activarEliminarCarrito() {

    const botones =
        document.querySelectorAll(
            ".eliminar-producto"
        );


    botones.forEach(
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



/* checkout */

function mostrarCheckout() {

    const contenedor =
        document.getElementById(
            "checkout-productos"
        );


    if (!contenedor) {

        return;

    }


    const carrito =
        obtenerCarrito();


    const totalElemento =
        document.getElementById(
            "checkout-total"
        );


    let total = 0;


    contenedor.innerHTML =
        "";


    if (
        carrito.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <h2>
                    No hay servicios seleccionados
                </h2>

                <p>
                    Agrega un servicio para continuar.
                </p>

                <a
                    href="catalogo.html"
                    class="boton boton-principal"
                >
                    Ver catálogo
                </a>

            </div>

        `;


        if (totalElemento) {

            totalElemento.textContent =
                "$0";

        }


        return;

    }


    carrito.forEach(
        function(producto) {

            total +=
                Number(
                    producto.precio
                );


            const fila =
                document.createElement(
                    "div"
                );


            fila.className =
                "checkout-producto";


            fila.innerHTML = `

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <p>
                        Servicio para este vehículo
                    </p>

                </div>

                <span>
                    $${Number(producto.precio).toLocaleString("es-MX")}
                </span>

            `;


            contenedor.appendChild(
                fila
            );

        }
    );


    if (totalElemento) {

        totalElemento.textContent =
            "$" +
            total.toLocaleString(
                "es-MX"
            );

    }

}



/* contacto */

function activarContacto() {

    const formulario =
        document.getElementById(
            "formulario-contacto"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const mensaje =
                document.getElementById(
                    "mensaje-exito"
                );


            if (mensaje) {

                mensaje.classList.add(
                    "mostrar"
                );

            }


            formulario.reset();


            setTimeout(
                function() {

                    if (mensaje) {

                        mensaje.classList.remove(
                            "mostrar"
                        );

                    }

                },
                4000
            );

        }
    );

}



/* registro */

function activarRegistro() {

    const formulario =
        document.getElementById(
            "formulario-registro"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const mensaje =
                document.getElementById(
                    "registro-exito"
                );


            if (mensaje) {

                mensaje.classList.add(
                    "mostrar"
                );

            }


            setTimeout(
                function() {

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );

}



/* login */

function activarLogin() {

    const formulario =
        document.getElementById(
            "formulario-login"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const mensaje =
                document.getElementById(
                    "login-exito"
                );


            if (mensaje) {

                mensaje.classList.add(
                    "mostrar"
                );

            }


            setTimeout(
                function() {

                    window.location.href =
                        "perfil.html";

                },
                1200
            );

        }
    );

}



/* cerrar sesion */

function activarCerrarSesion() {

    const boton =
        document.getElementById(
            "cerrar-sesion"
        );


    if (!boton) {

        return;

    }


    boton.addEventListener(
        "click",
        function() {

            const mensaje =
                document.getElementById(
                    "mensaje-sesion"
                );


            if (mensaje) {

                mensaje.classList.add(
                    "mostrar"
                );

            }


            setTimeout(
                function() {

                    window.location.href =
                        "index.html";

                },
                1200
            );

        }
    );

}



/* iniciar */

function iniciarApp() {

    mostrarCatalogo();

    mostrarDetalleProducto();

    agregarCarritoNavbar();

    activarFiltrosCatalogo();

    activarBotonesAgregar();

    mostrarCarrito();

    mostrarCheckout();

    activarContacto();

    activarRegistro();

    activarLogin();

    activarCerrarSesion();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarApp
    );

} else {

    iniciarApp();

}