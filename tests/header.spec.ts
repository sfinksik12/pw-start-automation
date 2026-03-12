import { test, expect } from '../index';

test.describe('Хедер', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.openPage('/');
  });

  test('Хедер виден', async ({ mainPage }) => {
    const headerFragment = mainPage.headerFragment;
    expect(headerFragment.root).toBeVisibleAllure('Header root');
    expect(headerFragment.logo).toBeVisibleAllure('Logo');
    expect(headerFragment.docsLink).toBeVisibleAllure('Docs link');
    expect(headerFragment.apiLink).toBeVisibleAllure('API link');
    expect(headerFragment.communityLink).toBeVisibleAllure('Community link');
    expect(headerFragment.searchButton).toBeVisibleAllure('Search button');
  });

  test('Логотип содержит текст Playwright', async ({ mainPage }) => {
    expect(mainPage.headerFragment.logo).toHaveTextAllure(/Playwright/, 'Logo');
  });

  test('Ссылка Docs ведёт на intro', async ({ page, mainPage }) => {
    await mainPage.headerFragment.docsLink.click();
    await page.waitForURL(/\/docs\/intro/);
  });

  test('Ссылка API ведёт на API docs', async ({ page, mainPage }) => {
    await mainPage.headerFragment.apiLink.click();
    await page.waitForURL(/\/docs\/api/);
  });

  test('Ссылка Community ведёт на community', async ({ page, mainPage }) => {
    await mainPage.headerFragment.communityLink.click();
    await page.waitForURL(/\/community/);
  });

  test('Кнопка Search открывает модальное окно поиска', async ({ page, mainPage }) => {
    await mainPage.headerFragment.searchButton.click();
    const searchModal = page.locator('.DocSearch-Modal');
    await searchModal.waitFor({ state: 'visible' });
    expect(searchModal).toBeVisibleAllure('DocSearch modal');
  });

  test('Переключатель темы виден и кликабелен', async ({ mainPage }) => {
    expect(mainPage.headerFragment.themeToggle).toBeVisibleAllure('Theme toggle');
    await mainPage.headerFragment.themeToggle.click();
  });

  test('Ссылка GitHub имеет корректный href', async ({ mainPage }) => {
    expect(mainPage.headerFragment.githubLink).toHaveAttributeAllure('href', /github\.com\/microsoft\/playwright/, 'GitHub link');
  });

  test('Ссылка Discord имеет корректный href', async ({ mainPage }) => {
    expect(mainPage.headerFragment.discordLink).toHaveAttributeAllure('href', /aka\.ms\/playwright\/discord/, 'Discord link');
  });

  test('Выпадающий список языка открывается, опция Python ведёт на страницу', async ({ page, mainPage }) => {
    await mainPage.headerFragment.languageDropdown.hover();
    const dropdownMenu = page.locator('.dropdown__menu');
    expect(dropdownMenu).toBeVisibleAllure('Language dropdown menu');

    const pythonOption = await mainPage.headerFragment.getLanguageOption('/python/');
    await pythonOption.click();
    await page.waitForURL(/\/python\//);
  });
});
