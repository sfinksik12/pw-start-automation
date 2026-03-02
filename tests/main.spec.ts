import { test, expect } from '../index';
import { MainPage } from '../src/ui/pages/mainPage';

test.describe('Main page', () => {
  test('заголовок страницы содержит Playwright', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openPage('/');

    expect(await mainPage.getTitle()).toContainAllure('Playwright');
  });
});
