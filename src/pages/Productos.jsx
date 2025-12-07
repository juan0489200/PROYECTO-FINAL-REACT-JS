import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useCartContext();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          "https://68dd7171d7b591b4b78c78d3.mockapi.io/api/Articulos"
        );
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, []);

  if (cargando) return <p className="text-center mt-5">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={producto.avatar}
                className="card-img-top"
                alt={producto.nombre}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="fw-bold">Precio: ${producto.precio}</p>

                <div className="mt-auto">
                  <Link
                    to={`/productos/${producto.categoria || "sin-categoria"}/${producto.id}`}
                    state={{ producto }}
                    className="btn btn-primary me-2"
                  >
                    Más detalles
                  </Link>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="btn btn-success"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
