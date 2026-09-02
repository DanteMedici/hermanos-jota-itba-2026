import { obtenerCarrito, actualizarCantidad, eliminarDelCarrito } from "./carrito.js";
import { productos } from "./productos.js";

const contenedorCarrito = document.getElementById("carrito-container");

function renderizarCarrito() {
    if (!contenedorCarrito) return;

    const itemsCarrito = obtenerCarrito();

    // Estado vacío
    if (itemsCarrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="text-center py-5 my-5">
                <span class="fs-1 mb-4 d-block texto-marca-primario"><i class="fa-solid fa-couch"></i></span>
                <h2 class="texto-titulo-elegante mb-3 texto-marca-primario">Tu selección aún está vacía</h2>
                <p class="texto-principal mb-4 opacity-75 col-md-8 mx-auto">
                    Redescubre el arte de vivir. Aún no has seleccionado ninguna pieza para tu hogar, pero nuestra colección te está esperando con muebles diseñados para perdurar.
                </p>
                <a href="productos.html" class="btn texto-titulo-cta py-3 px-5 border-0 rounded-0 btn-marca-primario">
                    Explorar colección
                </a>
            </div>
        `;
        return;
    }

    // Estado con productos
    let html = `
        <div class="row mb-4">
            <div class="col-12">
                <h2 class="texto-titulo-elegante mb-4 texto-marca-primario">Tu Carrito</h2>
                <ul class="list-unstyled">
    `;

    itemsCarrito.forEach((item) => {
        const productoCatalogo = productos.find((p) => p.id === item.id);
        if (!productoCatalogo) return;

        html += `
            <li class="carrito-item py-3 d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                <img src="../${productoCatalogo.imagen}" alt="${productoCatalogo.nombre}" class="carrito-item-img">
                <div class="flex-grow-1">
                    <h3 class="texto-enfasis-subtitulo mb-1 texto-marca-primario fs-5">${productoCatalogo.nombre}</h3>
                    <p class="texto-secundario-leyenda mb-0 opacity-75">Precio a confirmar</p>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-3 mt-sm-0 gap-3">
                    <div class="carrito-controles-cantidad d-flex align-items-center bg-white border border-secondary border-opacity-25 rounded-1 p-1">
                        <button class="btn btn-cantidad p-1 border-0 d-flex align-items-center justify-content-center" data-id="${productoCatalogo.id}" data-action="decrease" ${item.cantidad <= 1 ? 'disabled' : ''} aria-label="Disminuir cantidad">
                            <i class="fa-solid fa-minus fs-6"></i>
                        </button>
                        <span class="mx-3 fw-medium texto-principal fs-6">${item.cantidad}</span>
                        <button class="btn btn-cantidad p-1 border-0 d-flex align-items-center justify-content-center" data-id="${productoCatalogo.id}" data-action="increase" aria-label="Aumentar cantidad">
                            <i class="fa-solid fa-plus fs-6"></i>
                        </button>
                    </div>
                    <button class="btn btn-link text-danger p-2 text-decoration-none d-flex align-items-center justify-content-center" data-id="${productoCatalogo.id}" data-action="delete" aria-label="Eliminar ${productoCatalogo.nombre}">
                        <i class="fa-regular fa-trash-can fs-5"></i>
                    </button>
                </div>
            </li>
        `;
    });

    html += `
                </ul>
            </div>
        </div>
    `;

    contenedorCarrito.innerHTML = html;

    // Asignar event listeners
    asignarEventos();
}

function asignarEventos() {
    const btnDecrease = contenedorCarrito.querySelectorAll('[data-action="decrease"]');
    const btnIncrease = contenedorCarrito.querySelectorAll('[data-action="increase"]');
    const btnDelete = contenedorCarrito.querySelectorAll('[data-action="delete"]');

    btnDecrease.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.getAttribute("data-id"));
            const item = obtenerCarrito().find(i => i.id === id);
            if (item && item.cantidad > 1) {
                actualizarCantidad(id, item.cantidad - 1);
                renderizarCarrito();
            }
        });
    });

    btnIncrease.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.getAttribute("data-id"));
            const item = obtenerCarrito().find(i => i.id === id);
            if (item) {
                actualizarCantidad(id, item.cantidad + 1);
                renderizarCarrito();
            }
        });
    });

    btnDelete.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.getAttribute("data-id"));
            eliminarDelCarrito(id);
            renderizarCarrito();
        });
    });
}

renderizarCarrito();
