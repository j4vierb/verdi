import { render, screen, fireEvent } from "@testing-library/react";
import Cosecha from "../Cosechas/Cosecha";

describe("Cosecha", () => {
  const info = {
    nombre: "Café Barako 1",
    cantidad: 7,
    vendida: 2,
    imagen: "cafe.webp",
    fechaRecoleccion: new Date("2025-11-02"),
  };

  test("Muestra nombre, fecha, cantidad, vendidas y en venta", () => {
    render(<Cosecha info={info} onModificar={() => {}} />);

    expect(screen.getByText("Café Barako 1")).toBeInTheDocument();
    expect(screen.getByText("7 Toneladas")).toBeInTheDocument();
    expect(screen.getByText("¡2 toneladas vendidas!")).toBeInTheDocument();
    expect(screen.getByText("5 toneladas en venta")).toBeInTheDocument();
  });

  test("Llama a onModificar cuando se hace clic en el botón 'Modificar'", () => {
    const mockModificar = jest.fn();
    render(<Cosecha info={info} onModificar={mockModificar} />);

    fireEvent.click(screen.getByText("Modificar"));
    expect(mockModificar).toHaveBeenCalledTimes(1);
  });
});