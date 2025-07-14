import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import NotificationsPage from '../admin/NotificationsPage/NotificationsPage';
import NOTIFICATIONS from '../admin/NotificationsPage/notifications.json';


const messages = {
  "admin-notifications-page.title": "Panel de administración",
  "admin-notifications-page.subtitle": "Notificaciones",
  "admin-notifications-page.relevance.high": "Alta",
  "admin-notifications-page.relevance.mid": "Media",
  "admin-notifications-page.relevance.low": "Baja",
};

describe('NotificationsPage tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders notifications from JSON', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <NotificationsPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      const visited = {};
      NOTIFICATIONS.forEach(notification => {
        const notificationElement = screen.getAllByText(notification.title);
        notificationElement.forEach(element => {
          const id = element.getAttribute('id');
          if (visited[id]) {
            return;
          } else {
            visited[id] = true;
          }

          expect(element).toBeInTheDocument();
        });
      });
    });
  });

  it('renders "Notificaciones" and "Panel de administración" in Spanish', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <NotificationsPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('Panel de administración')[0]).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getAllByText('Notificaciones')[0]).toBeInTheDocument();
    });
  });

  it('renders the title correctly', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <NotificationsPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Notificaciones')).toBeInTheDocument();
    });
  });

  it('renders the first status correctly', async () => {
    render(
      <IntlProvider locale="es" messages={messages}>
        <BrowserRouter>
          <NotificationsPage />
        </BrowserRouter>
      </IntlProvider>
    );

    await waitFor(() => {
      const statusElements = screen.getAllByText(/Clima complicado/);
      expect(statusElements[0]).toBeInTheDocument();
    });
  });
});
