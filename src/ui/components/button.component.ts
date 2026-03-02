import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing buttons.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Button extends BaseComponent {
  button: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.button = this.element;
  }
}
