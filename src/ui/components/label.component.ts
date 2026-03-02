import type { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * Class representing label elements.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Label extends BaseComponent {
  static DEFAULT_TYPE = 'label';
  static DEFAULT_NAME = 'Label';
  label: Locator;

  constructor(page: Page, locator: string | Locator, displayName = Label.DEFAULT_NAME) {
    super(page, locator, displayName, Label.DEFAULT_TYPE);
    this.label = this.element;
  }
}
