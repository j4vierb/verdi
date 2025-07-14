import './Cosecha.css';

function Cosecha({ info, onModificar }) {

    const fechaRecolec = info.fechaRecoleccion;
    return(
        <div className='card-miscosechasR'>
            <img src={info.imagen} alt="imagen cultivo" className='imagen-cardR'></img>
            <p className='card-titleR'>{info.nombre}</p>
            <p className='card-infoR'>{`Recoger el ${fechaRecolec.getDay()} de ${fechaRecolec.toLocaleString('es-MX', { month: 'long' })} del ${fechaRecolec.getFullYear()}`}</p>
            <p className='card-infoR' id='card-cantidad'>{info.cantidad} Toneladas</p>
            <hr></hr>
            <p className="card-vendidasR">¡{info.vendida} toneladas vendidas!</p>
            <p className="card-enVentaR">{info.cantidad - info.vendida} toneladas en venta</p>
            <hr></hr>

            <div className='card-buttonsR'>
                <button>Detalles</button>
                <button onClick={onModificar}>Modificar</button>
            </div>
            
        </div>
        
    )
}

export default Cosecha
