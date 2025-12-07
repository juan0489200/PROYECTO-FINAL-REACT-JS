import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [cargaCompleta, setCargaCompleta] = useState(false);

  // Cargar carrito de localStorage 1 sola vez
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
    setCargaCompleta(true);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (cargaCompleta) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, cargaCompleta]);

  // Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id);

      if (existente) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });

    toast.success(`Producto ${producto.nombre} agregado al carrito`);
  };

  // Quitar 1 unidad
  const quitarCantidad = (id) => {
    const actualizado = carrito
      .map(item =>
        item.id === id
          ? { ...item, cantidad: (item.cantidad || 1) - 1 }
          : item
      )
      .filter(item => item.cantidad > 0);

    setCarrito(actualizado);
  };

  // Agregar 1 unidad
  const agregarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      )
    );
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  // Total $
  const total = carrito.reduce(
    (sum, item) => sum + Number(item.precio) * (item.cantidad || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        agregarCantidad,
        quitarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}
