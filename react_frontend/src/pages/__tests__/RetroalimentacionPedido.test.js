import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useParams } from "react-router-dom";
import RetroalimentacionPedido from "../../pages/Pedidos/retroalimentacionPedido";

// Mock useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

// Mensajes necesarios para que FormattedMessage funcione (si se usan)
const messages = {
  "pedidos-retroalimentacion.pedido": "Retroalimentación del pedido #",
  "pedidos-retroalimentacion.enviar": "Enviar comentario"
};

// Helper para renderizar el componente
const renderRetroalimentacion = (pedidoId) => {
  useParams.mockReturnValue({ id: pedidoId });
  return render(
    <IntlProvider locale="es" messages={messages}>
      <MemoryRouter>
        <RetroalimentacionPedido />
      </MemoryRouter>
    </IntlProvider>
  );
};

describe("RetroalimentacionPedido Component", () => {
  test("renders title with pedido ID", () => {
    renderRetroalimentacion("123");
    expect(
      screen.getByText((text) => text.includes("pedido #123"))
    ).toBeInTheDocument();
  });

  test("updates comentario on input change", () => {
    renderRetroalimentacion("456");
    const textarea = screen.getByPlaceholderText("Escribe aquí tu opinión sobre el pedido...");
    fireEvent.change(textarea, { target: { value: "Muy buen servicio" } });
    expect(textarea.value).toBe("Muy buen servicio");
  });

  test("displays alert on enviar button click", () => {
    window.alert = jest.fn(); // mock alert
    renderRetroalimentacion("789");
    const enviarButton = screen.getByRole("button", { name: /Enviar/i });
    fireEvent.click(enviarButton);
    expect(window.alert).toHaveBeenCalledWith("¡Gracias por tu retroalimentación!");
  });
});
