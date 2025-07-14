import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./BarraBusqueda.css";

const BarraBusqueda = ({
  searchTerm,
  setSearchTerm,
  productosDisponibles,
  setIndiceInicio,
  onFiltrarProductos,
  categoriaSeleccionada
}) => {
  useEffect(() => {
    const filtrar = () => {
      const obtenerMasVendidos = () => {
        return [...productosDisponibles].sort((a, b) => b.cantidadesVendidas - a.cantidadesVendidas);
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
    };

    filtrar();
  }, [searchTerm, productosDisponibles, categoriaSeleccionada, onFiltrarProductos]);

  return (
    <FormattedMessage id="search_placeholder" defaultMessage="Search products...">
      {(placeholderText) => (
        <input
          type="text"
          className="search-bar"
          placeholder={placeholderText}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIndiceInicio(0); // ✅ Asegúrate de que esta función exista
          }}
        />
      )}
    </FormattedMessage>
  );
};

export default BarraBusqueda;
