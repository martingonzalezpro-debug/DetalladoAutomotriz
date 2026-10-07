/* productos iniciales */

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



function guardarProductosAdmin(
    productos
) {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );

}



/* total */

const totalProductos =
    document.getElementById(
        "total-productos"
    );


if (totalProductos) {

    totalProductos.textContent =
        obtenerProductosAdmin().length;

}



/* elementos */

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


const botonAbrir =
    document.getElementById(
        "abrir-formulario-producto"
    );


const botonCerrar =
    document.getElementById(
        "cerrar-formulario-producto"
    );


const botonCancelar =
    document.getElementById(
        "cancelar-producto"
    );



/* formulario */

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


    const id =
        document.getElementById(
            "producto-id"
        );


    if (id) {

        id.value =
            "";

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



if (botonAbrir) {

    botonAbrir.addEventListener(
        "click",
        function() {

            ocultarFormulario();

            mostrarFormulario();

        }
    );

}



if (botonCerrar) {

    botonCerrar.addEventListener(
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



/* tabla */

function mostrarProductosAdmin() {

    if (!tablaProductos) {

        return;

    }


    const productos =
        obtenerProductosAdmin();


    tablaProductos.innerHTML =
        "";


    productos.forEach(
        function(producto) {

            const fila =
                document.createElement(
                    "tr"
                );


            let etiqueta =
                producto.etiqueta;


            if (!etiqueta) {

                etiqueta =
                    "-";

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



/* guardar */

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
                                String(producto.id) ===
                                String(id)
                            );

                        }
                    );


                if (producto) {

                    producto.nombre =
                        nombre;

                    producto.categoria =
                        categoria;

                    producto.precio =
                        Number(precio);

                    producto.etiqueta =
                        etiqueta;

                    producto.descripcion =
                        descripcion;

                }

            } else {

                const nuevoProducto = {

                    id:
                        Date.now(),

                    nombre:
                        nombre,

                    categoria:
                        categoria,

                    precio:
                        Number(precio),

                    etiqueta:
                        etiqueta,

                    descripcion:
                        descripcion

                };


                productos.push(
                    nuevoProducto
                );

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
                        boton.getAttribute(
                            "data-id"
                        );


                    const productos =
                        obtenerProductosAdmin();


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
                        boton.getAttribute(
                            "data-id"
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
                                    String(producto.id) !==
                                    String(id)
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