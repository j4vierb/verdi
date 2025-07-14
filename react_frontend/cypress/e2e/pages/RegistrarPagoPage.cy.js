// cypress/e2e/registrar_pago.cy.js

// TODO: Add more tests
describe('RegistrarPagoPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/app/payment-method/');
  });

  it('debería mostrar errores si el formulario está vacío', () => {
    cy.get('button').contains('Registrar').click();
    cy.get('.text-danger').should('have.length.at.least', 1);
  });

  it('debería registrar el pago si todos los datos son válidos', () => {
    cy.get('input[name="cardType"][value="Visa"]').check();

    cy.get('input[name="cardNumber"]').type('1234567812345678');

    cy.get('input[name="expirationMonth"]').type('12');
    cy.get('input[name="expirationYear"]').type(`${new Date().getFullYear() + 1}`);

    cy.get('input[name="cvn"]').type('123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    cy.get('button').contains('Registrar').click();

    cy.get('@alert').should('have.been.calledWith', 'Pago registrado con éxito');
  });
});
