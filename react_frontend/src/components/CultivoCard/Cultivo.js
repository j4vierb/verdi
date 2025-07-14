import { useIntl } from 'react-intl';
import './Cultivo.css';

function Cultivo(props) {
    const intl = useIntl();

    const { admin } = props;
    const mapper = {
        "Sin verificar": "red",
        "Verificado": "#09f",
        "Publicado": "lime"
    }

    let estado = props.info.estado;
    if (intl.locale.startsWith("en")) {
        estado = estado === "Sin verificar" ? "Unverified" : estado === "Verificado" ? "Verified" : "Published";
    }

    const bg = mapper[props.info.estado];

    return (
        <div className='card-cultivo'>
            {admin && <span style={{ backgroundColor: bg }} className="status-cosecha-tag">
                {estado}
            </span>}
            <img src={props.info.imagen} alt="imagen cultivo" className='imagen-card' />
            <div className='card-info'>
                <p className='card-title'>{props.info.nombre}</p>
                <p className='card-info'>{props.info.ubicacion}</p>
                <p className='card-info' id='card-cantidad'>{props.info.cantidad}</p>
                {
                    navigator.language.startsWith("es") ? <p className='card-time'>¡Quedan {`${props.info.diasRestantes}`} días para la cosecha!</p> : <p className='card-time'>¡{`${props.info.diasRestantes}`} days left for the harvest!</p>
                }
            </div>
            <div className='card-buttons'>
                {props.children}
            </div>
        </div>

    )
}

export default Cultivo;