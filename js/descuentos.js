const promocionesDescuentoBase = [

    {
        id: 1,
        nombre: "10% en tu compra",
        codigo: "CHULO10",
        descripcion: "10% de descuento",
        tipo: "porcentaje",
        valor: 10,
        aplicaA: "todos",
        activa: true
    },

    {
        id: 2,
        nombre: "15% en Interior",
        codigo: "INTERIOR15",
        descripcion: "15% en Interior",
        tipo: "porcentaje",
        valor: 15,
        aplicaA: "interior",
        activa: true
    },

    {
        id: 3,
        nombre: "$50 en faros",
        codigo: "FAROS50",
        descripcion: "$50 en faros",
        tipo: "fijo",
        valor: 50,
        aplicaA: "faros",
        activa: true
    }

];



function obtenerPromocionesDescuento() {

    let promociones =
        JSON.parse(
            localStorage.getItem(
                "promocionesAdmin"
            )
        );


    if (!promociones) {

        promociones =
            promocionesDescuentoBase;


        localStorage.setItem(
            "promocionesAdmin",
            JSON.stringify(promociones)
        );

    }


    return promociones;

}



function calcularTotalesDinamicos(
    carrito
) {

    let subtotal =
        0;


    carrito.forEach(
        function(producto) {

            subtotal +=
                Number(producto.precio);

        }
    );


    const codigo =
        (
            localStorage.getItem(
                "codigoPromocion"
            ) || ""
        )
            .trim()
            .toUpperCase();


    const promociones =
        obtenerPromocionesDescuento();


    const promocion =
        promociones.find(
            function(elemento) {

                return (
                    elemento.activa &&
                    String(elemento.codigo)
                        .toUpperCase() ===
                    codigo
                );

            }
        );


    let descuento =
        0;


    if (promocion) {

        let baseDescuento =
            0;


        const aplica =
            String(
                promocion.aplicaA ||
                "todos"
            )
                .toLowerCase();


        if (
            aplica === "todos" ||
            aplica === "todo"
        ) {

            baseDescuento =
                subtotal;

        } else {

            carrito.forEach(
                function(producto) {

                    if (
                        producto.nombre
                            .toLowerCase()
                            .includes(aplica)
                    ) {

                        baseDescuento +=
                            Number(
                                producto.precio
                            );

                    }

                }
            );

        }


        if (
            promocion.tipo ===
            "porcentaje"
        ) {

            descuento =
                baseDescuento *
                (
                    Number(
                        promocion.valor
                    ) /
                    100
                );

        }


        if (
            promocion.tipo ===
            "fijo" &&
            baseDescuento > 0
        ) {

            descuento =
                Number(
                    promocion.valor
                );

        }

    }


    if (
        descuento >
        subtotal
    ) {

        descuento =
            subtotal;

    }


    return {

        subtotal:
            subtotal,

        descuento:
            descuento,

        total:
            subtotal -
            descuento,

        codigo:
            codigo,

        promocion:
            promocion

    };

}



function actualizarTotalCarritoDinamico() {

    const totalElemento =
        document.getElementById(
            "total-carrito"
        );


    if (!totalElemento) {

        return;

    }


    const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];


    const totales =
        calcularTotalesDinamicos(
            carrito
        );


    totalElemento.textContent =
        "$" +
        totales.total.toLocaleString(
            "es-MX",
            {
                maximumFractionDigits:
                    2
            }
        );


    let informacion =
        document.getElementById(
            "descuento-carrito-info"
        );


    if (!informacion) {

        informacion =
            document.createElement(
                "div"
            );


        informacion.id =
            "descuento-carrito-info";


        informacion.className =
            "descuento-carrito";


        totalElemento.insertAdjacentElement(
            "afterend",
            informacion
        );

    }


    if (
        totales.promocion
    ) {

        informacion.style.display =
            "block";


        informacion.innerHTML = `

            <p>
                Subtotal:
                $${totales.subtotal.toLocaleString("es-MX")}
            </p>

            <p class="descuento-verde">
                Cupón ${totales.codigo}:
                -$${totales.descuento.toLocaleString(
                    "es-MX",
                    {
                        maximumFractionDigits:
                            2
                    }
                )}
            </p>

        `;

    } else {

        informacion.style.display =
            "none";

    }

}



document.addEventListener(
    "DOMContentLoaded",
    function() {

        actualizarTotalCarritoDinamico();


        const lista =
            document.getElementById(
                "lista-carrito"
            );


        if (lista) {

            const observador =
                new MutationObserver(
                    function() {

                        actualizarTotalCarritoDinamico();

                    }
                );


            observador.observe(
                lista,
                {
                    childList: true,
                    subtree: true
                }
            );

        }

    }
);