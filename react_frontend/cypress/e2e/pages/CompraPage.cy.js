describe('Navegación al link /compra desde el header', () => {
    it('debe visitar / y navegar a /compra haciendo clic en el link Buy', () => {
      // 1. Visitar la página inicial
      cy.visit('http://localhost:3000/');
  
      // 2. Buscar el link que dice "Buy" y hacer clic
      cy.contains('a', 'Buy').click();
  
      // 3. Verificar que se navega al path correcto
      cy.url().should('include', '/compra');
    });
  });

  describe('Despliegue de la página de compra', () => {
    it('debe mostrar la página de compra correctamente', () => {
      cy.visit('http://localhost:3000/compra');
  
      // Verifica el título principal de la sección
      cy.get('h2').contains('Buy fresh and local products');
  
      // Verifica que haya botones de filtro visibles
      cy.get('.filtro-categorias button').should('have.length.at.least', 1);
  
      // Verifica que existan productos renderizados
      cy.get('.producto-card').should('have.length.at.least', 1);
    });
  });
  

describe('Filtrado de productos en la página de compra', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/compra');
  });

  it('debe mostrar productos al cargar la página', () => {
    cy.get('.producto-card').should('have.length.at.least', 1);
  });

  it('debe filtrar productos por categoría al hacer clic en los botones', () => {
    // Guardar los productos iniciales
    cy.get('.producto-card h3').then(($productosIniciales) => {
      const nombresIniciales = [...$productosIniciales].map(p => p.textContent.trim());

      // Click en "Fruits"
      cy.contains('button', 'Fruits').click();

      // Esperar a que los productos cambien
      cy.wait(300); // puedes ajustar esto según si el cambio es animado o no

      cy.get('.producto-card h3').then(($productosFiltrados) => {
        const nombresFiltrados = [...$productosFiltrados].map(p => p.textContent.trim());

        // Verificar que el contenido haya cambiado
        expect(nombresFiltrados).to.not.deep.equal(nombresIniciales);
      });
    });
  });

  it('debe aplicar correctamente el filtro "Vegetables"', () => {
    cy.contains('button', 'Vegetables').click();
    cy.wait(300);
    cy.get('.producto-card h3').each(($producto) => {
      // Esto es opcional si quieres verificar contenido específico
      cy.wrap($producto.text()).should('not.be.empty');
    });
  });

  it('debe aplicar correctamente el filtro "Best Sellers"', () => {
    cy.contains('button', 'Best Sellers').click();
    cy.wait(300);
    cy.get('.producto-card').should('exist');
  });
});

describe('Carrito de compras', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/compra');
  });

  it('debe agregar un producto al carrito y eliminarlo correctamente', () => {
    // Agregar primer producto
    cy.get('.producto-card').first().within(() => {
      cy.contains('Add to cart').click();
    });

    // Abrir carrito
    cy.get('.boton-carrito-icono').click();

    // Verificar que hay al menos un ítem en el carrito
    cy.get('.carrito-dropdown ul li')
      .should('have.length.at.least', 1)
      .and('contain.text', 'x') // texto tipo "Lechuga x 2"

    // Hacer clic en el botón de eliminar
    cy.get('.carrito-dropdown ul li').first().within(() => {
      cy.get('.boton-eliminar').click();
    });

    // Verificar que el carrito queda vacío
    cy.get('.carrito-dropdown').should('contain.text', 'The cart is empty');

    // Verificar que el contador se actualiza a 0 o desaparece
    cy.get('.contador-carrito').should('not.exist');
  });
});

describe('Proceso de checkout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/compra');
  });

  it('debe agregar un producto, ir a checkout y verificar que esté presente', () => {
    // Agregar el producto "Lechuga"
    cy.get('.producto-card').filter(':contains("Lechuga")').first().within(() => {
      cy.contains('Add to cart').click();
    });

    // Abrir el carrito
    cy.get('.boton-carrito-icono').click();

    // Verificar que Lechuga aparece en el carrito
    cy.get('.carrito-dropdown ul li').should('contain.text', 'Lechuga');

    // Ir a checkout
    cy.get('.boton-checkout').click();

    // Confirmar redirección
    cy.url().should('include', '/checkout');

    // Verificar que "Lechuga" aparece en la página de checkout
    cy.get('.carrito-lista li.carrito-item').should('contain.text', 'Lechuga');
  });
});






