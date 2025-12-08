import { test, expect } from '../../fixtures/fixture'

test.beforeEach(async ({ appPage }) => {
    await appPage.dashboardPage.loginMethod();
});

test('AN-001 verify', async ({ appPage }) => {
    test.info().annotations.push({
        type: 'Test case Id :',
        description: 'JIRA URL of Testcase'
    });
    await test.step('Verify title', async () => {
        await appPage.dashboardPage.verifyTitle();
    })
});