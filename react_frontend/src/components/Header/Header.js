// src/components/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./HeaderMessages";
import "./Header.css";
import { AuthContext } from "../../contexts/AuthContext";

const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith("es") ? "es" : "en";
};

const Header = () => {
  const locale = getBrowserLanguage();
  const { user, logout } = useContext(AuthContext);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <header className="header">
        <Link to="/" className="logo">verdi</Link>

        <nav>
          <ul>
            {user?.rol === 'agricultor' && (
              <>
                <li><Link to="/vende"><FormattedMessage id="sell" /></Link></li>
                <li><Link to="/cosechas"><FormattedMessage id="my_harvests" /></Link></li>
                <li><Link to="/Perfil"><FormattedMessage id="Profile" /></Link></li>
              </>
            )}

            {user?.rol === 'organizacion' && (
              <>
                <li><Link to="/pais"><FormattedMessage id="country" /></Link></li>
                <li><Link to="/pais"><FormattedMessage id="country" /></Link></li>
              </>
            )}

            {user?.rol === 'comprador' && (
              <>
                <li><Link to="/compra"><FormattedMessage id="buy" /></Link></li>
                <li><Link to="/pedidos"><FormattedMessage id="my_orders" /></Link></li>
                <li><Link to="/reseñar"><FormattedMessage id="review" /></Link></li>
                <li><Link to="/Perfil"><FormattedMessage id="Profile" /></Link></li>
              </>
            )}

            {user?.rol === 'admin' && (
              <>
                <li><Link to="/admin/notificaciones">Notificaciones</Link></li>
                <li><Link to="/admin/registrar-eventualidad">Crear notificación</Link></li>
                <li><Link to="/pedidos/">Pedidos</Link></li>
                <li><Link to="/admin/estadisticas"><FormattedMessage id="statistics" /></Link></li>
              </>
            )}

            {/* {user?.rol === 'comprador' && (
            <li><Link to="/pedidos"><FormattedMessage id="my_orders" /></Link></li>
            )} */}

            <li><Link to="/admin/estadisticas"><FormattedMessage id="statistics" /></Link></li>
            
          </ul>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <div className="user-info">
              <span className="greeting">
                ¡Hola, {user.nombre}!
              </span>
              <button onClick={logout} className="btn-logout">
                <FormattedMessage id="logout" defaultMessage="Cerrar Sesión" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button><FormattedMessage id="login" /></button>
              </Link>
              <Link to="/registrarse">
                <button><FormattedMessage id="register" /></button>
              </Link>
            </>
          )}
        </div>
      </header>
    </IntlProvider>
  );
};

export default Header;
