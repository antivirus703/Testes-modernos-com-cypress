/// <reference types="cypress"/>

describe('Helpers', () => {
  it('Wrap', () => {
    const obj = { nome: 'User', idade: 20}
    expect(obj).to.have.property('nome')
    cy.wrap(obj).should('have.property','nome')
    //faz um wrap do objeto, ele esta encapsulado pelo cypress e agora é possível utilizar o should em cima dele

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    // cy.get('#formNome').then($el => {
    //   $el.val('funciona via jquery')
    //  cy.wrap($el).type('funciona via cypress')
    // })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        
      })
    })
  })
})