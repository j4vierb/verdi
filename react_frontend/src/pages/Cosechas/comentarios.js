import React, { useState, useEffect, useContext } from "react";
import "./Comentarios.css"; 
import { FormattedMessage } from "react-intl";
import { AuthContext } from "../../contexts/AuthContext"; // Asegúrate de que esté correcto

function Comentarios() {
  const { user } = useContext(AuthContext);
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Usuario actual:", user);
    if (!user?.id) return;

    const fetchComentarios = async () => {
      try {
        const resAgri = await fetch(`http://localhost:3000/api/v1/agricultor/por-usuario/${user.id}`);
        if (!resAgri.ok) throw new Error("Error buscando agricultor");
        const agricultor = await resAgri.json();

        const resComentarios = await fetch(`http://localhost:3000/api/v1/agricultor/${agricultor.id}/comentarios`);
        if (!resComentarios.ok) throw new Error("Error obteniendo comentarios");
        const data = await resComentarios.json();

        setComentarios(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los comentarios.");
      }
    };

    fetchComentarios();
  }, [user]);

  const columnas = 2;
  const comentariosPorColumna = Math.ceil(comentarios.length / columnas);
  const comentariosColumnas = [];

  for (let i = 0; i < columnas; i++) {
    comentariosColumnas.push(comentarios.slice(i * comentariosPorColumna, (i + 1) * comentariosPorColumna));
  }

  return (
    <div>
      <div className="title-group">
        <h1 className="title"><FormattedMessage id="cosechas-retroalimentacion.comentarios" /></h1>
      </div>

      <div className="comentarios-container">
        {error ? (
          <p>{error}</p>
        ) : comentarios.length > 0 ? (
          <div className="comentarios-grid">
            {comentariosColumnas.map((columna, index) => (
              <ul key={index} className="comentarios-columna">
                {columna.map((comentario) => (
                  <li key={comentario.id} className="comentario-item">
                    <strong>{comentario.nombreUsuario}:</strong>
                    "{comentario.contenido}"
                  </li>

                ))}
              </ul>
            ))}
          </div>
        ) : (
          <p><FormattedMessage id="cosechas-retroalimentacion.no-comentarios" /></p>
        )}
      </div>
    </div>
  );
}

export default Comentarios;
