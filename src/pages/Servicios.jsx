import React from 'react'
import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <div>
    <h1>Servicios</h1>
    <hr />
    <p>En SportsCommerce te brindamos la mejor atención para que puedas comprar con confianza.
Ofrecemos envíos rápidos, productos originales, asesoramiento personalizado y un servicio pensado para mejorar tu experiencia deportiva.</p>
    <Link to="/"><button>Volver al Inicio</button></Link>

    </div>
  )
}

export default Servicios