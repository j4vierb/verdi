import React from "react";
import "./HeroSection.css";
import backgroundImage from "./foto2.jpg"; // Imagen en la misma carpeta

const HeroSection = () => {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div>
                <h1 className="titulo">¡Bienvenidos al campo!</h1>
                <p className="subtitulo">
                        Únete ahora mismo a la red más grande de agricultores del país y compra
                        tus productos en un solo lugar.
                </p>
                <div className="seccion-boton">
                    <button className="hero-button">¡Empieza Ahora!</button>
                </div>
                
            </div>
            
        </section>
    );
};

export default HeroSection;
