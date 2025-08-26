import { BaseComponent } from './base.component.js';

/**
 * Class representing input fields.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Input extends BaseComponent {
  static DEFAULT_TYPE = 'input';
  static DEFAULT_NAME = 'Input field';
  constructor(page, locator, displayName = Input.DEFAULT_NAME) {
    super(page, locator, displayName, Input.DEFAULT_TYPE);
    this.input = this.element;
  }
}
