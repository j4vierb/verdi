import {useState } from "react";

function FormularioModificacion({ cantidadActual, onCancelar, onGuardar }) {
    const [cantidad, setCantidad] = useState(cantidadActual);
  
    const aumentar = () => setCantidad(cantidad + 1);
    const disminuir = () => {
      if (cantidad > 0) setCantidad(cantidad - 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onGuardar(cantidad);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button type="button" onClick={disminuir}>
            -
          </button>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            style={{ width: "60px", textAlign: "center" }}
          />
          <button type="button" onClick={aumentar}>
            +
          </button>
        </div>
  
        {/* Botones de Cancelar y Guardar */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    );
  }
  
  export default FormularioModificacion;