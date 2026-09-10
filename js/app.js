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


const formularioRegistro = document.getElementById("formulario-registro");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const mensajeRegistro = document.getElementById("registro-exito");

        mensajeRegistro.classList.add("mostrar");

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1200);

    });

}


const formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const mensajeLogin = document.getElementById("login-exito");

        mensajeLogin.classList.add("mostrar");

        setTimeout(function() {
            window.location.href = "perfil.html";
        }, 1200);

    });

}