import React from 'react';
import Cultivo from '../../components/CultivoCard/Cultivo';
import './CultivosPaisPage.css';

import images from "../../assets/images"
const { cafe2, mandarina, tomate_arbol } = images;


function CultivosPaisPage() {
    const cultivos = [
        {
            id: 1111,
            imagen: cafe2,
            nombre: "Café Barako",
            ubicacion: "Armenia, Quindío",
            diasRestantes: 5,
            cantidad: "7-10 Toneladas",
        },
        {
            id: 22222,
            imagen: mandarina,
            nombre: "Mandarina Oneco",
            ubicacion: "Yondó, Antioquia",
            diasRestantes: 60,
            cantidad: "12 Toneladas",
        },
        {
            id: 322,
            imagen: tomate_arbol,
            nombre: "Tomate de árbol",
            ubicacion: "Acacías, Meta",
            diasRestantes: 8,
            cantidad: "5 Toneladas",
        },
        {
            id: 1211,
            imagen: cafe2,
            nombre: "Café Barako",
            ubicacion: "Armenia, Quindío",
            diasRestantes: 5,
            cantidad: "7-10 Toneladas",
        },
        {
            id: 22122,
            imagen: mandarina,
            nombre: "Mandarina Oneco",
            ubicacion: "Yondó, Antioquia",
            diasRestantes: 60,
            cantidad: "12 Toneladas",
        },
        {
            id: 32412,
            imagen: tomate_arbol,
            nombre: "Tomate de árbol",
            ubicacion: "Acacías, Meta",
            diasRestantes: 8,
            cantidad: "5 Toneladas",
        }
    ]

    return (
        <div>
            <div className='title-group'>
                <h2 className='title'>Cultivos en Colombia</h2>
            </div>

            <div className='cultivos-page-container'>
                <div className='elements-group'>
                    {cultivos.map(cultivo =>
                        <Cultivo key={cultivo.id} info={cultivo}>
                            <button>Detalles</button>
                            <button>¡Recoger!</button>
                        </Cultivo>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CultivosPaisPage;