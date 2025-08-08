import { test as base, expect } from '@playwright/test';
import AppPage from '../pages/appPages';

type PageWrapper = {
    appPage: AppPage;
};

export const test = base.extend<PageWrapper>({
    appPage: async ({ page }, use) => {
        await use(new AppPage(page));
    }
});

export { expect } from '@playwright/test';