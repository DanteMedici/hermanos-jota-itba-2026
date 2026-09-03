import {actualizarCantidad, eliminarDelCarrito, obtenerCarrito} from "./carrito.js";
import {productos} from "./productos.js";

const contenedorCarrito = document.getElementById("carrito-container");

const modalEliminarElement = document.getElementById("modalEliminarProducto");
const btnConfirmarEliminar = document.getElementById("confirmar-eliminar-producto");

let productoPendienteDeEliminar = null;

function renderizarCarrito() {
    if (!contenedorCarrito) return;

    const itemsCarrito = obtenerCarrito();

    // Estado vacío
    if (itemsCarrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">

                <span
                    class="carrito-vacio-icono"
                    aria-hidden="true"
                >
                    <i class="fa-solid fa-couch fa-3x"></i>
                </span>

                <h2 class="texto-titulo-elegante">
                    Tu selección aún está vacía
                </h2>

                <p class="texto-principal">
                    Redescubre el arte de vivir. Aún no has seleccionado
                    ninguna pieza para tu hogar, pero nuestra colección te está
                    esperando con muebles diseñados para perdurar.
                </p>

                <a
                    href="productos.html"
                    class="btn-carrito-explorar texto-titulo-cta"
                >
                    Explorar colección
                </a>

            </div>
        `;
        return;
    }

    // Estado con productos
    let html = `
        <section class="carrito-section" aria-labelledby="carrito-titulo">

            <h1
                id="carrito-titulo"
                class="carrito-titulo"
            >
                Tu carrito
            </h1>

            <ul class="list-unstyled m-0">
    `;

    let totalGeneral = 0;
    let resumenHtml = "";

    itemsCarrito.forEach((item) => {
        const productoCatalogo = productos.find((p) => p.id === item.id);
        if (!productoCatalogo) return;

        // Para el resumen del carrito
        const subtotal = productoCatalogo.precio * item.cantidad;

        totalGeneral += subtotal;

        resumenHtml += `
            <div class="carrito-resumen-fila">
                <span class="carrito-resumen-producto">
                    ${productoCatalogo.nombre}
                </span>
        
                <span>
                    ${item.cantidad}
                </span>
        
                <span>
                    $${productoCatalogo.precio.toLocaleString("es-AR")}
                </span>
        
                <span class="carrito-resumen-subtotal">
                    $${subtotal.toLocaleString("es-AR")}
                </span>
            </div>
        `;

        html += `
            <li class="carrito-item">

                <a
                    href="producto.html?id=${productoCatalogo.id}"
                    class="carrito-item-imagen-link"
                    aria-label="Ver ${productoCatalogo.nombre}"
                >
                    <img
                        src="../${productoCatalogo.imagen}"
                        alt="${productoCatalogo.nombre}"
                        class="carrito-item-img"
                    >
                </a>

                <div class="carrito-item-info">
                    <h2 class="carrito-item-nombre">
                        <a href="producto.html?id=${productoCatalogo.id}">
                            ${productoCatalogo.nombre}
                        </a>
                    </h2>
                
                    <p class="carrito-item-precio">
                        Precio a confirmar
                    </p>
                </div>

                <div class="carrito-item-actions">

                    <div
                        class="carrito-cantidad"
                        aria-label="Cantidad de ${productoCatalogo.nombre}"
                    >

                        <button
                            type="button"
                            class="btn-cantidad"
                            data-id="${productoCatalogo.id}"
                            data-action="decrease"
                            ${item.cantidad <= 1 ? "disabled" : ""}
                            aria-label="Disminuir cantidad de ${productoCatalogo.nombre}"
                        >
                            <i
                                class="fa-solid fa-minus"
                                aria-hidden="true"
                            ></i>
                        </button>

                        <span
                            class="carrito-cantidad-valor"
                            aria-live="polite"
                        >
                            ${item.cantidad}
                        </span>

                        <button
                            type="button"
                            class="btn-cantidad"
                            data-id="${productoCatalogo.id}"
                            data-action="increase"
                            aria-label="Aumentar cantidad de ${productoCatalogo.nombre}"
                        >
                            <i
                                class="fa-solid fa-plus"
                                aria-hidden="true"
                            ></i>
                        </button>

                    </div>

                    <button
                        type="button"
                        class="btn-eliminar-carrito"
                        data-id="${productoCatalogo.id}"
                        data-action="delete"
                        aria-label="Eliminar ${productoCatalogo.nombre} del carrito"
                    >
                        <i
                            class="fa-regular fa-trash-can"
                            aria-hidden="true"
                        ></i>
                    </button>

                </div>

            </li>
        `;
    });

    html += `
            </ul>
            
            <!-- Resumen de compra -->
            <div class="carrito-resumen">
                <h2 class="carrito-resumen-titulo texto-titulo-elegante">
                    Resumen de tu selección
                </h2>
    
                <div class="carrito-resumen-encabezado">
                    <span>Producto</span>
                    <span>Cantidad</span>
                    <span>Precio unitario</span>
                    <span>Subtotal</span>
                </div>
    
                <div class="carrito-resumen-tabla">
                    ${resumenHtml}
                </div>
    
                <div class="carrito-resumen-total">
                    <span>Total general</span>
    
                    <strong>
                        $${totalGeneral.toLocaleString("es-AR")}
                    </strong>
                </div>
            </div>
        </section>
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
            solicitarEliminacion(id);
        });
    });
}

// Confirmación de eliminación
function solicitarEliminacion(id) {
    productoPendienteDeEliminar = id;

    if (!modalEliminarElement) return;

    const modal = bootstrap.Modal.getOrCreateInstance(
        modalEliminarElement
    );

    modal.show();
}


btnConfirmarEliminar?.addEventListener("click", () => {
    if (productoPendienteDeEliminar === null) {
        return;
    }

    eliminarDelCarrito(productoPendienteDeEliminar);

    productoPendienteDeEliminar = null;

    const modal = bootstrap.Modal.getInstance(
        modalEliminarElement
    );

    modal?.hide();

    renderizarCarrito();
});


modalEliminarElement?.addEventListener(
    "hidden.bs.modal",
    () => {
        productoPendienteDeEliminar = null;
    }
);

renderizarCarrito();
