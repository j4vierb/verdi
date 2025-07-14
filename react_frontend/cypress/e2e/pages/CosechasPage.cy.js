describe('CosechasPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/cosechas');
  });

  it('debería mostrar el título y la lista de cosechas', () => {
    cy.get('.purchases-title h2').should('exist');

    cy.get('.admin-cosechas-list h3').should('exist');

    cy.get('.cosechas-list .card-cultivo')
      .should('have.length.at.least', 1);

    cy.get('.cosechas-list .card-cultivo').each(($el) => {
      cy.wrap($el).find('button').should('have.length', 2);
    });
  });

  it('debería cargar las cosechas desde localStorage si está offline', () => {
    // Simula datos previos en localStorage
    const mockData = [{ id: 1, estado: "Verificado", nombre: "Cosecha A" }];
    localStorage.setItem('notifications', JSON.stringify(mockData));

    // Fuerza estado offline
    cy.visit('http://localhost:3000/admin/cosechas', {
      onBeforeLoad(win) {
        cy.stub(win.navigator, 'onLine').value(false);
      }
    });
  });
});
