import React from "react";
import "./VentaCompraSection.css";
import { FaTruck, FaShoppingCart, FaMapMarkerAlt, FaMotorcycle, FaSearchDollar, FaSeedling } from "react-icons/fa";
import { Link } from "react-router-dom";

const VentaCompraSection = () => {
    return (
        <section className="venta-compra-section">
            {/*Agricultores */}
            <div className="section-block">
                <p className="section-subtitle">Para nuestros agricultores</p>
                <h2 className="section-title">Vende tus cultivos de manera fácil y directa</h2>
                <div className="icon-grid">
                    <div className="icon-item">
                        <FaSeedling className="icon" />
                        <p>Publica tus cultivos</p>
                    </div>
                    <div className="icon-item">
                        <FaTruck className="icon" />
                        <p>Recibe pedidos y coordina la entrega</p>
                    </div>
                    <div className="icon-item">
                        <FaSearchDollar className="icon" />
                        <p>Obtén información del mercado</p>
                    </div>
                </div>
                <Link to="/vende" className="cta-button">Quiero vender</Link>
            </div>

            <hr className="divider" />

            {/* Compradores */}
            <div className="section-block">
                <p className="section-subtitle">Para nuestros compradores</p>
                <h2 className="section-title">Compra productos frescos y locales</h2>
                <div className="icon-grid">
                    <div className="icon-item">
                        <FaShoppingCart className="icon" />
                        <p>Explora y compra productos frescos</p>
                    </div>
                    <div className="icon-item">
                        <FaMapMarkerAlt className="icon" />
                        <p>Conoce el origen de tus alimentos</p>
                    </div>
                    <div className="icon-item">
                        <FaMotorcycle className="icon" />
                        <p>Recibe tu pedido donde lo necesites</p>
                    </div>
                </div>
                <Link to="/compra" className="cta-button">Quiero comprar</Link>
            </div>
        </section>
    );
};

export default VentaCompraSection;
