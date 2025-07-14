import './Cultivo.css';
import React, { useState } from "react";

function Cultivo(props) {

    let estadoCritico = props.info.diasRestantes < 20 ? <p className='card-estadoR'>Estado Critico</p> : <p className='card-estadoR'></p>

    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const abrirDetalles = () => setMostrarDetalles(true);
    const cerrarDetalles = () => setMostrarDetalles(false);

    const encodedUbicacion = encodeURIComponent(props.info.coordenadas);

    const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBEMaVca0ylcLoq-i0to3xfD47y0i7O-QU&q=${encodedUbicacion}`;

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedUbicacion}`;
    
    return(
        <div className='card-cultivoR'>
            <img src={props.info.imagen} alt="imagen cultivo" className='imagen-cardR'></img>
            <p className='card-titleR'>{props.info.nombre}</p>
            <p className='card-infoR'>{props.info.ubicacion}</p>
            <p className='card-infoR' id='card-cantidad'>{props.info.cantidad}</p>
            <p className='card-timeR'>¡Quedan {`${props.info.diasRestantes}`} días para la cosecha!</p>
            {estadoCritico}

            <div className='card-buttonsR'>
                {/* Botón que abre el modal */}
                <button onClick={abrirDetalles}>Detalles</button>
                <button>¡Recoger!</button>
            </div>






            {/* MODAL - solo se muestra si `mostrarDetalles` es true */}
      {mostrarDetalles && (
        <div className="modal-overlay" onClick={cerrarDetalles}>
          {/* Evitamos que el clic dentro del modal lo cierre */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ backgroundColor: "#0B2D21", color: "white", padding: "1rem" }}>
              Detalles del Cultivo
            </h2>

            <h3>Ubicación de {props.info.nombre}</h3>

            {/* Mapa embebido en un iframe */}
            <iframe
              title="Ubicación del Cultivo"
              width="400"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={googleMapsEmbedUrl}
            ></iframe>

            <p>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  color: "#0B2D21",
                  fontWeight: "bold"
                }}
              >
                Abrir en Google Maps
              </a>
            </p>

            {/* Botón para cerrar */}
            <button
              style={{ marginTop: "1rem" }}
              onClick={cerrarDetalles}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
            
    </div>
        
    )
}

export default Cultivo