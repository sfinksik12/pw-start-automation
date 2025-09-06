import { BasePage } from './base.page.js';
import { HeaderFragment } from '../fragments/header.fragment.js';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerFragment = new HeaderFragment(page);
  }
}
