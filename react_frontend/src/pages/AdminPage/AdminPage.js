import React, { useState } from "react";
import GeneralStats from "../../components/GeneralStats/GeneralStats";
import StatsChart from "../../components/StatsChart/StatsChart";
import OrdersChart from "../../components/OrdersChart/OrdersChart";
import ReviewsCarousel from "../../components/ReviewsCarousel/ReviewsCarousel";
import PedidosList from "../../components/PedidosList/PedidosList";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./AdminPageMessages";
import "./AdminPage.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const AdminPage = () => {
    const [seccionSeleccionada, setSeccionSeleccionada] = useState("General");
    const [locale] = useState(getBrowserLanguage());

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="admin-page">
                {/* Menú de navegación */}
                <div className="menu-admin">
                    <h2><FormattedMessage id="admin_panel" /></h2>
                    <div className="menu-opciones">
                        <button 
                            className={seccionSeleccionada === "General" ? "activo" : ""}
                            onClick={() => setSeccionSeleccionada("General")}
                        >
                            <FormattedMessage id="general" />
                        </button>
                        <button 
                            className={seccionSeleccionada === "Pedidos" ? "activo" : ""}
                            onClick={() => setSeccionSeleccionada("Pedidos")}
                        >
                            <FormattedMessage id="orders" />
                        </button>
                    </div>
                </div>

                {/* Secciones */}
                {seccionSeleccionada === "General" && (
                    <div className="contenedor-general">
                        <GeneralStats />
                        <div className="graficas">
                            <StatsChart />
                            <OrdersChart />
                        </div>
                        <ReviewsCarousel />
                    </div>
                )}

                {seccionSeleccionada === "Pedidos" && <PedidosList />}
            </div>
        </IntlProvider>
    );
};

export default AdminPage;
