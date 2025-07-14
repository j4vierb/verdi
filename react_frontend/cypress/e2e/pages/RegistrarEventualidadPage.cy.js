describe('Registrar Eventualidad Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/registrar-eventualidad');
  });

  it('debería mostrar el título de la página', () => {
    cy.contains('Registrar eventualidad').should('be.visible');
  });

  it('debería mostrar errores al intentar enviar el formulario vacío', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('El título es requerido').should('exist');
    cy.contains('La descripción es requerida').should('exist');
    cy.contains('La prioridad es requerida').should('exist');
  });

  it('debería enviar el formulario correctamente con datos válidos', () => {
    cy.get('#formTitle').type('No hay suficientes alimentos');
    cy.get('#formDescription').type('El campesino no tiene suficientes alimentos como se indica en la publicación.');
    cy.get('label.btn-danger').click({force: true});
  
    cy.get('button[type="submit"]').click({force: true});
  });
});