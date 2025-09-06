import { BaseComponent } from './base.component.js';

/**
 * Class representing headers (h1, h2, span etc.).
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Title extends BaseComponent {
  static DEFAULT_TYPE = 'header';
  static DEFAULT_NAME = 'header';
  constructor(page, locator, displayName = Title.DEFAULT_NAME) {
    super(page, locator, displayName, Title.DEFAULT_TYPE);
    this.title = this.element;
  }
}
