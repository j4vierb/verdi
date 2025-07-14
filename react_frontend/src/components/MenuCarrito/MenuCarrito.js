import React from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import "./MenuCarrito.css";
import messages from "./MenuCarritoMessages";

const MenuCarrito = ({
  carrito,
  setCarrito,
  mostrarCarrito,
  setMostrarCarrito,
  irACheckout,
  productosDisponibles
}) => {
  const totalProductos = Object.values(carrito).reduce((a, b) => a + b, 0);

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => {
      const nuevoCarrito = { ...prev };
      if (nuevoCarrito[id] > 1) {
        nuevoCarrito[id] -= 1;
      } else {
        delete nuevoCarrito[id];
      }
      return nuevoCarrito;
    });
  };

  return (
    <div className="carrito-container">
      <button className="boton-carrito-icono" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
        <FaShoppingCart size={24} />
        {totalProductos > 0 && (
          <span className="contador-carrito">{totalProductos}</span>
        )}
      </button>

      {mostrarCarrito && (
        <div className="carrito-dropdown">
          <h3>
            <FormattedMessage id="cart_title" defaultMessage={messages.en.cart_title} />
          </h3>

          {Object.keys(carrito).length === 0 ? (
            <p>
              <FormattedMessage id="cart_empty" defaultMessage={messages.en.cart_empty} />
            </p>
          ) : (
            <>
              <ul>
                {Object.keys(carrito).map((id) => {
                  const producto = productosDisponibles.find(p => p.cosechaId === id);

                  return (
                    <li key={id}>
                      {producto.nombre} x {carrito[id]}
                      <button className="boton-eliminar" onClick={() => eliminarDelCarrito(id)}>
                        <FaTrash />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button className="boton-checkout" onClick={irACheckout}>
                <FormattedMessage id="checkout" defaultMessage={messages.en.checkout} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuCarrito;
