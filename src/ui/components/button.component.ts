import { allure } from 'allure-playwright';
import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Класс, представляющий кнопки.
 * Наследуется от BaseComponent и использует его методы для взаимодействия.
 */
export class Button extends BaseComponent {
  button: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.button = this.element;
  }

  async click(): Promise<void> {
    await allure.step('Клик по элементу', async () => {
      await this.element.click();
    });
  }

  async hover(): Promise<void> {
    await allure.step('Наведение курсора на элемент', async () => {
      await this.element.hover();
    });
  }
}
