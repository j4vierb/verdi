describe('ComprasPage', () => {
  const purchasesMock = [
    {
      id: "1",
      nombre: "Café especial",
      estado: "entregado"
    },
    {
      id: "2",
      nombre: "Café premium",
      estado: "pendiente"
    }
  ];

  beforeEach(() => {
    // Simula modo offline
    cy.visit('http://localhost:3000/compras/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator, 'onLine').value(false); // Fuerza offline
        win.localStorage.setItem("purchases", JSON.stringify(purchasesMock));
      }
    });
  });

  it('muestra las compras desde localStorage', () => {
    cy.contains('Café especial').should('exist');
    cy.contains('Café premium').should('exist');

    cy.contains('entregado', { matchCase: false }).should('exist');
    cy.contains('pendiente', { matchCase: false }).should('exist');

    // Validar botones
    cy.get('a').contains(/Historial|History/).should('have.attr', 'href', '/app/purchases/1');
    cy.get('a').contains(/Detalles de pedido|Order details/).should('have.attr', 'href', '/app/purchases/1');

    cy.get('.purchases-card').eq(1).within(() => {
      cy.contains(/Historial|History/).should('have.attr', 'href', '/app/purchases/2');
      cy.contains(/Detalles de pedido|Order details/).should('have.attr', 'href', '/app/purchases/2');
    });
  });
});
