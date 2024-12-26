

describe('Test de Integración - Log out', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/*.js', { statusCode: 200, body: '' });
    cy.visit('/login');


  });

  
  
    it('Debe cerrar sesión correctamente', () => {
        cy.get('input#email').type('juan@juan.com'); // Cambia el selector
        cy.get('input#password').type('juan');        
      cy.get('button[type="submit"]').click(); // Haz clic en el botón de login
  
  
      cy.get('button.log_out').eq(1).click();
      cy.get('button.register').should('be.visible');
      cy.get('button.log_in').should('be.visible')
  
      // Comprobar que el mensaje de bienvenida haya desaparecido
      cy.contains('Bienvenido,').should('not.exist');
  
    });
    

  });