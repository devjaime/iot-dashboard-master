
describe('Authentication and public pages', function () {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  it('Como usuario, debo ser capaz de restablecer mi contraseña con el token', function () {
    cy.visit('http://localhost:4200/#/reset-password/543654');
    cy.get('.app-reset-password-pass1').click().type('123321');
    cy.get('.app-reset-password-pass2').click().type('123321');
    cy.wait(100);
    cy.get('.app-reset-password-key').should($el => {
      expect($el[0].value).to.eq('543654');
    })
    cy.get('.app-reset-password-pass1').click().type('{enter}');
    
  });
  it('Como usuario, debo poder registrarme usando un correo electrónico y una contraseña', function () {
    cy.get('.login-header span').should(($el) => {
      expect($el).to.contain('Bienvenido');
    });
    cy.get('.app-signup-button').click();
    cy.wait(100);
    cy.get('.app-signup-form-email').type('hernandez.hs@gmail.com');
    cy.get('.app-signup-form-password').type('123321');
    cy.wait(100);
    cy.get('.app-signup-form-submit').click();
  });

  it('Como usuario, debo poder iniciar sesión en mi panel con mi correo electrónico y contraseña.', function () {
    cy.get('.app-login-form-email').type('hernandez.hs@gmail.com');
    cy.get('.app-login-form-password').type('123321');
    cy.wait(100);
    cy.get('.app-login-form-submit').click();
  });
  it('Como usuario, debo poder solicitar una contraseña olvidada y obtener un enlace al enviar mi correo electrónico', () => {
    cy.get('.app-forget-password-link').click();
    cy.get('.app-forget-password-email').type('hernandez.hs@gmail.com').type('{enter}');
    cy.wait(100);
    cy.get('.success-message .success-text').should(($el) => {
      expect($el).to.contain('Request success');
    });
  });   
});
