class ConfirmationPage {
    CountryValidation() {
        cy.get('#country').type(this.inputdata.country)
        //cy.wait(3000)
        cy.get('.suggestions ul li a').should('have.text', 'India', {setTimeout : 6000}).click()
    }

    PurchaseValidation() {

        cy.purchaseValidation()
        // cy.get('#checkbox2').check({ force: true })
        // cy.get('input[value="Purchase"]').click()
        // cy.get('.alert-success').should('be.visible')
        // cy.get('.alert-success').should('contain', 'Success')
    }

}
export default ConfirmationPage