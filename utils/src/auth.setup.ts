import { expect, test as setup } from '@playwright/test'
import dotenv from 'dotenv';
import path from 'path';
import { getCredentialsForApp, waitForSuccessFulResponse } from './playwright-helpers';
import { get } from 'https';
dotenv.config({
    path: path.resolve(process.cwd(), '.env.local')
})

setup('login through the UI and save the storage State', async ({ page }, testInfo) => {
    const { email, password } = getCredentialsForApp();
    await page.goto('/');
    // await page.locator('[name="username"]').click();
    //  await page.locator('[name="username"]').fill(email);
    // await page.locator('[name="password"]').click();
    //  await page.locator('[name="password"]').fill(password);
    // await page.locator("button[type='submit']").click();
    //Ensure login succeeded by waiting for the '/auth/login' API response.
    // const response = await waitForSuccessFulResponse(page);
    //  expect(response.ok()).toBeTruthy();

    //Save Storage State for further tests
    await page.context().storageState({ path: 'playwright/.auth/storageState.json' });
});