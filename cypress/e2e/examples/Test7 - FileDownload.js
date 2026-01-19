const URL = "https://rahulshettyacademy.com/client/#/auth/login"



describe('Download file functionality', () => {
    it('Verify user able to download the csv file', () => {
        cy.visit(URL)

        cy.get('input[formcontrolname="userEmail"]').type("abhiapitest@gmail.com")
        cy.get('input[formcontrolname="userPassword"]').type('Pas@12345')
        cy.get('#login').click()

        cy.get('.fa-shopping-cart').eq(1).click()
        cy.get('.fa-shopping-cart').eq(2).click()

        cy.get('button[routerlink="/dashboard/cart"]').click()
        cy.get('.value').eq(1).should('have.text', '$1200')
        cy.get('.btn-primary').contains('Checkout').click()


        cy.get('input[class="input txt"]').eq(1).type("Abhishek K M")
        cy.get('input[name="coupon"]').type("ABHI80%")

        cy.get('button[type="submit"]').contains("Apply Coupon").click()
        cy.get('label[type="text"]').should('have.text', 'abhiapitest@gmail.com')

        cy.get('input[placeholder="Select Country"]').type("India")
        cy.get('.list-group-item').each($country => {
            const selectCountry = $country.text().trim() //The .trim() method removes whitespace from both the start and the end of a string.
            if (selectCountry == "India"){
                cy.wrap($country).click()
            }
        })

        //cy.wait(2000)
        cy.get('.action__submit').contains("Place Order").click()

        cy.get('.btn-primary').contains('Click To Download Order Details in CSV').click()
        cy.readFile("cypress/downloads/order-invoice_abhiapitest.csv").should('exist')
    })
})
