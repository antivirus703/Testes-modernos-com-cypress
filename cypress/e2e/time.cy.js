/// <reference types="cypress"/>

describe('Time test', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    it('Going back to the past', () => {
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '01/11/2023');

        const dt = new Date(2012, 3, 10, 15, 23, 50); // o mês é indexado no 0
        cy.clock(dt.getTime());
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '10/04/2012');
    });

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').should('contain', '16988');
        cy.get('#resultado > span').invoke('text').then((text) => {
            const value = parseInt(text, 10);
            expect(value).to.be.a('number');
            expect(value).to.be.gt(1698850776200);
        });

        cy.clock();
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then((text) => {
            const value = parseInt(text, 10);
            expect(value).to.be.a('number');
            expect(value).to.be.lte(0);
        });

        cy.wait(2000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then((text) => {
            const value = parseInt(text, 10);
            expect(value).to.be.a('number');
            expect(value).to.be.lte(2000);
        });
    });

});
