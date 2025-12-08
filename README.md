qa-playwrightFramework02
This is a Playwright-based test automation framework designed to demonstrate how to preserve session information using storage state.

📁 Folder Structure
1. node_modules
Auto-generated folder containing all the project dependencies.

2. distReports
Custom folder created to store HTML or other test execution reports.

3. playwright/.auth
Custom folder used to save the session or storage state.

Created manually for authentication storage.

4. tests
Contains all test case files.

When you run npx playwright test --headed, all tests under this folder will execute in headed mode.

5. Utils
Contains helper and setup utilities for the framework.

auth.setup.ts
This file performs two key tasks:

Saving the storage state (to avoid logging in repeatedly).

Verifying a successful API response using the function waitForSuccessFulResponse.

🔍 Understanding waitForSuccessFulResponse
<pre lang="markdown">```ts
export async function waitForSuccessFulResponse(page: Page): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timeout waiting for dashboard response")), 15000);

    page.on('response', async (res) => {
      if (res.url().endsWith('/dashboard/index') && res.status() === 200) {
        resolve(res);
      }
    });
  });
}
```</pre>
✅ What This Function Does:
Listens for a successful HTTP response on the /dashboard/index endpoint.

Ensures that the response has a status code 200 (OK).

Used as a way to confirm successful login or application readiness.

🧪 How We Identify the Right API Response
Manually log in to the application.

Enter username and password.

Click the login button.

Open DevTools Inspector → Go to the Network tab.

Clear filters and reload the page.

Click on any API call (like /dashboard/index) in the Name column.

On the right panel, observe the tabs: Headers, Preview, Response, etc.

From the Headers, note the API path (not the full URL).

We use this path (e.g., /dashboard/index) in our code to validate successful login via its 200 response.


![alt text](<Screenshot 2025-08-08 at 6.17.22 PM.png>)

![alt text](image.png)



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