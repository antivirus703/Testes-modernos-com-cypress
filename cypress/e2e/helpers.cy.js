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
        resolve(10)
      }, 500)
    })
    cy.get('#buttonSimple').then(() => console.log("Encontrei o primeiro botão"))
    //promise.then(num => console.log(num))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get('#buttonList').then(() => console.log("Encontrei o segundo botão"))

    cy.wrap(1).then(num => {
      return 2
    }).should('be.equal', 2)
  })

    it("Its...", () => {
      const obj = { nome: 'User', idade: 20}
      cy.wrap(obj).should('have.property', 'nome', 'User')
      cy.wrap(obj).its('nome').should('be.equal', 'User')

      const obj2 = { nome: 'User', idade: 20, endereco: {rua: 'sanhaço'} }
      cy.wrap(obj2).its('endereco').should('have.property', 'rua')
      cy.wrap(obj2).its('endereco').its('rua').should('contain', 'sanhaço')
      cy.wrap(obj2).its('endereco.rua').should('contain', 'sanhaço') // essa é a melhor forma de utilizar o its com should
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.title().its('length').should('be.equal', 20)
    })
    
    it.only('Invoke', () => {
      const getValue = () => 1;
      const soma = (a, b) => a+b;
      
      cy.wrap({ func: getValue}).invoke('func').should('be.equal', 1)
      cy.wrap({ func: soma}).invoke('func', 2, 5).should('be.equal', 7)

      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.get('#formNome').invoke('val', 'Texto via invoke')
      cy.window().invoke('alert', 'Dá pra ver?')
      cy.get('#resultado')
        .invoke('html', '<input type="button" value="hacked"/>') //aqui vc pode manipular o html da página, inserindo, alterando ou removendo algo
    })
})