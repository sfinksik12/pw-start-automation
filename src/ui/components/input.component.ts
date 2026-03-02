import { allure } from 'allure-playwright';
import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing input fields.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Input extends BaseComponent {
  input: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.input = this.element;
  }

  async getText(): Promise<string> {
    return await allure.step('Получение значения элемента', async () => {
      return await this.element.inputValue();
    });
  }

  async fill(value: string, options?: { timeout?: number }): Promise<void> {
    await allure.step(`Заполнение элемента значением "${value}"`, async () => {
      await this.element.fill(value, options);
    });
  }

  async clear(options?: { timeout?: number }): Promise<void> {
    await allure.step('Очистка элемента', async () => {
      await this.element.clear(options);
    });
  }
}
