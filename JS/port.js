const d = document

const $botonTrabajemos = d.querySelector(".cta"),
    $nuevoContenido = d.querySelector(".nuevo-contenido"),
    $nuevoBoton = d.querySelector("#nuevo-boton");
    $mensaje = d.querySelector(".mensaje"),
    $mensajeResumen = d.querySelector(".mensaje-resumen"),
    $imagen = d.querySelector(".image-container"),

$botonTrabajemos.addEventListener("click", (e) => {
    e.preventDefault(); 
    $mensaje.classList.add("fade-out");
    setTimeout(() => {
        $nuevoContenido.classList.remove("oculto");
        $nuevoContenido.classList.add("mostrar");
        $nuevoBoton.textContent = "Ver Servicios"; 
        $nuevoContenido.style.display = "block"; 
        $nuevoContenido.classList.remove("fade-out"); 
        $mensaje.style.display = "none"; 
    }, 500);

    $nuevoBoton.setAttribute("href", "../html/servicios.html");

    
    setTimeout(() => {
        $mensaje.classList.add("fade-out"); 
    }, 300); 
});