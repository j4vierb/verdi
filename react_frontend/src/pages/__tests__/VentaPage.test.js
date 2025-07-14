import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VentaPage from "../Venta/VentaPage";
import messages from "../Venta/VentaPageMessages";

describe("VentaPage", () => {
  test("muestra el título", () => {
    render(<VentaPage />);
    expect(
      screen.getByRole("heading", { name: /register your crop/i })
    ).toBeInTheDocument();
  });

  test("envía el formulario correctamente", () => {
    Object.defineProperty(window.navigator, "language", {
      value: "en",
      configurable: true,
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<VentaPage />);
  
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "Fruta" } }); // tipo
  
    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Mango" } }); // nombre
    fireEvent.change(textboxes[1], { target: { value: "Medellín" } }); // ciudad
    fireEvent.change(textboxes[2], { target: { value: "Calle 123" } }); // dirección
  
    const spinbuttons = screen.getAllByRole("spinbutton");
    fireEvent.change(spinbuttons[0], { target: { value: "100" } }); // cantidad
    fireEvent.change(spinbuttons[1], { target: { value: "2000" } }); // precio
  
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - 5);
    const fechaStr = fecha.toISOString().split("T")[0];
    const fechaInput = screen.getByLabelText(/harvest date/i);

    fireEvent.change(fechaInput, { target: { value: fechaStr } });
  
    const fileInput = screen.getByLabelText(/crop photo/i);
    const file = new File(["img"], "foto.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    fireEvent.change(selects[1], { target: { value: "Antioquia" } }); // departamento
  
    fireEvent.click(
      screen.getByRole("button", { name: /register your crop/i })
    );
  
    expect(window.alert).toHaveBeenCalledWith(messages["en"].success_message);
  });
  
});
