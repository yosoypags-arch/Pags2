let usuario = "";
let proyectos = [];

// Cargar proyectos guardados
window.onload = function () {
    const datos = localStorage.getItem("proyectosSegundoBasico");
    if (datos) {
        proyectos = JSON.parse(datos);
        mostrarProyectos();
    }
};

function guardarNombre() {
    usuario = document.getElementById("nombre").value;
    alert("Bienvenido " + usuario + ". Presiona Entrar para comenzar");
}

function agregarProyecto() {
    const nombreProyecto = document.getElementById("proyecto").value;
    if (nombreProyecto === "") return;

    proyectos.push({
        nombre: nombreProyecto,
        marcadoPor: ""
    });

    document.getElementById("proyecto").value = "";

    guardarDatos();
    mostrarProyectos();
}

function mostrarProyectos() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    proyectos.forEach((proyecto, index) => {
        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent =
            proyecto.nombre +
            (proyecto.marcadoPor ? " ✔ (" + proyecto.marcadoPor + ")" : "");

        texto.onclick = function () {
            if (proyecto.marcadoPor === "" && usuario !== "") {
                proyectos[index].marcadoPor = usuario;
                guardarDatos();
                mostrarProyectos();
            }
        };

        li.appendChild(texto);
        lista.appendChild(li);
    });
}


function borrarTodo() {
    const confirmar = confirm("¿Seguro que quieres borrar TODOS los proyectos?");
    if (confirmar) {
        proyectos = [];
        guardarDatos();
        mostrarProyectos();
    }
}

function guardarDatos() {
    localStorage.setItem(
        "proyectosSegundoBasico",
        JSON.stringify(proyectos)
    );
}
