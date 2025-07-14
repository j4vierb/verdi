
import React, { useState, useEffect } from "react";

import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./VentaPageMessages";
import "./VentaPage.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};



const VentaPage = () => {
    const [cultivo, setCultivo] = useState({
        productoId: "",  
        fechaRecoleccion: "",
        cantidadKilos: "",
        coordenadas: ""
    });

    const [productos, setProductos] = useState([]);

    useEffect(() => {
      fetch("http://localhost:3000/api/v1/producto")
        .then((res) => res.json())
        .then((data) => {
          setProductos(data);
        })
        .catch((err) => {
          console.error("Error cargando productos:", err);
        });
    }, []);

    const [locale] = useState(getBrowserLanguage());

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCultivo({ ...cultivo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const productoSeleccionado = productos.find(p => p.id === cultivo.productoId);
        if (!productoSeleccionado) {
            alert("Producto no válido o sin imagen asociada.");
            return;
        }
        const cultivoData = {
            nombre: productoSeleccionado.nombre,
            imagen: productoSeleccionado.imagen,
            fechaRecoleccion: new Date(cultivo.fechaRecoleccion).toISOString(),
            cantidadKilos: parseInt(cultivo.cantidadKilos, 10),
            cantidadVendidas: 0,
            coordenadas: cultivo.coordenadas,
            productoId: productoSeleccionado.id,
        };

        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/api/v1/cosechas/crear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cultivoData)
        })
            .then((response) => {
                if (!response.ok) return response.text().then(text => { throw new Error(text); });
                return response.json();
            })
            .then((data) => {
                console.log("Cosecha registrada:", data);
                alert(messages[locale].success_message);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert("Ocurrió un error al registrar la cosecha: " + error.message);
            });
    };

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className="venta-page">
          {/* Banner verde tipo Verdi */}
          <div className="venta-banner">
            <h1 className="venta-title">
              <FormattedMessage id="title" />
            </h1>
          </div>
        
          {/* Formulario de venta */}
          <form className="formulario-venta" onSubmit={handleSubmit}>
            <label htmlFor="nombre">
              <FormattedMessage id="crop_name" />
            </label>
            <select
              id="productoId"
              name="productoId"
              value={cultivo.productoId}
              onChange={handleInputChange}
              required
            >
              <option value="">
                <FormattedMessage id="select" />
              </option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          
            <label htmlFor="fechaRecoleccion">
              <FormattedMessage id="harvest_date" />
            </label>
            <input
              id="fechaRecoleccion"
              type="datetime-local"
              name="fechaRecoleccion"
              value={cultivo.fechaRecoleccion}
              onChange={handleInputChange}
              required
            />
    
            <label htmlFor="cantidadKilos">
              <FormattedMessage id="quantity" />
            </label>
            <input
              id="cantidadKilos"
              type="number"
              name="cantidadKilos"
              value={cultivo.cantidadKilos}
              onChange={handleInputChange}
              required
              min="1"
            />
    
            <label htmlFor="coordenadas">Coordenadas</label>
            <input
              id="coordenadas"
              type="text"
              name="coordenadas"
              value={cultivo.coordenadas}
              onChange={handleInputChange}
              required
              placeholder="Latitud,Longitud"
            />
    
            <button type="submit" className="boton-registrar">
              <FormattedMessage id="submit_button" />
            </button>
          </form>
        </div>
      </IntlProvider>
    );
};

export default VentaPage;
