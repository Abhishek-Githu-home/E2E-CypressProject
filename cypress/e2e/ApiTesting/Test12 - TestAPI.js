// concepts :
// cy.intercept(url, staticResponse)
// cy.intercept(method, url, staticResponse)
// cy.intercept(routeMatcher, staticResponse)
// cy.intercept(url, routeMatcher, staticResponse)

describe('Hitting URL', () => {
    it("API Testing with output", () => {

        cy.request('GET', 'https://openlibrary.org/books/OL59574246M/Legends_Lattes').then(function (response) {
            expect(response.isOkStatusCode)
            expect(response.status).to.equal(200)
        })

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
            "name":"Learn Appium Automation with Java",
            "statusmessage":"Lovely"
        }).then(function(res) {
            expect(res.status).to.equal(200)
        })

        cy.request('POST', 'https://fake-json-api.mock.beeceptor.com/companies', {
            "content-type":"application json"
        }).then(function(result) {
            expect(result.body).to.equal("Hey ya! Great to see you here. Btw, nothing is configured for this request path. Create a rule and start building a mock API.")
        })

        cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login",{
            "userEmail":"abhiapitest@gmail.com","userPassword":"Pas@12345"
        }).then(function(login) {
            expect(login.status).to.equal(200)
            //expect(login.body).should("have.text", "Login Successfully");            
        })

    })
})