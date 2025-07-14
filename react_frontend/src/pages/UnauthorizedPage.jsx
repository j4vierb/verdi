// src/pages/UnauthorizedPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./UnauthorizedPage.css";
import noAutorizadoImg from "../assets/images/noAutorizado.png";

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <img src={noAutorizadoImg} alt="Sin permisos" className="unauthorized-img" />
      <h1>No tienes permisos para acceder</h1>
      <p>Por favor inicia sesión con una cuenta que tenga el rol necesario.</p>

      <div className="button-group">
        <Link to="/login" className="unauthorized-button">
          Iniciar Sesión
        </Link>
        <Link to="/registrarse" className="unauthorized-button secundario">
          Crear cuenta como agricultor o comprador
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;