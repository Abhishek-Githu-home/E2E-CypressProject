const url = "https://rahulshettyacademy.com/"

describe('Handling the windows', () => {
// Window switch - cypress cannot switch to child window
// target html attribute should be available for child window, which helps us to open new tab

    it("Switching the tabs within the window", () => { 
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

//Opening the window in different tab
        //cy.get('#opentab').click()

        //Opening the window in same tab
        // By default, target attribute == blank page, So need to remove the attribute and click
        cy.get('#opentab').invoke('removeAttr', 'target').click()

        //To proceed with new window link
        cy.origin("https://www.qaclickacademy.com/", () => {
            cy.get('#footer-part a[href*="about.html"]').should('contain','About us').click()
            cy.get('#about-page h2').should('contain', 'Welcome to QAClick Academy')
        })

// Another method
        cy.visit(url + "AutomationPractice/")

        cy.get('#opentab').then(function(el) { //Since Cypress commands are asynchronous, this "promise-like" structure captures the element (el) so you can extract information from it before moving to the next step.
            const Child_url = el.prop('href')  // .prop() is a jQuery method used to retrieve a property value from a DOM element.
            cy.visit(Child_url) // first we need to visit the url and change to origin
            cy.origin(Child_url, ()=> {
                cy.get('#footer-part a[href*="about.html"]').click()
            })
        })

    })

})


