import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrarPagoPage from '../RegistrarPago/RegistrarPagoPage';
import { IntlProvider } from 'react-intl';

const messages = {
    'register-payment-method.title': 'Registrar Pago',
    'register-payment-method.card-type': 'Tipo de tarjeta',
    'register-payment-method.card-number': 'Número de tarjeta',
    'register-payment-method.expiration-month': 'Mes de expiración',
    'register-payment-method.expiration-year': 'Año de expiración',
    'register-payment-method.errors.card-type': 'Seleccione un tipo de tarjeta',
    'register-payment-method.errors.card-number': 'Número de tarjeta inválido',
    'register-payment-method.errors.expiration-month': 'Mes inválido',
    'register-payment-method.errors.expiration-year': 'Año inválido',
    'register-payment-method.errors.cvn': 'CVN inválido',
    'register-payment-method.cancel': 'Cancelar',
    'register-payment-method.submit': 'Registrar',
};

describe('RegistrarPagoPage', () => {
  it('renders the form correctly', () => {
    render(
      <IntlProvider messages={messages} locale="es">
        <RegistrarPagoPage />
      </IntlProvider>
    );

    expect(screen.getByText('Registrar Pago')).toBeInTheDocument();
    expect(screen.getByText('Tipo de tarjeta')).toBeInTheDocument();
    expect(screen.getByText('Número de tarjeta')).toBeInTheDocument();
    expect(screen.getByText('Mes de expiración')).toBeInTheDocument();
    expect(screen.getByText('Año de expiración')).toBeInTheDocument();
    expect(screen.getByText('CVN')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Registrar')).toBeInTheDocument();
  });


  it('displays card type error when not selected', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <RegistrarPagoPage />
      </IntlProvider>
    );
    fireEvent.click(screen.getByText('Registrar'));
    expect(screen.getByText('Seleccione un tipo de tarjeta')).toBeInTheDocument();
  });

  it('displays card number error for invalid number', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <RegistrarPagoPage />
      </IntlProvider>
    );
    fireEvent.click(screen.getByText('Visa'));
    fireEvent.change(screen.getByPlaceholderText('409* **** **** ****'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText('Registrar'));
    expect(screen.getByText('Número de tarjeta inválido')).toBeInTheDocument();
  });

  it('displays expiration month error for invalid month', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <RegistrarPagoPage />
      </IntlProvider>
    );
    fireEvent.click(screen.getByText('Visa'));
    fireEvent.change(screen.getByPlaceholderText('Mes'), { target: { value: '13' } });
    fireEvent.click(screen.getByText('Registrar'));
    expect(screen.getByText('Mes inválido')).toBeInTheDocument();
  });

  it('displays expiration year error for invalid year', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <RegistrarPagoPage />
      </IntlProvider>
    );
    fireEvent.click(screen.getByText('Visa'));
    fireEvent.change(screen.getByPlaceholderText('Año'), { target: { value: '2000' } });
    fireEvent.click(screen.getByText('Registrar'));
    expect(screen.getByText('Año inválido')).toBeInTheDocument();
  });

  it('displays cvn error for invalid cvn', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <RegistrarPagoPage />
      </IntlProvider>
    );
    fireEvent.click(screen.getByText('Visa'));
    fireEvent.change(screen.getByPlaceholderText('***'), { target: { value: '12' } });
    fireEvent.click(screen.getByText('Registrar'));
    expect(screen.getByText('CVN inválido')).toBeInTheDocument();
  });
});