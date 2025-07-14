describe('Página de Notificaciones', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/notificaciones/');
  });

  it('debería renderizar la lista de notificaciones desde el JSON o localStorage', () => {
    cy.get('.notifications-list .notification-card') // Asegúrate de que NotificationCard tenga esta clase
      .should('have.length.at.least', 1);
  });

  it('debería guardar las notificaciones en localStorage si está online', () => {
    cy.window().then((win) => {
      return new Cypress.Promise((resolve) => {
        const interval = setInterval(() => {
          const raw = win.localStorage.getItem('notifications');
          if (raw) {
            clearInterval(interval);
            resolve(JSON.parse(raw));
          }
        }, 100);
      }).then((stored) => {
        expect(stored).to.be.an('array').and.have.length.greaterThan(0);
      });
    });
  });
});
