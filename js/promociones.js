const promocionesBase = [

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



function promocionesDisponibles() {

    let promociones =
        JSON.parse(
            localStorage.getItem(
                "promocionesAdmin"
            )
        );


    if (!promociones) {

        promociones =
            promocionesBase;


        localStorage.setItem(
            "promocionesAdmin",
            JSON.stringify(promociones)
        );

    }


    return promociones;

}



function mostrarPromocionesPublicas() {

    const contenedor =
        document.getElementById(
            "promociones-dinamicas"
        );


    if (!contenedor) {

        return;

    }


    const promociones =
        promocionesDisponibles()
            .filter(
                function(promocion) {

                    return promocion.activa;

                }
            );


    contenedor.innerHTML =
        "";


    promociones.forEach(
        function(promocion) {

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


            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "promocion-tarjeta";


            tarjeta.innerHTML = `

                <span class="promocion-descuento">
                    ${descuento}
                </span>

                <p class="promocion-tipo">
                    PROMOCIÓN
                </p>

                <h2>
                    ${promocion.nombre}
                </h2>

                <p>
                    ${promocion.descripcion}
                </p>

                <div class="promocion-codigo">
                    ${promocion.codigo}
                </div>

            `;


            contenedor.appendChild(
                tarjeta
            );

        }
    );

}



function actualizarCuponAplicado() {

    const contenedor =
        document.getElementById(
            "estado-cupon-aplicado"
        );


    if (!contenedor) {

        return;

    }


    const codigo =
        localStorage.getItem(
            "codigoPromocion"
        );


    if (!codigo) {

        contenedor.innerHTML =
            "";

        return;

    }


    contenedor.innerHTML = `

        <div
            style="
                margin-top:15px;
                padding:16px;
                background:#101012;
                border:1px solid #29292e;
                border-radius:8px;
            "
        >

            <p
                style="
                    margin-bottom:12px;
                    color:#aaaab0;
                "
            >
                Cupón aplicado:
                <strong style="color:white;">
                    ${codigo}
                </strong>
            </p>


            <button
                type="button"
                id="quitar-cupon"
                class="boton boton-secundario"
            >
                Quitar cupón
            </button>

        </div>

    `;


    document.getElementById(
        "quitar-cupon"
    ).addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "codigoPromocion"
            );


            actualizarCuponAplicado();


            mostrarMensajePromocion(
                "Cupón eliminado correctamente."
            );

        }
    );

}



function mostrarMensajePromocion(
    texto
) {

    const mensaje =
        document.getElementById(
            "mensaje-promocion"
        );


    mensaje.textContent =
        texto;


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



document.getElementById(
    "aplicar-promocion"
).addEventListener(
    "click",
    function() {

        const codigo =
            document.getElementById(
                "codigo-promocion"
            ).value
                .trim()
                .toUpperCase();


        const promociones =
            promocionesDisponibles();


        const promocion =
            promociones.find(
                function(elemento) {

                    return (
                        elemento.activa &&
                        elemento.codigo
                            .toUpperCase() ===
                        codigo
                    );

                }
            );


        if (!promocion) {

            mostrarMensajePromocion(
                "El código no está disponible."
            );


            return;

        }


        localStorage.setItem(
            "codigoPromocion",
            promocion.codigo
        );


        actualizarCuponAplicado();


        mostrarMensajePromocion(
            "Cupón aplicado correctamente."
        );

    }
);


mostrarPromocionesPublicas();

actualizarCuponAplicado();