import { test, expect } from '../index';
import { MainPage } from '../src/ui/pages/mainPage';

test.describe('Хедер', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openPage('/');
  });

  test('Хедер виден', async () => {
    const { headerFragment } = mainPage;
    expect(headerFragment.root).toBeVisibleAllure('Header root');
    expect(headerFragment.logo.element).toBeVisibleAllure('Logo');
    expect(headerFragment.docsLink.element).toBeVisibleAllure('Docs link');
    expect(headerFragment.apiLink.element).toBeVisibleAllure('API link');
    expect(headerFragment.communityLink.element).toBeVisibleAllure('Community link');
    expect(headerFragment.searchButton.element).toBeVisibleAllure('Search button');
  });

  test('Логотип содержит текст Playwright', async () => {
    expect(mainPage.headerFragment.logo.element).toHaveTextAllure(/Playwright/, 'Logo');
  });

  test('Ссылка Docs ведёт на intro', async ({ page }) => {
    await mainPage.headerFragment.docsLink.click();
    await page.waitForURL(/\/docs\/intro/);
  });

  test('Ссылка API ведёт на API docs', async ({ page }) => {
    await mainPage.headerFragment.apiLink.click();
    await page.waitForURL(/\/docs\/api/);
  });

  test('Ссылка Community ведёт на community', async ({ page }) => {
    await mainPage.headerFragment.communityLink.click();
    await page.waitForURL(/\/community/);
  });

  test('Кнопка Search открывает модальное окно поиска', async ({ page }) => {
    await mainPage.headerFragment.searchButton.click();
    const searchModal = page.locator('.DocSearch-Modal');
    expect(searchModal).toBeVisibleAllure('DocSearch modal');
  });

  test('Переключатель темы виден и кликабелен', async () => {
    expect(mainPage.headerFragment.themeToggle.element).toBeVisibleAllure('Theme toggle');
    await mainPage.headerFragment.themeToggle.click();
  });

  test('Ссылка GitHub имеет корректный href', async () => {
    expect(mainPage.headerFragment.githubLink.element).toHaveAttributeAllure('href', /github\.com\/microsoft\/playwright/, 'GitHub link');
  });

  test('Ссылка Discord имеет корректный href', async () => {
    expect(mainPage.headerFragment.discordLink.element).toHaveAttributeAllure('href', /aka\.ms\/playwright\/discord/, 'Discord link');
  });

  test('Выпадающий список языка открывается, опция Python ведёт на страницу', async ({ page }) => {
    await mainPage.headerFragment.languageDropdown.hover();
    const dropdownMenu = page.locator('.dropdown__menu');
    expect(dropdownMenu).toBeVisibleAllure('Language dropdown menu');

    const pythonOption = await mainPage.headerFragment.getLanguageOption('/python/');
    await pythonOption.click();
    await page.waitForURL(/\/python\//);
  });
});
