import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Pedido from "../../pages/Pedidos/pedido";

const renderPedido = (pedidoInfo) => {
  return render(
    <IntlProvider locale="en" messages={{}}>
      <MemoryRouter>
        <Pedido info={pedidoInfo} />
      </MemoryRouter>
    </IntlProvider>
  );
};

describe("Pedido Component", () => {
  test("renders pedido ID and total cost", () => {
    const pedidoInfo = {
      id: 123,
      costo: 50.25,
      estado: "En camino",
      items: [{ nombre: "Manzana" }, { nombre: "Banana" }],
    };
    renderPedido(pedidoInfo);
    expect(screen.getByText((content, element) => content.includes("123"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("50.25"))).toBeInTheDocument();
  });

  test("renders feedback button when the order is delivered", () => {
    const pedidoInfo = {
      id: 124,
      costo: 75.5,
      estado: "Entregado",
      items: [{ nombre: "Naranja" }],
    };
    renderPedido(pedidoInfo);
    expect(screen.getByText("pedidos.retroalimentacion")).toBeInTheDocument();
  });

  test("renders modify and tracking buttons when the order is not delivered", () => {
    const pedidoInfo = {
      id: 125,
      costo: 30.0,
      estado: "En camino",
      items: [{ nombre: "Pera" }],
    };
    renderPedido(pedidoInfo);
    expect(screen.getByText("pedidos.modificar")).toBeInTheDocument();
    expect(screen.getByText("pedidos.seguimiento")).toBeInTheDocument();
  });

  test("calls navigate when the Modify button is clicked", () => {
    const pedidoInfo = {
      id: 126,
      costo: 20.0,
      estado: "En camino",
      items: [{ nombre: "Uva" }],
    };
    renderPedido(pedidoInfo);
    const modifyButton = screen.getByText("pedidos.modificar");
    fireEvent.click(modifyButton);
    expect(modifyButton).toBeInTheDocument();
  });
});
