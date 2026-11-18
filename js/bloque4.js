function mostrarAvisoBloque4(
    texto,
    tipo
) {

    let aviso =
        document.getElementById(
            "aviso-bloque4"
        );


    if (!aviso) {

        aviso =
            document.createElement(
                "div"
            );


        aviso.id =
            "aviso-bloque4";


        aviso.className =
            "aviso-bloque4";


        document.body.appendChild(
            aviso
        );

    }


    aviso.className =
        "aviso-bloque4 " +
        (
            tipo === "error"
                ? "error"
                : "exito"
        );


    aviso.textContent =
        texto;


    aviso.style.display =
        "block";


    clearTimeout(
        aviso.temporizador
    );


    aviso.temporizador =
        setTimeout(
            function() {

                aviso.style.display =
                    "none";

            },
            3000
        );

}



function obtenerCarritoBloque4() {

    return (
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || []
    );

}



function obtenerTotalesBloque4() {

    const carrito =
        obtenerCarritoBloque4();


    if (
        typeof calcularTotalesDinamicos ===
        "function"
    ) {

        return calcularTotalesDinamicos(
            carrito
        );

    }


    let subtotal =
        0;


    carrito.forEach(
        function(producto) {

            subtotal +=
                Number(producto.precio);

        }
    );


    return {

        subtotal:
            subtotal,

        descuento:
            0,

        total:
            subtotal,

        codigo:
            "",

        promocion:
            null

    };

}



function obtenerDatosDireccion() {

    return {

        nombre:
            document.getElementById(
                "checkout-nombre"
            )?.value || "",

        telefono:
            document.getElementById(
                "checkout-telefono"
            )?.value || "",

        direccion:
            document.getElementById(
                "checkout-direccion"
            )?.value || "",

        ciudad:
            document.getElementById(
                "checkout-ciudad"
            )?.value || "",

        referencia:
            document.getElementById(
                "checkout-referencia"
            )?.value || ""

    };

}



function obtenerMetodoPago() {

    const seleccionado =
        document.querySelector(
            'input[name="metodo-pago"]:checked'
        );


    if (!seleccionado) {

        return "tarjeta";

    }


    return seleccionado.value;

}



function nombreMetodoPago(
    metodo
) {

    if (
        metodo === "transferencia"
    ) {

        return "Transferencia bancaria";

    }


    if (
        metodo === "wallet"
    ) {

        return "E-wallet";

    }


    return "Tarjeta";

}



function mostrarPasoCheckout(
    numero
) {

    document
        .querySelectorAll(
            ".checkout-contenido"
        )
        .forEach(
            function(elemento) {

                elemento.classList.remove(
                    "activo"
                );

            }
        );


    document
        .querySelectorAll(
            ".checkout-paso"
        )
        .forEach(
            function(elemento) {

                elemento.classList.remove(
                    "activo"
                );

            }
        );


    const seccion =
        document.getElementById(
            numero === 1
                ? "paso-direccion"
                : numero === 2
                    ? "paso-pago"
                    : "paso-confirmacion"
        );


    if (seccion) {

        seccion.classList.add(
            "activo"
        );

    }


    document
        .querySelectorAll(
            ".checkout-paso"
        )
        .forEach(
            function(elemento) {

                if (
                    Number(
                        elemento.getAttribute(
                            "data-paso"
                        )
                    ) <= numero
                ) {

                    elemento.classList.add(
                        "activo"
                    );

                }

            }
        );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



function actualizarMetodoPago() {

    const metodo =
        obtenerMetodoPago();


    document
        .querySelectorAll(
            ".detalle-metodo"
        )
        .forEach(
            function(elemento) {

                elemento.classList.remove(
                    "activo"
                );

            }
        );


    const panel =
        document.getElementById(
            "pago-" +
            metodo
        );


    if (panel) {

        panel.classList.add(
            "activo"
        );

    }

}



function mostrarResumenConfirmacion() {

    const contenedor =
        document.getElementById(
            "resumen-confirmacion"
        );


    if (!contenedor) {

        return;

    }


    const carrito =
        obtenerCarritoBloque4();


    const totales =
        obtenerTotalesBloque4();


    const datos =
        obtenerDatosDireccion();


    const metodo =
        obtenerMetodoPago();


    let productosHTML =
        "";


    carrito.forEach(
        function(producto) {

            productosHTML += `

                <div class="resumen-producto">

                    <span>
                        ${producto.nombre}
                    </span>

                    <strong>
                        $${Number(producto.precio).toLocaleString("es-MX")}
                    </strong>

                </div>

            `;

        }
    );


    let descuentoHTML =
        "";


    if (
        totales.descuento > 0
    ) {

        descuentoHTML = `

            <div class="resumen-producto descuento-verde">

                <span>
                    Descuento ${totales.codigo}
                </span>

                <strong>
                    -$${totales.descuento.toLocaleString(
                        "es-MX",
                        {
                            maximumFractionDigits:
                                2
                        }
                    )}
                </strong>

            </div>

        `;

    }


    contenedor.innerHTML = `

        <div class="confirmacion-bloque">

            <h3>
                Entrega
            </h3>

            <p>
                ${datos.nombre}
            </p>

            <p>
                ${datos.direccion}
            </p>

            <p>
                ${datos.ciudad}
            </p>

            <p>
                ${datos.telefono}
            </p>

        </div>


        <div class="confirmacion-bloque">

            <h3>
                Pago
            </h3>

            <p>
                ${nombreMetodoPago(metodo)}
            </p>

        </div>


        <div class="confirmacion-bloque">

            <h3>
                Servicios
            </h3>

            ${productosHTML}

            <div class="resumen-producto">

                <span>
                    Subtotal
                </span>

                <strong>
                    $${totales.subtotal.toLocaleString("es-MX")}
                </strong>

            </div>

            ${descuentoHTML}

            <div class="resumen-producto resumen-final">

                <span>
                    Total
                </span>

                <strong>
                    $${totales.total.toLocaleString(
                        "es-MX",
                        {
                            maximumFractionDigits:
                                2
                        }
                    )}
                </strong>

            </div>

        </div>

    `;

}



function generarFolio() {

    return (
        "PED-" +
        Date.now()
            .toString()
            .slice(-7)
    );

}



function registrarCompra() {

    const carrito =
        obtenerCarritoBloque4();


    if (
        carrito.length === 0
    ) {

        mostrarAvisoBloque4(
            "No hay servicios en el carrito.",
            "error"
        );


        return;

    }


    const totales =
        obtenerTotalesBloque4();


    const pedido = {

        id:
            generarFolio(),

        fecha:
            new Date()
                .toLocaleString(
                    "es-MX"
                ),

        cliente:
            obtenerDatosDireccion(),

        metodoPago:
            nombreMetodoPago(
                obtenerMetodoPago()
            ),

        productos:
            carrito,

        subtotal:
            totales.subtotal,

        descuento:
            totales.descuento,

        codigo:
            totales.codigo,

        total:
            totales.total,

        estado:
            "Pago aprobado"

    };


    let historial =
        JSON.parse(
            localStorage.getItem(
                "historialCompras"
            )
        ) || [];


    historial.unshift(
        pedido
    );


    localStorage.setItem(
        "historialCompras",
        JSON.stringify(historial)
    );


    localStorage.setItem(
        "ultimoPedido",
        JSON.stringify(pedido)
    );


    localStorage.setItem(
        "carrito",
        JSON.stringify([])
    );


    localStorage.removeItem(
        "codigoPromocion"
    );


    mostrarAvisoBloque4(
        "Pago aprobado correctamente.",
        "exito"
    );


    setTimeout(
        function() {

            window.location.href =
                "confirmacion.html";

        },
        500
    );

}



/* checkout */

const continuarDireccion =
    document.getElementById(
        "continuar-direccion"
    );


if (continuarDireccion) {

    const carrito =
        obtenerCarritoBloque4();


    if (
        carrito.length === 0
    ) {

        const vacio =
            document.getElementById(
                "checkout-vacio"
            );


        vacio.innerHTML = `

            <div class="checkout-vacio">

                <h2>
                    Tu carrito está vacío
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


        document
            .querySelectorAll(
                ".checkout-contenido"
            )
            .forEach(
                function(elemento) {

                    elemento.style.display =
                        "none";

                }
            );


        document.querySelector(
            ".checkout-pasos"
        ).style.display =
            "none";

    }


    continuarDireccion.addEventListener(
        "click",
        function() {

            mostrarPasoCheckout(
                2
            );


            mostrarAvisoBloque4(
                "Datos guardados. Selecciona el método de pago.",
                "exito"
            );

        }
    );

}



document
    .querySelectorAll(
        'input[name="metodo-pago"]'
    )
    .forEach(
        function(elemento) {

            elemento.addEventListener(
                "change",
                actualizarMetodoPago
            );

        }
    );


actualizarMetodoPago();



const volverDireccion =
    document.getElementById(
        "volver-direccion"
    );


if (volverDireccion) {

    volverDireccion.addEventListener(
        "click",
        function() {

            mostrarPasoCheckout(
                1
            );

        }
    );

}



const continuarPago =
    document.getElementById(
        "continuar-pago"
    );


if (continuarPago) {

    continuarPago.addEventListener(
        "click",
        function() {

            mostrarResumenConfirmacion();


            mostrarPasoCheckout(
                3
            );


            mostrarAvisoBloque4(
                "Revisa tu pedido antes de pagar.",
                "exito"
            );

        }
    );

}



const volverPago =
    document.getElementById(
        "volver-pago"
    );


if (volverPago) {

    volverPago.addEventListener(
        "click",
        function() {

            mostrarPasoCheckout(
                2
            );

        }
    );

}



const pagarCompra =
    document.getElementById(
        "pagar-compra"
    );


if (pagarCompra) {

    pagarCompra.addEventListener(
        "click",
        registrarCompra
    );

}



/* confirmacion */

function mostrarConfirmacionCompra() {

    const contenedor =
        document.getElementById(
            "confirmacion-pedido"
        );


    if (!contenedor) {

        return;

    }


    const pedido =
        JSON.parse(
            localStorage.getItem(
                "ultimoPedido"
            )
        );


    if (!pedido) {

        contenedor.innerHTML = `

            <p>
                No hay una compra reciente.
            </p>

        `;


        return;

    }


    contenedor.innerHTML = `

        <div class="confirmacion-dato">

            <span>
                Número de pedido
            </span>

            <strong>
                ${pedido.id}
            </strong>

        </div>


        <div class="confirmacion-dato">

            <span>
                Método de pago
            </span>

            <strong>
                ${pedido.metodoPago}
            </strong>

        </div>


        <div class="confirmacion-dato">

            <span>
                Total pagado
            </span>

            <strong>
                $${Number(pedido.total).toLocaleString(
                    "es-MX",
                    {
                        maximumFractionDigits:
                            2
                    }
                )}
            </strong>

        </div>

    `;


    const enlace =
        document.getElementById(
            "ver-ticket-confirmacion"
        );


    if (enlace) {

        enlace.href =
            "ticket.html?id=" +
            encodeURIComponent(
                pedido.id
            );

    }

}


mostrarConfirmacionCompra();



/* historial */

function mostrarHistorialCompras() {

    const contenedor =
        document.getElementById(
            "historial-compras"
        );


    if (!contenedor) {

        return;

    }


    const historial =
        JSON.parse(
            localStorage.getItem(
                "historialCompras"
            )
        ) || [];


    contenedor.innerHTML =
        "";


    if (
        historial.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="historial-vacio">

                <h2>
                    Todavía no tienes compras
                </h2>

                <p>
                    Tus pedidos aparecerán aquí
                    después de completar una compra.
                </p>

                <a
                    href="catalogo.html"
                    class="boton boton-principal"
                >
                    Ver catálogo
                </a>

            </div>

        `;


        return;

    }


    historial.forEach(
        function(pedido) {

            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "historial-pedido";


            tarjeta.innerHTML = `

                <div>

                    <span class="pedido-estado">
                        ${pedido.estado}
                    </span>

                    <h2>
                        ${pedido.id}
                    </h2>

                    <p>
                        ${pedido.fecha}
                    </p>

                    <p>
                        ${pedido.productos.length}
                        servicio(s)
                    </p>

                </div>


                <div class="historial-pedido-derecha">

                    <strong>
                        $${Number(pedido.total).toLocaleString(
                            "es-MX",
                            {
                                maximumFractionDigits:
                                    2
                            }
                        )}
                    </strong>

                    <a
                        href="ticket.html?id=${encodeURIComponent(pedido.id)}"
                        class="boton boton-secundario"
                    >
                        Ver comprobante
                    </a>

                </div>

            `;


            contenedor.appendChild(
                tarjeta
            );

        }
    );

}


mostrarHistorialCompras();



/* ticket */

function obtenerPedidoTicket() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const id =
        parametros.get(
            "id"
        );


    const historial =
        JSON.parse(
            localStorage.getItem(
                "historialCompras"
            )
        ) || [];


    if (id) {

        const encontrado =
            historial.find(
                function(pedido) {

                    return (
                        String(pedido.id) ===
                        String(id)
                    );

                }
            );


        if (encontrado) {

            return encontrado;

        }

    }


    return JSON.parse(
        localStorage.getItem(
            "ultimoPedido"
        )
    );

}



function mostrarTicket() {

    const contenedor =
        document.getElementById(
            "ticket-compra"
        );


    if (!contenedor) {

        return;

    }


    const pedido =
        obtenerPedidoTicket();


    if (!pedido) {

        contenedor.innerHTML = `

            <h2>
                Comprobante no disponible
            </h2>

        `;


        return;

    }


    let productosHTML =
        "";


    pedido.productos.forEach(
        function(producto) {

            productosHTML += `

                <div class="ticket-linea">

                    <span>
                        ${producto.nombre}
                    </span>

                    <strong>
                        $${Number(producto.precio).toLocaleString("es-MX")}
                    </strong>

                </div>

            `;

        }
    );


    let descuentoHTML =
        "";


    if (
        Number(pedido.descuento) > 0
    ) {

        descuentoHTML = `

            <div class="ticket-linea descuento-verde">

                <span>
                    Descuento ${pedido.codigo}
                </span>

                <strong>
                    -$${Number(pedido.descuento).toLocaleString(
                        "es-MX",
                        {
                            maximumFractionDigits:
                                2
                        }
                    )}
                </strong>

            </div>

        `;

    }


    contenedor.innerHTML = `

        <div class="ticket-cabecera">

            <h1>
                DR. CHULO
            </h1>

            <p>
                Detallado Automotriz
            </p>

            <p>
                Aguascalientes
            </p>

        </div>


        <div class="ticket-seccion">

            <div class="ticket-linea">

                <span>
                    Folio
                </span>

                <strong>
                    ${pedido.id}
                </strong>

            </div>


            <div class="ticket-linea">

                <span>
                    Fecha
                </span>

                <strong>
                    ${pedido.fecha}
                </strong>

            </div>


            <div class="ticket-linea">

                <span>
                    Estado
                </span>

                <strong>
                    ${pedido.estado}
                </strong>

            </div>

        </div>


        <div class="ticket-seccion">

            <h3>
                Cliente
            </h3>

            <p>
                ${pedido.cliente.nombre}
            </p>

            <p>
                ${pedido.cliente.direccion}
            </p>

            <p>
                ${pedido.cliente.ciudad}
            </p>

            <p>
                ${pedido.cliente.telefono}
            </p>

        </div>


        <div class="ticket-seccion">

            <h3>
                Servicios
            </h3>

            ${productosHTML}

        </div>


        <div class="ticket-seccion">

            <div class="ticket-linea">

                <span>
                    Subtotal
                </span>

                <strong>
                    $${Number(pedido.subtotal).toLocaleString("es-MX")}
                </strong>

            </div>

            ${descuentoHTML}


            <div class="ticket-linea ticket-total">

                <span>
                    TOTAL
                </span>

                <strong>
                    $${Number(pedido.total).toLocaleString(
                        "es-MX",
                        {
                            maximumFractionDigits:
                                2
                        }
                    )}
                </strong>

            </div>

        </div>


        <div class="ticket-seccion">

            <div class="ticket-linea">

                <span>
                    Método de pago
                </span>

                <strong>
                    ${pedido.metodoPago}
                </strong>

            </div>

        </div>


        <div class="ticket-gracias">

            <p>
                Gracias por elegir Dr. Chulo.
            </p>

        </div>

    `;

}


mostrarTicket();



const imprimirTicket =
    document.getElementById(
        "imprimir-ticket"
    );


if (imprimirTicket) {

    imprimirTicket.addEventListener(
        "click",
        function() {

            mostrarAvisoBloque4(
                "Selecciona Guardar como PDF en la ventana de impresión.",
                "exito"
            );


            setTimeout(
                function() {

                    window.print();

                },
                400
            );

        }
    );

}