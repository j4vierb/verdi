/// <reference types="cypress" />

describe('Página principal', () => {
  it('debería cargar correctamente y mostrar el título', () => {
    cy.visit('http://localhost:3000'); // Cambia esto a tu URL real

    cy.contains('¡Bienvenidos al campo!').should('be.visible'); // Cambia el texto según tu app
  });
});