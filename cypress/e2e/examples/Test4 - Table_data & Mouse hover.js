describe('Handling the Table data', () => {
// Window switch - cypress cannot switch to child window
// target html attribute should be available for child window, which helps us to open new tab

    it("Extracting the row from table", () => { 
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")



    // selecting the entire column using selector, format = tr td:nth-child(2) : This selects entire column of 2nd 

    cy.get('.left-align tr td:nth-child(2)').each(($el, index, $list) => {
        const text = $el.text()
        if(text.includes("Python")){
            cy.get('.left-align tr td:nth-child(2)').eq(index).next().then(function(price) {
                const pricecost = price.text()
                expect(pricecost).to.equal("25")
            })
        }
    })

    // Mouse hovering - show() method from Jquery display the hidden elements under the element/button
    cy.get('#mousehover').invoke('show') // show method should applied on parent of hidden element
    cy.contains('Top').click({force:true})
    cy.url().should('include', 'top')

    cy.get('div.mouse-hover').invoke('show')
    cy.contains('Reload').click({force:true}) // {force:true} method forcefully find hidden elements
    cy.url().should('not.include', 'Reload')



  })
})
