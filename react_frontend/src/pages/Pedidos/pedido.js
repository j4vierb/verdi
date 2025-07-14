import './pedido.css';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage} from "react-intl";


function Pedido(props) {
  const navigate = useNavigate();
  const esEntregado = props.info.estado === "Entregado";

  const handleModificarClick = () => {
    navigate(`/pedidos/${props.info.id}`, { state: { pedido: props.info } });
  };

  const handleSeguimientoClick = () => {
    navigate(`/seguimiento/${props.info.id}`, { state: { pedido: props.info } });
  };

  const handleFeedbackClick = () => {
    navigate(`/retroalimentacion/${props.info.id}`, { state: { pedido: props.info } });
  };

  return (
    <div className='card-pedido'>
      <p className='card-title'><FormattedMessage id="pedidos.pedido" />{props.info.id}</p>

      <ul className='card-items'>
        {props.info.items.map((item, index) => (
          <li key={index}>{item.nombre}</li> 
        ))}
      </ul>

      <p className='card-cost'>
        <strong>Total:</strong> ${props.info.costo.toFixed(2)}
      </p>

      <hr />
      
      <div className='card-buttons' style={{ display: 'flex', justifyContent: 'center' }}>
        {esEntregado ? (
          <button onClick={handleFeedbackClick}><FormattedMessage id="pedidos.retroalimentacion" /></button>
        ) : (
          <>
            <button onClick={handleModificarClick}><FormattedMessage id="pedidos.modificar" /></button>
            <button onClick={handleSeguimientoClick}><FormattedMessage id="pedidos.seguimiento" /></button>
          </>
        )}
      </div>
    </div>
  );
}

export default Pedido;
