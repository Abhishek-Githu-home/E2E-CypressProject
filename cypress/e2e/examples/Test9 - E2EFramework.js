//const URL = "https://rahulshettyacademy.com/loginpagePractise/"
//const Base_URL = "https://rahulshettyacademy.com"
//const Shop_URL = "https://rahulshettyacademy.com/angularpractice/shop"
//const testData = require('../../fixtures/example.json')
import HomePage from '../../support/PageObjects/HomePage'
import ProductPage from '../../support/PageObjects/ProductPage'
import CartPage from '../../support/PageObjects/CartPage'
import ConfirmationPage from '../../support/PageObjects/ConfirmationPage'

describe('E2E Ecommerce test', function () {

    // fixture loaded synchronously via require to avoid timing issues

    Cypress.config('defaultCommandTimeout', 6000)
    it('Verification of E2E Positive flow', function () {

        before(function(){
            cy.fixture('example').then(function(data) {
                this.inputdata = testData
                this.homepage = new HomePage()
            })
        })
        
        //HomePage
        //const homepage = new HomePage() - declared in before
        homepage.inputdata = testData
        homepage.NavigateTo(URL)

        //ProductPage
        const productPage = homepage.login(testData.username, testData.password)
        productPage.inputdata = testData
        productPage.pageValidation()
        productPage.VerifyHeader()
        productPage.SelectProducts()

        // select products and get CartPage instance
        const CartPage = productPage.GotoCart()
        CartPage.inputdata = testData
        CartPage.UpdateCart()
        CartPage.VerifyQuantity()
        CartPage.VerifyTotalCost()

        //ConfirmationPage
        const confirmationPage = CartPage.Checkout()
        confirmationPage.inputdata = testData
        confirmationPage.CountryValidation()
        confirmationPage.PurchaseValidation()

    })
})

