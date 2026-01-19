# E2E-CypressProject
### Author : ABHISHEK K M

[![Build Status](https://img.shields.io/badge/ci-pending-lightgrey.svg)]()
[![Cypress](https://img.shields.io/badge/tested%20with-Cypress-4BC0C0.svg)]()
[![Report](https://img.shields.io/badge/report-Mochawesome-blue.svg)]()

Automated end-to-end (E2E) testing project built with Cypress (JavaScript). This repository demonstrates a mature Cypress architecture including:

- Page Object Model (POM)
- BDD-style scenarios (Cucumber integration)
- Mochawesome reporting
- API mocking and fixtures
- Robust assertions and retries
- CI integration examples (Jenkins)
- Dockerized test runners

Purpose
-------
Provide a reusable, well-structured template for writing reliable, maintainable E2E tests for web applications using Cypress.

Table of contents
-----------------
- Features
- Architecture & Conventions
- Getting started
  - Prerequisites
  - Install
  - Run tests (interactive & headless)
- Folder structure
- How to write tests
  - BDD (Cucumber) features
  - Fixtures & API mocking
- Reporting & artifacts
- Troubleshooting
- Contributing
- License
- Contact

Features
--------
- Modern Cypress setup with clear separation of concerns
- POM for reusable page interactions
- Cucumber/Gherkin support for readable BDD scenarios
- Mochawesome HTML/JSON reports and screenshots on failure
- API mocking with `cy.intercept()` to create deterministic tests
- Fixture management for test data
- Example CI pipeline for Jenkins and a Docker image for CI runners

Architecture & Conventions
--------------------------
- Tests use the Page Object Model (POM) to keep selectors & actions centralized.
- BDD-style feature files (if enabled) live in `cypress/e2e/features` and map to step definitions.
- Fixtures are stored in `cypress/fixtures` and referenced from tests for consistent data.
- Network stubbing is done with `cy.intercept()` (recommended) for deterministic behavior.
- Reports and artifacts are written to `reports/` and `cypress/screenshots`, `cypress/videos`.

Getting started
---------------

Prerequisites
- Node.js LTS (e.g. >= 16)
- npm or yarn
- (Optional) Docker, if you plan to run tests in containers
- (Optional) Jenkins for CI

Install
1. Clone the repository
   git clone https://github.com/Abhishek-Githu-home/E2E-CypressProject.git
2. Install dependencies
   npm install
   OR
   yarn install

Run tests — interactive
- Open Cypress Test Runner (interactive)
  npx cypress open

Run tests — headless (recommended for CI)
- Run all tests headless:
  npx cypress run

- Run specific spec file(s)
  npx cypress run --spec "cypress/e2e/**/*.js"

- Use environment variables (example: baseUrl or tags)
  npx cypress run --env configFile=staging

Cucumber / BDD runs
- If using Cucumber integration, you can run by tags (depends on preprocessor config)
  npx cypress run --env TAGS="@smoke"

Reporting
- Generate Mochawesome report (example)
  npx cypress run --reporter mochawesome --reporter-options reportDir=reports/mochawesome,reportFilename=report

- After a run, reports will be in `reports/mochawesome` (HTML, JSON). Screenshots and videos are in `cypress/screenshots` and `cypress/videos`.

Folder structure (example)
- cypress/
  - e2e/                 # test specs (or features if using cucumber)
  - support/             # custom commands & global hooks
  - fixtures/            # test data
  - pages/               # Page Object classes
  - plugins/             # Cypress plugins (if used)
- reports/               # generated test reports
- docker/                # Dockerfile, helper scripts
- Jenkinsfile            # CI pipeline example
- package.json           # npm scripts & dependencies

BDD (Cucumber)
- Feature files live in `cypress/e2e/features/*.feature`
- Step definitions live next to feature files (or configured path)
- Use clear, high-level Given/When/Then steps to describe intent

Fixtures & API mocking
- Keep static test data in `cypress/fixtures/*.json`
- Use `cy.intercept()` to stub API responses:
  cy.intercept('GET', '/api/users', { fixture: 'users.json' })

Assertions & retries
- Use Cypress + Chai assertions (should/expect)
- Use built-in retry-ability; avoid brittle waits
- Configure test retries in `cypress.config.js` for flaky network tests

Reporting & artifacts
---------------------
- Enable screenshots and videos in `cypress.config.js` for failed tests
- Use Mochawesome for nice HTML reports
- Archive `reports/`, `cypress/screenshots`, and `cypress/videos` as CI artifacts


Tips for reliable tests
- Avoid asserting on presentation only; prefer stable attributes (data-test-id)
- Use network stubbing for deterministic tests where appropriate
- Keep tests small and focused — one assertion per logical expectation
- Use `before` / `beforeEach` hooks sparingly to keep tests independent

Troubleshooting
---------------
- If Cypress cannot start: check Node version, reinstall with `npm ci`
- Flaky tests: add retries, use `cy.intercept()` for unstable backends
- Large DOM timeouts: increase `defaultCommandTimeout` or use targeted waits with assertions

Useful npm scripts (example)
- "test:open": "cypress open"
- "test:run": "cypress run"
- "test:report": "cypress run --reporter mochawesome --reporter-options reportDir=reports/mochawesome,reportFilename=report"

Contributing
------------
Contributions welcome — please follow these guidelines:
- Open an issue for proposed changes or bug reports
- Follow existing code style and POM conventions
- Add tests for bug fixes and create PRs with descriptive titles
- Keep commits small and focused

License
-------
This project is provided as a template. Add your preferred license (e.g., MIT) in LICENSE file.

Acknowledgements
----------------
Built on top of Cypress and community tools like Mochawesome and Cucumber preprocessors. Thanks to those open-source projects.

Contact
-------
Author: Abhishek
Repo: https://github.com/Abhishek-Githu-home/E2E-CypressProject

----
Notes
-----
- Customize `cypress.config.js`, `package.json` scripts and CI pipeline to match your environment.
- If your project uses a specific cucumber preprocessor or plugin, ensure the appropriate configuration is present in `plugins` or `support` files.
