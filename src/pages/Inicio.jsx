import { Link } from "react-router-dom";

function Inicio() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-white pb-5">
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-7 fw-bold text-dark mb-2">
       <span className="text-primary" text-center>Equipate como un profesional</span>
        </h1>
        <p className="lead text-secondary">
          Descubrí lo mejor en artículos e indumentaria deportiva
        </p>
        <Link to="/productos" className="btn btn-outline-primary btn-lg mt-4">
          Ver productos
        </Link>
      </div>
    </main>
  );
}

export default Inicio;