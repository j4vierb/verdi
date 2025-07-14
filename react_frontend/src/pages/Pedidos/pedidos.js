import { useState, useEffect } from "react";
import Pedido from "./pedido";
import "./pedidos.css";
import pedidosData from "./Pedidos.json";
import { FormattedMessage } from "react-intl";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        setPedidos(pedidosData);
    }, []);

    const fechaActual = new Date();

    const pedidosEnCursoList = pedidos
        .filter(pedido => new Date(pedido.fechaEntrega) >= fechaActual)
        .map((pedido, index) => {
            const costoTotal = pedido.items.reduce((total, item) => total + item.precio, 0);
            return <Pedido info={{ ...pedido, costo: costoTotal }} key={index} />;
        });

    const pedidosEntregadosList = pedidos
        .filter(pedido => new Date(pedido.fechaEntrega) < fechaActual)
        .map((pedido, index) => {
            const costoTotal = pedido.items.reduce((total, item) => total + item.precio, 0);
            return <Pedido info={{ ...pedido, costo: costoTotal }} key={index} />;
        });

    return (
        <div>
            <div className="pedidos-title-group">
                <p className="pedidos-title">
                    <FormattedMessage id="pedidos.titulo1" />:
                </p>
            </div>

            <div className="elements-group">
                <ul>
                    {pedidosEnCursoList.length > 0 ? pedidosEnCursoList : <p><FormattedMessage id="pedidos.noEnCurso" />:</p>}
                </ul>
            </div>

            <div className="pedidos-title-group">
                <p className="pedidos-title"><FormattedMessage id="pedidos.titulo2" />:</p>
            </div>

            <div className="elements-group">
                <ul>
                    {pedidosEntregadosList.length > 0 ? pedidosEntregadosList : <p><FormattedMessage id="pedidos.noEntregados" /></p>}
                </ul>
            </div>
        </div>
    );
}

export default Pedidos;
