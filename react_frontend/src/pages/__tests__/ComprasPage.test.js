import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import ComprasPage from '../Compras/ComprasPage';
import PURCHASES from '../Compras/compras.json';

jest.mock('../../assets/images', () => ({
  cafe: 'cafe.jpg',
}));

const messages = {
    'compras-page.title': 'Compras',
    'compras-page.status': 'Estado',
};

describe('ComprasPage tests', () => {
  it('renders purchases from JSON when online', async () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
            <ComprasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      PURCHASES.forEach((purchase) => {
        expect(screen.getByText(purchase.nombre)).toBeInTheDocument();
      });
    });
  });

  it('renders cached purchases from localStorage when offline', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    localStorage.setItem('purchases', JSON.stringify(PURCHASES));
    render(
        <IntlProvider locale="es" messages={messages}>
            <BrowserRouter>
                <ComprasPage />
            </BrowserRouter>
        </IntlProvider>
    );

    await waitFor(() => {
      PURCHASES.forEach((purchase) => {
        expect(screen.getByText(purchase.nombre)).toBeInTheDocument();
      });
    });
    localStorage.removeItem('purchases');
  });

  it('renders "Historial" and "Detalles de pedido" in Spanish when locale is es', async () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
            <ComprasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('Historial')[0]).toBeInTheDocument();
    });
    expect(screen.getAllByText('Detalles de pedido')[0]).toBeInTheDocument();
  });

  it('renders the title correctly', async () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
            <ComprasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Compras')).toBeInTheDocument();
    });
  });

  it('renders the first status correctly', async () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <ComprasPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      const statusElements = screen.getAllByText(/Estado/);
      expect(statusElements[0]).toBeInTheDocument();
    });
  });
});