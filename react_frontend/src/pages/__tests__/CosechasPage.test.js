import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import CosechasPage from '../admin/CosechasPage/CosechasPage';

const messages = {
  "admin-harvest-page.title": "Panel de administrador",
  "admin-harvest-page.subtitle": "Nuevas cosechas",
  "admin-harvest-page.detail": "Detalles",
  "admin-harvest-page.status-button.verify": "Verificar",
  "admin-harvest-page.status-button.publish": "Publicar",
  "admin-harvest-page.status-button.withdraw": "Retirar"
};

describe('CosechasPage tests', () => {
  it('renders the title and subtitle correctly', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <CosechasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    expect(await screen.findByText('Panel de administrador')).toBeInTheDocument();
    expect(await screen.findByText('Nuevas cosechas')).toBeInTheDocument();
  });

  it('renders all harvest cards', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <CosechasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      const harvestCards = screen.getAllByText('Detalles');
      expect(harvestCards).toHaveLength(9);
    });
  });

  it('renders all crop names correctly', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <CosechasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    const expectedNames = [
      "Café Barako",
      "Mandarina Oneco",
      "Tomate de árbol",
      "Café Barako",
      "Mandarina Oneco",
      "Tomate de árbol",
      "Café Barako",
      "Mandarina Oneco",
      "Tomate de árbol"
    ];

    for (const name of expectedNames) {
      expect(await screen.findAllByText(name)).not.toHaveLength(0);
    }
  });

  it('renders the correct action buttons for each status', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <CosechasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    expect(await screen.findAllByText('Detalles')).toHaveLength(9);
    expect(await screen.findAllByText('Verificar')).toHaveLength(3);
    expect(await screen.findAllByText('Publicar')).toHaveLength(3);
    expect(await screen.findAllByText('Retirar')).toHaveLength(3);
  });
});
