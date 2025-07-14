import React, { useState, useEffect, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import "./FiltroCategorias.css";
import messages from "./FiltroCategoriasMessages";

const FiltroCategorias = ({
  categoriaMap,
  productosDisponibles,
  searchTerm,
  onFiltrarProductos
}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const filtrar = useCallback(() => {
    const obtenerMasVendidos = () => {
      return [...productosDisponibles].sort((a, b) => b.cantidad_vendida - a.cantidad_vendida);
    };

    let resultado = [];

    if (categoriaSeleccionada === "Más vendidos") {
      resultado = obtenerMasVendidos().filter(producto =>
        typeof producto.nombre === "string" &&
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (categoriaSeleccionada === "Todos") {
      resultado = productosDisponibles.filter(producto =>
        typeof producto.nombre === "string" &&
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      resultado = productosDisponibles
        .filter(producto => producto.categoria === categoriaSeleccionada)
        .filter(producto =>
          typeof producto.nombre === "string" &&
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    onFiltrarProductos(resultado);
  }, [categoriaSeleccionada, searchTerm, productosDisponibles, onFiltrarProductos]);

  useEffect(() => {
    if (typeof onFiltrarProductos === "function") {
      filtrar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrar]);

  return (
    <div className="filtro-categorias">
      {Object.keys(categoriaMap).map((categoria) => (
        <button
          key={categoria}
          className={categoriaSeleccionada === categoriaMap[categoria] ? "activo" : ""}
          onClick={() => {
            setCategoriaSeleccionada(categoriaMap[categoria]);
          }}
        >
          <FormattedMessage id={categoria} defaultMessage={messages.en[categoria]} />
        </button>
      ))}
    </div>
  );
};

export default FiltroCategorias;
