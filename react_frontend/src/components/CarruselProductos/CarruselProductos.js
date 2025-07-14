import React, { useState } from "react";
import "./CarruselProductos.css";
import ProductoCard from "../ProductoCard/ProductoCard";

const CarruselProductos = ({ productos, productosPorPagina, carrito, setCarrito }) => {
  const [indiceInicio, setIndiceInicio] = useState(0);

  const avanzar = () => {
    if (indiceInicio + productosPorPagina < productos.length) {
      setIndiceInicio(indiceInicio + 1);
    }
  };

  const retroceder = () => {
    if (indiceInicio > 0) {
      setIndiceInicio(indiceInicio - 1);
    }
  };

  const productosVisibles = productos.slice(indiceInicio, indiceInicio + productosPorPagina);

  return (
    <div className="carrusel">
      <button className="flecha izquierda" onClick={retroceder} disabled={indiceInicio === 0}>
        ❮
      </button>

      <div className="productos-container">
        {productosVisibles.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            carrito={carrito}
            setCarrito={setCarrito}
          />
        ))}
      </div>

      <button
        className="flecha derecha"
        onClick={avanzar}
        disabled={indiceInicio + productosPorPagina >= productos.length}
      >
        ❯
      </button>
    </div>
  );
};

export default CarruselProductos;
