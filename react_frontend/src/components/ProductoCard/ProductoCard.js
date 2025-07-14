import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./ProductoCard.css";
import messages from "./ProductoCardMessages";

const ProductoCard = ({ producto, carrito, setCarrito }) => {
  const [cantidadDeseada, setCantidadDeseada] = useState(1);

  const agregarAlCarrito = () => {
    if (cantidadDeseada <= 0) return; // Evita cantidades inválidas

    if (producto.disponible < cantidadDeseada) {
      alert(`Solo hay ${producto.disponible} kg disponibles de este producto.`);
      return;
    }

    setCarrito((prev) => ({
      ...prev,
      [producto.cosechaId]: (prev[producto.cosechaId] || 0) + cantidadDeseada
    }));
    setCantidadDeseada(1); // Opcional: reinicia después de añadir
  };

  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
      <h3>{producto.nombre}</h3>
      <p>
        <FormattedMessage id="price_per_kilo" defaultMessage={messages.en.price_per_kilo} />: ${producto.precio}
      </p>
      {/* <p>
        <FormattedMessage id="sold" defaultMessage={messages.en.sold} />: {producto.cantidad_vendida}
      </p> */}

      <div className="input-cantidad-container">
        <input
          type="number"
          min="1"
          value={cantidadDeseada}
          onChange={(e) => setCantidadDeseada(parseInt(e.target.value))}
          className="input-cantidad"
        />
        <span className="unidad">kg</span>
      </div>

      <button className="boton-carrito" onClick={agregarAlCarrito}>
        <FormattedMessage id="add_to_cart" defaultMessage={messages.en.add_to_cart} />
      </button>
    </div>
  );
};

export default ProductoCard;