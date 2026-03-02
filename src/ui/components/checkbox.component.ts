import { allure } from 'allure-playwright';
import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Класс, представляющий чекбоксы.
 * Наследуется от BaseComponent и использует его методы для взаимодействия.
 */
export class Checkbox extends BaseComponent {
  checkbox: Locator;

  constructor(page: Page, parentOrLocator: string | Locator, locator?: string) {
    super(page, parentOrLocator, locator);
    this.checkbox = this.element;
  }

  async click(): Promise<void> {
    await allure.step('Клик по элементу', async () => {
      await this.element.click();
    });
  }

  async check(options?: { timeout?: number; force?: boolean }): Promise<void> {
    await allure.step('Установка галочки', async () => {
      await this.element.check(options);
    });
  }

  async uncheck(options?: { timeout?: number; force?: boolean }): Promise<void> {
    await allure.step('Снятие галочки', async () => {
      await this.element.uncheck(options);
    });
  }

  async isChecked(options?: { timeout?: number }): Promise<boolean> {
    return allure.step('Проверка состояния галочки', async () => {
      return this.element.isChecked(options);
    });
  }
}
