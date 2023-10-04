/// <reference types="cypress"/>

describe('Cypress basics', () => {
  it('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    // const title = cy.title()
    // console.log(title)

    cy.pause() // vai fazendo cada teste e parando

    cy.title()
    .should('be.equal', 'Campo de Treinamento')
    .and('contain', 'Campo')//.debug() //utilizando  debug no final ele verifica a informação no should
    //colocando o should no title, busca o titulo da página

  })

  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
    .click()
    .should('have.value', 'Obrigado!')
  })
})
