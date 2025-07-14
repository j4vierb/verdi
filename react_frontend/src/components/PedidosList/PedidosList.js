import React, { useState, useEffect, useMemo } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./PedidosListMessages";
import "./PedidosList.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const PedidosList = () => {
    const locale = getBrowserLanguage();

    const pedidos = useMemo(() => [
        { id: "#ff1245", distancia: 1, fecha: "12/05/21", status: "to_pick_up" },
        { id: "#ff1245", distancia: 2, fecha: "12/05/21", status: "to_pick_up" },
        { id: "#ff1245", distancia: 3, fecha: "12/05/21", status: "confirmed" },
        { id: "#ff1245", distancia: 0.5, fecha: "12/05/21", status: "delivered" },
        { id: "#ff1245", distancia: 4, fecha: "12/05/21", status: "cancelled" },
        { id: "#ff1245", distancia: 0.8, fecha: "12/05/21", status: "to_pick_up" },
    ], []);

    // Ordenar los pedidos por distancia (menor a mayor)
    const [pedidosOrdenados, setPedidosOrdenados] = useState([]);

    useEffect(() => {
        const ordenados = [...pedidos].sort((a, b) => a.distancia - b.distancia);
        setPedidosOrdenados(ordenados);
    }, [pedidos]);

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="pedidos-container">
                <h2><FormattedMessage id="pending_orders" /></h2>
                <table className="pedidos-table">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="id" /></th>
                            <th><FormattedMessage id="distance" /></th>
                            <th><FormattedMessage id="date" /></th>
                            <th><FormattedMessage id="status" /></th>
                        </tr>
                    </thead>
                    <tbody>
                    {pedidosOrdenados.map((pedido) => (
                    <tr key={`${pedido.id}-${pedido.fecha}`}>
                        <td className="pedido-id">{pedido.id}</td>
                        <td>{pedido.distancia} <FormattedMessage id="km" /></td>
                        <td>{pedido.fecha}</td>
                        <td className={`status ${pedido.status.replace(/\s+/g, "-").toLowerCase()}`}>
                        <FormattedMessage id={pedido.status} />
                        </td>
                    </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </IntlProvider>
    );
};

export default PedidosList;
