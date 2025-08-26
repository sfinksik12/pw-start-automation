import { allure } from 'allure-playwright';

/**
 * Base class for all UI components of the framework.
 * Provides basic methods for interacting with elements and Allure integration.
 */
export class BaseComponent {
  /**
   * @param {Object} page - Playwright page instance
   * @param {string|Object} locator - Element selector (string) or ready Playwright locator
   * @param {string} displayName - Human-readable element name for logs
   * @param {string} elementType - Element type (button, input, etc.)
   * @param {string|Object|null} parentLocator - Parent locator for searching the element inside it
   */
  constructor(page, locator, displayName, elementType = 'element', parentLocator = null) {
    this.page = page;
    this.displayName = displayName;
    this.elementType = elementType;
    this.parentLocator = parentLocator;

    this.element = this._buildLocator(locator);
  }

  /**
   * Creates the final locator considering the parent element and adds a description
   * @param {string|Object} locator - Main element locator
   * @returns {Object} Playwright locator with description
   * @private
   */
  _buildLocator(locator) {
    const baseLocator = this._resolveBaseLocator(locator);
    return this._addDescription(baseLocator);
  }

  /**
   * Determines the base locator considering the parent element
   * @param {string|Object} locator - Main element locator
   * @returns {Object} Base Playwright locator
   * @private
   */
  _resolveBaseLocator(locator) {
    if (this._isStringLocator(locator)) {
      return this._buildStringLocator(locator);
    }

    return this._handleReadyLocator(locator);
  }

  /**
   * Checks if the locator is a string
   * @param {string|Object} locator - Locator to check
   * @returns {boolean}
   * @private
   */
  _isStringLocator(locator) {
    return typeof locator === 'string';
  }

  /**
   * Creates a locator from a string considering the parent element
   * @param {string} locator - String selector
   * @returns {Object} Playwright locator
   * @private
   */
  _buildStringLocator(locator) {
    if (!this.parentLocator) {
      return this.page.locator(locator);
    }

    const parentElement = this._getParentElement();
    return parentElement.locator(locator);
  }

  /**
   * Gets the parent element, creating a locator if a string is passed
   * @returns {Object} Playwright locator of the parent element
   * @private
   */
  _getParentElement() {
    if (typeof this.parentLocator === 'string') {
      return this.page.locator(this.parentLocator);
    }

    return this.parentLocator;
  }

  /**
   * Handles the case when a ready Playwright locator is passed
   * @param {Object} locator - Ready Playwright locator
   * @returns {Object} Passed locator
   * @private
   */
  _handleReadyLocator(locator) {
    if (this.parentLocator) {
      this._warnAboutIgnoredParent();
    }

    return locator;
  }

  /**
   * Outputs a warning about ignoring parentLocator
   * @private
   */
  _warnAboutIgnoredParent() {
    console.warn(`BaseComponent: parentLocator ignored when passing ready Playwright locator for "${this.displayName}"`);
  }

  /**
   * Adds a description to the locator for better debugging
   * @param {Object} baseLocator - Base locator
   * @returns {Object} Locator with description
   * @private
   */
  _addDescription(baseLocator) {
    return baseLocator.describe(`${this.elementType} "${this.displayName}"`);
  }

  // Public methods for interacting with the element

  async click() {
    await allure.step(`Click on ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.click();
    });
  }

  async waitFor(options = {}) {
    await allure.step(`Wait for ${this.elementType} "${this.displayName}" to appear`, async () => {
      await this.element.waitFor(options);
    });
  }

  async hover() {
    await allure.step(`Hover over ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.hover();
    });
  }

  async focus() {
    await allure.step(`Focus on ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.focus();
    });
  }

  async blur() {
    await allure.step(`Blur from ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.blur();
    });
  }

  async getAttribute(attributeName) {
    return await allure.step(`Get attribute "${attributeName}" from ${this.elementType} "${this.displayName}"`, async () => {
      return await this.element.getAttribute(attributeName);
    });
  }

  async scrollIntoView() {
    await allure.step(`Scroll to ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.scrollIntoViewIfNeeded();
    });
  }

  async getText() {
    return await allure.step(`Get text from ${this.elementType} "${this.displayName}"`, async () => {
      const tagName = await this.element.evaluate(el => el.tagName.toLowerCase());
      if (tagName === 'input' || tagName === 'textarea') {
        return await this.element.inputValue();
      }
      const text = await this.element.textContent();
      return text?.trim() ?? '';
    });
  }

  async fill(value, options) {
    await allure.step(`Fill ${this.elementType} "${this.displayName}" with value "${value}"`, async () => {
      await this.element.fill(value, options);
    });
  }

  async clear(options) {
    await allure.step(`Clear ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.clear(options);
    });
  }

  async isVisible(options) {
    return allure.step(`Check visibility of ${this.elementType} "${this.displayName}"`, async () => {
      return this.element.isVisible(options);
    });
  }

  async selectOption(value, options) {
    await allure.step(`Select option "${value}" in ${this.elementType} "${this.displayName}"`, async () => {
      await this.element.selectOption(value, options);
    });
  }
}
