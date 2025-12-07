import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Logo to="/" className="navbar-brand">SportsCommerce</Logo>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link">Servicios</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/productos" className="nav-link">Productos</NavLink>
              </li>

              {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <NavLinkAdmin to="/formulario-producto" className="nav-link">Agregar Producto</NavLinkAdmin>
                </li>
              )}
            </ul>

            <SeccionUsuario>

              <ContenedorCarrito>
                <IconoCarrito to="/pagar">
                  Carrito <FaShoppingCart />
                  {totalItemsCarrito > 0 && <ContadorCarrito>{totalItemsCarrito}</ContadorCarrito>}
                </IconoCarrito>
              </ContenedorCarrito>

              {isAuthenticated ? (
                <ContenedorUsuario>
                
                  <Bienvenida>Hola, {usuario.nombre}</Bienvenida>

                  {usuario.nombre === "admin" && (
                    <NavLinkAdmin to="/dashboard">Dashboard</NavLinkAdmin>
                  )}

                  <BotonCerrarSesion onClick={manejarCerrarSesion}>
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </ContenedorUsuario>
              ) : (
                <NavLink to="/iniciar-sesion">Iniciar Sesión</NavLink>
              )}

            </SeccionUsuario>

          </div>
        </div>
      </NavbarContainer>

      <NavbarSpacer />
    </>
  )
}

export default Navbar;

/* ========== STYLED COMPONENTS LIMPIOS ========== */

const NavbarContainer = styled.nav`
  background-color: #556B2F !important;
  padding: 0.5rem 1rem;
`;

const NavbarSpacer = styled.div`
  height: 80px;

  @media (max-width: 991.98px) {
    height: 76px;
  }
`;

const Logo = styled(Link)`
  color: white !important;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: white !important;
  }
`;

const NavLink = styled(Link)`
  color: white !important;
  text-decoration: none;
  padding: 0.5rem 1rem;

  &:hover {
    color: gold !important;
  }
`;

const NavLinkAdmin = styled(Link)`
  color: yellow !important;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-decoration: none;

  &:hover {
    color: white !important;
  }
`;

const SeccionUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 991.98px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 991.98px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Bienvenida = styled.span`
  color: white;
  font-size: 0.9rem;
`;

const BotonCerrarSesion = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 1rem;

  &:hover {
    background: white;
    color: #556B2F;
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconoCarrito = styled(Link)`
  position: relative;  
  color: white !important;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  padding: 0.5rem;

  &:hover {
    color: gold !important;
  }
`;

const ContadorCarrito = styled.span`
  background: red;
  color: white;
  font-size: 0.75rem;
  border-radius: 50%;
  padding: 3px 7px;
  position: absolute;
  top: -5px;
  right: -10px;
`;

