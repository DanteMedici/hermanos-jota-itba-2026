// Variables para paths en Header y Footer
const scriptUrl = new URL(document.currentScript.src);
const projectRoot = new URL("../", scriptUrl);

async function loadHeader() {
    const resp = await fetch(new URL("/vistas/layout/header.html", projectRoot));
    document.getElementById("header-placeholder").outerHTML = await resp.text();

    configureHeaderLinks();

    setActiveNavLink();
}

async function loadFooter() {
    const resp = await fetch(new URL("/vistas/layout/footer.html", projectRoot));
    document.getElementById("footer-placeholder").outerHTML = await resp.text();
    setFooterYear();
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll("#navbarNav .nav-link").forEach((link) => {
        if (new URL(link.href).pathname === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function setFooterYear() {
    const yearEl = document.getElementById("footer-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Función para configurar paths/rutas en Header
function configureHeaderLinks() {
    const homeLink = document.querySelector('[data-route="home"]');
    const productosLink = document.querySelector('[data-route="productos"]');
    const contactoLink = document.querySelector('[data-route="contacto"]');
    const logoLink = document.querySelector(".navbar-brand");
    const carritoLinks = document.querySelectorAll('[data-route="carrito"]');

    const logo = document.querySelector(".logo");
    logo.src = new URL("assets/logo/logo.svg", projectRoot);

    logoLink.href = new URL("index.html", projectRoot);

    homeLink.href = new URL("index.html", projectRoot);
    productosLink.href = new URL("vistas/productos.html", projectRoot);
    contactoLink.href = new URL("vistas/contacto.html", projectRoot);
    carritoLinks.forEach((link) => {
        link.href = new URL("vistas/carrito.html", projectRoot);
    })
}

loadHeader();
loadFooter();
