/// <reference types="cypress"/>

describe('Esperas', () => {
  before(() => { //before executa uma vez antes de todos os teste, o beforeEach executa antes de cada um dos testes
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  it('Should wait for the element to become available', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('working')
  })

  it('Should perform retries', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
      .should('exist')
      .type('working')
  })

  it('Use find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    cy.get('#lista li span')
      //.find('span') utilizar find em casos especificos porque o elemento que o find entrega para o should, é removido do DOM
      // mesmo que seja removido do DOM para ser incluso novamente, o cypress fica sempre monitorando e ve que o elemento foi removido do DOM
      .should('contain', 'Item 2')
  })

  it('Timeout use', () => {
    // cy.get('#buttonDelay').click() // o tempo de espera do timeou no cypress é de 4s
    // cy.get('#novoCampo').should('exist') //para mudar o tempo  de timeout usar no get: {timeout: 1000}
    //pode também inserir no cypress.json um comando para o timeout padrão: "defaultCommandTimeout": 1000

    // cy.get('#buttonListDOM').click()
    //  cy.wait(5000) // para aguardar determinado fluxo rodar. Utilizar somente em casos extremos/especificos
    // cy.get('#lista li span', { timeout: 30000}) // o timeout não para o tempo por completo, apenas aguarda o tempo determinado até dar erro
    // a condição sendo satisfeita antes, ele libera o fluxo
    // .should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span', { timeout:30000})
      .should('have.length', 2)
  })

  it('Click retry', () => {
    cy.get('#buttonCount')
    .click()
    .should('have.value', '1')
  })

  // it.only('Should vs Then', () => {
  //   cy.get('#buttonListDOM').click()
  //   cy.get('#lista li span').then($el => { //$el é um elemento HTML que foi capturado, que será tratado com jquery
  //     .should('have.length', 1)
  //     console.log($el)
  //     expect($el).to.have.length(1)
  //     THEN aguarda até que o GET na lista li span seja finalizado para ser executado
  //     SHOULD faz a busca e fica fazendo a verificação, sendo executado ao longo da espera. O GET com o should é mais aninhado
  //   }).and('have.id', 'buttonListDOM')
  // })

  it.only('Should vs Then 2', () => {
    cy.get('#buttonListDOM').should($el => { //com um should não funcionará por conta de return pois o should sempre retorna o mesmo objeto
      expect($el).to.have.length(1)
      return 2
      //se utilizar o should, ele irá ignorar o que esta dentro do return. Sempre irá retornar ao final da execução o mesmo objeto recebido
      //no then, se não retornar nada, vai sair o mesmo objeto. Utilizando o return do then eu mudo o objeto que é retornado
    }).and('eq', 2) // fazendo dessa forma o then funcionará
      .and('not.have.id', 'buttonListDOM')
  }) //caso precise fazer novas buscas em um novo bloco, SEMPRE UTILIZE O THEN, pois o should vai acabar entrando em loop infinito

})