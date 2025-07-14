import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModificarPedido from "../../pages/Pedidos/modificarPedido";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";

import messagesEs from "../../locales/es.json";
import messagesEn from "../../locales/en.json";

const pedidoMock = {
  id: 123,
  items: [
    { nombre: "Producto A", precio: 15000 },
    { nombre: "Producto B", precio: 25000 },
  ],
  costo: 40000,
};

const renderModificarPedido = (pedido = pedidoMock, locale = "es") => {
  const messages = { en: messagesEn, es: messagesEs };

  return render(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <MemoryRouter initialEntries={[{ pathname: "/modificar/123", state: { pedido } }]}>
        <Routes>
          <Route path="/modificar/:id" element={<ModificarPedido />} />
        </Routes>
      </MemoryRouter>
    </IntlProvider>
  );
};

describe("ModificarPedido component", () => {
  test("muestra mensaje de no encontrado si no hay pedido", () => {
    renderModificarPedido(null);
    expect(screen.getByText("No se encontró información del pedido.")).toBeInTheDocument();
  });

  test("muestra el título del pedido", () => {
    renderModificarPedido();
    expect(screen.getByText((text) => text.includes("Modificar pedido #123"))).toBeInTheDocument();

  });

  test("muestra la información de los productos", () => {
    renderModificarPedido();
    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.getByText("Producto B")).toBeInTheDocument();
    expect(screen.getByText("15000 COP")).toBeInTheDocument();
    expect(screen.getByText("25000 COP")).toBeInTheDocument();
  });

  test("muestra el total del pedido", () => {
    renderModificarPedido();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("40000 COP")).toBeInTheDocument();
  });

  test("elimina el pedido al hacer clic en el botón", () => {
    window.alert = jest.fn();
    renderModificarPedido();
    const eliminarBtn = screen.getByText("Cancelar pedido");
    fireEvent.click(eliminarBtn);
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Pedido #"));
  });
});
