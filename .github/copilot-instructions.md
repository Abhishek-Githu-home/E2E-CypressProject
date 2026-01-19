## Quick context (what this repo is)

- A Cypress test project using BDD feature files and the @badeball/cypress-cucumber-preprocessor.
- Tests live under `cypress/e2e/BDD` (feature files) and supporting step definitions/page objects under `cypress/e2e/BDD` and `cypress/support/PageObjects/`.
- Fixtures (test data) live in `cypress/fixtures` (notably `example.json`).

## How tests are wired (big picture)

- `cypress.config.js` configures the cucumber preprocessor (browserify), the mochawesome reporter plugin, and `specPattern: 'cypress/e2e/BDD/*.feature'` — feature files are the entry points.
- `beforeEach.js` (under each feature folder) reads fixtures and attaches them to the test `this` context (e.g. `this.inputdata`) so step definitions and page objects expect `this.inputdata` to be populated.
- Page objects are plain ES module classes exported as default from `cypress/support/PageObjects/*.js`. Step definitions import/instantiate these and set `.inputdata` before invoking methods.
- Custom reusable actions live in `cypress/support/commands.js` (eg. `Cypress.Commands.add('purchaseValidation', ...)`).

## Important files to inspect when coding

- `cypress.config.js` — env variables (URLs), plugins, reporter, and specPattern.
- `package.json` — test scripts and devDependencies (Cypress, cucumber preprocessor, mochawesome). Run `npm test` to open Cypress UI.
- `cypress/e2e/BDD/*.feature` — feature definitions (behavior-driven scenarios).
- `cypress/e2e/BDD/**/beforeEach.js` — fixture-loading / test context setup for features.
- `cypress/e2e/BDD/**/ecommStepDef.js` — example step definitions illustrating how PageObjects and fixture data are used.
- `cypress/support/PageObjects/*.js` — HomePage, ProductPage, CartPage, ConfirmationPage — canonical page-object style used across tests.
- `cypress/support/commands.js` — custom Cypress commands used by page objects/tests.

## Project-specific conventions and patterns

- BDD-first: Tests are driven from `.feature` files — do not modify `specPattern` without updating `cypress.config.js`.
- Test data is injected via fixtures in a `beforeEach.js` file and attached to `this` (e.g. `this.inputdata`) — page objects and step defs expect `this.inputdata` or that callers set `.inputdata` on instances.
- Page objects are small classes that use `cy.*` and often return new page object instances for navigation (see `HomePage.login()` returns `new ProductPage()`).
- Use existing custom commands (e.g. `cy.purchaseValidation()`) rather than reimplementing assertions or flows.

## External integrations & runtime notes

- Uses `@badeball/cypress-cucumber-preprocessor` with `browserify` preprocessor; plugin setup is in `cypress.config.js` and must be preserved when making changes.
- `cypress-mochawesome-reporter` is configured — CI runs should preserve plugin hook in node events so HTML/JSON reports are generated.
- Cucumber JSON output is configured in `package.json` under `cypress-cucumber-preprocessor.json.output` to `cypress/cucumberReports/results.json` — do not change without considering downstream report consumers.

## Common commands / developer workflow

- Open interactive runner: `npm test` (runs `cypress open`).
- Headless run (CI):
  - npx cypress run --spec "cypress/e2e/BDD/*.feature"
  - Preserve node event hooks in `cypress.config.js` to ensure preprocessor and mochawesome work.

## What to look for when making changes

- If adding a new feature/step, add the `.feature` under `cypress/e2e/BDD` and matching step definition in that folder. Ensure `beforeEach.js` (or equivalent) sets up fixture data and constructs page objects.
- When editing page objects, keep them side-effect light — they should use `cy.*` and return page objects when navigating. Look at `HomePage.login()` and `ProductPage.GotoCart()` for examples.
- If you add global state, prefer attaching it to the test context (`this`) in `beforeEach` to match existing patterns.

## Examples from this repo (copyable snippets)

- Fixture usage (in `beforeEach.js`):

  - cy.fixture('example').then(function(Data){
      this.inputdata = Data
      HomePage = new HomePage()
    })

- Custom command usage (defined in `cypress/support/commands.js`):

  - cy.purchaseValidation()

## When you're unsure

- Check `cypress.config.js` first — it contains the authoritative wiring for preprocessors, reporters and spec patterns.
- Search `cypress/support/PageObjects` for existing helpers before adding a duplicate.

---
If any section is unclear or you'd like rule additions (naming, branching, PR expectations, or CI commands), tell me what to expand and I will iterate. 
