describe('example e2e', () => {
  it('loads the kitchen sink', () => {
    cy.visit('/');
    cy.contains('Kitchen Sink');
  });
});