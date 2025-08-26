import { allure } from 'allure-playwright';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openPage(url) {
    await allure.step(`Open page ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async reload() {
    await allure.step('Reload page', async () => {
      await this.page.reload();
    });
  }

  async goBack() {
    await allure.step('Go back in history', async () => {
      await this.page.goBack();
    });
  }

  async goForward() {
    await allure.step('Go forward in history', async () => {
      await this.page.goForward();
    });
  }

  async getTitle() {
    return allure.step('Get page title', async () => {
      return this.page.title();
    });
  }

  async getUrl() {
    return allure.step('Get page URL', async () => {
      return this.page.url();
    });
  }

  async waitForUrl(url, options = {}) {
    await allure.step(`Wait for URL: ${url}`, async () => {
      await this.page.waitForURL(url, options);
    });
  }

  async screenshot(options) {
    return allure.step('Take page screenshot', async () => {
      return this.page.screenshot(options);
    });
  }
}
