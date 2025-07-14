import React, { useEffect, useState, useContext } from "react";
import "./Reseña.css";
import { AuthContext } from "../../contexts/AuthContext";

const ReseñaPage = () => {
  const { user } = useContext(AuthContext);

  const [agricultores, setAgricultores] = useState([]);
  const [formData, setFormData] = useState({
    agricultorId: "",
    comentario: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/agricultor")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar agricultores");
        return res.json();
      })
      .then((data) => setAgricultores(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombreUsuario = user?.nombre?.trim() ? user.nombre : user.email;

    const comentarioPayload = {
      nombreUsuario,
      fecha: new Date().toISOString(),
      contenido: formData.comentario,
      agricultorId: formData.agricultorId,
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/comentario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comentarioPayload)
      });

      if (!res.ok) throw new Error("Error al enviar la reseña");

      alert("¡Reseña enviada con éxito!");
      setFormData({ agricultorId: "", comentario: "" });
    } catch (err) {
      console.error("Error enviando reseña:", err);
      alert("Hubo un problema al enviar tu reseña.");
    }
  };

  return (
    <div className="reseña-container">
      <div className="reseña-banner">
        <h1>Reseña tus productos y experiencias</h1>
      </div>

      <form className="reseña-formulario" onSubmit={handleSubmit}>
        <label htmlFor="agricultorId">Selecciona un agricultor:</label>
        <select
          id="agricultorId"
          name="agricultorId"
          value={formData.agricultorId}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona --</option>
          {agricultores.map((agri) => (
            <option key={agri.id} value={agri.id}>
              {agri.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="comentario">Comentario:</label>
        <textarea
          id="comentario"
          name="comentario"
          rows="5"
          value={formData.comentario}
          onChange={handleChange}
          placeholder="Escribe tu opinión aquí..."
          required
        ></textarea>

        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default ReseñaPage;
