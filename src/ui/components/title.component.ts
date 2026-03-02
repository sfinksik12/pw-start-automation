import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Класс, представляющий заголовки (h1, h2, span и т.д.).
 * Наследуется от BaseComponent и использует его методы для взаимодействия.
 */
export class Title extends BaseComponent {
  title: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.title = this.element;
  }
}
