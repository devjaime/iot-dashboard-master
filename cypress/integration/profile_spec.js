describe('Profile test', function () {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('.app-login-form-email').type('hernandez.hs@gmail.com');
    cy.get('.app-login-form-password').type('123321');

    cy.wait(100);
    cy.get('.app-login-form-submit').click();
  });

  afterEach(() => {
    // cy.get('.ngx-menu-link-logout').click();
  });
  
  it('Debe actualizar los detalles del perfil del usuario, como nombre, apellido y teléfono', function () {
    cy.get('.app-profile-view').click();
    cy.wait(100);

    cy.get('.app-profile-firstname').clear().type('Jaime');
    cy.get('.app-profile-lastname').clear().type('Hernandez');
    cy.get('.app-profile-phone').clear().type('+601151100000');
    cy.get('.app-profile-update').click();
  });

  // it('We must able to see devices list and created device as well.', function () {
  //   cy.get('.ngx-menu-link-device').click();
  //   cy.wait(100);
  //   cy.get('.ngx-menu-link-device-list').click();

  //   cy.get('.app-devices-table').find('tr').should('have.length', 11);
  // });
});
