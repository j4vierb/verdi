import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./PerfilPageMessages";
import "./PerfilPage.css";
import { AuthContext } from "../../contexts/AuthContext";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const PerfilPage = () => {
    const navigate = useNavigate();
    const [locale] = useState(getBrowserLanguage());
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [perfilEliminado, setPerfilEliminado] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const usuario = {
        correo: user?.email || "",
        contraseña: "********", // Nunca mostrar contraseñas reales
        rol: user?.rol || "",
    };

    const handleEdit = () => {
        navigate("/Perfil/editar");
    };

    const handleDelete = () => {
        setMostrarPopup(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("No se pudo eliminar el perfil");

            logout();
            setPerfilEliminado(true);
            setMostrarPopup(false);
        } catch (err) {
            console.error("Error eliminando perfil:", err);
            alert("Ocurrió un error al eliminar el perfil.");
        }
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="perfil-page">
                {perfilEliminado ? (
                    <div className="mensaje-eliminado-container">
                        <p className="mensaje-eliminado">
                            <FormattedMessage id="perfilEliminado" />
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="perfil-navbar">
                            <span className="perfil-tab active">Mi Perfil</span>
                        </div>

                        <div className="perfil-container">
                            <div className="perfil-info">
                                <h2><FormattedMessage id="datos" /></h2>
                                
                                <p><strong><FormattedMessage id="correo" />:</strong> {usuario.correo}</p>
                                
                                <p>
                                    <strong><FormattedMessage id="contraseña" />:</strong>{" "}
                                    <span className="contraseña">
                                        {"********"}
                                    </span>

                                </p>

                                <p><strong><FormattedMessage id="rol" />:</strong> {usuario.rol}</p>
                            </div>

                            <div className="perfil-botones">
                                <button className="modificar" onClick={handleEdit}>
                                    <FormattedMessage id="modificar" />
                                </button>
                                <button className="eliminar" onClick={handleDelete}>
                                    <FormattedMessage id="eliminarPerfil" />
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {mostrarPopup && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3><FormattedMessage id="confirmarEliminacion" /></h3>
                            <div className="modal-buttons">
                                <button className="cancelar" onClick={() => setMostrarPopup(false)}>
                                    <FormattedMessage id="noVolver" />
                                </button>
                                <button className="confirmar" onClick={confirmarEliminacion}>
                                    <FormattedMessage id="siEliminar" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </IntlProvider>
    );
};

export default PerfilPage;
