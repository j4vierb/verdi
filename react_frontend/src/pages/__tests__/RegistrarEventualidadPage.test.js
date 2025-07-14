import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import RegistrarEventualidadPage from '../admin/RegistrarEventualidad/RegistrarEventualidadPage';

const messages = {
  "admin-register-eventuality.title": "Registrar eventualidad",
  "admin-register-eventuality.form.title": "Título",
  "admin-register-eventuality.form.description": "Descripción",
  "admin-register-eventuality.form.priority": "Prioridad",
  "admin-register-eventuality.form.priority-low": "Baja",
  "admin-register-eventuality.form.priority-medium": "Media",
  "admin-register-eventuality.form.priority-high": "Alta",
  "admin-register-eventuality.form.cancel": "Cancelar",
  "admin-register-eventuality.form.save": "Guardar",
  "admin-register-eventuality.form.error.title": "El título es requerido",
  "admin-register-eventuality.form.error.description": "La descripción es requerida",
  "admin-register-eventuality.form.error.priority": "La prioridad es requerida"
};

describe('RegistrarEventualidadPage', () => {
  it('renders the page title correctly', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <RegistrarEventualidadPage />
        </BrowserRouter>
      </IntlProvider>
    );

    expect(screen.getAllByText(/Registrar eventualidad/)[0]).toBeInTheDocument();
  });

  it('renders the EventualidadForm component with all form fields and buttons', () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <RegistrarEventualidadPage />
        </BrowserRouter>
      </IntlProvider>
    );

    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Prioridad')).toBeInTheDocument();

    expect(screen.getByText('Baja')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText('Alta')).toBeInTheDocument();

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });
});