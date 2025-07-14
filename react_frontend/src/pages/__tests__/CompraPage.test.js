// src/pages/tests/CompraPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CompraPage from "../Compra/CompraPage";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../Compra/CompraPageMessages";

const renderCompraPage = (locale = "en") => {
  return render(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <MemoryRouter>
        <CompraPage />
      </MemoryRouter>
    </IntlProvider>
  );
};

describe("CompraPage", () => {
  test("renderiza el título principal", () => {
    renderCompraPage();
    expect(screen.getByText("Buy fresh and local products")).toBeInTheDocument();
  });

  test("muestra los botones de filtro de categoría", () => {
    renderCompraPage();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getByText("Vegetables")).toBeInTheDocument();
    expect(screen.getByText("Best Sellers")).toBeInTheDocument();
  });

  test("permite escribir en la barra de búsqueda", () => {
    renderCompraPage();
    const searchBar = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchBar, { target: { value: "fresa" } });
    expect(searchBar.value).toBe("fresa");
  });

  test("muestra productos visibles inicialmente", () => {
    renderCompraPage();
    expect(screen.getByText("Fresa")).toBeInTheDocument();
    expect(screen.getByText("Mora")).toBeInTheDocument();
  });

  test("agrega y muestra productos en el carrito", () => {
    renderCompraPage("en");

    const botonesAgregar = screen.getAllByText("Add to cart");
    fireEvent.click(botonesAgregar[0]);

    const botones = screen.getAllByRole("button");
    const botonCarrito = botones.find(btn => btn.className.includes("boton-carrito-icono"));
    fireEvent.click(botonCarrito);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Fresa")).toBeInTheDocument();
    expect(screen.getByText(/x 1/)).toBeInTheDocument();
  });

  test("elimina productos del carrito", () => {
    renderCompraPage("en");

    const botonesAgregar = screen.getAllByText("Add to cart");
    fireEvent.click(botonesAgregar[0]);
    fireEvent.click(botonesAgregar[0]);

    const botones = screen.getAllByRole("button");
    const botonCarrito = botones.find(btn => btn.className.includes("boton-carrito-icono"));
    fireEvent.click(botonCarrito);

    expect(screen.getByText(/x 2/)).toBeInTheDocument();

    const eliminarBtn = screen.getAllByRole("button").find(btn =>
      btn.className.includes("boton-eliminar")
    );
    fireEvent.click(eliminarBtn);

    expect(screen.getByText(/x 1/)).toBeInTheDocument();
  });

  test("deshabilita flecha izquierda al inicio", () => {
    renderCompraPage();
    const flechaIzquierda = screen.getByText("❮");
    expect(flechaIzquierda).toBeDisabled();
  });
});
