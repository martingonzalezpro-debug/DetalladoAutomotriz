/* productos iniciales */

const productosIniciales = [

    {
        id: 1,
        nombre: "Paquete Clásico",
        categoria: "Lavado",
        precio: 250,
        etiqueta: "Popular",
        descripcion:
            "Lavado exterior, aspirado interior y limpieza básica."
    },

    {
        id: 2,
        nombre: "Paquete Interior Completo",
        categoria: "Interior",
        precio: 1200,
        etiqueta: "",
        descripcion:
            "Limpieza profunda de asientos, alfombras y plásticos."
    },

    {
        id: 3,
        nombre: "Exterior Completo - Cera Soft99",
        categoria: "Exterior",
        precio: 1600,
        etiqueta: "",
        descripcion:
            "Descontaminación, pulido y protección exterior."
    },

    {
        id: 4,
        nombre: "Nano Ceramic",
        categoria: "Exterior",
        precio: 3300,
        etiqueta: "Nuevo",
        descripcion:
            "Protección cerámica con duración aproximada de dos años."
    },

    {
        id: 5,
        nombre: "Graphene Ceramic",
        categoria: "Exterior",
        precio: 5200,
        etiqueta: "Premium",
        descripcion:
            "Protección exterior con recubrimiento de grafeno."
    },

    {
        id: 6,
        nombre: "Restauración de faros",
        categoria: "Restauración",
        precio: 450,
        etiqueta: "Oferta",
        descripcion:
            "Recuperación de transparencia y brillo en los faros."
    },

    {
        id: 7,
        nombre: "Descontaminación de vidrios",
        categoria: "Restauración",
        precio: 350,
        etiqueta: "",
        descripcion:
            "Eliminación de minerales y contaminación adherida."
    },

    {
        id: 8,
        nombre: "Pulido de clúster",
        categoria: "Restauración",
        precio: 300,
        etiqueta: "",
        descripcion:
            "Pulido para reducir marcas y recuperar claridad."
    }

];


function obtenerProductosAdmin() {

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


function guardarProductosAdmin(productos) {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );

}



/* total del panel */

const totalProductos =
    document.getElementById(
        "total-productos"
    );


if (totalProductos) {

    totalProductos.textContent =
        obtenerProductosAdmin().length;

}



/* gestion */

const tablaProductos =
    document.getElementById(
        "tabla-productos"
    );


const formularioContenedor =
    document.getElementById(
        "formulario-producto-contenedor"
    );


const formularioProducto =
    document.getElementById(
        "formulario-producto"
    );


const botonAbrirFormulario =
    document.getElementById(
        "abrir-formulario-producto"
    );


const botonCerrarFormulario =
    document.getElementById(
        "cerrar-formulario-producto"
    );


const botonCancelar =
    document.getElementById(
        "cancelar-producto"
    );


function mostrarFormulario() {

    if (formularioContenedor) {

        formularioContenedor.classList.add(
            "mostrar"
        );

    }

}


function ocultarFormulario() {

    if (formularioContenedor) {

        formularioContenedor.classList.remove(
            "mostrar"
        );

    }


    if (formularioProducto) {

        formularioProducto.reset();

    }


    const campoId =
        document.getElementById(
            "producto-id"
        );


    if (campoId) {

        campoId.value = "";

    }


    const titulo =
        document.getElementById(
            "titulo-formulario-producto"
        );


    if (titulo) {

        titulo.textContent =
            "Agregar producto";

    }

}


if (botonAbrirFormulario) {

    botonAbrirFormulario.addEventListener(
        "click",
        function() {

            ocultarFormulario();

            mostrarFormulario();

        }
    );

}


if (botonCerrarFormulario) {

    botonCerrarFormulario.addEventListener(
        "click",
        ocultarFormulario
    );

}


if (botonCancelar) {

    botonCancelar.addEventListener(
        "click",
        ocultarFormulario
    );

}



/* mostrar productos */

function mostrarProductosAdmin() {

    if (!tablaProductos) {

        return;

    }


    const productos =
        obtenerProductosAdmin();


    tablaProductos.innerHTML = "";


    productos.forEach(
        function(producto) {

            const fila =
                document.createElement(
                    "tr"
                );


            let etiqueta =
                producto.etiqueta;


            if (!etiqueta) {

                etiqueta = "-";

            }


            fila.innerHTML = `

                <td>
                    ${producto.nombre}
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td>
                    $${Number(producto.precio).toLocaleString("es-MX")}
                </td>

                <td>
                    ${etiqueta}
                </td>

                <td>

                    <button
                        type="button"
                        class="boton-editar"
                        data-id="${producto.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="boton-eliminar"
                        data-id="${producto.id}"
                    >
                        Eliminar
                    </button>

                </td>

            `;


            tablaProductos.appendChild(
                fila
            );

        }
    );


    const contador =
        document.getElementById(
            "cantidad-productos"
        );


    if (contador) {

        contador.textContent =
            productos.length;

    }


    activarBotonesProductos();

}



/* agregar y editar */

if (formularioProducto) {

    formularioProducto.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            let productos =
                obtenerProductosAdmin();


            const id =
                document.getElementById(
                    "producto-id"
                ).value;


            const nombre =
                document.getElementById(
                    "producto-nombre"
                ).value;


            const categoria =
                document.getElementById(
                    "producto-categoria"
                ).value;


            const precio =
                document.getElementById(
                    "producto-precio"
                ).value;


            const etiqueta =
                document.getElementById(
                    "producto-etiqueta"
                ).value;


            const descripcion =
                document.getElementById(
                    "producto-descripcion"
                ).value;


            if (id) {

                const producto =
                    productos.find(
                        function(producto) {

                            return (
                                producto.id ===
                                Number(id)
                            );

                        }
                    );


                if (producto) {

                    producto.nombre =
                        nombre;

                    producto.categoria =
                        categoria;

                    producto.precio =
                        precio;

                    producto.etiqueta =
                        etiqueta;

                    producto.descripcion =
                        descripcion;

                }

            } else {

                let nuevoId =
                    Date.now();


                productos.push({

                    id: nuevoId,

                    nombre: nombre,

                    categoria: categoria,

                    precio: precio,

                    etiqueta: etiqueta,

                    descripcion: descripcion

                });

            }


            guardarProductosAdmin(
                productos
            );


            ocultarFormulario();

            mostrarProductosAdmin();

        }
    );

}



/* editar y eliminar */

function activarBotonesProductos() {

    const botonesEditar =
        document.querySelectorAll(
            ".boton-editar"
        );


    const botonesEliminar =
        document.querySelectorAll(
            ".boton-eliminar"
        );


    botonesEditar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const id =
                        Number(
                            boton.getAttribute(
                                "data-id"
                            )
                        );


                    const productos =
                        obtenerProductosAdmin();


                    const producto =
                        productos.find(
                            function(producto) {

                                return (
                                    producto.id === id
                                );

                            }
                        );


                    if (!producto) {

                        return;

                    }


                    document.getElementById(
                        "producto-id"
                    ).value =
                        producto.id;


                    document.getElementById(
                        "producto-nombre"
                    ).value =
                        producto.nombre;


                    document.getElementById(
                        "producto-categoria"
                    ).value =
                        producto.categoria;


                    document.getElementById(
                        "producto-precio"
                    ).value =
                        producto.precio;


                    document.getElementById(
                        "producto-etiqueta"
                    ).value =
                        producto.etiqueta;


                    document.getElementById(
                        "producto-descripcion"
                    ).value =
                        producto.descripcion;


                    document.getElementById(
                        "titulo-formulario-producto"
                    ).textContent =
                        "Editar producto";


                    mostrarFormulario();


                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        }
    );


    botonesEliminar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const id =
                        Number(
                            boton.getAttribute(
                                "data-id"
                            )
                        );


                    const confirmar =
                        confirm(
                            "¿Seguro que deseas eliminar este producto?"
                        );


                    if (!confirmar) {

                        return;

                    }


                    let productos =
                        obtenerProductosAdmin();


                    productos =
                        productos.filter(
                            function(producto) {

                                return (
                                    producto.id !== id
                                );

                            }
                        );


                    guardarProductosAdmin(
                        productos
                    );


                    mostrarProductosAdmin();

                }
            );

        }
    );

}


mostrarProductosAdmin();