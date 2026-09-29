import "./ProductCard.styles.css";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregarAlCarrito }) {
  const precio = producto.precio > 0
    ? `$${producto.precio.toLocaleString('es-AR')}`
    : 'Consultar precio';

  return (
    <article className="product-card">
      <figure className="product-card-figure">
        <img
          className="product-card-image"
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
        />
      </figure>

      <div className="product-card-content">
        <p className="product-card-categoria texto-secundario-leyenda">
          {producto.categoria}
        </p>

        <h3 className="product-card-nombre">
          {producto.nombre}
        </h3>

        <p className="product-card-precio">
          {precio}
        </p>

        <Link
          to={`/productos/${producto.id}`}
          className="product-card-link texto-titulo-cta"
          aria-label={`Ver detalle de ${producto.nombre}`}
        >
          <span>Ver pieza</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>

        {onAgregarAlCarrito && (
          <button
            type="button"
            className="btn btn-marca-primario product-card-btn-carrito texto-titulo-cta"
            aria-label={`Añadir ${producto.nombre} al carrito`}
            onClick={() => onAgregarAlCarrito(producto)}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            <span>Añadir al carrito</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;