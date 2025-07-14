import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StatusButton from '../StatusButton/StatusButton';

describe('StatusButton', () => {
  it('renderiza el botón con el texto y enlace correctos', () => {
    render(
      <MemoryRouter>
        <StatusButton href="/admin/dashboard" text="Ir al panel" />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Ir al panel/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/admin/dashboard');
    expect(link).toHaveClass('status-button');
  });
});
