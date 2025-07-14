import React from "react";
import { useNavigate } from "react-router-dom";
import "./EnConstruccionPage.css";

const EnConstruccion = () => {
    const navigate = useNavigate();

    return (
        <div className="en-construccion">
            <div className="contenido">
                <h1>🚧 En Construcción 🚧</h1>
                <p>Estamos trabajando para mejorar tu experiencia. Vuelve pronto.</p>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        </div>
    );
};

export default EnConstruccion;
