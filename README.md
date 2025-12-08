# 🎭 Playwright Automation Framework

# # Exeution Flow : 

1. Run tests (e.g. npx playwright test --headed) — Playwright loads playwright.config.ts which calls the factory ***createBasePlaywrightConfig***.
2. ***createBasePlaywrightConfig*** reads the environment (from .env.local), resolves the baseURL from the provided map, sets reporters/output directories, and defines projects (e.g. setup and chromium). *See the projects and storageState usage in playwright.base.config.ts.*
3. The setup project runs the setup test file auth.setup.ts. That file:
  - Loads credentials via getCredentialsForApp (reads from .env.local).
  - Optionally waits for a successful API response using waitForSuccessFulResponse.
  - Saves the browser storage/state with page.context().storageState({ path: 'playwright/.auth/storageState.json' }). *See auth.setup.ts and storageState.json.*
  - The saved storage state (storageState.json) is reused by subsequent project runs. 
  - Each brower in project in playwright.base.config.ts sets storageState: [storageState.json](http://_vscodecontentref_/13)', so tests run with the preserved authenticated session.
4. Test fixtures wire up page objects:
  - fixture.ts extends Playwright test to provide appPage (an instance of AppPage).
  - AppPage composes [DashboardPage[](pages/dashboard.page.ts), so tests use ](http://_vscodecontentref_/  18)appPage.dashboardPage.
5. Tests execution:
Example: example.spec.ts is a simple test.
Main tests: dashboard.spec.ts uses the fixture and calls appPage.dashboardPage.loginMethod() (implementation in pages/dashboard.page.ts), then runs assertions/steps (e.g. verifyTitle).
Helpers used by pages/tests: see waitForSuccessFulResponse and getCredentialsForApp for response-wait and credential retrieval.
6. Reports and outputs:
Test results JSON: results.json.
HTML report: index.html.
Per-run artifacts go to the outputDir configured in createBasePlaywrightConfig.
Summary flow (quick):

***Final flow : ***<br>
Config factory -> run setup -> save storage state -> run chromium tests using saved state -> page objects & fixtures drive actions -> reporters write results to distReports. Files: playwright.config.ts, auth.setup.ts, storageState.json, fixture.ts, appPages.ts, dashboard.page.ts, dashboard.spec.ts, results.json, index.html.