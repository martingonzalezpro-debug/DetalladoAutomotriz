const promocionesIniciales = [

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
            "Obtén 15% de descuento en el servicio Interior Completo.",
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



function mostrarAvisoAdmin(
    texto
) {

    let aviso =
        document.getElementById(
            "aviso-admin-promociones"
        );


    if (!aviso) {

        aviso =
            document.createElement(
                "div"
            );


        aviso.id =
            "aviso-admin-promociones";


        aviso.style.position =
            "fixed";

        aviso.style.top =
            "25px";

        aviso.style.right =
            "25px";

        aviso.style.zIndex =
            "9999";

        aviso.style.padding =
            "16px 20px";

        aviso.style.backgroundColor =
            "#17271c";

        aviso.style.border =
            "1px solid #31563c";

        aviso.style.borderRadius =
            "8px";

        aviso.style.color =
            "#a9d8b7";

        aviso.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.35)";


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



function obtenerPromocionesAdmin() {

    let promociones =
        JSON.parse(
            localStorage.getItem(
                "promocionesAdmin"
            )
        );


    if (!promociones) {

        promociones =
            promocionesIniciales;


        guardarPromocionesAdmin(
            promociones
        );

    }


    return promociones;

}



function guardarPromocionesAdmin(
    promociones
) {

    localStorage.setItem(
        "promocionesAdmin",
        JSON.stringify(promociones)
    );

}



const formulario =
    document.getElementById(
        "formulario-promocion-admin"
    );


const contenedorFormulario =
    document.getElementById(
        "formulario-promocion-contenedor"
    );



function abrirFormulario() {

    contenedorFormulario.style.display =
        "block";


    contenedorFormulario.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



function cerrarFormulario() {

    contenedorFormulario.style.display =
        "none";


    formulario.reset();


    document.getElementById(
        "promocion-id"
    ).value =
        "";


    document.getElementById(
        "titulo-formulario-promocion"
    ).textContent =
        "Agregar promoción";

}



document.getElementById(
    "nueva-promocion"
).addEventListener(
    "click",
    function() {

        cerrarFormulario();

        abrirFormulario();

    }
);



document.getElementById(
    "cancelar-promocion"
).addEventListener(
    "click",
    function() {

        cerrarFormulario();


        mostrarAvisoAdmin(
            "Edición cancelada."
        );

    }
);



function mostrarPromocionesAdmin() {

    const contenedor =
        document.getElementById(
            "lista-promociones-admin"
        );


    const promociones =
        obtenerPromocionesAdmin();


    contenedor.innerHTML =
        "";


    promociones.forEach(
        function(promocion) {

            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.style.padding =
                "25px";

            tarjeta.style.marginBottom =
                "15px";

            tarjeta.style.backgroundColor =
                "#151518";

            tarjeta.style.border =
                "1px solid #29292e";

            tarjeta.style.borderRadius =
                "10px";


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


            let estado =
                "Activa";


            if (!promocion.activa) {

                estado =
                    "Inactiva";

            }


            tarjeta.innerHTML = `

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        gap:30px;
                        align-items:start;
                        flex-wrap:wrap;
                    "
                >

                    <div>

                        <p
                            style="
                                color:#c32947;
                                font-size:0.75rem;
                                font-weight:700;
                                letter-spacing:1px;
                                margin-bottom:8px;
                            "
                        >
                            ${promocion.codigo}
                        </p>

                        <h2>
                            ${promocion.nombre}
                        </h2>

                        <p
                            style="
                                margin-top:10px;
                                color:#99999f;
                            "
                        >
                            ${promocion.descripcion}
                        </p>

                        <p
                            style="
                                margin-top:15px;
                                color:#ffffff;
                            "
                        >
                            Descuento:
                            ${descuento}
                            · Aplica a:
                            ${promocion.aplicaA}
                            · ${estado}
                        </p>

                    </div>


                    <div
                        style="
                            display:flex;
                            gap:8px;
                        "
                    >

                        <button
                            type="button"
                            class="editar-promocion-admin"
                            data-id="${promocion.id}"
                        >
                            Editar
                        </button>


                        <button
                            type="button"
                            class="eliminar-promocion-admin"
                            data-id="${promocion.id}"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            `;


            contenedor.appendChild(
                tarjeta
            );

        }
    );


    activarAccionesPromociones();

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
                            obtenerPromocionesAdmin();


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
                            "promocion-id"
                        ).value =
                            promocion.id;


                        document.getElementById(
                            "promocion-nombre"
                        ).value =
                            promocion.nombre;


                        document.getElementById(
                            "promocion-codigo"
                        ).value =
                            promocion.codigo;


                        document.getElementById(
                            "promocion-descripcion"
                        ).value =
                            promocion.descripcion;


                        document.getElementById(
                            "promocion-tipo"
                        ).value =
                            promocion.tipo;


                        document.getElementById(
                            "promocion-valor"
                        ).value =
                            promocion.valor;


                        document.getElementById(
                            "promocion-aplica"
                        ).value =
                            promocion.aplicaA;


                        document.getElementById(
                            "promocion-activa"
                        ).value =
                            String(
                                promocion.activa
                            );


                        document.getElementById(
                            "titulo-formulario-promocion"
                        ).textContent =
                            "Editar promoción";


                        abrirFormulario();

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
                            obtenerPromocionesAdmin();


                        promociones =
                            promociones.filter(
                                function(promocion) {

                                    return (
                                        String(promocion.id) !==
                                        String(id)
                                    );

                                }
                            );


                        guardarPromocionesAdmin(
                            promociones
                        );


                        mostrarPromocionesAdmin();


                        mostrarAvisoAdmin(
                            "Promoción eliminada correctamente."
                        );

                    }
                );

            }
        );

}



formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        const promociones =
            obtenerPromocionesAdmin();


        const id =
            document.getElementById(
                "promocion-id"
            ).value;


        const datos = {

            nombre:
                document.getElementById(
                    "promocion-nombre"
                ).value,

            codigo:
                document.getElementById(
                    "promocion-codigo"
                ).value
                    .trim()
                    .toUpperCase(),

            descripcion:
                document.getElementById(
                    "promocion-descripcion"
                ).value,

            tipo:
                document.getElementById(
                    "promocion-tipo"
                ).value,

            valor:
                Number(
                    document.getElementById(
                        "promocion-valor"
                    ).value
                ),

            aplicaA:
                document.getElementById(
                    "promocion-aplica"
                ).value
                    .trim()
                    .toLowerCase(),

            activa:
                document.getElementById(
                    "promocion-activa"
                ).value ===
                "true"

        };


        if (id) {

            const promocion =
                promociones.find(
                    function(elemento) {

                        return (
                            String(elemento.id) ===
                            String(id)
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


            mostrarAvisoAdmin(
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


            mostrarAvisoAdmin(
                "Promoción agregada correctamente."
            );

        }


        guardarPromocionesAdmin(
            promociones
        );


        cerrarFormulario();


        mostrarPromocionesAdmin();

    }
);


mostrarPromocionesAdmin();