/* promociones */

const botonAplicarPromocion =
    document.getElementById(
        "aplicar-promocion"
    );


if (botonAplicarPromocion) {

    botonAplicarPromocion.addEventListener(
        "click",
        function() {

            const codigo =
                document.getElementById(
                    "codigo-promocion"
                );


            const mensaje =
                document.getElementById(
                    "mensaje-promocion"
                );


            localStorage.setItem(
                "codigoPromocion",
                codigo.value
            );


            mensaje.textContent =
                "Código aplicado correctamente.";


            mensaje.classList.add(
                "mostrar"
            );


            setTimeout(
                function() {

                    mensaje.classList.remove(
                        "mostrar"
                    );

                },
                3000
            );

        }
    );

}



/* comunidad */

const comentariosIniciales = [

    {
        id: 1,
        nombre: "Carlos",
        comentario:
            "Buen servicio y muy cómodo que trabajen a domicilio.",
        fecha: "28/10/2026"
    },

    {
        id: 2,
        nombre: "Andrea",
        comentario:
            "Me gustó el resultado del detallado y la atención.",
        fecha: "30/10/2026"
    },

    {
        id: 3,
        nombre: "Miguel",
        comentario:
            "La página facilita ver los servicios antes de elegir.",
        fecha: "01/11/2026"
    }

];



function obtenerComentarios() {

    let comentarios =
        JSON.parse(
            localStorage.getItem(
                "comentariosComunidad"
            )
        );


    if (!comentarios) {

        comentarios =
            comentariosIniciales;


        localStorage.setItem(
            "comentariosComunidad",
            JSON.stringify(comentarios)
        );

    }


    return comentarios;

}



function guardarComentarios(
    comentarios
) {

    localStorage.setItem(
        "comentariosComunidad",
        JSON.stringify(comentarios)
    );

}



function mostrarComentarios() {

    const lista =
        document.getElementById(
            "lista-comentarios"
        );


    if (!lista) {

        return;

    }


    const comentarios =
        obtenerComentarios();


    lista.innerHTML =
        "";


    comentarios.forEach(
        function(comentario) {

            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "comentario-tarjeta";


            tarjeta.innerHTML = `

                <div class="comentario-superior">

                    <div class="comentario-avatar">
                        ${comentario.nombre.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h3>
                            ${comentario.nombre}
                        </h3>

                        <span>
                            ${comentario.fecha}
                        </span>

                    </div>

                </div>


                <p>
                    ${comentario.comentario}
                </p>

            `;


            lista.appendChild(
                tarjeta
            );

        }
    );

}



const formularioComentario =
    document.getElementById(
        "formulario-comentario"
    );


if (formularioComentario) {

    formularioComentario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const nombre =
                document.getElementById(
                    "nombre-comentario"
                ).value;


            const texto =
                document.getElementById(
                    "texto-comentario"
                ).value;


            const comentarios =
                obtenerComentarios();


            const nuevoComentario = {

                id:
                    Date.now(),

                nombre:
                    nombre,

                comentario:
                    texto,

                fecha:
                    new Date()
                        .toLocaleDateString(
                            "es-MX"
                        )

            };


            comentarios.unshift(
                nuevoComentario
            );


            guardarComentarios(
                comentarios
            );


            mostrarComentarios();


            formularioComentario.reset();


            const mensaje =
                document.getElementById(
                    "mensaje-comentario"
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
                3000
            );

        }
    );

}


mostrarComentarios();



/* publicaciones C2C */

function obtenerPublicaciones() {

    return (
        JSON.parse(
            localStorage.getItem(
                "publicacionesUsuario"
            )
        ) || []
    );

}



function guardarPublicaciones(
    publicaciones
) {

    localStorage.setItem(
        "publicacionesUsuario",
        JSON.stringify(publicaciones)
    );

}



const formularioPublicacion =
    document.getElementById(
        "formulario-publicacion"
    );


if (formularioPublicacion) {

    formularioPublicacion.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const nombre =
                document.getElementById(
                    "nombre-publicacion"
                ).value;


            const precio =
                document.getElementById(
                    "precio-publicacion"
                ).value;


            const descripcion =
                document.getElementById(
                    "descripcion-publicacion"
                ).value;


            const campoFoto =
                document.getElementById(
                    "foto-publicacion"
                );


            let foto =
                "Sin imagen";


            if (
                campoFoto.files.length > 0
            ) {

                foto =
                    campoFoto.files[0].name;

            }


            const publicaciones =
                obtenerPublicaciones();


            publicaciones.unshift({

                id:
                    Date.now(),

                nombre:
                    nombre,

                precio:
                    precio,

                descripcion:
                    descripcion,

                foto:
                    foto,

                fecha:
                    new Date()
                        .toLocaleDateString(
                            "es-MX"
                        )

            });


            guardarPublicaciones(
                publicaciones
            );


            formularioPublicacion.reset();


            const mensaje =
                document.getElementById(
                    "mensaje-publicacion"
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
                3000
            );

        }
    );

}



/* mis publicaciones */

function mostrarPublicaciones() {

    const lista =
        document.getElementById(
            "lista-publicaciones"
        );


    if (!lista) {

        return;

    }


    const publicaciones =
        obtenerPublicaciones();


    lista.innerHTML =
        "";


    if (
        publicaciones.length === 0
    ) {

        lista.innerHTML = `

            <div class="publicaciones-vacias">

                <h2>
                    No tienes publicaciones
                </h2>

                <p>
                    Publica un producto para verlo
                    en esta sección.
                </p>

                <a
                    href="publicar.html"
                    class="boton boton-principal"
                >
                    Publicar producto
                </a>

            </div>

        `;


        return;

    }


    publicaciones.forEach(
        function(publicacion) {

            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "publicacion-tarjeta";


            tarjeta.innerHTML = `

                <div class="publicacion-imagen">

                    <span>
                        IMAGEN
                    </span>

                    <p>
                        ${publicacion.foto}
                    </p>

                </div>


                <div class="publicacion-info">

                    <span class="publicacion-fecha">
                        ${publicacion.fecha}
                    </span>

                    <h2>
                        ${publicacion.nombre}
                    </h2>

                    <h3>
                        $${publicacion.precio}
                    </h3>

                    <p>
                        ${publicacion.descripcion}
                    </p>


                    <div class="publicacion-acciones">

                        <button
                            type="button"
                            class="boton-editar-publicacion"
                            data-id="${publicacion.id}"
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            class="boton-eliminar-publicacion"
                            data-id="${publicacion.id}"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            `;


            lista.appendChild(
                tarjeta
            );

        }
    );


    activarBotonesPublicaciones();

}



function activarBotonesPublicaciones() {

    const botonesEditar =
        document.querySelectorAll(
            ".boton-editar-publicacion"
        );


    const botonesEliminar =
        document.querySelectorAll(
            ".boton-eliminar-publicacion"
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


                    const publicaciones =
                        obtenerPublicaciones();


                    const publicacion =
                        publicaciones.find(
                            function(publicacion) {

                                return (
                                    String(publicacion.id) ===
                                    String(id)
                                );

                            }
                        );


                    if (!publicacion) {

                        return;

                    }


                    document.getElementById(
                        "editar-id"
                    ).value =
                        publicacion.id;


                    document.getElementById(
                        "editar-nombre"
                    ).value =
                        publicacion.nombre;


                    document.getElementById(
                        "editar-precio"
                    ).value =
                        publicacion.precio;


                    document.getElementById(
                        "editar-descripcion"
                    ).value =
                        publicacion.descripcion;


                    document.getElementById(
                        "formulario-edicion-contenedor"
                    ).classList.add(
                        "mostrar"
                    );


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


                    let publicaciones =
                        obtenerPublicaciones();


                    publicaciones =
                        publicaciones.filter(
                            function(publicacion) {

                                return (
                                    String(publicacion.id) !==
                                    String(id)
                                );

                            }
                        );


                    guardarPublicaciones(
                        publicaciones
                    );


                    mostrarPublicaciones();

                }
            );

        }
    );

}


mostrarPublicaciones();



/* editar publicacion */

const formularioEditar =
    document.getElementById(
        "formulario-editar-publicacion"
    );


if (formularioEditar) {

    formularioEditar.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const id =
                document.getElementById(
                    "editar-id"
                ).value;


            const publicaciones =
                obtenerPublicaciones();


            const publicacion =
                publicaciones.find(
                    function(publicacion) {

                        return (
                            String(publicacion.id) ===
                            String(id)
                        );

                    }
                );


            if (!publicacion) {

                return;

            }


            publicacion.nombre =
                document.getElementById(
                    "editar-nombre"
                ).value;


            publicacion.precio =
                document.getElementById(
                    "editar-precio"
                ).value;


            publicacion.descripcion =
                document.getElementById(
                    "editar-descripcion"
                ).value;


            const foto =
                document.getElementById(
                    "editar-foto"
                );


            if (
                foto.files.length > 0
            ) {

                publicacion.foto =
                    foto.files[0].name;

            }


            guardarPublicaciones(
                publicaciones
            );


            cerrarEdicion();


            mostrarPublicaciones();

        }
    );

}



/* cerrar edicion */

function cerrarEdicion() {

    const contenedor =
        document.getElementById(
            "formulario-edicion-contenedor"
        );


    if (contenedor) {

        contenedor.classList.remove(
            "mostrar"
        );

    }


    if (formularioEditar) {

        formularioEditar.reset();

    }

}



const botonCerrarEdicion =
    document.getElementById(
        "cerrar-edicion"
    );


if (botonCerrarEdicion) {

    botonCerrarEdicion.addEventListener(
        "click",
        cerrarEdicion
    );

}



const botonCancelarEdicion =
    document.getElementById(
        "cancelar-edicion"
    );


if (botonCancelarEdicion) {

    botonCancelarEdicion.addEventListener(
        "click",
        cerrarEdicion
    );

}