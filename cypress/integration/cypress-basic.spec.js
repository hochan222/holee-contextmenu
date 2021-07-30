describe('initial page behavior', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('input값 입력 했을때 잘 들어가는지 확인', () => {
    // cy.get('.w-100[type=text]').type('holee');
    // cy.get('.w-100[type=text]').should('have.value', 'holee');
  });
});
