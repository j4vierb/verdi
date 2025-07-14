import React from 'react';
import { render, screen } from '@testing-library/react';
import Cultivo from '../CultivoCard/Cultivo';
import { IntlProvider } from 'react-intl';

const cultivo = {
  id: 1,
  imagen: 'image.jpg',
  nombre: 'Café Barako',
  ubicacion: 'Armenia, Quindío',
  diasRestantes: 5,
  cantidad: '7-10 Toneladas',
  estado: 'Verificado'
};

describe('Cultivo component', () => {
  it('muestra correctamente los datos en español', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'es',
      configurable: true,
    });

    render(
      <IntlProvider locale="es" messages={{}}>
        <Cultivo admin={true} info={cultivo}>
          <button>Detalle</button>
        </Cultivo>
      </IntlProvider>
    );

    expect(screen.getByText('Verificado')).toBeInTheDocument();
    expect(screen.getByText('Café Barako')).toBeInTheDocument();
    expect(screen.getByText('Armenia, Quindío')).toBeInTheDocument();
    expect(screen.getByText('7-10 Toneladas')).toBeInTheDocument();
    expect(screen.getByText('¡Quedan 5 días para la cosecha!')).toBeInTheDocument();
    expect(screen.getByText('Detalle')).toBeInTheDocument();
  });

  it('muestra correctamente los datos en inglés', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'en',
      configurable: true,
    });

    render(
      <IntlProvider locale="en" messages={{}}>
        <Cultivo admin={true} info={{ ...cultivo, estado: 'Publicado' }}>
          <button>Details</button>
        </Cultivo>
      </IntlProvider>
    );

    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Café Barako')).toBeInTheDocument();
    expect(screen.getByText('7-10 Toneladas')).toBeInTheDocument();
    expect(screen.getByText('¡5 days left for the harvest!')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('no muestra el estado si no es admin', () => {
    render(
      <IntlProvider locale="es" messages={{}}>
        <Cultivo admin={false} info={cultivo} />
      </IntlProvider>
    );
    expect(screen.queryByText('Verificado')).not.toBeInTheDocument();
  });
});
