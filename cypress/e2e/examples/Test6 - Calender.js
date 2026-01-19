// Calender Handling

//const cypress = require("cypress")

//const url = "https://rahulshettyacademy.com/seleniumPractise/#/offers"
const Month = "May"
const Month_Number = "5"
const Year = "2002"
const Year_range = '2001 – 2010'
const Date = "2"
const Expected_Date = [Month_Number, Date, Year]

// new RegExp((`^${Date}$`))) = This will select the exact date

describe('Calender functionality', () => {
    it('veriy the calender functionality', () => {
        cy.visit(Cypress.env('Calender_url')) // defined the url in cypress.config.js

        cy.get('.react-date-picker__inputGroup').click();
        cy.get('.react-calendar__navigation__label').click().click().click();

        cy.contains('button', Year_range ).click();
        //cy.contains('.react-calendar__tile').should('have.text', Year).click()
        cy.contains('button', Year).click();
        //cy.contains('button', Month).click();
        //cy.get("button[type='button']").eq(10).click()
        cy.get('.react-calendar__year-view__months__month').eq(Number(Month_Number) - 1).click();
        cy.get('button.react-calendar__month-view__days__day').not(".react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth").contains('abbr', new RegExp((`^${Date}$`))).click();

        //cy.get('.react-date-picker__inputGroup').then(function($Date) {
          //  cy.log($Date.text)
        
        cy.get('.react-date-picker__inputGroup__input').each(($el, index) => {
            cy.wrap($el).invoke('val').should('eq', Expected_Date[index])  // .react class have 3 matching elements of Date,month,year. Invoke those with Value and retrive with index
        })
    })
})