describe('holee-contextmenu basic test code', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Render contextmenu, when right-clicking on the (10px, 10px) position of the .red-box', () => {
    cy.get('.holee-menu').should('not.exist');
    cy.get('.red-box').rightclick(10, 10);
    cy.get('.holee-menu').should('exist');
  });
  it('Render contextmenu, when right-clicking on the (200px, 100px) position of the .red-box', () => {
    cy.get('.holee-menu').should('not.exist');
    cy.get('.red-box').rightclick(200, 100);
    cy.get('.holee-menu').should('exist');
  });
});
