import ProductPage from './ProductPage'

class HomePage {
    NavigateTo(URL) {
        cy.visit(Cypress.env('URL'))
    }

    login(username, password) {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('span.radiotextsty').contains('Admin').click();

        cy.get('select[data-style="btn-info"]').select('Consultant').should('have.value', 'consult')
        cy.get('input[type="checkbox"]').check()

        cy.get('#signInBtn').click();
        return new ProductPage()

    }
}
export default HomePage