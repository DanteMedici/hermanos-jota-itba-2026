import "./ProductCard.styles.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ producto }) {
  const precio = producto.precio > 0
    ? `$${producto.precio.toLocaleString('es-AR')}`
    : 'Consultar precio';

  return (
    <Link
      to={`/productos/${producto.id}`}
      className="product-card"
      aria-label={`Ver detalle de ${producto.nombre}`}
    >
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

        <span className="product-card-link texto-titulo-cta">
          <span>Ver pieza</span>
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;