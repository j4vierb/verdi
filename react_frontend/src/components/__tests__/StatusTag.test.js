import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import StatusTag from '../StatusTag/StatusTag';

const statuses = [
  { value: 'En camino', es: 'En camino', en: 'Shipped', color: '#34c759' },
  { value: 'Procesando pedido', es: 'Procesando pedido', en: 'Processing', color: '#00c7bd' },
  { value: 'Entregado', es: 'Entregado', en: 'Delivered', color: '#007aff' },
];

describe('StatusTag', () => {
  statuses.forEach(({ value, es, en, color }) => {
    it(`renderiza correctamente el estado "${value}" en español`, () => {
      render(
        <IntlProvider locale="es">
          <StatusTag status={value} />
        </IntlProvider>
      );

      const tag = screen.getByText(es);
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveStyle(`background-color: ${color}`);
      expect(tag).toHaveClass('status-tag');
    });

    it(`renderiza correctamente el estado "${value}" en inglés`, () => {
      render(
        <IntlProvider locale="en">
          <StatusTag status={value} />
        </IntlProvider>
      );

      const tag = screen.getByText(en);
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveStyle(`background-color: ${color}`);
      expect(tag).toHaveClass('status-tag');
    });
  });
});
