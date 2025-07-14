describe('Navegación al link /vende desde el header', () => {
    it('debe visitar / y navegar a /vende haciendo clic en el link Sell', () => {
      // 1. Visitar la página principal
      cy.visit('http://localhost:3000/');
  
      // 2. Buscar el link que dice "Sell" y hacer clic
      cy.contains('a', 'Sell').click();
  
      // 3. Verificar que navega a /vende
      cy.url().should('include', '/vende');
  
      // 4. Verificar que se despliega el formulario de venta
      cy.get('h2').should('contain.text', 'Register your crop');
    });
  });

  
  describe('Registro de un cultivo', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/vende');
    });
  
    it('debe completar el formulario y mostrar una alerta de registro exitoso', () => {
      // Obtener la fecha de hoy
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0]; // formato yyyy-mm-dd
  
      // 1. Llenar el formulario
      cy.get('select#tipo').select('Fruta');
      cy.get('input#nombre').type('Papaya');
      cy.get('input#cantidad').type('50');
      cy.get('input#precio').type('1500');
      cy.get('input#fechaCosecha').type(formattedToday);
  
      // 2. Subir una imagen
      const filePath = 'images/papaya.jpg'; // Debes tener esta imagen en cypress/fixtures/images/
      cy.get('input#imagen').attachFile(filePath);
  
      // 3. Ubicación
      cy.get('select#departamento').select('Antioquia');
      cy.get('input#ciudad').type('Medellín');
      cy.get('input#direccion').type('Cra 10 #20-30');
  
      // 4. Escuchar y verificar alerta
      cy.on('window:alert', (str) => {
        expect(str).to.contains('Crop successfully registered.');
      });
      
  
      // 5. Enviar el formulario
      cy.get('button.boton-registrar').click();
    });
  });
  
  