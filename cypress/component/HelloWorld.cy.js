import React from 'react';

describe('HelloWorld component', () => {
  it('renders greeting', () => {
    cy.mount(React.createElement('div', null, 'Hello Cypress'));
    cy.contains('Hello Cypress').should('be.visible');
  });
});