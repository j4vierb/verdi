import React from "react";
import "./AgricultoresSection.css";
import imagenTractor from "./tractor.png";  // Reemplaza con el nombre correcto
import imagenCampesino from "./campesino.png";  // Reemplaza con el nombre correcto

const AgricultoresSection = () => {
    return (
        <section className="agricultores-section">
            {/* Sección 1: Imagen Izquierda - Texto Derecha */}
            <div className="section-container">
                <img src={imagenTractor} alt="Tractor en el campo" className="section-image" />
                <div className="section-text">
                    <h2>¡Te conectamos directamente con agricultores colombianos!</h2>
                    <p>
                        Cuando compras en Verdi, estás apoyando directamente el progreso del 
                        campo colombiano y fomentando la industria agrícola en el país.
                    </p>
                </div>
            </div>

            {/* Sección 2: Fondo Oscuro - Texto Izquierda - Imagen Derecha */}
            <div className="section-container dark-section">
                <div className="section-text light-text">
                    <h2>¡Los apoyas directamente a ellos!</h2>
                    <p>
                        Verdi permite que los pequeños agricultores accedan al mercado y 
                        consigan precios mucho más competitivos que a través de intermediarios.
                    </p>
                </div>
                <img src={imagenCampesino} alt="Campesino en el campo" className="section-image" />
            </div>
        </section>
    );
};

export default AgricultoresSection;
