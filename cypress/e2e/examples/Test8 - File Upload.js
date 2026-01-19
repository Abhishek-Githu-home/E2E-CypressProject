const WEB_URL = "https://www.datablist.com/learn/csv/download-sample-csv-files"
const FILE_URL = "https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf"
const Upload_URL = "https://automationtesting.co.uk/fileupload.html"
const Upload_image = 'cypress/fixtures/God.jpg'

describe("Download the file from browser", () => {
    it("Verify the File download functionality", () => {
        cy.visit(WEB_URL)
        //cy.get('input[type="url"]').type(FILE_URL+".pdf")

        cy.get('a[href="#download-customers-sample-csv-files"]').eq(0).click({ force: true })
        //cy.get('button[data-submit-text="Start downloading your file"]').click()
        cy.wait(2000)

        cy.contains('customers-2000000.csv').should('have.attr', 'href').then((href) => {
            // Cypress will automatically follow redirects (like Google Drive does)
            cy.request(href).then((response) => {
                // 1. Verify the download endpoint works
                expect(response.status).to.eq(200)

                // 2. Optional: Verify it is actually a CSV file
                expect(response.headers['content-type']).to.include('text/html')

                // 3. Optional: Save the file to your machine if you need to check contents later
                cy.writeFile('cypress/downloads/customers-2000000.csv', response.body)

                const fileName = 'customers-2000000.csv'
                cy.readFile(`cypress/downloads/${fileName}`).should('exist')
            })
        })
    })

    it("Verify the Upload file functionality", () => {

        cy.visit(Upload_URL)
        cy.get('a[href="index.html"]').contains('Testing').then(function(header){
            header.text()
        })

        cy.get('p').contains('You can upload a file using the below file upload feature.').then(function(textdetails){
            cy.log(textdetails.text())
        })

        cy.get('#fileToUpload')
        cy.get('input[type="file"]').selectFile(Upload_image) //selectFile will upload the input file
        cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\God.jpg') //by default cypress setup the path as "C:\\fakepath\\God.jpg"

        cy.get('input[type="submit"]').click()
    })
})