describe('This is second testcase', function() {
    it('Verification of dropdown, checkbox', function() {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/').then(function(text) {
            cy.log("Opened Automation practice page")
        })

        cy.get('a.blinkingText:visible').then(function($text) {
            const logo = $text.text()
            cy.log("The blinking header is " + logo)
        })

        cy.contains('Practice Page').then(function($text) {
            const title = $text.text()
            cy.log("The title is " + title)
        })

        cy.contains('Radio Button Example').then(function($text) {
            const Radioheader = $text.text()
            cy.log("The Radio button title is " + Radioheader)

            cy.get('input[value="radio2"]').then(function(Radio) {
                cy.log(Radio.click() + " 2nd Radio button is clicked")
                cy.get('input[value="radio3"]').then(function(Radio) {
                    cy.log(Radio.click() + "3rd Radio button is clicked")
                })
            })
        
        // Type and select from dynamic dropdown
        // => This is fat pipe, helps to resolve the promises
        cy.get('input[id="autocomplete"]').type("India")
        cy.get('.ui-menu-item-wrapper').each(($country) => {
            if($country.text() === 'India')
                $country.click()
        })

        cy.get('input[id="autocomplete"]').should('have.value', 'India')

        //Selecting the static dropdown and assertion
        cy.get('select[name="dropdown-class-example"]').select('Option2').should('have.value', 'option2')

        //Checking the checkbox and assertion
        cy.get('input[type="checkBox"]').check(['option1', 'option2', 'option3']).should('be.checked')

        //Unchecking the checkbox and assertion
        cy.get('input[type="checkbox"]').uncheck(['option2']).should('not.be.checked')


        // Handling show/hide textbox and assertions
        cy.get('input[value="Show"]').click()

        cy.get('input[placeholder="Hide/Show Example"]').then(function(Textbox) {
            cy.get(Textbox).should('be.visible')
            cy.get(Textbox).type('Abhishek')
            cy.get(Textbox).should('have.value', 'Abhishek')
        })

        cy.get('input[value="Hide"]').click()

        cy.get('input[placeholder="Hide/Show Example"]').should('not.be.visible')
        cy.get('#show-textbox').click()

        })

        //Handling alert
        //Cypress have the capability of browser events. window:alert() is the event which get fired on alert open.
        // so we are are firing the event through cypress to get access to the alert

        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()
  
        cy.on('window:alert', (str) => {
            //Mocha
            expect(str).to.equal ("Hello , share this practice page and share your knowledge")
        })

        cy.on('window:confirm', (str) => {
            //Mocha
            expect(str).to.equal("Hello , Are you sure you want to confirm?")
        })
    })
})