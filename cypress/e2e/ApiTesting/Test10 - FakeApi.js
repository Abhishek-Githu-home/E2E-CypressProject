//Concept : cy.intercept(method, url, routeHandler)

describe('Verify the Authorization', () => {
    it('Validation', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=Abhishek"

            req.continue((res) => {
                expect(res.url).to.equal("https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=Abhishek")
                //expect(res.statusCode).to.equal(403)
            })
        }).as('ValidationResponse')
         cy.get('.btn-primary').contains('Virtual Library').click()
         cy.wait('@ValidationResponse')
    


    })
})