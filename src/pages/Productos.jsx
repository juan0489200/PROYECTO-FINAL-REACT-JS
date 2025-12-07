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

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul id="lista-productos">
      {productos.map((producto) => (
        <li key={producto.id}>
          <h2>{producto.nombre}</h2>
          <br />
          Descripción: {producto.descripcion}
          <br />
          Precio: ${producto.precio}
          <br />
          <img src={producto.avatar} alt={producto.nombre} width="80%" />

          <Link
            to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`}
            state={{ producto }}
          >
            <button>Más detalles</button>
          </Link>

          <button onClick={() => agregarAlCarrito(producto)}>Comprar</button>
        </li>
      ))}
    </ul>
  );
}
s