import { test } from '../index';
import { MainPage } from '../src/ui/pages/mainPage';

test('Main page', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openPage('/');
  await mainPage.headerFragment.logo.isVisible();
  await mainPage.page.waitForTimeout(5000);
});
