# CI/CD Evidence Report — Cypress Run 5

[![View Run](https://img.shields.io/badge/View%20Run-Cypress-blue?style=for-the-badge)](https://cloud.cypress.io/projects/gtiq5x/runs/5)

[![Test Results](https://img.shields.io/badge/Test%20Results-Dashboard-brightgreen?style=for-the-badge)](https://cloud.cypress.io/projects/gtiq5x/runs/5/test-results?actions=%5B%5D&browsers=%5B%5D&groups=%5B%5D&isFlaky=%5B%5D&modificationDateRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D&orderBy=EXECUTION_ORDER&oses=%5B%5D&specs=%5B%5D&statuses=%5B%5D&testingTypesEnum=%5B%5D)

[![Specs List](https://img.shields.io/badge/Specs-List-red?style=for-the-badge)](https://cloud.cypress.io/projects/gtiq5x/runs/5/specs)

---

## Overall Run-Report metadata

- Project Name: **E2E-Cypress Project**
- Project ID: **gtiq5x** 
- Runtime Date: **2026-01-31**  


## Artifacts and evidence links:
- **Dashboard run overview**: https://cloud.cypress.io/projects/gtiq5x/runs/5
- **Detailed analytic run results**: https://cloud.cypress.io/projects/gtiq5x/runs/5/test-results?actions=%5B%5D&browsers=%5B%5D&groups=%5B%5D&isFlaky=%5B%5D&modificationDateRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D&orderBy=EXECUTION_ORDER&oses=%5B%5D&specs=%5B%5D&statuses=%5B%5D&testingTypesEnum=%5B%5D
- **Specs list**: https://cloud.cypress.io/projects/gtiq5x/runs/5/specs
- Use the Cypress Dashboard UI to download raw JSON export for run 5 (requires record key/permissions).
---

## Summary (2026-01-30)
| Metric | Value |
|---|---:|
| Total runs | 02 |
| Unique specs executed | 15 |
| Total tests counted | 17 |
| Passed Count | 10 |
| Failed Count | 05 |
| Median run time | 372.1 s |

---

## Test outcome
Passed: 10 • Failed: 05

🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 🟥🟥🟥🟥🟥  
(10 green squares = passed, 5 red squares = failed)

## Pass rate: 58.8% (10/17) 

Note: Intentionally failed the cases for analytic purpose and dashboard-level failure rate for the day shows 100% of runs failed; tests distribution above is per-tests-count.

---

## Key findings (short)
- Very high pipeline instability: both runs on 2026-01-30 failed.
- Most common failures are assertion/timeouts, missing downloaded CSV files, and test-hook/registry errors with the cucumber preprocessor.
- Several specs are repeat offenders (Top failing specs below).
- File-download tests are both slow and fragile — candidate for immediate remediation.

---

## Most common errors (impact)
| Error summary | Impacted tests |
|---|---:|
| AssertionError — 'Home' not found (timed out) | 6 |
| cy.readFile missing download (order-invoice_abhiapitest.csv) | 4 |
| Cypress detected beforeAll registered while a test was running | 4 |
| Global registry error (cucumber preprocessor, support/e2e.js) | 4 |
| cypress-iframe matched multiple iframes (expected 1) | 4 |

---

## Slowest specs (median durations)
- cypress/e2e/examples/Test7 - FileDownload.js — 00:35  
- cypress/e2e/BDD/ecommerce.feature (outline) — 00:21  
- cypress/e2e/BDD/ecommerce.feature — 00:21  
- cypress/e2e/examples/Test3 - Window Handling.js — 00:19

(Full list in Appendix A)

---

## Top failing specs
1. cypress/e2e/BDD/ecommerce.feature (Outline) — 2 runs, failure_rate 1  
2. cypress/e2e/examples/Test7 - FileDownload.js — 2 runs, failure_rate 1  
3. cypress/e2e/BDD/ecommerce/ecommStepDef.js — 2 runs, failure_rate 1  
4. cypress/e2e/examples/Test5 - iframe.js — 2 runs, failure_rate 1  
5. cypress/e2e/examples/Test9 - E2EFramework.js — 2 runs, failure_rate 1

---

## Per-spec quick analysis & recommended fixes

- Test7 — FileDownload.js  
  - Symptom: cy.readFile fails as downloaded CSV not found; test is slow.  
  - Likely causes: download did not complete before read, wrong download path in CI, or browser headless download behavior.  
  - Fixes: ensure CI download dir exists and is cleaned; poll for file with retry and timeout; consider using cy.task to perform server-side file checks; or stub network/download.

- BDD ecommerce (feature & ecommStepDef.js)  
  - Symptom: uncaught error outside tests & "beforeAll registered while a test was running"; cucumber global registry error.  
  - Likely causes: step/hook registration being run at an unexpected time (support files or dynamic registration).  
  - Fixes: move beforeAll to top-level suite or global setup before tests run; ensure step definitions live in proper folder (not in support/e2e.js that runs after runner starts); verify cucumber preprocessor version.

- iframe tests (Test5)  
  - Symptom: cypress-iframe commands applied while selector matched 2 iframes.  
  - Fixes: use a unique iframe selector or index; assert iframe count before applying plugin; make selectors robust.

- General flaky navigation/assertion failures  
  - Fixes: increase targeted timeouts only where necessary; prefer robust selectors and waiting patterns (cy.findBy/contains with scope); add network stubbing for external dependencies.

---

## Recommendations (priority)
1. Fix FileDownload tests (CI download path + polling) — high priority.  
2. Fix BDD hook/registry issues (move beforeAll, review support files) — high priority.  
3. Make iframe selectors specific; assert counts — medium.  
4. Add a smoke/gate job to validate environment (downloads, browser flags) before full run — medium.  
5. Consider splitting specs into groups to enable parallelization and reduce wall time — medium.  
6. Collect screenshots/videos and raw JSON artifacts after fixes to confirm remediation — low/medium.

---

## Action items (owners, rough estimate)
- QA: Update FileDownload test for CI downloads & polling (2–4h)  
- Dev: Review BDD hooks/step definition placement and fix beforeAll issues (1–3h)  
- QA: Update iframe selectors and add pre-checks (0.5–1h)  
- CI Admin: Ensure browser downloads are allowed & artifacts are collected (1–2h)

---

## Appendices

#### Appendix A — slowest-tests CSV
```csv
spec_path,title,total_results,median_duration
cypress/e2e/examples/Test7 - FileDownload.js,Download file functionality /// Verify user able to download the csv file,2,00:35
cypress/e2e/BDD/ecommerce.feature,End to End Ecommerce Validation /// Ecommerce Products delivery with Outline(cucumber driven),2,00:21
cypress/e2e/BDD/ecommerce.feature,End to End Ecommerce Validation /// Ecommerce Products delivery,2,00:21
cypress/e2e/examples/Test3 - Window Handling.js,Handling the windows /// Switching the tabs within the window,2,00:19
"cypress/e2e/examples/Test1 - Basic_functions, Promises.js",My first test suite /// My first test case,2,00:18
cypress/e2e/examples/Test5 - iframe.js,Handling the frames /// Frame in Automation practice site,2,00:07
"cypress/e2e/examples/Test2 - Dropdown, Button, Alerts.js","This is second testcase /// Verification of dropdown, checkbox",2,00:07
cypress/e2e/examples/Test4 - Table_data & Mouse hover.js,Handling the Table data /// Extracting the row from table,2,00:06
cypress/e2e/examples/Test8 - File Upload.js,Download the file from browser /// Verify the File download functionality,2,00:05
cypress/e2e/examples/Test6 - Calender.js,Calender functionality /// veriy the calender functionality,2,00:04
cypress/e2e/ApiTesting/Test12 - TestAPI.js,Hitting URL /// API Testing with output,2,00:04
cypress/e2e/examples/Test8 - File Upload.js,Download the file from browser /// Verify the Upload file functionality,2,00:03
cypress/e2e/ApiTesting/Test10 - FakeApi.js,Verify the Authorization /// Validation,2,00:01
cypress/e2e/ApiTesting/Test11 - MockApi.js,Managing the API /// Altering the API Response,2,00:01
cypress/e2e/examples/Test9 - E2EFramework.js,E2E Ecommerce test /// Verification of E2E Positive flow,2,00:01
cypress/e2e/BDD/ecommerce/ecommStepDef.js,An uncaught error was detected outside of a test,2,844ms
cypress/e2e/examples/CheckSanity.js,Checking the sanity /// should pass if the environment is clean,2,161ms
```

#### Appendix B — most-common-errors CSV
```csv
error_name,error_message,impacted_tests
AssertionError,Timed out retrying after 6000ms: Expected to find content: 'Home' within the element: <a> but never did.,6
AssertionError,"Timed out retrying after 6000ms: `cy.readFile(""cypress/downloads/order-invoice_abhiapitest.csv"")` failed because the file does not exist at the following path:

`C:\Users\abhis\CypressAutomation\cypress\downloads\order-invoice_abhiapitest.csv`

https://on.cypress.io/readfile",4
CypressError,"Cypress detected you registered a(n) `beforeAll` hook while a test was running (possibly a hook nested inside another hook). All hooks must be registered before a test begins executing.

Move the `beforeAll` into a suite callback or the global scope.",4
Error,"The following error originated from your test code, not from Cypress.

  > Expected to find a global registry (this usually means you are trying to define steps or hooks in support/e2e.js, which is not supported) (this might be a bug, please report at https://github.com/badeball/cypress-cucumber-preprocessor)

When Cypress detects uncaught errors originating from your test code it will automatically fail the current test.

Cypress could not associate this error to any specific test.

We dynamically generated a new test to display this failure.",4
Error,cypress-iframe commands can only be applied to exactly one iframe at a time.  Instead found 2,4
```

#### Appendix C — top-failures CSV
```csv
spec_path,title,last_failure_seen_at,last_failure_runs_ago,total_results,failure_rate
cypress/e2e/BDD/ecommerce.feature,End to End Ecommerce Validation /// Ecommerce Products delivery with Outline(cucumber driven),2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/examples/Test7 - FileDownload.js,Download file functionality /// Verify user able to download the csv file,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/BDD/ecommerce/ecommStepDef.js,An uncaught error was detected outside of a test,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/examples/Test5 - iframe.js,Handling the frames /// Frame in Automation practice site,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/examples/Test9 - E2EFramework.js,E2E Ecommerce test /// Verification of E2E Positive flow,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/BDD/ecommerce.feature,End to End Ecommerce Validation /// Ecommerce Products delivery,2026-01-30T16:07:40.131Z,1,2,0.5
```

---

Report prepared by: **Abhishek** using GitHub Copilot (Automated analysis) — 2026-01-31
