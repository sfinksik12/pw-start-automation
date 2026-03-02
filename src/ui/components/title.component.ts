import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing headers (h1, h2, span etc.).
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Title extends BaseComponent {
  static DEFAULT_TYPE = 'header';
  static DEFAULT_NAME = 'header';
  title: Locator;

  constructor(page: Page, locator: string | Locator, displayName = Title.DEFAULT_NAME) {
    super(page, locator, displayName, Title.DEFAULT_TYPE);
    this.title = this.element;
  }
}
