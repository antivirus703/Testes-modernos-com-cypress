/// <reference types="cypress"/>

describe('Work with alerts', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  it('Alert', () => {
    // cy.get('#alert').click()
    // cy.on('window:alert', msg => {
    //   console.log(msg)
    //   expect(msg).to.be.equal('Alert Simples')
    // })
    cy.clickAlert('#alert', 'Alert Simples')
  })

  it('Alert com mock', () => {
    const stub = cy.stub() // .stub serve para emular o comportamento de um componente real, que neste caso é o window:alert
      .as('alerta') // .as nomeia um evento ou operação
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => { // faz a checagem depois do clique
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples') // o 0 representa a primeira chamada, como se fosse um array indexado no 0 e o calledWith é a chamada que precisa verificar
    })
  })


  it('Confirm', () => {

    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Confirmado')
    })
    cy.get('#confirm').click()
  })

  it('Deny', () => {
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Negado')
      return false
    })
    cy.get('#confirm').click()
  })

  it('Prompt', () => {
    cy.window().then(win => {
      cy.stub(win, 'prompt')
        .as('prompt')
        .returns('42') // para não retornar undefined, utilze o comando returns com o valor desejado
    })

    cy.on('window:prompt', msg => {
      expect(msg).to.be.equal('Era 42?')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal(':D')
    })
    cy.get('#prompt').click()
  })

  it('Validando mensagens', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

    cy.get('#formNome').type('Norton')
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
    cy.get('[data-cy=dataSobrenome]').type('Berbert')

    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
    cy.get('#formSexoMasc').click()
    cy.get('#formCadastrar').click()

    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
  })

})

