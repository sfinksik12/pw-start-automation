import { BaseComponent } from './base.component.js';

/**
 * Class representing checkbox elements.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Checkbox extends BaseComponent {
  static DEFAULT_TYPE = 'checkbox';
  static DEFAULT_NAME = 'Checkbox';

  constructor(page, locator, displayName = Checkbox.DEFAULT_NAME) {
    super(page, locator, displayName, Checkbox.DEFAULT_TYPE);
    this.checkbox = this.element;
  }
}
