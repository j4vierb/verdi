import { render, screen } from "@testing-library/react";
import GeneralStats from "../GeneralStats/GeneralStats";

describe("GeneralStats component", () => {
  test("renderiza bloques de estadísticas sin errores", () => {
    render(<GeneralStats />);

    // Verifica que se rendericen al menos 4 estadísticas (basado en <h3>)
    const statBoxes = screen.getAllByRole("heading", { level: 3 });
    expect(statBoxes.length).toBeGreaterThanOrEqual(1);

    // Verifica que haya múltiples textos que contengan '%'
    const porcentajes = screen.getAllByText((content) => content.includes("%"));
    expect(porcentajes.length).toBeGreaterThan(0);

    // Verifica que haya múltiples elementos que contienen la palabra "total"
    const totales = screen.getAllByText(/total/i);
    expect(totales.length).toBeGreaterThan(0);
  });
});
