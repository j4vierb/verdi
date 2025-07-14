import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./crearUsuario.css";
import departamentosData from "./departamentos.json";
import { FormattedMessage } from "react-intl";
import { AuthContext } from "../../contexts/AuthContext";

function CrearUsuario() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    departamento: "",
    ciudad: "",
    password: "",
    rol: "comprador", // El valor inicial sigue siendo un string para el select
  });

  const [errores, setErrores] = useState({});
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    setDepartamentos(departamentosData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rol" && value === "organizacion") {
      setUsuario({
        ...usuario,
        rol: value,
        telefono: "",
        fechaNacimiento: "",
        departamento: "",
        ciudad: "",
      });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const validarFormulario = () => {
    let erroresTemp = {};
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTelefono = /^[0-9]{10}$/;

    if (!usuario.nombre.trim()) erroresTemp.nombre = "Nombre requerido";
    if (!regexCorreo.test(usuario.email)) erroresTemp.email = "Correo inválido";
    if (usuario.password.length < 6) erroresTemp.password = "Contraseña muy corta";

    if (usuario.rol !== "organizacion") {
      if (!regexTelefono.test(usuario.telefono)) erroresTemp.telefono = "Teléfono inválido";
      if (!usuario.fechaNacimiento) erroresTemp.fechaNacimiento = "Fecha requerida";
      if (!usuario.departamento) erroresTemp.departamento = "Departamento requerido";
      if (!usuario.ciudad.trim()) erroresTemp.ciudad = "Ciudad requerida";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      let rolToSend;
      if (usuario.rol === "vendedor") {
        rolToSend = ["agricultor"];
      } else if (usuario.rol === "comprador") {
        rolToSend = ["comprador"];
      } else if (usuario.rol === "organizacion") {
        rolToSend = ["organizacion"];
      } else {
        rolToSend = [usuario.rol];
      }

      const bodyToSend =
        usuario.rol === "organizacion"
          ? {
            email: usuario.email,
            password: usuario.password,
            rol: rolToSend,
            nombre: usuario.nombre,
          }
          : {
            ...usuario,
            rol: rolToSend,
          };

      const registerRes = await fetch("http://localhost:3000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      });

      if (!registerRes.ok) {
        const text = await registerRes.text();
        throw new Error(`Registro fallido: ${text}`);
      }

      const loginRes = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
        }),
      });

      const { access_token, roles } = await loginRes.json();
      login(access_token);

      if (roles.includes('agricultor')) {
        navigate("/compras");
      } else if (roles.includes('comprador')) {
        navigate("/compra");
      } else if (roles.includes('admin')) {
        navigate("/admin/notificaciones");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al registrar o loguear:", error.message);
      alert("Error: " + error.message);
    }
  };

  const handleVolver = () => {
    navigate("/");
  };

return (
  <div className="crear-usuario-page">
    {/* ENCABEZADO VISUAL ESTILO VERDI */}
    <div className="crear-usuario-banner">
      <h2 className="crear-usuario-title">
        <FormattedMessage id="crear-usuario.crear" />
      </h2>
    </div>

    <form className="formulario-usuario" onSubmit={handleSubmit}>
      <div className="form-column">
        <label>
          <FormattedMessage
            id={
              usuario.rol === "organizacion"
                ? "crear-usuario.nombre"
                : "crear-usuario.nombreApellido"
            }
          />
        </label>
        <input type="text" name="nombre" value={usuario.nombre} onChange={handleInputChange} />
        <p className="error-text">{errores.nombre}</p>

        <label>
          <FormattedMessage id="crear-usuario.correo" />
        </label>
        <input type="email" name="email" value={usuario.email} onChange={handleInputChange} />
        <p className="error-text">{errores.email}</p>

        <label>
          <FormattedMessage id="crear-usuario.contraseña" />
        </label>
        <input
          type="password"
          name="password"
          value={usuario.password}
          onChange={handleInputChange}
        />
        <p className="error-text">{errores.password}</p>

        {usuario.rol !== "organizacion" && (
          <>
            <label>
              <FormattedMessage id="crear-usuario.telefono" />
            </label>
            <input
              type="tel"
              name="telefono"
              value={usuario.telefono}
              onChange={handleInputChange}
              placeholder="Ej: 3001234567"
            />
            <p className="error-text">{errores.telefono}</p>
          </>
        )}
      </div>

      <div className="form-column">
        {usuario.rol !== "organizacion" && (
          <>
            <label>
              <FormattedMessage id="crear-usuario.fechaNac" />
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={usuario.fechaNacimiento}
              onChange={handleInputChange}
            />
            <p className="error-text">{errores.fechaNacimiento}</p>

            <label>
              <FormattedMessage id="crear-usuario.departamento" />
            </label>
            <select name="departamento" value={usuario.departamento} onChange={handleInputChange}>
              <option value="">
                <FormattedMessage id="crear-usuario.sel" />
              </option>
              {departamentos.map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
            <p className="error-text">{errores.departamento}</p>

            <label>
              <FormattedMessage id="crear-usuario.ciudad" />
            </label>
            <input
              type="text"
              name="ciudad"
              value={usuario.ciudad}
              onChange={handleInputChange}
            />
            <p className="error-text">{errores.ciudad}</p>
          </>
        )}

        <label>
          <FormattedMessage id="crear-usuario.rol" />
        </label>
        <select name="rol" value={usuario.rol} onChange={handleInputChange}>
          <option value="comprador">
            <FormattedMessage id="crear-usuario.comprador" />
          </option>
          <option value="vendedor">
            <FormattedMessage id="crear-usuario.vendedor" />
          </option>
          <option value="organizacion">
            <FormattedMessage id="crear-usuario.organizacion" />
          </option>
        </select>
      </div>

      <div className="botones-container">
        <button type="button" className="boton-volver" onClick={handleVolver}>
          <FormattedMessage id="crear-usuario.volver" />
        </button>
        <button type="submit" className="boton-registrar">
          <FormattedMessage id="crear-usuario.crear" />
        </button>
      </div>
    </form>
  </div>
  );
}

export default CrearUsuario;
