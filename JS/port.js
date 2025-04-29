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




    fetch("../JS/data/proyectos.json")
    .then(res => res.json())
    .then(data => {
        const proyectos = data.projects;
        const contenedor = document.getElementById("cards-container");

        proyectos.forEach(proy => {
        const card = document.createElement("div");
        card.classList.add("card");

        let contenidoBotones = "";

const repoEnProceso = proy.repositorio === "En proceso";
const demoEnProceso = proy.liveDemo === "En proceso";

if (repoEnProceso && demoEnProceso) {
    contenidoBotones = `<p class="estado">Por comenzar</p>`;
} else if (repoEnProceso || demoEnProceso) {
    contenidoBotones = `<p class="estado">En proceso</p>`;
    if (!repoEnProceso) {
        contenidoBotones += `<a href="${proy.repositorio}" class="btn-ver" target="_blank">Repositorio</a>`;
    }
    if (!demoEnProceso) {
        contenidoBotones += `<a href="${proy.liveDemo}" class="btn-ver" target="_blank">Ver Demo</a>`;
    }
} else {
    contenidoBotones = `
        <a href="${proy.repositorio}" class="btn-ver" target="_blank">Repositorio</a>
        <a href="${proy.liveDemo}" class="btn-ver" target="_blank">Ver Demo</a>
    `;
}

card.innerHTML = `
    <img src="${proy.imagen}" alt="Imagen del proyecto ${proy.name}" class="card-img" />
    <h3>${proy.name}</h3>
    <p>${proy.descripcion}</p>
    <p><strong>Tecnologías:</strong> ${proy.tecnologias.join(", ")}</p>
    ${contenidoBotones}
`;

        contenedor.appendChild(card);
        });
    });