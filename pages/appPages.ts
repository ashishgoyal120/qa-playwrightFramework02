import type { Page } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

export default class AppPage {
    readonly page: Page;
    dashboardPage: DashboardPage;

    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
    }
}