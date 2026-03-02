import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing checkbox elements.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Checkbox extends BaseComponent {
  checkbox: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.checkbox = this.element;
  }
}
