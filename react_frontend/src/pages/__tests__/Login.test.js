import { render, screen } from "@testing-library/react";
import Login from "../Login/Login";
import { IntlProvider } from "react-intl";
import messages from "../Login/LoginMesages";

// Forzar idioma del navegador en entorno de test
Object.defineProperty(window.navigator, "language", {
  value: "es",
  configurable: true,
});

test("Renderiza título, etiquetas de formulario y botón en español", () => {
  render(
    <IntlProvider locale="es" messages={messages["es"]}>
      <Login />
    </IntlProvider>
  );

  // Verifica título
  expect(screen.getByText("¡Ingresa a tu cuenta ahora!")).toBeInTheDocument();

  // Verifica etiquetas
  expect(screen.getByLabelText("Correo o teléfono")).toBeInTheDocument();
  expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();

  // Verifica botón
  expect(screen.getByRole("button", { name: "Iniciar Sesión" })).toBeInTheDocument();
});