import React from "react";
import { Link } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./HistorialMessages";
import "./Historial.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const Historial = () => {
    const locale = getBrowserLanguage();

    const compras = [
        {
            id: 1,
            nombre: "Manzanas",
            cantidad: "2 Kilos",
            fechaCompra: "2024-03-10",
            fechaEntrega: "2024-03-12",
            precio: "$10.000.00",
            imagen: "https://www.saborusa.com/wp-content/uploads/2019/10/manzana-roja-cesta.webp",
        },
        {
            id: 2,
            nombre: "Moras",
            cantidad: "1 Tonelada",
            fechaCompra: "2024-03-08",
            fechaEntrega: "2024-03-11",
            precio: "$1.500.000.00",
            imagen: "https://s1.elespanol.com/2021/05/13/ciencia/nutricion/580953164_185057529_1706x1280.jpg",
        },
        {
            id: 3,
            nombre: "Naranjas",
            cantidad: "5 Kilos",
            fechaCompra: "2024-03-05",
            fechaEntrega: "2024-03-09",
            precio: "$45.000.00",
            imagen: "https://citrofrut.com/noticias/wp-content/uploads/2023/02/shutterstock_173674910-scaled.jpg",
        },
    ];

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div>
                {/* Barra de navegación superior */}
                <div className="perfil-navbar">
                    <Link to="/perfil" className="perfil-tab">
                        <FormattedMessage id="datos" />
                    </Link>
                    <Link to="/historial" className="perfil-tab active">
                        <FormattedMessage id="historial" />
                    </Link>
                    <Link to="/cosechas" className="perfil-tab">
                        <FormattedMessage id="misProductos" />
                    </Link>
                    <Link to="/vende" className="perfil-tab">
                        <FormattedMessage id="nuevaVenta" />
                    </Link>
                </div>

                <div className="historial-container">
                    <h2>
                        <FormattedMessage id="historial" />
                    </h2>
                    <div className="compras-grid">
                        {compras.map((compra) => (
                            <div key={compra.id} className="compra-card">
                                <img src={compra.imagen} alt={compra.nombre} className="producto-img" />
                                <h3>{compra.nombre}</h3>
                                <p>
                                    <strong>
                                        <FormattedMessage id="cantidad" />:
                                    </strong> {compra.cantidad}
                                </p>
                                <p>
                                    <strong>
                                        <FormattedMessage id="fechaCompra" />:
                                    </strong> {compra.fechaCompra}
                                </p>
                                <p>
                                    <strong>
                                        <FormattedMessage id="fechaEntrega" />:
                                    </strong> {compra.fechaEntrega}
                                </p>
                                <p className="precio">
                                    <strong>
                                        <FormattedMessage id="precio" />:
                                    </strong> {compra.precio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </IntlProvider>
    );
};

export default Historial;
