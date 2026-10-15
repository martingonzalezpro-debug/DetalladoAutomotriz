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