describe('Can a user alter fields: name, email, password, and tos. Can a user submit', () => {
    it('Can we navigate to the page', () => {
        cy.visit('http://localhost:3000')
        cy.url().should('include', 'http://localhost:3000')

    })
    it('Can the name field be altered', () => {
        cy.get('input[name=name]')
        .type('Bon Jovi')
        .should('have.value','Bon Jovi')

    })
    it('Can the email field be altered', () => {
        cy.get('input[name=email]')
        .type('BonJovi@band.com')
        .should('have.value','BonJovi@band.com')

    })
    it('Can the password field be altered', () => {
        cy.get('input[name=password]')
        .type('supercali')
        .should('have.value','supercali')

    })
    it('Can the TOS checkbox be checked', () => {
        cy.get('input[name=tosAgree]')
        .check()
        .should('be.checked')
    })
    it('Is the submit button available when all fields are filled', () => {
        cy.contains('Submit')
        .should('be.enabled')
    })
    it('Cleanup fields', () => {
        cy.get('input[name=tosAgree]')
        .uncheck()
        cy.get('input[name=password]')
        .clear()
        cy.get('input[name=email]')
        .clear()
        cy.get('input[name=name]')
        .clear()
    })
})

describe('Ensure that validation is functioning', () => {
    it('Does the name field being empty prevent submission', () => {
        cy.get('input[name=name]')
        .type('B')
        .clear()
        cy.get('input[name=email]')
        .type('BonJovi@band.com')
        cy.get('input[name=password]')
        .type('supercali')
        cy.get('input[name=tosAgree]')
        .check()
        cy.contains('Submit')
        .should('be.disabled')
    })
    it('Does the email field being empty prevent submission', () => {
        cy.get('input[name=name]')
        .type('Bon Jovi')
        cy.get('input[name=email]')
        .clear()
        cy.contains('Submit')
        .should('be.disabled')
    })
    it('Does the password field being empty prevent submission', () => {
        cy.get('input[name=email]')
        .type('BonJovi@band.com')
        cy.get('input[name=password]')
        .clear()
        cy.contains('Submit')
        .should('be.disabled')
    })
    it('Does the checkbox field being empty prevent submission', () => {
        cy.get('input[name=password]')
        .type('supercali')
        cy.get('input[name=tosAgree]')
        .uncheck()
        cy.contains('Submit')
        .should('be.disabled')
    })
})