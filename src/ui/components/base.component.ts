import { allure } from 'allure-playwright';
import type { Page, Locator } from '@playwright/test';

/**
 * Base class for all UI components of the framework.
 * Provides basic methods for interacting with elements and Allure integration.
 */
export class BaseComponent {
  page: Page;
  displayName: string;
  elementType: string;
  parentLocator: string | Locator | null;
  element: Locator;

  constructor(
    page: Page,
    locator: string | Locator,
    displayName: string,
    elementType = 'element',
    parentLocator: string | Locator | null = null
  ) {
    this.page = page;
    this.displayName = displayName;
    this.elementType = elementType;
    this.parentLocator = parentLocator;
    this.element = this._buildLocator(locator);
  }

  private _buildLocator(locator: string | Locator): Locator {
    const baseLocator = this._resolveBaseLocator(locator);
    return this._addDescription(baseLocator);
  }

  private _resolveBaseLocator(locator: string | Locator): Locator {
    if (this._isStringLocator(locator)) {
      return this._buildStringLocator(locator);
    }
    return this._handleReadyLocator(locator);
  }

  private _isStringLocator(locator: string | Locator): locator is string {
    return typeof locator === 'string';
  }

  private _buildStringLocator(locator: string): Locator {
    if (!this.parentLocator) {
      return this.page.locator(locator);
    }
    const parentElement = this._getParentElement();
    return parentElement.locator(locator);
  }

  private _getParentElement(): Locator {
    if (typeof this.parentLocator === 'string') {
      return this.page.locator(this.parentLocator);
    }
    return this.parentLocator!;
  }

  private _handleReadyLocator(locator: Locator): Locator {
    if (this.parentLocator) {
      this._warnAboutIgnoredParent();
    }
    return locator;
  }

  private _warnAboutIgnoredParent(): void {
    console.warn(`BaseComponent: parentLocator ignored when passing ready Playwright locator for "${this.displayName}"`);
  }

  private _addDescription(baseLocator: Locator): Locator {
    return baseLocator.describe(`${this.elementType} "${this.displayName}"`);
  }

  async click(): Promise<void> {
    await allure.step(`Click on ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.click();
    });
  }

  async waitFor(options: { state?: 'attached' | 'detached' | 'visible' | 'hidden'; timeout?: number } = {}): Promise<void> {
    await allure.step(`Wait for ${this.elementType} "${this.displayName}" to appear`, async () => {
      await this.element.waitFor(options);
    });
  }

  async hover(): Promise<void> {
    await allure.step(`Hover over ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.hover();
    });
  }

  async focus(): Promise<void> {
    await allure.step(`Focus on ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.focus();
    });
  }

  async blur(): Promise<void> {
    await allure.step(`Blur from ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.blur();
    });
  }

  async getAttribute(attributeName: string): Promise<string | null> {
    return await allure.step(`Get attribute "${attributeName}" from ${this.elementType} "${this.displayName}"`, async () => {
      return await this.element.getAttribute(attributeName);
    });
  }

  async scrollIntoView(): Promise<void> {
    await allure.step(`Scroll to ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.scrollIntoViewIfNeeded();
    });
  }

  async getText(): Promise<string> {
    return await allure.step(`Get text from ${this.elementType} "${this.displayName}"`, async () => {
      const tagName = await this.element.evaluate((el) => el.tagName.toLowerCase());
      if (tagName === 'input' || tagName === 'textarea') {
        return await this.element.inputValue();
      }
      const text = await this.element.textContent();
      return text?.trim() ?? '';
    });
  }

  async fill(value: string, options?: { timeout?: number }): Promise<void> {
    await allure.step(`Fill ${this.elementType} "${this.displayName}" with value "${value}"`, async () => {
      await this.element.fill(value, options);
    });
  }

  async clear(options?: { timeout?: number }): Promise<void> {
    await allure.step(`Clear ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.clear(options);
    });
  }

  async isVisible(options?: { timeout?: number }): Promise<boolean> {
    return allure.step(`Check visibility of ${this.elementType} "${this.displayName}"`, async () => {
      return this.element.isVisible(options);
    });
  }

  async selectOption(
    value: string | { value?: string; label?: string; index?: number } | Array<string | { value?: string; label?: string; index?: number }>,
    options?: { timeout?: number; force?: boolean }
  ): Promise<string[]> {
    return allure.step(`Select option "${value}" in ${this.elementType} "${this.displayName}"`, async () => {
      return await this.element.selectOption(value as Parameters<Locator['selectOption']>[0], options);
    });
  }
}
