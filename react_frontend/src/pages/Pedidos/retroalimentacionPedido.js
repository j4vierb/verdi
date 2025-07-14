import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

function RetroalimentacionPedido() {
    const [comentario, setComentario] = useState('');
    const { id } = useParams();

    const handleEnviar = () => {
        console.log('Comentario enviado:', comentario);
        alert('¡Gracias por tu retroalimentación!');
    };

    return (
        <div>
            <div className='title-group'>
                <h1 className='title'>
                    Retroalimentación del pedido #{id}
                </h1>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribe aquí tu opinión sobre el pedido..."
                    style={{
                        width: '80%',
                        height: '150px',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        resize: 'none'
                    }}
                />
                <br />
                <button
                    onClick={handleEnviar}
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#173030',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    <FormattedMessage id="pedidos-retroalimentacion.enviar" defaultMessage="Enviar" />
                </button>
            </div>
        </div>
    );
}

export default RetroalimentacionPedido;
