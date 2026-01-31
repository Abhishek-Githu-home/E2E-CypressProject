# CI/CD Evidence Report — Cypress Run 5

Project: gtiq5x
Run ID: 5
Dashboard run URL: https://cloud.cypress.io/projects/gtiq5x/runs/5/test-results?actions=%5B%5D&browsers=%5B%5D&groups=%5B%5D&isFlaky=%5B%5D&modificationDateRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D&orderBy=EXECUTION_ORDER&oses=%5B%5D&specs=%5B%5D&statuses=%5B%5D&testingTypesEnum=%5B%5D

Summary:
- Date range covered in analysis: 2026-01-24 — 2026-01-31
- Total runs (30–31 Jan): 2 (both on 2026-01-30)
- Failures: 2 (100% failure rate for the day)
- Total specs executed (unique): 15
- Total tests counted: 17
- Median run time (2026-01-30): 372.1s

Key findings:
- High failure rate: 100% (2/2 runs failed).
- Most common errors are assertion/timeouts and file-not-found for downloaded CSVs.
- Several specs are consistently failing (listed in Top Failures).
- Some tests are slow (notably FileDownload and BDD ecommerce feature).

Most common errors (counts):
- AssertionError: Timed out retrying after 6000ms: Expected to find content: 'Home' within the element: <a> but never did. — impacted_tests: 6
- AssertionError: cy.readFile(...) failed because the file does not exist at path — impacted_tests: 4
- Cypress detected registration of beforeAll while a test was running — impacted_tests: 4
- Global registry error (cucumber preprocessor / support/e2e.js) — impacted_tests: 4
- cypress-iframe applied to 2 iframes instead of exactly one — impacted_tests: 4

Slowest specs (median durations):
- cypress/e2e/examples/Test7 - FileDownload.js — 00:35
- cypress/e2e/BDD/ecommerce.feature (outline) — 00:21
- cypress/e2e/BDD/ecommerce.feature — 00:21
- cypress/e2e/examples/Test3 - Window Handling.js — 00:19
(see Appendix A for full slowest-tests list)

Top failing specs:
- cypress/e2e/BDD/ecommerce.feature (Outline) — 2 runs, failure_rate 1
- cypress/e2e/examples/Test7 - FileDownload.js — 2 runs, failure_rate 1
- cypress/e2e/BDD/ecommerce/ecommStepDef.js — 2 runs, failure_rate 1
- cypress/e2e/examples/Test5 - iframe.js — 2 runs, failure_rate 1
- cypress/e2e/examples/Test9 - E2EFramework.js — 2 runs, failure_rate 1

Per-spec analysis and probable root causes:
- cypress/e2e/examples/Test7 - FileDownload.js
  - Symptom: ReadFile missing file error (order-invoice_abhiapitest.csv not found). Also slow (median 35s).
  - Probable causes:
    - File download did not complete before readFile attempted. Tests may assume immediate availability.
    - Wrong downloads folder configuration in CI runner (download path differs from local dev).
    - Test relies on deterministic filename but CI run produced different name or no download.
  - Recommended fixes:
    - Ensure downloads folder exists in CI and is cleaned before run.
    - Use cy.wait or poll for file presence with a longer timeout, or use cy.task to move/download file on the node side.
    - Validate that browser download permissions/behavior in headless CI are configured (set browser download directory via Cypress config or use a plugin).

- cypress/e2e/BDD/ecommerce.feature and ecommStepDef.js
  - Symptom: Uncaught error outside test and/or hooks registered at runtime (beforeAll registered while a test was running). Global registry error mentioned for cucumber preprocessor.
  - Probable causes:
    - Step definitions or hooks are being registered dynamically (inside a test or in support/e2e.js) causing the cucumber preprocessor to complain.
    - Using beforeAll inside test or inside steps rather than top-level suite scope.
    - A support file (support/e2e.js) contains cucumber step/register calls that should be in a proper location.
  - Recommended fixes:
    - Move any beforeAll into describe-level hooks or the global scope prior to tests running.
    - Ensure cucumber step definitions are placed in cypress/e2e/BDD and not in support files that run after tests start.
    - Upgrade cucumber preprocessor to a compatible version and check its docs for registry usage.

- cypress/e2e/examples/Test5 - iframe.js
  - Symptom: cypress-iframe commands applied to 2 iframes; expected exactly one.
  - Probable causes:
    - Target page contains multiple iframes matching the selector.
    - Selector is not specific enough.
  - Recommended fixes:
    - Refine the iframe selector to target a single iframe (use index or unique attribute).
    - Assert the number of matched iframes before applying plugin commands and handle accordingly.

- cypress/e2e/examples/Test9 - E2EFramework.js
  - Symptom: Generic E2E test failing; included in top failures.
  - Probable causes:
    - Could be related to navigation/assertion timing (e.g., 'Home' not found) or other environment differences.
  - Recommended fixes:
    - Add more robust selectors and retry logic; increase command timeouts where necessary.

Artifacts and evidence links:
- Dashboard run overview: https://cloud.cypress.io/projects/gtiq5x/runs/5
- Test results with filters: https://cloud.cypress.io/projects/gtiq5x/runs/5/test-results?actions=%5B%5D&browsers=%5B%5D&groups=%5B%5D&isFlaky=%5B%5D&modificationDateRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D&orderBy=EXECUTION_ORDER&oses=%5B%5D&specs=%5B%5D&statuses=%5B%5D&testingTypesEnum=%5B%5D
- Specs list: https://cloud.cypress.io/projects/gtiq5x/runs/5/specs
- Use the Cypress Dashboard UI to download raw JSON export for run 5 (requires record key/permissions).

Recommendations (short- and medium-term):
1. Stabilize downloads tests (Test7): standardize download path in CI, wait for file, or stub network responses.
2. Fix cucumber registration and hook placement: search for beforeAll usages and move them to top-level suites.
3. Make iframe selectors specific and assert count before plugin usage.
4. Add targeted retries or increase timeouts for fragile assertions; do not globally increase timeouts without addressing root cause.
5. Improve CI parallelization: current median concurrency is 1 and no parallel savings — consider splitting specs into groups to reduce wall-clock time.
6. Add a smoke gate job to fail fast for environment issues (e.g., missing download permission).

Action items and owners (suggested):
- QA: Update Test7 to poll for downloaded file and add CI-specific config. (2–4h)
- Dev: Review and fix beforeAll registration in BDD steps/support (1–3h)
- QA: Refine iframe selectors in Test5 (0.5–1h)
- CI Admin: Ensure CI VM allows browser downloads and that artifacts are collected (1–2h)

Appendix A — slowest-tests CSV
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

Appendix B — most-common-errors CSV
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

Appendix C — top-failures CSV
```csv
spec_path,title,last_failure_seen_at,last_failure_runs_ago,total_results,failure_rate
cypress/e2e/BDD/ecommerce.feature,End to End Ecommerce Validation /// Ecommerce Products delivery with Outline(cucumber driven),2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/examples/Test7 - FileDownload.js,Download file functionality /// Verify user able to download the csv file,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/BDD/ecommerce/ecommStepDef.js,An uncaught error was detected outside of a test,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/examples/Test5 - iframe.js,Handling the frames /// Frame in Automation practice site,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/examples/Test9 - E2EFramework.js,E2E Ecommerce test /// Verification of E2E Positive flow,2026-01-30T17:05:28.571Z,0,2,1
cypress/e2e/BDD/ecommerce.feature,End to End Ecommerce Validation /// Ecommerce Products delivery,2026-01-30T16:07:40.131Z,1,2,0.5
```

Appendix D — test-suite-size CSV
```csv
date,total_tests,total_specs,total_runs,failure_rate
2026-01-30,17,15,2,1.00
```

Appendix E — run-duration CSV
```csv
date,average_runtime,median_concurrency,parallelization_savings,total_runs,failure_rate
2026-01-30,372.088,1,0,2,1.00
2026-01-31,,,0,0,0
```

Appendix F — runs-over-time CSV
```csv
date,total,failed,running,errored,passed,no_tests,over_limit,timed_out,cancelled,failure_rate
date,total,failed,running,errored,passed,no_tests,over_limit,timed_out,cancelled,failure_rate
2026-01-30,2,2,0,0,0,0,0,0,0,1.00
2026-01-31,0,0,0,0,0,0,0,0,0,0
```

Conclusion:
This run (5) shows systemic instability in the suite for the analysed date range. Prioritizing the file-download test fixes, cucumber hook placement fixes, and iframe selector corrections will significantly reduce failures. After fixes, re-run with parallelization gating and artifact collection enabled to gather evidence (screenshots/videos) for each fix.

Report prepared by: GitHub Copilot (automated analysis) on 2026-01-31.