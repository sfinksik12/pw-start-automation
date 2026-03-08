import { allure } from 'allure-playwright';
import type { Page, Locator } from '@playwright/test';
import { BaseFragment } from './base.fragment';
import { Button } from '../components/button.component';
import { Label } from '../components/label.component';

/** Фрагмент хедера страницы. */
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
    this.logo = new Label(this.page, this.root, '.navbar__brand', 'Logo');
    this.docsLink = new Button(this.page, this.root, 'a.navbar__link[href="/docs/intro"]', 'Docs Link');
    this.apiLink = new Button(this.page, this.root, 'a.navbar__link[href="/docs/api/class-playwright"]', 'API Link');
    this.communityLink = new Button(this.page, this.root, 'a.navbar__link[href="/community/welcome"]', 'Community Link');
    this.languageDropdown = new Button(this.page, this.root, '.navbar__item.dropdown--hoverable', 'Language Dropdown');
    this.themeToggle = new Button(this.page, this.root, '.colorModeToggle_DEke button', 'Theme Toggle');
    this.searchButton = new Button(this.page, this.root, 'button.DocSearch-Button', 'Search Button');
    this.githubLink = new Button(this.page, this.root, 'a.header-github-link', 'GitHub Link');
    this.discordLink = new Button(this.page, this.root, 'a.header-discord-link', 'Discord Link');
    this.mobileToggle = new Button(this.page, this.root, 'button.navbar__toggle', 'Mobile Toggle');
  }

  async getLanguageOption(prefix: string): Promise<Button> {
    return allure.step(`Получение опции языка: ${prefix}`, async () => {
      return new Button(
        this.page,
        this.languageDropdown.element,
        `.dropdown__menu .dropdown__link[data-language-prefix="${prefix}"]`,
        `Language Option ${prefix}`,
      );
    });
  }
}
