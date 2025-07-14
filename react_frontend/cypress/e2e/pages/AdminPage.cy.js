describe('Navegación al Admin Panel desde el header', () => {
    it('debe visitar / y navegar a /admin/estadisticas haciendo clic en el link Statistics', () => {
      // 1. Visitar la página principal
      cy.visit('http://localhost:3000/');
  
      // 2. Buscar el link que dice "Statistics" y hacer clic
      cy.contains('a', 'Statistics').click();
  
      // 3. Verificar que navega al path correcto
      cy.url().should('include', '/admin/estadisticas');
  
      // 4. Verificar que carga el Admin Panel
      cy.get('h2').should('contain.text', 'Admin Panel');
    });
  });

  
describe('Admin Panel - Estadísticas', () => {
beforeEach(() => {
    cy.visit('http://localhost:3000/admin/estadisticas');
});

it('debe cargar correctamente el panel de administración', () => {
    // Verificar el título del admin panel
    cy.get('h2').should('contain.text', 'Admin Panel');

    // Verificar que existen 4 estadísticas (total users, active orders, etc.)
    cy.get('.general-stats .stat-box').should('have.length', 4);

    // Verificar que cada stat-box tenga un número y una descripción
    cy.get('.general-stats .stat-box').each(($box) => {
    cy.wrap($box).find('h3').should('exist');
    cy.wrap($box).find('p').should('exist');
    });

    // Verificar que existen las gráficas
    cy.get('.stats-chart canvas').should('be.visible');
    cy.get('.orders-chart canvas').should('be.visible');

    // Verificar que aparece una reseña de usuario
    cy.get('.reviews-carousel h3').should('contain.text', 'User Reviews');
    cy.get('.review-card').should('exist');
    cy.get('.review-card h4').should('not.be.empty');
    cy.get('.review-card p').should('have.length.at.least', 3);

    // Verificar que hay botones para moverse en el carrusel
    cy.get('.carousel-buttons button').should('have.length', 2);

    // Hacer clic en los botones del carrusel (❮ y ❯)
    cy.get('.carousel-buttons button').first().click(); // botón anterior
    cy.get('.carousel-buttons button').last().click();  // botón siguiente
});
});
  