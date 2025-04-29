document.addEventListener('DOMContentLoaded', () => {
    // ——————————————
    // 1. Menú hamburguesa
    // ——————————————
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks  = document.querySelector('.nav-links');
    const overlay   = document.querySelector('.menu-overlay');
  
    if (toggleBtn && navLinks && overlay) {
      const toggleMenu = () => {
        const open = navLinks.classList.toggle('open');
        toggleBtn.classList.toggle('active', open);
        overlay.classList.toggle('active', open);
        document.body.classList.toggle('menu-open', open);
      };
  
      toggleBtn.addEventListener('click', toggleMenu);
      overlay.addEventListener('click', toggleMenu);
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
      });
    }
  
    // ——————————————
    // 2. Botón “Trabajemos juntos”
    // ——————————————
    const $botonTrabajemos  = document.querySelector('.cta');
    const $nuevoContenido    = document.querySelector('.nuevo-contenido');
    const $nuevoBoton        = document.querySelector('#nuevo-boton');
    const $mensaje           = document.querySelector('.mensaje');
  
    if ($botonTrabajemos && $nuevoContenido && $nuevoBoton && $mensaje) {
      $botonTrabajemos.addEventListener('click', e => {
        e.preventDefault();
        $mensaje.classList.add('fade-out');
        setTimeout(() => {
          $nuevoContenido.classList.remove('oculto');
          $nuevoContenido.classList.add('mostrar');
          $nuevoBoton.textContent = 'Ver Servicios';
          $nuevoContenido.style.display = 'block';
          $mensaje.style.display = 'none';
        }, 500);
        $nuevoBoton.setAttribute('href', '../html/servicios.html');
      });
    }
  
    // ——————————————
    // 3. Fetch proyectos dinámicos
    // ——————————————
    const contenedor = document.getElementById('cards-container');
    if (contenedor) {
      fetch('../JS/data/proyectos.json')
        .then(res => res.json())
        .then(data => {
          data.projects.forEach(proy => {
            const card = document.createElement('div');
            card.classList.add('card');
  
            // Lógica de botones según estado
            let botones = '';
            const repoEP = proy.repositorio === 'En proceso';
            const demoEP = proy.liveDemo === 'En proceso';
  
            if (repoEP && demoEP) {
              botones = `<p class="estado">Por comenzar</p>`;
            } else if (repoEP || demoEP) {
              botones = `<p class="estado">En proceso</p>`;
              if (!repoEP) botones += `<a href="${proy.repositorio}" class="btn-ver" target="_blank">Repositorio</a>`;
              if (!demoEP) botones += `<a href="${proy.liveDemo}" class="btn-ver" target="_blank">Ver Demo</a>`;
            } else {
              botones = `
                <a href="${proy.repositorio}" class="btn-ver" target="_blank">Repositorio</a>
                <a href="${proy.liveDemo}" class="btn-ver" target="_blank">Ver Demo</a>
              `;
            }
  
            card.innerHTML = `
              ${proy.imagen ? `<img src="${proy.imagen}" alt="Imagen ${proy.name}" class="card-img" />` : ''}
              <h3>${proy.name}</h3>
              <p>${proy.descripcion}</p>
              <p><strong>Tecnologías:</strong> ${proy.tecnologias.join(', ')}</p>
              ${botones}
            `;
            contenedor.appendChild(card);
          });
        })
        .catch(err => console.error('Error cargando proyectos:', err));
    }
  });
  