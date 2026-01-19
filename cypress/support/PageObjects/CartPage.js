import ConfirmationPage from './ConfirmationPage'

class CartPage{
    UpdateCart() {
        let sum = 0
        cy.get('tr td:nth-child(4) strong').each($el => {
            const Total = Number($el.text().split(" ")[1].trim())
            cy.log("The item cost is : " + Total)
            sum = sum + Total
        }).then(() => {
            cy.log("The total cost is : " + sum).then(() => {
                expect(sum).to.be.lessThan(200000)
            })
        })
    }

    VerifyQuantity() {
        cy.get('#exampleInputEmail1').should('not.have.length', 2)
        cy.get('#exampleInputEmail1').eq(0).clear().type('2')

        cy.get('#exampleInputEmail1').each(($el, index, $list) => {
            const currentQuantity = Number($el.val())
            cy.log("Item quantity is : " + currentQuantity)
        })
    }

    VerifyTotalCost() {
        let cost = 0
        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            const Amount = Number($el.text().split(" ")[1].trim())
            cost = cost + Amount
        }).then(function () {
            cy.log("The total amount is " + cost)
        })
    }

    Checkout(){
        cy.contains('Checkout').click()
        return new ConfirmationPage()
    }

}
export default CartPage