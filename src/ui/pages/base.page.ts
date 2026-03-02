import { allure } from 'allure-playwright';
import type { Page } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openPage(url: string): Promise<void> {
    await allure.step(`Open page ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async reload(): Promise<void> {
    await allure.step('Reload page', async () => {
      await this.page.reload();
    });
  }

  async goBack(): Promise<void> {
    await allure.step('Go back in history', async () => {
      await this.page.goBack();
    });
  }

  async goForward(): Promise<void> {
    await allure.step('Go forward in history', async () => {
      await this.page.goForward();
    });
  }

  async getTitle(): Promise<string> {
    return allure.step('Get page title', async () => {
      return this.page.title();
    });
  }

  async getUrl(): Promise<string> {
    return allure.step('Get page URL', async () => {
      return this.page.url();
    });
  }

  async waitForUrl(url: string | RegExp, options: { timeout?: number } = {}): Promise<void> {
    await allure.step(`Wait for URL: ${url}`, async () => {
      await this.page.waitForURL(url, options);
    });
  }

  async screenshot(options?: { path?: string; type?: 'png' | 'jpeg'; fullPage?: boolean }): Promise<Buffer> {
    return allure.step('Take page screenshot', async () => {
      return this.page.screenshot(options);
    });
  }
}
