import { BaseComponent } from './base.component.js';

/**
 * Class representing label elements.
 * Inherits from BaseComponent and uses its methods for interaction.
 */
export class Label extends BaseComponent {
  static DEFAULT_TYPE = 'label';
  static DEFAULT_NAME = 'Label';

  constructor(page, locator, displayName = Label.DEFAULT_NAME) {
    super(page, locator, displayName, Label.DEFAULT_TYPE);
    this.label = this.element;
  }
}
