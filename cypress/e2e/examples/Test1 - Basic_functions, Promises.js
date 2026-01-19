describe('My first test suite', function() {
    it('My first test case', () => {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get("input[type='search']").type('ca')
        cy.wait(2000)
        cy.get('.product').should('have.length', 5)
        cy.get('.product:visible').should('have.length', 4)   //should is assertion of chai to confirm the presence
        //product:visible - Visible helps to retrive only visible elements in UI

        //Parent child chaining:
        cy.get('.products').find('.product').should('have.length',4)

        //eq(index) - helps in selecting the specifc product, starts from 0,1,2,3
        //adding cart the 2nd product
        cy.get('.products').find('.product').eq(2).contains("ADD TO CART").click()

        //each - iterates over an array for elements
        cy.wait(2000)
        cy.get('.products').find('.product').each(($el, index, $list) => {
                //.each(($el, index, $list) => { ... }): This command loops through every single product found.
                //$el: Represents the individual product element currently being looped over. Note: This is a jQuery element, not a Cypress chainable subject.
                //index: The position of the element in the list (0, 1, 2, etc.).
                //$list: The original list of all elements.
            const vegetable=$el.find('h4.product-name').text()
            if(vegetable.includes('Cashews'))
            {
                cy.wrap($el).find('button').click()
            }
        })

        //handling the promise is not possible since we are defining the variable which is not part of direct cypress exection ex. defining in const logo = cy.get('.find')
        cy.get('.brand').then(function(logo) {
            cy.log(logo.text())  //Printing the text output
            cy.get('.brand').should('have.text', 'GREENKART')   //Assert if text is correctly displayed - In assertion, the promise will be handled so text will be handled
            cy.log("The text is printed successfully")
        })
        //cy.get('.brand').text() = This will not work since text is not cypress command too
        // cypress also supports the Jquery methods, text() is Jquery method. Non cypress commands cannot resolve themselves. we need to resolve manually by using then method)

        //Handling Asyn promise with cypress commands
        cy.get('.products').as('Product Locator') // alias = .as()
        cy.get('@Product Locator').find('.product').should('have.length',4)
        cy.get("@Product Locator").find('.product').eq(2).contains("ADD TO CART").click()

        cy.get('a.cart-icon').click()
        cy.get('.cart-items').find('.cart-item').as('available cart')
        cy.wait(3000)
        cy.get('@available cart').find('p.product-name:visible').contains('Capsicum').then(function($item1) {
            const text1 = $item1.text()
            cy.log(text1 + " Is available in cart")
        })
        cy.get('@available cart').find('p.product-name:visible').contains('Cashews').then(function($item2){
            const text2 = $item2.text()
            cy.log(text2 + " Is available in cart")
        })

        cy.contains('PROCEED TO CHECKOUT').then(function(Checkout) {
            cy.log(Checkout.click() + "Proceed to checkout done successfully")
        })

        cy.get('input[placeholder="Enter promo code"]').type("ABHICODE30")
        cy.get('.promoBtn').then(function($Promo){
            const code = $Promo.click()
            cy.get(code).contains('Applying')
            cy.wait(3000)
            cy.get('.promoinfo').should('have.text', 'Invalid code ..!')
            cy.contains('Place Order').click().then(function(Order){
                cy.log(Order.click() + "Order Placed successfully")
            })
        })
    })
})