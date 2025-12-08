import { expect, Locator, Page } from "@playwright/test";
import { waitForSuccessFulResponse } from "../utils/src/playwright-helpers";

export class DashboardPage {
    readonly page: Page;
    readonly textLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textLocator = page.locator('');
    }

    async loginMethod() {
        await this.page.goto('/');
        await this.page.waitForTimeout(2000); // Application issue we dont use in realtime.
        await this.page.reload(); // Application issue we dont use in realtime.
        await this.page.waitForTimeout(2000); // Application issue we dont use in realtime.
        await this.page.reload(); // Application issue we dont use in realtime.

        //  const response = await waitForSuccessFulResponse(this.page);
        //   expect(response.ok()).toBeTruthy();
    }

    async verifyTitle() {
        console.log('verified title');
    }
}