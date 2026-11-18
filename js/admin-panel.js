/* mensajes */

function mostrarMensajeAdmin(
    texto
) {

    let aviso =
        document.getElementById(
            "aviso-admin-general"
        );


    if (!aviso) {

        aviso =
            document.createElement(
                "div"
            );


        aviso.id =
            "aviso-admin-general";


        aviso.className =
            "aviso-admin-general";


        document.body.appendChild(
            aviso
        );

    }


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



/* =========================
   PRODUCTOS
========================= */

function obtenerProductosPanel() {

    return (
        JSON.parse(
            localStorage.getItem(
                "productosAdmin"
            )
        ) || []
    );

}



/* =========================
   PEDIDOS
========================= */

const pedidosInicialesAdmin = [

    {
        id: "0015",
        cliente: "Carlos",
        telefono: "",
        servicios: "Paquete Clásico",
        total: 250,
        metodoPago: "Efectivo",
        estado: "Pendiente",
        fecha: "06/11/2026"
    },

    {
        id: "0014",
        cliente: "Gustavo",
        telefono: "",
        servicios: "Interior Completo",
        total: 1200,
        metodoPago: "Transferencia bancaria",
        estado: "En proceso",
        fecha: "05/11/2026"
    },

    {
        id: "0013",
        cliente: "Jordi",
        telefono: "",
        servicios: "Restauración de faros",
        total: 450,
        metodoPago: "Tarjeta",
        estado: "Terminado",
        fecha: "04/11/2026"
    },

    {
        id: "0012",
        cliente: "Andrea",
        telefono: "",
        servicios: "Descontaminación de vidrios",
        total: 350,
        metodoPago: "Efectivo",
        estado: "Terminado",
        fecha: "03/11/2026"
    },

    {
        id: "0011",
        cliente: "Miguel",
        telefono: "",
        servicios: "Nano Ceramic",
        total: 3300,
        metodoPago: "Transferencia bancaria",
        estado: "Terminado",
        fecha: "02/11/2026"
    }

];



function convertirPedidoCheckout(
    pedido
) {

    let servicios =
        "";


    if (
        pedido.productos &&
        pedido.productos.length > 0
    ) {

        servicios =
            pedido.productos
                .map(
                    function(producto) {

                        return producto.nombre;

                    }
                )
                .join(", ");

    }


    return {

        id:
            pedido.id,

        cliente:
            pedido.cliente
                ? pedido.cliente.nombre
                : "Usuario",

        telefono:
            pedido.cliente
                ? pedido.cliente.telefono
                : "",

        servicios:
            servicios,

        total:
            Number(
                pedido.total
            ) || 0,

        metodoPago:
            pedido.metodoPago ||
            "Tarjeta",

        estado:
            pedido.estado ||
            "Pago aprobado",

        fecha:
            pedido.fecha ||
            ""

    };

}



function obtenerPedidosAdmin() {

    let pedidos =
        JSON.parse(
            localStorage.getItem(
                "pedidosAdmin"
            )
        );


    if (!pedidos) {

        pedidos =
            pedidosInicialesAdmin;

    }


    const historial =
        JSON.parse(
            localStorage.getItem(
                "historialCompras"
            )
        ) || [];


    historial.forEach(
        function(pedidoCheckout) {

            const existe =
                pedidos.some(
                    function(pedidoAdmin) {

                        return (
                            String(
                                pedidoAdmin.id
                            ) ===
                            String(
                                pedidoCheckout.id
                            )
                        );

                    }
                );


            if (!existe) {

                pedidos.unshift(
                    convertirPedidoCheckout(
                        pedidoCheckout
                    )
                );

            }

        }
    );


    guardarPedidosAdmin(
        pedidos
    );


    return pedidos;

}



function guardarPedidosAdmin(
    pedidos
) {

    localStorage.setItem(
        "pedidosAdmin",
        JSON.stringify(pedidos)
    );

}



function sincronizarPedidoHistorial(
    pedido
) {

    const historial =
        JSON.parse(
            localStorage.getItem(
                "historialCompras"
            )
        ) || [];


    const encontrado =
        historial.find(
            function(elemento) {

                return (
                    String(elemento.id) ===
                    String(pedido.id)
                );

            }
        );


    if (!encontrado) {

        return;

    }


    encontrado.estado =
        pedido.estado;


    encontrado.total =
        Number(
            pedido.total
        );


    encontrado.metodoPago =
        pedido.metodoPago;


    if (
        encontrado.cliente
    ) {

        encontrado.cliente.nombre =
            pedido.cliente;


        encontrado.cliente.telefono =
            pedido.telefono;

    }


    localStorage.setItem(
        "historialCompras",
        JSON.stringify(historial)
    );

}



function mostrarPedidosAdmin() {

    const tabla =
        document.getElementById(
            "admin-tabla-pedidos"
        );


    if (!tabla) {

        return;

    }


    const pedidos =
        obtenerPedidosAdmin();


    tabla.innerHTML =
        "";


    pedidos.forEach(
        function(pedido) {

            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>
                    ${pedido.id}
                </td>

                <td>
                    ${pedido.cliente}
                </td>

                <td>
                    ${pedido.servicios}
                </td>

                <td>
                    $${Number(pedido.total).toLocaleString("es-MX")}
                </td>

                <td>
                    ${pedido.metodoPago}
                </td>

                <td>

                    <span class="estado-admin">
                        ${pedido.estado}
                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="admin-editar editar-pedido-admin"
                        data-id="${pedido.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="admin-eliminar eliminar-pedido-admin"
                        data-id="${pedido.id}"
                    >
                        Eliminar
                    </button>

                </td>

            `;


            tabla.appendChild(
                fila
            );

        }
    );


    activarAccionesPedidos();

}



function abrirFormularioPedido() {

    const formulario =
        document.getElementById(
            "admin-formulario-pedido"
        );


    if (formulario) {

        formulario.classList.add(
            "mostrar"
        );


        formulario.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }

}



function cerrarFormularioPedido() {

    const contenedor =
        document.getElementById(
            "admin-formulario-pedido"
        );


    const formulario =
        document.getElementById(
            "admin-pedido-form"
        );


    if (contenedor) {

        contenedor.classList.remove(
            "mostrar"
        );

    }


    if (formulario) {

        formulario.reset();

    }


    const id =
        document.getElementById(
            "admin-pedido-id"
        );


    if (id) {

        id.value =
            "";

    }


    const titulo =
        document.getElementById(
            "admin-titulo-pedido"
        );


    if (titulo) {

        titulo.textContent =
            "Agregar pedido";

    }

}



const nuevoPedido =
    document.getElementById(
        "admin-nuevo-pedido"
    );


if (nuevoPedido) {

    nuevoPedido.addEventListener(
        "click",
        function() {

            cerrarFormularioPedido();

            abrirFormularioPedido();

        }
    );

}



const cancelarPedido =
    document.getElementById(
        "admin-cancelar-pedido"
    );


if (cancelarPedido) {

    cancelarPedido.addEventListener(
        "click",
        function() {

            cerrarFormularioPedido();


            mostrarMensajeAdmin(
                "Edición cancelada."
            );

        }
    );

}



function activarAccionesPedidos() {

    document
        .querySelectorAll(
            ".editar-pedido-admin"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        const id =
                            boton.getAttribute(
                                "data-id"
                            );


                        const pedidos =
                            obtenerPedidosAdmin();


                        const pedido =
                            pedidos.find(
                                function(elemento) {

                                    return (
                                        String(elemento.id) ===
                                        String(id)
                                    );

                                }
                            );


                        if (!pedido) {

                            return;

                        }


                        document.getElementById(
                            "admin-pedido-id"
                        ).value =
                            pedido.id;


                        document.getElementById(
                            "admin-pedido-cliente"
                        ).value =
                            pedido.cliente;


                        document.getElementById(
                            "admin-pedido-telefono"
                        ).value =
                            pedido.telefono;


                        document.getElementById(
                            "admin-pedido-servicios"
                        ).value =
                            pedido.servicios;


                        document.getElementById(
                            "admin-pedido-total"
                        ).value =
                            pedido.total;


                        document.getElementById(
                            "admin-pedido-pago"
                        ).value =
                            pedido.metodoPago;


                        document.getElementById(
                            "admin-pedido-estado"
                        ).value =
                            pedido.estado;


                        document.getElementById(
                            "admin-pedido-fecha"
                        ).value =
                            pedido.fecha;


                        document.getElementById(
                            "admin-titulo-pedido"
                        ).textContent =
                            "Editar pedido";


                        abrirFormularioPedido();

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".eliminar-pedido-admin"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        const id =
                            boton.getAttribute(
                                "data-id"
                            );


                        let pedidos =
                            obtenerPedidosAdmin();


                        pedidos =
                            pedidos.filter(
                                function(pedido) {

                                    return (
                                        String(pedido.id) !==
                                        String(id)
                                    );

                                }
                            );


                        guardarPedidosAdmin(
                            pedidos
                        );


                        mostrarPedidosAdmin();


                        mostrarMensajeAdmin(
                            "Pedido eliminado correctamente."
                        );

                    }
                );

            }
        );

}



const formularioPedido =
    document.getElementById(
        "admin-pedido-form"
    );


if (formularioPedido) {

    formularioPedido.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            let pedidos =
                obtenerPedidosAdmin();


            const idActual =
                document.getElementById(
                    "admin-pedido-id"
                ).value;


            const datos = {

                cliente:
                    document.getElementById(
                        "admin-pedido-cliente"
                    ).value,

                telefono:
                    document.getElementById(
                        "admin-pedido-telefono"
                    ).value,

                servicios:
                    document.getElementById(
                        "admin-pedido-servicios"
                    ).value,

                total:
                    Number(
                        document.getElementById(
                            "admin-pedido-total"
                        ).value
                    ),

                metodoPago:
                    document.getElementById(
                        "admin-pedido-pago"
                    ).value,

                estado:
                    document.getElementById(
                        "admin-pedido-estado"
                    ).value,

                fecha:
                    document.getElementById(
                        "admin-pedido-fecha"
                    ).value

            };


            if (idActual) {

                const pedido =
                    pedidos.find(
                        function(elemento) {

                            return (
                                String(elemento.id) ===
                                String(idActual)
                            );

                        }
                    );


                if (pedido) {

                    pedido.cliente =
                        datos.cliente;

                    pedido.telefono =
                        datos.telefono;

                    pedido.servicios =
                        datos.servicios;

                    pedido.total =
                        datos.total;

                    pedido.metodoPago =
                        datos.metodoPago;

                    pedido.estado =
                        datos.estado;

                    pedido.fecha =
                        datos.fecha;


                    sincronizarPedidoHistorial(
                        pedido
                    );

                }


                mostrarMensajeAdmin(
                    "Pedido actualizado correctamente."
                );

            } else {

                pedidos.unshift({

                    id:
                        "PED-" +
                        Date.now()
                            .toString()
                            .slice(-6),

                    cliente:
                        datos.cliente,

                    telefono:
                        datos.telefono,

                    servicios:
                        datos.servicios,

                    total:
                        datos.total,

                    metodoPago:
                        datos.metodoPago,

                    estado:
                        datos.estado,

                    fecha:
                        datos.fecha

                });


                mostrarMensajeAdmin(
                    "Pedido agregado correctamente."
                );

            }


            guardarPedidosAdmin(
                pedidos
            );


            cerrarFormularioPedido();


            mostrarPedidosAdmin();

        }
    );

}


mostrarPedidosAdmin();



/* =========================
   PROMOCIONES
========================= */

const promocionesInicialesAdmin = [

    {
        id: 1,
        nombre: "10% en tu compra",
        codigo: "CHULO10",
        descripcion:
            "Obtén 10% de descuento en el total de tu compra.",
        tipo: "porcentaje",
        valor: 10,
        aplicaA: "todos",
        activa: true
    },

    {
        id: 2,
        nombre: "15% en Interior Completo",
        codigo: "INTERIOR15",
        descripcion:
            "Obtén 15% de descuento en Interior Completo.",
        tipo: "porcentaje",
        valor: 15,
        aplicaA: "interior",
        activa: true
    },

    {
        id: 3,
        nombre: "$50 en Restauración de faros",
        codigo: "FAROS50",
        descripcion:
            "Obtén $50 de descuento en Restauración de faros.",
        tipo: "fijo",
        valor: 50,
        aplicaA: "faros",
        activa: true
    }

];



function obtenerPromocionesAdminPanel() {

    let promociones =
        JSON.parse(
            localStorage.getItem(
                "promocionesAdmin"
            )
        );


    if (!promociones) {

        promociones =
            promocionesInicialesAdmin;


        guardarPromocionesAdminPanel(
            promociones
        );

    }


    return promociones;

}



function guardarPromocionesAdminPanel(
    promociones
) {

    localStorage.setItem(
        "promocionesAdmin",
        JSON.stringify(promociones)
    );

}



function mostrarPromocionesAdmin() {

    const tabla =
        document.getElementById(
            "admin-tabla-promociones"
        );


    if (!tabla) {

        return;

    }


    const promociones =
        obtenerPromocionesAdminPanel();


    tabla.innerHTML =
        "";


    promociones.forEach(
        function(promocion) {

            const fila =
                document.createElement(
                    "tr"
                );


            let descuento =
                promocion.valor +
                "%";


            if (
                promocion.tipo ===
                "fijo"
            ) {

                descuento =
                    "$" +
                    promocion.valor;

            }


            fila.innerHTML = `

                <td>
                    ${promocion.nombre}
                </td>

                <td>
                    <strong>
                        ${promocion.codigo}
                    </strong>
                </td>

                <td>
                    ${descuento}
                </td>

                <td>
                    ${promocion.aplicaA}
                </td>

                <td>

                    <span
                        class="estado-admin ${
                            promocion.activa
                                ? "estado-activo"
                                : "estado-inactivo"
                        }"
                    >
                        ${
                            promocion.activa
                                ? "Activa"
                                : "Inactiva"
                        }
                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="admin-editar editar-promocion-admin"
                        data-id="${promocion.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="admin-eliminar eliminar-promocion-admin"
                        data-id="${promocion.id}"
                    >
                        Eliminar
                    </button>

                </td>

            `;


            tabla.appendChild(
                fila
            );

        }
    );


    activarAccionesPromociones();

}



function abrirFormularioPromocion() {

    const formulario =
        document.getElementById(
            "admin-formulario-promocion"
        );


    if (formulario) {

        formulario.classList.add(
            "mostrar"
        );


        formulario.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }

}



function cerrarFormularioPromocion() {

    const contenedor =
        document.getElementById(
            "admin-formulario-promocion"
        );


    const formulario =
        document.getElementById(
            "admin-promocion-form"
        );


    if (contenedor) {

        contenedor.classList.remove(
            "mostrar"
        );

    }


    if (formulario) {

        formulario.reset();

    }


    const id =
        document.getElementById(
            "admin-promocion-id"
        );


    if (id) {

        id.value =
            "";

    }


    const titulo =
        document.getElementById(
            "admin-titulo-promocion"
        );


    if (titulo) {

        titulo.textContent =
            "Agregar promoción";

    }

}



const nuevaPromocion =
    document.getElementById(
        "admin-nueva-promocion"
    );


if (nuevaPromocion) {

    nuevaPromocion.addEventListener(
        "click",
        function() {

            cerrarFormularioPromocion();

            abrirFormularioPromocion();

        }
    );

}



const cancelarPromocion =
    document.getElementById(
        "admin-cancelar-promocion"
    );


if (cancelarPromocion) {

    cancelarPromocion.addEventListener(
        "click",
        function() {

            cerrarFormularioPromocion();


            mostrarMensajeAdmin(
                "Edición cancelada."
            );

        }
    );

}



function activarAccionesPromociones() {

    document
        .querySelectorAll(
            ".editar-promocion-admin"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        const id =
                            boton.getAttribute(
                                "data-id"
                            );


                        const promociones =
                            obtenerPromocionesAdminPanel();


                        const promocion =
                            promociones.find(
                                function(elemento) {

                                    return (
                                        String(elemento.id) ===
                                        String(id)
                                    );

                                }
                            );


                        if (!promocion) {

                            return;

                        }


                        document.getElementById(
                            "admin-promocion-id"
                        ).value =
                            promocion.id;


                        document.getElementById(
                            "admin-promocion-nombre"
                        ).value =
                            promocion.nombre;


                        document.getElementById(
                            "admin-promocion-codigo"
                        ).value =
                            promocion.codigo;


                        document.getElementById(
                            "admin-promocion-descripcion"
                        ).value =
                            promocion.descripcion;


                        document.getElementById(
                            "admin-promocion-tipo"
                        ).value =
                            promocion.tipo;


                        document.getElementById(
                            "admin-promocion-valor"
                        ).value =
                            promocion.valor;


                        document.getElementById(
                            "admin-promocion-aplica"
                        ).value =
                            promocion.aplicaA;


                        document.getElementById(
                            "admin-promocion-estado"
                        ).value =
                            String(
                                promocion.activa
                            );


                        document.getElementById(
                            "admin-titulo-promocion"
                        ).textContent =
                            "Editar promoción";


                        abrirFormularioPromocion();

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".eliminar-promocion-admin"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        const id =
                            boton.getAttribute(
                                "data-id"
                            );


                        let promociones =
                            obtenerPromocionesAdminPanel();


                        promociones =
                            promociones.filter(
                                function(promocion) {

                                    return (
                                        String(promocion.id) !==
                                        String(id)
                                    );

                                }
                            );


                        guardarPromocionesAdminPanel(
                            promociones
                        );


                        mostrarPromocionesAdmin();


                        mostrarMensajeAdmin(
                            "Promoción eliminada correctamente."
                        );

                    }
                );

            }
        );

}



const formularioPromocion =
    document.getElementById(
        "admin-promocion-form"
    );


if (formularioPromocion) {

    formularioPromocion.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            let promociones =
                obtenerPromocionesAdminPanel();


            const idActual =
                document.getElementById(
                    "admin-promocion-id"
                ).value;


            const datos = {

                nombre:
                    document.getElementById(
                        "admin-promocion-nombre"
                    ).value,

                codigo:
                    document.getElementById(
                        "admin-promocion-codigo"
                    ).value
                        .trim()
                        .toUpperCase(),

                descripcion:
                    document.getElementById(
                        "admin-promocion-descripcion"
                    ).value,

                tipo:
                    document.getElementById(
                        "admin-promocion-tipo"
                    ).value,

                valor:
                    Number(
                        document.getElementById(
                            "admin-promocion-valor"
                        ).value
                    ),

                aplicaA:
                    document.getElementById(
                        "admin-promocion-aplica"
                    ).value
                        .trim()
                        .toLowerCase(),

                activa:
                    document.getElementById(
                        "admin-promocion-estado"
                    ).value ===
                    "true"

            };


            if (idActual) {

                const promocion =
                    promociones.find(
                        function(elemento) {

                            return (
                                String(elemento.id) ===
                                String(idActual)
                            );

                        }
                    );


                if (promocion) {

                    promocion.nombre =
                        datos.nombre;

                    promocion.codigo =
                        datos.codigo;

                    promocion.descripcion =
                        datos.descripcion;

                    promocion.tipo =
                        datos.tipo;

                    promocion.valor =
                        datos.valor;

                    promocion.aplicaA =
                        datos.aplicaA;

                    promocion.activa =
                        datos.activa;

                }


                mostrarMensajeAdmin(
                    "Promoción actualizada correctamente."
                );

            } else {

                promociones.unshift({

                    id:
                        Date.now(),

                    nombre:
                        datos.nombre,

                    codigo:
                        datos.codigo,

                    descripcion:
                        datos.descripcion,

                    tipo:
                        datos.tipo,

                    valor:
                        datos.valor,

                    aplicaA:
                        datos.aplicaA,

                    activa:
                        datos.activa

                });


                mostrarMensajeAdmin(
                    "Promoción agregada correctamente."
                );

            }


            guardarPromocionesAdminPanel(
                promociones
            );


            cerrarFormularioPromocion();


            mostrarPromocionesAdmin();

        }
    );

}


mostrarPromocionesAdmin();



/* =========================
   DASHBOARD
========================= */

function actualizarResumenAdmin() {

    const productos =
        obtenerProductosPanel();


    const pedidos =
        obtenerPedidosAdmin();


    const promociones =
        obtenerPromocionesAdminPanel();


    const promocionesActivas =
        promociones.filter(
            function(promocion) {

                return promocion.activa;

            }
        );


    const totalProductos =
        document.getElementById(
            "admin-total-productos"
        );


    const totalPedidos =
        document.getElementById(
            "admin-total-pedidos"
        );


    const totalPromociones =
        document.getElementById(
            "admin-total-promociones"
        );


    const totalCupones =
        document.getElementById(
            "admin-total-cupones"
        );


    if (totalProductos) {

        totalProductos.textContent =
            productos.length;

    }


    if (totalPedidos) {

        totalPedidos.textContent =
            pedidos.length;

    }


    if (totalPromociones) {

        totalPromociones.textContent =
            promociones.length;

    }


    if (totalCupones) {

        totalCupones.textContent =
            promocionesActivas.length;

    }

}



function mostrarPedidosRecientes() {

    const contenedor =
        document.getElementById(
            "admin-pedidos-recientes"
        );


    if (!contenedor) {

        return;

    }


    const pedidos =
        obtenerPedidosAdmin()
            .slice(
                0,
                5
            );


    if (
        pedidos.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="admin-vacio">
                No hay pedidos registrados.
            </div>

        `;


        return;

    }


    let filas =
        "";


    pedidos.forEach(
        function(pedido) {

            filas += `

                <tr>

                    <td>
                        ${pedido.id}
                    </td>

                    <td>
                        ${pedido.cliente}
                    </td>

                    <td>
                        ${pedido.estado}
                    </td>

                    <td>
                        $${Number(pedido.total).toLocaleString("es-MX")}
                    </td>

                </tr>

            `;

        }
    );


    contenedor.innerHTML = `

        <table class="admin-tabla">

            <thead>

                <tr>

                    <th>
                        Pedido
                    </th>

                    <th>
                        Cliente
                    </th>

                    <th>
                        Estado
                    </th>

                    <th>
                        Total
                    </th>

                </tr>

            </thead>

            <tbody>
                ${filas}
            </tbody>

        </table>

    `;

}


actualizarResumenAdmin();

mostrarPedidosRecientes();