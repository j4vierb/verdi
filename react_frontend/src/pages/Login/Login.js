import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login.png";
import "./Login.css";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./LoginMesages";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode"; // ✅ corrección de import

const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith("es") ? "es" : "en";
};

function Login() {
  const locale = getBrowserLanguage();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usernameInput,
          password: passwordInput,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || res.statusText);
      }

      const { access_token } = await res.json();

      // ✅ Decodificar token
      const decoded = jwtDecode(access_token);

      // ✅ Construir usuario y enviarlo al contexto
      const user = {
        id: decoded.sub,
        nombre: decoded.nombre || "",
        email: decoded.email,
        rol: decoded.roles?.[0] || ""
      };

      login(user); // login recibe objeto user (no solo token)

      // ✅ Redirección según rol
      if (user.rol === "agricultor") {
        navigate("/compras");
      } else if (user.rol === "comprador") {
        navigate("/compra");
      } else if (user.rol === "admin") {
        navigate("/admin/notificaciones");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="login-page">
        <div className="login-container">
          <img src={loginImage} alt="Login" className="login-image" />
        </div>

        <div className="login-section">
          <h2 className="login-title">
            <FormattedMessage id="title" />
          </h2>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">
                <FormattedMessage id="first" />
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <FormattedMessage id="second" />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              <FormattedMessage id="loginButton" defaultMessage="Iniciar Sesión" />
            </button>
          </form>
        </div>
      </div>
    </IntlProvider>
  );
}

export default Login;
