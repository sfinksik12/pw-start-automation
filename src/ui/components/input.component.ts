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
}
