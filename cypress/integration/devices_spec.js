describe('Devices (CloudDevices)', function () {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('.app-login-form-email').type('hernandez.hs@gmail.com');
    cy.get('.app-login-form-password').type('123321');
    cy.wait(100);
    cy.get('.app-login-form-submit').click();
  });

  afterEach(() => {
    cy.get('.ngx-menu-link-logout').click();
  });
  
  it('Como usuario, debo ser capaz de crear un nuevo dispositivo y conectarme a la fuente de datos', function () {
    cy.get('.ngx-menu-link-device').click();
    cy.wait(100);
    cy.get('.ngx-menu-link-device-create').click();

    cy.get('.app-device-general-name').type('Dispositivo 1');
    cy.get('.app-device-general-type').select('0');
    cy.get('.app-device-general-datasource').type('device-1');
    cy.get('.app-device-general-model').type('knx-v200');
    cy.get('.app-device-general-description').type('Este es un dispositivo de prueba');
    cy.get('.app-device-single-create').click();
    cy.wait(100);
  });

  it('Como usuario, debo poder ver la lista de todos los dispositivos que tengo en mi panel', function () {
    cy.get('.ngx-menu-link-device').click();
    cy.wait(100);
    cy.get('.ngx-menu-link-device-list').click();
  });
});
