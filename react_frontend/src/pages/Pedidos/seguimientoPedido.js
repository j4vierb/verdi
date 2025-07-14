import { useParams, useLocation } from "react-router-dom";
import "./seguimientoPedido.css";
import { FormattedMessage} from "react-intl";


function SeguimientoPedido() {
  const { id } = useParams();
  const location = useLocation();
  const pedido = location.state?.pedido;

  if (!pedido) {
    return <p><FormattedMessage id="pedidos-seguimiento.noEncontrado" /></p>;
  }

  const estados = [
    "Estamos preparando tus productos",
    "Estamos recogiendo tus productos",
    "Tus productos están en camino",
  ];

  return (
    <div>
      <div className="title-group">
        <p className="title"><FormattedMessage id="pedidos-seguimiento.seguimiento" />{id}</p>
      </div>

      <div className="seguimiento-container">
        {estados.map((estado, index) => (
          <div key={index} className="estado-container">
            <div className="estado">
              <div className={`circulo ${pedido.estado === estado ? "activo" : ""}`}></div>
              <p>{estado}</p>
            </div>
            {index < estados.length - 1 && <div className="flecha"></div>}
          </div>
        ))}
      </div>

      <p className="fecha-entrega"><FormattedMessage id="pedidos-seguimiento.fecha" />: {pedido.fechaEntrega}</p>
    </div>
  );
}

export default SeguimientoPedido;
