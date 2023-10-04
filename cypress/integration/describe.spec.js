/// <reference types="cypress"/>

it('A external test...', () => {

})

describe('Should group tests...', () => { // é possível fazer vários grupos com testes especificos dentro do describe
  it('A internal test...', () => {

  })
})

//também é possível utilizar o .skip após o describe ou it para que um determinado teste não seja executado naquele momento
// only serve para executar somente um teste. Este comando só funciona com um unico teste. Se tiver no inicio e no final do código,vai rodar somente o ultimo teste.

