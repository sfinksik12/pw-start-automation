import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase.js';

export const toHaveAttributeAllure = baseExpect.extend({
  async toHaveAttributeAllure(locator, attributeName, expectedValue, whatMessage) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `📝 Check: "${subject}" should have attribute "${attributeName}" with value "${expectedValue}"`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toHaveAttribute',
      logMessage,
      data: {
        locator,
        attribute: attributeName,
        expectedValue,
      },
    });
  },
});
