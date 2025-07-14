/* import { useNavigate } from "react-router-dom";
import { useState } from "react";
import images from '../../assets/images.js';
import './Cosechas.css'; */
/* import Cosecha from './Cosecha.js';
import FormularioModificacion from "./FormularioModificacion.js";

import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./CosechasMessages.js";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};


const cafeImage = images.cafe2;

function Cosechas() {

    const locale = getBrowserLanguage();
    const navigate = useNavigate(); */ 
    // Hook para la navegación

    /* const [cultivos, setCultivos] = useState([
        {
          imagen: cafeImage,
          nombre: "Café Barako 1",
          fechaRecoleccion: new Date(2025, 10, 18),
          cantidad: 7,
          vendida: 2,
        },
        {
          imagen: cafeImage,
          nombre: "Café Barako 2",
          fechaRecoleccion: new Date(2025, 12, 20),
          cantidad: 12,
          vendida: 4,
        },
        {
          imagen: cafeImage,
          nombre: "Café Barako 3",
          fechaRecoleccion: new Date(2025, 5, 20),
          cantidad: 7,
          vendida: 2,
        },
    ]); */

/*     const listaCultivos = cultivos.map((cultivo, index) => (
        <Cosecha info={cultivo} key={index} onModificar={() => abrirModal(index)}/>
    ));

    const [modalOpen, setModalOpen] = useState(false);
    const [cultivoSeleccionado, setCultivoSeleccionado] = useState(null);

    const abrirModal = (index) => {
        setCultivoSeleccionado(index);
        setModalOpen(true);
    };
    
    const cerrarModal = () => {
        setModalOpen(false);
        setCultivoSeleccionado(null);
    }; */

    // Guardar cambios de cantidad
    /* const guardarCantidad = (nuevaCantidad) => {
        if (cultivoSeleccionado === null) return;
        const copia = [...cultivos];
        copia[cultivoSeleccionado].cantidad = nuevaCantidad;
        setCultivos(copia);
        cerrarModal();
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            
            <div className="title-groupR">
                <div className="title-container">
                    <p className="titleR"><FormattedMessage id="title" /></p>
                    <button className="feedback-button" onClick={() => navigate("/comentarios")}>
                        <FormattedMessage id="cosechas-retroalimentacion.ver" />
                    </button>
                </div>
            </div>
            <div className="elements-groupR">
                {listaCultivos} </div>

                {modalOpen && cultivoSeleccionado !== null && (
                    <div className="modal-overlay" onClick={cerrarModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Modificar cultivo</h2>
                                <p>
                                    Cantidad de{" "}
                                    <strong>{cultivos[cultivoSeleccionado].nombre}</strong>
                                </p>

                                <FormularioModificacion
                                    cantidadActual={cultivos[cultivoSeleccionado].cantidad}
                                    onCancelar={cerrarModal}
                                    onGuardar={guardarCantidad}
                                />
                        </div>
                    </div>
                
                )}

        </IntlProvider>
    );
}

export default Cosechas;
 */


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import images from '../../assets/images.js';
import './Cosechas.css';
import Cosecha from './Cosecha.js';
import FormularioModificacion from "./FormularioModificacion.js";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./CosechasMessages.js";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const cafeImage = images.cafe2;

function Cosechas() {
    const locale = getBrowserLanguage();
    const navigate = useNavigate();
    
    const [cultivos, setCultivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [cultivoSeleccionado, setCultivoSeleccionado] = useState(null);

    // Fetch desde el backend
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:3000/api/v1/cosechas/mias", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("Cosechas recibidas:", data);
            const transformados = data.map(item => ({
                imagen: item.imagen || cafeImage,
                nombre: item.nombre,
                fechaRecoleccion: new Date(item.fechaRecoleccion),
                cantidad: item.cantidadKilos,
                vendida: item.cantidadVendidas
            }));
            setCultivos(transformados);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error al cargar cosechas del agricultor:", err);
            setLoading(false);
        });
    }, []);

    const abrirModal = (index) => {
        setCultivoSeleccionado(index);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setCultivoSeleccionado(null);
    };

    const guardarCantidad = (nuevaCantidad) => {
        if (cultivoSeleccionado === null) return;
        const copia = [...cultivos];
        copia[cultivoSeleccionado].cantidad = nuevaCantidad;
        setCultivos(copia);
        cerrarModal();
    };

    const listaCultivos = cultivos.map((cultivo, index) => (
        <Cosecha info={cultivo} key={index} onModificar={() => abrirModal(index)} />
    ));

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="title-grouppR">
                <div className="title-container">
                    <p className="titleR"><FormattedMessage id="title" /></p>
                    <button className="feedback-button" onClick={() => navigate("/comentarios")}>
                        <FormattedMessage id="cosechas-retroalimentacion.ver" />
                    </button>
                </div>
            </div>

            <div className="elements-groupR">
                {loading ? (
                    <p>Cargando cosechas...</p>
                ) : listaCultivos}
            </div>

            {modalOpen && cultivoSeleccionado !== null && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Modificar cultivo</h2>
                        <p>
                            Cantidad de{" "}
                            <strong>{cultivos[cultivoSeleccionado].nombre}</strong>
                        </p>

                        <FormularioModificacion
                            cantidadActual={cultivos[cultivoSeleccionado].cantidad}
                            onCancelar={cerrarModal}
                            onGuardar={guardarCantidad}
                        />
                    </div>
                </div>
            )}
        </IntlProvider>
    );
}

export default Cosechas;