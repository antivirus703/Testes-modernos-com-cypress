/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('nortonberbert@gmail.com', 'Comunidade03@')
    cy.resetApp()
  })

  it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta inicial')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it('Should update an account', () => {
    cy.acessarMenuConta()
    cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
    cy.get(loc.CONTAS.NOME)
      .clear()
      .type('Conta nova')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })

  it('Should not creat an account with same name', () => {
    cy.acessarMenuConta()
    cy.get(loc.CONTAS.NOME).type('Conta nova')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  }) // adicionado "testIsolation: false", no cypress.config.js para que não retornem para a página vazia em cada teste

  it('Should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(loc.MOVIMENTACAO.VALOR).type('123')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Nubank')
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    cy.get(loc.EXTRATO.BUSCA_ELEMENTO).should('exist')
  })
})  

