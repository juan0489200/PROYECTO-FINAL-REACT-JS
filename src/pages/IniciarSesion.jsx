import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();

    const { nombre, email } = formulario;

    // --- ADMIN ---
    if (nombre === "admin" && email === "1234@admin") {
      iniciarSesion("admin", email);

      return navigate("/dashboard", { replace: true });
    }

    // --- USUARIO NORMAL ---
    if (nombre.trim() && email.trim()) {
      iniciarSesion(nombre, email);

      // Si venía de una RutaProtegida, vuelve ahí
      const destino = location.state?.from?.pathname || "/productos";

      return navigate(destino, { replace: true });
    }

    alert("Credenciales incorrectas. Usa admin / 1234@admin para el administrador.");
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Inicia sesión para continuar</h1>

      <form onSubmit={manejarEnvio}>
        <input
          className="me-2"
          type="text"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={(e) =>
            setFormulario({ ...formulario, nombre: e.target.value })
          }
          required
        />

        <input
          className="me-2"
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) =>
            setFormulario({ ...formulario, email: e.target.value })
          }
          required
        />

        <hr />

        <button type="submit">Iniciar Sesión</button>

        <button type="button" className="ms-3" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>

      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <strong>¿No recuerdas tus credenciales de admin?</strong><br />
        admin / 1234@admin
      </p>
    </div>
  );
}