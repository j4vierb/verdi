import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CompraPage.css";
import CarruselProductos from "../../components/CarruselProductos/CarruselProductos";
import ControlesSuperiores from "../../components/ControlesSuperiores/ControlesSuperiores";

import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "./CompraPageMessages";

const categoriaMap = {
  all: "Todos",
  fruits: "Frutas",
  vegetables: "Vegetales",
  best_sellers: "Más vendidos"
};

const CompraPage = () => {
  const [categoriaSeleccionada] = useState("Todos");
  const [, setIndiceInicio] = useState(0); // Corrección de destructuring
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [carrito, setCarrito] = useState({});
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();
  const productosPorPagina = 4;

  const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
  };
  const [locale] = useState(getBrowserLanguage());

  const irACheckout = () => {
    navigate("/checkout", {
      state: {
        carrito,
        productos: productosDisponibles
      }
    });
  };

  const handleFiltrarProductos = useCallback((productos) => {
    setProductosFiltrados(productos);
  }, []);

  useEffect(() => {
  fetch("http://localhost:3000/api/v1/producto")
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar productos");
      return res.json();
    })
    .then((productos) => {
      // Combinar cada producto con su cosecha más reciente (si existe)
      const productosConDatos = productos.map((producto) => {
        const cosecha = producto.cosechas?.[0]; // si tiene al menos una
        return {
          cosechaId: cosecha?.id || null,
          nombre: producto.nombre,
          imagen: producto.imagen,
          precio: producto.precio,
          categoria: producto.categoria,
          disponible: cosecha ? (cosecha.cantidadKilos - cosecha.cantidadVendidas) : 0,
          productoId: producto.id,
          cantidadKilos: cosecha?.cantidadKilos || 0,
          cantidadVendidas: cosecha?.cantidadVendidas || 0,
        };
      });

      setProductosDisponibles(productosConDatos);
      setProductosFiltrados(productosConDatos);
    })
    .catch((error) => {
      console.error("Error cargando productos:", error);
    });
  }, []);

return (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <div className="compra-page">

      {/* NUEVO ENCABEZADO CON CONTROLES DENTRO DE LA FRANJA */}
      <div className="title-groupR">
        <h1 className="titleR">
          <FormattedMessage id="title" />
        </h1>

        <div className="menu-controls-wrapper">
          <ControlesSuperiores
            categoriaMap={categoriaMap}
            categoriaSeleccionada={categoriaSeleccionada}
            setIndiceInicio={setIndiceInicio}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            carrito={carrito}
            setCarrito={setCarrito}
            mostrarCarrito={mostrarCarrito}
            setMostrarCarrito={setMostrarCarrito}
            irACheckout={irACheckout}
            productosDisponibles={productosDisponibles}
            locale={locale}
            onFiltrarProductos={handleFiltrarProductos}
          />
        </div>
      </div>

      {/* CARRUSEL DE PRODUCTOS */}
      <CarruselProductos
        productos={productosFiltrados}
        productosPorPagina={productosPorPagina}
        carrito={carrito}
        setCarrito={setCarrito}
      />
    </div>
  </IntlProvider>
  );
};

export default CompraPage;
