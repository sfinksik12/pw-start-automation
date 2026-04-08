import { test, expect } from '../index';

test.describe('Хедер', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.openPage('/');
  });

  test('Хедер виден', async ({ mainPage }) => {
    const headerFragment = mainPage.headerFragment;
    expect(headerFragment.root).toBeVisibleAllure('Корень хедера');
    expect(headerFragment.logo).toBeVisibleAllure('Логотип');
    expect(headerFragment.docsLink).toBeVisibleAllure('Ссылка Docs');
    expect(headerFragment.apiLink).toBeVisibleAllure('Ссылка API');
    expect(headerFragment.communityLink).toBeVisibleAllure('Ссылка Community');
    expect(headerFragment.searchButton).toBeVisibleAllure('Кнопка поиска');
    expect(headerFragment.githubLink).toBeVisibleAllure('Ссылка GitHub');
    expect(headerFragment.discordLink).toBeVisibleAllure('Ссылка Discord');
    expect(headerFragment.languageDropdown).toBeVisibleAllure('Выпадающий список языка');
    expect(headerFragment.themeToggle).toBeVisibleAllure('Переключатель темы');
    expect(headerFragment.mobileToggle).toBeVisibleAllure('Мобильное меню');
  });

  test('Логотип содержит текст Playwright', async ({ mainPage }) => {
    expect(mainPage.headerFragment.logo).toHaveTextAllure(/Playwright/, 'Логотип');
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
    expect(searchModal).toBeVisibleAllure('Модальное окно поиска');
  });

  test('Переключатель темы виден и кликабелен', async ({ mainPage }) => {
    expect(mainPage.headerFragment.themeToggle).toBeVisibleAllure('Переключатель темы');
    await mainPage.headerFragment.themeToggle.click();
  });

  test('Ссылка GitHub имеет корректный href', async ({ mainPage }) => {
    expect(mainPage.headerFragment.githubLink).toHaveAttributeAllure('href', /github\.com\/microsoft\/playwright/, 'Ссылка GitHub');
  });

  test('Ссылка Discord имеет корректный href', async ({ mainPage }) => {
    expect(mainPage.headerFragment.discordLink).toHaveAttributeAllure('href', /aka\.ms\/playwright\/discord/, 'Ссылка Discord');
  });

  test('Выпадающий список языка открывается, опция Python ведёт на страницу', async ({ page, mainPage }) => {
    await mainPage.headerFragment.languageDropdown.hover();
    const dropdownMenu = page.locator('.dropdown__menu');
    expect(dropdownMenu).toBeVisibleAllure('Меню выбора языка');

    const pythonOption = await mainPage.headerFragment.getLanguageOption('/python/');
    await pythonOption.click();
    await page.waitForURL(/\/python\//);
  });
});
