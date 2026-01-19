// Concept : cy.intercept(url, routeHandler)

const API_URL = "https://rahulshettyacademy.com/angularAppdemo/"


describe('Managing the API', function () {
    it('Altering the API Response', function () {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")
        cy.get('.display-3').should('have.text', 'Rahul Shetty Academy')
        //cy.intercept('GET', '/users').as('getAllUsers')
        
        cy.intercept(
            {
                method: 'GET',
                url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
            },
            {
                statusCode: 200,
                body: [{//Alter the response with body
                    "aisle" : "2303",
                    "book_name" : "RestAssured with Java",
                    "isbn": "LSA"
                },
                {
                    "aisle" : "2303",
                    "book_name" : "Abhi Authored Book",
                    "isbn": "Cypress"
                }
            ]
            }).as('BookRetrivialAPI')
        cy.get('.btn-primary').contains('Virtual Library').click()
        cy.wait('@BookRetrivialAPI').then(({request,response}) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        

         // if body with one response go with  
       //cy.get('p').should('have.text', 'Oops only 1 Book available')
       cy.get('p').should('have.not', 'Oops only 1 Book available')

       //length of the rows array = rows of the table 
    })
})
