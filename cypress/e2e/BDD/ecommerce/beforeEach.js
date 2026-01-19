import HomePage from '../../../support/PageObjects/HomePage'
import productPage from '../../../support/PageObjects/ProductPage'
import CartPage from '../../../support/PageObjects/CartPage'
import ConfirmationPage from '../../../support/PageObjects/ConfirmationPage'

// expose shared globals so separate step-definition modules can access them
beforeEach(function() {
    cy.fixture('example').then(function(Data){
        this.inputdata = Data
        // create globally accessible variables used by step definitions
        global.Data = Data
        global.homepage = new HomePage()
        global.homepage.inputdata = Data
        global.productPage = new productPage()
        global.CartPage = new CartPage()
        global.ConfirmationPage = new ConfirmationPage()
    })
})