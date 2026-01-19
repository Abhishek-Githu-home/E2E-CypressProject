// Frames in cypress
/// <reference types="cypress" />
/// <reference types="cypress-iframe" />


import 'cypress-iframe';

describe('Handling the frames', () => {
    it('Frame in Automation practice site', () => { 

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe')

        //cy.iframe().find('a[href="/mentorship"]').click({multiple:true})
        cy.iframe().find('a[href="/mentorship"]').eq(0).click()

       //  cy.iframe().find('input[placeholder="Enter your name"]').eq(0).type("testing")
       //  cy.iframe().find('#email').type('test@gmail.com')
       //  cy.iframe().find('button[type="submit"]').click()

       cy.iframe().find('a[href*="https://courses.rahulshettyacademy.com/p/mentorship-rahul-shetty"]').eq(0).click()

       cy.iframe().visit("https://courses.rahulshettyacademy.com/p/mentorship-rahul-shetty")
       cy.origin('https://courses.rahulshettyacademy.com', () => {
            cy.get('.register-btn').eq(0).click();
       })



    })
})