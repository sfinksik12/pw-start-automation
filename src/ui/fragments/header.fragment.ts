import { allure } from 'allure-playwright';
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
  githubLink: Button;
  discordLink: Button;
  mobileToggle: Button;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator('.navbar__inner');
    this.logo = new Label(this.page, this.root, '.navbar__brand');
    this.docsLink = new Button(this.page, this.root, 'a.navbar__link[href="/docs/intro"]');
    this.apiLink = new Button(this.page, this.root, 'a.navbar__link[href="/docs/api/class-playwright"]');
    this.communityLink = new Button(this.page, this.root, 'a.navbar__link[href="/community/welcome"]');
    this.languageDropdown = new Button(this.page, this.root, '.navbar__item.dropdown--hoverable');
    this.themeToggle = new Button(this.page, this.root, '.colorModeToggle_DEke button');
    this.searchButton = new Button(this.page, this.root, 'button.DocSearch-Button');
    this.githubLink = new Button(this.page, this.root, 'a.header-github-link');
    this.discordLink = new Button(this.page, this.root, 'a.header-discord-link');
    this.mobileToggle = new Button(this.page, this.root, 'button.navbar__toggle');
  }

  async getLanguageOption(prefix: string): Promise<Button> {
    return allure.step(`Получение опции языка: ${prefix}`, async () => {
      return new Button(this.page, this.languageDropdown.element, `.dropdown__menu .dropdown__link[data-language-prefix="${prefix}"]`);
    });
  }
}
