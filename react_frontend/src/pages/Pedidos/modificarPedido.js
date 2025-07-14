import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./modificarPedido.css";
import { FormattedMessage } from "react-intl";

function ModificarPedido() {
    const { idPedido = "123" } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const pedido = location.state?.pedido;

    if (!pedido) {
        return (
            <p>
                <FormattedMessage
                    id="pedidos-modificar.noEncontrado"
                    defaultMessage="No se encontró información del pedido."
                />
            </p>
        );
    }

    const handleEliminarPedido = () => {
        alert(`Pedido #${idPedido} eliminado`);
        navigate("/pedidos");
    };

    return (
        <div>
            <div className="title-group">
                <p className="title">
                    <FormattedMessage
                        id="pedidos-modificar.modi"
                        values={{ id: idPedido }}
                        defaultMessage="Modificar pedido #{id}"
                    />
                </p>
            </div>
            <div className="pedido-container">
                <h2>
                    <FormattedMessage
                        id="pedidos-modificar.info"
                        defaultMessage="Información del pedido"
                    />
                </h2>

                <table className="pedido-table">
                    <thead>
                        <tr>
                            <th>
                                <FormattedMessage
                                    id="pedidos-modificar.producto"
                                    defaultMessage="Producto"
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id="pedidos-modificar.precio"
                                    defaultMessage="Precio"
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nombre}</td>
                                <td>{Math.round(item.precio)} COP</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pedido-footer">
                    <button className="eliminar-btn" onClick={handleEliminarPedido}>
                        <FormattedMessage
                            id="pedidos-modificar.cancelar"
                            defaultMessage="Cancelar pedido"
                        />
                    </button>
                    <p className="pedido-total">
                        <strong>Total:</strong> {Math.round(pedido.costo)} COP
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ModificarPedido;
