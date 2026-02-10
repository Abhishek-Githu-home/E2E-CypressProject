# E2E-CypressProject 
# Author : Abhishek K M

End-to-end (E2E) test suite using Cypress for automated browser testing of the application. This repository contains Cypress tests, fixtures, utilities, and configuration to run tests locally and in CI (headless and headed). The project is organized for clarity and scalability and includes recommended scripts and reporting.

## CI-CD Run results are available in Doc folder

## Table of contents
- [Project overview](#project-overview)
- [Key features](#key-features)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Configuration & environment variables](#configuration--environment-variables)
- [Writing tests & conventions](#writing-tests--conventions)
- [Running tests locally](#running-tests-locally)
- [Running tests in CI](#running-tests-in-ci)
- [Reporting & artifacts](#reporting--artifacts)
- [Debugging tips](#debugging-tips)
- [Contributing](#contributing)
- [License](#license)

## Project overview
This repo contains end-to-end tests written with Cypress to validate critical user flows of the target web application. Tests are structured to be maintainable, reusable, and fast. Use this project to:
- Catch regressions early
- Validate full user journeys
- Automate acceptance and release testing

## Key features
- Cypress-based E2E tests
- Fixtures and test data management
- Page object / commands support for reuse
- Support for headless CI runs and interactive local runs
- Example reporting integration (Mochawesome or similar)

## Prerequisites
- Node.js (LTS recommended — e.g., 18+)
- npm or yarn
- Browsers supported by Cypress (Chrome, Chromium, Firefox, Edge)
- (Optional) Docker if running tests in containerized environments

## Getting started
1. Clone the repo
   - git clone <repo-url>
2. Install dependencies
   - npm ci
   - or yarn install
3. Configure environment variables (see configuration section)
4. Run tests (examples below)

## Available scripts
Examples you should add to package.json (or verify exist):
```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "test": "cypress run",
    "test:headed": "cypress run --headed --browser chrome",
    "test:spec": "cypress run --spec",
    "lint": "eslint ./cypress --ext .js,.ts",
    "report:generate": "mochawesome-merge cypress/results/*.json > mochawesome.json && mochawesome-report-generator mochawesome.json -o cypress/reports"
  }
}
```

## Project structure
This repository follows a recommended Cypress layout. Adjust names to match your actual repo.

- cypress/
  - fixtures/          - static test data (JSONs, images)
  - e2e/                - test specs (each file is a test suite)
    - examples/         - sample specs or legacy tests
  - support/
    - commands.js       - custom Cypress commands (cy.login(), etc.)
    - e2e.js            - global configuration for tests (beforeEach hooks)
  - pages/              - page objects / helper functions (optional)
  - screenshots/        - screenshots saved by Cypress on fail (CI artifact)
  - videos/             - recorded test runs (CI artifact)
  - results/            - raw JSON test results (for merging/reporting)
- cypress.config.js (or cypress.json for older versions) - Cypress config
- package.json
- .github/workflows/   - CI configuration (GitHub Actions)
- README.md

Notes:
- Use a `pages/` or `support/` folder to store abstractions (page objects, selectors).
- Keep fixtures small and deterministic. Prefer factories or seeded test data for complex flows.

## Configuration & environment variables
Use environment variables to separate config between environments (local, staging, CI).

Common env vars:
- CYPRESS_baseUrl - base URL under test
- CYPRESS_USERNAME / CYPRESS_PASSWORD - credentials (use secrets in CI)
- CYPRESS_API_URL - backend API base for backend calls
- NODE_ENV - environment indicator

Examples:
- cypress.config.js supports env: { baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:3000' }

For secrets in CI:
- Use GitHub Actions secrets or your CI provider's secret store and map them to environment variables for the test run.

## Writing tests & conventions
- Tests live under `cypress/e2e/` and are named `*.spec.js` or `*.cy.js` (Cypress v10+ recommends `.cy.js`).
- Use `describe()` blocks to group related tests and `it()` for individual assertions.
- Keep tests independent (avoid inter-test order dependencies).
- Prefer data setup via API or database seeding rather than UI when possible, to make tests faster and more reliable.
- Use custom commands for repeated actions:
  - cy.login() — implement login via UI or API token injection
  - cy.seedData() — seed test data using API tasks

Example test header:
```js
describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('logs in with valid credentials', () => {
    cy.get('[data-cy=email]').type(Cypress.env('USERNAME'));
    cy.get('[data-cy=password]').type(Cypress.env('PASSWORD'), { log: false });
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## Running tests locally
- Open interactive runner:
  - npm run cypress:open
- Run headless (CI-like):
  - npm test
- Run a single spec:
  - npm run test:spec -- --spec "cypress/e2e/login.cy.js"
- Run headed (visible browser in CI or locally):
  - npm run test:headed

Add `--browser chrome` or `--browser firefox` to choose the browser.

## Running tests in CI
- Typical CI steps:
  1. Checkout repo
  2. Install dependencies (npm ci)
  3. Set environment variables/secrets
  4. Start app under test (or point to staging URL)
  5. Run `npx cypress run` (or `npm test`)
  6. Upload screenshots, videos and test reports as pipeline artifacts

Example (GitHub Actions) outline:
- Use `cypress-io/github-action` or run `npx cypress run`
- Map secrets (CYPRESS_USERNAME, CYPRESS_PASSWORD) into environment for the job
- Collect and upload `cypress/screenshots`, `cypress/videos`, and `cypress/results` for debugging

## Reporting & artifacts
- Save `screenshots/` and `videos/` as CI artifacts on failure.
- Use Mochawesome or JUnit reporters to produce test reports consumable by CI dashboards:
  - Configure reporter in Cypress config: e.g., `reporter: 'mochawesome'`
  - Merge results and generate HTML for easy viewing.

## Debugging tips
- Use `cy.pause()` and `cy.debug()` for interactive debugging.
- Use `cypress open` to step through failing tests.
- Increase command timeouts only when necessary; prefer stable selectors and API-based setup.
- Use `.only` and `.skip` to isolate tests during development.
- Persist `CYPRESS_CACHE_FOLDER` or local browser cache for faster runs if appropriate.

## Best practices
- Use stable selectors (prefer data attributes like `data-cy="..."`).
- Keep tests deterministic: avoid relying on timing and animation; prefer API waits where possible.
- Keep tests focused: one assertion per logical behavior.
- Keep CI runs fast by seeding data and avoiding expensive UI flows for setup.

## Contributing
1. Fork the repository
2. Create a branch with a clear name: `feature/add-login-tests`
3. Add tests and update docs
4. Open a pull request with a description of the changes and any new environment needs
5. Ensure tests pass in CI
