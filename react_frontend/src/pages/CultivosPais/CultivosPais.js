import React, { useState, useEffect } from 'react';
import Cultivo from './Cultivo';
import './CultivosPais.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./CultivosMessages";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

function calcularDiasRestantes(fechaRecoleccion) {
    const hoy = new Date();
    const recoleccion = new Date(fechaRecoleccion);
    const diferenciaMs = recoleccion - hoy;
    return Math.max(0, Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24)));
}


function CultivosPais() {
    const locale = getBrowserLanguage();
    const [cultivos, setCultivos] = useState([]);
    const [loading, setLoading] = useState(true);

    /* const cultivos = [{ imagen: cafeImage,
                        nombre: "Café Barako",
                        ubicacion: "Armenia, Quindío",
                        diasRestantes: 5,
                        cantidad: "7-10 Toneladas",
                        coordenadas: "4.342967732098409, -75.78285155768219",
                    },
                    {
                        imagen: mandarinaImage,
                        nombre: "Mandarina Oneco",
                        ubicacion: "Yondó, Antioquia",
                        diasRestantes: 30,
                        cantidad: "12 Toneladas",
                        coordenadas: "6.736519622113611, -74.17701981282846",
                    },
                    {
                        imagen: tomatearbolImage,
                        nombre: "Tomate de árbol",
                        ubicacion: "Acacías, Meta",
                        diasRestantes: 8,
                        cantidad: "5 Toneladas",
                        coordenadas: "3.982525881171788, -73.71440281867625",
                        
                    },
                    ]

    const listaCultivos = cultivos.map(cultivo => <Cultivo info={cultivo}></Cultivo>)
 */

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/api/v1/cosechas", {headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Datos recibidos:", data);
                const transformados = data.map(item => ({
                    imagen: item.imagen,
                    nombre: item.nombre,
                    ubicacion: "Ubicación no disponible",  // Puedes actualizar esto si luego viene del backend
                    diasRestantes: calcularDiasRestantes(item.fechaRecoleccion),
                    cantidad: `${item.cantidadKilos} Kilos`,
                    coordenadas: item.coordenadas,
                }));
                setCultivos(transformados);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar cultivos:", err);
                setLoading(false);
            });
    }, []);                   
    
    

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div>
                <div className='title-groupRR'>
                    <p className='titleR'><FormattedMessage id="title" /></p>
                </div>

                <div className='elements-groupRR'>
                    {loading ? (
                        <p><FormattedMessage id="loading" defaultMessage="Cargando cultivos..." /></p>
                    ) : (
                        cultivos.map(cultivo => <Cultivo key={cultivo.nombre} info={cultivo} />)
                    )}
                </div>
            </div>
        </IntlProvider>
    );
}

export default CultivosPais