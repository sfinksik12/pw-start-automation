import { test } from '../index.js';
import { MainPage } from '../src/pages/mainPage.js';

test('Main page', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openPage('/');
  await mainPage.headerFragment.logo.isVisible();
  await mainPage.page.waitForTimeout(5000);
});
