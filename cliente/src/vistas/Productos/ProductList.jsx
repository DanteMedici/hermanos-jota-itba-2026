import { useState, useEffect } from "react";
import "./ProductList.styles.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { obtenerProductos } from "../../services/productosService";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        setCargando(true);
        setError(null);
        const data = await obtenerProductos();
        if (activo)
          setProductos(data);
      } catch (err) {
        if (activo)
          setError("No pudimos cargar el catálogo. Intentá nuevamente más tarde.");
      } finally {
        if (activo)
          setCargando(false);
      }
    }

    cargarProductos();

    // Evita actualizar el estado si el componente se desmontó antes de que la petición termine.
    return () => {
      activo = false;
    };
  }, []);

  return (
    <section className="productos-section" aria-labelledby="productos-title">
      <div className="container">
        <div className="productos-header mb-4">
          <p className="home-eyebrow texto-titulo-cta">Colección</p>
          <h1 id="productos-title" className="texto-titulo-elegante display-5 mb-3">
            Catálogo de Productos
          </h1>
        </div>

        {cargando && (
          <div className="text-center my-5" role="status" aria-live="polite">
            <div className="spinner-border" aria-hidden="true" />
            <p className="texto-principal mt-3">Cargando productos...</p>
          </div>
        )}

        {!cargando && error && (
          <div className="text-center my-5" role="alert">
            <p className="texto-principal">{error}</p>
          </div>
        )}

        {!cargando && !error && (
          <div className="row g-4" aria-live="polite">
            {productos.map((producto) => (
              <div key={producto.id} className="col-12 col-sm-6 col-lg-4">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;