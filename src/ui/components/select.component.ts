import { allure } from 'allure-playwright';
import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing select elements.
 * Inherits from BaseComponent and provides selectOption method.
 */
export class Select extends BaseComponent {
  select: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.select = this.element;
  }

  async selectOption(
    value: string | { value?: string; label?: string; index?: number } | Array<string | { value?: string; label?: string; index?: number }>,
    options?: { timeout?: number; force?: boolean }
  ): Promise<string[]> {
    return allure.step(`Выбор опции "${value}" в элементе`, async () => {
      return await this.element.selectOption(value as Parameters<Locator['selectOption']>[0], options);
    });
  }
}
