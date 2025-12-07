import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function RutaProtegida({ children, soloAdmin = false }) {
  const { isAuthenticated, esAdmin, cargando } = useAuthContext();
  const location = useLocation();

  
  if (cargando) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/iniciar-sesion"
        replace
        state={{ from: location }} // guarda a dónde quería entrar
      />
    );
  }

   if (soloAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;