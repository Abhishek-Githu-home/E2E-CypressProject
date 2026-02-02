const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify")

async function setupNodeEvents(on, config) { //await and async comes as package, we should use both

  require('cypress-mochawesome-reporter/plugin')(on);

  await preprocessor.addCucumberPreprocessorPlugin(on, config); //await is handling step asyncronously

  on("file:preprocessor", browserify.default(config)); 

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}// Above Async function taken from /cypress-cucumber-preprocessor/examples/browserify-cjs/cypress.config.js

module.exports = defineConfig({
  defaultCommandTimeout : 6000,
  video : false,
  reporter : 'cypress-mochawesome-reporter', //This will configure the mochawesome reporter

  env: {
    URL : "https://rahulshettyacademy.com/loginpagePractise",
    Calender_url : 'https://rahulshettyacademy.com/seleniumPractise/#/offers'
  },

  projectId: "gtiq5x", //Adding project id to link with the cypress cloud
  retries: { // This will retries the count - failed testcases will re-executed according to runmode count
    runMode : 1,
  },

  e2e: {
    setupNodeEvents, // Here, we can modify the behaviour of cypress execution.
      // implement node event listeners here
      specPattern: "cypress/e2e/**/*.{js,feature}",
      experimentalStudio : true
    },
  },
);

//npm install cucumber-html-reporter --save-dev (This is to download the html reporter pl)