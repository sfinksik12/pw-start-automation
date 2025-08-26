import { BaseComponent } from './base.component.js';

/**
 * Class representing buttons.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Button extends BaseComponent {
  static DEFAULT_TYPE = 'button';
  static DEFAULT_NAME = 'button';
  constructor(page, locator, displayName = Button.DEFAULT_NAME) {
    super(page, locator, displayName, Button.DEFAULT_TYPE);
    this.button = this.element;
  }
}
