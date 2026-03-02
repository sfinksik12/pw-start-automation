import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderFragment } from '../fragments/header.fragment';

export class MainPage extends BasePage {
  headerFragment: HeaderFragment;

  constructor(page: Page) {
    super(page);
    this.headerFragment = new HeaderFragment(page);
  }
}
