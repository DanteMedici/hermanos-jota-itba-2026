import { obtenerProductos } from "./productos.js";

document.addEventListener("DOMContentLoaded", async () => {
  const spinner = document.getElementById("spinner-carga");
  const contenedor = document.getElementById("contenedor-productos");
  try {
    spinner.classList.remove("d-none");
    contenedor.innerHTML = "";
    const listaProductos = await obtenerProductos();
    spinner.classList.add("d-none");
    console.log("Productos cargados:", listaProductos);
    listaProductos.forEach((producto) => {
      contenedor.innerHTML += `
            <article class="col-12 col-sm-6 col-lg-4">
                <a href="./producto.html?id=${producto.id}" class="producto-card" aria-label="Ver detalle de ${producto.nombre}">
                    <figure class="producto-card-figure">
                        <img src="../${producto.imagen}" alt="${producto.nombre}" class="producto-card-image" loading="lazy">
                    </figure>
                    <div class="producto-card-content">
                        <span class="producto-card-categoria texto-secundario-leyenda">${producto.categoria}</span>
                        <h3 class="producto-card-nombre texto-enfasis-editorial">${producto.nombre}</h3>
                        <span class="producto-card-link texto-titulo-cta">Ver pieza <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
                    </div>
                </a>
            </article>
          `;
    });
  } catch (error) {
    spinner.classList.add("d-none");
    console.error(error);
  }
});
