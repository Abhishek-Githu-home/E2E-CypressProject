import CartPage from './CartPage'

class ProductPage {
    pageValidation() {
        cy.get('a[href*="#"]').contains('Home').then(function ($header) {
            cy.log($header.text())
        })
    }

    VerifyHeader() {
        cy.get('.list-group').eq(0).then(function ($sub_header) {
            cy.log($sub_header.text())
        })
    }

    SelectProducts() {
        cy.get('.col-md-6').eq(3)
        cy.get('h4.card-title').contains(this.inputdata.productName_01).then(function ($Mobile) {
            cy.log($Mobile.text())
        })
        cy.get('button.btn-info').eq(3).click()


        cy.get('h4.card-title').contains(this.inputdata.productName_02).then(function ($Mobile) {
            cy.log($Mobile.text())
        })

        cy.get('button.btn-info').eq(2).click();
        
    }
    GotoCart() {
        cy.get('a.btn-primary').click()
        return new CartPage()
    }
}
export default ProductPage