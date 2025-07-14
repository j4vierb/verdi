import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header/Header";
import messages from "../Header/HeaderMessages";

describe("Header", () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, "language", {
      value: "en",
      configurable: true,
    });
  });

  test("renderiza todos los enlaces y botones correctamente", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Verifica el logo
    expect(screen.getByText(/verdi/i)).toBeInTheDocument();

    // Verifica los links con texto traducido (en inglés)
    expect(screen.getByRole("link", { name: messages.en.sell })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.buy })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.about_us })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.country })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.my_harvests })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.my_orders })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.statistics })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: messages.en.Profile })).toBeInTheDocument();

    // Botones de login y register
    expect(screen.getByRole("button", { name: messages.en.login })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: messages.en.register })).toBeInTheDocument();
  });
});
