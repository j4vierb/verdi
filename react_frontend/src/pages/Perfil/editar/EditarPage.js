import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IntlProvider, useIntl, FormattedMessage } from "react-intl";
import messages from "./EditarPageMessages";
import "./EditarPage.css";
import { AuthContext } from "../../../contexts/AuthContext";

const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith("es") ? "es" : "en";
};

const EditarPage = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { user } = useContext(AuthContext);
  const [locale] = useState(getBrowserLanguage());

  const [formData, setFormData] = useState({
    email: user?.email || "",
    telefono: user?.telefono || "",
    ciudad: user?.ciudad || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const errores = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errores.email = formatMessage({ id: "invalidEmail" });
    }

    if (!/^\d{10}$/.test(formData.telefono)) {
      errores.telefono = formatMessage({ id: "phoneError" });
    }

    if (!formData.ciudad.trim()) {
      errores.ciudad = formatMessage({ id: "required" });
    }

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!validarFormulario()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al actualizar");
      }

      alert(formatMessage({ id: "saved" }));
      navigate("/perfil");
    } catch (err) {
      alert(err.message || "Ocurrió un error al actualizar.");
    }
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="editar-container">
        <h2><FormattedMessage id="title" /></h2>
        <form onSubmit={handleSubmit}>
          <label><FormattedMessage id="email" /></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label><FormattedMessage id="phone" /></label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <span className="error">{errors.telefono}</span>}

          <label><FormattedMessage id="city" /></label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />
          {errors.ciudad && <span className="error">{errors.ciudad}</span>}

          <div className="editar-botones">
            <button type="submit" className="guardar">
              <FormattedMessage id="save" />
            </button>
            <button type="button" className="cancelar" onClick={() => navigate("/perfil")}>
              <FormattedMessage id="cancel" />
            </button>
          </div>
        </form>
      </div>
    </IntlProvider>
  );
};

export default EditarPage;
