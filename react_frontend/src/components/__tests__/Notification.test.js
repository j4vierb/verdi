import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from '../Notification/Notification';

describe('Notification', () => {
  const baseNotification = {
    title: "Corte de agua",
    description: "No habrá agua el lunes en el sector norte",
  };

  it('muestra correctamente una notificación con prioridad Alta (2)', () => {
    const notification = { ...baseNotification, relevance: 2 };
    render(<Notification notification={notification} />);

    expect(screen.getByText("Corte de agua")).toBeInTheDocument();
    expect(screen.getByText("No habrá agua el lunes en el sector norte")).toBeInTheDocument();
    const tag = screen.getByText("Alta");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveStyle({ backgroundColor: 'red' });
  });

  it('muestra correctamente una notificación con prioridad Media (1)', () => {
    const notification = { ...baseNotification, relevance: 1 };
    render(<Notification notification={notification} />);

    const tag = screen.getByText("Media");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveStyle({ backgroundColor: 'orange' });
  });

  it('muestra correctamente una notificación con prioridad Baja (0)', () => {
    const notification = { ...baseNotification, relevance: 0 };
    render(<Notification notification={notification} />);

    const tag = screen.getByText("Baja");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveStyle({ backgroundColor: 'green' });
  });
});
