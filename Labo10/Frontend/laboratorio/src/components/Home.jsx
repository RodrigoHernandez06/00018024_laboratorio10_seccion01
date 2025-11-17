import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenido al Sistema de Gestión de Ventas</h2>
      <p className="home-subtitle">Seleccione una opción del menú superior para comenzar</p>

      <div className="cards-container">
        <Link to="/customers" className="card-link">
          <div className="card">
            <div className="card-icon">👥</div>
            <h3 className="card-title">Clientes</h3>
            <p className="card-description">Ver lista de todos los clientes registrados</p>
          </div>
        </Link>

        <Link to="/new-sale" className="card-link">
          <div className="card">
            <div className="card-icon">💰</div>
            <h3 className="card-title">Nueva Venta</h3>
            <p className="card-description">Registrar una nueva venta</p>
          </div>
        </Link>

        <Link to="/sales" className="card-link">
          <div className="card">
            <div className="card-icon">🛒</div>
            <h3 className="card-title">Ventas</h3>
            <p className="card-description">Ver historial de ventas</p>
          </div>
        </Link>

        <Link to="/search" className="card-link">
          <div className="card">
            <div className="card-icon">🔍</div>
            <h3 className="card-title">Buscar</h3>
            <p className="card-description">Buscar cliente por código</p>
          </div>
        </Link>

        <Link to="/report" className="card-link">
          <div className="card">
            <div className="card-icon">📊</div>
            <h3 className="card-title">Reporte</h3>
            <p className="card-description">Ver reporte de ventas</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
