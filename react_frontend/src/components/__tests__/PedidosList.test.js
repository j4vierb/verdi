import React from "react";
import { render, screen } from "@testing-library/react";
import PedidosList from "../PedidosList/PedidosList";
import messages from "../PedidosList/PedidosListMessages";
import { IntlProvider } from "react-intl";

describe("PedidosList component", () => {
  const renderWithIntl = (locale = "en") => {
    return render(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <PedidosList />
      </IntlProvider>
    );
  };

  test("renderiza el título de pedidos y la tabla de pedidos", () => {
    renderWithIntl("en");

    // Verifica que se renderiza el encabezado con texto traducido
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      messages.en.pending_orders
    );

    // Verifica que se renderizan filas de datos (1 encabezado + 6 pedidos = 7)
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThanOrEqual(7);
  });

  test("renderiza correctamente las columnas traducidas", () => {
    renderWithIntl("en");

    // Validamos columnas de encabezado
    expect(screen.getByText(messages.en.id)).toBeInTheDocument();
    expect(screen.getByText(messages.en.distance)).toBeInTheDocument();
    expect(screen.getByText(messages.en.date)).toBeInTheDocument();
    expect(screen.getByText(messages.en.status)).toBeInTheDocument();
  });
});
