import { test as baseTest } from '@playwright/test';
import { MainPage } from '../ui/pages/mainPage';

export const pomTest = baseTest.extend<{ mainPage: MainPage }>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
});
