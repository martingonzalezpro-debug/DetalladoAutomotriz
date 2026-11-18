/* =============================
   MENSAJES GENERALES
============================= */

function mostrarAvisoPagina(texto, tipo) {

    let aviso =
        document.getElementById(
            "aviso-general-pagina"
        );


    if (!aviso) {

        aviso =
            document.createElement(
                "div"
            );


        aviso.id =
            "aviso-general-pagina";


        aviso.style.position =
            "fixed";

        aviso.style.top =
            "90px";

        aviso.style.right =
            "25px";

        aviso.style.zIndex =
            "9999";

        aviso.style.maxWidth =
            "360px";

        aviso.style.padding =
            "16px 20px";

        aviso.style.borderRadius =
            "8px";

        aviso.style.fontSize =
            "0.9rem";

        aviso.style.lineHeight =
            "1.5";

        aviso.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.35)";


        document.body.appendChild(
            aviso
        );

    }


    if (tipo === "error") {

        aviso.style.backgroundColor =
            "#30151b";

        aviso.style.border =
            "1px solid #733144";

        aviso.style.color =
            "#f1b2bd";

    } else {

        aviso.style.backgroundColor =
            "#17271c";

        aviso.style.border =
            "1px solid #31563c";

        aviso.style.color =
            "#a9d8b7";

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



/* =============================
   SESION
============================= */

function sesionUsuarioActiva() {

    return (
        localStorage.getItem(
            "sesionUsuario"
        ) === "activa"
    );

}



/* =============================
   COMUNIDAD
============================= */

const comentariosIniciales = [

    {
        id: 1,
        nombre: "Carlos",
        comentario:
            "Buen servicio y muy cómodo que trabajen a domicilio.",
        fecha: "28/10/2026",
        propietario: false
    },

    {
        id: 2,
        nombre: "Andrea",
        comentario:
            "Me gustó el resultado del detallado y la atención.",
        fecha: "30/10/2026",
        propietario: false
    },

    {
        id: 3,
        nombre: "Miguel",
        comentario:
            "La página facilita ver los servicios antes de elegir.",
        fecha: "01/11/2026",
        propietario: false
    }

];



function guardarComentarios(comentarios) {

    localStorage.setItem(
        "comentariosComunidad",
        JSON.stringify(comentarios)
    );

}



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


        guardarComentarios(
            comentarios
        );

    }


    comentarios.forEach(
        function(comentario) {

            if (
                comentario.propietario ===
                undefined
            ) {

                comentario.propietario =
                    !(
                        Number(comentario.id) === 1 ||
                        Number(comentario.id) === 2 ||
                        Number(comentario.id) === 3
                    );

            }

        }
    );


    guardarComentarios(
        comentarios
    );


    return comentarios;

}



let comentarioEditandoId =
    null;



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


            let inicial =
                "U";


            if (comentario.nombre) {

                inicial =
                    comentario.nombre
                        .charAt(0)
                        .toUpperCase();

            }


            let acciones =
                "";


            if (
                sesionUsuarioActiva() &&
                comentario.propietario
            ) {

                acciones = `

                    <div
                        style="
                            margin-top:18px;
                            display:flex;
                            gap:8px;
                        "
                    >

                        <button
                            type="button"
                            class="editar-comentario"
                            data-id="${comentario.id}"
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            class="eliminar-comentario"
                            data-id="${comentario.id}"
                        >
                            Eliminar
                        </button>

                    </div>

                `;

            }


            tarjeta.innerHTML = `

                <div class="comentario-superior">

                    <div class="comentario-avatar">
                        ${inicial}
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

                ${acciones}

            `;


            lista.appendChild(
                tarjeta
            );

        }
    );


    activarAccionesComentarios();

}



function prepararFormularioComunidad() {

    const formulario =
        document.getElementById(
            "formulario-comentario"
        );


    if (!formulario) {

        return;

    }


    if (
        sesionUsuarioActiva()
    ) {

        formulario.style.display =
            "block";

        return;

    }


    formulario.style.display =
        "none";


    if (
        document.getElementById(
            "aviso-login-comunidad"
        )
    ) {

        return;

    }


    const aviso =
        document.createElement(
            "div"
        );


    aviso.id =
        "aviso-login-comunidad";


    aviso.innerHTML = `

        <p
            style="
                margin-bottom:15px;
                color:#aaaab0;
            "
        >
            Inicia sesión para publicar
            y administrar tus comentarios.
        </p>

        <a
            href="login.html"
            class="boton boton-principal"
        >
            Iniciar sesión
        </a>

    `;


    formulario.parentElement.appendChild(
        aviso
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


            if (
                comentarioEditandoId !==
                null
            ) {

                const comentario =
                    comentarios.find(
                        function(elemento) {

                            return (
                                String(elemento.id) ===
                                String(comentarioEditandoId)
                            );

                        }
                    );


                if (comentario) {

                    comentario.nombre =
                        nombre;

                    comentario.comentario =
                        texto;

                }


                guardarComentarios(
                    comentarios
                );


                comentarioEditandoId =
                    null;


                formularioComentario.reset();


                const boton =
                    formularioComentario.querySelector(
                        'button[type="submit"]'
                    );


                if (boton) {

                    boton.textContent =
                        "Publicar comentario";

                }


                mostrarComentarios();


                mostrarAvisoPagina(
                    "Comentario actualizado correctamente.",
                    "exito"
                );


                return;

            }


            comentarios.unshift({

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
                        ),

                propietario:
                    true

            });


            guardarComentarios(
                comentarios
            );


            formularioComentario.reset();


            mostrarComentarios();


            mostrarAvisoPagina(
                "Comentario publicado correctamente.",
                "exito"
            );

        }
    );

}



function activarAccionesComentarios() {

    document
        .querySelectorAll(
            ".editar-comentario"
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


                        const comentarios =
                            obtenerComentarios();


                        const comentario =
                            comentarios.find(
                                function(elemento) {

                                    return (
                                        String(elemento.id) ===
                                        String(id)
                                    );

                                }
                            );


                        if (!comentario) {

                            return;

                        }


                        comentarioEditandoId =
                            comentario.id;


                        document.getElementById(
                            "nombre-comentario"
                        ).value =
                            comentario.nombre;


                        document.getElementById(
                            "texto-comentario"
                        ).value =
                            comentario.comentario;


                        const guardar =
                            formularioComentario.querySelector(
                                'button[type="submit"]'
                            );


                        if (guardar) {

                            guardar.textContent =
                                "Guardar cambios";

                        }


                        formularioComentario.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "center"

                        });


                        mostrarAvisoPagina(
                            "Puedes modificar tu comentario.",
                            "exito"
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".eliminar-comentario"
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


                        let comentarios =
                            obtenerComentarios();


                        comentarios =
                            comentarios.filter(
                                function(comentario) {

                                    return !(
                                        String(comentario.id) ===
                                        String(id) &&
                                        comentario.propietario
                                    );

                                }
                            );


                        guardarComentarios(
                            comentarios
                        );


                        mostrarComentarios();


                        mostrarAvisoPagina(
                            "Comentario eliminado correctamente.",
                            "exito"
                        );

                    }
                );

            }
        );

}


prepararFormularioComunidad();

mostrarComentarios();



/* =============================
   MIS PUBLICACIONES
============================= */

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
                    document.getElementById(
                        "nombre-publicacion"
                    ).value,

                precio:
                    document.getElementById(
                        "precio-publicacion"
                    ).value,

                descripcion:
                    document.getElementById(
                        "descripcion-publicacion"
                    ).value,

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


            mostrarAvisoPagina(
                "Producto publicado correctamente.",
                "exito"
            );

        }
    );

}



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
                    Publica un producto para verlo aquí.
                </p>

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


                        <a
                            href="resenas-marketplace.html#producto-${publicacion.id}"
                            class="boton boton-secundario"
                        >
                            Ver reseñas
                        </a>

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



function cerrarEdicionPublicacion() {

    const contenedor =
        document.getElementById(
            "formulario-edicion-contenedor"
        );


    if (contenedor) {

        contenedor.classList.remove(
            "mostrar"
        );


        contenedor.style.display =
            "none";

    }


    if (formularioEditar) {

        formularioEditar.reset();

    }

}



function activarBotonesPublicaciones() {

    document
        .querySelectorAll(
            ".boton-editar-publicacion"
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


                        const publicaciones =
                            obtenerPublicaciones();


                        const publicacion =
                            publicaciones.find(
                                function(elemento) {

                                    return (
                                        String(elemento.id) ===
                                        String(id)
                                    );

                                }
                            );


                        if (!publicacion) {

                            return;

                        }


                        const contenedor =
                            document.getElementById(
                                "formulario-edicion-contenedor"
                            );


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


                        contenedor.classList.add(
                            "mostrar"
                        );


                        contenedor.style.display =
                            "block";


                        contenedor.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".boton-eliminar-publicacion"
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


                        mostrarAvisoPagina(
                            "Publicación eliminada correctamente.",
                            "exito"
                        );

                    }
                );

            }
        );

}



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
                    function(elemento) {

                        return (
                            String(elemento.id) ===
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


            guardarPublicaciones(
                publicaciones
            );


            cerrarEdicionPublicacion();


            mostrarPublicaciones();


            mostrarAvisoPagina(
                "Publicación actualizada correctamente.",
                "exito"
            );

        }
    );

}


mostrarPublicaciones();



/* =============================
   MARKETPLACE
============================= */

const publicacionesOtrosIniciales = [

    {
        id: "otro-1",
        vendedor: "Alejandro",
        nombre: "Pulidora orbital usada",
        precio: 1900,
        descripcion:
            "Pulidora orbital de 15 mm en buenas condiciones."
    },

    {
        id: "otro-2",
        vendedor: "Carlos",
        nombre: "Aspiradora para detallado",
        precio: 1350,
        descripcion:
            "Aspiradora para interiores con accesorios."
    },

    {
        id: "otro-3",
        vendedor: "Andrea",
        nombre: "Kit de microfibras",
        precio: 450,
        descripcion:
            "Juego de microfibras para secado y detallado."
    }

];



function obtenerPublicacionesOtros() {

    let productos =
        JSON.parse(
            localStorage.getItem(
                "publicacionesMarketplaceOtros"
            )
        );


    if (!productos) {

        productos =
            publicacionesOtrosIniciales;


        localStorage.setItem(
            "publicacionesMarketplaceOtros",
            JSON.stringify(productos)
        );

    }


    return productos;

}



function obtenerComprasMarketplace() {

    return (
        JSON.parse(
            localStorage.getItem(
                "comprasMarketplaceUsuario"
            )
        ) || []
    );

}



function guardarComprasMarketplace(
    compras
) {

    localStorage.setItem(
        "comprasMarketplaceUsuario",
        JSON.stringify(compras)
    );

}



/* =============================
   RESEÑAS
============================= */

function obtenerResenasCompras() {

    return (
        JSON.parse(
            localStorage.getItem(
                "resenasComprasMarketplace"
            )
        ) || []
    );

}



function guardarResenasCompras(
    resenas
) {

    localStorage.setItem(
        "resenasComprasMarketplace",
        JSON.stringify(resenas)
    );

}



function obtenerEstrellas(
    cantidad
) {

    let estrellas =
        "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (
            i <=
            Number(cantidad)
        ) {

            estrellas +=
                "★";

        } else {

            estrellas +=
                "☆";

        }

    }


    return estrellas;

}



/*
Producto cuyo formulario de
nueva reseña está abierto
*/

let productoResenaNueva =
    null;


/*
Producto cuya reseña se está
modificando
*/

let productoResenaEditando =
    null;



/* =============================
   FORMULARIO DE RESEÑA
============================= */

function crearFormularioResena(
    productoId,
    comentario,
    estrellas,
    editando
) {

    let textoBoton =
        "Publicar reseña";


    if (editando) {

        textoBoton =
            "Guardar cambios";

    }


    return `

        <form
            class="formulario-resena-compra"
            data-id="${productoId}"
            data-editando="${editando}"
            novalidate
            style="
                margin-top:20px;
            "
        >

            <div class="campo">

                <label>
                    Calificación
                </label>


                <select
                    class="estrellas-resena"
                >

                    <option
                        value="5"
                        ${String(estrellas) === "5" ? "selected" : ""}
                    >
                        5 estrellas
                    </option>

                    <option
                        value="4"
                        ${String(estrellas) === "4" ? "selected" : ""}
                    >
                        4 estrellas
                    </option>

                    <option
                        value="3"
                        ${String(estrellas) === "3" ? "selected" : ""}
                    >
                        3 estrellas
                    </option>

                    <option
                        value="2"
                        ${String(estrellas) === "2" ? "selected" : ""}
                    >
                        2 estrellas
                    </option>

                    <option
                        value="1"
                        ${String(estrellas) === "1" ? "selected" : ""}
                    >
                        1 estrella
                    </option>

                </select>

            </div>


            <div class="campo">

                <label>
                    Reseña
                </label>

                <textarea
                    class="texto-resena-compra"
                    rows="3"
                    placeholder="Escribe tu opinión"
                >${comentario}</textarea>

            </div>


            <div
                style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                "
            >

                <button
                    type="submit"
                    class="boton boton-secundario"
                >
                    ${textoBoton}
                </button>


                <button
                    type="button"
                    class="boton boton-secundario cancelar-formulario-resena"
                >
                    Cancelar
                </button>

            </div>

        </form>

    `;

}



/* =============================
   MOSTRAR MARKETPLACE
============================= */

function mostrarMarketplace() {

    const contenedor =
        document.getElementById(
            "marketplace-productos"
        );


    if (!contenedor) {

        return;

    }


    const productos =
        obtenerPublicacionesOtros();


    const compras =
        obtenerComprasMarketplace();


    const resenas =
        obtenerResenasCompras();


    contenedor.innerHTML =
        "";


    productos.forEach(
        function(producto) {

            const comprado =
                compras.some(
                    function(id) {

                        return (
                            String(id) ===
                            String(producto.id)
                        );

                    }
                );


            const resenaUsuario =
                resenas.find(
                    function(resena) {

                        return (
                            String(resena.productoId) ===
                            String(producto.id) &&
                            resena.usuario ===
                            "Usuario"
                        );

                    }
                );


            const resenasProducto =
                resenas.filter(
                    function(resena) {

                        return (
                            String(resena.productoId) ===
                            String(producto.id)
                        );

                    }
                );



            /* reseñas visibles */

            let resenasHTML =
                "";


            if (
                resenasProducto.length ===
                0
            ) {

                resenasHTML = `

                    <p
                        style="
                            color:#77777d;
                            margin-top:20px;
                        "
                    >
                        Este producto todavía
                        no tiene reseñas.
                    </p>

                `;

            } else {

                resenasProducto.forEach(
                    function(resena) {

                        let acciones =
                            "";


                        if (
                            resena.usuario ===
                            "Usuario"
                        ) {

                            acciones = `

                                <div
                                    style="
                                        margin-top:15px;
                                        display:flex;
                                        gap:10px;
                                        flex-wrap:wrap;
                                    "
                                >

                                    <button
                                        type="button"
                                        class="editar-resena-marketplace"
                                        data-id="${resena.id}"
                                        data-producto="${producto.id}"
                                    >
                                        Modificar reseña
                                    </button>


                                    <button
                                        type="button"
                                        class="eliminar-resena-marketplace"
                                        data-id="${resena.id}"
                                    >
                                        Eliminar reseña
                                    </button>

                                </div>

                            `;

                        }


                        resenasHTML += `

                            <div
                                style="
                                    margin-top:15px;
                                    padding:18px;
                                    background:#101012;
                                    border:1px solid #29292e;
                                    border-radius:7px;
                                "
                            >

                                <strong>
                                    ${resena.usuario}
                                </strong>


                                <div
                                    style="
                                        color:#c32947;
                                        margin:8px 0;
                                        letter-spacing:2px;
                                    "
                                >
                                    ${obtenerEstrellas(resena.estrellas)}
                                </div>


                                <p>
                                    ${resena.comentario}
                                </p>


                                ${acciones}

                            </div>

                        `;

                    }
                );

            }



            /* zona de compra / reseña */

            let compraHTML =
                "";


            /*
            NO comprado
            */

            if (!comprado) {

                compraHTML = `

                    <button
                        type="button"
                        class="boton boton-principal comprar-marketplace"
                        data-id="${producto.id}"
                    >
                        Comprar
                    </button>

                `;

            }



            /*
            Comprado pero todavía
            NO tiene reseña.
            
            AHORA SOLO mostramos
            "Dejar reseña"
            */

            if (
                comprado &&
                !resenaUsuario &&
                String(productoResenaNueva) !==
                String(producto.id)
            ) {

                compraHTML = `

                    <p
                        style="
                            margin-bottom:15px;
                            color:#a9d8b7;
                            font-weight:700;
                        "
                    >
                        Producto comprado
                    </p>


                    <button
                        type="button"
                        class="boton boton-secundario abrir-resena-marketplace"
                        data-id="${producto.id}"
                    >
                        Dejar reseña
                    </button>

                `;

            }



            /*
            El usuario presionó
            "Dejar reseña"
            */

            if (
                comprado &&
                !resenaUsuario &&
                String(productoResenaNueva) ===
                String(producto.id)
            ) {

                compraHTML = `

                    <p
                        style="
                            margin-bottom:10px;
                            color:#a9d8b7;
                            font-weight:700;
                        "
                    >
                        Dejar reseña
                    </p>


                    ${crearFormularioResena(
                        producto.id,
                        "",
                        "5",
                        false
                    )}

                `;

            }



            /*
            Ya tiene reseña.
            NO mostramos formulario.
            */

            if (
                comprado &&
                resenaUsuario &&
                String(productoResenaEditando) !==
                String(producto.id)
            ) {

                compraHTML = `

                    <p
                        style="
                            color:#a9d8b7;
                            font-weight:700;
                        "
                    >
                        Producto comprado
                    </p>

                `;

            }



            /*
            Está modificando su reseña.
            */

            if (
                comprado &&
                resenaUsuario &&
                String(productoResenaEditando) ===
                String(producto.id)
            ) {

                compraHTML = `

                    <p
                        style="
                            margin-bottom:10px;
                            color:#a9d8b7;
                            font-weight:700;
                        "
                    >
                        Modificar reseña
                    </p>


                    ${crearFormularioResena(
                        producto.id,
                        resenaUsuario.comentario,
                        resenaUsuario.estrellas,
                        true
                    )}

                `;

            }



            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "publicacion-tarjeta";


            tarjeta.innerHTML = `

                <div class="publicacion-imagen">

                    <span>
                        PRODUCTO
                    </span>

                    <p>
                        Publicado por
                        ${producto.vendedor}
                    </p>

                </div>


                <div class="publicacion-info">

                    <span class="publicacion-fecha">

                        Vendedor:
                        ${producto.vendedor}

                    </span>


                    <h2>
                        ${producto.nombre}
                    </h2>


                    <h3>
                        $${Number(producto.precio).toLocaleString("es-MX")}
                    </h3>


                    <p>
                        ${producto.descripcion}
                    </p>


                    ${compraHTML}


                    <div
                        style="
                            margin-top:30px;
                            padding-top:20px;
                            border-top:1px solid #29292e;
                        "
                    >

                        <h3>
                            Reseñas
                        </h3>

                        ${resenasHTML}

                    </div>

                </div>

            `;


            contenedor.appendChild(
                tarjeta
            );

        }
    );


    activarComprasMarketplace();

    activarAbrirResena();

    activarFormulariosResena();

    activarEditarResenas();

    activarEliminarResenas();

    activarCancelarResenas();

}



/* =============================
   COMPRAR
============================= */

function activarComprasMarketplace() {

    document
        .querySelectorAll(
            ".comprar-marketplace"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        if (
                            !sesionUsuarioActiva()
                        ) {

                            mostrarAvisoPagina(
                                "Inicia sesión para comprar productos del Marketplace.",
                                "error"
                            );


                            return;

                        }


                        const id =
                            boton.getAttribute(
                                "data-id"
                            );


                        const compras =
                            obtenerComprasMarketplace();


                        const existe =
                            compras.some(
                                function(compra) {

                                    return (
                                        String(compra) ===
                                        String(id)
                                    );

                                }
                            );


                        if (!existe) {

                            compras.push(
                                id
                            );


                            guardarComprasMarketplace(
                                compras
                            );

                        }


                        /*
                        IMPORTANTE:
                        ya NO abrimos el formulario
                        automáticamente.
                        */


                        productoResenaNueva =
                            null;


                        mostrarMarketplace();


                        mostrarAvisoPagina(
                            "Compra registrada correctamente.",
                            "exito"
                        );

                    }
                );

            }
        );

}



/* =============================
   BOTON DEJAR RESEÑA
============================= */

function activarAbrirResena() {

    document
        .querySelectorAll(
            ".abrir-resena-marketplace"
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


                        productoResenaNueva =
                            id;


                        productoResenaEditando =
                            null;


                        mostrarMarketplace();


                        setTimeout(
                            function() {

                                const formulario =
                                    document.querySelector(
                                        '.formulario-resena-compra[data-id="' +
                                        id +
                                        '"]'
                                    );


                                if (formulario) {

                                    formulario.scrollIntoView({

                                        behavior:
                                            "smooth",

                                        block:
                                            "center"

                                    });

                                }

                            },
                            100
                        );

                    }
                );

            }
        );

}



/* =============================
   PUBLICAR / GUARDAR RESEÑA
============================= */

function activarFormulariosResena() {

    document
        .querySelectorAll(
            ".formulario-resena-compra"
        )
        .forEach(
            function(formulario) {

                formulario.addEventListener(
                    "submit",
                    function(evento) {

                        evento.preventDefault();


                        const productoId =
                            formulario.getAttribute(
                                "data-id"
                            );


                        const editando =
                            formulario.getAttribute(
                                "data-editando"
                            ) === "true";


                        const estrellas =
                            formulario.querySelector(
                                ".estrellas-resena"
                            ).value;


                        const comentario =
                            formulario.querySelector(
                                ".texto-resena-compra"
                            ).value;


                        const resenas =
                            obtenerResenasCompras();



                        /* MODIFICAR */

                        if (editando) {

                            const resena =
                                resenas.find(
                                    function(elemento) {

                                        return (
                                            String(elemento.productoId) ===
                                            String(productoId) &&
                                            elemento.usuario ===
                                            "Usuario"
                                        );

                                    }
                                );


                            if (resena) {

                                resena.estrellas =
                                    estrellas;


                                resena.comentario =
                                    comentario;


                                resena.fecha =
                                    new Date()
                                        .toLocaleDateString(
                                            "es-MX"
                                        );

                            }


                            guardarResenasCompras(
                                resenas
                            );


                            productoResenaEditando =
                                null;


                            productoResenaNueva =
                                null;


                            mostrarMarketplace();


                            mostrarAvisoPagina(
                                "Reseña actualizada correctamente.",
                                "exito"
                            );


                            return;

                        }



                        /* NUEVA RESEÑA */

                        const existente =
                            resenas.find(
                                function(elemento) {

                                    return (
                                        String(elemento.productoId) ===
                                        String(productoId) &&
                                        elemento.usuario ===
                                        "Usuario"
                                    );

                                }
                            );


                        if (!existente) {

                            resenas.unshift({

                                id:
                                    Date.now(),

                                productoId:
                                    productoId,

                                usuario:
                                    "Usuario",

                                estrellas:
                                    estrellas,

                                comentario:
                                    comentario,

                                fecha:
                                    new Date()
                                        .toLocaleDateString(
                                            "es-MX"
                                        )

                            });

                        }


                        guardarResenasCompras(
                            resenas
                        );


                        /*
                        Cerramos el formulario
                        después de publicar.
                        */

                        productoResenaNueva =
                            null;


                        productoResenaEditando =
                            null;


                        mostrarMarketplace();


                        mostrarAvisoPagina(
                            "Reseña publicada correctamente.",
                            "exito"
                        );

                    }
                );

            }
        );

}



/* =============================
   MODIFICAR RESEÑA
============================= */

function activarEditarResenas() {

    document
        .querySelectorAll(
            ".editar-resena-marketplace"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        const productoId =
                            boton.getAttribute(
                                "data-producto"
                            );


                        productoResenaEditando =
                            productoId;


                        productoResenaNueva =
                            null;


                        mostrarMarketplace();


                        setTimeout(
                            function() {

                                const formulario =
                                    document.querySelector(
                                        '.formulario-resena-compra[data-id="' +
                                        productoId +
                                        '"]'
                                    );


                                if (formulario) {

                                    formulario.scrollIntoView({

                                        behavior:
                                            "smooth",

                                        block:
                                            "center"

                                    });

                                }

                            },
                            100
                        );


                        mostrarAvisoPagina(
                            "Puedes modificar tu reseña.",
                            "exito"
                        );

                    }
                );

            }
        );

}



/* =============================
   ELIMINAR RESEÑA
============================= */

function activarEliminarResenas() {

    document
        .querySelectorAll(
            ".eliminar-resena-marketplace"
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


                        let resenas =
                            obtenerResenasCompras();


                        resenas =
                            resenas.filter(
                                function(resena) {

                                    return (
                                        String(resena.id) !==
                                        String(id)
                                    );

                                }
                            );


                        guardarResenasCompras(
                            resenas
                        );


                        productoResenaNueva =
                            null;


                        productoResenaEditando =
                            null;


                        mostrarMarketplace();


                        mostrarAvisoPagina(
                            "Reseña eliminada correctamente.",
                            "exito"
                        );

                    }
                );

            }
        );

}



/* =============================
   CANCELAR RESEÑA
============================= */

function activarCancelarResenas() {

    document
        .querySelectorAll(
            ".cancelar-formulario-resena"
        )
        .forEach(
            function(boton) {

                boton.addEventListener(
                    "click",
                    function() {

                        productoResenaNueva =
                            null;


                        productoResenaEditando =
                            null;


                        mostrarMarketplace();


                        mostrarAvisoPagina(
                            "Acción cancelada.",
                            "exito"
                        );

                    }
                );

            }
        );

}


mostrarMarketplace();



/* =============================
   RESEÑAS RECIBIDAS
============================= */

function obtenerResenasMarketplace() {

    return (
        JSON.parse(
            localStorage.getItem(
                "resenasMarketplace"
            )
        ) || []
    );

}



function mostrarResenasMarketplace() {

    const lista =
        document.getElementById(
            "lista-resenas-marketplace"
        );


    if (!lista) {

        return;

    }


    const publicaciones =
        obtenerPublicaciones();


    const resenas =
        obtenerResenasMarketplace();


    lista.innerHTML =
        "";


    if (
        publicaciones.length === 0
    ) {

        lista.innerHTML = `

            <div class="publicaciones-vacias">

                <h2>
                    No tienes productos publicados
                </h2>

                <p>
                    Publica un producto para comenzar
                    a recibir reseñas.
                </p>

            </div>

        `;


        return;

    }


    publicaciones.forEach(
        function(publicacion) {

            const opiniones =
                resenas.filter(
                    function(resena) {

                        return (
                            String(resena.productoId) ===
                            String(publicacion.id)
                        );

                    }
                );


            let opinionesHTML =
                "";


            if (
                opiniones.length === 0
            ) {

                opinionesHTML = `

                    <p>
                        Este producto todavía
                        no tiene reseñas.
                    </p>

                `;

            } else {

                opiniones.forEach(
                    function(resena) {

                        opinionesHTML += `

                            <article class="comentario-tarjeta">

                                <h3>
                                    ${resena.usuario}
                                </h3>

                                <div
                                    style="
                                        margin:10px 0;
                                        color:#c32947;
                                        letter-spacing:2px;
                                    "
                                >
                                    ${obtenerEstrellas(resena.calificacion)}
                                </div>

                                <p>
                                    ${resena.comentario}
                                </p>

                            </article>

                        `;

                    }
                );

            }


            const bloque =
                document.createElement(
                    "section"
                );


            bloque.id =
                "producto-" +
                publicacion.id;


            bloque.style.marginBottom =
                "40px";


            bloque.innerHTML = `

                <h2>
                    ${publicacion.nombre}
                </h2>

                <div
                    style="
                        margin-top:20px;
                    "
                >
                    ${opinionesHTML}
                </div>

            `;


            lista.appendChild(
                bloque
            );

        }
    );

}


mostrarResenasMarketplace();



/* =============================
   SUBASTA
============================= */

const ofertasIniciales = [

    {
        id: 1,
        usuario: "Carlos",
        cantidad: "1800",
        hora: "10:35 p. m."
    },

    {
        id: 2,
        usuario: "Andrea",
        cantidad: "1700",
        hora: "10:20 p. m."
    },

    {
        id: 3,
        usuario: "Miguel",
        cantidad: "1600",
        hora: "10:05 p. m."
    }

];



function obtenerOfertas() {

    let ofertas =
        JSON.parse(
            localStorage.getItem(
                "ofertasSubasta"
            )
        );


    if (!ofertas) {

        ofertas =
            ofertasIniciales;


        localStorage.setItem(
            "ofertasSubasta",
            JSON.stringify(ofertas)
        );

    }


    return ofertas;

}



function guardarOfertas(
    ofertas
) {

    localStorage.setItem(
        "ofertasSubasta",
        JSON.stringify(ofertas)
    );

}



function mostrarOfertas() {

    const lista =
        document.getElementById(
            "lista-ofertas"
        );


    if (!lista) {

        return;

    }


    const ofertas =
        obtenerOfertas();


    lista.innerHTML =
        "";


    ofertas.forEach(
        function(oferta) {

            const elemento =
                document.createElement(
                    "article"
                );


            elemento.className =
                "oferta-item";


            elemento.innerHTML = `

                <div class="oferta-usuario">

                    <h3>
                        ${oferta.usuario}
                    </h3>

                    <span>
                        ${oferta.hora}
                    </span>

                </div>

                <div class="oferta-cantidad">
                    $${oferta.cantidad}
                </div>

            `;


            lista.appendChild(
                elemento
            );

        }
    );


    const ofertaActual =
        document.getElementById(
            "oferta-actual"
        );


    if (
        ofertaActual &&
        ofertas.length > 0
    ) {

        ofertaActual.textContent =
            "$" +
            ofertas[0].cantidad;

    }

}



const formularioOferta =
    document.getElementById(
        "formulario-oferta"
    );


if (formularioOferta) {

    formularioOferta.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const cantidad =
                document.getElementById(
                    "cantidad-oferta"
                ).value;


            const ofertas =
                obtenerOfertas();


            ofertas.unshift({

                id:
                    Date.now(),

                usuario:
                    "Usuario",

                cantidad:
                    cantidad,

                hora:
                    new Date()
                        .toLocaleTimeString(
                            "es-MX",
                            {
                                hour:
                                    "2-digit",

                                minute:
                                    "2-digit"
                            }
                        )

            });


            guardarOfertas(
                ofertas
            );


            formularioOferta.reset();


            mostrarOfertas();


            mostrarAvisoPagina(
                "Oferta registrada correctamente.",
                "exito"
            );

        }
    );

}


mostrarOfertas();



/* =============================
   TEMPORIZADOR
============================= */

function iniciarTemporizadorSubasta() {

    const contador =
        document.getElementById(
            "contador-subasta"
        );


    if (!contador) {

        return;

    }


    let segundos =
        7199;


    function actualizar() {

        const horas =
            Math.floor(
                segundos / 3600
            );


        const minutos =
            Math.floor(
                (segundos % 3600) /
                60
            );


        const segundosRestantes =
            segundos % 60;


        contador.textContent =

            String(horas)
                .padStart(
                    2,
                    "0"
                ) +

            ":" +

            String(minutos)
                .padStart(
                    2,
                    "0"
                ) +

            ":" +

            String(segundosRestantes)
                .padStart(
                    2,
                    "0"
                );


        if (
            segundos > 0
        ) {

            segundos--;

        }

    }


    actualizar();


    setInterval(
        actualizar,
        1000
    );

}


iniciarTemporizadorSubasta();