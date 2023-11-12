/// <reference types="cypress"/>

const dayjs = require('dayjs')

//then(res => console.log(res)) = retorna o as informações da requisição no console

describe('Should test backend API', () => {
  // let token //variavel para salvar o token
  before(() => {
    cy.getToken('nortonberbert@gmail.com', 'Comunidade03@') //login
    // .then(tkn => {
    //   token = tkn
    // })
  })

  beforeEach(() => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.resetRest()
  })

  it('Should create an account', () => {
    cy.request({
      url: '/contas', // ficar atento a URL pois precisa ser igual a que esta sendo utilizada no signin
      method: 'POST',
      // headers: { Authorization: `JWT ${token}` }, como esta sendo utilizado o overwrite em commands, não é necessário utilizar envia o token
      body: {
        nome: 'Conta via s'
      }
    }).as('response')
    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via s')
    })
  })

  it('Should update an account', () => {
    cy.getAccountByName('Conta para alterar')
      .then(contaId => {
        cy.request({
          url: `/contas/${contaId}`,
          method: 'PUT',
          body: {
            nome: 'Conta alterada via rest'
          }
        }).as('response')
      })

    cy.get('@response').its('status').should('be.equal', 200)
  })

  it('Should not creat an account with same name', () => {
    cy.request({
      url: '/contas', // ficar atento a URL pois precisa ser igual a que esta sendo utilizada no signin
      method: 'POST',
      body: {
        nome: 'Conta mesmo nome'
      },
      failOnStatusCode: false //aqui mesmo que o teste falhe, vai fazer o teste seguir 
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400)
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })
  })

  it('Should create a transaction', () => {
    let dayjs = require('dayjs')
    cy.getAccountByName('Conta para movimentacoes')
      .then(contaId => {
        cy.request({
          method: 'POST',
          url: '/transacoes',
          body: {
            conta_id: contaId,
            data_pagamento: dayjs().format('DD/MM/YYYY'),
            data_transacao: dayjs().format('DD/MM/YYYY'),
            descricao: "Desconto",
            envolvido: "nubank",
            status: true,
            tipo: "REC",
            valor: "150"
          }
        }).as('response')
      })
    cy.get('@response').its('status').should('be.equal', 201)
    cy.get('@response').its('body.id').should('exist')
  })

  it('Should get balance', () => {
    cy.request({
      url: '/saldo',
      method: 'GET',
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('534.00')
    })

    cy.request({
      method: 'GET',
      url: '/transacoes',
      qs: { descricao: 'Movimentacao 1, calculo saldo' }
    }).then(res => {
      cy.request({
        url: `/transacoes/${res.body[0].id}`,
        method: 'PUT',
        body: {
          status: true,
          data_transacao: dayjs().format('DD/MM/YYYY'),
          data_pagamento: dayjs().format('DD/MM/YYYY'),
          descricao: res.body[0].descricao,
          envolvido: res.body[0].envolvido,
          valor: res.body[0].valor,
          conta_id: res.body[0].conta_id
        }
      }).its('status').should('be.equal', 200)
    })
    cy.request({
      url: '/saldo',
      method: 'GET',
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('4034.00')
    })

  })

  it('Should remove a transaction', () => {
    cy.request({
      method: 'GET',
      url: '/transacoes',
      qs: { descricao: 'Movimentacao para exclusao' }
    }).then(res => {
      cy.request({
        url: `/transacoes/${res.body[0].id}`,
        method: 'DELETE'
      }).its('status').should('be.equal', 204)
    })
  })
})  
