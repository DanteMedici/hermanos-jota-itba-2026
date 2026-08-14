async function loadHeader() {
    const resp = await fetch("/vistas/layout/header.html");
    document.getElementById("header-placeholder").outerHTML = await resp.text();
    setActiveNavLink();
}

async function loadFooter() {
    const resp = await fetch("/vistas/layout/footer.html");
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

loadHeader();
loadFooter();
