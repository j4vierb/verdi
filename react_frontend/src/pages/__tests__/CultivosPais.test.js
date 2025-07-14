import { render, screen } from "@testing-library/react";
import CultivosPais from "../CultivosPais/CultivosPais";
import messages from "../CultivosPais/CultivosMessages";

// Mock del componente Cultivo
jest.mock("../CultivosPais/Cultivo", () => ({ info }) => <div>{info.nombre}</div>);

test("Renderiza el título traducido al español", () => {
    // Forzar idioma español antes de renderizar
    Object.defineProperty(window.navigator, "language", {
        value: "es",
        configurable: true,
    });

    render(<CultivosPais />);
    const titleText = screen.getByText(messages["es"].title);
    expect(titleText).toBeInTheDocument();
});

test("Renderiza los 3 cultivos en pantalla", () => {
    render(<CultivosPais />);
    const cultivos = screen.getAllByText(/Café Barako|Mandarina Oneco|Tomate de árbol/);
    expect(cultivos.length).toBe(3);
});

