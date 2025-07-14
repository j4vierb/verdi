import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./CheckoutPageMessages";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";

const departamentosColombia = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas",
  "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Distrito Capital",
  "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta",
  "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda",
  "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith("es") ? "es" : "en";
};

const CheckoutPage = () => {
  const location = useLocation();
  const [carrito, setCarrito] = useState(location.state?.carrito || {});
  const productos = location.state?.productos || [];

  const [direccion, setDireccion] = useState({
    calle: "",
    departamento: "",
    ciudad: ""
  });
  const [locale] = useState(getBrowserLanguage());

  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US");

  const actualizarCantidad = (id, cantidad) => {
    setCarrito(prev => {
      const nuevoCarrito = { ...prev };
      if (cantidad > 0) {
        nuevoCarrito[id] = cantidad;
      } else {
        delete nuevoCarrito[id];
      }
      return nuevoCarrito;
    });
  };

  const handlePagar = () => {
  if (!direccion.calle || !direccion.departamento || !direccion.ciudad) {
    alert("Completa la dirección de entrega.");
    return;
  }

  const direccionCompleta = `${direccion.ciudad}, ${direccion.departamento}, ${direccion.calle}`;
  const fechaEntrega = new Date();
  fechaEntrega.setDate(fechaEntrega.getDate() + 3);

  // Transformar carrito a array con cantidades por producto
  const productosArray = Object.keys(carrito).map((id) => ({
    id: id,
    cantidad: carrito[id],
  }));

  const pedido = {
    direccionRecoger: "Bodega central", // o ajusta si tienes otra lógica
    direccionEntregar: direccionCompleta,
    estado: "Productos en camino",
    fechaEntrega: fechaEntrega.toISOString(),
    productos: productosArray,
  };

  fetch("http://localhost:3000/api/v1/pedido/verificar-y-crear", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(pedido),
  })
    .then((res) => {
      if (!res.ok) return res.json().then(err => { throw new Error(err.message || "Error"); });
      return res.json();
    })
    .then((data) => {
      alert("Pedido registrado con éxito");
      console.log("Pedido creado:", data);
      setCarrito({});
      navigate("/compra");
    })
    .catch((err) => {
      console.error("Error creando pedido:", err);
      alert(`Error al registrar el pedido: ${err.message}`);
    });
};

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="checkout-page">
        <h2 className="checkout-titulo">
          <FormattedMessage id="title" />
        </h2>

        <div className="formulario-direccion">
          <label><FormattedMessage id="address" /></label>
          <input
            type="text"
            placeholder={messages[locale].street_placeholder}
            value={direccion.calle}
            onChange={(e) => setDireccion({ ...direccion, calle: e.target.value })}
          />
          <select
            value={direccion.departamento}
            onChange={(e) => setDireccion({ ...direccion, departamento: e.target.value })}
          >
            <option value="">{messages[locale].department_placeholder}</option>
            {departamentosColombia.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={messages[locale].city_placeholder}
            value={direccion.ciudad}
            onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
          />
        </div>

        {Object.keys(carrito).length === 0 ? (
          <p><FormattedMessage id="empty_cart" /></p>
        ) : (
          <ul className="carrito-lista">
            {Object.keys(carrito).map((id) => {
              const producto = productos.find(p => p.cosechaId === id);
              if (!producto) return null;

              return (
                <li key={id} className="carrito-item">
                  <img src={producto.imagen} alt={producto.nombre} className="carrito-img" />
                  <div className="carrito-detalles">
                    <span>{producto.nombre}</span>
                    <span>${formatter.format(producto.precio * carrito[id])}</span>
                    <div className="cantidad-control">
                      <button onClick={() => actualizarCantidad(id, carrito[id] - 1)}>-</button>
                      <span>{carrito[id]}</span>
                      <button onClick={() => actualizarCantidad(id, carrito[id] + 1)}>+</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="total-price">
          <h3>
            <FormattedMessage id="total" />: $
            {formatter.format(Object.keys(carrito).reduce((total, id) => {
              const producto = productos.find(p => p.cosechaId === id);
              return producto ? total + (producto.precio * carrito[id]) : total;
            }, 0))}
          </h3>
        </div>

        <button className="boton-pagar" onClick={handlePagar}>
          <FormattedMessage id="pay_button" />
        </button>
      </div>
    </IntlProvider>
  );
};

export default CheckoutPage;
