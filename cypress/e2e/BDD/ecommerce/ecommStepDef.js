import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
//const homepage = new HomePage() //- Declared in beforeEach.js
//const testData = require('../../fixtures/example.json') //Declared in beforeEach.js
//let homepage;

Given('I am on Ecommerce page', () => {
    homepage.inputdata = Data
    homepage.NavigateTo(URL)
})

When('I login into the application', () => {
    const productPage = homepage.login(Data.username, Data.password)
    productPage.inputdata = Data
    productPage.pageValidation()
    productPage.VerifyHeader()
    productPage.SelectProducts()
})

When('I login into the application portal', (dataTable) => {
    const productPage = homepage.login(dataTable.rawTable[1][0], dataTable.rawTable[1][1])
    productPage.inputdata = Data
    productPage.pageValidation()
    productPage.VerifyHeader()
    productPage.SelectProducts()

})

When('I add items to cart', () => {
    const CartPage = productPage.GotoCart()
    CartPage.inputdata = Data
    CartPage.UpdateCart()
    CartPage.VerifyQuantity()
})

When('Validate the total price limit', () => {
    CartPage.VerifyTotalCost()

})

//this support only anynonamous function - so use function instead of pipe (=>)
Then('select the country and purchase successfully', () => {
    const confirmationPage = CartPage.Checkout()
    confirmationPage.inputdata = Data
    confirmationPage.CountryValidation()
    confirmationPage.PurchaseValidation()
})