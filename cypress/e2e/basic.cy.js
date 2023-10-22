/// <reference types="cypress"/>

describe('Cypress basics', () => {
  it.only('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    // const title = cy.title()
    // console.log(title)

    // cy.pause() // vai fazendo cada teste e parando

    cy.title().should('be.equal', 'Campo de Treinamento')
    cy.title().should('contain', 'Campo')

    cy.title()
    .should('be.equal', 'Campo de Treinamento')
    .and('contain', 'Campo')//.debug() //utilizando  debug no final ele verifica a informação no should
    //colocando o should no title, busca o titulo da página

    let syncTitle

    cy.title().then(title => {
      console.log(title)

      cy.get('#formNome').type(title) //escreve o log em um campo de texto

      syncTitle = title
      //cy.get('[data-cy=dataSobrenome]').type(syncTitle)
    })

    cy.get('[data-cy=dataSobrenome]').then($el => { 
      $el.val(syncTitle) //escreve o log em um campo de texto
    })

    cy.get('#elementosForm\\:sugestoes').then($el => {
      cy.wrap($el).type(syncTitle) //escreve o log em um campo de texto
    })

  })

  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
    .click()
    .should('have.value', 'Obrigado!')
  })
})
