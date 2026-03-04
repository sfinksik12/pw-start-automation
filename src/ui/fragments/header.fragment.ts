import type { Page, Locator } from '@playwright/test';
import { BaseFragment } from './base.fragment';
import { Button } from '../components/button.component';
import { Label } from '../components/label.component';

export class HeaderFragment extends BaseFragment {
  root: Locator;
  logo: Label;
  docsLink: Button;
  apiLink: Button;
  communityLink: Button;
  languageDropdown: Button;
  themeToggle: Button;
  searchButton: Button;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator('nav[aria-label="Main"]');
    this.logo = new Label(this.page, this.root.locator('.navbar__brand'), 'Логотип Playwright');
    this.docsLink = new Button(this.page, this.root.locator('a.navbar__link[href="/docs/intro"]'), 'Кнопка Docs');
    this.apiLink = new Button(this.page, this.root.locator('a.navbar__link[href="/docs/api/class-playwright"]'), 'Кнопка API');
    this.communityLink = new Button(this.page, this.root.locator('a.navbar__link[href="/community/welcome"]'), 'Кнопка Community');
    this.languageDropdown = new Button(this.page, this.root.locator('.navbar__item.dropdown--hoverable'), 'Выпадающий список языка');
    this.themeToggle = new Button(this.page, this.root.locator('.colorModeToggle_DEke button'), 'Переключатель темы');
    this.searchButton = new Button(this.page, this.root.locator('button.DocSearch-Button'), 'Кнопка поиска');
  }
}
