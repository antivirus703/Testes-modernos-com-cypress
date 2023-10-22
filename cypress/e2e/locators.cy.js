/// <reference types="cypress"/>

describe('Work with selectors', () => {
    beforeEach(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
  
    beforeEach(() => {
      cy.reload()
    })

    it('Using jquery selector', () => {
      cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
      cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
      cy.get("[onclick*='Francisco']") // quando for buscar de forma mais profunda e quiser pegar uma prop com o valor, utilize a prop com o valor entre aspas simples e fora, aspas duplas
      cy.get('table#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input') // podemos utilizar essa forma ou a forma abaixo para buscar por itens especificos no codigo
      cy.get('table#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input') // outra forma de buscar itens especificos
    })

    it('Using xpath', () => {
      cy.xpath("//input[contains(@onclick, 'Francisco')]") //forma de fazer busca utilizando o plugin xpath (não vi muita utilidade...)
    })
})   