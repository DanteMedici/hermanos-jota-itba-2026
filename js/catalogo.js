import { obtenerProductos } from "./productos.js";

document.addEventListener("DOMContentLoaded", async () => {
  const spinner = document.getElementById("spinner-carga");
  const sinResultados = document.getElementById("sin-resultados");
  const contenedor = document.getElementById("contenedor-productos");
  const inputBusqueda = document.getElementById("input-busqueda");
  const selectCategoria = document.getElementById("select-categoria");

  let productosOriginales = [];

  function normalizarTexto(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function crearTarjetaHTML(producto) {
    return `
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
  }

  function renderizarProductos(productos) {
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      sinResultados.classList.remove("d-none");
      return;
    }

    sinResultados.classList.add("d-none");
    contenedor.innerHTML = productos.map(crearTarjetaHTML).join("");
  }

  function aplicarFiltros() {
    const textoBusqueda = normalizarTexto(inputBusqueda.value);
    const categoriaSeleccionada = selectCategoria.value;

    const productosFiltrados = productosOriginales.filter((producto) => {
      const coincideCategoria =
        categoriaSeleccionada === "todos" ||
        producto.categoria === categoriaSeleccionada;

      const nombreNormalizado = normalizarTexto(producto.nombre);
      const descripcionNormalizada = normalizarTexto(producto.descripcion);
      const coincideBusqueda =
        textoBusqueda === "" ||
        nombreNormalizado.includes(textoBusqueda) ||
        descripcionNormalizada.includes(textoBusqueda);

      return coincideCategoria && coincideBusqueda;
    });

    renderizarProductos(productosFiltrados);
  }

  try {
    spinner.classList.remove("d-none");
    contenedor.innerHTML = "";

    productosOriginales = await obtenerProductos();

    spinner.classList.add("d-none");
    renderizarProductos(productosOriginales);

    inputBusqueda.addEventListener("input", aplicarFiltros);
    selectCategoria.addEventListener("change", aplicarFiltros);
  } catch (error) {
    spinner.classList.add("d-none");
    console.error(error);
  }
});
