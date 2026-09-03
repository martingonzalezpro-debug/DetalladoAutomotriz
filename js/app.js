const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const mensajeExito = document.getElementById("mensaje-exito");

        mensajeExito.classList.add("mostrar");

        formularioContacto.reset();

        setTimeout(function() {
            mensajeExito.classList.remove("mostrar");
        }, 4000);

    });

}