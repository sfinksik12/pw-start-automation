import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing headers (h1, h2, span etc.).
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Title extends BaseComponent {
  title: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.title = this.element;
  }
}
