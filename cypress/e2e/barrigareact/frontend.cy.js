/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
  before(() => {
    cy.intercept({
      method: 'POST',
      url: '/signin'
    },
      {
        id: 12565,
        nome: "Usuário falso",
        token: "string grande aceita"
      }
    ).as('signin')

    cy.intercept({
      method: 'GET',
      url: '/saldo'
    }, [{
      conta_id: 999,
      conta: "Conta fake 1",
      saldo: "1500.00"
    },
    {
      conta_id: 9909,
      conta: "Inter",
      saldo: "15000.00"
    }]
    ).as('saldo')
    cy.login('Usuário falso', 'string grande aceita')
  })

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
    cy.resetApp()
  })

  it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta inicial')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it('Should update an account', () => {
    cy.acessarMenuConta()
    cy.xpath(loc.CONTAS.Func_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(loc.CONTAS.NOME)
      .clear()
      .type('Conta alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })

  it('Should not creat an account with same name', () => {
    cy.acessarMenuConta()

    cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  }) // adicionado "testIsolation: false", no cypress.config.js para que não retornem para a página vazia em cada teste

  it('Should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.wait(4000)
    cy.get(loc.MOVIMENTACAO.VALOR).type('123')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Nubank')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')

    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    cy.get(loc.EXTRATO.Func_XP_BUSCA_ELEMENTO).should('exist')
  })

  it('Should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.Func_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.Func_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')

    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.Func_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
  })

  it('Should remove a transaction', () => {
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.Func_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso')
  })
})  
