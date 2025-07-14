import React from "react";
import "./ControlesSuperiores.css";
import FiltroCategorias from "../FiltroCategorias/FiltroCategorias";
import BarraBusqueda from "../BarraBusqueda/BarraBusqueda";
import MenuCarrito from "../MenuCarrito/MenuCarrito";

const ControlesSuperiores = ({
  categoriaMap,
  productosDisponibles,
  searchTerm,
  setSearchTerm,
  setIndiceInicio,
  carrito,
  setCarrito,
  mostrarCarrito,
  setMostrarCarrito,
  irACheckout,
  locale,
  onFiltrarProductos,
  categoriaSeleccionada
}) => {
  return (
    <div className="menu-compra-opciones">
      <FiltroCategorias
        categoriaMap={categoriaMap}
        productosDisponibles={productosDisponibles}
        searchTerm={searchTerm}
        setIndiceInicio={setIndiceInicio}
        onFiltrarProductos={onFiltrarProductos}
      />

      <BarraBusqueda
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        productosDisponibles={productosDisponibles}
        setIndiceInicio={setIndiceInicio} // ✅ ¡AGREGADO AQUÍ!
        onFiltrarProductos={onFiltrarProductos}
        categoriaSeleccionada={categoriaSeleccionada}
      />

      <MenuCarrito
        carrito={carrito}
        setCarrito={setCarrito}
        mostrarCarrito={mostrarCarrito}
        setMostrarCarrito={setMostrarCarrito}
        irACheckout={irACheckout}
        productosDisponibles={productosDisponibles}
      />
    </div>
  );
};

export default ControlesSuperiores;
