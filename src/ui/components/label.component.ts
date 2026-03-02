import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing label elements.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Label extends BaseComponent {
  label: Locator;

  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
    this.label = this.element;
  }
}
